import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AllFire Services brand lockup, using the client's supplied artwork.
 *
 * Two variants ship because the source logo's wordmark is black:
 *   - logo-allfire.png       background removed, for light surfaces
 *   - logo-allfire-light.png wordmark flipped to white and letter counters
 *                            cleared, for the dark footer
 *
 * Intrinsic size is 794x322 (ratio ~2.466), declared so the browser reserves
 * space and the header does not shift while the image loads.
 */
const LOGO_W = 794;
const LOGO_H = 322;

export function Logo({
  className,
  tone = "ink",
  priority = false,
}: {
  className?: string;
  tone?: "ink" | "paper";
  priority?: boolean;
}) {
  const src = tone === "paper" ? "/images/brand/logo-allfire-light.png" : "/images/brand/logo-allfire.png";

  return (
    <Image
      src={src}
      alt="AllFire Services Sydney"
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      sizes="(max-width: 1024px) 160px, 200px"
      className={cn("h-12 w-auto lg:h-14", className)}
    />
  );
}
