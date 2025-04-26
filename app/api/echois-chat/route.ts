import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies(); // ✨ FIX ✨
  const supabase = createPagesServerClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Seeker not recognized.', { status: 401 });
  }

  // rest of the route.ts code continues...
}











