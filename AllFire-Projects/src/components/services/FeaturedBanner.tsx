"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, FlameIcon } from "@/components/ui/Icon";
import { resolvedSlides } from "@/content/featured";

const AUTOPLAY_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Featured product banner.
 *
 * Light panel, headline left, product right, progress dots beneath, matching
 * the supplied reference.
 *
 * Autoplay pauses on hover and on keyboard focus, and does not run at all under
 * reduced motion. A banner that keeps moving while someone is reading it, or
 * while a keyboard user is tabbing through its link, is a trap rather than a
 * feature.
 */
export function FeaturedBanner() {
  const entries = resolvedSlides();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex(((next % entries.length) + entries.length) % entries.length),
    [entries.length]
  );

  useEffect(() => {
    if (reduce || paused || entries.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % entries.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, entries.length]);

  if (entries.length === 0) return null;

  const { slide, product } = entries[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured equipment"
      className="border-b border-line bg-paper-raised"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container className="py-10 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div>
              <h2 className="font-display text-4xl leading-[1.05] font-bold text-ink md:text-5xl lg:text-6xl">
                {slide.headline}
              </h2>
              <p className="mt-3 font-display text-xl font-semibold text-flame-red-deep md:text-2xl">
                {slide.tagline}
              </p>
              <Link
                href={`/services/${slide.serviceSlug}/${slide.productSlug}`}
                className="mt-7 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-[50px] bg-flame-red-deep px-6 py-3 font-display text-sm font-bold tracking-[0.06em] text-white uppercase transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep motion-safe:hover:scale-[1.035]"
              >
                Learn more
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-white md:aspect-4/3">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
                <img
                  src={product.image}
                  alt={`${product.name}, ${product.subtitle}`}
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft/60">
                  <FlameIcon className="h-10 w-10 text-flame-orange/50" aria-hidden="true" />
                  <span className="font-display text-xs font-bold tracking-[0.14em] uppercase">
                    {product.name}
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {entries.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5 md:justify-start">
            {entries.map((entry, i) => (
              <button
                key={entry.slide.productSlug}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${entry.slide.headline}`}
                aria-current={i === index}
                /* Padding gives a 44px target while the bar itself stays thin. */
                className="group cursor-pointer py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-10 bg-flame-red-deep"
                      : "w-6 bg-ink/20 group-hover:bg-ink/40"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
