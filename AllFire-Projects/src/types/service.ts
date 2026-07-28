export type ServiceFaq = {
  q: string;
  a: string;
};

/**
 * Grouping used to structure the services menu and index.
 *
 * Added when the catalogue grew past a handful: a flat list of thirteen
 * services is a wall, and these three headings are how the industry already
 * splits the work (systems that act, construction that contains, paperwork
 * that proves it).
 */
export type ServiceCategory = "active" | "passive" | "compliance";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  summary: string;
  standardReference?: string;
  frequency?: string;
  whatItCovers: string[];
  whoItsFor: string;
  whyFirefighterRun: string;
  relatedServiceSlugs: string[];
  relatedGuideSlug?: string;
  faqs: ServiceFaq[];
};
