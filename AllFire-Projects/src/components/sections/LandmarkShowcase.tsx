"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { landmarks } from "@/content/landmarks";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * Panel widths, as a share of the visible rail rather than fixed pixels.
 *
 * Five panels and four 0.75rem gaps fill the container exactly, so the resting
 * row always shows five whole buildings at any screen width, with the rest
 * carried off-screen by the scroller. A hovered panel takes the space of two.
 *
 * Fixed widths were the alternative and they cannot hold this: at 1280px they
 * happen to show five, at 1600px six and a sliver.
 */
const CLOSED = "w-[calc(20%-0.6rem)]";
const OPEN = "w-[calc(40%-0.6rem)]";

/**
 * Strata and landmark buildings.
 *
 * An expanding accordion inside a horizontal rail, which is what lets it hold
 * any number of buildings without giving up the hover expansion.
 *
 * The earlier version was a fixed row that divided the container between however
 * many panels existed. That caps the set at about six before each panel is too
 * narrow to read, and adding a seventh silently made every other one worse. Here
 * the panels have their own width and the row scrolls, so the set can grow to
 * twenty without changing how any single panel looks.
 *
 * Width is animated rather than transform. Transform would scale the photograph
 * and overlap its neighbours; this is a row of solid objects making space for
 * each other, and the layout cost is bounded to one scroll container.
 */
export function LandmarkShowcase() {
  /** null = resting: every panel equal, nothing singled out. */
  const [active, setActive] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const page = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    /* Exactly one railful, which is exactly five panels: the widths are a fifth
       of this same box. Paging by a fraction would leave a panel half cut at
       the edge, which is the thing the five-up sizing exists to prevent. */
    track.scrollBy({ left: track.clientWidth * direction, behavior: "smooth" });
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 md:py-28">
      <Container>
        {/* Centred over the rail, which runs the full container width. */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Where we work</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Strata and landmark"
            accent="buildings we service"
          />
          <p className="mt-6 text-ink-soft">
            Across {company.areaServed}, from single blocks to whole portfolios.
          </p>
        </div>

        {/* Rail, with its controls sitting on it rather than above it.

            The arrows are vertically centred on the panels and inset at each
            end. Placed in the section header they were a long way from the
            thing they moved; on the rail itself, the control and its effect are
            the same object. */}
        <div className="relative mt-12 hidden md:block">
          <div
            ref={trackRef}
            onMouseLeave={() => setActive(null)}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-none md:h-104 lg:h-128"
          >
          {landmarks.map((landmark, i) => {
            const isActive = i === active;

            return (
              <button
                key={landmark.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${landmark.name}, a building we service`}
                className={cn(
                  "group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep",
                  "motion-safe:transition-[width] motion-safe:duration-600 motion-safe:ease-[cubic-bezier(0.33,1,0.68,1)]",
                  isActive ? OPEN : CLOSED
                )}
              >
                <Image
                  src={landmark.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  /* Closed panels sit slightly zoomed so the crop keeps the
                     building centred at narrow width; opening releases it. */
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-110"
                  )}
                />

                {/* Scrim anchored to the base, under the label only, so the
                    building itself is never dimmed to make text work. */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 transition-opacity duration-500",
                    isActive
                      ? "h-2/3 bg-linear-to-t from-ink/80 via-ink/30 to-transparent"
                      : "h-1/2 bg-linear-to-t from-ink/70 to-transparent"
                  )}
                  aria-hidden="true"
                />

                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-5 text-left font-display font-bold text-white uppercase transition-[font-size] duration-500",
                    isActive ? "text-2xl lg:text-3xl" : "text-lg"
                  )}
                >
                  {landmark.name}
                </span>
              </button>
            );
          })}
          </div>

          {/* Overlay controls, centred on the panels and inset at each end.
              White on the photography so they read at any crop, and outside the
              scroller so scrolling never carries them away. */}
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => page(direction)}
              aria-label={direction === 1 ? "Show more buildings" : "Show previous buildings"}
              className={cn(
                "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep",
                direction === -1 ? "left-3" : "right-3"
              )}
            >
              <ArrowRightIcon className={cn("h-5 w-5", direction === -1 && "rotate-180")} />
            </button>
          ))}
        </div>

        {/* Below md: a plain stack. An accordion at 375px gives every panel
            about 70px, which is neither readable nor hittable. */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {landmarks.map((landmark) => (
            <div key={landmark.id} className="relative h-64 overflow-hidden rounded-2xl">
              <Image
                src={landmark.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink/80 via-ink/35 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  {landmark.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
