// src/utils/insertEchoisSession.ts
import { createClient } from './supabase/server';

export async function insertEchoisSession({
  userId,
  summary,
  emotionalTone,
  themeMarker,
}: {
  userId: string;
  summary: string;
  emotionalTone: string;
  themeMarker: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from('echois_sessions').insert([
    {
      user_id: userId,
      summary,
      emotional_tone: emotionalTone,
      theme_marker: themeMarker,
    },
  ]);

  if (error) {
    console.error('Error inserting Echois session:', error);
    throw error;
  }
}
