import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BookingSection } from "@/components/sections/BookingSection";
import { ServiceSidebar } from "@/components/services/ServiceSidebar";
import { ServiceIntro } from "@/components/services/ServiceIntro";
import { ProductGrid } from "@/components/services/ProductGrid";
import { ServiceOverview } from "@/components/services/ServiceOverview";
import { services, getServiceBySlug } from "@/content/services";
import { getProductsFor } from "@/content/products";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

/**
 * Service page, as a product catalogue.
 *
 * Category rail on the left, then a header block carrying the title,
 * accreditation badges and description, then the product grid.
 *
 * The detail that used to sit under every tile (model code, summary line, its
 * own CTA) now lives at the top of the page once, and on each product's own
 * page. Repeating it under twenty tiles made the grid unreadable.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const products = getProductsFor(service.slug);

  const hero = (
    <PageHero
      eyebrow="Our services"
      lead={service.name}
      crumbLabel={service.shortName}
      crumbs={[{ label: "Services", href: "/services" }]}
    />
  );

  /* Services that sell labour and a signed document rather than hardware have
     no catalogue. Branching on the products themselves rather than on category
     keeps this correct as the catalogue fills in: add products to a service and
     it moves to the grid layout on its own. */
  if (products.length === 0) {
    return (
      <>
        {hero}
        <ServiceOverview service={service} />
        <BookingSection />
      </>
    );
  }

  return (
    <>
      {hero}

      <section className="bg-white py-14 md:py-20">
        <Container className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[264px_1fr] lg:gap-14">
          <ServiceSidebar activeSlug={service.slug} />

          <div>
            <ServiceIntro service={service} />

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
              <p className="text-ink-soft">
                Showing all <span className="font-bold text-ink">{products.length}</span>{" "}
                {products.length === 1 ? "result" : "results"}
              </p>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <span className="sr-only">Sort products</span>
                <select
                  disabled
                  defaultValue="default"
                  title="Sorting becomes available once the full range is loaded"
                  className="min-h-11 cursor-not-allowed rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink-soft"
                >
                  <option value="default">Default sorting</option>
                </select>
              </label>
            </div>

            <div className="mt-8">
              <ProductGrid
                products={products}
                serviceSlug={service.slug}
                serviceName={service.name}
              />
            </div>
          </div>
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
