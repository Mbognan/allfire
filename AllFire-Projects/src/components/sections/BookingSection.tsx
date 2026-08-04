"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/forms/BookingForm";
import { PhoneIcon, ClockIcon, ShieldCheckIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";

const assurances = [
  { icon: ClockIcon, text: "Same business day callback" },
  { icon: ShieldCheckIcon, text: "No obligation, no sales script" },
];

export function BookingSection() {

  return (
    <section
      id="booking"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop />

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* This section was "Book an inspection". It is the quote request
              now: a separate QuoteForm on the service pages asked for the same
              thing in a second place, so the two were merged into this one. */}
          <Eyebrow tone="light">Request a quote</Eyebrow>
          <SectionHeading
            className="mt-5"
            tone="light"
            lead="Does your building need"
            accent="fire protection service?"
          />
          <p className="mt-6 max-w-md text-lg text-white/70">
            Tell us what your building needs and we&apos;ll come back with a quote. No
            obligation. For urgent after-hours issues, call our emergency line directly.
          </p>

          <a
            href={company.emergencyPhoneHref}
            className="mt-8 inline-flex cursor-pointer items-center gap-4 rounded-2xl border border-white/25 px-6 py-4 transition-colors duration-200 hover:border-white"
          >
            <span className="brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <PhoneIcon className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold tracking-wide text-white/60 uppercase">
                24/7 emergency line
              </span>
              <span className="block font-display text-2xl font-bold text-white">
                {company.emergencyPhone}
              </span>
            </span>
          </a>

          <ul className="mt-8 space-y-3">
            {assurances.map((assurance) => (
              <li key={assurance.text} className="flex items-center gap-3 text-white/70">
                <assurance.icon className="h-5 w-5 shrink-0 text-flame-yellow" />
                {assurance.text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="rounded-2xl border border-line bg-white p-8 md:p-10"
        >
          <BookingForm />
        </motion.div>
      </Container>
    </section>
  );
}
