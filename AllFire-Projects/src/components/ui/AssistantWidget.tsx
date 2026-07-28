"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Logo } from "@/components/brand/Logo";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

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
  /* Controlled, so Send can be disabled on an empty box rather than accepting
     the click and doing nothing. */
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi. How can I help you today?", isGreeting: true },
    {
      from: "bot",
      text: "Ask about compliance deadlines, inspections or bookings, or pick a topic below.",
      suggestions: suggestionRounds[0],
      isGreeting: true,
    },
  ]);

  const canSend = draft.trim().length > 0 && !thinking;

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
      {/* Launcher.

          A bare robot mark asked the visitor to work out what it was before
          they could decide to use it. This is the company logo they already
          recognise plus a literal instruction, so the control explains itself.

          It unmounts while the panel is open: two overlapping chat affordances
          in the same corner is the thing that reads as clutter, and the panel
          already carries its own close button. */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.18, ease } }}
            transition={{ duration: 0.8, delay: engaged ? 0 : 1, ease }}
            className="fixed right-5 bottom-5 z-50"
          >
            <div className="relative">
              {/* Soft pulse behind the button. Non-interactive, stops once engaged. */}
              {!engaged && (
                <>
                  <span
                    className="assistant-ping pointer-events-none absolute inset-0 rounded-full bg-flame-orange/35"
                    aria-hidden="true"
                  />
                  <span
                    className="assistant-ping assistant-ping-delayed pointer-events-none absolute inset-0 rounded-full bg-flame-orange/35"
                    aria-hidden="true"
                  />
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  setEngaged(true);
                }}
                aria-expanded={open}
                aria-label="Need help? Open the AllFire chat assistant"
                /* min-h-14 is a generous touch target, well past the 44px
                   minimum, for less precise pointing. */
                className="relative flex min-h-14 cursor-pointer items-center gap-3 rounded-full border border-line bg-white py-3 pr-6 pl-4 shadow-2xl transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
              >
                <Logo className="h-8 w-auto lg:h-8" />
                <span className="font-display text-lg leading-none font-bold text-ink uppercase">
                  Need Help?
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AllFire assistant"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.26, ease }}
            /* Sits where the launcher was, since the launcher is now hidden
               while this is open. */
            className="fixed right-5 bottom-5 z-50 flex h-[min(44rem,calc(100vh-2.5rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Header with a curved lower edge */}
            <div className="brand-gradient relative z-10 shrink-0 pt-5 pb-9">
              <div className="flex items-start gap-3 px-5">
                {/* The light lockup sits straight on the gradient: no plate,
                    no container. */}
                <Logo tone="paper" className="h-10 w-auto shrink-0 lg:h-10" />

                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl leading-tight font-bold text-white uppercase">
                    Need Help?
                  </p>
                  <p className="mt-0.5 text-sm text-white/90">We are online</p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  /* Full 44px target: closing was the fiddliest control here. */
                  className="-mr-1.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronDown className="h-6 w-6" />
                </button>
              </div>

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

                The scroller is positioned absolutely inside this wrapper, which
                is what actually makes it scroll. Left in flow it contributed
                its full content height back to the flex column, so the region
                grew with the transcript instead of overflowing, and the last
                reply was clipped by the panel with no way to reach it. Taken
                out of flow the wrapper measures zero, so flex-1 hands it
                exactly the leftover space and inset-0 pins the scroller to it.

                min-h-40 then only sets a floor for a short conversation. */}
            <div className="relative min-h-40 flex-1 overflow-hidden">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-white to-transparent"
                aria-hidden="true"
              />
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-label="Conversation"
                className="absolute inset-0 space-y-3 overflow-y-auto overscroll-contain bg-white px-4 pt-4 pb-4"
              >
                {messages.map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className={
                        m.from === "bot"
                          ? "max-w-[88%] rounded-2xl rounded-tl-md bg-paper-raised px-4 py-3 text-base leading-relaxed text-ink"
                          : "brand-gradient ml-auto max-w-[88%] rounded-2xl rounded-tr-md px-4 py-3 text-base leading-relaxed font-medium text-white"
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
                              className="min-h-12 cursor-pointer rounded-full border-2 border-flame-red-deep px-4 py-2 text-[0.9375rem] font-semibold text-flame-red-deep transition-colors duration-200 hover:bg-flame-red-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep disabled:cursor-not-allowed disabled:opacity-50"
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
                if (!canSend) return;
                send(draft);
                setDraft("");
              }}
              className="relative shrink-0 border-t border-line bg-white px-4 pt-3 pb-4"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Type your question for AllFire
              </label>
              <input
                id="assistant-input"
                name="q"
                type="text"
                autoComplete="off"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={thinking}
                placeholder={thinking ? "Thinking..." : "Type your question here..."}
                /* text-base, not text-sm: under 16px iOS zooms the whole page
                   on focus, and small type is the first thing to fail here. */
                className="w-full bg-transparent pr-14 text-base text-ink placeholder:text-ink-soft/70 focus:outline-none disabled:cursor-not-allowed"
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

              {/* Send is inert until there is something to send, so an empty
                  press can't read as the assistant ignoring you. Greyed rather
                  than gradient, so the difference is legible at a glance and
                  not carried by colour alone. */}
              <button
                type="submit"
                aria-label="Send message"
                disabled={!canSend}
                className={cn(
                  "absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-[filter,transform,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-orange",
                  canSend
                    ? "brand-gradient cursor-pointer hover:scale-105 hover:brightness-110"
                    : "cursor-not-allowed bg-ink-soft/30 shadow-none"
                )}
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
