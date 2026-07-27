import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "flame",
}: {
  children: ReactNode;
  className?: string;
  tone?: "flame" | "red" | "ink";
}) {
  const tones = {
    flame: "border-flame-orange/30 bg-flame-yellow/15 text-ink",
    red: "border-flame-red/25 bg-flame-red/8 text-flame-red-deep",
    ink: "border-ink/20 bg-ink/5 text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
