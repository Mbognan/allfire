"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { company } from "@/content/company";
import { Toast } from "@/components/ui/Toast";

/** Spin is the one place an infinite animation is correct: async progress. */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const inputClasses =
  "min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:outline-none";

const labelClasses = "font-display text-sm font-bold tracking-wide text-ink";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Quote request, scoped to one service.
 *
 * Four fields. A quote request is a lead, not an application: every extra
 * required field is a person who does not finish. The service name is carried
 * in a hidden field rather than asked for, because the page already knows it.
 */
export function QuoteForm({ service }: { service: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  /* Separate from `status` so dismissing the toast does not revert the form out
     of its success state. */
  const [toastOpen, setToastOpen] = useState(false);
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setToastOpen(true);
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <>
        {/* Both, deliberately. The toast catches the eye of someone who has
            already scrolled past the form; the panel is what they find when
            they scroll back and wonder whether it actually sent. */}
        <Toast
          open={toastOpen}
          message="Quote request sent. We will be in touch."
          onClose={() => setToastOpen(false)}
        />

        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-ink uppercase">Request sent</h3>
          <p className="mt-2 text-ink-soft">
            We will come back to you with a quote within one business day. For anything urgent,
            call{" "}
            <a href={company.phoneHref} className="cursor-pointer font-semibold text-flame-red-deep">
              {company.phone}
            </a>
            .
          </p>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-paper-raised p-6 md:p-8">
      {/* Carried, not asked. The page knows which service this is. */}
      <input type="hidden" name="service" value={service} />

      {/* Honeypot — visually hidden (not display:none) so bots that skip hidden
          fields still fill it. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <h3 className="font-display text-xl font-bold text-ink uppercase">Request a quote</h3>
      <p className="mt-2 text-sm text-ink-soft">
        For {service.toLowerCase()}. No obligation, and we will not add you to a mailing list.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClasses}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClasses}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className={labelClasses}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelClasses}>
            What do you need?{" "}
            <span className="font-sans font-normal text-ink-soft">(Optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            placeholder="Building type, number of units, anything already booked in."
            className={`mt-2 ${inputClasses} resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-sm font-semibold text-flame-red-deep">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending
            </>
          ) : (
            "Get a quote"
          )}
        </Button>
        <p className="text-sm text-ink-soft">
          Or call{" "}
          <a
            href={company.phoneHref}
            className="cursor-pointer font-bold text-flame-red-deep transition-colors duration-200 hover:text-ink"
          >
            {company.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
