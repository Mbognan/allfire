"use client";

import { MotionConfig } from "motion/react";

/**
 * `reducedMotion="user"` makes Motion honour prefers-reduced-motion internally:
 * transform and layout animations are skipped, opacity still fades.
 *
 * This matters for correctness, not just preference. Branching animation props
 * on the value returned by `useReducedMotion()` diverges between the server
 * render, which cannot know the preference, and the client, producing a
 * hydration mismatch for every reduced-motion user. Letting MotionConfig handle
 * it keeps the rendered markup identical on both sides.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
