"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRightIcon } from "@/components/ui/Icon";
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
            <div className="flex h-full min-h-52 items-center justify-center rounded-2xl border border-dashed border-line p-5">
              <span className="font-display text-xs font-bold tracking-[0.14em] text-ink-soft/40 uppercase">
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
      /* On white the card can no longer be a translucent white panel. It is a
         hairline box that lifts on hover: the border carries the shape at rest,
         a tinted shadow carries it on hover. The shadow is warm rather than
         black, so it reads as light falling on paper rather than as a cutout. */
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 hover:border-flame-orange/50 hover:shadow-[0_12px_28px_rgba(22,19,15,0.10)] motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-raised">
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
            className="absolute inset-0 flex items-center justify-center bg-paper-raised"
            aria-hidden="true"
          >
            <card.Icon className="h-12 w-12 text-ink-soft/25" />
          </div>
        )}

        {/* No scrim. It existed to keep the badge legible against a dark
            section; the badge is a saturated gradient chip on white and holds
            its own. */}

        <span className="brand-gradient absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 motion-safe:group-hover:scale-110">
          <card.Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        {/* Go-arrow.

            The card is a link, but nothing on it said so: the badge is an
            identifier and the label is a title, so at rest the tile reads as a
            picture with a caption. This is the affordance.

            It arrives from the left and settles, rather than simply fading:
            direction is what makes it read as "this takes you somewhere" rather
            than as a decoration appearing. Opposite corner to the badge, so the
            two never collide, and both are transform-only so neither costs
            layout while the image is also scaling. */}
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0 motion-safe:group-focus-visible:translate-x-0"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {card.standard && (
          <span className="font-display text-xs font-bold tracking-[0.14em] text-flame-red-deep tabular-nums">
            {card.standard}
          </span>
        )}
        <span className="mt-1 block font-display text-base leading-tight font-bold text-balance text-ink transition-colors duration-200 group-hover:text-flame-red-deep">
          {card.label}
        </span>
      </div>
    </Link>
  );
}
