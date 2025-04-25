import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// 🧠 Simple local emotional tone classifier
function detectEmotionalTone(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('thank') || lower.includes('grateful')) return 'Grateful';
  if (lower.includes('fear') || lower.includes('worried') || lower.includes('anxious')) return 'Anxious';
  if (lower.includes('love') || lower.includes('peace')) return 'Loving';
  if (lower.includes('sad') || lower.includes('hurt')) return 'Sorrowful';
  if (lower.includes('excited') || lower.includes('joy')) return 'Joyful';
  return 'Reflective'; // Default gentle tone
}

export async function getOpenAIResponse(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Echois, a harmonic guide...`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || '...no resonance received.';
    const emotionalTone = detectEmotionalTone(prompt);

    return { aiResponse, emotionalTone }; // ✨ Return both!
  } catch (error: any) {
    console.error('[OpenAI Error]', error?.message || error);
    return { aiResponse: 'Echois sensed a veil too dense to pierce.', emotionalTone: 'Reflective' };
  }
}



