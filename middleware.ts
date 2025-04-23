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

  // 🔁 Redirect /signup -> /login
  if (pathname === '/signup' || pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ Allow public paths through
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 🛡️ Gate chamber access ONLY if not logged in and in production
  const token = request.cookies.get('sb-access-token')?.value;

  const isProtected = pathname.startsWith('/chamber');
  const isLocalhost = request.headers.get('host')?.includes('localhost');

  if (!token && isProtected && !isLocalhost) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
