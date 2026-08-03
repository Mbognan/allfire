import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CheckIcon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { productsStatement, licensedWork, licenceClass } from "@/content/accreditation";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop />

      <Container className="relative">
        {/* Heading only.

            The regulatory service statement that sat beside it is gone: sixty
            words about the Environmental Planning and Assessment Regulations,
            in the highest-attention slot on the section, before the reader had
            been told what is sold. It still reads on the About page, where
            someone has already decided to care.

            The "these five are where most buildings start" line is gone too.
            The grid now shows the range rather than summarising it. */}
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our services</Eyebrow>
          <SectionHeading
            className="mt-5"
            tone="light"
            lead="Everything your building needs"
            accent="to stay compliant"
          />
        </div>

        <ServicesGrid />

        <div className="mt-12">
          <Button href="/services" variant="outline-light" withArrow>
            View all services
          </Button>
        </div>

        {/* Licensed classes of work. This is hard credential detail, so it is
            set as a dense two-column list rather than more cards. */}
        <div className="mt-16 border-t border-white/15 pt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h3 className="font-display text-2xl font-bold text-white uppercase md:text-3xl">
                And so much more
              </h3>
              <p className="mt-4 text-white/70">
                {productsStatement} As an FPA Australia member we hold Class {licenceClass}{" "}
                licences across the following classes of work.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
              {licensedWork.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-white/10 py-2.5 text-sm text-white/80"
                >
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-flame-yellow" />
                  <span>
                    {item}{" "}
                    <span className="font-semibold text-flame-yellow">({licenceClass})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
