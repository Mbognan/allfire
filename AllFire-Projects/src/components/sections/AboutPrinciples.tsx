"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BuildingIcon, ClockIcon, FlameIcon, ShieldCheckIcon, UsersIcon } from "@/components/ui/Icon";

/**
 * What we stand for.
 *
 * Copy is the client's own, transcribed from their supplied page rather than
 * written here, so the voice on this page matches the voice everywhere else
 * they publish.
 */
const principles = [
  {
    icon: ShieldCheckIcon,
    title: "Our mission",
    body: "To deliver high-quality fire protection and compliance services through practical expertise, trusted advice and dependable service, while remaining approachable, responsive and easy to work with.",
    wide: true,
  },
  {
    icon: FlameIcon,
    title: "Built on real experience",
    body: "With more than 38 years of frontline firefighting and fire safety experience, Peter established AllFire with a simple vision: to create a fire protection company that clients could genuinely rely on. By combining the knowledge of serving and retired firefighters with exceptional customer service, AllFire was built on experience, integrity and a commitment to doing the job right.",
  },
  {
    icon: UsersIcon,
    title: "Always learning",
    body: "Fire safety standards continue to evolve, and so do we. Through ongoing professional development, industry training and practical education, we ensure our team remains up to date with current legislation, Australian Standards and industry best practice.",
  },
  {
    icon: ClockIcon,
    title: "Trusted since 2009",
    body: "Since our inception, AllFire Services has maintained the certifications, insurances and workplace safety standards expected of a professional fire protection provider. More importantly, we've built lasting relationships by delivering practical solutions, reliable service and genuine peace of mind.",
  },
  {
    icon: BuildingIcon,
    title: "A legacy of protection",
    body: "More than a century of family history has shaped who we are today, and it continues to inspire how we serve our clients.",
  },
];

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function AboutPrinciples() {
  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>What drives us</Eyebrow>
          <SectionHeading className="mt-5" lead="Built on experience," accent="not just certification" />
        </div>

        {/* Mission spans the row so the grid has a lead rather than five equal
            tiles, which is the layout that makes every card look optional. */}
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              variants={item}
              className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-transparent ${
                principle.wide ? "md:col-span-2" : ""
              }`}
            >
              <span
                className="brand-gradient absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-white/40">
                <principle.icon className="h-7 w-7 text-flame-red-deep transition-colors duration-300 group-hover:text-white" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-white">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-[70ch] text-ink-soft transition-colors duration-300 group-hover:text-white/85">
                {principle.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-center font-display text-2xl font-bold text-ink uppercase md:text-3xl">
          Who knows better than <span className="brand-gradient-text">a fireman?</span>
        </p>
      </Container>
    </section>
  );
}
