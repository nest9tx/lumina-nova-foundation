import { NextResponse } from "next/server";

export async function POST() {
  console.log("✅ Webhook received at /api/stripe-webhook");
  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
