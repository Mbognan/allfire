import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "emergency-lighting-testing",
    name: "Emergency Lighting Testing",
    shortName: "Emergency Lighting",
    category: "active",
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
    category: "active",
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
    category: "active",
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
    category: "active",
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
    category: "active",
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
  },

  /* ------------------------------------------------------------------
     Active systems
     ------------------------------------------------------------------ */
  {
    slug: "fire-panels-detection",
    name: "Fire Panels & Detection",
    shortName: "Panels & Detection",
    category: "active",
    summary:
      "Routine servicing of fire indicator panels, detection loops and monitoring links, so the system sees a fire and tells someone about it.",
    standardReference: "AS1851",
    frequency: "Monthly / annually (per schedule)",
    whatItCovers: [
      "Fire indicator panel function and fault-log review",
      "Detection loop and zone testing, point by point",
      "Monitoring and brigade signalling verification",
      "Battery, charger and standby supply checks"],
    whoItsFor:
      "Any building with a fire indicator panel on its fire safety schedule, from strata blocks to large commercial sites.",
    whyFirefighterRun:
      "The panel is the first thing a responding crew reads on arrival. Our technicians have stood in front of panels showing stale faults nobody had cleared, and know exactly how much time that costs.",
    relatedServiceSlugs: ["smoke-alarm-testing", "air-mechanical"],
    faqs: [
      {
        q: "What happens if the panel shows a fault between services?",
        a: "Log it and call us. A standing fault can isolate a zone without anyone realising, which means that part of the building is effectively undetected until it is cleared.",
      }],
  },
  {
    slug: "fire-hydrant-systems",
    name: "Fire Hydrant Systems",
    shortName: "Hydrant Systems",
    category: "active",
    summary:
      "Flow and pressure testing of hydrant systems, boosters and hose reels, confirming the brigade gets the water it expects on arrival.",
    standardReference: "AS1851",
    frequency: "6-monthly / annually",
    whatItCovers: [
      "Hydrant flow and pressure performance testing",
      "Booster assembly inspection and access checks",
      "Hose reel operation and nozzle condition",
      "Block plan and signage verification"],
    whoItsFor:
      "Commercial, industrial and multi-storey residential buildings with a hydrant system on the fire safety schedule.",
    whyFirefighterRun:
      "Our technicians have connected to boosters for real. They test the thing they used to rely on, and they know what a blocked booster cupboard costs a crew on arrival.",
    relatedServiceSlugs: ["diesel-pump-inspection", "fire-sprinkler-systems"],
    faqs: [
      {
        q: "Why does the booster assembly need clear access?",
        a: "Attending crews connect there first. Anything parked, stored or locked in front of it delays water to the building at the worst possible moment.",
      }],
  },
  {
    slug: "fire-sprinkler-systems",
    name: "Fire Sprinkler Systems",
    shortName: "Sprinkler Systems",
    category: "active",
    summary:
      "Inspection and testing of sprinkler systems, valves and alarm devices, so the system activates and reports when it should.",
    standardReference: "AS1851",
    frequency: "Monthly / annually (per schedule)",
    whatItCovers: [
      "Valve set inspection and alarm test",
      "Sprinkler head condition, clearance and spare stock checks",
      "Water flow switch and pressure gauge verification",
      "Logbook records for audit and insurance purposes"],
    whoItsFor:
      "Buildings with wet or dry sprinkler coverage, including warehousing, retail, aged care and high-rise residential.",
    whyFirefighterRun:
      "Sprinklers control most fires before a truck arrives. Our technicians have seen both outcomes, the one where the system worked and the one where a painted-over head did not.",
    relatedServiceSlugs: ["fire-hydrant-systems", "diesel-pump-inspection"],
    faqs: [
      {
        q: "Can sprinkler heads be painted or obstructed?",
        a: "No. Paint, plaster and stored goods within the clearance zone all change how a head responds, and any of them can stop it activating at the designed temperature.",
      }],
  },

  /* ------------------------------------------------------------------
     Passive fire
     ------------------------------------------------------------------ */
  {
    slug: "fire-penetration-sealing",
    name: "Fire Penetration Sealing",
    shortName: "Penetrations",
    category: "passive",
    summary:
      "Inspection and reinstatement of fire-rated seals and collars where services pass through fire-rated walls and floors.",
    standardReference: "AS4072.1 / AS1851",
    frequency: "Annually, and after any trade work",
    whatItCovers: [
      "Survey of penetrations through fire-rated construction",
      "Fire collar, mortar and sealant condition assessment",
      "Reinstatement of breached or missing seals",
      "Photographic records tied to each penetration"],
    whoItsFor:
      "Any building with fire-rated separation, particularly after cabling, plumbing or air conditioning work.",
    whyFirefighterRun:
      "A single unsealed penetration turns a fire-rated floor into a chimney. Our technicians have followed smoke through buildings and found it travelling through exactly these gaps.",
    relatedServiceSlugs: ["fire-doors-frames", "fire-spray-protection"],
    faqs: [
      {
        q: "Why do penetrations need checking after trade work?",
        a: "Because most breaches are made by well-meaning trades running a new cable or pipe. The work itself is fine, the unsealed hole left behind is what fails the building.",
      }],
  },
  {
    slug: "fire-doors-frames",
    name: "Fire Doors & Frames",
    shortName: "Doors & Frames",
    category: "passive",
    summary:
      "Six-monthly inspection of fire and smoke doors, frames, hardware and seals, covering the gaps, closers and tags that decide whether a door holds.",
    standardReference: "AS1851 / AS1905.1",
    frequency: "6-monthly",
    whatItCovers: [
      "Door leaf, frame and clearance gap measurement",
      "Self-closer and latching performance testing",
      "Intumescent and smoke seal condition checks",
      "Tag verification and non-compliance reporting"],
    whoItsFor:
      "Strata, commercial and aged care buildings relying on fire-rated doors for compartmentation and egress.",
    whyFirefighterRun:
      "A fire door that does not latch is just a door. Our technicians have worked stairwells where a wedged-open door filled the only exit path with smoke.",
    relatedServiceSlugs: ["fire-penetration-sealing", "emergency-lighting-testing"],
    faqs: [
      {
        q: "Why can't fire doors be propped open?",
        a: "They only work closed. A propped door lets fire and smoke into the corridor or stair it was installed to protect, and it is one of the most common defects we record.",
      }],
  },
  {
    slug: "fire-spray-protection",
    name: "Fire Spray & Structural Protection",
    shortName: "Fire Spray",
    category: "passive",
    summary:
      "Assessment and repair of sprayed fire-resistant coatings protecting structural steel and concrete from failure under fire load.",
    standardReference: "AS1530.4",
    frequency: "Annually, and after any structural work",
    whatItCovers: [
      "Coating thickness and coverage inspection",
      "Identification of damaged, missing or disturbed spray",
      "Reinstatement to the required fire resistance level",
      "Documentation of the treated structural elements"],
    whoItsFor:
      "Buildings with exposed structural steel relying on applied coatings for their fire resistance level.",
    whyFirefighterRun:
      "Unprotected steel loses strength fast in a fire. Structural collapse is the risk that decides whether crews go in at all, so this is not a coating we treat as cosmetic.",
    relatedServiceSlugs: ["fire-penetration-sealing", "fire-doors-frames"],
    faqs: [
      {
        q: "How does fire spray get damaged?",
        a: "Usually by later trades working around the steel, hanging services off it or knocking coating loose. It is rarely deliberate and almost never reported.",
      }],
  },
  {
    slug: "fire-system-upgrades",
    name: "Fire System Upgrades",
    shortName: "Upgrades",
    category: "passive",
    summary:
      "Staged upgrade of ageing or non-compliant fire systems, from defect rectification through to replacement and recertification.",
    frequency: "Project-based",
    whatItCovers: [
      "Defect assessment and prioritised scope of works",
      "Staged upgrade planning around building occupancy",
      "Installation, commissioning and recertification",
      "Updated fire safety schedule documentation"],
    whoItsFor:
      "Owners and strata committees facing accumulated defects, a failed statement or equipment past its serviceable life.",
    whyFirefighterRun:
      "We scope upgrades against how a building actually performs in an incident, not against the cheapest path to a signature.",
    relatedServiceSlugs: ["annual-fire-safety-statement", "fire-panels-detection"],
    faqs: [
      {
        q: "Do upgrades have to happen all at once?",
        a: "Rarely. Most buildings are better served by a staged program that clears the highest-risk defects first and spreads the rest across budget cycles.",
      }],
  },

  /* ------------------------------------------------------------------
     Compliance
     ------------------------------------------------------------------ */
  {
    slug: "annual-fire-safety-statement",
    name: "Annual Fire Safety Statements",
    shortName: "AFSS Support",
    category: "compliance",
    summary:
      "End-to-end AFSS support: assessment of every measure on your schedule, defect rectification and the signed statement lodged on time.",
    standardReference: "EP&A Regulation (NSW)",
    frequency: "Annually",
    whatItCovers: [
      "Assessment of each essential fire safety measure on the schedule",
      "Defect identification and rectification before certification",
      "Accredited practitioner assessment and statement issue",
      "Lodgement with council and Fire and Rescue NSW"],
    whoItsFor:
      "Every NSW building owner and strata committee with a fire safety schedule, which is effectively all commercial and multi-residential buildings.",
    whyFirefighterRun:
      "A statement is a promise the building will perform. Our people have relied on that promise from the other side of the door, so we do not sign one we would not stand behind.",
    relatedServiceSlugs: ["as1851-routine-servicing", "fire-system-upgrades"],
    faqs: [
      {
        q: "What happens if the statement is lodged late?",
        a: "Councils can issue penalty notices, and insurers may treat an out-of-date statement as a coverage problem. The cost of being late is almost always higher than the work itself.",
      }],
  },
  {
    slug: "as1851-routine-servicing",
    name: "Annual Inspections & Routine Servicing",
    shortName: "Annual Inspections",
    category: "compliance",
    summary:
      "A single AS1851 servicing schedule covering every measure in your building, with the records kept current for audit.",
    standardReference: "AS1851",
    frequency: "Monthly through annually, per measure",
    whatItCovers: [
      "One combined schedule across all fire safety measures",
      "Routine servicing at the interval each measure requires",
      "Defect reporting with clear priority and cost",
      "Logbook and records maintained ready for audit"],
    whoItsFor:
      "Owners and managers who would rather hold one servicing contract than coordinate a different contractor per measure.",
    whyFirefighterRun:
      "Fragmented servicing is where defects hide between contractors. One schedule, one crew, one set of records means nothing falls into the gap.",
    relatedServiceSlugs: ["annual-fire-safety-statement", "fire-panels-detection"],
    faqs: [
      {
        q: "Can you take over servicing partway through a cycle?",
        a: "Yes. We audit what has already been done, pick up the schedule where it stands and bring the records up to date rather than restarting the cycle.",
      }],
  }];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Menu and index grouping. Order here is the order shown. */
export const serviceCategories = [
  { id: "active", label: "Active Systems" },
  { id: "passive", label: "Passive Fire" },
  { id: "compliance", label: "Compliance" },
] as const;

export function getServicesByCategory(category: string) {
  return services.filter((service) => service.category === category);
}
