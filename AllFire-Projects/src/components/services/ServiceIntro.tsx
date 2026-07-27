import type { Service } from "@/types/service";

/**
 * Service header block.
 *
 * Sits above the product grid, mirroring the reference: title, accreditation
 * badges, then the description.
 *
 * The badges are AllFire's real credentials (FPA Australia Bronze Member and
 * FPAS Recognised Business), not decoration. In this category the buyer's first
 * question is whether you are actually accredited, so putting them at the top
 * of the page answers it before the products are even scanned.
 */
export function ServiceIntro({ service }: { service: Service }) {
  return (
    <header>
      <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{service.name}</h2>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */}
        <img
          src="/images/brand/fpa-bronze-member.png"
          alt="Fire Protection Association Australia, Bronze Member"
          width={364}
          height={182}
          className="h-12 w-auto md:h-14"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */}
        <img
          src="/images/brand/fpas-accredited.webp"
          alt="Fire Protection Accreditation Scheme, Recognised Business"
          width={610}
          height={222}
          className="h-10 w-auto md:h-12"
        />
      </div>

      <p className="mt-7 max-w-[68ch] text-ink-soft">{service.summary}</p>

      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        {service.standardReference && (
          <div className="flex gap-2">
            <dt className="font-display font-bold tracking-[0.08em] text-ink-soft uppercase">
              Standard
            </dt>
            <dd className="font-semibold text-ink">{service.standardReference}</dd>
          </div>
        )}
        {service.frequency && (
          <div className="flex gap-2">
            <dt className="font-display font-bold tracking-[0.08em] text-ink-soft uppercase">
              Frequency
            </dt>
            <dd className="font-semibold text-ink">{service.frequency}</dd>
          </div>
        )}
      </dl>
    </header>
  );
}
