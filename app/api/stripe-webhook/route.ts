import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text(); // Needed for raw Stripe payload
  console.log("✅ Stripe webhook payload:", body);
  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
