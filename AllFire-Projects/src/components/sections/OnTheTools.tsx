"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, ExpandIcon } from "@/components/ui/Icon";
import { Lightbox } from "@/components/ui/Lightbox";
import { jobs } from "@/content/jobs";
import { cn } from "@/lib/utils";

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * On the tools.
 *
 * Proof rather than claim. Every other section on this page asserts experience;
 * this one shows named technicians on real plant, photographed on the job.
 *
 * Structure is a sticky index beside a scrolling column of jobs. The index is
 * not decoration: it tells you how many jobs there are, which one you are
 * looking at, and lets you jump. That is the justification for the motion here,
 * it tracks position in a set rather than animating for effect.
 *
 * Deliberately not a three-card grid. The photographs are portrait phone shots
 * from plant rooms, and cropping them into equal landscape cards would throw
 * away the thing that makes them credible: they look taken, not art-directed.
 */
export function OnTheTools() {
  const [active, setActive] = useState(0);
  /** Which job, and which of its photos, the viewer is showing. null = closed. */
  const [viewer, setViewer] = useState<{ job: number; photo: number } | null>(null);
  const reduce = useReducedMotion();

  const viewerJob = viewer ? jobs[viewer.job] : null;
  const viewerImages = viewerJob
    ? viewerJob.photos.map((src, i) => ({
        src,
        alt:
          i === 0
            ? `${viewerJob.technician} servicing a ${viewerJob.system.toLowerCase()}`
            : `${viewerJob.system}, detail ${i + 1}`,
      }))
    : [];

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 md:py-28">
      <SectionBackdrop />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:gap-20">
          {/* Sticky index. Static above lg, where there is no room to stick. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="light"
              lead="Not a stock photo."
              accent="Our crew, this week."
            />
            <p className="mt-6 text-white/70">
              Every job below was done by an AllFire technician and photographed on site.
            </p>

            <ol className="mt-10 hidden lg:block">
              {jobs.map((job, i) => (
                <li key={job.id}>
                  <a
                    href={`#job-${job.id}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex cursor-pointer items-baseline gap-4 border-l-2 py-3 pl-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow",
                      i === active
                        ? "border-flame-yellow text-white"
                        : "border-white/15 text-white/45 hover:text-white/75"
                    )}
                  >
                    <span className="font-display text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-bold">{job.system}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Jobs */}
          <div className="space-y-20 md:space-y-28">
            {jobs.map((job, i) => (
              <motion.article
                key={job.id}
                id={`job-${job.id}`}
                className="scroll-mt-28"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                /* Drives the index. amount 0.4 means the entry has to be
                   meaningfully in view before it claims the marker, so the
                   highlight does not flicker between two jobs at the seam. */
                viewport={{ once: false, amount: 0.4 }}
                onViewportEnter={() => setActive(i)}
              >
                {/* Photo cluster: lead frame tall on the left, supporting frames
                    stacked beside it. Portrait lead because that is how the
                    photographs were actually taken.

                    Every frame is a button, not a decorated div, so the viewer
                    opens from the keyboard as well as the mouse. The thumbnails
                    are cropped; the viewer shows the whole frame. */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setViewer({ job: i, photo: 0 })}
                    aria-label={`View photos of ${job.technician} servicing a ${job.system.toLowerCase()}`}
                    className="group/photo relative col-span-2 row-span-2 aspect-3/4 cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
                  >
                    <Image
                      src={job.photos[0]}
                      alt={`${job.technician} servicing a ${job.system.toLowerCase()}`}
                      fill
                      sizes="(max-width: 1024px) 66vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover/photo:scale-105"
                    />
                    {/* Affordance. Only appears on hover, so it never sits over
                        the photograph at rest. */}
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
                      onClick={() => setViewer({ job: i, photo: p + 1 })}
                      aria-label={`View photo ${p + 2} of ${job.system.toLowerCase()}`}
                      className="group/photo relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-yellow"
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

                <div className="mt-7 max-w-xl">
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
              </motion.article>
            ))}
          </div>
        </div>
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
