import type { ClientMarkShape } from "@/content/clients";

/**
 * Generated stand-in brand marks for the client ticker.
 *
 * These are deliberately NOT icon-library glyphs. A logo wall built from a
 * shared icon set reads as a row of icons, not as eight different companies, so
 * each mark is its own simple geometric construction. They are also deliberately
 * abstract: no real firm's logo is reproduced or approximated.
 *
 * All are drawn on a 32x32 grid with a 2.2 stroke so they sit on one baseline
 * and share an optical weight, the way a real logo wall does.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const shapes: Record<ClientMarkShape, React.ReactNode> = {
  ring: (
    <>
      <circle cx="16" cy="16" r="10" {...stroke} />
      <circle cx="16" cy="16" r="3.4" fill="currentColor" stroke="none" />
    </>
  ),
  tower: (
    <>
      <path d="M10 27V11l6-4 6 4v16" {...stroke} />
      <path d="M13.5 27v-6h5v6" {...stroke} />
    </>
  ),
  chevron: (
    <>
      <path d="M7 12.5 16 6l9 6.5" {...stroke} />
      <path d="M7 21.5 16 15l9 6.5" {...stroke} />
    </>
  ),
  quad: (
    <>
      <rect x="6" y="6" width="9" height="9" rx="1.2" {...stroke} />
      <rect x="17" y="17" width="9" height="9" rx="1.2" {...stroke} />
      <rect x="17" y="6" width="9" height="9" rx="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  arc: (
    <>
      <path d="M5 22a11 11 0 0 1 22 0" {...stroke} />
      <path d="M11 22a5 5 0 0 1 10 0" {...stroke} />
    </>
  ),
  shield: (
    <>
      <path d="M16 5.5 25 9v7.5c0 5-3.8 8.6-9 10.2-5.2-1.6-9-5.2-9-10.2V9l9-3.5Z" {...stroke} />
    </>
  ),
  peak: (
    <>
      <path d="M5 25 13 9l5 9 3-4.5 6 11.5Z" {...stroke} />
    </>
  ),
  bars: (
    <>
      <path d="M8 26V14M16 26V6M24 26v-8" {...stroke} />
    </>
  ),
};

export function ClientLogoMark({
  shape,
  className,
}: {
  shape: ClientMarkShape;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {shapes[shape]}
    </svg>
  );
}
