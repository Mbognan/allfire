/**
 * Strata and landmark buildings AllFire services, shown as an expanding image
 * strip.
 *
 * Real client buildings, photographed, identified by suburb only. This replaced
 * a list of named Sydney landmarks (Opera House, Town Hall, QVB) that were
 * illustrative rather than client sites, and a paragraph of description per
 * entry. The suburb alone is the claim, and it is one the photographs support.
 *
 * Adding a building is data-only: drop a file in
 * public/images/strata-landmark-buildings/ and add an entry.
 */
export type Landmark = {
  id: string;
  /** Suburb. This is the only label shown. */
  name: string;
  image: string;
};

const dir = "/images/strata-landmark-buildings";

/**
 * Order is hand-set, not alphabetical or file-numbered.
 *
 * Two of these buildings are in Strathfield. Since the caption is the suburb
 * alone, two panels carry the same word, so they are placed several apart:
 * side by side they would read as the same building duplicated rather than as
 * two jobs in one suburb.
 */
export const landmarks: Landmark[] = [
  { id: "waterloo", name: "Waterloo", image: `${dir}/7-all-fire-services-welcome-waterloo.webp` },
  {
    id: "marrickville",
    name: "Marrickville",
    image: `${dir}/9-all-fire-services-welcome-marrickville.webp`,
  },
  { id: "pyrmont", name: "Pyrmont", image: `${dir}/21-all-fire-services-welcome-pyrmont.webp` },
  { id: "rockdale", name: "Rockdale", image: `${dir}/6-all-fire-services-welcome-rockdale.webp` },
  {
    id: "strathfield-20",
    name: "Strathfield",
    image: `${dir}/20-all-fire-services-welcome-strathfield.webp`,
  },
  {
    id: "dulwich-hill",
    name: "Dulwich Hill",
    image: `${dir}/29-all-fire-services-welcome-dulwich-hill.webp`,
  },
  { id: "ramsgate", name: "Ramsgate", image: `${dir}/18-all-fire-services-welcome-ramsgate.webp` },
  {
    id: "strathfield-15",
    name: "Strathfield",
    image: `${dir}/15-all-fire-services-welcome-strathfield.webp`,
  },
  {
    id: "elderslie",
    name: "Elderslie",
    image: `${dir}/24-all-fire-services-welcome-elderslie.webp`,
  },
];
