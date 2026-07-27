"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { PlayButton } from "@/components/ui/PlayButton";
import { YouTubeIcon } from "@/components/ui/SocialIcons";
import { shorts } from "@/content/shorts";
import { company } from "@/content/company";

export function ShortsCarousel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const distance = (card?.offsetWidth ?? 300) + 24;
    track.scrollBy({ left: distance * direction, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="bg-paper-raised py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Fire safety shorts</Eyebrow>
            <SectionHeading
              className="mt-5"
              lead="Quick lessons from"
              accent="real jobs"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous video"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next video"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {shorts.map((short) => {
            const isPlaying = activeId === short.id;

            return (
              <figure
                key={short.id}
                data-card
                className="w-[68%] shrink-0 snap-center sm:w-72"
              >
                <div className="relative aspect-9/16 overflow-hidden rounded-2xl bg-ink">
                  {isPlaying ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1&playsinline=1`}
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveId(short.id)}
                      aria-label={`Play video: ${short.title}`}
                      className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail host, not worth remote-image config */}
                      <img
                        // oardefault is the original-aspect (1080x1920) Shorts frame.
                        // hqdefault would be 16:9 and get side-cropped in these 9:16 cards.
                        src={`https://i.ytimg.com/vi/${short.id}/oardefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />
                      <PlayButton size="md" />
                    </button>
                  )}
                </div>

                <figcaption className="mt-4 font-display text-base font-bold text-ink">
                  {short.title}
                </figcaption>
              </figure>
            );
          })}
        </motion.div>

        <CarouselDots trackRef={trackRef} count={shorts.length} label="Shorts" />

        <a
          href={company.social.youtube}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2.5 py-2 font-display text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
        >
          <YouTubeIcon className="h-5 w-5 text-flame-red" />
          More on our YouTube channel
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </Container>
    </section>
  );
}
