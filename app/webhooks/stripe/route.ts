import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    console.error("❌ Webhook signature verification failed with an unknown error.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const stripe_id = session.customer as string;
    const subscription_id = session.subscription as string;

    if (!email) {
      console.error("❌ No email found in session.");
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("profiles")
      .update({
        tier: "Seeker",
        is_upgraded: true,
        is_active: true,
        stripe_id,
        subscription_id,
      })
      .eq("email", email);

    if (error) {
      console.error("❌ Error updating profile:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`✅ Updated profile for ${email}`);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  return NextResponse.json({ status: "Unhandled event" }, { status: 200 });
}
