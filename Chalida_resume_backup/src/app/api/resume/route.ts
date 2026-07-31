import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import resumeData from '@/data/resume.json';

/* ── AUTH CHECK ── */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

/* ══════════════════════════
   GET  /api/resume
   Returns resume JSON (auth required)
══════════════════════════ */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(resumeData);
}

/* ══════════════════════════
   POST /api/resume
   Saves resume via GitHub API
══════════════════════════ */
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  /* ── GitHub API save ── */
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO  = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json(
      { error: 'GitHub env vars not configured (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)' },
      { status: 500 }
    );
  }

  const filePath = 'src/data/resume.json';
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

  /* get current SHA */
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!getRes.ok) {
    const err = await getRes.json();
    return NextResponse.json({ error: `GitHub GET failed: ${err.message}` }, { status: 500 });
  }

  const { sha } = await getRes.json();
  const content = Buffer.from(JSON.stringify(body, null, 2)).toString('base64');

  /* update file */
  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'chore: update resume data',
      content,
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    return NextResponse.json({ error: `GitHub PUT failed: ${err.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: 'บันทึกสำเร็จ — Vercel จะ redeploy อัตโนมัติ' });
}
