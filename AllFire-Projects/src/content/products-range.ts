import type { Product } from "@/content/products";

/**
 * The client's supplied product and sub-category range, by service slug.
 *
 * Held separately from `productsByService` rather than merged into it, for one
 * reason: those entries were written with model codes, classifications and body
 * copy. These arrive as names only. Keeping the two apart makes it obvious at a
 * glance which items carry real detail and which are still awaiting it, instead
 * of interleaving them into one list where the thin ones look like oversights.
 *
 * `getProductsFor` concatenates both, so consumers see one range.
 *
 * Nothing here is invented. No prices, no specifications, no descriptions, and
 * no capacities beyond what the client wrote. Where a name contains a figure
 * ("9.0kg ABE"), that figure is theirs.
 */

/** Kebab-cases a product name into a URL segment. */
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function range(names: string[]): Product[] {
  return names.map((name) => ({ slug: slugify(name), name }));
}

export const productRange: Record<string, Product[]> = {
  "fire-panels-detection": range([
    "MCP",
    "Automatic Fire Detection System",
    "MIMIC Microphone",
    "Addressable 850P Photo Optical Smoke Detector for Fire Panel",
  ]),

  "smoke-alarm-testing": range([
    "R10 10 Year Battery Stand-Alone Smoke Detector",
    "R10RF 10 Year RF Wireless Linkable Smoke Detector",
    "R240 240v Smoke Detector with 9v Battery Back-Up",
    "Saturn SINGLE 240v Smoke Detector 10-Year Lithium",
  ]),

  "fire-extinguisher-tagging": range([
    "1.0kg ABE Fire Extinguisher",
    "2.5kg ABE Fire Extinguisher",
    "3.5kg CO2 Fire Extinguisher",
    "4.5kg ABE Fire Extinguisher",
    "5.0kg CO2 Fire Extinguisher",
    "7L Wet Chemical Fire Extinguisher",
    "9.0kg ABE Fire Extinguisher",
    "9.0L Foam (AFFF) Fire Extinguisher",
    "Fire Extinguisher Cover 4.5kg",
    "Fire Extinguisher Signs",
    "Fire Extinguisher Bracket",
    "Fire Extinguisher Cabinet",
    "Fire Blanket",
  ]),

  "emergency-lighting-testing": range([
    "Bondi 4ft Diffuser LED Emergency Batten Light",
    "Bondi 4ft Wireguard LED Emergency Batten Light",
    "Bondi 2ft Diffuser LED Emergency Batten Light",
    "Bondi 2ft Wireguard LED Emergency Batten Light",
    "Manly LED Emergency Exit Sign",
    "Maslin LED Emergency Blade Exit Sign with Spitfire",
    "Sunrise LED Recessed Emergency Spitfire",
    "Ocean LED Emergency Oyster Light",
    "Floreat Weatherproof LED Twin Head Emergency Light",
  ]),

  "diesel-pump-inspection": range([
    "Diesel / Sprinkler Electric Inspection",
    "Hydrant Valve",
    "Diesel Servicing",
    "Jacking Pump",
  ]),

  "fire-hydrant-systems": range([
    "Flow Test",
    "5 Yearly Hydrostatic Hydrant Test",
    "5 Yearly Hydrant Flow Test, Fire Truck Appliance Simulation",
  ]),

  "fire-doors-frames": range(["Door Tag", "Frame Tag", "Door Gap", "Non Compliance Door"]),

  /* Plans and diagrams. No catalogue page hosts these yet, so nothing renders
     them today; the list is here so it is not lost, and so the page can be
     added without retyping it. */
  "zone-block-evacuation-plans": range([
    "Fire Alarm Zone Block Plan",
    "Evacuation Plan",
    "Hydrant Block Plan",
    "Sprinkler Block Plan",
  ]),

  /* Deliberately empty. The client's list gives these two categories no items,
     and an earlier pass invented "Service Penetration" and "Fire Damper" as
     products by echoing the category name back. Both services still have their
     own page; they simply have no range to show. */
  "fire-penetration-sealing": [],
  "air-mechanical": [],
};

/**
 * Emergency lighting: every item in the client's list carried "Self Test with
 * app (5 yr warranty)". That is one shared attribute rather than nine, so it is
 * stated once for the range instead of repeated in every product name.
 */
export const rangeNotes: Record<string, string> = {
  "emergency-lighting-testing":
    "All emergency lighting in this range is self-testing with app monitoring and carries a five-year warranty.",
};
