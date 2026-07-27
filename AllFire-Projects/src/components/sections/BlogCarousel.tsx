"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/Icon";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { posts } from "@/content/posts";

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function BlogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const distance = (card?.offsetWidth ?? 360) + 24;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  return (
    <section id="insights" className="relative isolate scroll-mt-20 overflow-hidden bg-white py-20 md:py-28">
      <BrandCorner position="bottom-left" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Insights</Eyebrow>
            <SectionHeading
              className="mt-5"
              lead="Fire compliance,"
              accent="explained plainly"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous article"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next article"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              data-card
              className="group w-[82%] shrink-0 snap-start sm:w-96"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
              >
              <div className="relative">
                <PhotoFrame
                  src={post.image}
                  alt={post.title}
                  className="aspect-16/10 w-full"
                  tint="dark"
                />
                <span className="brand-gradient absolute bottom-0 left-0 px-4 py-2 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
                  {post.category}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft">
                <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {post.readMinutes} min read
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold text-ink transition-colors duration-200 group-hover:text-flame-red-deep">
                {post.title}
              </h3>
              <p className="mt-2.5 text-sm">{post.excerpt}</p>

              <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-flame-red-deep uppercase">
                Read article
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              </Link>
            </article>
          ))}
        </motion.div>

        <CarouselDots trackRef={trackRef} count={posts.length} label="Articles" />
      </Container>
    </section>
  );
}
