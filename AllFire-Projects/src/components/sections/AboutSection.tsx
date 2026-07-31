"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { PlayButton } from "@/components/ui/PlayButton";
import { CheckIcon, FlameIcon, ShieldCheckIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";
import { story } from "@/content/mission";

const pillars = [
  { icon: FlameIcon, title: "Firefighter-led crew" },
  { icon: ShieldCheckIcon, title: "FPA Australia member" },
];

const points = [
  "Serving and retired professional firefighters on every job",
  "Full Annual Fire Safety Statement handled start to finish",
  "Scheduled reminders so deadlines never catch you out",
];

const ease = [0.33, 1, 0.68, 1] as const;

export function AboutSection() {

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      <BrandCorner position="top-right" />
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image collage with overlapping stat card */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          {/* Vertical brand rule running alongside the collage */}
          <span
            className="brand-gradient absolute top-0 right-0 hidden h-2/5 w-2.5 sm:block"
            aria-hidden="true"
          />

          <PhotoFrame
            src="/images/stock/riser-room.webp"
            alt="Fire services riser room inspection"
            className="aspect-4/5 w-full sm:w-[85%]"
            tint="dark"
          />

          <PhotoFrame
            src="/images/stock/hydrant.webp"
            alt="Hydrant valve testing"
            tint="brand"
            className="absolute right-0 bottom-24 hidden aspect-square w-1/2 border-8 border-white sm:block"
          />

          {/* Dark card with the figure in brand gradient, per the reference.
              Keeping it dark stops a third gradient block competing here. */}
          <div className="absolute bottom-0 left-0 bg-ink px-8 py-6 sm:left-6">
            <p className="brand-gradient-text font-display text-4xl font-bold">
              {company.yearsExperience}
            </p>
            <p className="font-display text-sm font-semibold tracking-wide text-white uppercase">
              Years of experience
            </p>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <Eyebrow>About us</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Fire protection"
            accent="runs in our blood"
          />

          <p className="mt-6 max-w-lg text-lg">
            {story.founding} {story.concept}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex items-center gap-3.5">
                <span className="brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <pillar.icon className="h-6 w-6 text-white" />
                </span>
                <p className="font-display text-lg font-bold text-ink">{pillar.title}</p>
              </div>
            ))}
          </div>

          {/* Checklist paired with a video card, as in the reference layout */}
          <div className="mt-8 grid grid-cols-1 items-start gap-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <ul className="space-y-3.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-flame-orange" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href="#booking" variant="primary">
                  Book an inspection
                </Button>
              </div>
            </div>

            <a
              href="#video"
              className="group relative block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
              aria-label="Watch: see how we keep Sydney buildings compliant"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail host */}
              <img
                src="https://i.ytimg.com/vi/692S-zAhRgA/hqdefault.jpg"
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-ink/35 transition-colors duration-200 group-hover:bg-ink/20" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <PlayButton size="sm" />
              </span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
