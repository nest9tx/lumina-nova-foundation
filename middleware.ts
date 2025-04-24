// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/',
  '/login',
  '/guide',
  '/mission-flame',
  '/resonate',
  '/offer-light',
  '/living-scrolls',
  '/sanctum',
  '/awaken',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('sb-access-token')?.value;
  const isLocalhost = request.headers.get('host')?.includes('localhost');

  // Handle signup redirect
  if (pathname === '/signup' || pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is already authenticated and tries to access login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/chamber', request.url));
  }

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes handling
  const isProtected = pathname.startsWith('/chamber');
  if (!token && isProtected && !isLocalhost) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
