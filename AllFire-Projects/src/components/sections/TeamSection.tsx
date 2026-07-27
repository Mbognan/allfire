"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { team, widerCrewNote } from "@/content/team";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function TeamSection() {

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      <BrandCorner position="top-right" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Our crew</Eyebrow>
            <SectionHeading className="mt-5" lead="The firefighters" accent="behind AllFire" />
          </div>
          <p className="max-w-sm lg:text-right">{widerCrewNote}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              className="group overflow-hidden rounded-2xl border border-line"
            >
              {/* Parent owns the radius so the photo and caption read as one card. */}
              <PhotoFrame
                src={member.photo}
                alt={member.name}
                rounded={false}
                className="aspect-4/5 w-full"
                tint="dark"
              />
              <div className="relative bg-paper-raised px-6 py-5 transition-colors duration-200 group-hover:bg-white">
                {/* Brand rule is earned on hover, same as the service cards. */}
                <span
                  aria-hidden="true"
                  className="brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />
                <p className="font-display text-xl font-bold text-ink">{member.name}</p>
                <p className="mt-1 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
