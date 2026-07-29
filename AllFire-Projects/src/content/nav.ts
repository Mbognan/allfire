import { services, serviceCategories, getServicesByCategory } from "@/content/services";

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
  { label: "Our Team", href: "/team" },
  { label: "Blogs", href: "/blog" },
];

/**
 * Column layout for the services dropdown.
 *
 * `primaryNav` keeps a flat `children` list because the mobile drawer wants one
 * accordion of every service. The desktop menu wants columns: at thirteen
 * services a single column is taller than the viewport and turns a menu into a
 * scroll, so the same data is grouped here by category instead.
 *
 * shortName rather than name, because these are column entries, not headings,
 * and "Air & Mechanical" scans faster than "Air & Mechanical Services".
 */
export const serviceMenuGroups = serviceCategories.map((category) => ({
  id: category.id,
  label: category.label,
  items: getServicesByCategory(category.id).map((service) => ({
    label: service.shortName,
    href: `/services/${service.slug}`,
  })),
}));

/**
 * Footer navigation. Booking and Contact were removed from the header menu, so
 * the footer keeps them reachable rather than leaving those destinations with
 * no site-wide link at all.
 */
export const footerNav: NavChild[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Blogs", href: "/blog" },
  { label: "Booking", href: "/#booking" },
  { label: "Contact", href: "/#contact" },
];
