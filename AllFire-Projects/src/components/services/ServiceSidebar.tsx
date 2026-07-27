import Link from "next/link";
import { services } from "@/content/services";
import { company } from "@/content/company";
import { PhoneIcon } from "@/components/ui/Icon";

/**
 * Service navigation rail.
 *
 * Sticks to the viewport while the article column scrolls, so the reader can
 * jump between services without scrolling back to the top. Stickiness is
 * applied here rather than on the grid parent, and `self-start` is required:
 * a stretched grid item is full-height, and a full-height element has nothing
 * to stick against.
 *
 * Below lg it becomes a normal block above the content, because a sticky rail
 * on a phone just eats the viewport.
 */
export function ServiceSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Our services" className="overflow-hidden rounded-2xl border border-line">
        <p className="bg-paper-raised px-6 py-4 font-display text-base font-bold tracking-[0.1em] text-ink uppercase">
          Categories
        </p>

        <ul className="divide-y divide-line bg-white">
          {services.map((service) => {
            const active = service.slug === activeSlug;
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`block px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep ${
                    active
                      ? "bg-flame-red-deep text-white"
                      : "text-ink-soft hover:bg-paper-raised hover:text-flame-red-deep"
                  }`}
                >
                  {service.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Information block, mirroring the reference's secondary rail. */}
      <nav
        aria-label="Information"
        className="mt-6 overflow-hidden rounded-2xl border border-line"
      >
        <p className="bg-paper-raised px-6 py-4 font-display text-base font-bold tracking-[0.1em] text-ink uppercase">
          Information
        </p>
        <ul className="divide-y divide-line bg-white">
          {[
            { label: "Our Story", href: "/about" },
            { label: "All Services", href: "/services" },
            { label: "Insights", href: "/blog" },
            { label: "Contact Us", href: "/#contact" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-5 py-3 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-paper-raised hover:text-flame-red-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Emergency card: the one thing someone reading a service page at 2am needs. */}
      <div className="brand-gradient mt-6 rounded-2xl p-6 text-white">
        <p className="font-display text-sm font-bold tracking-[0.1em] text-white/80 uppercase">
          Always here for your safety
        </p>
        <p className="mt-2 font-display text-2xl font-bold">24/7 emergency line</p>
        <a
          href={company.emergencyPhoneHref}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-[50px] bg-white/15 px-5 py-2.5 font-display text-lg font-bold transition-colors duration-200 hover:bg-white hover:text-flame-red-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          {company.emergencyPhone}
        </a>
      </div>
    </aside>
  );
}
