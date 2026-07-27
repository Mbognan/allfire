import { cn } from "@/lib/utils";

const sizes = {
  sm: { ring: "h-14 w-14", glyph: "h-5 w-5" },
  md: { ring: "h-16 w-16", glyph: "h-6 w-6" },
  lg: { ring: "h-20 w-20 md:h-24 md:w-24", glyph: "h-7 w-7 md:h-9 md:w-9" },
};

/**
 * The single play control used everywhere on the site (hero video, shorts
 * carousel, about card) so every one looks and behaves identically.
 *
 * The pulse rings are decorative and non-interactive; they sit behind the
 * button rather than on it, so the click target never changes size. Rings stop
 * under prefers-reduced-motion via the shared .assistant-ping rule.
 */
export function PlayButton({
  size = "md",
  pulse = true,
  className,
}: {
  size?: keyof typeof sizes;
  pulse?: boolean;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <span className={cn("relative flex items-center justify-center", className)}>
      {pulse && (
        <>
          <span
            className={cn(
              "assistant-ping pointer-events-none absolute rounded-full bg-flame-orange/40",
              s.ring
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "assistant-ping assistant-ping-delayed pointer-events-none absolute rounded-full bg-flame-orange/40",
              s.ring
            )}
            aria-hidden="true"
          />
        </>
      )}

      <span
        className={cn(
          "brand-gradient relative flex items-center justify-center rounded-full shadow-xl transition-transform duration-200 group-hover:scale-110",
          s.ring
        )}
      >
        <svg viewBox="0 0 24 24" className={cn("ml-1 text-white", s.glyph)} fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}
