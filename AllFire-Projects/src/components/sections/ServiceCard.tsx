import Link from "next/link";
import type { Service } from "@/types/service";
import { getServiceImage } from "@/content/services/images";

/**
 * Service card, landing page.
 *
 * Photo and label, nothing else. Descriptions, standards and CTAs were removed
 * on request: on a landing page the grid's job is to show the range at a glance
 * and let people click, and five paragraphs of body copy competing side by side
 * slows that down rather than helping.
 *
 * The detail still exists on the service page itself, one click away.
 *
 * Labels sit on a dark section, so they are white rather than ink.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-ink-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */}
        <img
          src={getServiceImage(service.slug)}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
        {/* Keeps five different photos inside one palette. */}
        <span
          className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-60"
          aria-hidden="true"
        />
      </div>

      <span className="mt-5 block text-center font-display text-lg leading-tight font-bold text-white transition-colors duration-200 group-hover:text-flame-yellow md:text-xl">
        {service.name}
      </span>
    </Link>
  );
}
