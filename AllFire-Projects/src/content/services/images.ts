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
  /* The five headline services now carry purpose-made artwork in
     services-img/, named by slug so the mapping is self-evident. The remaining
     nine are still on stock stand-ins below. */
  "emergency-lighting-testing": "/images/services-img/emergency-lighting-testing.png",
  "fire-extinguisher-tagging": "/images/services-img/fire-extinguisher-tagging.png",
  "smoke-alarm-testing": "/images/services-img/smoke-alarm-testing.png",
  "diesel-pump-inspection": "/images/services-img/diesel-pump-inspection.png",
  "air-mechanical": "/images/services-img/air-mechanical.png",
  /* Real job photography, from the documented jobs in jobs.ts. */
  "electric-pump-motor": "/images/services-img/staff-img/george-electric-pump-1.jpeg",
  "fire-sprinkler-systems": "/images/services-img/staff-img/peter-sprinkler-1.jpeg",
  "fire-panels-detection": "/images/stock/riser-room.webp",
  "fire-hydrant-systems": "/images/stock/hydrant.webp",
  "fire-penetration-sealing": "/images/stock/crew-2.webp",
  "fire-doors-frames": "/images/stock/crew-3.webp",
  "fire-spray-protection": "/images/stock/crew-4.webp",
  "fire-system-upgrades": "/images/stock/team-1.webp",
  "annual-fire-safety-statement": "/images/stock/team-2.webp",
  "as1851-routine-servicing": "/images/stock/crew-1.webp",
};

export const serviceImageFallback = "/images/stock/technician.webp";

export function getServiceImage(slug: string) {
  return serviceImages[slug] ?? serviceImageFallback;
}
