import { Container } from "@/components/ui/Container";
import { clients } from "@/content/clients";
import { ClientLogoMark } from "@/components/sections/ClientLogoMarks";
import { cn } from "@/lib/utils";

/**
 * Continuously scrolling client logo ticker.
 *
 * Same technique as the Let's Talk marquee: the row is duplicated and the track
 * translates -50%, so the loop is seamless, and it is a transform-only CSS
 * keyframe so it composites on the GPU. Stops entirely under reduced motion.
 */
/**
 * The ticker itself, without a section wrapper.
 *
 * Kept on a white surface in both placements. The client artwork is a mix of
 * navy, black and inverted-white marks, so it only holds contrast against
 * white: dropping it onto the dark testimonials background would erase
 * Cambridge Lodge and Household Properties entirely.
 */
export function ClientLogoTicker({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white py-10", className)}>
      <p className="px-6 text-center font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
        Trusted by strata, property and facility managers across Sydney
      </p>

      {/* Edge fades so logos dissolve rather than getting clipped mid-glyph */}
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent md:w-28" />

        <div className="marquee-track marquee-slow flex w-max items-center gap-4 will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-4" aria-hidden={copy === 1}>
              {clients.map((client) => (
                <ClientMark key={`${copy}-${client.name}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Standalone band. Retained for any page that wants the ticker on its own; the
 * landing page now renders the ticker inside TestimonialsSection instead, so
 * the logos sit with the reviews they corroborate rather than a screen apart.
 */
export function ClientLogos() {
  return (
    <section className="border-y border-line bg-white py-12 md:py-14">
      <Container>
        <ClientLogoTicker className="rounded-none py-0" />
      </Container>
    </section>
  );
}

function ClientMark({ client }: { client: (typeof clients)[number] }) {
  if (client.src) {
    return (
      /* Real artwork arrives at wildly different aspect ratios (one of these is
         768x340). Constraining height alone let the wide ones dominate the row,
         so max-w caps them too and object-contain letterboxes rather than
         distorts. The px gives each logo its own breathing room instead of
         relying on the track gap alone. */
      // eslint-disable-next-line @next/next/no-img-element -- client-supplied logo asset
      <img
        src={client.src}
        /* Empty until `name` is the real company: captioning someone else's
           logo with a placeholder brand is worse than leaving it decorative.
           The section heading already states what the row is. */
        alt={client.nameConfirmed ? client.name : ""}
        loading="lazy"
        /* Full colour, no grayscale wash.

           The logo-wall convention of muting at rest assumes artwork with
           enough contrast to survive it. This set does not: two logos are white
           on transparent and vanish entirely, and grayscale flattened the rest
           into near-identical greys. Legibility of a real client's mark beats
           the texture effect. */
        className={cn(
          "h-12 w-auto max-w-40 shrink-0 object-contain px-6 transition-opacity duration-300 md:h-14 md:max-w-48",
          client.invert && "invert"
        )}
      />
    );
  }

  /*
    Logo-wall convention: muted at rest so the row reads as texture, resolving
    to full ink on hover. Mark plus wordmark on one baseline, no chip or border,
    so it behaves like real logo artwork rather than a row of buttons.
  */
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 px-7 text-ink-soft/70",
        "transition-colors duration-300 hover:text-ink"
      )}
      title={`${client.name} (placeholder logo)`}
    >
      <ClientLogoMark shape={client.shape} className="h-9 w-9 shrink-0" />
      <span className="font-display text-lg font-bold whitespace-nowrap uppercase">
        {client.name}
      </span>
    </div>
  );
}
