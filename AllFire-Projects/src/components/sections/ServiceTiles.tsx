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
          {/* Same anatomy as ServiceCard directly above: rounded photo, tonal
              scrim, centred white label underneath that goes yellow on hover.

              The first pass floated a white caption plate over the image, which
              put two different card designs in one section and made the tiles
              read as a separate component borrowed from somewhere else. */}
          <Link
            href={`/services/${slug}`}
            className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
          >
            {/* Fixed aspect so the row cannot reflow as images load. */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-ink-2">
              <Image
                src={getServiceImage(slug)}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              />
              {/* Keeps eight different photographs inside one palette. */}
              <span
                className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-60"
                aria-hidden="true"
              />
            </div>

            <span className="mt-4 block text-center font-display text-base leading-tight font-bold text-balance text-white transition-colors duration-200 group-hover:text-flame-yellow md:text-lg">
              {label}
            </span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
