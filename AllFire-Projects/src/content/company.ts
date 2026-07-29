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
  emergencyPhone: "0484 648 400",
  emergencyPhoneHref: "tel:0484648400",
  /**
   * WhatsApp click-to-chat. wa.me needs the number in full international form
   * with no plus, spaces or leading zero: 0484 648 400 -> 61484648400.
   *
   * NOTE: this reuses the mobile above. Confirm with Peter that WhatsApp is
   * actually active on that number before launch, or swap in the dedicated one.
   */
  whatsappNumber: "61484648400",
  whatsappHref:
    "https://wa.me/61484648400?text=" +
    encodeURIComponent(
      "Hi AllFire Services, I'd like to ask about fire safety compliance for my building."
    ),
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
    { days: "24/7 emergency line", time: "0484 648 400" },
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
