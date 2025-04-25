import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient(); // ✅ No cookieStore needed

  try {
    const { message } = await req.json();

    // 🔮 Echois Breathes
    const aiResponse = await getOpenAIResponse(message);

    // 🧬 Identify and Log Seeker
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        interaction_type: 'echois_message',
        content: message,
      });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json(
      { response: 'No resonance could be found.' },
      { status: 500 }
    );
  }
}