"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { CheckIcon, FlameIcon } from "@/components/ui/Icon";

const points = [
  {
    title: "System reliability",
    body: "Testing to the standard a system has to perform under, not just the one that satisfies a tag.",
  },
  {
    title: "Emergency readiness",
    body: "Defects reported with clear priorities, so the things that matter get fixed before your deadline.",
  },
  {
    title: "Secure installations",
    body: "Inspection, remediation and certification run by one team, with records formatted for lodgement.",
  },
];

const ease = [0.33, 1, 0.68, 1] as const;

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const row: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

/**
 * Fire protection overview.
 *
 * Collage on the right: two frames on top, one wide beneath, with a flame
 * medallion sitting on the seam between them. The medallion is positioned
 * against the collage wrapper rather than the section, so it stays on the seam
 * at every width instead of drifting.
 */
export function FireProtection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
        >
          <Eyebrow>Fire protection</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Comprehensive fire safety,"
            accent="trusted always"
          />
          <p className="mt-6 max-w-lg text-lg">
            Advanced fire protection delivered by people who have relied on these systems in real
            incidents, to keep lives, property and businesses safe.
          </p>

          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-9 divide-y divide-line border-t border-line"
          >
            {points.map((point) => (
              <motion.li key={point.title} variants={row} className="flex gap-4 py-6">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame-red-deep text-white">
                  <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{point.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm text-ink-soft">{point.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <PhotoFrame
              src="/images/stock/riser-room.webp"
              alt="Overhead fire services pipework in a building riser"
              className="aspect-4/3 w-full"
              tint="dark"
            />
            <PhotoFrame
              src="/images/stock/blog-2.webp"
              alt="Compliance records being checked on site"
              className="aspect-4/3 w-full"
              tint="dark"
            />
            <PhotoFrame
              src="/images/stock/backdrop-extinguishers.webp"
              alt="Fire extinguishers along a building walkway"
              className="col-span-2 aspect-21/9 w-full"
              tint="dark"
            />
          </div>

          {/* Medallion on the seam between the two rows. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(22,19,15,0.18)] md:h-24 md:w-24"
          >
            <span className="brand-gradient flex h-14 w-14 items-center justify-center rounded-full md:h-16 md:w-16">
              <FlameIcon className="h-7 w-7 text-white md:h-8 md:w-8" />
            </span>
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
