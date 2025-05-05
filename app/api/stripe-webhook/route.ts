import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Adjust if needed
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role required for updates
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return new NextResponse("Webhook signature verification failed", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const stripeCustomerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (!customerEmail) {
      console.error("❌ Missing customer email in session.");
      return new NextResponse("Missing customer email", { status: 400 });
    }

    // Determine tier from price ID
    const priceId = session.metadata?.price_id || session?.line_items?.data?.[0]?.price?.id;
    let tier = "Seeker"; // Default fallback
    switch (priceId) {
      case process.env.STRIPE_PRICE_ID_ADEPT:
        tier = "Adept";
        break;
      case process.env.STRIPE_PRICE_ID_GUARDIAN:
        tier = "Guardian";
        break;
      case process.env.STRIPE_PRICE_ID_LUMINARY:
        tier = "Luminary";
        break;
    }

    // Update existing profile
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        tier,
        stripe_id: stripeCustomerId,
        subscription_id: subscriptionId,
        is_active: true,
      })
      .eq("email", customerEmail);

    if (error) {
      console.error("❌ Failed to update user profile:", error);
      return new NextResponse("Failed to update profile", { status: 500 });
    }

    console.log(`✅ Updated profile for ${customerEmail} to tier: ${tier}`);
    return new NextResponse("Profile updated", { status: 200 });
  }

  return new NextResponse("Unhandled event type", { status: 200 });
}
