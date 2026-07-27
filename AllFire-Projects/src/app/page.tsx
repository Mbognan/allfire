import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
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
    "AllFire Services: firefighter-run fire protection compliance for Sydney strata, commercial and industrial buildings. Founded 2009, family legacy since 1911.",
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
      <ClientLogos />

      {/* The offer, then the differentiator */}
      <ServicesSection />
      <WhyChooseUs />

      {/* The founder and crew sections are unhooked, not deleted. Both
          components still exist and can be reinstated by importing them here. */}

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
