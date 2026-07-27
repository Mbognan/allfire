/**
 * Article blocks.
 *
 * A small typed block model rather than an MDX pipeline: every other piece of
 * content in this project is typed TypeScript, and five articles do not justify
 * a second content system. If the client later wants to author posts themselves,
 * this is the shape a CMS feed would map onto.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Single primary classification, shown as the pill on cards. */
  category: string;
  /** Secondary topics. Drive the filter on the blog index. */
  tags: string[];
  date: string;
  readMinutes: number;
  image: string;
  body: Block[];
};

/** Every tag in use, de-duplicated, for the index filter. */
export function getAllTags(): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Launch article set. Topics are the compliance questions Sydney strata and
 * facility managers actually search for, so each post has a real job to do
 * rather than existing to fill a blog grid.
 *
 * IMPORTANT: the article bodies below are drafted to match the claims AllFire
 * already makes elsewhere on this site. They deliberately avoid specific
 * penalty amounts, regulation clause numbers and hard deadlines, because those
 * change and this is a compliance business publishing under its own name.
 * Peter should review every article before it goes live.
 *
 * Dates are placeholders until the client publishes.
 */
export const posts: Post[] = [
  {
    slug: "nsw-annual-fire-safety-statement-guide",
    image: "/images/stock/blog-3.webp",
    title: "NSW Annual Fire Safety Statement: the complete owner's guide",
    excerpt:
      "What an AFSS actually certifies, who has to sign it, and the lead time you need before your council due date.",
    category: "Compliance",
    tags: ["AFSS", "Strata", "Building owners", "NSW regulation"],
    date: "2026-06-18",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "If your building carries a fire safety schedule, you owe your council an Annual Fire Safety Statement every year. It is one page. Producing it honestly takes considerably longer than that, and the gap between those two facts is where most owners get caught out.",
      },
      { type: "h2", text: "What the statement actually certifies" },
      {
        type: "p",
        text: "An AFSS is not a receipt for having had someone visit the building. It is a declaration that every essential fire safety measure listed on your fire safety schedule has been assessed by a competent fire safety practitioner, and that each one was found capable of performing to the standard it was originally installed to meet.",
      },
      {
        type: "p",
        text: "That wording matters. A measure that exists, but does not perform, does not qualify. An extinguisher with a current tag but no pressure fails the test the statement is making on your behalf.",
      },
      { type: "h2", text: "Who signs it" },
      {
        type: "p",
        text: "The statement is the building owner's responsibility. The assessment behind it has to be carried out by an accredited practitioner for the measures that require one. For an owners corporation, the practical effect is that your strata manager coordinates it, but the obligation sits with the owners.",
      },
      { type: "h2", text: "The lead time nobody plans for" },
      {
        type: "p",
        text: "Most owners book inspections close to the due date, discover a defect, and then have to fix it before anything can be signed. Remediation is what blows the timeline, not the inspection.",
      },
      {
        type: "callout",
        title: "Start eight to ten weeks out",
        text: "That is enough runway to inspect, receive a defect report, get remediation quoted and completed, re-test, and lodge without rushing. Buildings that start two weeks out are the ones that miss.",
      },
      { type: "h2", text: "What to have ready" },
      {
        type: "list",
        items: [
          "Your current fire safety schedule, which lists every measure that must be assessed",
          "Last year's statement, so anything that was marginal then gets attention first",
          "Service records for each measure since the last statement",
          "Access arrangements for plant rooms, risers and any locked tenancy",
          "A decision-maker who can approve remediation without waiting for the next committee meeting",
        ],
      },
      { type: "h2", text: "If you have already missed the date" },
      {
        type: "p",
        text: "Councils can issue penalty notices, and in some cases orders, against the building owner. The more immediate problem is usually commercial: a lapsed statement undermines the compliance record that insurers and prospective buyers rely on. Deal with it rather than waiting for the next cycle.",
      },
    ],
  },
  {
    slug: "as1851-inspection-checklist",
    image: "/images/stock/blog-2.webp",
    title: "The AS1851 inspection checklist, interval by interval",
    excerpt:
      "Monthly, quarterly, yearly. A plain-language breakdown of which measures get tested when, and what a pass looks like.",
    category: "Standards",
    tags: ["AS1851", "Inspections", "Maintenance", "Building owners"],
    date: "2026-05-27",
    readMinutes: 9,
    body: [
      {
        type: "p",
        text: "AS1851 is the standard that governs routine service of fire protection systems. The most common misunderstanding about it is that it sets one inspection interval. It does not. Different components sit on different cycles, and the schedule for your building is the combination of whichever systems you actually have.",
      },
      { type: "h2", text: "Why one building has four different intervals" },
      {
        type: "p",
        text: "A diesel pump needs running monthly. Portable extinguishers sit on a six-monthly inspection cycle. Hydrant flow testing is annual. Emergency lighting has both a six-monthly discharge test and a fuller annual test. None of these line up, which is why buildings that book services ad hoc end up either double-paying or missing a cycle entirely.",
      },
      {
        type: "callout",
        title: "Build one schedule, not four",
        text: "The single most useful thing an owner can do is consolidate every interval into one calendar for the building. It removes duplicated call-outs and makes a missed cycle visible before an auditor finds it.",
      },
      { type: "h2", text: "What a pass actually looks like" },
      {
        type: "p",
        text: "A routine service record should tell you three things: what was tested, what result it produced, and what condition the component is now in. A record that only says the work was attended tells you nothing you can rely on twelve months later.",
      },
      {
        type: "list",
        items: [
          "A measured result where the standard calls for one, not a tick",
          "Any defect identified, with enough detail to get it quoted",
          "The date, the technician, and what was inaccessible on the day",
          "A clear distinction between a fault fixed on site and one still outstanding",
        ],
      },
      { type: "h2", text: "Access is the usual failure point" },
      {
        type: "p",
        text: "Tenancies that could not be entered, plant rooms without keys and blocked risers turn into 'not tested' lines on a report. Those lines carry forward into your Annual Fire Safety Statement as gaps. Sorting out access before the technician arrives is the cheapest possible fix.",
      },
      { type: "h2", text: "Reading a report you did not commission" },
      {
        type: "p",
        text: "If you have taken over a building, read the last two years of records side by side. A defect that appears in both, unresolved, is the one worth asking about first.",
      },
    ],
  },
  {
    slug: "common-afss-mistakes-strata",
    image: "/images/stock/blog-5.webp",
    title: "Five AFSS mistakes that cost strata thousands",
    excerpt:
      "The errors we find most often on takeover inspections, and what they end up costing an owners corporation to fix.",
    category: "Strata",
    tags: ["AFSS", "Strata", "Defects", "Costs"],
    date: "2026-05-09",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "These are the five problems that come up most often when we take over a building's fire compliance from another contractor. None of them are exotic. All of them are expensive by the time they surface.",
      },
      { type: "h2", text: "1. Assessing against the wrong schedule" },
      {
        type: "p",
        text: "The fire safety schedule is the list of measures your statement has to address. If the building has been altered and the schedule was never updated, you are certifying the wrong set of measures. It is the error that invalidates everything downstream.",
      },
      { type: "h2", text: "2. Treating the tag as the test" },
      {
        type: "p",
        text: "A current tag records that someone attended. It does not confirm the equipment performs. We regularly find tagged extinguishers with no pressure and tagged doors that will not latch.",
      },
      { type: "h2", text: "3. Leaving remediation until after the inspection" },
      {
        type: "p",
        text: "Inspection and remediation are usually treated as sequential, which means the clock only starts once the defect report lands. Booking the assessment early enough that remediation still fits inside the cycle is what keeps the cost down.",
      },
      { type: "h2", text: "4. Splitting the work across contractors" },
      {
        type: "p",
        text: "Four contractors covering four measures means four reports in four formats, and nobody holding the whole picture. Gaps live in the seams between them.",
      },
      { type: "h2", text: "5. No handover record" },
      {
        type: "p",
        text: "When strata managers change, compliance history often does not follow. The new manager starts blind and repeats work that was already done, or misses work that never was.",
      },
      {
        type: "callout",
        title: "The pattern behind all five",
        text: "Every one of these is a record-keeping failure before it is a fire safety failure. The buildings that stay compliant cheaply are the ones where somebody owns the paperwork.",
      },
    ],
  },
  {
    slug: "fire-door-compliance-guide",
    image: "/images/stock/blog-4.webp",
    title: "Fire doors: why most buildings fail on the same three points",
    excerpt:
      "Gaps, hardware and tags. The fire door faults that turn up again and again during annual inspections.",
    category: "Passive fire",
    tags: ["Fire doors", "Inspections", "Defects"],
    date: "2026-04-21",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "A fire door is a system, not a slab. The door, the frame, the hardware and the gaps around it all have to work together, and a failure in any one of them means the assembly no longer does the job it was certified to do.",
      },
      { type: "h2", text: "Gaps" },
      {
        type: "p",
        text: "Clearance around the door leaf is the most common fault we record. Doors move, buildings settle, and carpet gets replaced with something thicker. A gap that has grown past tolerance lets smoke through long before fire becomes the issue.",
      },
      { type: "h2", text: "Hardware" },
      {
        type: "p",
        text: "Self-closers that no longer close the door fully, latches that do not engage, and hinges that have dropped are the next most frequent. The test is simple and worth doing yourself between inspections: release the door from fully open and watch whether it closes and latches on its own, every time.",
      },
      { type: "h2", text: "Tags and identification" },
      {
        type: "p",
        text: "A fire door needs its identification intact to be assessed. Tags get painted over, removed during refurbishment, or lost when a leaf is replaced. Without identification the assembly cannot be verified, and an unverifiable door is treated as a fail.",
      },
      {
        type: "callout",
        title: "The one that surprises owners",
        text: "Propping a fire door open, even briefly, is the most common day-to-day breach in occupied buildings. If a door is being propped, there is usually an operational reason worth solving properly with a compliant hold-open device.",
      },
      { type: "h2", text: "What to do before your next inspection" },
      {
        type: "list",
        items: [
          "Walk every fire door and release each one from fully open",
          "Note any door that does not latch by itself",
          "Check that tags are present and legible",
          "Flag any door where flooring or frames have been altered since the last inspection",
        ],
      },
    ],
  },
  {
    slug: "hydrant-maintenance-requirements",
    image: "/images/stock/hydrant.webp",
    title: "Fire hydrant maintenance: what the standard requires",
    excerpt:
      "Flow, pressure and booster assembly checks, plus how to read a hydrant test report before you sign it.",
    category: "Testing",
    tags: ["Hydrants", "AS1851", "Testing", "Maintenance"],
    date: "2026-04-02",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "The hydrant system is the one measure in your building that exists purely for the fire brigade. Everything else buys occupants time to leave. This is the one firefighters connect to on arrival, which is why the test that matters is whether it actually delivers water, not whether it looks maintained.",
      },
      { type: "h2", text: "What gets tested" },
      {
        type: "list",
        items: [
          "Flow rate and residual pressure at hydrant points",
          "Condition and operation of the booster assembly",
          "Valve condition, accessibility and correct position",
          "Comparison of measured performance against the system's required design flow",
        ],
      },
      { type: "h2", text: "Reading the report before you sign it" },
      {
        type: "p",
        text: "The single most important line on a hydrant test report is the comparison between measured flow and required design flow. A report that records what was measured but never states what was required has not answered the question. Ask for both numbers.",
      },
      {
        type: "callout",
        title: "Compliant on paper is not the same as delivering water",
        text: "Our technicians have needed this exact system to perform on arrival at a working fire. That is the standard we test to, and it is the difference worth paying for.",
      },
      { type: "h2", text: "Booster assemblies deserve their own attention" },
      {
        type: "p",
        text: "The booster is where the brigade connects, so it has to be accessible, correctly identified and clear of obstruction. Landscaping, parking and storage grow around boosters over time. If a truck cannot get to it, the rest of the system does not matter.",
      },
      { type: "h2", text: "How often" },
      {
        type: "p",
        text: "Flow testing is generally an annual exercise, with condition checks occurring more frequently as part of your routine service schedule. Your fire safety schedule determines what applies to your building.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
