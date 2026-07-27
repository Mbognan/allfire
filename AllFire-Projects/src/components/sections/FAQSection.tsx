"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ChevronDownIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";
import { faqs } from "@/content/faqs";

/**
 * FAQ accordion.
 *
 * Reworked from a stack of detached white blocks into one rounded surface with
 * hairline-divided rows. Two reasons: a single card stops the section reading as
 * six competing panels, and the divider is what actually communicates "these are
 * items in one list".
 *
 * The open row is marked by a brand rule down its left edge plus a tinted
 * background, so position in the list survives the panel expanding. Colour lives
 * on the open row only, never on all of them at once.
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idBase = useId();

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="lg:sticky lg:top-28"
        >
          <Eyebrow>FAQs</Eyebrow>
          <SectionHeading className="mt-5" lead="Questions we get" accent="every week" />
          <p className="mt-5 max-w-sm text-ink-soft">
            Short answers to what building owners and strata managers ask us before booking.
            Anything not covered here, call {company.phone} and ask.
          </p>
          <PhotoFrame
            src="/images/stock/technician.webp"
            alt="Fire extinguisher servicing"
            className="mt-10 hidden aspect-4/3 w-full lg:block"
            tint="brand"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="overflow-hidden rounded-2xl border border-line bg-white"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `${idBase}-panel-${i}`;
            const buttonId = `${idBase}-button-${i}`;

            return (
              <div
                key={faq.q}
                className={`relative border-b border-line last:border-b-0 transition-colors duration-200 ${
                  isOpen ? "bg-paper-raised/60" : ""
                }`}
              >
                {/* Position marker for the open row. Scales rather than
                    animating width, so it never triggers layout. */}
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
                    className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left font-display text-lg font-bold text-ink transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep md:px-8"
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
                  {/* overflow-hidden must sit on the collapsing child, not the
                      grid parent, or the first line of text leaks when closed. */}
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[65ch] px-6 pb-6 text-ink-soft md:px-8">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
