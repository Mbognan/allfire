"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon, FlameIcon, ShieldCheckIcon } from "@/components/ui/Icon";

const capabilities = [
  { icon: FlameIcon, label: "Cutting-edge technology" },
  { icon: ShieldCheckIcon, label: "Advanced safety solutions" },
];

const points = [
  "Class C licensed across nine categories of fire protection work",
  "Testing to AS1851, AS2293 and the NSW fire safety schedule",
  "Reliable, efficient solutions tailored to your building",
];

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Expertise band.
 *
 * The reference for this section is a flat orange panel with white copy on it.
 * That fails contrast: white on flame-orange is 3.26:1. So the gradient runs
 * red-deep to orange left-to-right and the copy sits on the red end, where
 * white reaches 4.94:1. The orange still carries the right half behind the
 * figure, where nothing has to be read.
 */
export function AboutExpertise() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-r from-flame-red-deep via-flame-red to-flame-orange">
      {/*
        items-end + the negative bottom margin on the figure column is what
        makes the firefighter stand ON the section edge instead of floating in
        the middle of it. The copy column keeps its own padding.
      */}
      <Container className="relative grid grid-cols-1 items-end gap-10 pt-16 pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="lg:pb-20"
        >
          <p className="font-display text-sm font-bold tracking-[0.18em] text-white/85 uppercase">
            Our expertise
          </p>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-bold text-white uppercase md:text-5xl">
            Delivering trusted innovative fire protection
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            {capabilities.map((capability) => (
              <span
                key={capability.label}
                className="inline-flex items-center gap-3 rounded-[50px] bg-white/15 px-5 py-3 font-display text-sm font-bold tracking-wide text-white uppercase"
              >
                <capability.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {capability.label}
              </span>
            ))}
          </div>

          <ul className="mt-8 grid gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-flame-red-deep">
                  <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="max-w-lg text-white">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/#contact" variant="ink">
              Contact Us
            </Button>
          </div>
        </motion.div>

        {/* Figure is decorative here; the heading already carries the message. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease }}
          className="relative hidden self-end justify-self-end lg:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised cutout */}
          <img
            src="/images/expertise-firefighter.webp"
            alt=""
            width={549}
            height={767}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="pointer-events-none block h-auto w-full max-w-sm align-bottom"
          />
        </motion.div>
      </Container>
    </section>
  );
}
