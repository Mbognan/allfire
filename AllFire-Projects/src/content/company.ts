export const company = {
  name: "AllFire Services",
  legalName: "All Fire Services Australia",
  tagline: "Fire Protection Runs In Our Blood",
  /**
   * UNRESOLVED: the client's own "Generation of Tricklebank" graphic lists the
   * Managing Director (2020-current) as Peter Tricklebank, while their page copy
   * credits the 2009 founding to "Peter". Both appear on the same supplied
   * page. Confirm which is correct before launch, then update this one field:
   * it feeds the About page, the story section and the JSON-LD.
   */
  founder: "Peter Tricklebank",
  /** Current role. Distinct from founderTitle, which is his fire service background. */
  founderRole: "Managing Director",
  founderTitle: "former NSW Fire Brigades Senior Officer",
  yearsExperience: "38+",
  foundingYear: 2009,
  legacyYear: 1911,
  phone: "1300 765 594",
  phoneHref: "tel:1300765594",
  /**
   * The 1300 line, not a mobile.
   *
   * Peter's personal mobile was removed from the site at his request. Every
   * emergency CTA now routes to the same 1300 number as everything else, so
   * there is a single published contact point.
   */
  emergencyPhone: "1300 765 594",
  emergencyPhoneHref: "tel:1300765594",
  /*
   * WhatsApp click-to-chat was here. Removed with the mobile it depended on:
   * wa.me requires a real mobile in the URL, so keeping it would have shipped
   * 0484 648 400 in the page source regardless of the label shown.
   *
   * Deleted rather than left unused, because an unused property on this object
   * still ends up in the client bundle. To reinstate, add a mobile the client is
   * happy to publish.
   */
  email: "admin@allfireservices.com.au",
  address: {
    street: "330 Wattle Street",
    suburb: "Ultimo",
    state: "NSW",
    postcode: "2007",
    country: "Australia",
  },
  areaServed: "Greater Sydney",
  hours: [
    { days: "Monday – Friday", time: "7:00am – 6:30pm" },
    { days: "Saturday", time: "7:00am – 12:30pm" },
    { days: "24/7 emergency line", time: "1300 765 594" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61566630403365",
    instagram: "https://www.instagram.com/_allfireservices_/",
    linkedin: "https://www.linkedin.com/in/allfire-services-sydney-92690516/",
    youtube: "https://www.youtube.com/@allfireservices",
    tiktok: "https://www.tiktok.com/@allfireservices",
    x: "https://x.com/Allfiresydney",
  },
  memberships: ["FPA Australia Member"],
} as const;
