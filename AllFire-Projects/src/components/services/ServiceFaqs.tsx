"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icon";
import type { ServiceFaq } from "@/types/service";

/**
 * Service-page FAQ accordion.
 *
 * Same interaction contract as the homepage accordion: one row open at a time,
 * grid-rows collapse for a height-agnostic animation, and `overflow-hidden` on
 * the collapsing child rather than the grid parent, or the first line of the
 * answer leaks out while closed.
 */
export function ServiceFaqs({ faqs }: { faqs: ServiceFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idBase = useId();

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-line">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const panelId = `${idBase}-panel-${i}`;
        const buttonId = `${idBase}-button-${i}`;

        return (
          <div
            key={faq.q}
            className={`relative border-b border-line last:border-b-0 transition-colors duration-200 ${
              isOpen ? "bg-paper-raised/60" : "bg-white"
            }`}
          >
            <span
              aria-hidden="true"
              className={`brand-gradient absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-300 ${
                isOpen ? "scale-y-100" : "scale-y-0"
              }`}
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left font-display text-lg font-bold text-ink transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                {faq.q}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                    isOpen
                      ? "border-transparent bg-flame-red-deep text-white"
                      : "border-line text-flame-red-deep"
                  }`}
                >
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[65ch] px-6 pb-6 text-ink-soft">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
