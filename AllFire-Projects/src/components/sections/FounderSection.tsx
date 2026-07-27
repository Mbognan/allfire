"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { founder } from "@/content/founder";

const ease = [0.33, 1, 0.68, 1] as const;

const strip: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const gallery = [
  { src: "/images/stock/crew-1.webp", alt: "AllFire crew on site" },
  { src: "/images/stock/crew-2.webp", alt: "Technicians during an inspection" },
  { src: "/images/stock/crew-3.webp", alt: "The Sydney team at work" },
  { src: "/images/stock/crew-4.webp", alt: "Crew on a commercial job" },
  { src: "/images/stock/crew-5.webp", alt: "Team briefing before a job" },
];

/**
 * Not another image-left / copy-right split like About. Large portrait anchors
 * one side, the quote runs oversized beside it, and the crew sits as a
 * horizontal strip beneath rather than a collage.
 */
export function FounderSection() {
  return (
    <section
      id="pete"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop intensity="soft" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Large portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            className="relative"
          >
            <PhotoFrame
              src="/images/our-team/pete_img.jpeg"
              alt={`${founder.name}, ${founder.role}`}
              className="aspect-4/5 w-full"
              tint="dark"
            />
            <div className="brand-gradient absolute -bottom-5 left-0 px-6 py-4 sm:left-8">
              <p className="font-display text-xl font-bold text-white uppercase">
                {founder.name}
              </p>
              <p className="font-display text-xs font-semibold tracking-wide text-white/90 uppercase">
                {founder.role}
              </p>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <span
              className="brand-gradient-text block font-display text-7xl leading-none font-bold"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <blockquote className="-mt-3 font-display text-3xl leading-[1.08] font-bold text-white uppercase sm:text-4xl lg:text-5xl">
              {founder.quote}
            </blockquote>

            <p className="mt-7 max-w-xl text-lg text-white/70">{founder.message}</p>

            <figcaption className="mt-8 flex items-center gap-5">
              <span className="font-display text-3xl font-medium text-white italic">
                {founder.shortName}
              </span>
              <span className="h-px w-16 bg-white/25" aria-hidden="true" />
              <span className="text-sm text-white/60">{founder.name}</span>
            </figcaption>

            <dl className="mt-9 flex divide-x divide-white/15 border-y border-white/15">
              {founder.stats.map((stat) => (
                <div key={stat.label} className="py-5 pr-10 pl-0 first:pl-0 [&:not(:first-child)]:pl-10">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-flame-yellow">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/55">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.figure>
        </div>

        {/* Crew strip */}
        <div className="mt-20">
          <p className="text-center font-display text-sm font-bold tracking-[0.18em] text-white/70 uppercase">
            The Sydney crew
          </p>
          <p className="mt-2 text-center text-sm text-white/50">{founder.crew.join(" · ")}</p>

          <motion.div
            variants={strip}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {gallery.map((shot) => (
              <motion.div key={shot.src} variants={tile}>
                <PhotoFrame
                  src={shot.src}
                  alt={shot.alt}
                  tint="dark"
                  className="aspect-square w-full rounded-xl"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
