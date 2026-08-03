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

/** Panel widths. Closed is wide enough to read a suburb; open shows the building. */
const CLOSED = "w-44 lg:w-52";
const OPEN = "w-[22rem] lg:w-[30rem]";

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
    /* Scroll by most of a viewport rather than one panel: panels are narrow, and
       a single-panel step makes the arrows feel broken. */
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: "smooth" });
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
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

          {/* Arrows only where the rail exists. Below md the layout is a stack. */}
          <div className="hidden shrink-0 gap-2 md:flex">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => page(direction)}
                aria-label={direction === 1 ? "Show more buildings" : "Show previous buildings"}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/25 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                <ArrowRightIcon className={cn("h-4 w-4", direction === -1 && "rotate-180")} />
              </button>
            ))}
          </div>
        </div>

        {/* The rail.

            Full-bleed via negative margin so panels run to the screen edge and
            the row reads as continuing rather than stopping at the container. */}
        <div
          ref={trackRef}
          onMouseLeave={() => setActive(null)}
          className="mt-12 -mx-6 hidden gap-3 overflow-x-auto px-6 pb-2 scrollbar-none md:flex md:h-104 lg:h-128"
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
