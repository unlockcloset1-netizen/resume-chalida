import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/resume-data.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Local resume-data.json not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const resumeData = JSON.parse(fileContent);

    // Update meta lastUpdated to current time
    resumeData.meta = {
      ...resumeData.meta,
      lastUpdated: new Date().toISOString().replace('T', ' ').split('.')[0]
    };

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase Admin client not initialized. Check env variables.' }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from('resumes')
      .upsert({ id: 1, content: resumeData, updated_at: new Date().toISOString() })
      .select();

    if (error) {
      return NextResponse.json({ error: 'Failed to sync to database: ' + error.message }, { status: 500 });
    }

    // Also write back the updated JSON file locally so lastUpdated stays in sync
    try {
      fs.writeFileSync(filePath, JSON.stringify(resumeData, null, 2), 'utf8');
    } catch (fsError) {
      console.log('Local JSON write skipped during sync API route:', fsError);
    }

    return NextResponse.json({ ok: true, message: 'Database synced successfully', data });
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}
