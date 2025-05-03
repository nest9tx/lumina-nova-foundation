// app/api/stripe-webhook/route.ts

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log('[Webhook] POST hit');

  const headerList = await headers();
  const sig = headerList.get('stripe-signature');

  if (!sig) {
    console.error('[Webhook] Missing stripe-signature header');
    return new NextResponse('Missing Stripe signature', { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error('[Webhook] Failed to parse raw body', err);
    return new NextResponse('Invalid body', { status: 400 });
  }

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
    const identifier = session.customer_email || session.client_reference_id;

    console.log('[Webhook] Session:', session);

    if (!identifier) {
      return new NextResponse('No identifier found', { status: 400 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ is_upgraded: true })
      .or(`email.eq.${identifier},id.eq.${identifier}`);

    if (error) {
      console.error('[Supabase] Update error:', error);
      return new NextResponse('Supabase update failed', { status: 500 });
    }

    return new NextResponse('Session processed', { status: 200 });
  }

  return new NextResponse('Event type not handled', { status: 200 });
}

export async function GET() {
  console.log('[Webhook] GET hit');
  return new Response('Stripe GET ok', { status: 200 });
}