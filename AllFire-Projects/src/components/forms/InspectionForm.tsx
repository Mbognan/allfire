"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { company } from "@/content/company";

/** Spin is the one place an infinite animation is correct: async progress. */
function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* min-h-11 clears the 44px touch minimum. Matches BookingForm so the two forms
   on this site are visibly the same control set. */
const inputClasses =
  "min-h-11 w-full rounded-xl border border-line bg-paper-raised px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:bg-white focus:outline-none";

const labelClasses = "font-display text-sm font-bold tracking-wide text-ink";

type Status = "idle" | "submitting" | "success" | "error";

/** Marks a required field for sighted users; the input carries `required` for the rest. */
function Required() {
  return (
    <span className="text-flame-red-deep" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

/**
 * Book an inspection.
 *
 * Field order follows the client's reference: identity, then contact, then an
 * optional property location block, then the free-text question. Location is
 * grouped in a fieldset and labelled optional so nobody stalls on a postcode
 * they do not have to give.
 *
 * Replaces BookingForm in this slot. That form asked for property type, service
 * and preferred date as required selects, which is three more decisions before
 * someone can ask a question. BookingForm is retained, not deleted, if those
 * fields turn out to be needed.
 */
export function InspectionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
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
      <div className="rounded-2xl border border-line bg-paper-raised p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-ink uppercase">Message received</h3>
        <p className="mt-2 text-ink-soft">
          Thanks, the AllFire team will come back to you within one business day. For anything
          urgent, call{" "}
          <a href={company.phoneHref} className="cursor-pointer font-semibold text-flame-red-deep">
            {company.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot — visually hidden (not display:none) so bots that skip hidden
          fields still fill it. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-firstName`} className={labelClasses}>
            First Name
            <Required />
          </label>
          <input
            id={`${id}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Enter Your First Name"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-lastName`} className={labelClasses}>
            Last Name
            <Required />
          </label>
          <input
            id={`${id}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Enter Your Last Name"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClasses}>
            Phone
            <Required />
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            /* type=tel brings up the numeric keypad on mobile. */
            type="tel"
            required
            autoComplete="tel"
            placeholder="Contact Number"
            className={`mt-2 ${inputClasses}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelClasses}>
            Email
            <Required />
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email Address"
            className={`mt-2 ${inputClasses}`}
          />
        </div>
      </div>

      {/* Optional location. A real fieldset so screen readers announce the
          grouping and the "optional" once, rather than four unexplained
          address fields after a required block. */}
      <fieldset className="mt-8">
        <legend className="font-display text-sm font-bold tracking-wide text-ink">
          Property Location{" "}
          <span className="font-sans font-normal text-ink-soft">(Optional)</span>
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-address`} className={labelClasses}>
              Address
            </label>
            <input
              id={`${id}-address`}
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Street Address"
              className={`mt-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor={`${id}-suburb`} className={labelClasses}>
              Suburb
            </label>
            <input
              id={`${id}-suburb`}
              name="suburb"
              type="text"
              autoComplete="address-level2"
              placeholder="Suburb"
              className={`mt-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor={`${id}-state`} className={labelClasses}>
              State
            </label>
            <input
              id={`${id}-state`}
              name="state"
              type="text"
              autoComplete="address-level1"
              placeholder="State (e.g. NSW)"
              className={`mt-2 ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor={`${id}-postcode`} className={labelClasses}>
              Postcode
            </label>
            <input
              id={`${id}-postcode`}
              name="postcode"
              /* inputMode over type=number: postcodes are not quantities, and
                 number inputs bring spinners and drop leading zeros. */
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Postcode"
              className={`mt-2 ${inputClasses}`}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor={`${id}-message`} className={labelClasses}>
          How Can We Help?
          <Required />
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          className={`mt-2 ${inputClasses} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-sm font-semibold text-flame-red-deep">
          {errorMessage}
        </p>
      )}

      <div className="mt-8">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending
            </>
          ) : (
            "Submit Form"
          )}
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-sm text-ink-soft">
        <p>
          Direct Hotline{" "}
          <a
            href={company.phoneHref}
            className="cursor-pointer font-bold text-flame-red-deep transition-colors duration-200 hover:text-ink"
          >
            {company.phone}
          </a>
        </p>
        <p>Fast 24-Hour Inquiry Response</p>
      </div>
    </form>
  );
}
