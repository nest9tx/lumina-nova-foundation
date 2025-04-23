import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { pathname } = req.nextUrl;

  // ✅ Redirect /signup to /login
  if (pathname === "/signup") {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  await supabase.auth.getSession(); // 🧘‍♂️ Ensures hydration happens

  return res;
}

export const config = {
  matcher: ["/chamber", "/resonate", "/guide/:path*"],
};
