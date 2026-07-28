/**
 * Client logos for the scrolling ticker.
 *
 * Now pointing at the real artwork in `public/images/clients-logo/`. The
 * generated geometric marks are retained in ClientLogoMarks and still render
 * for any entry without a `src`, so nothing was deleted, it is simply no longer
 * reached while every entry has artwork.
 *
 * OUTSTANDING: the `name` values below are the invented placeholders from the
 * previous pass and do NOT identify these logos. They survive only as React
 * keys, and ClientLogos deliberately renders an empty alt for image entries so
 * no real company is captioned with a wrong name. Replace each `name` with the
 * actual company once the client confirms who they are, and the alt text starts
 * carrying it automatically.
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
  /**
   * Set once `name` is the real company. Until then the logo renders with an
   * empty alt rather than a caption we cannot stand behind.
   */
  nameConfirmed?: boolean;
  /**
   * The supplied artwork is white on transparent, which is invisible on this
   * row's white background. Inverting flips it to dark so it reads.
   *
   * This is a stopgap: it only works because both affected logos are single
   * colour. Ask the client for the dark or full-colour version of each and drop
   * the flag, rather than adding more entries to it.
   */
  invert?: boolean;
};

const dir = "/images/clients-logo";

export const clients: Client[] = [
  { name: "Harbour Strata Group", monogram: "HS", shape: "arc", src: `${dir}/client-logo-1.png` },
  { name: "Meridian Property", monogram: "MP", shape: "ring", src: `${dir}/client-logo-2.png` },
  { name: "Parkline Facilities", monogram: "PF", shape: "bars", src: `${dir}/client-logo-3.png`, invert: true },
  { name: "Northshore Owners Corp", monogram: "NO", shape: "peak", src: `${dir}/client-logo-4.png` },
  { name: "Quayside Commercial", monogram: "QC", shape: "tower", src: `${dir}/client-logo-5.png` },
  { name: "Ironbark Estates", monogram: "IE", shape: "chevron", src: `${dir}/client-logo-6.png`, invert: true },
  { name: "Wattle Building Services", monogram: "WB", shape: "shield", src: `${dir}/client-logo-7.jpg` },
  { name: "Southbank Retail", monogram: "SR", shape: "quad", src: `${dir}/client-logo-8-768x340.png` },
];
