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
    <section id="services" className="relative isolate scroll-mt-20 bg-white py-20 md:py-28">
      {/* Two ribbons, one at each top corner, framing the section rather than
          decorating one edge of it.

          A single corner ribbon reads as a flourish on an otherwise plain
          field. A matched pair reads as a gate: the eye is funnelled down the
          centre channel between them, which is exactly where the heading and
          the grid sit now they are centred. The motif is the site's own, so
          this is the same brand turned up rather than a new device.

          The left one is scaled slightly smaller and set lower. Two identical
          ribbons would read as a mirrored wallpaper tile; a deliberate
          imbalance keeps it looking drawn rather than repeated.

          `isolate` on the section is required: BrandCorner sits at -z-10 and
          would otherwise fall behind the section's own background. */}
      <BrandCorner position="top-right" />
      <BrandCorner position="top-left" className="h-48 w-104 opacity-70 md:h-56" />

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
