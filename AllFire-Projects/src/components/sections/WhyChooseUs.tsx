"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ShieldCheckIcon, FlameIcon, ClockIcon } from "@/components/ui/Icon";

const reasons = [
  {
    icon: FlameIcon,
    title: "Firefighters, not just technicians",
    body: "Serving and retired professional firefighters carry out the work, so the advice comes from people who have relied on these systems in real incidents.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance handled end to end",
    body: "Inspection, testing, remediation and your Annual Fire Safety Statement run as one job, not four separate contractors to chase.",
  },
  {
    icon: ClockIcon,
    title: "24/7 emergency support",
    body: "Defects and faults do not wait for business hours. Our after-hours line is answered around the clock, right across Greater Sydney.",
  },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 md:py-28">
      <BrandCorner position="bottom-left" />
      <Container>
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <SectionHeading
              className="mt-5"
              lead="We're the trusted choice for"
              accent="fire safety solutions"
            />
          </div>
          <p className="max-w-lg text-lg">
            Choosing the right fire protection partner is a safety decision before it is a
            budget one. Here is what you get with AllFire.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          >
            <PhotoFrame
              src="/images/stock/extinguisher.webp"
              alt="AllFire technician servicing fire extinguishers on site"
              className="aspect-4/3 w-full lg:aspect-square"
              tint="dark"
            />
          </motion.div>

          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {reasons.map((reason) => (
              <motion.div
                key={reason.title}
                variants={row}
                className="group flex gap-5 border-b border-line py-6 first:pt-0"
              >
                {/* Neutral until pointed at, matching the service cards: colour
                    marks the row you are reading, not all three at once. */}
                <span className="relative isolate flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 group-hover:border-transparent">
                  <span
                    className="brand-gradient absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <reason.icon className="h-7 w-7 text-flame-red-deep transition-colors duration-300 group-hover:text-white" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{reason.title}</h3>
                  <p className="mt-2 text-sm">{reason.body}</p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={row} className="mt-8">
              <Button href="#booking" variant="primary">
                Contact Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
