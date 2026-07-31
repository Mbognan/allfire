"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, ExpandIcon } from "@/components/ui/Icon";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { Lightbox } from "@/components/ui/Lightbox";
import { jobs, type Job } from "@/content/jobs";
import { cn } from "@/lib/utils";

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Scroll distance allotted to each job.
 *
 * The track is `jobs.length * VH_PER_JOB` tall and the panel is pinned for one
 * viewport of it, so the distance actually spent stepping through jobs is
 * `(jobs.length * VH_PER_JOB) - 100vh`.
 *
 * At 100 that meant 300vh of track for three jobs, and the section ate about
 * five screens of scrolling. At 70 the same three jobs occupy 210vh of track
 * and roughly 110vh of stepping, so the whole section costs about two screens.
 */
const VH_PER_JOB = 70;

function leadAlt(job: Job) {
  return `${job.technician} servicing a ${job.system.toLowerCase()}`;
}

/**
 * Work on the ground.
 *
 * Proof rather than claim: named technicians on real plant, photographed on the
 * job. The copy states what the work is and who did it. An earlier draft led
 * with "Not a stock photo", which was cut: it is defensive, and it invites the
 * reader to start auditing every other image on the site.
 *
 * Presented as a pinned spotlight. Stacking three portrait photo clusters
 * vertically cost roughly three screens of scroll for one section, and the
 * reader had to travel that distance to learn something they could have been
 * shown in place. So the section pins, the index stays put, and scroll swaps
 * which job is in the frame. One job is visible at a time; the rest are not
 * rendered dim, they are gone.
 *
 * Two render paths on purpose:
 *   - Pinned spotlight at lg and up, where there is height to pin into.
 *   - Plain stacked list below lg, or whenever reduced motion is requested.
 *     Hijacking scroll on a phone, or for someone who asked for less motion, is
 *     worse than a long page.
 */
export function OnTheTools() {
  const reduce = useReducedMotion();

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

  return (
    <section className="relative isolate bg-ink">
      {/* Three render paths, each simple, rather than one that bends to fit
          every case:

            Spotlight  lg and up, pinned, scroll-driven.
            Carousel   below lg, one job per slide, swipeable.
            Stacked    reduced motion, at every width.

          The mobile carousel exists because the desktop photo cluster does not
          survive a narrow column: a lead frame spanning two of three columns at
          375px is about 200px wide, and the two supporting frames land near
          100px. That is not a photograph, it is a swatch. One job per slide
          gives the lead frame the full width instead. */}
      {reduce ? (
        <Stacked onOpen={openViewer} />
      ) : (
        <>
          <Spotlight onOpen={openViewer} />
          <Carousel onOpen={openViewer} />
        </>
      )}

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

function Spotlight({ onOpen }: { onOpen: OpenViewer }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /* Mirrors `active` without re-subscribing the scroll handler, so the state
     setter only fires when the index actually changes rather than every frame. */
  const activeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(jobs.length - 1, Math.max(0, Math.floor(progress * jobs.length)));
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  });

  return (
    <div
      ref={trackRef}
      className="relative hidden lg:block"
      /* Total scroll length. The pinned panel consumes this distance while
         staying put, which is what converts vertical scroll into job changes. */
      style={{ height: `${jobs.length * VH_PER_JOB}vh` }}
    >
      <div className="sticky top-0 flex min-h-dvh items-center overflow-hidden py-20">
        <SectionBackdrop />

        <Container className="relative">
          <div className="grid grid-cols-[320px_1fr] gap-20">
            {/* Index. Stays put for the whole section. */}
            <div className="self-center">
              <SectionHeading
                tone="light"
                lead="Work on"
                accent="the ground"
              />
              <p className="mt-6 text-white/70">
                Recent jobs across Greater Sydney, on the systems buildings depend on, done by the crew
                you would meet on site.
              </p>

              <ol className="mt-10">
                {jobs.map((job, i) => (
                  <li key={job.id}>
                    <div
                      className={cn(
                        "flex items-baseline gap-4 border-l-2 py-3 pl-4 transition-colors duration-500",
                        i === active
                          ? "border-flame-yellow text-white"
                          : "border-white/15 text-white/40"
                      )}
                    >
                      <span className="font-display text-sm font-bold tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-bold">{job.system}</span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Progress. Earns its place by answering the question a pinned
                  section always raises: how much of this is left. */}
              <div className="mt-8 h-0.5 w-full overflow-hidden bg-white/15">
                <motion.div
                  className="brand-gradient h-full origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>

            {/* Frame. Every job is layered here; only the active one is visible
                and only it can be clicked. */}
            <div className="relative h-[68vh]">
              {jobs.map((job, i) => (
                <div
                  key={job.id}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-out",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <div className="flex h-full flex-col">
                    <JobPhotos
                      job={job}
                      jobIndex={i}
                      onOpen={onOpen}
                      /* Only the visible job is reachable by Tab. */
                      tabbable={i === active}
                      className="min-h-0 flex-1"
                    />
                    <JobCopy job={job} className="mt-6 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Mobile: one job per slide on a scroll-snap rail.
 *
 * Slides sit at 86% width so the next one peeks in at the edge. Without that
 * the rail looks like a single static image and nobody swipes.
 *
 * The lead photograph gets the full slide width and the two supporting frames
 * sit under it as a thumbnail pair, which keeps all three reachable without
 * shrinking the main frame to fit them alongside.
 */
function Carousel({ onOpen }: { onOpen: OpenViewer }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden py-20 lg:hidden">
      <SectionBackdrop />
      <Container className="relative">
        <SectionHeading tone="light" lead="Work on" accent="the ground" />
        <p className="mt-6 text-white/70">
          Recent jobs across Greater Sydney, on the systems buildings depend on, done by the crew
          you would meet on site.
        </p>
      </Container>

      {/* Full-bleed rail: the gutter is padding on the track, so the first slide
          lines up with the heading above while the rail itself runs edge to
          edge. */}
      <div
        ref={trackRef}
        className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 scrollbar-none"
      >
        {jobs.map((job, i) => (
          <article
            key={job.id}
            data-card
            className="w-[86%] shrink-0 snap-start"
          >
            <button
              type="button"
              onClick={() => onOpen(i, 0)}
              aria-label={`View photos of ${leadAlt(job)}`}
              className="group/photo relative block aspect-3/4 w-full cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
            >
              <Image
                src={job.photos[0]}
                alt={leadAlt(job)}
                fill
                sizes="86vw"
                className="object-cover"
              />
              <span
                className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-ink/85 to-transparent p-4 font-display text-xs font-bold tracking-[0.14em] text-white uppercase"
                aria-hidden="true"
              >
                <ExpandIcon className="h-4 w-4" />
                View {job.photos.length} photos
              </span>
            </button>

            {/* Supporting frames. Square and side by side, so they read as
                secondary to the lead rather than competing with it. */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {job.photos.slice(1, 3).map((photo, p) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => onOpen(i, p + 1)}
                  aria-label={`View photo ${p + 2} of ${job.system.toLowerCase()}`}
                  className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
                >
                  <Image src={photo} alt="" fill sizes="43vw" className="object-cover" />
                </button>
              ))}
            </div>

            <JobCopy job={job} className="mt-5" />
          </article>
        ))}
      </div>

      <Container className="relative">
        <CarouselDots
          trackRef={trackRef}
          count={jobs.length}
          tone="light"
          label="Jobs"
          className="mt-8"
        />
      </Container>
    </div>
  );
}

function Stacked({ onOpen }: { onOpen: OpenViewer }) {
  return (
    <div className="relative overflow-hidden py-20 md:py-28">
      <SectionBackdrop />
      <Container className="relative">
        <SectionHeading tone="light" lead="Work on" accent="the ground" />
        <p className="mt-6 max-w-md text-white/70">
          Recent jobs across Greater Sydney, on the systems buildings depend on, done by the crew
                you would meet on site.
        </p>

        <div className="mt-14 space-y-16">
          {jobs.map((job, i) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease }}
            >
              {/* The cluster's rows divide the container's height, so the
                  container needs one. Spotlight supplies it via flex-1; here it
                  comes from an aspect ratio. */}
              <JobPhotos
                job={job}
                jobIndex={i}
                onOpen={onOpen}
                tabbable
                className="aspect-4/3 sm:aspect-3/2"
              />
              <JobCopy job={job} className="mt-6" />
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Photo cluster: lead frame tall, supporting frames beside it. Portrait lead
 * because that is how the photographs were taken.
 *
 * Every frame is a button, so the viewer opens from the keyboard as well as the
 * pointer. Thumbnails are cropped; the viewer shows the whole frame.
 */
function JobPhotos({
  job,
  jobIndex,
  onOpen,
  tabbable,
  className,
}: {
  job: Job;
  jobIndex: number;
  onOpen: OpenViewer;
  tabbable: boolean;
  className?: string;
}) {
  const tabIndex = tabbable ? undefined : -1;

  return (
    <div className={cn("grid grid-cols-3 grid-rows-2 gap-3", className)}>
      <button
        type="button"
        onClick={() => onOpen(jobIndex, 0)}
        tabIndex={tabIndex}
        aria-label={`View photos of ${leadAlt(job)}`}
        className="group/photo relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
      >
        <Image
          src={job.photos[0]}
          alt={leadAlt(job)}
          fill
          sizes="(max-width: 1024px) 66vw, 40vw"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover/photo:scale-105"
        />
        {/* Affordance appears on hover only, so nothing sits over the
            photograph at rest. */}
        <span
          className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-ink/85 to-transparent p-4 font-display text-xs font-bold tracking-[0.14em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100"
          aria-hidden="true"
        >
          <ExpandIcon className="h-4 w-4" />
          View {job.photos.length} photos
        </span>
      </button>

      {job.photos.slice(1, 3).map((photo, p) => (
        <button
          key={photo}
          type="button"
          onClick={() => onOpen(jobIndex, p + 1)}
          tabIndex={tabIndex}
          aria-label={`View photo ${p + 2} of ${job.system.toLowerCase()}`}
          className="group/photo relative cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
        >
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover/photo:scale-105"
          />
        </button>
      ))}
    </div>
  );
}

function JobCopy({ job, className }: { job: Job; className?: string }) {
  return (
    <div className={cn("max-w-xl", className)}>
      <p className="font-display text-sm font-bold tracking-[0.16em] text-flame-yellow uppercase">
        {job.technician}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white uppercase md:text-3xl">
        {job.system}
      </h3>
      <p className="mt-3 leading-relaxed text-white/70">{job.summary}</p>

      {job.serviceSlug && (
        <Link
          href={`/services/${job.serviceSlug}`}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
        >
          About this service
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
