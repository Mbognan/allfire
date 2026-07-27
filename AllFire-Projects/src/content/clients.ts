/**
 * Client logo placeholders.
 *
 * IMPORTANT: these are invented brands, not AllFire's real customers. The names
 * are generic building and strata descriptors chosen so they cannot be mistaken
 * for, or impersonate, any actual Sydney firm, and each carries a generated
 * geometric mark rather than a copy of a real company's logo.
 *
 * When the client supplies real logo files, drop them in
 * `public/images/clients/` and add `src` to each entry: ClientLogos renders the
 * image instead of the generated mark automatically, no component change needed.
 */
export type ClientMarkShape =
  | "ring"
  | "tower"
  | "chevron"
  | "quad"
  | "arc"
  | "shield"
  | "peak"
  | "bars";

export type Client = {
  name: string;
  monogram: string;
  /** Generated stand-in mark. Ignored once `src` is set. */
  shape: ClientMarkShape;
  src?: string;
};

export const clients: Client[] = [
  { name: "Harbour Strata Group", monogram: "HS", shape: "arc" },
  { name: "Meridian Property", monogram: "MP", shape: "ring" },
  { name: "Parkline Facilities", monogram: "PF", shape: "bars" },
  { name: "Northshore Owners Corp", monogram: "NO", shape: "peak" },
  { name: "Quayside Commercial", monogram: "QC", shape: "tower" },
  { name: "Ironbark Estates", monogram: "IE", shape: "chevron" },
  { name: "Wattle Building Services", monogram: "WB", shape: "shield" },
  { name: "Southbank Retail", monogram: "SR", shape: "quad" },
];
