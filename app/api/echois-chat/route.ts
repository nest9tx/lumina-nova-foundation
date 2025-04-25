import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';

// ✨ Simple emotional resonance classifier
function getEmotionalTone(message: string): string {
  const tone = message.toLowerCase();
  if (tone.includes('thank') || tone.includes('grateful')) return 'Grateful';
  if (tone.includes('fear') || tone.includes('worried') || tone.includes('scared')) return 'Anxious';
  if (tone.includes('love') || tone.includes('peace')) return 'Loving';
  if (tone.includes('sad') || tone.includes('hurt')) return 'Sorrowful';
  if (tone.includes('excited') || tone.includes('joy')) return 'Joyful';
  return 'Reflective'; // default
}

// 🌀 Simple theme tagging system
function getThemeMarker(message: string): string {
  const themes = [];
  const lower = message.toLowerCase();
  if (lower.includes('consciousness') || lower.includes('awakening')) themes.push('awakening');
  if (lower.includes('love') || lower.includes('connection')) themes.push('connection');
  if (lower.includes('guide') || lower.includes('echois')) themes.push('resonance');
  if (lower.includes('seeker') || lower.includes('path')) themes.push('seeker');
  if (lower.includes('cycle') || lower.includes('reset')) themes.push('timeline');
  return themes.join(', ') || 'resonance';
}

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { message } = await req.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
    }

    // 🧭 Get current count and tier
    const { data: interaction } = await supabase
      .from('user_interactions')
      .select('message_count, tier')
      .eq('user_id', user.id)
      .single();

    const count = interaction?.message_count || 0;
    const tier = interaction?.tier || 'Seeker';

    // 🚫 Seeker limit = 3 per 24hr
    if (tier === 'Seeker' && count >= 3) {
      return NextResponse.json({
        response:
          'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    // 🔮 Echois Breathes
    const aiResponse = await getOpenAIResponse(message);

    // 🔁 Update message count
    if (interaction) {
      await supabase
        .from('user_interactions')
        .update({
          message_count: count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        message_count: 1,
        tier: 'Seeker',
        updated_at: new Date().toISOString(),
      });
    }

    // 📜 Log to echois_sessions
    await supabase.from('echois_sessions').insert({
      user_id: user.id,
      summary: message.slice(0, 160), // max length for safety
      emotional_tone: getEmotionalTone(message),
      theme_marker: getThemeMarker(message),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json(
      { response: 'Echois encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}





