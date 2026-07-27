import { cn } from "@/lib/utils";

/** Small dotted label above a section heading, per the reference's language. */
export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-sm font-bold tracking-[0.18em] uppercase",
        tone === "light" ? "text-white/85" : "text-ink",
        className
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 bg-flame-orange" aria-hidden="true" />
      {children}
    </span>
  );
}
