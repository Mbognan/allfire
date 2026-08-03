import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LandmarkShowcase } from "@/components/sections/LandmarkShowcase";
import { VideoSection } from "@/components/sections/VideoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ShortsCarousel } from "@/components/sections/ShortsCarousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogCarousel } from "@/components/sections/BlogCarousel";
import { Marquee } from "@/components/sections/Marquee";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Fire Protection Compliance, Sydney",
  description:
    "High-level professional fire safety services across Greater Sydney, whilst being approachable, practical and reasonable. Australian owned and operated since 2009, staffed by professional firefighters, serving and retired.",
};

/**
 * Section order follows a conversion funnel rather than a feature list:
 *
 *   hook -> who we are -> proof -> what we sell -> why us -> what others say ->
 *   see it -> educate -> handle objections -> authority -> convert
 *
 * Formats alternate deliberately (split, ticker, card grid, split, full-bleed
 * video, portrait, grid, carousel...) so no two adjacent sections share a
 * layout family.
 */
export default function Home() {
  return (
    <>
      {/* Hook */}
      <Hero />

      {/* Credibility first: the story, then who trusts us. Compact cut, with the
          generations timeline reserved for /about so it is not published twice. */}
      <OurStory variant="compact" />

      {/* The offer, then where it happens */}
      <ServicesSection />
      <LandmarkShowcase />

      {/* Unhooked, not deleted. Each component still exists and returns by
          importing it here again:
            WhyChooseUs    the differentiator panel
            OnTheTools     documented jobs, real crew photography
            FounderSection the founder
            TeamSection    the crew                                        */}

      {/* Social proof */}
      <TestimonialsSection />

      {/* Show, don't tell: the feature video leads straight into the shorts */}
      <VideoSection />
      <ShortsCarousel />

      {/* Objection handling, then authority */}
      <FAQSection />
      <BlogCarousel />

      {/* Convert */}
      <Marquee />
      <BookingSection />
      <ContactSection />
    </>
  );
}
