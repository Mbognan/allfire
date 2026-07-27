"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * "Ask a question" block, in place of a public comment thread.
 *
 * Questions go to AllFire by email rather than onto the page. For a fire
 * compliance business a public thread is a liability: answering a specific
 * question about a stranger's building in public is advice, and it invites
 * spam and moderation work nobody has budgeted for. This keeps the reader's
 * question answered and turns it into a real enquiry.
 *
 * Three fields only. Every extra required field on a question form costs
 * enquiries, which is why this does not reuse the booking schema.
 */
export function ArticleQuestion({ articleTitle }: { articleTitle: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          articleTitle,
          articleUrl: window.location.href,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <section className="mt-14 rounded-2xl border border-line bg-paper-raised p-8">
        <p className="flex items-center gap-3 font-display text-2xl font-bold text-ink">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame-red-deep text-white">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          Question received
        </p>
        <p className="mt-3 max-w-[60ch] text-ink-soft">
          Thanks, one of our team will email you back. If it is urgent, call us on{" "}
          <a
            href={company.phoneHref}
            className="cursor-pointer font-semibold text-flame-red-deep transition-colors duration-200 hover:text-ink"
          >
            {company.phone}
          </a>
          .
        </p>
      </section>
    );
  }

  return (
    <section className="mt-14 rounded-2xl border border-line p-8">
      <h2 className="font-display text-2xl font-bold text-ink uppercase">
        Have a question about <span className="brand-gradient-text">this?</span>
      </h2>
      <p className="mt-2 max-w-[60ch] text-ink-soft">
        Ask us directly and a member of the team will email you back. We answer questions about
        your building, not just the article.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Honeypot — visually hidden, not display:none, so bots that skip
            hidden fields still fill it. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Leave this field empty</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-name`}
            className="font-display text-sm font-bold tracking-wide text-ink uppercase"
          >
            Your name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-email`}
            className="font-display text-sm font-bold tracking-wide text-ink uppercase"
          >
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor={`${formId}-question`}
            className="font-display text-sm font-bold tracking-wide text-ink uppercase"
          >
            Your question
          </label>
          <textarea
            id={`${formId}-question`}
            name="question"
            required
            rows={4}
            minLength={10}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:outline-none"
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-flame-red-deep sm:col-span-2">
            {errorMessage}
          </p>
        )}

        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending" : "Send question"}
          </Button>
          <span aria-live="polite" className="sr-only">
            {status === "submitting" ? "Sending your question" : ""}
          </span>
        </div>
      </form>
    </section>
  );
}
