export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Real client reviews, replacing the placeholder quotes that shipped here
 * before.
 *
 * Two editorial rules applied:
 *
 *   Length. A landing-page quote is a snippet, not a full review. The longer
 *   ones are trimmed to the sentences that carry the point, cutting only from
 *   the middle and the sign-off. No wording is rewritten and no claim is added,
 *   so each quote still reads as the reviewer wrote it.
 *
 *   Attribution. Names are as supplied. Where a reviewer left no name, the role
 *   describes the organisation instead of inventing one.
 *
 * Typos in the source ("Fire Safty", "mu childcare") are corrected, since they
 * are transcription artefacts rather than the reviewer's meaning.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I have been using All Fire Services for a few years now and I am very satisfied with both the quality of work and the fair pricing. I found Peter to be fair and honest and quick to respond, and very knowledgeable of all things fire safety.",
    name: "Joseph Abate",
    role: "Long-term client",
  },
  {
    quote:
      "Fantastic team at All Fire Services. Punctual, professional and friendly. George was really patient in explaining what needed to be completed on site and how all the systems work.",
    name: "James Alcock",
    role: "Client",
  },
  {
    quote:
      "Great team providing impeccable professional fire protection system installation, followed by on-call service for a couple of small faults. Highly recommend these guys.",
    name: "Mark Siversen",
    role: "Client",
  },
  {
    quote:
      "We've used a number of fire safety companies over the years. Our experience with All Fire has been spectacular. Couldn't be happier. Thanks team.",
    name: "Jason Leadbitter",
    role: "Client",
  },
  {
    /* Trimmed from roughly 200 words. Kept the tenure, the compliance point and
       the not-for-profit accommodation, which is what distinguishes this
       review; dropped the mission paragraph and the closing thanks. */
    quote:
      "As a charity, we've had the privilege of working with All Fire Services for over seven years. They have been a trusted partner, helping us navigate compliance requirements and addressing any issues with efficiency and care. They've also been incredibly accommodating of our unique needs as a not-for-profit organisation.",
    name: "Not-for-profit client",
    role: "Seven years with AllFire",
  },
  {
    /* Trimmed: kept the specifics (fair pricing, communication, two years of
       consistency), dropped the recommendation sign-off. */
    quote:
      "Pete, Jen and the team have everything we look for, from fair market prices to great communication and prompt, reliable service. We have used their maintenance services for almost two years and their standards have remained consistent.",
    name: "Household Properties",
    role: "Customer Service",
  },
  {
    quote:
      "It was wonderful to have the team at AllFire set our cafe up efficiently to meet safety standards. These guys were knowledgeable and quick to get the work done. Thoroughly recommend.",
    name: "Gavin Tooley",
    role: "Cafe owner",
  },
  {
    quote:
      "This company services my childcare centre. They have great communication, are prompt, on time and reasonable in price. I could definitely recommend them over other companies I have used.",
    name: "Michelle Constantin",
    role: "Childcare centre",
  },
];
