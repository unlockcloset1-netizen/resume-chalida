import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = req.cookies.get('admin_session')?.value === 'authenticated';

  // Protect /admin/dashboard
  if (pathname.startsWith('/admin/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // If already logged in, redirect /admin login page to dashboard
  if (pathname === '/admin' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};
