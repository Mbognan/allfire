"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Suggestion sets, offered one round at a time.
 *
 * A real assistant does not keep a permanent menu pinned under the transcript:
 * the chips belong to the message that offered them, they are consumed when you
 * pick one, and the next reply brings a fresh set. These rotate in order.
 */
const suggestionRounds = [
  ["When is my AFSS due?", "Book an inspection", "I need someone urgently"],
  ["What does an inspection cover?", "How much does it cost?", "Talk to a person"],
  ["Send me a quote", "What standards apply?", "Call me back"],
];

type Message = {
  from: "bot" | "user";
  text: string;
  /** Chips rendered inside this bubble. Cleared once the user picks one. */
  suggestions?: string[];
  /** Opening lines are UI, not conversation, so they are kept out of history. */
  isGreeting?: boolean;
};

/** Shown when the assistant cannot reach the model, for any reason. */
const FALLBACK_REPLY = `I can't reach my answers right now. The quickest way to get this sorted is to call ${company.phone}, or send the booking form and the team will come back to you the same business day.`;

/**
 * Floating assistant.
 *
 * UI only: there is no model behind it, so it replies with a holding message
 * and routes to a real channel rather than pretending to answer.
 *
 * Shape note: the rest of the site is all-sharp, but this is a floating
 * overlay rather than page composition, and chat widgets read as rounded by
 * convention. Deliberate exception, applied consistently within the widget.
 */
export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi. How can I help you today?", isGreeting: true },
    {
      from: "bot",
      text: "Ask about compliance deadlines, inspections or bookings, or pick a topic below.",
      suggestions: suggestionRounds[0],
      isGreeting: true,
    },
  ]);

  /* send() needs the transcript at call time. Reading state directly would
     capture a stale closure when two messages are sent in quick succession. */
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view as the transcript grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const nextRound = (round + 1) % suggestionRounds.length;
    setRound(nextRound);

    // Snapshot the transcript before the optimistic update, so the history we
    // send is what the model actually said, not including the pending turn.
    const priorTurns = messagesRef.current
      .filter((m) => !m.isGreeting)
      .map((m) => ({ role: m.from === "user" ? ("user" as const) : ("model" as const), text: m.text }));

    setMessages((m) => [
      // Consume every outstanding chip: they belonged to the turn just answered.
      ...m.map((message) => ({ ...message, suggestions: undefined })),
      { from: "user", text: trimmed },
    ]);
    setThinking(true);

    let reply = FALLBACK_REPLY;
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: priorTurns.slice(-10) }),
      });
      const payload = await res.json().catch(() => null);
      if (payload?.reply) reply = payload.reply;
    } catch {
      // Offline or the route is unreachable; the fallback already routes to a human.
    }

    setThinking(false);
    setMessages((m) => [
      ...m,
      { from: "bot", text: reply, suggestions: suggestionRounds[nextRound] },
    ]);
  }

  return (
    <>
      {/* Launcher: the mark on its own, no container behind it. */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="fixed right-5 bottom-5 z-50"
      >
        <div className="relative">
          {/* Soft pulse behind the mark. Non-interactive, stops once engaged. */}
          {!open && !engaged && (
            <>
              <span
                className="assistant-ping pointer-events-none absolute inset-3 rounded-full bg-flame-orange/35"
                aria-hidden="true"
              />
              <span
                className="assistant-ping assistant-ping-delayed pointer-events-none absolute inset-3 rounded-full bg-flame-orange/35"
                aria-hidden="true"
              />
            </>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setEngaged(true);
            }}
            aria-expanded={open}
            aria-label={open ? "Close the AllFire assistant" : "Open the AllFire assistant"}
            /* No background plate: the logo is the button. Fixed size, so it
               never becomes a moving click target. */
            className="relative block cursor-pointer transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
          >
            <BotLogo className="h-20 w-20 drop-shadow-xl md:h-24 md:w-24" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AllFire assistant"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.26, ease }}
            className="fixed right-5 bottom-32 z-50 flex max-h-[min(34rem,75vh)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:bottom-36"
          >
            {/* Header with a curved lower edge */}
            <div className="brand-gradient relative z-10 shrink-0 pt-5 pb-9">
              <div className="flex items-start gap-3 px-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/25 ring-2 ring-white/40">
                  <BotLogo className="h-9 w-9" mono />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/85">Chat with</p>
                  <p className="font-display text-xl leading-tight font-bold text-white">
                    AllFire Assistant
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Minimise chat"
                  className="-mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 px-5 text-sm font-medium text-white">We are online!</p>

              {/* Wave separating header from transcript */}
              <svg
                viewBox="0 0 400 26"
                preserveAspectRatio="none"
                className="absolute inset-x-0 -bottom-px h-6 w-full"
                aria-hidden="true"
              >
                <path d="M0 26V10c70 14 150 14 220 4S350 0 400 6v20Z" fill="#fff" />
              </svg>
            </div>

            {/* Transcript. Wrapped so a fade can sit over the scroll edge:
                without it, messages scrolling past the curved header hard-clip
                mid-bubble and read as a rendering fault.

                min-h-56 guarantees a scrollable region even before the
                conversation is long enough to overflow the panel. */}
            <div className="relative min-h-56 flex-1">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-white to-transparent"
                aria-hidden="true"
              />
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-label="Conversation"
                className="h-full space-y-3 overflow-y-auto overscroll-contain bg-white px-4 pt-4 pb-4"
              >
                {messages.map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className={
                        m.from === "bot"
                          ? "max-w-[85%] rounded-2xl rounded-tl-md bg-paper-raised px-4 py-2.5 text-sm text-ink"
                          : "brand-gradient ml-auto max-w-[85%] rounded-2xl rounded-tr-md px-4 py-2.5 text-sm font-medium text-white"
                      }
                    >
                      {m.text}
                    </div>

                    {/*
                      Chips belong to the message that offered them, so they sit
                      inside its block and scroll away with it. Picking one
                      clears them; the next reply brings a fresh set.
                    */}
                    <AnimatePresence initial={false}>
                      {m.suggestions && m.suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease }}
                          className="flex flex-wrap gap-2 pl-1"
                        >
                          {m.suggestions.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => send(s)}
                              disabled={thinking}
                              className="min-h-11 cursor-pointer rounded-full border border-flame-red-deep px-4 py-2 text-sm font-semibold text-flame-red-deep transition-colors duration-200 hover:bg-flame-red-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {s}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Typing indicator. Three dots is the convention people already
                    read as "it heard me and is working". */}
                <AnimatePresence>
                  {thinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease }}
                      className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md bg-paper-raised px-4 py-3"
                      aria-label="Assistant is typing"
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="assistant-typing-dot h-1.5 w-1.5 rounded-full bg-ink-soft"
                          style={{ animationDelay: `${i * 0.16}s` }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
                send(input.value);
                input.value = "";
              }}
              className="relative shrink-0 border-t border-line bg-white px-4 pt-3 pb-4"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Ask the AllFire assistant
              </label>
              <input
                id="assistant-input"
                name="q"
                type="text"
                autoComplete="off"
                disabled={thinking}
                placeholder={thinking ? "Thinking..." : "Enter your message..."}
                className="w-full bg-transparent pr-14 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none disabled:cursor-not-allowed"
              />

              <p className="mt-3 pr-14 text-xs text-ink-soft/70">
                Emergency?{" "}
                <a
                  href={company.emergencyPhoneHref}
                  className="cursor-pointer font-semibold text-flame-red-deep transition-colors duration-200 hover:text-ink"
                >
                  {company.emergencyPhone}
                </a>
              </p>

              <button
                type="submit"
                aria-label="Send message"
                disabled={thinking}
                className="brand-gradient absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-[filter,transform] duration-200 hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-orange disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Standalone assistant mark: a bot face inside a speech bubble.
 * Self-coloured so it can sit directly on the page with nothing behind it.
 * `mono` renders it flat white for use on the gradient header.
 */
function BotLogo({ className, mono = false }: { className?: string; mono?: boolean }) {
  const bubble = mono ? "#fff" : "url(#allfire-bot-grad)";
  const face = mono ? "rgba(226,3,2,0.9)" : "#fff";

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="allfire-bot-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#fc0403" />
          <stop offset="55%" stopColor="#fb5614" />
          <stop offset="100%" stopColor="#feaf04" />
        </linearGradient>
      </defs>

      {/* Speech bubble */}
      <path
        d="M9 13.5A5.5 5.5 0 0 1 14.5 8h19A5.5 5.5 0 0 1 39 13.5v13a5.5 5.5 0 0 1-5.5 5.5H22.6l-8.1 5.9a1.1 1.1 0 0 1-1.75-.89V32h-.25A5.5 5.5 0 0 1 9 26.5v-13Z"
        fill={bubble}
      />
      {/* Antenna */}
      <path d="M24 13.6V10.4" stroke={bubble} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="8.4" r="2.5" fill={mono ? "#fff" : "#feaf04"} />

      {/* Face plate */}
      <rect x="15.5" y="14.6" width="17" height="12" rx="3.4" fill={face} />
      {/* Eyes */}
      <circle cx="20.8" cy="19.9" r="2" fill={bubble} />
      <circle cx="27.2" cy="19.9" r="2" fill={bubble} />
      {/* Smile */}
      <path
        d="M20.9 23.4c1.9 1.35 4.3 1.35 6.2 0"
        stroke={bubble}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
