import { company } from "@/content/company";

/**
 * Peter Wood's section. The quote and the team shout-out are drawn from the
 * client's own site, where this is one of the strongest pieces of copy they
 * have: it is the founder speaking in his own voice, not marketing text.
 */
export const founder = {
  name: "Peter",
  shortName: "Pete",
  role: `Founder, ${company.founderTitle}`,
  quote: "Who knows better than a fireman?",
  message:
    "All Fire Services has grown, and we now proudly serve right across the Greater Sydney area. I want to give a big shoutout to our Sydney team: Paul, Sam, George, Ken, Kyriakos and Orlando. Our clients genuinely appreciate your dedication and your quick response in keeping every building safe. Fantastic work team, keep it up.",
  crew: ["Paul", "Sam", "George", "Ken", "Kyriakos", "Orlando"],
  stats: [
    { value: "38+", label: "Years on the tools" },
    { value: "1911", label: "Family fire service legacy" },
  ],
};
