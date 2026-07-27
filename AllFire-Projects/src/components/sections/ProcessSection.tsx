"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Enquire",
    detail: "Tell us what your building needs. We call back the same business day.",
  },
  {
    number: "02",
    title: "Inspect & test",
    detail: "Firefighter-trained technicians assess every measure against AS1851.",
  },
  {
    number: "03",
    title: "Fix & certify",
    detail: "We remediate what's needed and prepare your statement for lodgement.",
  },
  {
    number: "04",
    title: "Stay compliant",
    detail: "Scheduled reminders before your next deadline, so nothing slips.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function ProcessSection({ showHeading = true }: { showHeading?: boolean } = {}) {

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container>
        {/* Suppressed where a page banner already carries the same message. */}
        {showHeading && (
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <SectionHeading className="mt-5" lead="Compliance handled" accent="end to end" />
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className={`grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 ${showHeading ? "mt-14" : ""}`}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="group relative rounded-2xl border border-line bg-white p-8 transition-colors duration-200 hover:border-transparent hover:bg-ink"
            >
              <span className="brand-gradient-text font-display text-5xl font-bold">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink transition-colors duration-200 group-hover:text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm transition-colors duration-200 group-hover:text-white/70">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
