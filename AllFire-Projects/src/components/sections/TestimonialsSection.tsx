"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarIcon, ArrowRightIcon } from "@/components/ui/Icon";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { testimonials } from "@/content/testimonials";

function initialsOf(label: string) {
  return label
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Autoplay interval.
 *
 * The brief said "at least 2 seconds". This sits at the readable end of that:
 * these quotes run two to three lines, and 2s advances the card before an
 * average reader finishes the first sentence. Change this one number to retune.
 */
const AUTOPLAY_MS = 4000;

export function TestimonialsSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  /** Autoplay pauses while the user is interacting, and never fights them. */
  const [paused, setPaused] = useState(false);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-card]");
      const distance = (card?.offsetWidth ?? 380) + 24;

      // At the end, loop back to the start instead of dead-ending.
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (direction === 1 && atEnd) {
        track.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
        return;
      }

      track.scrollBy({ left: distance * direction, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  useEffect(() => {
    // Reduced motion means no self-moving carousel. The arrows still work.
    if (reduce || paused) return;

    const id = setInterval(() => scrollByCard(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, scrollByCard]);

  return (
    <section
      id="testimonials"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop intensity="soft" />

      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Client reviews</Eyebrow>
            <SectionHeading
              className="mt-5"
              tone="light"
              lead="Trusted across Sydney"
              accent="strata and commercial"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name + testimonial.role}
              data-card
              /*
                Card width is what makes this a carousel rather than a twitch.
                At 400px, three cards nearly filled a 1168px track and autoplay
                had only 80px of travel. At w-140 two cards show and the third
                is genuinely off-screen, so each advance reads as a move.
              */
              className="flex w-[86%] shrink-0 snap-center flex-col justify-between rounded-2xl border border-line bg-white p-8 sm:w-100 lg:w-140"
            >
              <div>
                <div className="flex gap-1 text-flame-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-5 text-ink-soft">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                >
                  {initialsOf(testimonial.name)}
                </span>
                <span className="text-sm">
                  <span className="block font-display text-base font-bold text-ink">
                    {testimonial.name}
                  </span>
                  <span className="block">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <CarouselDots
          trackRef={trackRef}
          count={testimonials.length}
          tone="light"
          label="Testimonials"
        />
      </Container>
    </section>
  );
}
