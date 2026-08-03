"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  FlameIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/Icon";
import type { Service } from "@/types/service";
import { getProductsFor, type Product } from "@/content/products";

/**
 * Everything we service, grouped by category.
 *
 * Follows the supplied reference: a search field, then one row per category
 * with the product name sitting in a bar under the image. The bar takes brand
 * colour on hover, which is what tells you the whole tile is the target.
 *
 * Search filters across every product in every category and hides categories
 * that end up empty, so the page never shows a heading with nothing under it.
 * It is a real filter rather than a decorative input; a search box that does
 * nothing is worse than no search box.
 */
type View = "grid" | "list";

export function CatalogueIndex({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("grid");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();

    return services
      .map((service) => {
        const products = getProductsFor(service.slug);
        const matched = q
          ? products.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                /* Both optional now: most of the range is a name only. */
                p.subtitle?.toLowerCase().includes(q) ||
                p.code?.toLowerCase().includes(q) ||
                service.name.toLowerCase().includes(q)
            )
          : products;
        return { service, products: matched };
      })
      .filter((g) => g.products.length > 0);
  }, [services, query]);

  const total = groups.reduce((n, g) => n + g.products.length, 0);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl">
          <label htmlFor="catalogue-search" className="sr-only">
            Search equipment
          </label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="min-h-13 w-full rounded-xl border border-line bg-paper-raised py-3 pr-14 pl-4 text-ink placeholder:text-ink-soft/70 transition-colors duration-200 focus:border-ink focus:bg-white focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-ink-soft transition-colors duration-200 hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-flame-red-deep"
            >
              <XIcon className="h-4 w-4" />
            </button>
          ) : (
            /* Decorative: the input is already focusable, so a second control
               that only focuses it would be a redundant tab stop. */
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-line/50 text-ink-soft"
            >
              <SearchIcon className="h-4 w-4" />
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <p aria-live="polite" className="text-sm whitespace-nowrap text-ink-soft">
            {query ? (
              <>
                <span className="font-bold text-ink">{total}</span>{" "}
                {total === 1 ? "match" : "matches"}
              </>
            ) : (
              <>
                <span className="font-bold text-ink">{total}</span> items
              </>
            )}
          </p>

          {/* View toggle. aria-pressed rather than two links, because this
              changes presentation of the same content, not the content. */}
          <div className="flex overflow-hidden rounded-xl border border-line" role="group" aria-label="View style">
            {(
              [
                { mode: "list" as const, label: "List view", Icon: ListIcon },
                { mode: "grid" as const, label: "Grid view", Icon: GridIcon },
              ]
            ).map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                aria-label={label}
                title={label}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep ${
                  view === mode
                    ? "bg-flame-red-deep text-white"
                    : "bg-white text-ink-soft hover:bg-paper-raised hover:text-ink"
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {groups.length === 0 && (
        <div className="mt-12 rounded-2xl border border-line p-12 text-center">
          <p className="font-display text-xl font-bold text-ink">Nothing matches that</p>
          <p className="mt-2 text-ink-soft">
            Try a different term, or call us on the number below and we will find it for you.
          </p>
        </div>
      )}

      {groups.map(({ service, products }) => (
        <section key={service.slug} className="mt-14 first-of-type:mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              {service.name}
            </h2>
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-bold tracking-wide text-flame-red-deep uppercase transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
            >
              View category
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {view === "grid" ? (
            <ul className="mt-5 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product.slug} className="w-44 shrink-0 snap-start sm:w-auto sm:shrink">
                  <ProductTile product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {products.map((product) => (
                <li key={product.slug}>
                  <ProductRow product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

/**
 * List view: denser, and shows the model code the grid has no room for.
 *
 * Not a link. Per-product pages were removed, so this is a catalogue row rather
 * than a navigation target; making it look clickable would promise a page that
 * does not exist.
 */
function ProductRow({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-5 py-4">
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-paper-raised">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain p-1.5"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <FlameIcon className="h-5 w-5 text-flame-orange/40" aria-hidden="true" />
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-bold text-ink">{product.name}</span>
        {product.subtitle && (
          <span className="block text-sm text-ink-soft">{product.subtitle}</span>
        )}
      </span>

      {product.code && (
        <span className="hidden font-display text-xs font-bold tracking-[0.14em] text-ink-soft uppercase sm:block">
          {product.code}
        </span>
      )}
    </div>
  );
}

/** Catalogue tile. Not a link, for the same reason as ProductRow. */
function ProductTile({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative aspect-square w-full overflow-hidden bg-paper-raised">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain p-4"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <FlameIcon className="h-8 w-8 text-flame-orange/40" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center border-t border-line px-4 py-3">
        <span className="font-display text-sm font-bold text-ink">{product.name}</span>
        {product.subtitle && (
          <span className="mt-0.5 text-xs text-ink-soft">{product.subtitle}</span>
        )}
      </div>
    </div>
  );
}
