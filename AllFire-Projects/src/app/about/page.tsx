import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { OurStory } from "@/components/sections/OurStory";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { BookingSection } from "@/components/sections/BookingSection";
import { company } from "@/content/company";
import { mission } from "@/content/mission";

export const metadata: Metadata = {
  title: "Our Story",
  description: `High-level professional fire safety services across ${company.areaServed}. Australian owned and operated, created by a former NSW Fire Brigades Senior Officer in ${company.foundedLabel}.`,
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
        intro={mission}
      />

      <OurStory />
      <AboutPrinciples />
      <BookingSection />
    </>
  );
}
