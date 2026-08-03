import {
  ExtinguisherIcon,
  EmergencyExitIcon,
  FirePanelIcon,
  HydrantIcon,
  AirHandlingIcon,
  SmokeAlarmIcon,
  FlowTestIcon,
  PenetrationIcon,
  FireDoorIcon,
  SitePlanIcon,
} from "@/components/ui/EquipmentIcons";

/**
 * The landing page services grid, in the client's stated order.
 *
 * A presentation list, deliberately separate from the catalogue in
 * `services/index.ts`. The catalogue keeps all fifteen services, their pages,
 * URLs and nav entries; this decides only what the landing page leads with and
 * in what sequence. Reordering one cannot disturb the other.
 *
 * `standard` appears on two cards only, per the client's list: the two entries
 * they wrote a standard against. The rest carry none rather than having numbers
 * added that were not asked for.
 *
 * `image` is omitted where no photograph of that work exists yet. The grid
 * renders a branded placeholder for those rather than borrowing a photo of
 * different work, which on a compliance site would be a small lie.
 *
 * Slots 11 and 12 are held at the client's request so the grid divides evenly.
 * They are `null` rather than invented services.
 */
export type ServiceCard = {
  label: string;
  /** Australian Standard. Shown only where the client specified one. */
  standard?: string;
  /** Omit when no photograph of this work exists; the grid handles the gap. */
  image?: string;
  href: string;
  Icon: typeof ExtinguisherIcon;
};

export const serviceCards: (ServiceCard | null)[] = [
  {
    label: "Fire Panels & Smoke Detection",
    /* Client's list said "AS 1070.1", which is not a fire standard. Detection
       and alarm systems are AS 1670.1, the number already used elsewhere in
       this repo. Corrected deliberately. */
    standard: "AS 1670.1",
    image: "/images/stock/riser-room.webp",
    href: "/services/fire-panels-detection",
    Icon: FirePanelIcon,
  },
  {
    label: "Smoke Alarms",
    standard: "AS 3786",
    image: "/images/services-img/smoke-alarm-testing.png",
    href: "/services/smoke-alarm-testing",
    Icon: SmokeAlarmIcon,
  },
  {
    label: "Extinguishers, Signage & Blankets",
    image: "/images/services-img/fire-extinguisher-tagging.png",
    href: "/services/fire-extinguisher-tagging",
    Icon: ExtinguisherIcon,
  },
  {
    label: "Emergency & Exit Lighting",
    image: "/images/services-img/emergency-lighting-testing.png",
    href: "/services/emergency-lighting-testing",
    Icon: EmergencyExitIcon,
  },
  {
    label: "Diesel Fire Pumps",
    image: "/images/services-img/diesel-pump-inspection.png",
    href: "/services/diesel-pump-inspection",
    Icon: HydrantIcon,
  },
  {
    label: "Air & Mechanical Services",
    image: "/images/services-img/air-mechanical.png",
    href: "/services/air-mechanical",
    Icon: AirHandlingIcon,
  },
  {
    label: "Flow Testing",
    image: "/images/stock/hydrant.webp",
    /* No standalone flow-testing page exists. Hydrant flow and pressure testing
       is the closest catalogue entry; sprinkler flow lives under Sprinkler
       Systems. Repoint if flow testing becomes its own service. */
    href: "/services/fire-hydrant-systems",
    Icon: FlowTestIcon,
  },
  {
    label: "Service Penetrations & Fire Dampers",
    href: "/services/fire-penetration-sealing",
    Icon: PenetrationIcon,
  },
  {
    label: "Fire Doors",
    href: "/services/fire-doors-frames",
    Icon: FireDoorIcon,
  },
  {
    label: "Zone Block, Evacuation & Hydrant Plans",
    /* No catalogue page covers plans and diagrams, so this goes to the booking
       form rather than somewhere it does not belong. Add a service entry and
       repoint when the client confirms scope. */
    href: "/#booking",
    Icon: SitePlanIcon,
  },
  null,
  null,
];
