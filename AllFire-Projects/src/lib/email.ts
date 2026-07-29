import { Resend } from "resend";
import type { BookingInput, QuestionInput, EnquiryInput } from "@/lib/validation";
import { company } from "@/content/company";

export async function sendBookingNotification(data: BookingInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || company.email;

  const subject = `New booking request: ${data.serviceNeeded} (${data.name})`;
  const text = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Property type: ${data.propertyType}`,
    `Service needed: ${data.serviceNeeded}`,
    data.preferredDate ? `Preferred date: ${data.preferredDate}` : null,
    data.message ? `Message:\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    // Local dev without a Resend key configured yet — log instead of failing the form.
    console.log("[booking] RESEND_API_KEY not set, logging submission instead:\n", text);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "AllFire Services Website <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { delivered: true as const };
}

/**
 * Contact enquiry from the landing page.
 *
 * Own subject prefix so it is distinguishable in the inbox from a booking: the
 * two need different responses, and a general enquiry that looks like a booking
 * request gets triaged wrong.
 */
export async function sendEnquiryNotification(data: EnquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || company.email;

  const name = `${data.firstName} ${data.lastName}`;
  const location = [data.address, data.suburb, data.state, data.postcode]
    .filter(Boolean)
    .join(", ");

  const subject = `Website enquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    location ? `Property location: ${location}` : null,
    `\nHow can we help:\n${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    console.log("[enquiry] RESEND_API_KEY not set, logging submission instead:\n", text);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "AllFire Services Website <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { delivered: true as const };
}

/**
 * Reader question from a blog article. Sent to the same inbox as bookings but
 * with its own subject prefix, so Peter can tell a question from a job at a
 * glance, and replyTo is set so hitting reply answers the reader directly.
 */
export async function sendQuestionNotification(data: QuestionInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || company.email;

  const subject = `Article question from ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.articleTitle ? `Article: ${data.articleTitle}` : null,
    data.articleUrl ? `URL: ${data.articleUrl}` : null,
    "",
    "Question:",
    data.question,
  ]
    .filter((line) => line !== null)
    .join("\n");

  if (!apiKey) {
    console.log("[question] RESEND_API_KEY not set, logging submission instead:\n", text);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "AllFire Services Website <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { delivered: true as const };
}
