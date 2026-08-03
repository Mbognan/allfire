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
  Alarm,
  Pipe,
  ClipboardText,
  Door,
  Drop,
  Fan,
  FireExtinguisher,
  Gauge,
  Lightbulb,
  MapTrifold,
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
/** Mechanical smoke control: exhaust fans, dampers, stair pressurisation. */
export const AirHandlingIcon = (p: Props) => <Fan weight={WEIGHT} {...p} />;

/* Landing-grid additions. Same family, same weight, same reasoning as above:
   nearest real glyph in the set rather than a hand-drawn one. */

/** Smoke alarms, as distinct from the panel that receives them. */
export const SmokeAlarmIcon = (p: Props) => <Alarm weight={WEIGHT} {...p} />;
/** Flow and pressure testing. Water, measured. */
export const FlowTestIcon = (p: Props) => <Drop weight={WEIGHT} {...p} />;
/** Penetrations and dampers: holes made good through rated construction. */
export const PenetrationIcon = (p: Props) => <Pipe weight={WEIGHT} {...p} />;
export const FireDoorIcon = (p: Props) => <Door weight={WEIGHT} {...p} />;
/** Zone block, evacuation and hydrant plans. */
export const SitePlanIcon = (p: Props) => <MapTrifold weight={WEIGHT} {...p} />;
