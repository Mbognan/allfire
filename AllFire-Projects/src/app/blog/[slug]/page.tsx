import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Button } from "@/components/ui/Button";
import { BookingSection } from "@/components/sections/BookingSection";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ArticleQuestion } from "@/components/blog/ArticleQuestion";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, FlameIcon, TagIcon } from "@/components/ui/Icon";
import { posts, getPostBySlug, tagSlug, type Block } from "@/content/posts";
import { company } from "@/content/company";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Renders one content block. Kept separate so the page body stays readable. */
function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl font-bold text-ink uppercase md:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-5 max-w-[68ch] text-lg text-ink-soft">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-6 grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-red-deep"
                aria-hidden="true"
              />
              <span className="max-w-[64ch] text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="mt-8 rounded-2xl border-l-4 border-flame-red-deep bg-paper-raised p-6">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <FlameIcon className="h-5 w-5 shrink-0 text-flame-orange" aria-hidden="true" />
            {block.title}
          </p>
          <p className="mt-2 text-ink-soft">{block.text}</p>
        </aside>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  /* A real pager: null at the ends rather than wrapping around, so the last
     article does not claim the first one is "next". */
  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <>
      <PageHero
        eyebrow={post.category}
        lead={post.title}
        crumbLabel="Article"
        crumbs={[{ label: "Blogs", href: "/blog" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <Container className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_300px] lg:gap-14">
          {/* Article first in the DOM so screen readers and keyboard users reach
              the content before the rail, regardless of visual column order. */}
          <article>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-soft">
              <span className="brand-gradient rounded-[50px] px-4 py-1.5 font-display text-xs font-bold tracking-[0.14em] text-white uppercase">
                {post.category}
              </span>
              <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                {post.readMinutes} min read
              </span>
            </div>

            <PhotoFrame
              src={post.image}
              alt={post.title}
              className="mt-7 aspect-16/9 w-full"
              tint="dark"
            />

            <p className="mt-8 max-w-[68ch] text-xl font-semibold text-ink">{post.excerpt}</p>

            {post.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}

            {/* Tags link into a filtered index rather than sitting as decoration. */}
            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <span className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.1em] text-ink uppercase">
                <TagIcon className="h-4 w-4 text-flame-orange" aria-hidden="true" />
                Tags
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tagSlug(tag))}`}
                  className="rounded-[50px] border border-line px-4 py-1.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:border-flame-red-deep hover:bg-flame-red-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-line p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-bold text-ink">
                  Want this handled for your building?
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Firefighter-run compliance across {company.areaServed}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/#booking" variant="primary">
                  Get a Quote
                </Button>
                <Button href="/services" variant="outline">
                  Our Services
                </Button>
              </div>
            </div>

            <ArticleQuestion articleTitle={post.title} />

            {/* Article pager. Grid keeps "next" hard right even when there is
                no previous, so the pair never collapses into the wrong side. */}
            <nav
              aria-label="Article navigation"
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  rel="prev"
                  className="group flex items-center gap-4 rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-flame-red-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
                >
                  <ArrowLeftIcon
                    className="h-5 w-5 shrink-0 text-flame-red-deep transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                      Previous
                    </span>
                    <span className="mt-1 block font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-flame-red-deep">
                      {prev.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" className="hidden sm:block" />
              )}

              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  rel="next"
                  className="group flex items-center justify-end gap-4 rounded-2xl border border-line p-6 text-right transition-colors duration-300 hover:border-flame-red-deep/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
                >
                  <span>
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                      Next
                    </span>
                    <span className="mt-1 block font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-flame-red-deep">
                      {next.title}
                    </span>
                  </span>
                  <ArrowRightIcon
                    className="h-5 w-5 shrink-0 text-flame-red-deep transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </nav>
          </article>

          <BlogSidebar activeSlug={post.slug} />
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
