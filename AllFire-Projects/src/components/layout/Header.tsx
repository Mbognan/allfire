"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { primaryNav } from "@/content/nav";
import { company } from "@/content/company";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth the raw progress so the bar does not jitter on fast scrolls.
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  // Elevation is state feedback: it tells the user the page has moved.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-[0_6px_24px_rgba(22,19,15,0.10)]" : "border-line"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Brand lockup + accreditation, separated by a rule so the FPA mark
            reads as an endorsement rather than part of the AllFire logo. */}
        <div className="flex items-center gap-4 xl:gap-5">
          <Link href="/" aria-label={`${company.name} home`}>
            <Logo priority />
          </Link>

          <span className="hidden h-10 w-px bg-line sm:block" aria-hidden="true" />

          <Image
            src="/images/brand/fpa-bronze-member.png"
            alt="Fire Protection Association Australia Bronze Member"
            width={364}
            height={182}
            sizes="120px"
            className="hidden h-9 w-auto sm:block xl:h-11"
          />
        </div>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {primaryNav.map((item) =>
            item.children ? (
              <ServicesMenu key={item.href} item={item} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="group relative cursor-pointer py-1 font-display text-base font-semibold tracking-wide text-ink uppercase transition-colors duration-200 hover:text-flame-red-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
              >
                {item.label}
                {/* Underline grows from the left to confirm the hover target */}
                <span className="brand-gradient absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            )
          )}
        </nav>

        {/*
          Two channels, not two labels for the same thing: the quote button goes
          to the booking form, the number opens a WhatsApp chat.

          The number is always rendered. It was previously wrapped in
          `hidden xl:inline`, which left an empty button between lg and xl.
        */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            variant="outline"
            className="px-4 text-base xl:px-6 xl:text-lg"
            aria-label={`Message AllFire Services on WhatsApp, ${company.phone}`}
          >
            {company.phone}
          </Button>

          <Button href="#booking" variant="primary" className="px-4 xl:px-6 xl:text-base">
            Get a Quote
          </Button>
        </div>

        <MobileNav />
      </Container>

      {/* Reading-progress bar. Purely transform-driven, so it never reflows. */}
      <motion.div
        style={{ scaleX: progress }}
        className="brand-gradient absolute inset-x-0 bottom-0 h-0.5 origin-left"
        aria-hidden="true"
      />
    </header>
  );
}
