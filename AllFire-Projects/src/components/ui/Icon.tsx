/**
 * Icon layer.
 *
 * Backed by Phosphor (@phosphor-icons/react), one family for the whole project.
 * Imported from the `/ssr` entrypoint so these render inside Server Components
 * without forcing a "use client" boundary on every consumer.
 *
 * The named re-exports below keep the call sites stable and let us pin one
 * weight globally, so the icon set reads as a single family rather than a
 * grab-bag of stroke widths.
 */
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  Camera,
  CaretDown,
  Check,
  Clock,
  EnvelopeSimple,
  Fire,
  List,
  MagnifyingGlass,
  MapPin,
  Phone,
  Rows,
  ShieldCheck,
  SquaresFour,
  Star,
  Tag,
  Users,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps, IconWeight } from "@phosphor-icons/react";

/** Line icons all share this weight. Fill is reserved for rating glyphs. */
const WEIGHT: IconWeight = "regular";

type Props = Omit<IconProps, "weight">;

export const FlameIcon = (p: Props) => <Fire weight={WEIGHT} {...p} />;
export const ShieldCheckIcon = (p: Props) => <ShieldCheck weight={WEIGHT} {...p} />;
export const PhoneIcon = (p: Props) => <Phone weight={WEIGHT} {...p} />;
export const MailIcon = (p: Props) => <EnvelopeSimple weight={WEIGHT} {...p} />;
export const MapPinIcon = (p: Props) => <MapPin weight={WEIGHT} {...p} />;
/** Solid teardrop marker, for map pins where an outline reads as noise. */
export const MapPinFillIcon = (p: Props) => <MapPin weight="fill" {...p} />;
export const ClockIcon = (p: Props) => <Clock weight={WEIGHT} {...p} />;
export const MenuIcon = (p: Props) => <List weight={WEIGHT} {...p} />;
export const XIcon = (p: Props) => <X weight={WEIGHT} {...p} />;
export const ChevronDownIcon = (p: Props) => <CaretDown weight={WEIGHT} {...p} />;
export const ArrowRightIcon = (p: Props) => <ArrowRight weight={WEIGHT} {...p} />;
export const ArrowLeftIcon = (p: Props) => <ArrowLeft weight={WEIGHT} {...p} />;
export const TagIcon = (p: Props) => <Tag weight={WEIGHT} {...p} />;
export const SearchIcon = (p: Props) => <MagnifyingGlass weight={WEIGHT} {...p} />;

/* View-toggle glyphs. Filled, so the active state reads clearly when the
   button background flips to brand red. */
export const ListIcon = (p: Props) => <Rows weight="fill" {...p} />;
export const GridIcon = (p: Props) => <SquaresFour weight="fill" {...p} />;
export const CheckIcon = (p: Props) => <Check weight="bold" {...p} />;
export const UsersIcon = (p: Props) => <Users weight={WEIGHT} {...p} />;
export const CameraIcon = (p: Props) => <Camera weight={WEIGHT} {...p} />;
export const BuildingIcon = (p: Props) => <Buildings weight={WEIGHT} {...p} />;

/** Filled, because a half-empty outline star reads as an unrated state. */
export const StarIcon = (p: Props) => <Star weight="fill" {...p} />;
