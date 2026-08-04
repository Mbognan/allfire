import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/ui/Icon";

/**
 * Minimalist button.
 *
 * Flat single-colour fills and hairline borders. Hover lifts the button
 * slightly and a click presses it in, so the control feels physical rather than
 * inert. Both are transform-only, so they composite on the GPU and cost no
 * layout work, and both are gated behind motion-safe.
 *
 * Corner radius is 50px per the shape system in globals.css: at min-h-12 (48px)
 * that reads as a full pill, and it stays a pill as buttons grow taller.
 *
 * min-h-12 (48px) clears the 44px minimum touch target with room to spare.
 *
 * Colour choices are contrast-checked, not eyeballed:
 *   white on flame-red-deep  4.94:1
 *   white on ink            18.52:1
 *   ink on white            18.52:1
 * flame-orange is deliberately never used for text or as a white-text fill,
 * because it only reaches 3.26:1.
 */
const base =
  [
    /* Named group, not a bare `group`: these buttons sit inside cards and rows
       that are themselves groups, and an unnamed one would make the arrow react
       to hovering the whole card. */
    "group/btn inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[50px]",
    "px-6 py-3 text-[0.9375rem] font-bold tracking-[0.06em] whitespace-nowrap uppercase",
    // Only the properties that actually change, so nothing else gets animated.
    "transition-[color,background-color,border-color,transform] duration-200 ease-out",
    // Lift on hover, press in on click. motion-safe: means both vanish for
    // anyone with reduced motion enabled, without a separate media query.
    "motion-safe:hover:scale-[1.035] motion-safe:active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
  ].join(" ");

const variants = {
  /* The brand gradient, in its button-safe form. Was a flat flame-red-deep
     fill; the highlight is now the theme gradient itself. Hover deepens to ink
     rather than lightening, so the pressed-in feel still reads. */
  primary: "brand-gradient-fill text-white hover:bg-ink hover:bg-none",
  ink: "bg-ink text-white hover:bg-flame-red-deep",
  /* Hover fills with the same gradient rather than flat ink, so the secondary
     button resolves into the brand instead of into black. */
  outline:
    "border border-ink/30 text-ink hover:border-transparent hover:brand-gradient-fill hover:text-white",
  "outline-light":
    "border border-white/40 text-white hover:border-transparent hover:brand-gradient-fill hover:text-white",
  ghost: "px-0 text-flame-red-deep hover:text-ink",
};

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  /** Needed when the visible label collapses to an icon at small widths. */
  "aria-label"?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, withArrow = false } = props;
  const classes = cn(base, variants[variant], className);

  const inner = (
    <>
      {children}
      {/* The arrow travels on hover, so the button reads as going somewhere
          rather than merely being decorated with a chevron. Transform only, and
          motion-safe, so it costs nothing and disappears under reduced motion
          like the button's own lift. */}
      {withArrow && (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out motion-safe:group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  // Strip the presentational props so only real button attributes reach the DOM.
  const buttonProps = { ...(props as ButtonAsButton) };
  delete buttonProps.variant;
  delete buttonProps.withArrow;
  delete buttonProps.className;
  delete (buttonProps as { children?: unknown }).children;

  return (
    <button {...buttonProps} className={classes}>
      {inner}
    </button>
  );
}
