"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PlayButton } from "@/components/ui/PlayButton";

const VIDEO_ID = "692S-zAhRgA";
const VIDEO_TITLE = "Ensure Your Business Is Fire Safe and Compliant, AllFire Services Sydney";

/**
 * Full-bleed video band. The whole section is the click target rather than
 * only the button, so there is a large, forgiving hit area on any device.
 */
export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="relative isolate scroll-mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
        className="relative aspect-21/9 max-h-160 min-h-80 w-full overflow-hidden bg-ink"
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
            title={VIDEO_TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${VIDEO_TITLE}`}
            className="group absolute inset-0 flex w-full cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-flame-orange"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */}
            <img
              src="/images/intro-bg.webp"
              srcSet="/images/intro-bg-sm.webp 1100w, /images/intro-bg.webp 1920w"
              sizes="100vw"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Light scrim only: enough to lift the button off the plant room
                without washing out the red pipework that makes the shot work. */}
            <span
              className="absolute inset-0 bg-ink/25 transition-colors duration-300 group-hover:bg-ink/10"
              aria-hidden="true"
            />

            <PlayButton size="lg" />
          </button>
        )}
      </motion.div>
    </section>
  );
}
