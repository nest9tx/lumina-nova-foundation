import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  try {
    const event = JSON.parse(body);
    console.log("🌀 Stripe Webhook Event Received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✨ Checkout session completed:", session);

      // Here we confirm the session email (will use it in Step 2)
      const customerEmail = session.customer_details?.email;
      console.log("📧 Customer Email:", customerEmail);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Error processing webhook:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
