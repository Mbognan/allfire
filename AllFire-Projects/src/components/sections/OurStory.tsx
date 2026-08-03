import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryVideo } from "@/components/sections/StoryVideo";
import { generations, legacyStrapline } from "@/content/legacy";
import { story } from "@/content/mission";

/**
 * Master switch for the Tricklebank generations timeline.
 *
 * Off at the client's request. It is retained rather than deleted because it is
 * their own artwork and data, and because turning it back on is a one-word
 * change if the family-legacy story returns to the site.
 *
 * Typed as boolean, not inferred as `false`, so the JSX below stays type-checked
 * rather than being narrowed to unreachable.
 */
const SHOW_LEGACY_TIMELINE: boolean = false;

/** The client's supplied artwork. Any of these extensions is picked up. */
const LEGACY_IMAGE_CANDIDATES = [
  "generation-of-tricklebank.webp",
  "generation-of-tricklebank.png",
  "generation-of-tricklebank.jpg",
  "generation-of-tricklebank.jpeg",
];

/**
 * Resolved at build time. The client's graphic is the intended presentation,
 * but shipping an <img> for a file that is not in the repo yet would render a
 * broken image on a live page. So: use the artwork the moment it exists, and
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
          </div>

          <StoryVideo />
        </div>

        {/* The fireman tree, directly below the story column.

            Full width of the container rather than inside the left column: the
            artwork is roughly 2.7:1, and dropping it into a half-width column
            would render five portraits at about 90px each. It reads as a band
            under the story, which is also where it sits in the reading order,
            straight after "Read our full story". */}
        {compact && (
          <figure className="mt-14">
            <Image
              src="/images/tricklebank-fireman-tree.png"
              alt="The Tricklebank fireman tree: five generations of firefighters, Walter, Ian, Trevor, Stanley and Peter, spanning 1911 to 2025."
              width={3080}
              height={1150}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full rounded-2xl"
            />
          </figure>
        )}

        {/* Not rendered at all in compact mode. Hiding it with CSS would still
            ship the markup and publish the same content on two pages.

            Currently switched off everywhere by SHOW_LEGACY_TIMELINE. The
            timeline dates the family line from 1911 and names the founder,
            both of which the rest of the site no longer does. Flip the constant
            to bring it back; nothing else needs changing. */}
        {SHOW_LEGACY_TIMELINE && !compact && (
        <div className="mt-14">
          {legacyImage ? (
            /*
              The artwork is wide and detailed. Rather than scaling it down to
              an illegible strip on a phone, it keeps its width and the wrapper
              scrolls, so the real graphic stays readable at every size.
            */
            <figure>
              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- client-supplied artwork, served as-is */}
                <img
                  src={legacyImage}
                  alt="Generation of Tricklebank: the family fire service line from 1911 to 2025, listing William, Trevor, Stanley, Ian and Paul Tricklebank, Grant Fuller, Paul Wilson, Managing Director Peter Tricklebank, and next generation Kyriakos and Orlando Tricklebank."
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full min-w-160 rounded-2xl"
                />
              </div>
              <figcaption className="mt-6 border-t border-line pt-6 text-center font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
                {legacyStrapline}
              </figcaption>
            </figure>
          ) : (
            <>
              {/* Fallback until the artwork lands. Same data, no broken image. */}
              <p className="font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
                Generations of the Tricklebank fire service line
              </p>
              <ol className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 scrollbar-none lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible xl:grid-cols-10">
                {generations.map((generation) => (
                  <li
                    key={`${generation.year}-${generation.name}`}
                    className="w-40 shrink-0 snap-start text-center lg:w-auto"
                  >
                    <span className="brand-gradient mx-auto flex h-16 w-16 items-center justify-center rounded-full font-display text-sm font-bold text-white tabular-nums">
                      {generation.year.split(" ")[0]}
                    </span>
                    <span className="mx-auto mt-3 block h-6 w-px bg-line" aria-hidden="true" />
                    <p className="font-display text-base font-bold text-flame-red-deep tabular-nums">
                      {generation.year}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-ink">
                      {generation.relation}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">{generation.name}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-6 text-center font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
                {legacyStrapline}
              </p>
            </>
          )}
        </div>
        )}
      </Container>
    </section>
  );
}
