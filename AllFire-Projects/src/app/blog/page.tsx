import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BookingSection } from "@/components/sections/BookingSection";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Fire Safety Insights",
  description:
    "Plain-language answers to the fire compliance questions Sydney strata managers, building owners and facility managers actually search for.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        lead="Fire compliance,"
        accent="explained plainly"
        crumbLabel="Blogs"
        intro="The questions Sydney building owners and strata managers ask us most, answered without the regulatory jargon."
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          {/* BlogList reads the ?tag= param, so it needs a Suspense boundary to
              keep this page statically prerendered. */}
          <Suspense fallback={<div className="min-h-160" />}>
            <BlogList />
          </Suspense>
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
