export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Placeholder testimonials, swap for real, permissioned client quotes at launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They talk about fire safety differently to every other contractor. They've actually been in the room when it mattered.",
    name: "Strata Manager",
    role: "Sydney CBD",
  },
  {
    quote:
      "Our AFSS used to be a scramble every year. AllFire runs the whole process now and we just sign off.",
    name: "Facilities Manager",
    role: "Commercial Office, Parramatta",
  },
  {
    quote:
      "Straight answers, no upselling, and they turn up when they say they will. Rare in this industry.",
    name: "Body Corporate Chair",
    role: "Residential Strata, Inner West",
  },
];
