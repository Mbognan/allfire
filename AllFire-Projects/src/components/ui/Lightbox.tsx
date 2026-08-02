"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { XIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icon";

const ease = [0.33, 1, 0.68, 1] as const;

export type LightboxImage = { src: string; alt: string };

/**
 * Image viewer.
 *
 * A modal dialog, so it carries the obligations of one: Escape closes, focus
 * moves in on open and returns to the trigger on close, Tab is trapped inside
 * while it is open, and the page behind does not scroll.
 *
 * Arrow keys page through the set, because a viewer that only responds to
 * clicked chevrons is unusable from the keyboard.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  caption,
}: {
  images: LightboxImage[];
  /** null = closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  caption?: string;
}) {
  const open = index !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /* Whatever was focused before opening, so focus can go home on close. */
  const returnRef = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      // Wrap, so paging past either end continues rather than dead-ends.
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;

    returnRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    // Lock the page behind the dialog.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap: cycle within the dialog rather than escaping to the page.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      returnRef.current?.focus();
    };
  }, [open, onClose, go]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={caption ? `${caption}, image viewer` : "Image viewer"}
            className="relative flex h-full w-full max-w-5xl flex-col"
            /* No stopPropagation here on purpose.

               This panel is a full-height box, and a contained image leaves
               large empty areas inside it. Swallowing clicks at this level
               meant all that dead space did nothing, and only the thin margin
               outside the panel closed the viewer, which reads as the dialog
               ignoring you. Clicks are stopped on the actual content below
               instead, so anywhere that looks like background behaves like
               background. */
          >
            <div
              className="flex shrink-0 items-center justify-between gap-4 pb-4 text-white"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Caption truncates, counter does not: they were one <p>, so a
                  long system name pushed the position indicator out of view.
                  aria-live announces the change when paging with arrow keys,
                  which otherwise moved the image silently. */}
              <p className="flex min-w-0 items-baseline gap-3 font-display text-sm font-bold tracking-wide uppercase">
                <span className="min-w-0 truncate">{caption}</span>
                <span
                  className="shrink-0 font-normal text-white/70 tabular-nums"
                  aria-live="polite"
                >
                  {index + 1} / {images.length}
                </span>
              </p>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close image viewer"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
              >
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease }}
                className="relative h-full w-full"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  /* contain, not cover: this is the view where the whole frame
                     matters, unlike the cropped thumbnails. */
                  className="object-contain"
                />
              </motion.div>
            </div>

            {images.length > 1 && (
              <div
                className="flex shrink-0 items-center justify-center gap-3 pt-4"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                >
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                >
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
