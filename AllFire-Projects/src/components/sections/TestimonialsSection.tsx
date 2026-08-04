"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, StarIcon } from "@/components/ui/Icon";
import { ClientLogoTicker } from "@/components/sections/ClientLogos";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { testimonials, reviewSource, type Testimonial } from "@/content/testimonials";

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
 * 9 seconds, up from 4. These quotes run 24 to 50 words: the longest is about
 * twelve seconds of comfortable reading, and this audience skews older. At 4s
 * the card advanced before the average reader finished the first sentence,
 * which is the fastest way to make someone give up on a section.
 */
const AUTOPLAY_MS = 9000;

export function TestimonialsSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  /** Autoplay pauses while the user is interacting, and never fights them. */
  const [paused, setPaused] = useState(false);
  /**
   * Bumped by any manual navigation, and read by the autoplay effect purely to
   * restart its timer.
   *
   * Without it the interval kept running through a click: pressing Next at
   * 8.8s was followed 200ms later by an automatic advance, so one press moved
   * two cards. The user's action now resets the clock, which is what "autoplay
   * never fights the user" actually requires.
   */
  const [nudge, setNudge] = useState(0);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-card]");
      const distance = (card?.offsetWidth ?? track.clientWidth / 2) + 24;

      // At the end, loop back to the start instead of dead-ending.
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (direction === 1 && atEnd) {
        /* Instant, not smooth: a smooth scroll back across eight cards is a
           second of blur with no orientation cue. A cut reads as a reset. */
        track.scrollTo({ left: 0, behavior: "auto" });
        return;
      }

      track.scrollBy({ left: distance * direction, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce]
  );

  /** Every manual control goes through this, so none of them can forget to reset. */
  const navigate = useCallback(
    (direction: 1 | -1) => {
      scrollByCard(direction);
      setNudge((n) => n + 1);
    },
    [scrollByCard]
  );

  useEffect(() => {
    // Reduced motion means no self-moving carousel. The arrows still work.
    if (reduce || paused) return;

    const id = setInterval(() => scrollByCard(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, scrollByCard, nudge]);

  return (
    <section
      id="testimonials"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop intensity="soft" />

      <Container className="relative">
        {/* Heading names the source of the proof rather than restating the
            claim.

            It read "Trusted across Sydney / strata and commercial", which was
            the same sentence as the logo ticker's label at the foot of this
            same section, and promised strata and commercial references the
            eight reviews do not contain. Naming the source is both honest
            about the evidence and no longer a duplicate. The eyebrow went with
            it: "Client reviews" over a heading about what clients say was a
            third label for one idea. */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionHeading
              tone="light"
              lead="What Sydney building"
              accent="managers actually say"
            />
          </div>

          {/* Arrows are hidden below lg. There they landed above the carousel
              and out of thumb reach, duplicating the dots that sit under it. */}
          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() => navigate(-1)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              aria-label="Previous reviews"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              aria-label="Next reviews"
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
          /* Both releases matter. onPointerDown paused autoplay with nothing to
             unpause it: on touch there is no mouseleave, so the first tap
             killed autoplay for the rest of the session. Cancel covers the
             pointer being taken over by a scroll gesture. */
          onPointerUp={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
          /* The cards hold no focusable content, so without this the track is
             unreachable by keyboard: Tab skipped from the arrows straight past
             eight reviews to the dots. A scrollable region needs to be focusable
             to be scrollable by arrow key. */
          tabIndex={0}
          role="group"
          aria-label="Client reviews"
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {testimonials.map((testimonial) => (
            <ReviewCard key={testimonial.name + testimonial.role} testimonial={testimonial} />
          ))}
        </motion.div>

        <CarouselDots
          trackRef={trackRef}
          count={testimonials.length}
          tone="light"
          label="Testimonials"
        />

        {/* The logo wall, moved here from its own band earlier in the page.
            Named reviews and the logos of the firms that gave them are one
            argument, and they were making it a screen apart. */}
        <ClientLogoTicker className="mt-16" />
      </Container>
    </section>
  );
}

/**
 * One review.
 *
 * Attribution is the point of the redesign: stars from the reviewer's own
 * rating, and the Google mark, because these are Google reviews and saying so
 * is what makes them worth more than copy we wrote ourselves.
 *
 * The quote clamps to four lines with a Read more toggle rather than being cut
 * with an ellipsis. A truncated quote that cannot be finished is worse than a
 * shorter one: the reader is shown that something was withheld and given no way
 * to get it.
 */
function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <figure
      data-card
      /*
        Two whole cards at lg, never a sliced third. snap-start aligns to the
        left edge, and half the track minus half the gap means the pair fills it
        exactly. Below lg the peek is deliberate: one card at 86% with the next
        edge showing is what tells a thumb the row scrolls.
      */
      className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-7 lg:w-[calc(50%-0.75rem)]"
    >
      {/* Rating and source, on one line. The stars are what the reviewer gave;
          the Google mark is where they gave it. Together they are the whole
          reason this carries more weight than copy we wrote. */}
      <div className="flex items-center justify-between gap-4">
        <span
          className="flex gap-0.5 text-flame-orange"
          role="img"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4" aria-hidden="true" />
          ))}
        </span>

        <span className="flex items-center gap-1.5 text-ink-soft">
          <GoogleLogo className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold">{reviewSource}</span>
        </span>
      </div>

      {/* line-clamp keeps every card the same height at rest, so the row reads
          as a set rather than a ragged stack. Expanding is per card and does not
          disturb its neighbours, because the track is a flex row. */}
      <blockquote
        className={cn(
          "mt-5 leading-relaxed text-ink",
          !expanded && "line-clamp-4"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-2 w-fit cursor-pointer text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      <figcaption className="mt-auto flex items-center gap-3.5 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
        >
          {initialsOf(testimonial.name)}
        </span>
        <span>
          <span className="block font-display text-sm font-bold text-ink">
            {testimonial.name}
          </span>
          <span className="block text-sm text-ink-soft">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
