/**
 * Fire-equipment category icons.
 *
 * Phosphor has no literal hose-reel, booster or fire-indicator-panel glyph, so
 * each category maps to the closest real icon in the set rather than a
 * hand-drawn one: water drop for hose reels, pressure gauge for hydrant
 * boosters, siren for indicator panels. Every icon still comes from the same
 * family as the rest of the site, which matters more than a literal match.
 *
 * Swap for the client's official FPA artwork if they can supply individual files.
 */
import {
  ClipboardText,
  Drop,
  FireExtinguisher,
  Gauge,
  Lightbulb,
  Siren,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps, IconWeight } from "@phosphor-icons/react";

const WEIGHT: IconWeight = "regular";

type Props = Omit<IconProps, "weight">;

export const ExtinguisherIcon = (p: Props) => <FireExtinguisher weight={WEIGHT} {...p} />;
export const HoseReelIcon = (p: Props) => <Drop weight={WEIGHT} {...p} />;
export const HydrantIcon = (p: Props) => <Gauge weight={WEIGHT} {...p} />;
export const EmergencyExitIcon = (p: Props) => <Lightbulb weight={WEIGHT} {...p} />;
export const FirePanelIcon = (p: Props) => <Siren weight={WEIGHT} {...p} />;
export const ComplianceIcon = (p: Props) => <ClipboardText weight={WEIGHT} {...p} />;
