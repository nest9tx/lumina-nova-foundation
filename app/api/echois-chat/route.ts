import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const cookieStore = await cookies(); // ✅ Await cookies() properly
  const token = cookieStore.get('sb-oyrklixahelazzdrcjkn-auth-token')?.value;

  const supabase = createClient(cookieStore);

  try {
    const { message } = await req.json();

    // ✅ Call OpenAI
    const aiResponse = await getOpenAIResponse(message);

    // ✅ Log usage (optional - add safety)
    const { data: { user }, error } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('user_interactions')
        .insert({
          user_id: user.id,
          interaction_type: 'echois_message',
          content: message,
        });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json({ response: 'No resonance could be found.' }, { status: 500 });
  }
}
