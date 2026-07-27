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
