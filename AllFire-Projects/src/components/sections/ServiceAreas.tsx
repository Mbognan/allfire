"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPinIcon } from "@/components/ui/Icon";
import { ServiceMap } from "@/components/sections/ServiceMap";
import { company } from "@/content/company";
import { serviceAreas } from "@/content/serviceAreas";

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } };
const chip: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
};

/**
 * Where we work.
 *
 * PLACEHOLDER DATA: these are major Australian cities standing in until the
 * client confirms their real coverage. AllFire's stated area is Greater Sydney,
 * so publishing a nationwide list would be a claim they cannot service. See
 * content/serviceAreas.ts before launch.
 */
export function ServiceAreas() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <SectionHeading className="mt-5" lead="Fire compliance," accent="on the ground" />
          </div>
          <p className="max-w-lg text-lg">
            Our technicians attend sites across {company.areaServed} and beyond. If your building
            is not listed, call us anyway, we will tell you honestly whether we can cover it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <ServiceMap />

          <motion.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {serviceAreas.map((area) => (
              <motion.li key={area.name} variants={chip}>
                <span className="group inline-flex min-h-11 cursor-default items-center gap-2.5 rounded-[50px] border border-line px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:border-flame-red-deep hover:text-flame-red-deep">
                  <MapPinIcon className="h-4 w-4 shrink-0 text-flame-orange" aria-hidden="true" />
                  {area.name}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-line p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-bold text-ink">
            Not sure if we cover your building?
          </p>
          <Button href={company.phoneHref} variant="primary">
            Call {company.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
