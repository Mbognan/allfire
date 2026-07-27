import Link from "next/link";
import { posts } from "@/content/posts";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { PhoneIcon } from "@/components/ui/Icon";

/**
 * Article rail. Same sticky contract as the service sidebar: `self-start` is
 * required or a stretched grid item is full height and has nothing to stick
 * against. Below lg it drops under the article as a normal block.
 */
export function BlogSidebar({ activeSlug }: { activeSlug?: string }) {
  const others = posts.filter((post) => post.slug !== activeSlug).slice(0, 4);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="More articles" className="overflow-hidden rounded-2xl border border-line">
        <p className="bg-paper-raised px-5 py-4 font-display text-base font-bold tracking-[0.1em] text-ink uppercase">
          More reading
        </p>
        <ul className="divide-y divide-line bg-white">
          {others.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block px-5 py-3.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-paper-raised hover:text-flame-red-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="Our services"
        className="mt-6 overflow-hidden rounded-2xl border border-line"
      >
        <p className="bg-paper-raised px-5 py-4 font-display text-base font-bold tracking-[0.1em] text-ink uppercase">
          What we provide
        </p>
        <ul className="divide-y divide-line bg-white">
          {services.slice(0, 5).map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block px-5 py-3 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-paper-raised hover:text-flame-red-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
