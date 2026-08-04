"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Button } from "@/components/ui/Button";
import { CheckIcon, ClockIcon, ShieldCheckIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";
import { story } from "@/content/mission";

const pillars = [
  { icon: ClockIcon, title: "Fast, reliable service", body: "Same business day callback." },
  { icon: ShieldCheckIcon, title: "Certified expert team", body: "FPA member, Class C licensed." },
];

const proof = [
  "Serving and retired professional firefighters on every job",
  "Inspection, remediation and certification handled by one team",
  "Reporting formatted for your AFSS and council lodgement",
];

const ease = [0.33, 1, 0.68, 1] as const;

export function AboutStory() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      <BrandCorner position="top-right" />

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          <PhotoFrame
            src="/images/stock/riser-room.webp"
            alt="Fire services riser room inspection"
            className="aspect-4/5 w-full"
            tint="dark"
          />

          {/* Experience badge, anchored to the image rather than floating in the
              column, so it stays put at every width. */}
          <div className="absolute bottom-6 -right-2 rounded-2xl bg-ink px-7 py-5 text-white shadow-[0_18px_40px_rgba(22,19,15,0.28)] sm:right-6">
            <p className="font-display text-4xl font-bold text-flame-yellow tabular-nums">
              {company.yearsExperience}
            </p>
            <p className="mt-1 text-sm text-white/70">Years of experience</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
        >
          <Eyebrow>About us</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Dedication to delivering the best"
            accent="fire safety solutions"
          />

          <p className="mt-6 max-w-xl text-lg">
            {story.founding} {story.concept}
          </p>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="group flex items-start gap-4">
                <span className="relative isolate flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 group-hover:border-transparent">
                  <span
                    className="brand-gradient absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <pillar.icon className="h-6 w-6 text-flame-red-deep transition-colors duration-300 group-hover:text-white" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{pillar.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-9 grid gap-3 border-t border-line pt-8">
            {proof.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flame-red-deep text-white">
                  <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/#booking" variant="primary"
            withArrow
          >
              Get a Quote
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
