import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Use your current Stripe API version
});

export async function POST(req: Request) {
  const body = await req.text();
  const rawHeaders = await headers();
  const sig = rawHeaders.get("stripe-signature") as string;

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

    if (!customerEmail || !stripeCustomerId || !subscriptionId) {
      console.error("❌ Missing checkout session data");
      return new NextResponse("Incomplete session data", { status: 400 });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        stripe_id: stripeCustomerId,
        subscription_id: subscriptionId,
        is_active: true,
        tier: "Seeker",
      })
      .eq("email", customerEmail);

    if (error) {
      console.error("❌ Supabase update error (checkout):", error);
      return new NextResponse("Failed to update profile after checkout", { status: 500 });
    }

    console.log("✅ New profile updated after checkout for:", customerEmail);
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;

    const customerId = subscription.customer as string;

    // Optionally extract subscription status or plan here if needed

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_id: subscription.id,
        is_active: true, // optional; you could also key this off of subscription.status
      })
      .eq("stripe_id", customerId);

    if (error) {
      console.error("❌ Supabase update error (subscription update):", error);
      return new NextResponse("Failed to update profile after subscription change", { status: 500 });
    }

    console.log("✅ Profile subscription updated for Stripe customer:", customerId);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
