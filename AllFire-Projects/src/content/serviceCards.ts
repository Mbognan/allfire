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
 * This is a presentation list, deliberately separate from the catalogue in
 * `services/index.ts`. The catalogue keeps all fifteen services, their pages,
 * URLs and nav entries; this decides only what the landing page leads with and
 * in what sequence. Reordering the catalogue cannot disturb this, and vice
 * versa.
 *
 * `standard` is shown on the card because it is the fastest way for a strata or
 * facility manager to match a card to a line on their fire safety schedule.
 *
 * `href` points at the catalogue page that covers the work. Two entries are
 * approximate and flagged inline.
 *
 * Slots 11 and 12 are held at the client's request so the grid divides evenly.
 * They are `null` rather than fabricated services: an invented card would be a
 * claim, and a held slot is honest about being unfinished.
 */
export type ServiceCard = {
  label: string;
  /** Australian Standard, where the work is governed by one. */
  standard?: string;
  href: string;
  Icon: typeof ExtinguisherIcon;
};

export const serviceCards: (ServiceCard | null)[] = [
  {
    label: "Fire Panels & Smoke Detection",
    /* Client's brief said "AS 1070.1", which is not a fire standard. Detection
       and alarm systems are AS 1670.1, the number already used elsewhere in
       this repo. Corrected deliberately. */
    standard: "AS 1670.1",
    href: "/services/fire-panels-detection",
    Icon: FirePanelIcon,
  },
  {
    label: "Smoke Alarms",
    standard: "AS 3786",
    href: "/services/smoke-alarm-testing",
    Icon: SmokeAlarmIcon,
  },
  {
    label: "Extinguishers, Signage & Blankets",
    standard: "AS 1851",
    href: "/services/fire-extinguisher-tagging",
    Icon: ExtinguisherIcon,
  },
  {
    label: "Emergency & Exit Lighting",
    standard: "AS 2293",
    href: "/services/emergency-lighting-testing",
    Icon: EmergencyExitIcon,
  },
  {
    label: "Diesel Fire Pumps",
    standard: "AS 1851",
    href: "/services/diesel-pump-inspection",
    Icon: HydrantIcon,
  },
  {
    label: "Air & Mechanical Services",
    standard: "AS 1668.1",
    href: "/services/air-mechanical",
    Icon: AirHandlingIcon,
  },
  {
    label: "Flow Testing",
    standard: "AS 1851",
    /* No standalone flow-testing page exists. Hydrant flow and pressure testing
       is the closest catalogue entry; sprinkler flow lives under Sprinkler
       Systems. Repoint if flow testing becomes its own service. */
    href: "/services/fire-hydrant-systems",
    Icon: FlowTestIcon,
  },
  {
    label: "Service Penetrations & Fire Dampers",
    standard: "AS 4072.1",
    href: "/services/fire-penetration-sealing",
    Icon: PenetrationIcon,
  },
  {
    label: "Fire Doors",
    standard: "AS 1905.1",
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
