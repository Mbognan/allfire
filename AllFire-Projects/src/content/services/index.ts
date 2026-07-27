import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "emergency-lighting-testing",
    name: "Emergency Lighting Testing",
    shortName: "Emergency Lighting",
    summary:
      "90-minute discharge testing of emergency and exit lighting to confirm occupants can safely evacuate if the power fails.",
    standardReference: "AS2293",
    frequency: "6-monthly discharge / annual full test",
    whatItCovers: [
      "Full 90-minute battery discharge test",
      "Illumination level checks along egress paths",
      "Exit sign and pictogram condition checks",
      "Faulty fitting identification and replacement advice"],
    whoItsFor: "Any building required to maintain illuminated evacuation paths under its fire safety schedule.",
    whyFirefighterRun:
      "Evacuation in smoke and darkness is one of the highest-risk moments in any fire, our technicians test lighting the way they'd want it tested if they were the ones evacuating a building.",
    relatedServiceSlugs: ["fire-extinguisher-tagging", "smoke-alarm-testing"],
    faqs: [
      {
        q: "What's the difference between a discharge test and a full test?",
        a: "A discharge test runs the battery for the full 90 minutes to confirm duration; a full test also verifies illumination levels meet the required lux at each point along the path.",
      }],
  },
  {
    slug: "fire-extinguisher-tagging",
    name: "Fire Extinguisher Tagging",
    shortName: "Extinguisher Tagging",
    summary:
      "Inspection, pressure checks and compliance tagging for portable fire extinguishers, fire blankets and hose reels.",
    standardReference: "AS1851",
    frequency: "6-monthly",
    whatItCovers: [
      "Pressure gauge, seal and pin verification",
      "Physical condition and corrosion checks",
      "Replacement of expired or non-compliant units",
      "Compliance tags dated and logged for your records"],
    whoItsFor: "Every commercial, retail, industrial and strata building with portable fire equipment on site.",
    whyFirefighterRun:
      "An extinguisher that doesn't discharge properly in the first ten seconds of a fire is the difference between a small incident and an evacuation, we check for that, not just a tag.",
    relatedServiceSlugs: ["emergency-lighting-testing", "smoke-alarm-testing"],
    faqs: [
      {
        q: "How often do extinguishers legally need tagging?",
        a: "AS1851 requires a 6-monthly inspection cycle for most portable fire equipment, with full servicing at longer intervals depending on extinguisher type.",
      }],
  },
  {
    slug: "smoke-alarm-testing",
    name: "Smoke Alarm Testing",
    shortName: "Smoke Alarm Test",
    summary:
      "Functional testing of smoke detectors and alarm systems, including interconnection and monitoring signal checks.",
    standardReference: "AS3786 / AS1851",
    frequency: "Annually (or per schedule)",
    whatItCovers: [
      "Individual detector sensitivity and function testing",
      "Interconnected alarm and evacuation signal checks",
      "Monitoring/fire panel signal verification where applicable",
      "Battery and unit replacement where required"],
    whoItsFor: "Residential, strata, boarding house and short-term accommodation buildings.",
    whyFirefighterRun:
      "Early detection is what buys occupants time to get out, our technicians have seen firsthand how many minutes a working alarm actually saves.",
    relatedServiceSlugs: ["emergency-lighting-testing", "fire-extinguisher-tagging"],
    faqs: [
      {
        q: "Do landlords have specific smoke alarm obligations in NSW?",
        a: "Yes, NSW rental laws set minimum requirements for working smoke alarms in residential properties, separate from the commercial AFSS regime.",
      }],
  },
  {
    slug: "diesel-pump-inspection",
    name: "Diesel Fire Pump Inspection",
    shortName: "Diesel Pump Inspection",
    summary:
      "Monthly running and load tests on diesel fire pumps to confirm they'll start and hold pressure during a real event or power outage.",
    standardReference: "AS1851",
    frequency: "Monthly",
    whatItCovers: [
      "Engine start-up and run-time testing",
      "Battery, fuel and coolant system checks",
      "Pressure and flow performance verification",
      "Logbook records for audit and insurance purposes"],
    whoItsFor: "Any building where fire services rely on a diesel pump set rather than mains pressure alone.",
    whyFirefighterRun:
      "A diesel pump that fails to start is one of the most common causes of an under-pressurised system during a fire, we test it like the failure point it is.",
    relatedServiceSlugs: [],
    faqs: [
      {
        q: "Why does a diesel pump need monthly testing?",
        a: "Diesel engines that sit idle can develop starting or fuel issues that go unnoticed until an emergency. Monthly running keeps the engine, and the record, current.",
      }],
  },
  {
    slug: "air-mechanical",
    name: "Air & Mechanical Services",
    shortName: "Air & Mechanical",
    summary:
      "Testing of mechanical smoke control: smoke exhaust and spill fans, fire and smoke dampers, and stair pressurisation systems.",
    standardReference: "AS1851",
    frequency: "6-monthly / annually (per schedule)",
    whatItCovers: [
      "Smoke exhaust and spill fan operation testing",
      "Fire and smoke damper inspection and release testing",
      "Stair pressurisation system performance checks",
      "Interface testing with the fire indicator panel"],
    whoItsFor:
      "Multi-storey commercial, retail and residential buildings with mechanical smoke control on the fire safety schedule.",
    whyFirefighterRun:
      "Smoke kills long before flame reaches most occupants. Our technicians have worked in buildings where the exhaust system was the difference between a clear stairwell and an unusable one.",
    relatedServiceSlugs: ["smoke-alarm-testing", "emergency-lighting-testing"],
    faqs: [
      {
        q: "Why does mechanical smoke control need testing separately?",
        a: "These systems only run in an emergency, so faults stay hidden until the day they matter. Testing confirms the fans start, the dampers move and the panel sees it all.",
      }],
  }];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
