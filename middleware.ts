import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/login', '/guide', '/mission-flame', '/resonate', '/offer-light', '/living-scrolls', '/sanctum', '/awaken', '/auth/callback'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Only protect /chamber path
  const token = request.cookies.get('sb-access-token')?.value;

  if (!token && pathname.startsWith('/chamber')) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

