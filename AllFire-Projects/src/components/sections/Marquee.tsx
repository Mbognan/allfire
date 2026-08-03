import { cn } from "@/lib/utils";

/**
 * Full-bleed scrolling headline.
 *
 * Driven by a CSS keyframe on `transform` only, so it stays on the compositor
 * and costs no main-thread work. The phrase list is duplicated once and the
 * track translates exactly -50%, which is what makes the loop seamless.
 *
 * Phrase set by the client to "Need help?".
 *
 * Worth knowing when editing: the chat assistant launcher in the bottom-right
 * carries the same two words, so the phrase now points at two destinations on
 * the same screen. The band scrolls to the booking form; the launcher opens the
 * assistant. That was raised and the wording was chosen anyway, so it stays.
 *
 * Two tones:
 *   ink   - solid dark band, used as a CTA, the phrase links.
 *   ghost - oversized outlined type on paper, used as a decorative divider
 *           listing the systems we service. Not a link, and aria-hidden,
 *           because repeating "fire alarm systems" twelve times to a screen
 *           reader is noise, not content.
 *
 * One marquee per page. A second reads as filler.
 */
export function Marquee({
  text = "Need help?",
  phrases,
  href = "#booking",
  tone = "ink",
  className,
}: {
  text?: string;
  /** Cycle through several phrases instead of repeating one. */
  phrases?: string[];
  href?: string;
  tone?: "ink" | "ghost";
  className?: string;
}) {
  const list = phrases?.length ? phrases : Array.from({ length: 6 }, () => text);
  const ghost = tone === "ghost";

  const track = (
    <div
      className={cn(
        "marquee-track flex w-max items-center will-change-transform",
        ghost ? "gap-8 md:gap-12" : "gap-10"
      )}
    >
      {/* rendered twice: the second copy is what the loop scrolls into */}
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn("flex items-center", ghost ? "gap-8 md:gap-12" : "gap-10")}
          aria-hidden={copy === 1}
        >
          {list.map((phrase, i) => (
            <span key={`${phrase}-${i}`} className={cn("flex items-center", ghost ? "gap-8 md:gap-12" : "gap-10")}>
              <span
                className={cn(
                  "font-display font-bold tracking-wide uppercase whitespace-nowrap",
                  ghost
                    ? "text-4xl text-ink/10 md:text-6xl lg:text-7xl"
                    : "text-4xl text-white transition-colors duration-200 group-hover:text-flame-yellow md:text-6xl"
                )}
              >
                {phrase}
              </span>
              <Asterisk ghost={ghost} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  if (ghost) {
    return (
      <section
        className={cn("relative isolate overflow-hidden bg-paper-raised py-8 md:py-10", className)}
        aria-hidden="true"
      >
        {track}
      </section>
    );
  }

  return (
    <section
      className={cn("relative isolate overflow-hidden border-y border-ink bg-ink py-7", className)}
      aria-label={`${text}, jump to the booking form`}
    >
      <a href={href} className="group block cursor-pointer">
        {track}
      </a>
    </section>
  );
}

/** Six-petal separator mark, matching the reference's divider glyph. */
function Asterisk({ ghost = false }: { ghost?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn(
        "shrink-0",
        ghost
          ? "h-6 w-6 text-flame-orange/30 md:h-9 md:w-9"
          : "h-7 w-7 text-flame-orange md:h-9 md:w-9"
      )}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="20" cy="9" rx="4.2" ry="8" />
        <ellipse cx="20" cy="31" rx="4.2" ry="8" />
        <ellipse cx="20" cy="9" rx="4.2" ry="8" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="31" rx="4.2" ry="8" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="9" rx="4.2" ry="8" transform="rotate(120 20 20)" />
        <ellipse cx="20" cy="31" rx="4.2" ry="8" transform="rotate(120 20 20)" />
        <circle cx="20" cy="20" r="4" />
      </g>
    </svg>
  );
}
