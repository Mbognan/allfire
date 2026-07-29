import { Container } from "@/components/ui/Container";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGridMotion } from "@/components/sections/ServicesGridMotion";
import { CheckIcon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import {
  serviceStatement,
  productsStatement,
  licensedWork,
  licenceClass,
} from "@/content/accreditation";

/**
 * The five services the client asked to lead with, in their order.
 *
 * Listed by slug rather than by array position, so reordering or adding a
 * service in the content file cannot silently change what the landing page
 * features. Everything else is still named below the grid, so nothing we offer
 * disappears from the page.
 */
const FEATURED_SLUGS = [
  "emergency-lighting-testing",
  "fire-extinguisher-tagging",
  "smoke-alarm-testing",
  "diesel-pump-inspection",
  "air-mechanical",
];

export function ServicesSection() {
  const featured = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );

  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-20 md:py-28"
    >
      <SectionBackdrop />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tone="light">Our services</Eyebrow>
            <SectionHeading
              className="mt-5"
              tone="light"
              lead="Everything your building needs"
              accent="to stay compliant"
            />
          </div>
          <p className="self-end text-white/70">{serviceStatement}</p>
        </div>

        <ServicesGridMotion services={featured} />

        {/* The remaining nine services are represented by this line rather than
            shown. ServiceTiles still exists and can be reinstated here; it was
            unhooked, not deleted.

            The count is derived, so it cannot drift out of date the way a
            hardcoded number would. */}
        <p className="mt-12 max-w-2xl text-lg text-white/70">
          These five are where most buildings start. We also service{" "}
          <span className="font-semibold text-flame-yellow">
            {services.length - FEATURED_SLUGS.length} more
          </span>{" "}
          areas of fire protection, from hydrants and sprinklers to passive fire, fire doors and
          annual statements.
        </p>

        {/* The grid only features five services, so send anyone who wants the
            full list to the services index rather than growing the grid. */}
        <div className="mt-10">
          <Button href="/services" variant="outline-light" withArrow>
            Explore more
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
