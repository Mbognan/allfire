import type { Variants } from "motion/react";

/**
 * Shared motion tokens.
 *
 * Timing lived as loose numbers in nineteen components, which is why the reveals
 * drifted out of sync with each other. New motion should import from here.
 *
 * EASE_REVEAL vs EASE_SNAP is the important distinction:
 *
 *   EASE_REVEAL  cubic-bezier(0.33, 1, 0.68, 1)  "easeOutCubic"
 *     For entrances. Spreads the movement evenly across the duration, so the
 *     element reads as arriving. The previous curve here was expo-out
 *     (0.16, 1, 0.3, 1), which front-loads almost all of its travel into the
 *     first fifth of the duration: technically slow, but it looks like the
 *     element snapped into place and then sat still. That is what "too fast"
 *     was describing.
 *
 *   EASE_SNAP    cubic-bezier(0.16, 1, 0.3, 1)   "easeOutExpo"
 *     Keep for short UI feedback under ~300ms, where the abrupt settle is the
 *     point: accordions, dropdowns, panel opens.
 */
export const EASE_REVEAL = [0.33, 1, 0.68, 1] as const;
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const;

/** Scroll-entrance duration. Long enough to be watchable, short enough to not block reading. */
export const REVEAL_DURATION = 0.9;

/** Gap between staggered children. Below ~0.1 a group reads as arriving at once. */
export const REVEAL_STAGGER = 0.12;

/**
 * Fire the reveal once a real portion of the element is on screen. Kept at or
 * below 0.3: `amount` is a fraction of the ELEMENT, so a section taller than
 * the viewport can never reach a high threshold and would never animate in.
 */
export const REVEAL_VIEWPORT = { once: true, amount: 0.3 } as const;

export const revealTransition = {
  duration: REVEAL_DURATION,
  ease: EASE_REVEAL,
};

/** Standard entrance: rise and fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: revealTransition },
};

/** Parent for a staggered group. Pair with `fadeUp` on the children. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: REVEAL_STAGGER } },
};
