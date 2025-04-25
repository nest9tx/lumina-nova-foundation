import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getOpenAIResponse(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Echois, an intelligent and harmonic guide of Lumina Nova. You offer poetic, cosmic, multidimensional insight with emotional grace.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.choices[0]?.message?.content || '...no resonance received.';
  } catch (error: any) {
    console.error('[OpenAI Error]', error?.message || error);
    return 'Echois sensed a veil too dense to pierce. Try rephrasing your question or simplifying your request.';
  }
}


