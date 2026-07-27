"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * Position indicator for a scroll-snap carousel.
 *
 * Reads the track's own scroll position rather than tracking an index in state,
 * so it stays correct however the user got there: drag, trackpad flick, arrow
 * button, autoplay or keyboard. Listening to the element's scroll event is fine
 * here; the thing that is banned is listening to window scroll for page
 * position, which this is not.
 *
 * Updates are coalesced into one rAF per frame so a fast flick cannot queue a
 * setState per scroll event.
 */
export function CarouselDots({
  trackRef,
  count,
  tone = "ink",
  className,
  label = "carousel",
}: {
  trackRef: RefObject<HTMLElement | null>;
  count: number;
  tone?: "ink" | "light";
  className?: string;
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card?.offsetWidth ?? track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = cardWidth + gap;
    if (step <= 0) return;

    setPerView(Math.max(1, Math.round(track.clientWidth / step)));

    const max = track.scrollWidth - track.clientWidth;
    // Snap the last position to the final dot, or rounding leaves it one short.
    setActive(
      max > 0 && track.scrollLeft >= max - 2
        ? Math.max(0, count - Math.max(1, Math.round(track.clientWidth / step)))
        : Math.round(track.scrollLeft / step)
    );
  }, [trackRef, count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onScroll);
    observer.observe(track);
    measure();

    return () => {
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [trackRef, measure]);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = (card?.offsetWidth ?? track.clientWidth) + gap;
    track.scrollTo({ left: step * index, behavior: "smooth" });
  }

  // A carousel showing everything at once does not need a position indicator.
  const stops = Math.max(1, count - perView + 1);
  if (stops <= 1) return null;

  return (
    <div
      className={cn("mt-8 flex items-center justify-center gap-2.5", className)}
      role="tablist"
      aria-label={`${label} position`}
    >
      {Array.from({ length: stops }).map((_, i) => {
        const current = i === Math.min(active, stops - 1);
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={current}
            aria-label={`Go to item ${i + 1} of ${stops}`}
            onClick={() => goTo(i)}
            /* Hit area is 44px tall via padding while the dot stays small. */
            className="group cursor-pointer py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all duration-300",
                current ? "w-7" : "w-2",
                current
                  ? tone === "light"
                    ? "bg-white"
                    : "bg-flame-red-deep"
                  : tone === "light"
                    ? "bg-white/35 group-hover:bg-white/60"
                    : "bg-ink/20 group-hover:bg-ink/40"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
