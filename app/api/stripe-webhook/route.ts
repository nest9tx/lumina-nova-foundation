import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type StripeSession = {
  customer_email?: string;
  client_reference_id?: string;
  metadata?: {
    tier?: string;
  };
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = (await headers()).get('stripe-signature') as string;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    console.error('[Stripe] Missing signature or webhook secret');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('[Stripe] Webhook Error:', err.message);
    } else {
      console.error('[Stripe] Unknown error occurred');
    }
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as StripeSession;
    const email = session.customer_email;
    const clientRef = session.client_reference_id!;
    const tier = session.metadata?.tier ?? 'seeker';

    if (!email && !clientRef) {
      return new NextResponse('Missing identifiers', { status: 400 });
    }

    const { data, error } = await supabase
      .from('profiles')
      .update<{ tier: string }>({ tier })
      .eq('email', email ?? '') as { data: { id: string; email: string; is_upgraded: boolean; tier: string }[] | null, error: { message: string; details?: string } | null };

    if (error) {
      console.error('[Supabase] Email update failed:', error);
      return new NextResponse('Supabase update failed', { status: 500 });
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      const { data: fallback, error: fallbackError } = await supabase
        .from('profiles')
        .update<{ tier: string }>({ tier })
        .eq('id', clientRef) as { data: { id: string; email: string; is_upgraded: boolean; tier: string }[] | null, error: { message: string; details?: string } | null };

      if (fallbackError) {
        console.error('[Supabase] ID fallback failed:', fallbackError);
        return new NextResponse('Fallback update failed', { status: 500 });
      }

      if (!fallback || fallback.length === 0) {
        console.warn('[Supabase] No matching profile found for ID fallback.');
        return new NextResponse('Profile not found', { status: 404 });
      }

      console.log('[Supabase] Profile updated via fallback ID:', fallback);
    } else {
      console.log('[Supabase] Profile updated via email:', data);
    }
  }

  return new NextResponse('Success', { status: 200 });
}