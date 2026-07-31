/**
 * Company mission and positioning, from the client's own supplied copy.
 *
 * Kept close to their wording rather than rewritten. The original leans on
 * capitalised Nouns throughout ("High-Level Professional Fire Safety Services");
 * that is normalised to sentence case for readability on the web, but no claim,
 * date or figure has been changed.
 *
 * Note: the founder is described by role, not by name, at the client's request.
 */

export const mission =
  "To provide high-level professional fire safety services whilst being approachable, practical and reasonable.";

/** One-sentence positioning. Used for meta descriptions and page intros. */
export const positioning =
  "Australian owned and operated, created by a former NSW Fire Brigades Senior Officer, staffing every job with professional firefighters, serving and retired.";

export const story = {
  founding:
    "All Fire Services is an Australian owned and operated business, created by a former NSW Fire Brigades Senior Officer in December 2009.",
  concept:
    "The company was founded on a simple idea: that our customer service technicians should be professional firefighters, both serving and retired. It means every client gets extensive, real-life knowledge of the fire safety industry rather than a checklist.",
  training:
    "Our personnel receive ongoing training for their respective positions, with professional development a focus of the company. We are firm believers in continuous training, through industry seminars and conferences as well as practical workplace training.",
  standards:
    "All Fire Services ensures service delivery that reflects current fire safety regulation requirements, and where necessary provides technical expertise on issues affecting the Building Code of Australia, the Environmental Planning and Assessment Regulations and the relevant Australian Standards.",
  credentials:
    "We have held Trades Monitor certification since 2009, and are an Authorised Fire Services Contractor with Community Select, so we are always correctly and currently insured and meeting all workplace health and safety requirements.",
  experience:
    "Behind the business are 37 years of service with NSW Fire Brigades, spanning both response to real fire situations and compliance with the Building Code of Australia and Australian Standards. That experience covers every aspect of fire safety.",
};

/**
 * The story, in reading order, for any section that wants to render all of it.
 */
export const storyParagraphs = [
  story.founding,
  story.concept,
  story.training,
  story.standards,
  story.credentials,
  story.experience,
];
