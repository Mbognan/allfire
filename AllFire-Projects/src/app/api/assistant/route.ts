import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { buildSystemInstruction } from "@/lib/assistant-knowledge";
import { company } from "@/content/company";

/**
 * Assistant endpoint.
 *
 * The API key lives here and only here. Calling Gemini from the browser would
 * put the key in the page source, where anyone can lift it and spend the quota.
 *
 * Falls back to a plain hand-off message when no key is configured, so the
 * widget still works in development and on any deploy where the key is missing,
 * instead of showing an error to a customer.
 */

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        text: z.string().max(4000),
      })
    )
    .max(20)
    .optional()
    .default([]),
});

const FALLBACK = `I'm not connected to live answers right now. The quickest way to get this sorted is to call ${company.phone}, or send the booking form and the team will come back to you the same business day.`;

/** Crude per-IP throttle. The free tier has a hard quota worth protecting. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;

  // Keep the map from growing without bound on a long-running server.
  if (hits.size > 5000) {
    for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
  }

  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { reply: `That's a lot of questions at once. Give me a moment, or call ${company.phone}.` },
      { status: 429 }
    );
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Not an error state: the site is expected to run without a key.
    return NextResponse.json({ reply: FALLBACK, configured: false });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...parsed.data.history.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
      { role: "user" as const, parts: [{ text: parsed.data.message }] },
    ];

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: buildSystemInstruction(),
        // Low temperature: this answers compliance questions, it does not riff.
        temperature: 0.3,
        maxOutputTokens: 400,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      return NextResponse.json({ reply: FALLBACK, configured: true });
    }

    return NextResponse.json({ reply, configured: true });
  } catch (error) {
    console.error("[api/assistant] Gemini request failed", error);
    // Quota exhausted, network trouble, bad key: the visitor still gets a way through.
    return NextResponse.json({ reply: FALLBACK, configured: true }, { status: 200 });
  }
}
