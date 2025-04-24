// /app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err);
    return new NextResponse('Webhook signature verification failed.', { status: 400 });
  }

  // Handle the event types here...
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session?.customer_email;
    const tier = session?.metadata?.tier || 'Seeker';
    const max_messages = session?.metadata?.max_messages || 333;

    // TODO: Update Supabase profile based on email
    // You may add supabase logic here if email mapping is setup
  }

  return new NextResponse('Success', { status: 200 });
}
