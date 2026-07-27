import { getProduct } from "@/content/products";

/**
 * Featured slides for the services banner.
 *
 * Points at real products rather than duplicating their copy, so a rename or a
 * new photo flows through automatically. The headline is the pitch; the product
 * it links to is the proof.
 *
 * Self-testing is the angle throughout: it is the one thing that changes what
 * compliance costs a building owner in labour.
 */
export type FeaturedSlide = {
  serviceSlug: string;
  productSlug: string;
  /** Big line. Kept short: this sits at display size. */
  headline: string;
  /** One line under it. */
  tagline: string;
};

export const featuredSlides: FeaturedSlide[] = [
  {
    serviceSlug: "emergency-lighting-testing",
    productSlug: "led-exit-sign-single",
    headline: "Self-Test Exit Signs",
    tagline: "The light tests itself. You get the record.",
  },
  {
    serviceSlug: "smoke-alarm-testing",
    productSlug: "photoelectric-240v",
    headline: "10 Year Smoke Alarms",
    tagline: "Sealed lithium backup. No annual battery swap.",
  },
  {
    serviceSlug: "air-mechanical",
    productSlug: "smoke-damper",
    headline: "Monitored Smoke Dampers",
    tagline: "Position reported straight to the panel.",
  },
];

/** Slides paired with their product, dropping any that no longer resolve. */
export function resolvedSlides() {
  return featuredSlides
    .map((slide) => ({
      slide,
      product: getProduct(slide.serviceSlug, slide.productSlug),
    }))
    .filter((entry): entry is { slide: FeaturedSlide; product: NonNullable<typeof entry.product> } =>
      Boolean(entry.product)
    );
}
