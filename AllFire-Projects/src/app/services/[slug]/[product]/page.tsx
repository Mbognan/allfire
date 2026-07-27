import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookingSection } from "@/components/sections/BookingSection";
import { VariantChips } from "@/components/services/VariantChips";
import { ArrowRightIcon, FlameIcon } from "@/components/ui/Icon";
import { services, getServiceBySlug } from "@/content/services";
import { getProductsFor, getProduct } from "@/content/products";
import { company } from "@/content/company";

export function generateStaticParams() {
  return services.flatMap((service) =>
    getProductsFor(service.slug).map((product) => ({
      slug: service.slug,
      product: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; product: string }>;
}): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  const product = getProduct(slug, productSlug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description[0],
    alternates: { canonical: `/services/${slug}/${product.slug}` },
  };
}

/**
 * Single product view.
 *
 * Follows the supplied reference: oversized product name, classification line,
 * description, variant chips, model code, then the actions. Specifications sit
 * below in paired tables.
 *
 * Two departures from the reference, both because this is a service business
 * rather than a manufacturer:
 *
 *   "Pricing information" becomes an enquiry. No prices are published, and a
 *   button that promises pricing and delivers a contact form is a bait.
 *
 *   The Downloads block is omitted entirely rather than rendered with dead
 *   buttons. It returns when the client supplies real spec sheets.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; product: string }>;
}) {
  const { slug, product: productSlug } = await params;
  const service = getServiceBySlug(slug);
  const product = getProduct(slug, productSlug);
  if (!service || !product) notFound();

  const siblings = getProductsFor(slug).filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="bg-white pt-10 pb-16 md:pt-14 md:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <li>
                <Link href="/services" className="transition-colors duration-200 hover:text-flame-red-deep">
                  Services
                </Link>
              </li>
              <li aria-hidden="true"><ArrowRightIcon className="h-3.5 w-3.5" /></li>
              <li>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors duration-200 hover:text-flame-red-deep"
                >
                  {service.shortName}
                </Link>
              </li>
              <li aria-hidden="true"><ArrowRightIcon className="h-3.5 w-3.5" /></li>
              <li className="text-ink" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Product image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-paper-raised">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
                <img
                  src={product.image}
                  alt={`${product.name}, ${product.subtitle}`}
                  className="absolute inset-0 h-full w-full object-contain p-8"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-soft/60">
                  <FlameIcon className="h-12 w-12 text-flame-orange/50" aria-hidden="true" />
                  <span className="font-display text-xs font-bold tracking-[0.14em] uppercase">
                    Product photo to come
                  </span>
                </span>
              )}
            </div>

            {/* Product detail */}
            <div>
              <h1 className="font-display text-5xl font-bold text-ink md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-2 font-display text-lg font-bold text-ink-soft">
                {product.subtitle}
              </p>

              <div className="mt-6 space-y-4">
                {product.description.map((para) => (
                  <p key={para} className="max-w-[60ch] text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>

              {product.variants && product.variants.length > 0 && (
                <div className="mt-8 space-y-5">
                  {product.variants.map((group) => (
                    <VariantChips key={group.label} group={group} />
                  ))}
                </div>
              )}

              <p className="mt-8 font-display text-lg font-bold text-ink">
                Model: <span className="text-flame-red-deep">{product.code}</span>
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/#booking" variant="ink" className="sm:flex-1">
                  Enquire about this
                </Button>
                <Button href={company.phoneHref} variant="outline" className="sm:flex-1">
                  Call {company.phone}
                </Button>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
              {product.specs.map((group) => (
                <div key={group.title}>
                  <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                    {group.title}
                  </h2>
                  <dl className="mt-6">
                    {group.rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-2 gap-4 border-b border-line py-3.5"
                      >
                        <dt className="text-sm tracking-[0.04em] text-ink-soft uppercase">
                          {row.label}
                        </dt>
                        <dd className="text-sm font-semibold text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}

          {/* Rest of the range */}
          {siblings.length > 0 && (
            <div className="mt-16 border-t border-line pt-12">
              <h2 className="font-display text-2xl font-bold text-ink uppercase md:text-3xl">
                More in <span className="brand-gradient-text">{service.shortName}</span>
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {siblings.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${service.slug}/${item.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-flame-red-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-paper-raised">
                        {item.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-contain p-3"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <FlameIcon className="h-7 w-7 text-flame-orange/40" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="font-display text-[0.65rem] font-bold tracking-[0.14em] text-ink-soft uppercase">
                          {item.code}
                        </span>
                        <p className="mt-1 font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-flame-red-deep">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-soft">{item.subtitle}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
