/**
 * Locations AllFire services, with real coordinates so they can be plotted.
 *
 * ============================ PLACEHOLDER ============================
 * These are major Australian cities, added as a stand-in at the client's
 * request so the section can be seen in place. They are NOT confirmed coverage.
 *
 * Everywhere else on this site states the area served as Greater Sydney
 * (see company.areaServed). Shipping this list as-is would advertise national
 * coverage the business has not claimed and may not be licensed to deliver,
 * which is a real problem for a compliance provider.
 *
 * BEFORE LAUNCH: replace with the actual suburbs or regions Peter services.
 * The map projects whatever is in this array, so swapping in Sydney suburbs
 * needs no component change, only a tighter set of bounds in australiaMap.ts.
 * =====================================================================
 */
export type ServiceArea = {
  name: string;
  lat: number;
  lng: number;
  /** Headline locations get a visible label on the map; the rest get a dot. */
  major?: boolean;
};

export const serviceAreas: ServiceArea[] = [
  { name: "Sydney", lat: -33.87, lng: 151.21, major: true },
  { name: "Melbourne", lat: -37.81, lng: 144.96, major: true },
  { name: "Brisbane", lat: -27.47, lng: 153.03, major: true },
  { name: "Perth", lat: -31.95, lng: 115.86, major: true },
  { name: "Adelaide", lat: -34.93, lng: 138.6, major: true },
  { name: "Darwin", lat: -12.46, lng: 130.84, major: true },
  { name: "Hobart", lat: -42.88, lng: 147.33, major: true },
  { name: "Canberra", lat: -35.28, lng: 149.13 },
  { name: "Gold Coast", lat: -28.0, lng: 153.43 },
  { name: "Newcastle", lat: -32.93, lng: 151.78 },
  { name: "Wollongong", lat: -34.42, lng: 150.89 },
  { name: "Geelong", lat: -38.15, lng: 144.36 },
  { name: "Townsville", lat: -19.26, lng: 146.82 },
  { name: "Cairns", lat: -16.92, lng: 145.77 },
  { name: "Toowoomba", lat: -27.56, lng: 151.95 },
  { name: "Ballarat", lat: -37.56, lng: 143.85 },
];
