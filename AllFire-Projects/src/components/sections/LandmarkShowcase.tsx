"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landmarks } from "@/content/landmarks";
import { cn } from "@/lib/utils";

/**
 * Shared easing. Matches the curve used elsewhere in the site so this section
 * moves with the same rhythm as everything around it rather than inventing its
 * own feel.
 */
const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Expanding image strip.
 *
 * One panel is open at a time and grows to take most of the row while the rest
 * compress to slivers. Hover drives it on pointer devices, focus drives it for
 * keyboard, and the panels are real buttons so both paths land on the same
 * state.
 *
 * The animation is flex-grow rather than width: the panels share one row, so
 * growing one has to shrink the others, and letting flex distribute the space
 * keeps the row exactly full at every frame instead of accumulating rounding
 * error across six elements. It is a layout property, which the usual
 * transform-only advice warns against, but the alternative (scaling panels)
 * would overlap neighbours and distort the photographs. Cost is bounded: six
 * elements, one row, no reflow outside this section.
 *
 * Below `md` the strip becomes a vertical stack. A six-panel accordion at
 * 375px gives every panel about 60px, which is unreadable and unhittable, so
 * the interaction is dropped rather than shrunk.
 */
export function LandmarkShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <SectionHeading
              className="mt-5"
              lead="Proven across"
              accent="landmark Sydney"
            />
          </div>
          <p className="self-end text-ink-soft">
            From sandstone that predates the standards to towers that test every one of them, the
            same crew keeps them all certified.
          </p>
        </div>

        {/* Desktop: expanding strip */}
        <div className="mt-12 hidden gap-3 md:flex md:h-[26rem] lg:h-[32rem]">
          {landmarks.map((landmark, i) => {
            const isActive = i === active;

            return (
              <button
                key={landmark.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${landmark.name}: ${landmark.blurb}`}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep",
                  // The whole interaction is this one line: grow the open panel,
                  // let the others fall back to a sliver.
                  "motion-safe:transition-[flex-grow] motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.33,1,0.68,1)]",
                  isActive ? "grow-[5]" : "grow"
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  src={landmark.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  /* Scale is transform-only, so the zoom itself costs no layout
                     work even though the panel around it is resizing. */
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-110"
                  )}
                />

                {/* Scrim. Heavier on the closed panels so their vertical labels
                    stay legible over whatever the photograph is doing. */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-linear-to-t from-ink/85 via-ink/25 to-transparent"
                      : "bg-ink/55 group-hover:bg-ink/40"
                  )}
                  aria-hidden="true"
                />

                {/* Closed: name rotated up the panel, which is the only way six
                    labels fit at sliver width. */}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-300",
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  )}
                  aria-hidden="true"
                >
                  <span className="font-display text-sm font-bold tracking-[0.18em] whitespace-nowrap text-white uppercase [writing-mode:vertical-rl] rotate-180">
                    {landmark.name}
                  </span>
                </span>

                {/* Open: name and blurb, fading in behind the panel's growth so
                    the text is not sliding around while the panel resizes. */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.4, ease, delay: isActive ? 0.15 : 0 }}
                  className="absolute inset-x-0 bottom-0 p-6 text-left lg:p-8"
                >
                  <h3 className="font-display text-2xl font-bold text-white uppercase lg:text-3xl">
                    {landmark.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85 lg:text-base">
                    {landmark.blurb}
                  </p>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Mobile: plain stacked cards, no accordion. */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {landmarks.map((landmark) => (
            <div
              key={landmark.id}
              className="relative h-64 overflow-hidden rounded-2xl"
            >
              <Image
                src={landmark.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  {landmark.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">{landmark.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
