/**
 * Landmark Sydney buildings shown in the expanding image strip.
 *
 * Named at the client's direction. Each blurb describes the fire protection
 * challenge that class of building presents, not a claimed contract, so the
 * section reads as "this is the Sydney we work across" rather than a client
 * list. Before publishing, confirm the client is comfortable being associated
 * with each building named here.
 *
 * Images are stock stand-ins keyed by id. Replace the files or repoint `image`
 * and nothing else needs to change.
 */
export type Landmark = {
  id: string;
  name: string;
  /** Short locality line, so a visitor who doesn't know the building still places it. */
  locality: string;
  blurb: string;
  image: string;
};

export const landmarks: Landmark[] = [
  {
    id: "opera-house",
    name: "Sydney Opera House",
    locality: "Bennelong Point",
    blurb:
      "Performance venues concentrate thousands of people into spaces with limited egress, where detection and evacuation systems carry the entire margin.",
    image: "/images/stock/riser-room.webp",
  },
  {
    id: "town-hall",
    name: "Sydney Town Hall",
    locality: "George Street",
    blurb:
      "Heritage sandstone that predates every standard it now has to meet, protected without cutting into the fabric that makes it worth protecting.",
    image: "/images/stock/backdrop-extinguishers.webp",
  },
  {
    id: "qvb",
    name: "Queen Victoria Building",
    locality: "CBD",
    blurb:
      "A retail atrium spanning multiple levels, where smoke moves vertically faster than people do and mechanical exhaust does the heavy work.",
    image: "/images/stock/extinguisher.webp",
  },
  {
    id: "central-station",
    name: "Central Station",
    locality: "Haymarket",
    blurb:
      "Transport interchange running continuously, so every inspection happens around live passenger movement rather than through it.",
    image: "/images/stock/hydrant.webp",
  },
  {
    id: "customs-house",
    name: "Customs House",
    locality: "Circular Quay",
    blurb:
      "Adaptive reuse layering modern occupancy over nineteenth-century construction, where compartmentation has to be proven rather than assumed.",
    image: "/images/stock/crew-2.webp",
  },
  {
    id: "barangaroo",
    name: "Barangaroo",
    locality: "Harbourside",
    blurb:
      "Contemporary high-rise where stair pressurisation, sprinkler coverage and hydrant boosters are tested as one interlocking system.",
    image: "/images/stock/technician.webp",
  },
  {
    id: "the-rocks",
    name: "The Rocks",
    locality: "Millers Point",
    blurb:
      "Tight historic streets and shared walls, where a fire that breaches one building's separation is immediately the next building's problem.",
    image: "/images/stock/crew-3.webp",
  },
];
