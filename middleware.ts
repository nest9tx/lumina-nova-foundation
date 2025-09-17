import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  try {
    // Try to get session from server
    const { data: { session }, error } = await supabase.auth.getSession()
    
    // Debug logging
    console.log('Middleware - Path:', request.nextUrl.pathname)
    console.log('Middleware - Session exists:', !!session)
    if (error) {
      console.log('Middleware - Session error:', error.message)
    }
    if (session) {
      console.log('Middleware - User ID:', session.user?.id)
    }
    
    // If accessing chamber without session, redirect to login
    if (!session && request.nextUrl.pathname.startsWith('/chamber')) {
      console.log('Middleware - No session found, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

  } catch (error) {
    console.error('Middleware - Error checking session:', error)
    // On error, redirect to login for protected routes
    if (request.nextUrl.pathname.startsWith('/chamber')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/chamber/:path*'],
}
