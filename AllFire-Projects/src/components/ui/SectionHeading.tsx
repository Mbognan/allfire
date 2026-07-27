import { cn } from "@/lib/utils";

/**
 * Two-tone heading from the reference: a plain line followed by a
 * brand-gradient line. `lead` renders in ink (or white), `accent` in gradient.
 */
export function SectionHeading({
  lead,
  accent,
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  lead: string;
  accent?: string;
  tone?: "ink" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-display font-bold uppercase",
        Tag === "h1"
          ? "text-[2.75rem] sm:text-6xl lg:text-7xl"
          : "text-[2rem] sm:text-4xl lg:text-5xl",
        tone === "light" ? "text-white" : "text-ink",
        className
      )}
    >
      {lead}
      {accent && (
        <>
          {" "}
          <span className="brand-gradient-text">{accent}</span>
        </>
      )}
    </Tag>
  );
}
