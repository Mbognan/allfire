import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Button } from "@/components/ui/Button";

export function ServicesSection() {
  return (
    /* White, and no backdrop image.

       The section was bg-ink with a photographic SectionBackdrop behind it.
       Twelve cards, each already carrying its own photograph, sat on top of a
       thirteenth photograph: the grid was competing with its own background and
       every card needed a scrim to survive it. On white the artwork is the only
       imagery in the section and the cards need no defending. */
    /* paper-raised, not white.

       Our Story above and Landmark below are both light. At pure white all
       three read as one field with no seam, which is what made this section
       feel flat rather than clean. The warm step gives it edges and gives the
       white cards a ground to sit on instead of dissolving into. */
    <section id="services" className="relative isolate scroll-mt-20 bg-paper-raised py-20 md:py-28">
      {/* One ribbon, top right.

          A second mirrored ribbon was added at the top left to frame the
          section. Removed at the client's call: with the heading centred
          between them the pair closed the composition in rather than opening
          it, and two ribbons in one viewport made the motif read as pattern
          rather than as a mark.

          `isolate` on the section is required: BrandCorner sits at -z-10 and
          would otherwise fall behind the section's own background. */}
      <BrandCorner position="top-right" />

      <Container>
        {/* Heading only.

            The regulatory service statement that sat beside it is gone: sixty
            words about the Environmental Planning and Assessment Regulations,
            in the highest-attention slot on the section, before the reader had
            been told what is sold. It still reads on the About page, where
            someone has already decided to care.

            The "these five are where most buildings start" line is gone too.
            The grid now shows the range rather than summarising it. */}
        {/* Centred. The grid below is a symmetrical twelve-cell block, so a
            left-aligned header sat off-axis against it. */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our services</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Everything your building needs"
            accent="to stay compliant"
          />
        </div>

        <ServicesGrid />

        {/* Centred with the header, so the section reads on one axis. */}
        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="outline" withArrow>
            View all services
          </Button>
        </div>

        {/* The licensed classes of work block was removed at the client's
            request. It listed nine Class C licence classes with the products
            statement beside them.

            The data is untouched in content/accreditation.ts and still reads
            elsewhere, so reinstating it is an import and a block, not a
            retype. */}
      </Container>
    </section>
  );
}
