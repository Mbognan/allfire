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
    name: "Peter Wood",
    role: "Founder, former NSW Fire Brigades Senior Officer",
    photo: "/images/our-team/pete_img.jpeg",
    bio: "Thirty-eight years on the tools, and a family line in the fire service reaching back to 1911. Peter still runs the harder jobs himself.",
  },
  { name: "Paul", role: "Fire Protection Technician", photo: "/images/stock/team-1.webp" },
  { name: "Sam", role: "Fire Protection Technician", photo: "/images/stock/team-2.webp" },
  { name: "George", role: "Fire Protection Technician", photo: "/images/stock/team-3.webp" },
  { name: "Ken", role: "Fire Protection Technician", photo: "/images/stock/crew-1.webp" },
  { name: "Kyriakos", role: "Fire Protection Technician", photo: "/images/stock/crew-3.webp" },
  { name: "Orlando", role: "Fire Protection Technician", photo: "/images/stock/crew-4.webp" },
];

export const widerCrewNote =
  "Backed by a wider crew of serving and retired firefighters across Greater Sydney.";

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
