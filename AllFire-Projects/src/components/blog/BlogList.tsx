"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/Icon";
import { posts, getAllTags, tagSlug } from "@/content/posts";

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const allTags = getAllTags();

/**
 * Filterable article list.
 *
 * Reads the active tag from the URL rather than local state, so a tag link from
 * an article lands on a filtered index, and the filtered view is shareable and
 * survives a refresh or a back button.
 *
 * This is a Client Component purely for `useSearchParams`; the page around it
 * stays statically prerendered, which is why it sits behind a Suspense boundary.
 */
export function BlogList() {
  const params = useSearchParams();
  const activeTag = params.get("tag");

  const visible = activeTag
    ? posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === activeTag))
    : posts;

  const showLead = !activeTag && visible.length > 0;
  const lead = showLead ? visible[0] : null;
  const rest = showLead ? visible.slice(1) : visible;

  return (
    <>
      {/* Filter row. "All" is a real option so clearing the filter never
          requires the browser back button. */}
      <div className="mb-10 flex flex-wrap items-center gap-2.5">
        <Link
          href="/blog"
          aria-current={activeTag ? undefined : "page"}
          className={`rounded-[50px] border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep ${
            activeTag
              ? "border-line text-ink-soft hover:border-flame-red-deep hover:text-flame-red-deep"
              : "border-transparent bg-flame-red-deep text-white"
          }`}
        >
          All articles
        </Link>

        {allTags.map((tag) => {
          const slug = tagSlug(tag);
          const active = activeTag === slug;
          return (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(slug)}`}
              aria-current={active ? "page" : undefined}
              className={`rounded-[50px] border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep ${
                active
                  ? "border-transparent bg-flame-red-deep text-white"
                  : "border-line text-ink-soft hover:border-flame-red-deep hover:text-flame-red-deep"
              }`}
            >
              {tag}
            </Link>
          );
        })}
      </div>

      {/* Empty state: a filter that matches nothing still has to say so. */}
      {visible.length === 0 && (
        <div className="rounded-2xl border border-line p-12 text-center">
          <p className="font-display text-xl font-bold text-ink">Nothing tagged that yet</p>
          <p className="mt-2 text-ink-soft">
            We have not published an article with this tag. Browse everything instead.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[50px] bg-flame-red-deep px-7 py-3 text-sm font-semibold tracking-[0.06em] text-white uppercase transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
          >
            All articles
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {lead && (
        <Link
          href={`/blog/${lead.slug}`}
          className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-line transition-colors duration-300 hover:border-flame-red-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep lg:grid-cols-2 lg:gap-0"
        >
          <PhotoFrame
            src={lead.image}
            alt={lead.title}
            rounded={false}
            className="aspect-16/10 w-full lg:h-full"
            tint="dark"
          />
          <div className="p-7 md:p-10">
            <span className="brand-gradient inline-block rounded-[50px] px-4 py-1.5 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
              {lead.category}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink transition-colors duration-300 group-hover:text-flame-red-deep md:text-4xl">
              {lead.title}
            </h2>
            <p className="mt-4 text-ink-soft">{lead.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-soft">
              <time dateTime={lead.date}>{dateFormat.format(new Date(lead.date))}</time>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                {lead.readMinutes} min read
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-flame-red-deep uppercase">
              Read article
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ${lead ? "mt-10" : ""}`}>
          {rest.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-flame-red-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
              >
                <div className="relative">
                  <PhotoFrame
                    src={post.image}
                    alt={post.title}
                    rounded={false}
                    className="aspect-16/10 w-full"
                    tint="dark"
                  />
                  <span className="brand-gradient absolute bottom-3 left-3 rounded-[50px] px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs text-ink-soft">
                    <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-flame-red-deep">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-flame-red-deep uppercase">
                    Read article
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
