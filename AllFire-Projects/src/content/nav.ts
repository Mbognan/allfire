import { services } from "@/content/services";

/**
 * Anchors are absolute ("/#booking", not "#booking") so the nav still works
 * from interior pages like /services/... rather than silently doing nothing.
 */
export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  {
    label: "Our Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Blogs", href: "/blog" },
];

/**
 * Footer navigation. Booking and Contact were removed from the header menu, so
 * the footer keeps them reachable rather than leaving those destinations with
 * no site-wide link at all.
 */
export const footerNav: NavChild[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Booking", href: "/#booking" },
  { label: "Contact", href: "/#contact" },
];
