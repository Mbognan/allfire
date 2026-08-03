"use client";

import { useState } from "react";
import { FlameIcon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { rangeNotes } from "@/content/products-range";
import type { Product } from "@/content/products";

/** Three rows at the widest column count, per the client's brief. */
const COLUMNS = 3;
const VISIBLE_ROWS = 3;
const INITIAL_VISIBLE = COLUMNS * VISIBLE_ROWS;

/**
 * The range for one service, as a catalogue.
 *
 * Items are shown, not linked. The per-product pages are gone: most of the
 * range is a name and a photograph, and a page per item would be a heading on
 * an empty screen. When an item carries specifications worth reading, that is
 * the moment to give it a page again.
 *
 * Capped at three rows with the remainder behind a disclosure, so a service
 * with thirteen extinguisher lines does not push the enquiry off the page.
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
  const [expanded, setExpanded] = useState(false);

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

  const note = rangeNotes[serviceSlug];
  const hidden = products.length - INITIAL_VISIBLE;
  const visible = expanded ? products : products.slice(0, INITIAL_VISIBLE);

  return (
    <div>
      {note && <p className="mb-8 max-w-prose text-ink-soft">{note}</p>}

      {/* Three columns, not four. Larger cells mean the equipment is legible at
          a glance, which is the whole job of a catalogue page. */}
      <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
        {visible.map((product) => (
          <li key={product.slug} className="flex flex-col">
            {/* Square, up from 4:3. Fire equipment is mostly upright — an
                extinguisher, an exit sign, a detector — so a landscape frame
                spends its extra width on background and shrinks the product to
                fit the shorter dimension. The square gives roughly a third more
                height at the same column width. */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-paper-raised">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              ) : (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft/60">
                  <FlameIcon className="h-10 w-10 text-flame-orange/40" aria-hidden="true" />
                  <span className="font-display text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                    Photo to come
                  </span>
                </span>
              )}
            </div>

            <p className="mt-4 font-display text-base leading-tight font-bold text-balance text-ink md:text-lg">
              {product.name}
            </p>
            {/* Only where the client has confirmed one. Most of the range has no
                classification line yet, and an empty element leaves the cards
                ragged. */}
            {product.subtitle && <p className="mt-1 text-sm text-ink-soft">{product.subtitle}</p>}
          </li>
        ))}
      </ul>

      {hidden > 0 && !expanded && (
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            Show all {products.length} items
          </Button>
        </div>
      )}
    </div>
  );
}
