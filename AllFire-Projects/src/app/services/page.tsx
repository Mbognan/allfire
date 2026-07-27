import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { BookingSection } from "@/components/sections/BookingSection";
import { FeaturedBanner } from "@/components/services/FeaturedBanner";
import { CatalogueIndex } from "@/components/services/CatalogueIndex";
import { services } from "@/content/services";
import { serviceStatement } from "@/content/accreditation";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Fire protection equipment and compliance services across Greater Sydney: emergency lighting, fire extinguishers, smoke alarms, diesel fire pumps and mechanical smoke control.",
  alternates: { canonical: "/services" },
};

/**
 * Services index, as a grouped equipment catalogue.
 *
 * One row per service, with that service's products beneath it, so a visitor
 * sees the whole range on one page rather than clicking into five categories to
 * find out what each contains.
 */
export default function ServicesPage() {
  return (
    <>
      {/*
        Breadcrumb strip carries the page's h1. The banner below is a rotating
        product promo, so its headline changes per slide and cannot be the
        page heading; without this the page would have no h1 at all.
      */}
      <div className="border-b border-line bg-white">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-ink-soft">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-flame-red-deep">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </li>
              <li className="text-ink" aria-current="page">
                Services
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-lg font-bold tracking-[0.08em] text-ink uppercase">
            Our Services
          </h1>
        </Container>
      </div>

      <FeaturedBanner />

      <section className="bg-white py-12 md:py-16">
        <Container>
          <p className="mb-10 max-w-[70ch] text-ink-soft">{serviceStatement}</p>
          <CatalogueIndex services={services} />
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
