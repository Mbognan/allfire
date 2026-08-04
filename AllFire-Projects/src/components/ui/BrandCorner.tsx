import { cn } from "@/lib/utils";

/**
 * The swooping ribbon from the AllFire letterhead, rebuilt as SVG.
 *
 * Two nested curves (red over yellow) sweeping out of a corner, plus the faint
 * wave lines that run behind them. Purely decorative and pointer-events-none,
 * so it never interferes with content or selection.
 *
 * Sits behind content via -z-10, so any section using it needs `isolate` and
 * its own `relative`.
 */
export function BrandCorner({
  position = "top-right",
  className,
}: {
  position?: "top-right" | "bottom-left";
  className?: string;
}) {
  const flip = position === "bottom-left";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-64 w-152 max-w-[85%] overflow-hidden md:h-80",
        flip ? "bottom-0 left-0 rotate-180" : "top-0 right-0",
        className
      )}
    >
      <svg
        viewBox="0 0 600 320"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id="allfire-swoosh-a" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#feaf04" />
            <stop offset="100%" stopColor="#fb5614" />
          </linearGradient>
          <linearGradient id="allfire-swoosh-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb5614" />
            <stop offset="100%" stopColor="#fc0403" />
          </linearGradient>
        </defs>

        {/* Faint wave lines, echoing the letterhead's line texture */}
        <g stroke="#16130f" strokeOpacity="0.05" fill="none" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M-40 ${168 + i * 9} C 140 ${96 + i * 9}, 300 ${232 + i * 9}, 640 ${104 + i * 9}`}
            />
          ))}
        </g>

        {/*
          Ribbons.

          Both tapers used to run to a mathematical point where the curve met
          the top edge, and a zero-width tip renders as a hairline splinter that
          reads as a rendering artefact rather than as ink. Each path now ends on
          a short arc, so the ribbon closes with a rounded nose. strokeLinejoin
          rounds the remaining corner where the taper meets the edge.
        */}
        {/* Outer (yellow to orange) ribbon */}
        <path
          d="M600 -10 L600 190 C 470 150, 430 60, 286 6 C 268 -1, 258 -8, 250 -10 Z"
          fill="url(#allfire-swoosh-a)"
          stroke="url(#allfire-swoosh-a)"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        {/* Inner (orange to red) ribbon, offset so both edges read */}
        <path
          d="M600 -10 L600 120 C 500 92, 452 40, 384 4 C 370 -2, 362 -8, 356 -10 Z"
          fill="url(#allfire-swoosh-b)"
          stroke="url(#allfire-swoosh-b)"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
