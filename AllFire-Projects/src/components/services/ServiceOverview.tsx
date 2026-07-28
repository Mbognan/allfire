import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icon";
import { getServiceImage } from "@/content/services/images";
import { company } from "@/content/company";
import type { Service } from "@/types/service";

/**
 * Service page for services with no product catalogue.
 *
 * The catalogue layout assumes there is a range to browse: it opens with a
 * result count and a sort control, then a grid. For a service that sells labour
 * and a signed document rather than hardware, that page renders "Showing all 0
 * results" above an empty grid, which reads as a broken page rather than as a
 * service without products.
 *
 * So this is the editorial alternative: photograph beside prose, an explicit
 * list of what the service covers, and the two ways to act on it. Same content
 * model, no invented product data.
 */
export function ServiceOverview({ service }: { service: Service }) {
  const image = getServiceImage(service.slug);

  return (
    <>
      <section className="bg-paper py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Photograph. Fixed aspect so the row does not reflow while it
                loads, and sticky on desktop so it stays with the prose on the
                services that run long. */}
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:aspect-square">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-ink uppercase md:text-4xl">
                Professional {service.name}
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{service.summary}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{service.whyFirefighterRun}</p>

              {/* Standard and frequency. These are the two questions every
                  compliance enquiry opens with, so they sit above the fold of
                  the column rather than in a spec table further down. */}
              {(service.standardReference || service.frequency) && (
                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5">
                  {service.standardReference && (
                    <div>
                      <dt className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                        Standard
                      </dt>
                      <dd className="mt-1 font-display text-lg font-bold text-ink">
                        {service.standardReference}
                      </dd>
                    </div>
                  )}
                  {service.frequency && (
                    <div>
                      <dt className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">
                        Frequency
                      </dt>
                      <dd className="mt-1 font-display text-lg font-bold text-ink">
                        {service.frequency}
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              <h3 className="mt-10 font-display text-2xl font-bold text-ink uppercase">
                What this service covers
              </h3>
              <ul className="mt-5 space-y-3">
                {service.whatItCovers.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-ink-soft">
                    <CheckIcon className="mt-1.5 h-3.5 w-3.5 shrink-0 text-flame-red-deep" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-2xl font-bold text-ink uppercase">
                Who it&rsquo;s for
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{service.whoItsFor}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/#booking" withArrow>
                  Request an inspection
                </Button>
                <Button href={company.phoneHref} variant="outline">
                  {company.phone}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {service.faqs.length > 0 && (
        <section className="bg-white py-14 md:py-20">
          <Container className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-ink uppercase md:text-3xl">
              Common questions
            </h2>

            <dl className="mt-8 divide-y divide-line border-y border-line">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <dt className="font-display text-lg font-bold text-ink">{faq.q}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-soft">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}
    </>
  );
}
