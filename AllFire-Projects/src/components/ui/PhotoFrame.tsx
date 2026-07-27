import { cn } from "@/lib/utils";
import { CameraIcon } from "@/components/ui/Icon";

/**
 * Art-directed photo slot.
 *
 * Real AllFire photography is not available yet, and generic stock imagery
 * reads as wrong (a desert or a sky in a fire-compliance section actively hurts
 * the brand). So this renders a designed industrial treatment instead: dark
 * base, brand wash, and a hazard-stripe motif. Drop a real photo in by passing
 * `src` and it takes over completely.
 */
export function PhotoFrame({
  src,
  alt,
  label,
  rounded = true,
  tint = "dark",
  className,
}: {
  src?: string;
  alt: string;
  label?: string;
  /** Set false when the frame is clipped by a parent that owns the radius. */
  rounded?: boolean;
  tint?: "dark" | "brand";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-ink",
        rounded && "rounded-2xl",
        className
      )}
    >
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised local asset */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Keep a light brand wash over real photos too, so stock imagery
              still sits inside the palette instead of fighting it. */}
          <span
            className={cn(
              "absolute inset-0",
              tint === "brand"
                ? "bg-linear-to-tr from-flame-red/55 via-flame-orange/25 to-transparent"
                : "bg-linear-to-t from-ink/70 via-ink/15 to-transparent"
            )}
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          {/* Hazard-stripe motif, the industrial texture behind everything */}
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 18px)",
            }}
            aria-hidden="true"
          />
          {/* Brand wash */}
          <div
            className={cn(
              "absolute inset-0",
              tint === "brand"
                ? "bg-linear-to-tr from-flame-red via-flame-orange/70 to-flame-yellow/40"
                : "bg-linear-to-tr from-ink via-ink/85 to-flame-red/45"
            )}
            aria-hidden="true"
          />
          {/* Radial glow, gives the panel depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 70% 25%, rgba(254,175,4,0.28), transparent 55%)",
            }}
            aria-hidden="true"
          />

          {/* Icon centred, label pinned top-left so overlapping frames in a
              collage do not cover it. */}
          <div className="absolute inset-0 flex items-center justify-center text-white/40">
            <CameraIcon className="h-10 w-10" />
          </div>
          <span className="absolute top-3 left-3 max-w-[85%] font-display text-[0.65rem] font-bold tracking-[0.14em] text-white/55 uppercase">
            {label ?? alt}
          </span>
        </>
      )}
    </div>
  );
}
