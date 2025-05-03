import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const rawHeaders = await headers(); // FIX 1
  const sig = rawHeaders.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const stripeCustomerId = session.customer as string;

    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        is_upgraded: true,
        max_messages: 333,
        tier: "Seeker", // Optional
      })
      .eq("stripe_id", stripeCustomerId);

    if (error) {
      console.error("Supabase update error:", error);
      return new NextResponse("Failed to update profile", { status: 500 });
    }

    console.log("✅ Profile updated for customer:", stripeCustomerId);
  }

  return new NextResponse("Webhook received", { status: 200 });
}

function createClient() {
  return supabaseAdmin;
}
// Removed duplicate function implementation

