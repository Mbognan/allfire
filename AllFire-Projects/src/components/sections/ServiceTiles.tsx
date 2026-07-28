"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { getServiceBySlug } from "@/content/services";
import { getServiceImage } from "@/content/services/images";

/**
 * What the work actually looks like.
 *
 * The cards above sell the five headline services in words. This is the same
 * catalogue shown as photographs, which is what a building manager scanning the
 * page is really asking: is this the thing I need done.
 *
 * Tiles are listed by slug and captioned in plain equipment language ("Fire
 * Panel", not "Fire Panels & Detection"), because the label here names the
 * object in the photograph rather than the service line item.
 */
const TILES: { slug: string; label: string }[] = [
  { slug: "fire-panels-detection", label: "Fire Panel" },
  { slug: "smoke-alarm-testing", label: "Smoke Detectors" },
  { slug: "fire-extinguisher-tagging", label: "Portable Fire Extinguishers" },
  { slug: "diesel-pump-inspection", label: "Diesel Pump Set" },
  { slug: "emergency-lighting-testing", label: "Emergency Lighting" },
  { slug: "fire-penetration-sealing", label: "Passive Fire & Penetrations" },
  { slug: "fire-doors-frames", label: "Fire Doors" },
  { slug: "air-mechanical", label: "Mechanical Air Handling" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
};

export function ServiceTiles() {
  const tiles = TILES.map((tile) => ({ ...tile, service: getServiceBySlug(tile.slug) })).filter(
    (tile): tile is typeof tile & { service: NonNullable<typeof tile.service> } =>
      Boolean(tile.service)
  );

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mt-12 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4"
    >
      {tiles.map(({ slug, label }) => (
        <motion.li key={slug} variants={item}>
          <Link
            href={`/services/${slug}`}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
          >
            {/* Fixed aspect so the row cannot reflow as images load. */}
            <div className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src={getServiceImage(slug)}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              />

              {/* Caption plate. Sits over the base of the photograph rather than
                  under it, so the label is legible whatever the image is doing
                  and the tile stays one object instead of a picture with a
                  paragraph beneath it. */}
              <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 px-3 py-2.5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white">
                <p className="text-center text-sm leading-snug font-semibold text-balance text-ink">
                  {label}
                </p>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
