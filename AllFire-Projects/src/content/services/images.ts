/**
 * Hero image per service.
 *
 * Each is matched to what the service actually involves rather than assigned at
 * random: documentation for the AFSS, overhead pipework for sprinklers, a
 * control panel for the diesel pump, an egress corridor for emergency lighting.
 *
 * These are stock stand-ins. Replace with real AllFire job photography when the
 * client supplies it, keyed by the same slugs.
 */
export const serviceImages: Record<string, string> = {
  "diesel-pump-inspection": "/images/stock/team-3.webp",
  "fire-extinguisher-tagging": "/images/stock/extinguisher.webp",
  "emergency-lighting-testing": "/images/stock/svc-emergency-lighting.webp",
  "smoke-alarm-testing": "/images/stock/svc-smoke-alarm.webp",
  "air-mechanical": "/images/stock/svc-air-mechanical.webp",
};

export const serviceImageFallback = "/images/stock/technician.webp";

export function getServiceImage(slug: string) {
  return serviceImages[slug] ?? serviceImageFallback;
}
