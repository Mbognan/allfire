import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icon";

/** Compact banner for interior pages, so they are not competing with the home hero. */
export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  lead,
  accent,
  intro,
  /** Intermediate crumbs between Home and this page. Home and the current page
      are added automatically, so pass only what sits in between. */
  crumbs = [],
  /** Short name for the current page in the breadcrumb. Defaults to the
      headline, which is too long to read as a crumb on most pages. */
  crumbLabel,
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  intro?: string;
  crumbs?: Crumb[];
  crumbLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 md:py-24">
      <SectionBackdrop intensity="soft" />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li>
              <Link
                href="/"
                className="cursor-pointer transition-colors duration-200 hover:text-flame-yellow"
              >
                Home
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="cursor-pointer transition-colors duration-200 hover:text-flame-yellow"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  crumb.label
                )}
              </li>
            ))}
            <li aria-hidden="true">
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </li>
            <li className="text-white" aria-current="page">
              {crumbLabel ?? `${lead}${accent ? ` ${accent}` : ""}`}
            </li>
          </ol>
        </nav>

        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        {/* h1, not h2. This is the page's top-level heading: every interior
            page previously had no h1 at all, which costs both search ranking
            and screen-reader navigation. */}
        <SectionHeading
          as="h1"
          className="mt-5 max-w-3xl text-[2.25rem] sm:text-5xl lg:text-6xl"
          tone="light"
          lead={lead}
          accent={accent}
        />
        {intro && <p className="mt-6 max-w-xl text-lg text-white/75">{intro}</p>}
      </Container>
    </section>
  );
}
