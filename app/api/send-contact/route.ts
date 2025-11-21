import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "../../lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, category, message, anonymous } = body;

  // Create Supabase client
  const supabase = await createClient();

  // Backup to Supabase
  const { error: insertError } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      category,
      message,
      anonymous,
      created_at: new Date(),
    },
  ]);

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json({ success: false, error: insertError }, { status: 500 });
  }

  try {
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [process.env.RESEND_TO!],
      subject: `New Message Received — ${category}`,
      replyTo: anonymous ? undefined : email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>🌟 New Contact Pulse</h2>
          <p><strong>Name:</strong> ${anonymous ? "Anonymous" : name}</p>
          <p><strong>Email:</strong> ${anonymous ? "Hidden" : email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Message:</strong><br>${message}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json({ success: false, error: emailError }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Unexpected error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

