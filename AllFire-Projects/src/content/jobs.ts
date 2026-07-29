/**
 * Documented jobs, for the "On the tools" section.
 *
 * These are real photographs of named AllFire technicians on real plant, not
 * stock and not generated. That is the whole point of the section: everything
 * else on the site claims experience, this shows it.
 *
 * Adding a job is data-only. `photos[0]` is the lead frame, the rest are
 * supporting; the component handles any count of two or more.
 *
 * `serviceSlug` links the job to its service page.
 */
export type Job = {
  id: string;
  technician: string;
  /** The equipment, named the way a building manager would recognise it. */
  system: string;
  summary: string;
  serviceSlug?: string;
  photos: string[];
};

const dir = "/images/services-img/staff-img";

export const jobs: Job[] = [
  {
    id: "sprinkler-valve-set",
    technician: "Peter",
    system: "Sprinkler valve set",
    summary:
      "Valve set inspection and alarm test on a multi-building drencher installation, checked against the block plan and tagged on the spot.",
    serviceSlug: "fire-sprinkler-systems",
    photos: [`${dir}/peter-sprinkler-1.jpeg`, `${dir}/peter-sprinkler-2.jpeg`, `${dir}/peter-sprinkler-3.jpeg`],
  },
  {
    id: "diesel-pump-set",
    technician: "Cornelius",
    system: "Diesel fire pump",
    summary:
      "Monthly run and load test on a diesel pump set, confirming it starts and holds pressure when the mains cannot.",
    serviceSlug: "diesel-pump-inspection",
    photos: [
      `${dir}/cornelius-diesel-pump-1.jpeg`,
      `${dir}/cornelius-diesel-pump-2.jpeg`,
      `${dir}/cornelius-diesel-pump-3.jpeg`,
    ],
  },
  {
    id: "electric-pump-motor",
    technician: "George",
    system: "Electric pump motor",
    summary:
      "Electric fire pump motor checked under load, with starter and control gear verified against the pump's duty curve.",
    serviceSlug: "electric-pump-motor",
    photos: [
      `${dir}/george-electric-pump-1.jpeg`,
      `${dir}/george-electric-pump-2.jpeg`,
      `${dir}/george-electric-pump-3.jpeg`,
    ],
  },
];
