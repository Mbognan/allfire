import Link from "next/link";
import type { Product } from "@/content/products";
import { FlameIcon } from "@/components/ui/Icon";

/**
 * Product grid for a service page.
 *
 * Photo and label, nothing else, matching the supplied reference. The model
 * code, description, specifications and enquiry action all live on the product
 * page, which is one click away through any tile.
 *
 * Stripped on request from an earlier card layout that carried a code, a
 * summary line and its own CTA: five of those side by side competed with each
 * other instead of letting the picture do the work.
 */
export function ProductGrid({
  products,
  serviceSlug,
  serviceName,
}: {
  products: Product[];
  serviceSlug: string;
  serviceName: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-line p-10 text-center">
        <p className="font-display text-lg font-bold text-ink">Equipment list coming soon</p>
        <p className="mt-2 text-sm text-ink-soft">
          Call us and we will talk you through what {serviceName.toLowerCase()} involves for your
          building.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-6 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            href={`/services/${serviceSlug}/${product.slug}`}
            className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-paper-raised">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft/60">
                  <FlameIcon className="h-9 w-9 text-flame-orange/40" aria-hidden="true" />
                  <span className="font-display text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                    Photo to come
                  </span>
                </span>
              )}
            </div>

            <span className="mt-4 block text-center font-display text-base leading-tight font-bold text-ink transition-colors duration-200 group-hover:text-flame-red-deep md:text-lg">
              {product.subtitle}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
