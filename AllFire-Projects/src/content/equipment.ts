import {
  ExtinguisherIcon,
  HoseReelIcon,
  HydrantIcon,
  EmergencyExitIcon,
  FirePanelIcon,
  ComplianceIcon,
} from "@/components/ui/EquipmentIcons";

/** Equipment categories AllFire services, mirroring the FPA capability strip. */
export const equipment = [
  { label: "Fire Extinguishers", Icon: ExtinguisherIcon },
  { label: "Fire Hoses & Reels", Icon: HoseReelIcon },
  { label: "Fire Hydrants & Boosters", Icon: HydrantIcon },
  { label: "Emergency Equipment", Icon: EmergencyExitIcon },
  { label: "Fire Panels", Icon: FirePanelIcon },
  { label: "Testing & Compliance", Icon: ComplianceIcon },
];
