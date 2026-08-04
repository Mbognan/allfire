"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, MenuIcon, XIcon } from "@/components/ui/Icon";
import { primaryNav } from "@/content/nav";
import { company } from "@/content/company";

const subscribeNoop = () => () => {};

// Enter eases out, exit is shorter and eases in, so dismissal feels responsive.
const easeOut = [0.33, 1, 0.68, 1] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  /** Which nav item has its submenu expanded. Only one at a time. */
  const [openSection, setOpenSection] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: reduce ? 0.15 : 0.32, ease: easeOut }}
          className="fixed inset-0 z-50 overflow-y-auto bg-ink text-paper"
        >
          <Container className="flex min-h-full flex-col py-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold tracking-wide uppercase">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:text-flame-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: reduce ? 0 : 0.1 + i * 0.055,
                    ease: easeOut,
                  }}
                >
                  {item.children ? (
                    <div className="border-b border-paper/10">
                      <button
                        type="button"
                        aria-expanded={openSection === item.href}
                        onClick={() =>
                          setOpenSection(openSection === item.href ? null : item.href)
                        }
                        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-2xl font-bold tracking-wide uppercase transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                            openSection === item.href ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          openSection === item.href ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        {/* overflow-hidden belongs on the collapsing child, not
                            the grid parent, or the first row leaks when closed. */}
                        <ul className="min-h-0 overflow-hidden">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block cursor-pointer py-2.5 pl-4 text-base font-semibold text-paper/70 transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="mb-4 block cursor-pointer py-2.5 pl-4 font-display text-sm font-bold tracking-wide text-flame-yellow uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                            >
                              View all services
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block cursor-pointer border-b border-paper/10 py-4 font-display text-2xl font-bold tracking-wide uppercase transition-colors duration-200 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-yellow"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: reduce ? 0 : 0.33, ease: easeOut }}
              className="mt-auto flex flex-col gap-4 pt-10"
            >
              <Button href={company.phoneHref} variant="primary">
                Call {company.phone}
              </Button>
              <Button href="#booking" variant="outline-light" withArrow onClick={() => setOpen(false)}>
                Get a Quote
              </Button>
              {/* A WhatsApp button sat here linking to Peter's mobile, beneath a
                  "Call 1300 765 594" button that was already the same intent.
                  Removed: it duplicated the call CTA and published the mobile. */}
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:text-flame-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-orange"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {isClient ? createPortal(overlay, document.body) : null}
    </div>
  );
}
