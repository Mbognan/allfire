"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, ExpandIcon } from "@/components/ui/Icon";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { Lightbox } from "@/components/ui/Lightbox";
import { jobs, type Job } from "@/content/jobs";
import { cn } from "@/lib/utils";

const ease = [0.33, 1, 0.68, 1] as const;

/** One copy, one measure. Previously triplicated across three render paths. */
const INTRO =
  "Recent jobs across Greater Sydney, carried out by serving and retired firefighters on the systems buildings depend on.";

function leadAlt(job: Job) {
  return `${job.technician} servicing a ${job.system.toLowerCase()}`;
}

/**
 * Work on the ground.
 *
 * Proof rather than claim: named technicians on real plant, photographed on the
 * job.
 *
 * This was a pinned scroll spotlight showing one job at a time across 210vh.
 * Three problems came with that, and removing it solved all three at once:
 *
 *   - The photographs are the strongest evidence on the page, and rationing
 *     them one per screen made the weakest imagery on the page (the generated
 *     service card art directly above) the more visible of the two.
 *   - The two inactive panels stayed in the DOM as aria-hidden, and the link
 *     inside each remained tabbable, so keyboard focus landed on invisible
 *     controls. Gating tab order would have patched it; not rendering hidden
 *     panels at all removes the class of bug.
 *   - The pinned panel was min-h-dvh with overflow-hidden around a 68vh frame,
 *     so below roughly 500px of viewport height, reachable at 150% browser
 *     zoom, content clipped with no way to scroll to it.
 *
 * Now: a static mosaic at lg and up, all three visible at once, one tall
 * portrait beside two landscape frames so the row has rhythm rather than three
 * matching cards. Below lg, the same content as a swipeable rail.
 *
 * There is no reduced-motion branch any more. The only motion left is a scroll
 * reveal, which is gated on the hook, and the rail is CSS scroll-snap. Nothing
 * here needs a third layout to fall back to.
 */
export function OnTheTools() {
  /** Which job, and which of its photos, the viewer is showing. null = closed. */
  const [viewer, setViewer] = useState<{ job: number; photo: number } | null>(null);

  const viewerJob = viewer ? jobs[viewer.job] : null;
  const viewerImages = viewerJob
    ? viewerJob.photos.map((src, i) => ({
        src,
        alt: i === 0 ? leadAlt(viewerJob) : `${viewerJob.system}, detail ${i + 1}`,
      }))
    : [];

  const openViewer = (job: number, photo: number) => setViewer({ job, photo });

  const [lead, ...rest] = jobs;

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 md:py-28">
      <SectionBackdrop />

      <Container className="relative">
        <div className="max-w-2xl">
          <SectionHeading tone="light" lead="Work on" accent="the ground" />
          <p className="mt-6 text-lg text-white/70">{INTRO}</p>
        </div>

        {/* Mosaic, lg and up. One tall frame beside two wide ones: three equal
            cards would flatten the row and waste the portrait photography. */}
        <div className="mt-14 hidden gap-6 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <JobTile job={lead} jobIndex={0} onOpen={openViewer} aspect="aspect-3/4" priority />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            {rest.map((job, i) => (
              <JobTile
                key={job.id}
                job={job}
                jobIndex={i + 1}
                onOpen={openViewer}
                aspect="aspect-16/10"
              />
            ))}
          </div>
        </div>

        {/* Rail, below lg. */}
        <MobileRail onOpen={openViewer} />
      </Container>

      <Lightbox
        images={viewerImages}
        index={viewer ? viewer.photo : null}
        caption={viewerJob ? `${viewerJob.technician}, ${viewerJob.system}` : undefined}
        onClose={() => setViewer(null)}
        onIndexChange={(photo) => setViewer((v) => (v ? { ...v, photo } : v))}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */

type OpenViewer = (job: number, photo: number) => void;

/**
 * One documented job: photograph, then who did it and what it was.
 *
 * The caption sits under the frame rather than over it. Overlaid text needs a
 * scrim, the scrim costs the bottom third of the photograph, and these are
 * plant rooms where the bottom third is where the valves are.
 */
function JobTile({
  job,
  jobIndex,
  onOpen,
  aspect,
  priority = false,
}: {
  job: Job;
  jobIndex: number;
  onOpen: OpenViewer;
  aspect: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease }}
    >
      <button
        type="button"
        onClick={() => onOpen(jobIndex, 0)}
        aria-label={`View ${job.photos.length} photos of ${leadAlt(job)}`}
        className={cn(
          "group relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow",
          aspect
        )}
      >
        <Image
          src={job.photos[0]}
          alt={leadAlt(job)}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />

        {/* Always visible, not hover-only. On a pointer device a hover-gated
            affordance is invisible until you already suspect it is there, and
            on touch it never appears at all. */}
        <span
          className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 font-display text-xs font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-colors duration-300 group-hover:bg-ink"
          aria-hidden="true"
        >
          <ExpandIcon className="h-3.5 w-3.5" />
          {job.photos.length} photos
        </span>
      </button>

      <div className="mt-5">
        <p className="font-display text-sm font-bold tracking-[0.16em] text-flame-yellow uppercase">
          {job.technician}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-bold text-white uppercase">
          {job.system}
        </h3>
        <p className="mt-2 max-w-prose leading-relaxed text-white/70">{job.summary}</p>

        {job.serviceSlug && (
          <Link
            href={`/services/${job.serviceSlug}`}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
          >
            About this service
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Below lg: one job per slide on a scroll-snap rail.
 *
 * Slides sit at 86% so the next one peeks in; without that the rail reads as a
 * single static image and nobody swipes. The dots sit directly under the
 * photograph rather than after the copy, so the position indicator is on screen
 * at the moment the reader is deciding whether to swipe.
 */
function MobileRail({ onOpen }: { onOpen: OpenViewer }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        className="mt-10 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 scrollbar-none"
      >
        {jobs.map((job, i) => (
          <article key={job.id} data-card className="w-[86%] shrink-0 snap-start sm:w-[60%]">
            <button
              type="button"
              onClick={() => onOpen(i, 0)}
              aria-label={`View ${job.photos.length} photos of ${leadAlt(job)}`}
              className="group relative block aspect-3/4 w-full cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
            >
              <Image
                src={job.photos[0]}
                alt={leadAlt(job)}
                fill
                sizes="86vw"
                className="object-cover"
              />
              <span
                className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 font-display text-xs font-bold tracking-[0.12em] text-white uppercase backdrop-blur-sm"
                aria-hidden="true"
              >
                <ExpandIcon className="h-3.5 w-3.5" />
                {job.photos.length} photos
              </span>
            </button>

            <div className="mt-5">
              <p className="font-display text-sm font-bold tracking-[0.16em] text-flame-yellow uppercase">
                {job.technician}
              </p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-white uppercase">
                {job.system}
              </h3>
              <p className="mt-2 leading-relaxed text-white/70">{job.summary}</p>

              {job.serviceSlug && (
                <Link
                  href={`/services/${job.serviceSlug}`}
                  className="mt-4 inline-flex cursor-pointer items-center gap-2 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
                >
                  About this service
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <CarouselDots
        trackRef={trackRef}
        count={jobs.length}
        tone="light"
        label="Jobs"
        className="mt-6"
      />
    </div>
  );
}
