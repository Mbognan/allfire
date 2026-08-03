import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { sendQuoteNotification } from "@/lib/email";

/**
 * Quote requests.
 *
 * Validate, send one email, return. Nothing is written anywhere: there is no
 * database and no log of the submission beyond the email itself.
 *
 * This route exists because email cannot be sent from the browser without
 * publishing the API key. It is a serverless function, not a server: it runs on
 * request and costs nothing at rest.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

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
    await sendQuoteNotification(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/quote] failed to send quote request", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please call us instead." },
      { status: 502 }
    );
  }
}
