"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CountUp } from "@/components/ui/CountUp";
import { company } from "@/content/company";

const ease = [0.33, 1, 0.68, 1] as const;

export function Hero() {

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/*
        Served directly rather than through next/image on purpose.

        This is a decorative full-bleed background that is already
        pre-optimised to WebP at two widths, so the optimiser adds nothing but
        a round trip. In dev it was actively harmful: the w=1920 request hung
        and left the LCP element blank. `fetchPriority="high"` plus no lazy
        loading keeps it early in the queue.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised decorative background, see note above */}
      <img
        src="/images/hero-bg.webp"
        srcSet="/images/hero-bg-sm.webp 1100w, /images/hero-bg.webp 1920w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim: keeps the headline above 4.5:1 against a busy photo, and carries
          the brand wash across the right side. */}
      <div
        className="absolute inset-0 bg-linear-to-r from-ink via-ink/88 to-ink/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(252,4,3,0.34), transparent 58%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[calc(100dvh-7.75rem)] flex-col justify-center py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <Eyebrow tone="light">Reliable fire safety starts here</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.08, ease }}
          className="mt-6 max-w-4xl font-display text-[2.9rem] leading-[0.98] font-bold text-white uppercase sm:text-6xl lg:text-[5.25rem]"
        >
          Fire safety is not a box to tick,{" "}
          <span className="brand-gradient-text">it&apos;s a responsibility</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.16, ease }}
          className="mt-7 max-w-xl text-lg text-white/75"
        >
          Firefighter-run compliance for Sydney strata, commercial and industrial buildings.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.24, ease }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="#booking" variant="primary">
            Get a Quote
          </Button>
          <Button href="#services" variant="outline-light" withArrow={false}>
            Explore Our Services
          </Button>
        </motion.div>

        {/* Founding credential strip, sitting below the primary block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.36 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-8"
        >
          <div>
            <p className="font-display text-3xl font-bold text-flame-yellow tabular-nums">
              <CountUp value={38} suffix="+" />
            </p>
            <p className="text-sm text-white/60">Years of experience</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-flame-yellow tabular-nums">
              <CountUp value={company.legacyYear} duration={1800} />
            </p>
            <p className="text-sm text-white/60">Family fire service legacy</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-flame-yellow">24/7</p>
            <p className="text-sm text-white/60">Emergency response</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
