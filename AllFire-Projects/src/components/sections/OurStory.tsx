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
 * Master switch for every Tricklebank family-legacy element in this section:
 * the fireman tree artwork on the landing page and the generations timeline on
 * /about. Both are gated on this one constant so neither can come back alone.
 *
 * Off at the client's request. It is retained rather than deleted because it is
 * their own artwork and data, and because turning it back on is a one-word
 * change if the family-legacy story returns to the site.
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
          </div>

          <StoryVideo />
        </div>

        {/* The fireman tree, directly below the story column.

            Full width of the container rather than inside the left column: the
            artwork is roughly 2.7:1, and dropping it into a half-width column
            would render five portraits at about 90px each. It reads as a band
            under the story, which is also where it sits in the reading order,
            straight after "Read our full story". */}
        {SHOW_LEGACY_TIMELINE && compact && (
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

        {/* Shown in both modes now, so it sits under "Read our full story" on
            the landing page as well as on /about.

            It was restricted to /about to avoid publishing the same content
            twice. That reasoning held for the old text timeline, which was a
            block of names and dates; this is one image, and a repeated image
            does not carry the duplicate-content cost that repeated prose does.

            Note the tension worth watching: this graphic dates the family line
            from 1911 and names Peter, while the surrounding copy now starts the
            business at 2009 and describes the founder by role only. */}
        {SHOW_LEGACY_TIMELINE && (
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
                  /* Describes the artwork that is actually on screen. The
                     previous alt listed ten people from an earlier graphic,
                     including several who do not appear in this one. */
                  alt="Generation of Tricklebank: five generations in the fire service. 1911 William Tricklebank, grandfather; 1931 Trevor Tricklebank; 1957 Stanley Tricklebank, father; 1959 Ian Tricklebank, uncle; and 2020 to current, Managing Director Peter Tricklebank."
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
