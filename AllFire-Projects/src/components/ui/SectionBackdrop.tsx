/**
 * Dark industrial backdrop for full-bleed sections.
 *
 * Now carries a real fire-protection photograph (extinguishers along a building
 * walkway) instead of only the drawn hazard texture. It sits at low opacity
 * under the brand wash, so it reads as depth and material rather than as a
 * picture competing with the copy on top of it. The radial brand glow stays,
 * because it is what keeps the five sections that use this feeling like one
 * system. The diagonal hazard stripes are gone: over a real photograph they
 * read as a screen-door artefact rather than as texture.
 *
 * Contrast is unaffected: the photo never rises above 0.22 opacity over a solid
 * ink base, so white body copy keeps the same ratio it had against flat ink.
 *
 * Pass `photo={false}` for sections that already carry their own imagery.
 */
export function SectionBackdrop({
  intensity = "strong",
  photo = true,
}: {
  intensity?: "strong" | "soft";
  photo?: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-ink" aria-hidden="true" />

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative pre-optimised backdrop
        <img
          src="/images/stock/backdrop-extinguishers.webp"
          srcSet="/images/stock/backdrop-extinguishers-sm.webp 1100w, /images/stock/backdrop-extinguishers.webp 1920w"
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            intensity === "strong"
              ? "radial-gradient(ellipse at 85% 15%, rgba(252,4,3,0.42), transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(254,175,4,0.16), transparent 50%)"
              : "radial-gradient(ellipse at 80% 20%, rgba(252,4,3,0.22), transparent 55%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
