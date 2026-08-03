import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryVideo } from "@/components/sections/StoryVideo";
import { generations, legacyStrapline } from "@/content/legacy";
import { story } from "@/content/mission";

/**
 * Master switch for the Tricklebank generations timeline, on both the landing
 * page and /about.
 *
 * On. It previously also gated a separate "fireman tree" image on the landing
 * page; that artwork was deleted from the repo and its block has gone with it,
 * so this constant now controls one thing.
 *
 * Typed as boolean, not inferred as `false`, so the JSX below stays type-checked
 * rather than being narrowed to unreachable.
 */
const SHOW_LEGACY_TIMELINE: boolean = true;

/**
 * The client's supplied artwork, newest filename first.
 *
 * tricklebank_family_timeline.png is the current graphic: five generations on a
 * single arrow, ending with Peter as Managing Director. The older
 * generation-of-tricklebank names are kept below it so an existing file under
 * the previous convention still resolves rather than silently dropping to the
 * text fallback.
 */
const LEGACY_IMAGE_CANDIDATES = [
  "tricklebank_family_timeline.png",
  "generation-of-tricklebank.webp",
  "generation-of-tricklebank.png",
  "generation-of-tricklebank.jpg",
  "generation-of-tricklebank.jpeg",
];

/**
 * Resolved at build time. The client's graphic is the intended presentation,
 * but pointing an image tag at a file that is not in the repo yet would render
 * a broken image on a live page. So: use the artwork the moment it exists, and
 * fall back to the same data as a text timeline until then. Drop the file into
 * public/images/ and this switches over on the next build, no code change.
 */
function findLegacyImage(): string | null {
  for (const file of LEGACY_IMAGE_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", file))) {
      return `/images/${file}`;
    }
  }
  return null;
}

/**
 * `compact` is the landing-page cut: the story and the video, then a link
 * through to the full page. The generations timeline only appears on /about, so
 * the same content is not published twice.
 */
export function OurStory({ variant = "full" }: { variant?: "full" | "compact" }) {
  const legacyImage = findLegacyImage();
  const compact = variant === "compact";

  return (
    <section id="our-story" className="scroll-mt-24 bg-white py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <SectionHeading className="mt-5" lead="Founded by" accent="a firefighter" />

            {/* Founder named by role, not by name, at the client's request. The
                paragraphs are their own copy, held in mission.ts. */}
            <p className="mt-6 max-w-xl text-lg">{story.founding}</p>
            <p className="mt-4 max-w-xl text-ink-soft">{story.concept}</p>

            {!compact && (
              <>
                <p className="mt-4 max-w-xl text-ink-soft">{story.training}</p>
                <p className="mt-4 max-w-xl text-ink-soft">{story.credentials}</p>
              </>
            )}

            {compact && (
              <Link
                href="/about"
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-display text-sm font-bold tracking-wide text-flame-red-deep uppercase transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-red-deep"
              >
                Read our full story
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}

            {/* Inside the story column, not a full-width band beneath it.

                The video column is taller than the text, so the left column ran
                out of content and left a screen of white under the link. The
                timeline fills that space and reads as part of the story rather
                than as a separate exhibit. */}
            {SHOW_LEGACY_TIMELINE && <LegacyTimeline image={legacyImage} className="mt-12" />}
          </div>

          <StoryVideo />
        </div>

        {/* A second, landing-page-only block sat here rendering
            /images/tricklebank-fireman-tree.png. That file has been deleted
            from the repo, so it shipped as a broken image with its alt text
            showing, and it named a different five people from the current
            artwork. Removed: the block below now covers both pages with the
            file that actually exists. */}

      </Container>
    </section>
  );
}

/**
 * The generations graphic, sized for the story column rather than the page.
 *
 * It ran full width under the grid. In a column it can no longer carry a 640px
 * minimum, so the artwork simply scales: at roughly 2:1 it sits about half as
 * tall as the column is wide, which is enough to read five portraits and their
 * dates without the horizontal scroll the full-width version needed on phones.
 *
 * Below sm it keeps a floor and scrolls, because five portraits across a 360px
 * screen is a smear either way, and scrolling at least leaves them legible.
 */
function LegacyTimeline({ image, className }: { image: string | null; className?: string }) {
  if (image) {
    return (
      <figure className={className}>
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- client-supplied artwork, served as-is */}
          <img
            src={image}
            /* Describes the artwork that is actually on screen. The previous
               alt listed ten people from an earlier graphic, including several
               who do not appear in this one. */
            alt="Generation of Tricklebank: five generations in the fire service. 1911 William Tricklebank, grandfather; 1931 Trevor Tricklebank; 1957 Stanley Tricklebank, father; 1959 Ian Tricklebank, uncle; and 2020 to current, Managing Director Peter Tricklebank."
            loading="lazy"
            decoding="async"
            className="h-auto w-full min-w-120 rounded-2xl sm:min-w-0"
          />
        </div>
        <figcaption className="mt-5 border-t border-line pt-5 text-center font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
          {legacyStrapline}
        </figcaption>
      </figure>
    );
  }

  /* Fallback until the artwork lands. Same data, no broken image. Two columns
     rather than the old five-to-ten across, since this now lives in a column. */
  return (
    <div className={className}>
      <p className="font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
        Generations of the Tricklebank fire service line
      </p>
      <ol className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {generations.map((generation) => (
          <li key={`${generation.year}-${generation.name}`} className="text-center">
            <span className="brand-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-full font-display text-sm font-bold text-white tabular-nums">
              {generation.year.split(" ")[0]}
            </span>
            <p className="mt-3 font-display text-sm font-bold text-ink">{generation.relation}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{generation.name}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-line pt-5 text-center font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
        {legacyStrapline}
      </p>
    </div>
  );
}
