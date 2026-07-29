export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  /** Optional one-liner. Omitted rather than invented where we have no source. */
  bio?: string;
};

/**
 * The crew.
 *
 * Names come from the client's own copy, where Peter thanks his Sydney team by
 * first name (see founder.ts). Roles beyond Peter's are deliberately generic:
 * we know these people are technicians, and nothing in this repo supports a
 * more specific title or a biography, so none is invented here.
 *
 * Portraits: only Peter has a real photograph. The rest point at stock
 * stand-ins. Replace `photo` per member as the client supplies headshots.
 */
export const team: TeamMember[] = [
  {
    name: "Peter Tricklebank",
    role: "Managing Director, former NSW Fire Brigades Senior Officer",
    photo: "/images/our-team/pete_img.jpeg",
    bio: "Thirty-eight years on the tools, and a family line in the fire service reaching back to 1911. Peter still runs the harder jobs himself.",
  },
  { name: "Paul", role: "Fire Protection Technician", photo: "/images/stock/team-1.webp" },
  { name: "Sam", role: "Fire Protection Technician", photo: "/images/stock/team-2.webp" },
  { name: "George", role: "Fire Protection Technician", photo: "/images/stock/team-3.webp" },
  { name: "Ken", role: "Fire Protection Technician", photo: "/images/stock/crew-1.webp" },
  {
    name: "Cornelius",
    role: "Fire Protection Technician",
    /* Real photo, cropped from his diesel pump job in jobs.ts. The only crew
       member besides Peter not on a stock stand-in. */
    photo: "/images/services-img/staff-img/cornelius-diesel-pump-1.jpeg",
  },
  { name: "Kyriakos", role: "Fire Protection Technician", photo: "/images/stock/crew-3.webp" },
  { name: "Orlando", role: "Fire Protection Technician", photo: "/images/stock/crew-4.webp" },
];

export const widerCrewNote =
  "Backed by a wider crew of serving and retired firefighters across Greater Sydney.";

/**
 * How the team works. Client-supplied copy, used verbatim.
 */
export const teamValues = [
  {
    title: "People First",
    body: "Behind every inspection, service and compliance report is a team that genuinely cares. We believe great service starts with great people, and we're committed to building lasting relationships with every client we support.",
  },
  {
    title: "Straight Talking",
    body: "No jargon. No unnecessary complexity. Just honest advice, practical solutions and clear communication to help you make informed decisions about your building's fire safety.",
  },
  {
    title: "We Show Up",
    body: "Reliability isn't just what we do, it's who we are. Whether it's routine maintenance, an Annual Fire Safety Statement (AFSS), emergency support or scheduled testing, you can count on us to deliver when it matters.",
  },
  {
    title: "On Your Team",
    body: "We work alongside property owners, strata managers, facility managers and businesses as a trusted extension of their team. Our goal is simple: make compliance easier and keep your building operating safely and efficiently.",
  },
  {
    title: "Built on Trust",
    body: "Our experienced technicians bring extensive knowledge across commercial, industrial, strata, healthcare, education and residential properties. Every job is completed with professionalism, attention to detail and a commitment to protecting your people, your property and your peace of mind.",
  },
];

/** Management statement. Client-supplied copy. */
export const managementStatement = {
  headline: "Service Driven. Client Focused. Committed to your success.",
  body: "Our management team is committed to building lasting relationships through responsive communication, professional advice, and a genuine focus on achieving the best outcomes for every client.",
};

/**
 * Real photographs of the crew on the job, for the team page gallery.
 *
 * Captions name people only where the filename does. Where it does not, the
 * caption stays general rather than guessing who is in frame.
 */
export const teamGallery = [
  {
    src: "/images/our-team/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp",
    caption: "Peter and Paul on site",
  },
  {
    src: "/images/our-team/allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp",
    caption: "Sam and Orlando",
  },
  {
    src: "/images/our-team/allfire-with-guildo-scaled-e1759978124384-1024x768.webp",
    caption: "On the job with Guildo",
  },
  {
    src: "/images/our-team/allfire-banner-technicians-scaled-e1759977593409-1024x768.webp",
    caption: "The technicians",
  },
];
