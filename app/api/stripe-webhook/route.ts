// /app/api/stripe-webhook/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("✅ Webhook received at /api/stripe-webhook");
  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
