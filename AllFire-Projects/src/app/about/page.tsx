import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { OurStory } from "@/components/sections/OurStory";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { BookingSection } from "@/components/sections/BookingSection";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Firefighter-run fire protection compliance across ${company.areaServed}. Founded in ${company.foundingYear} by ${company.founder}, with a family history in the fire service since ${company.legacyYear}.`,
  alternates: { canonical: "/about" },
};

/**
 * About Us.
 *
 * Deliberately short. This page is the story and nothing else, matching the
 * client's own page: who we are, the family line, and what drives us.
 *
 * The sections that used to live here (team, testimonials, coverage map,
 * expertise band, FAQ) were not deleted, only unhooked. They still exist as
 * components and can be reinstated on any page by importing them again.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lead="Our"
        accent="story"
        crumbLabel="Our Story"
        intro={`Firefighter-run compliance for ${company.areaServed}, built on a family history in the fire service since ${company.legacyYear}.`}
      />

      <OurStory />
      <AboutPrinciples />
      <BookingSection />
    </>
  );
}
