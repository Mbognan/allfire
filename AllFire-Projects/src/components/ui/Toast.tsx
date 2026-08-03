"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckIcon, XIcon } from "@/components/ui/Icon";

const ease = [0.33, 1, 0.68, 1] as const;

/** Long enough to read two lines, short enough not to linger. */
const DISMISS_MS = 6000;

/**
 * Transient confirmation.
 *
 * Top centre, not the usual bottom right: the assistant launcher already
 * occupies that corner at every breakpoint, and a toast landing on top of it
 * would cover the thing it obscures.
 *
 * role="status" with aria-live="polite" announces the message without moving
 * focus. A toast that steals focus interrupts whatever the user does next, and
 * the confirmation is not worth that.
 *
 * Auto-dismisses, and is dismissable by hand, because auto-dismiss alone leaves
 * anyone who reads slowly with no way to clear it early.
 */
export function Toast({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, DISMISS_MS);
    return () => clearTimeout(id);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease }}
          className="fixed inset-x-4 top-4 z-100 mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full bg-ink py-3 pr-3 pl-5 shadow-2xl sm:top-6"
          role="status"
          aria-live="polite"
        >
          <span className="brand-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white">
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
          </span>

          <p className="text-sm font-semibold text-white">{message}</p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-orange"
          >
            <XIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
