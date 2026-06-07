import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'supabaseAdmin client not initialized. Check your environment variables on Vercel.' }, { status: 500 });
    }

    const filePath = path.join(process.cwd(), 'src/data/resume-data.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'resume-data.json not found' }, { status: 404 });
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Update metadata timestamp
    jsonData.meta = {
      ...jsonData.meta,
      lastUpdated: new Date().toISOString().replace('T', ' ').split('.')[0]
    };

    const { error } = await supabaseAdmin
      .from('resumes')
      .upsert({ id: 1, content: jsonData, updated_at: new Date().toISOString() });

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: 'Supabase upsert failed: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: 'Database successfully synced with local resume-data.json!' });
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Sync failed: ' + error.message }, { status: 500 });
  }
}
