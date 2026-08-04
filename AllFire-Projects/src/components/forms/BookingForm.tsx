"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { company } from "@/content/company";

const propertyTypes = [
  "Strata / Residential",
  "Commercial / Retail",
  "School / Childcare",
  "Government / Industrial",
  "Other",
];

/** Spin is the one place an infinite animation is correct: async progress. */
function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const inputClasses =
  "min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-ink focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
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
      const res = await fetch("/api/contact", {
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
        <h3 className="font-display text-2xl font-bold uppercase text-ink">Quote request sent</h3>
        <p className="mt-2 text-ink-soft">
          Thanks, the AllFire team will come back to you with a quote. For anything urgent,
          call us directly on{" "}
          <a href={company.phoneHref} className="cursor-pointer font-semibold text-flame-red-deep">
            {company.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* Honeypot — visually hidden (not display:none) so bots that skip hidden fields still fill it. */}
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
        <label htmlFor={`${formId}-name`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Full name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          className={inputClasses}
          placeholder="Jane Smith"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-phone`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Phone
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          required
          className={inputClasses}
          /* Generic hint, not a sample number. This field is the visitor's own
             phone, so a fake mobile here only invites confusion with a real
             contact number. */
          placeholder="Your contact number"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={`${formId}-email`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder="jane@building.com.au"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-propertyType`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Property type
        </label>
        <select
          id={`${formId}-propertyType`}
          name="propertyType"
          required
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            Select property type
          </option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-serviceNeeded`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Service needed
        </label>
        <select
          id={`${formId}-serviceNeeded`}
          name="serviceNeeded"
          required
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Not sure / general enquiry">Not sure / general enquiry</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-preferredDate`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Preferred date
          <span className="ml-1 font-normal text-ink-soft">(optional)</span>
        </label>
        <input
          id={`${formId}-preferredDate`}
          name="preferredDate"
          type="date"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-message`} className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Anything else?
          <span className="ml-1 font-normal text-ink-soft">(optional)</span>
        </label>
        <input
          id={`${formId}-message`}
          name="message"
          type="text"
          className={inputClasses}
          placeholder="Building access notes, AFSS due date..."
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="text-sm font-medium text-flame-red-deep sm:col-span-2"
        >
          {errorMessage}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          withArrow={status !== "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending
            </>
          ) : (
            "Request a quote"
          )}
        </Button>
        {/* Announced to screen readers without stealing focus */}
        <span aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your booking request" : ""}
        </span>
      </div>
    </form>
  );
}
