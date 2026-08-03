"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { serviceCards, type ServiceCard } from "@/content/serviceCards";

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
 * Twelve cards in the client's order: photograph, gradient icon badge on the
 * seam, then the service name.
 *
 * Four columns at lg, three at md, two at sm. Twelve divides evenly into all
 * three, which is why the grid is twelve rather than ten.
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
    >
      {serviceCards.map((card, i) =>
        card ? (
          <motion.li key={card.label} variants={item}>
            <Card card={card} />
          </motion.li>
        ) : (
          /* Held slot. Dashed and muted so it reads as reserved rather than as
             a card that failed to load, and not a link, because there is
             nowhere honest to send anyone. Replace with a real entry in
             serviceCards.ts, or drop to ten and move the grid to 5 columns. */
          <motion.li key={`held-${i}`} variants={item} aria-hidden="true">
            <div className="flex h-full min-h-52 items-center justify-center rounded-2xl border border-dashed border-white/15 p-5">
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

function Card({ card }: { card: ServiceCard }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/4 transition-colors duration-300 hover:border-flame-orange/60 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-ink-2">
        {card.image ? (
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            aria-hidden="true"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
          />
        ) : (
          /* No photograph of this work yet.

             A branded panel carrying the same icon as the badge, rather than a
             grey box or a borrowed photo of different work. It reads as
             deliberate, and swapping it for a real image is one line in
             serviceCards.ts with no change here. */
          <div
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white/8 to-transparent"
            aria-hidden="true"
          >
            <card.Icon className="h-12 w-12 text-white/15" />
          </div>
        )}

        {/* Scrim under the badge only, so it never dims the photograph above. */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/70 to-transparent"
          aria-hidden="true"
        />

        <span className="brand-gradient absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110">
          <card.Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {card.standard && (
          <span className="font-display text-xs font-bold tracking-[0.14em] text-flame-yellow tabular-nums">
            {card.standard}
          </span>
        )}
        <span className="mt-1 block font-display text-base leading-tight font-bold text-balance text-white transition-colors duration-200 group-hover:text-flame-yellow">
          {card.label}
        </span>
      </div>
    </Link>
  );
}
