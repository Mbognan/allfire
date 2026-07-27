"use client";

import { useState } from "react";
import { PlayButton } from "@/components/ui/PlayButton";
import { storyShortId } from "@/content/legacy";

/**
 * Facade-loaded YouTube Short. The iframe only mounts on click, so the page
 * does not pay for a third-party frame nobody asked to watch.
 */
export function StoryVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-9/16 w-full max-w-70 justify-self-start overflow-hidden rounded-2xl bg-ink lg:justify-self-end">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${storyShortId}?autoplay=1`}
          title="The Tricklebank fireman tree, new generation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-flame-orange"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube CDN thumbnail */}
          <img
            src={`https://i.ytimg.com/vi/${storyShortId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          />
          <span
            className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent"
            aria-hidden="true"
          />
          <PlayButton size="md" />
          <span className="relative mt-4 max-w-[80%] text-center font-display text-sm font-bold tracking-wide text-white uppercase">
            Watch: the Tricklebank fireman tree
          </span>
        </button>
      )}
    </div>
  );
}
