"use client";

import { useState } from "react";
import type { VariantGroup } from "@/content/products";

/**
 * Variant selector, as on the reference: a label with selectable chips.
 *
 * Selection is presentational for now. There is no per-variant model code, spec
 * sheet or stock behind it yet, so choosing one changes the highlight and
 * nothing else. Wired up properly once the client supplies variant-level data.
 *
 * Built as radios rather than buttons so arrow keys move between options and
 * screen readers announce it as one group with a current selection.
 */
export function VariantChips({ group }: { group: VariantGroup }) {
  const [selected, setSelected] = useState(group.options[0]);
  const name = `variant-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <fieldset>
      <legend className="font-display text-base font-bold text-ink">{group.label}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2.5">
        {group.options.map((option) => {
          const active = option === selected;
          return (
            <label
              key={option}
              className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-flame-red-deep ${
                active
                  ? "border-flame-red-deep bg-flame-red-deep/10 text-flame-red-deep"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={active}
                onChange={() => setSelected(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
