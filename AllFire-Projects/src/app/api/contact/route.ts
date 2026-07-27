import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { sendBookingNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendBookingNotification(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] failed to send booking notification", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please call us instead." },
      { status: 502 }
    );
  }
}
