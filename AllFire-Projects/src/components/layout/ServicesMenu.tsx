"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon, ArrowRightIcon } from "@/components/ui/Icon";
import type { NavItem } from "@/content/nav";

/**
 * Services dropdown.
 *
 * Opens on hover for pointer users and on click/Enter for keyboard users, which
 * is the combination that keeps it usable both ways: hover alone is unreachable
 * by keyboard, click alone feels broken to mouse users on a nav like this.
 *
 * The trigger is a real <button aria-expanded> rather than a link-with-hover,
 * so screen readers announce the collapsed/expanded state. Escape closes and
 * returns focus to the trigger; clicking outside closes without stealing focus.
 */
export function ServicesMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Clear any pending close on unmount so we never setState on a dead component.
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  /* Small grace period: moving the pointer from trigger to panel crosses a gap,
     and closing instantly there makes the menu feel broken. */
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  const isActive = pathname.startsWith("/services");

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`group relative flex cursor-pointer items-center gap-1.5 py-1 font-display text-base font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep ${
          isActive ? "text-flame-red-deep" : "text-ink"
        }`}
      >
        {item.label}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        <span
          className={`brand-gradient absolute bottom-0 left-0 h-0.5 w-full origin-left transition-transform duration-200 ${
            isActive || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-full left-1/2 z-50 mt-4 w-66 -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_rgba(22,19,15,0.16)]"
          >
            <p className="brand-gradient px-5 py-3 font-display text-sm font-bold tracking-[0.12em] text-white uppercase">
              {item.label}
            </p>

            <ul className="py-2">
              {item.children?.map((child) => {
                const active = pathname === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={`block cursor-pointer px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep ${
                        active
                          ? "text-flame-red-deep"
                          : "text-ink-soft hover:text-flame-red-deep"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center justify-between border-t border-line px-5 py-3.5 font-display text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-200 hover:bg-paper-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
