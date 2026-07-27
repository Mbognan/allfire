export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
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
