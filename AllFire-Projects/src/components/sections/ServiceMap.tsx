"use client";

import { motion, type Variants } from "motion/react";
import { AUSTRALIA_PATH, AU_VIEWBOX, project } from "@/content/australiaMap";
import { serviceAreas } from "@/content/serviceAreas";
import { MapPinFillIcon } from "@/components/ui/Icon";

const ease = [0.33, 1, 0.68, 1] as const;

const pinGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.35, staggerChildren: 0.11 } },
};

/** Pins drop in and settle, which is what makes them read as landing on a place. */
const pinVariant: Variants = {
  hidden: { opacity: 0, y: -18, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 20 },
  },
};

/**
 * Where we operate.
 *
 * Flat grey landmass with teardrop markers, matching the reference. The outline
 * is generated from public-domain Natural Earth data; markers are Phosphor pins
 * positioned as a percentage of the same projection that produced the coastline,
 * so each one sits on its true coordinates rather than being nudged by eye.
 *
 * Markers are HTML over the SVG rather than paths inside it, so they keep a
 * constant pixel size as the map scales, instead of ballooning on desktop.
 *
 * The whole thing is aria-hidden: it repeats what the text list beside it
 * already says, and the list is the accessible source of truth.
 */
export function ServiceMap() {
  return (
    <div className="relative w-full" aria-hidden="true">
      <motion.svg
        viewBox={`0 0 ${AU_VIEWBOX.w} ${AU_VIEWBOX.h}`}
        className="h-auto w-full"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease }}
      >
        <path d={AUSTRALIA_PATH} className="fill-ink/15" />
      </motion.svg>

      {/* Marker layer, positioned in the same coordinate space as the path. */}
      <motion.div
        className="absolute inset-0"
        variants={pinGroup}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {serviceAreas.map((area) => {
          const { x, y } = project(area.lng, area.lat);
          const left = (x / AU_VIEWBOX.w) * 100;
          const top = (y / AU_VIEWBOX.h) * 100;

          return (
            <motion.span
              key={area.name}
              variants={pinVariant}
              title={area.name}
              style={{ left: `${left}%`, top: `${top}%` }}
              /* -translate-x-1/2 -translate-y-full puts the pin's point, not its
                 centre, on the coordinate. */
              className="absolute -translate-x-1/2 -translate-y-full"
            >
              <span className="relative flex">
                <MapPinFillIcon
                  className={`text-flame-red drop-shadow-[0_2px_3px_rgba(22,19,15,0.25)] ${
                    area.major ? "h-7 w-7 md:h-9 md:w-9" : "h-5 w-5 md:h-6 md:w-6"
                  }`}
                />
                {/* Halo pulses at the pin's point. Stops under reduced motion
                    via the shared .assistant-ping rule. */}
                <span
                  className="assistant-ping pointer-events-none absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-flame-orange/50"
                  aria-hidden="true"
                />
              </span>
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
