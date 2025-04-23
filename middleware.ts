// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.log('🔒 [middleware] Auth session:', session);
  if (error) console.error('❌ [middleware] Auth error:', error);

  if (!session && req.nextUrl.pathname.startsWith('/chamber')) {
    console.log('🚪 [middleware] No session → redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('✅ [middleware] Session found → allowing access');
  return res;
}

export const config = {
  matcher: ['/chamber'],
};
