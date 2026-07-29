import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { getServiceImage } from "@/content/services/images";
import {
  ExtinguisherIcon,
  EmergencyExitIcon,
  FirePanelIcon,
  HydrantIcon,
  AirHandlingIcon,
  ComplianceIcon,
} from "@/components/ui/EquipmentIcons";

/**
 * Icon per service, for the badge.
 *
 * Keyed by slug so a service without an entry still renders, falling back to
 * the compliance clipboard rather than throwing or leaving a gap.
 */
const ICONS: Record<string, typeof ExtinguisherIcon> = {
  "emergency-lighting-testing": EmergencyExitIcon,
  "fire-extinguisher-tagging": ExtinguisherIcon,
  "smoke-alarm-testing": FirePanelIcon,
  "diesel-pump-inspection": HydrantIcon,
  "air-mechanical": AirHandlingIcon,
};

/**
 * Service card, landing page.
 *
 * White panel on the dark section: photograph on top, a gradient icon badge
 * straddling the seam, then a small category label and the service name.
 *
 * The badge overlapping the image edge is what stops the card reading as two
 * stacked rectangles, and it is the only element crossing that boundary, so it
 * carries the join on its own.
 *
 * Brand gradient rather than the flat blue of the reference: the badge is the
 * one saturated element per card, and it should be the site's own colour.
 */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.slug] ?? ComplianceIcon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-orange"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-ink-2">
        <Image
          src={getServiceImage(service.slug)}
          alt=""
          fill
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 30vw"
          aria-hidden="true"
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Badge. Pulled up by half its height so it sits on the seam between
          photograph and panel. */}
      <div className="relative px-6 pb-7">
        <span className="brand-gradient absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 motion-safe:group-hover:scale-110">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>

        <p className="mt-10 font-display text-xs font-bold tracking-[0.18em] text-flame-red-deep uppercase">
          Services
        </p>
        <h3 className="mt-2 font-display text-xl leading-tight font-bold text-balance text-ink transition-colors duration-200 group-hover:text-flame-red-deep">
          {service.name}
        </h3>
      </div>
    </Link>
  );
}
