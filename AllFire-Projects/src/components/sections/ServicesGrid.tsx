"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { serviceCards } from "@/content/serviceCards";

const ease = [0.33, 1, 0.68, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

/**
 * The services grid.
 *
 * No photography, on purpose. Twelve cards would need twelve photographs, and
 * five exist: generated images whose signage does not survive reading, plus two
 * real job photos. Padding the rest with stock would put invented imagery in
 * front of a compliance offer.
 *
 * So the card carries the standard instead. "AS 2293" is the fastest way for a
 * manager to match a card to a line on their fire safety schedule, and it is
 * something no competitor's template card can fake. It also leaves the real
 * photography elsewhere on the page reading as evidence rather than decoration.
 *
 * Four columns at lg, three at md, two at sm. Twelve divides evenly into all
 * three, which is the reason the grid is twelve rather than ten.
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {serviceCards.map((card, i) =>
        card ? (
          <motion.li key={card.label} variants={item}>
            <Link
              href={card.href}
              className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/12 bg-white/4 p-5 transition-colors duration-300 hover:border-flame-orange/60 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange md:p-6"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white">
                  <card.Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                {/* Arrow appears on hover and, importantly, on keyboard focus:
                    a hover-only affordance is invisible to half the audience. */}
                <ArrowRightIcon
                  className="h-4 w-4 shrink-0 text-white/0 transition-colors duration-300 group-hover:text-flame-yellow group-focus-visible:text-flame-yellow"
                  aria-hidden="true"
                />
              </span>

              <span>
                {card.standard && (
                  <span className="block font-display text-xs font-bold tracking-[0.14em] text-flame-yellow tabular-nums">
                    {card.standard}
                  </span>
                )}
                <span className="mt-1.5 block font-display text-base leading-tight font-bold text-balance text-white transition-colors duration-200 md:text-lg">
                  {card.label}
                </span>
              </span>
            </Link>
          </motion.li>
        ) : (
          /* Held slot. Dashed and muted so it reads as reserved rather than as
             a card that failed to load, and not a link, because there is
             nowhere honest to send anyone. Replace with a real entry in
             serviceCards.ts, or drop to ten and change the grid to 5 columns. */
          <motion.li key={`held-${i}`} variants={item} aria-hidden="true">
            <div className="flex h-full min-h-36 items-center justify-center rounded-2xl border border-dashed border-white/15 p-5">
              <span className="font-display text-xs font-bold tracking-[0.14em] text-white/25 uppercase">
                Service to come
              </span>
            </div>
          </motion.li>
        )
      )}
    </motion.ul>
  );
}
