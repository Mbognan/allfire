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

    const view = Math.max(1, Math.round(track.clientWidth / step));
    setPerView(view);

    /* Active is a PAGE index, matching the dots, which count pages rather than
       sliding positions. Measuring in cards while rendering in pages made dot 2
       highlight after a single card had scrolled. */
    const page = step * view;
    const max = track.scrollWidth - track.clientWidth;
    const lastPage = Math.max(0, Math.ceil(count / view) - 1);

    // Snap the end of travel to the final dot, or rounding leaves it one short.
    setActive(
      max > 0 && track.scrollLeft >= max - 2 ? lastPage : Math.round(track.scrollLeft / page)
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

  /** `index` is a page, so a press moves a whole view rather than one card. */
  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = (card?.offsetWidth ?? track.clientWidth) + gap;
    track.scrollTo({ left: step * perView * index, behavior: "smooth" });
  }

  /*
    Pages, not sliding positions.

    This was `count - perView + 1`, which for 8 cards two-up produced 7 stops
    indexing overlapping pairs: dot 3 and dot 4 shared a card, so no reader
    could build a model of what a dot meant. Ceil(count / perView) gives 4 dots
    for 4 distinct pages, which is also inside the working-memory budget for a
    position indicator where 7 was not.

    A carousel showing everything at once does not need an indicator at all.
  */
  const stops = Math.max(1, Math.ceil(count / perView));
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
            aria-label={`Go to page ${i + 1} of ${stops}`}
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
