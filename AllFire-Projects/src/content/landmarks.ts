/**
 * Building types AllFire works across, shown as an expanding image strip.
 *
 * These are deliberately typologies ("heritage sandstone", "harbourside
 * high-rise") rather than named buildings. Naming a real landmark would assert
 * a client relationship we cannot evidence from anything in this repo, and a
 * fabricated credential is worse than a general one. Swap in real project names
 * once the client confirms which sites they are permitted to reference.
 *
 * Images are stock stand-ins, keyed by id. Replace the files or repoint `image`
 * and nothing else needs to change.
 */
export type Landmark = {
  id: string;
  name: string;
  blurb: string;
  image: string;
};

export const landmarks: Landmark[] = [
  {
    id: "heritage",
    name: "Heritage Sandstone",
    blurb:
      "Fire safety retrofitted into buildings that predate every standard it has to meet, without touching the fabric.",
    image: "/images/stock/riser-room.webp",
  },
  {
    id: "cbd-tower",
    name: "CBD Towers",
    blurb:
      "Stair pressurisation, smoke exhaust and hydrant boosters kept certified across full commercial floorplates.",
    image: "/images/stock/backdrop-extinguishers.webp",
  },
  {
    id: "harbourside",
    name: "Harbourside Residential",
    blurb:
      "Strata high-rise where one annual statement covers hundreds of lots and every measure between them.",
    image: "/images/stock/hydrant.webp",
  },
  {
    id: "industrial",
    name: "Industrial & Warehousing",
    blurb:
      "Sprinkler coverage and diesel pump sets tested against racking that changes with every stock cycle.",
    image: "/images/stock/technician.webp",
  },
  {
    id: "retail",
    name: "Retail Centres",
    blurb:
      "Detection, egress lighting and fire doors serviced around trading hours rather than through them.",
    image: "/images/stock/extinguisher.webp",
  },
  {
    id: "care",
    name: "Aged Care & Health",
    blurb:
      "Buildings where evacuation is slowest, so compartmentation and detection carry the most weight.",
    image: "/images/stock/crew-2.webp",
  },
];
