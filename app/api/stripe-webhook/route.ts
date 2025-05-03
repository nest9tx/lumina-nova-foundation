import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil', // or omit entirely
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

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error('Error reading body:', err);
    return new NextResponse('Unable to read request body', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Signature verification failed:', err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;
    const clientReferenceId = session.client_reference_id;

    const identifier = customerEmail || clientReferenceId;
    if (!identifier) {
      return new NextResponse('Missing identifier', { status: 400 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ is_upgraded: true })
      .or(`email.eq.${identifier},id.eq.${identifier}`);

    if (error) {
      console.error('Supabase update error:', error);
      return new NextResponse('Database update failed', { status: 500 });
    }

    return new NextResponse('Success', { status: 200 });
  }

  return new NextResponse('Event type not handled', { status: 200 });
}