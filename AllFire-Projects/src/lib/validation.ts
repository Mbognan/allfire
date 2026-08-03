import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(6, "A valid phone number is required").max(30),
  email: z.string().trim().email("A valid email is required").max(200),
  propertyType: z.string().trim().min(1).max(60),
  serviceNeeded: z.string().trim().min(1).max(120),
  preferredDate: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /**
   * Honeypot: real users never see or fill this field.
   *
   * It must ACCEPT a filled value rather than reject it. If the schema rejects
   * it, the request 400s here and the route's "silently pretend success" branch
   * never runs, which tells the bot exactly which field caught it. Let it parse,
   * then discard it in the route.
   */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

/**
 * Article question. Deliberately a separate, shorter schema than a booking:
 * asking a question should not require a phone number, a property type and a
 * service selection. Every extra required field here costs a real enquiry.
 */
export const questionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  question: z
    .string()
    .trim()
    .min(10, "Please give us a little more detail")
    .max(2000),
  /** Which article it came from, so the reply has context. Not user-entered. */
  articleTitle: z.string().trim().max(200).optional().or(z.literal("")),
  articleUrl: z.string().trim().max(300).optional().or(z.literal("")),
  /** Honeypot. Accepts a value on purpose, see the note on bookingSchema. */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type QuestionInput = z.infer<typeof questionSchema>;

/**
 * Landing page contact enquiry.
 *
 * Separate from bookingSchema because it asks a different question. A booking
 * needs a property type, a service and a date; this is "here is who I am and
 * what I need", which is a lower bar to clear and therefore converts better on
 * a landing page.
 *
 * The whole property location block is optional on purpose: someone asking a
 * general question should not be blocked on a postcode. Only identity, contact
 * and the message itself are required.
 */
export const enquirySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z.string().trim().min(6, "A valid phone number is required").max(30),
  email: z.string().trim().email("A valid email is required").max(200),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  suburb: z.string().trim().max(120).optional().or(z.literal("")),
  state: z.string().trim().max(40).optional().or(z.literal("")),
  postcode: z.string().trim().max(10).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Please tell us a little about what you need")
    .max(2000),
  /** Honeypot. Accepts a value on purpose, see the note on bookingSchema. */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/**
 * Quote request from a service page.
 *
 * Nothing is stored. The route validates, sends one email and forgets, which is
 * also why there is no consent checkbox or retention notice: there is no record
 * to consent to.
 *
 * `service` is filled by the page rather than typed, so the recipient always
 * knows which category the request came from even when the message is "how much
 * for the whole building".
 */
export const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(6, "A valid phone number is required").max(30),
  email: z.string().trim().email("A valid email is required").max(200),
  /** Set by the page. Free text so a future page can pass anything sensible. */
  service: z.string().trim().max(160).optional().or(z.literal("")),
  /** Optional: someone asking for a price should not be blocked on prose. */
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Honeypot. Accepts a value on purpose, see the note on bookingSchema. */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
