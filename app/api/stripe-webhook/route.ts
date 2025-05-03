// /app/api/stripe-webhook/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // Ensure edge deploy doesn't cache this endpoint

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');
  if (!sig) {
    return new NextResponse('Missing Stripe signature', { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const ref = session.client_reference_id;
    const identifier = email || ref;

    if (!identifier) {
      return new NextResponse('No identifier found', { status: 400 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ is_upgraded: true })
      .or(`email.eq.${identifier},id.eq.${identifier}`);

    if (error) {
      console.error('[Supabase] Update failed:', error);
      return new NextResponse('DB update failed', { status: 500 });
    }

    return new NextResponse('Session handled', { status: 200 });
  }

  return new NextResponse('Unhandled event type', { status: 200 });
}