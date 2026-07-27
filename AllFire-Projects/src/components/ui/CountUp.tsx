"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts a number up when it scrolls into view.
 *
 * Motivated, not decorative: the hero credibility figures (years of experience,
 * legacy year) are the strongest trust signal on the page, and the count draws
 * the eye to them. Under reduced motion the final value renders immediately.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion: jump straight to the value. Done inside rAF rather than
    // synchronously so it is not a cascading setState during the effect.
    if (reduce) {
      const id = requestAnimationFrame(() => setAnimated(value));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic, matching the entrance easing used across the page
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(Math.round(eased * value));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, duration]);

  // Rendered value never branches on `reduce`, so the server and the first
  // client render always agree and hydration stays clean.
  return (
    <span ref={ref} className={className}>
      {animated}
      {suffix}
    </span>
  );
}
