import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase"; // Ensure supabase is exported correctly

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // or your target version
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
    console.error("⚠️ Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // Log event type
  console.log("🔔 Stripe Event Received:", event.type);

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // Optional: pull customer_email from nested data
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    const customerEmail = customer.email;

    if (!customerEmail) {
      console.error("⚠️ No email found for customer.");
      return new NextResponse("Missing email", { status: 400 });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        tier: "Seeker", // Adjust this per product/price_id if needed
        is_upgraded: true,
        is_active: true,
        stripe_id: customerId,
        subscription_id: subscription.id,
      })
      .eq("email", customerEmail);

    if (error) {
      console.error("❌ Supabase update error:", error);
      return new NextResponse("Failed to update profile", { status: 500 });
    }

    console.log("✅ Profile updated for:", customerEmail);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
