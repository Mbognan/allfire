import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  ink: "from-ink via-ink-soft to-ink",
  flame: "from-flame-yellow via-flame-orange to-flame-red",
  paper: "from-paper-raised via-paper to-paper-raised",
};

/**
 * Stand-in for real photography (team, trucks, buildings) until the client
 * supplies a shoot. Swap for <Image> once assets land in /public/images.
 */
export function PhotoPlaceholder({
  label,
  tone = "ink",
  icon,
  className,
}: {
  label?: string;
  tone?: keyof typeof tones;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br",
        tones[tone],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 14px)",
        }}
        aria-hidden="true"
      />
      {icon && (
        <div className={cn("relative opacity-30", tone === "paper" ? "text-ink" : "text-ink/70")}>
          {icon}
        </div>
      )}
      {label && (
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide uppercase",
            tone === "paper" ? "bg-ink/10 text-ink-soft" : "bg-ink/20 text-ink"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
