/**
 * The Tricklebank fire service line, transcribed from the client's own
 * "Generation of Tricklebank" graphic.
 *
 * Built as data rather than shipped as the flat image so it stays legible on a
 * phone, is selectable and indexable, and can be corrected without re-exporting
 * artwork.
 *
 * NOTE FOR THE CLIENT: the graphic lists Peter Tricklebank as Managing Director
 * (2020-current), while the site copy elsewhere credits the 2009 founding to
 * "Peter Wood". Those need reconciling before launch. See company.ts.
 */
export type Generation = {
  year: string;
  relation: string;
  name: string;
};

export const generations: Generation[] = [
  { year: "1911", relation: "Great grandfather", name: "William Tricklebank" },
  { year: "1931", relation: "Grandfather", name: "Trevor Tricklebank" },
  { year: "1955", relation: "Uncle", name: "Trevor Tricklebank" },
  { year: "1957", relation: "Father", name: "Stanley Tricklebank" },
  { year: "1959", relation: "Uncle", name: "Ian Tricklebank" },
  { year: "1975", relation: "Cousin", name: "Paul Tricklebank" },
  { year: "2009", relation: "NSW Fire Brigades Senior Officer", name: "Grant Fuller" },
  { year: "2014", relation: "NSW Fire Brigade", name: "Paul Wilson" },
  { year: "2020 - current", relation: "Managing Director", name: "Peter Tricklebank" },
  { year: "2025", relation: "Next generation", name: "Kyriakos & Orlando Tricklebank" },
];

export const legacyStrapline = "A legacy of service. A future of leadership.";

/** "Our story" YouTube Short, supplied by the client. */
export const storyShortId = "PY3FuIT0XQ4";
