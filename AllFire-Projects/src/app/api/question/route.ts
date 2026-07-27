import { NextResponse } from "next/server";
import { questionSchema } from "@/lib/validation";
import { sendQuestionNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = questionSchema.safeParse(body);

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
    await sendQuestionNotification(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/question] failed to send question notification", error);
    return NextResponse.json(
      { error: "Something went wrong sending your question. Please call us instead." },
      { status: 502 }
    );
  }
}
