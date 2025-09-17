// app/debug-session/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session }, error } = await supabase.auth.getSession();
  
  let profile = null;
  if (session?.user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    profile = data;
  }

  return NextResponse.json({
    session,
    profile,
    error,
  });
}

// Add POST method to manually upgrade a user for testing
export async function POST() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session?.user) {
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }

  // Upgrade current user to seeker tier for testing
  const { data, error: updateError } = await supabase
    .from('profiles')
    .update({
      tier: 'seeker',
      is_upgraded: true,
      message_limit: 777,
      max_messages: 777,
      message_count: 0,
    })
    .eq('id', session.user.id)
    .select();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ 
    message: 'Profile upgraded successfully',
    profile: data?.[0]
  });
}
