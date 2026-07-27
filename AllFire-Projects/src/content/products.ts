import { services } from "@/content/services";

/**
 * Product catalogue, per service.
 *
 * ============================ PLACEHOLDER ============================
 * Four representative products per service, standing in until the client
 * supplies the real range. Names, models and specifications use real Australian
 * equipment types, standards and ratings so the layout can be reviewed with
 * plausible content, but these are NOT confirmed products, and the model codes
 * are invented.
 *
 * Deliberately no prices. AllFire services equipment rather than selling it and
 * has published no pricing, so every product routes to an enquiry instead.
 *
 * BEFORE LAUNCH: replace with the client's actual range, model numbers,
 * specifications and photography. The pages render whatever is in this file, so
 * no component changes are needed.
 * =====================================================================
 *
 * Self-testing is the through-line: the equipment AllFire specifies reports its
 * own status rather than relying on someone walking the building with a torch,
 * which is what makes an annual statement defensible.
 */
export type SpecRow = { label: string; value: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

/** Variant chips, e.g. Style: Classic | Self-Test | Networked. */
export type VariantGroup = { label: string; options: string[] };

export type Product = {
  /** URL segment, unique within a service. */
  slug: string;
  /** Model code, shown above the name and on the detail page. */
  code: string;
  /** Short product name, the big heading. */
  name: string;
  /** One-line classification under the name. */
  subtitle: string;
  /** One line for the catalogue grid. */
  note: string;
  /** Body paragraphs on the detail page. */
  description: string[];
  image?: string;
  variants?: VariantGroup[];
  specs?: SpecGroup[];
};

const SELF_TEST_NOTE =
  "Self-testing models run their own scheduled tests and log the result, so the evidence for your annual statement is collected automatically rather than by hand.";

export const productsByService: Record<string, Product[]> = {
  "fire-extinguisher-tagging": [
    {
      slug: "abe-dry-powder-4-5kg",
      code: "AF-DP45",
      name: "Sentry 4.5",
      subtitle: "4.5 kg ABE Dry Powder Extinguisher",
      note: "General purpose. The default unit in most commercial buildings.",
      description: [
        "The 4.5 kg ABE dry powder extinguisher is the general-purpose unit found on most commercial floors. It covers Class A, B and E fires, which is why it is the default specification where a single extinguisher has to handle a mixed risk.",
        "Supplied with a wall bracket, location signage and a compliance tag dated at installation. Serviced on a six-monthly cycle to AS1851.",
      ],
      image: "/images/products/ext-dry-powder-45.webp",
      variants: [
        { label: "Mounting", options: ["Wall bracket", "Vehicle bracket", "Floor stand"] },
        { label: "Tagging", options: ["Standard tag", "Barcode asset tag"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Capacity", value: "4.5 kg" },
            { label: "Agent", value: "ABE dry chemical powder" },
            { label: "Fire classes", value: "A, B, E" },
            { label: "Discharge time", value: "13 - 15 seconds" },
            { label: "Operating temperature", value: "-20°C to 60°C" },
            { label: "Service interval", value: "6-monthly inspection" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Cylinder", value: "Mild steel, powder coated" },
            { label: "Height", value: "495 mm" },
            { label: "Weight (charged)", value: "7.4 kg" },
            { label: "Standard", value: "AS/NZS 1841.5" },
          ],
        },
      ],
    },
    {
      slug: "abe-dry-powder-9kg",
      code: "AF-DP90",
      name: "Sentry 9.0",
      subtitle: "9.0 kg ABE Dry Powder Extinguisher",
      note: "Larger coverage for warehouses, plant rooms and loading docks.",
      description: [
        "The 9.0 kg unit doubles the discharge of the 4.5 kg for spaces where the travel distance to the next extinguisher is longer: warehouses, plant rooms, loading docks and open industrial floors.",
        "Same ABE agent and the same six-monthly service cycle, in a heavier cylinder that most sites floor-stand rather than wall-mount.",
      ],
      image: "/images/products/ext-dry-powder-90.webp",
      variants: [
        { label: "Mounting", options: ["Floor stand", "Wall bracket"] },
        { label: "Tagging", options: ["Standard tag", "Barcode asset tag"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Capacity", value: "9.0 kg" },
            { label: "Agent", value: "ABE dry chemical powder" },
            { label: "Fire classes", value: "A, B, E" },
            { label: "Discharge time", value: "20 - 24 seconds" },
            { label: "Operating temperature", value: "-20°C to 60°C" },
            { label: "Service interval", value: "6-monthly inspection" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Cylinder", value: "Mild steel, powder coated" },
            { label: "Height", value: "690 mm" },
            { label: "Weight (charged)", value: "14.2 kg" },
            { label: "Standard", value: "AS/NZS 1841.5" },
          ],
        },
      ],
    },
    {
      slug: "co2-2kg",
      code: "AF-CO220",
      name: "Halo 2.0",
      subtitle: "2.0 kg CO2 Extinguisher",
      note: "Electrical risk. Leaves no residue on equipment.",
      description: [
        "Carbon dioxide displaces oxygen and leaves nothing behind, which is why it is specified wherever a discharge onto live equipment would cause more damage than the fire. Comms rooms, switchboards and office equipment are the usual placements.",
        "Fitted with a frost-free horn so the unit can be held safely during discharge.",
      ],
      image: "/images/products/ext-co2-20.webp",
      variants: [{ label: "Mounting", options: ["Wall bracket", "Floor stand"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Capacity", value: "2.0 kg" },
            { label: "Agent", value: "Carbon dioxide (CO2)" },
            { label: "Fire classes", value: "B, E" },
            { label: "Discharge time", value: "8 - 10 seconds" },
            { label: "Residue", value: "None" },
            { label: "Service interval", value: "6-monthly inspection" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Cylinder", value: "Seamless steel, high pressure" },
            { label: "Horn", value: "Frost-free composite" },
            { label: "Height", value: "540 mm" },
            { label: "Standard", value: "AS/NZS 1841.6" },
          ],
        },
      ],
    },
    {
      slug: "co2-5kg",
      code: "AF-CO250",
      name: "Halo 5.0",
      subtitle: "5.0 kg CO2 Extinguisher",
      note: "Switchboards, server rooms and larger electrical plant.",
      description: [
        "The 5.0 kg CO2 covers larger electrical plant: main switchboards, server rooms and plant spaces where a 2.0 kg unit would be under-sized for the risk.",
        "Usually floor-stood on a wheeled or fixed base given the charged weight.",
      ],
      image: "/images/products/ext-co2-50.webp",
      variants: [{ label: "Mounting", options: ["Floor stand", "Wall bracket"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Capacity", value: "5.0 kg" },
            { label: "Agent", value: "Carbon dioxide (CO2)" },
            { label: "Fire classes", value: "B, E" },
            { label: "Discharge time", value: "14 - 16 seconds" },
            { label: "Residue", value: "None" },
            { label: "Service interval", value: "6-monthly inspection" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Cylinder", value: "Seamless steel, high pressure" },
            { label: "Horn", value: "Frost-free composite, hose mounted" },
            { label: "Height", value: "750 mm" },
            { label: "Standard", value: "AS/NZS 1841.6" },
          ],
        },
      ],
    },
  ],

  "emergency-lighting-testing": [
    {
      slug: "led-exit-sign-single",
      code: "AF-EX-SS",
      name: "Beacon",
      subtitle: "LED Emergency Exit Sign, single sided",
      note: "Running-man pictogram to AS2293, wall or ceiling mount.",
      description: [
        "The standard running-man exit sign, fully certified to AS2293 with all directional pictograms included. Wall or ceiling mount from the same base.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test", "Networked"] },
        { label: "Mounting", options: ["Ceiling mounted", "Wall mounted", "Base only"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Frequency", value: "50 Hz" },
            { label: "Power consumption", value: "4 W max, 2.8 W standby" },
            { label: "Emergency duration", value: "90 minutes" },
            { label: "Viewing distance", value: "24 m" },
            { label: "Operating mode", value: "Maintained / non-maintained" },
            { label: "IP rating", value: "IP20" },
            { label: "Standard", value: "AS2293" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Polycarbonate" },
            { label: "Dimensions", value: "380 x 160 x 60 mm" },
            { label: "Weight", value: "0.9 kg" },
            { label: "Battery", value: "Lithium iron phosphate" },
            { label: "LED life", value: "100,000 hours" },
            { label: "Warranty", value: "3 years" },
          ],
        },
      ],
    },
    {
      slug: "led-exit-sign-double",
      code: "AF-EX-DS",
      name: "Beacon Duo",
      subtitle: "LED Emergency Exit Sign, double sided",
      note: "For corridors where the sign is read from both directions.",
      description: [
        "The double-sided version of the Beacon, for corridors and open floors where the sign has to be read from both approaches.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test", "Networked"] },
        { label: "Mounting", options: ["Ceiling mounted", "Suspended"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Power consumption", value: "6 W max, 3.6 W standby" },
            { label: "Emergency duration", value: "90 minutes" },
            { label: "Viewing distance", value: "24 m both faces" },
            { label: "Operating mode", value: "Maintained / non-maintained" },
            { label: "Standard", value: "AS2293" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Polycarbonate" },
            { label: "Dimensions", value: "380 x 160 x 266 mm" },
            { label: "Weight", value: "1.1 kg" },
            { label: "LED life", value: "100,000 hours" },
            { label: "Warranty", value: "3 years" },
          ],
        },
      ],
    },
    {
      slug: "emergency-batten",
      code: "AF-EM-BAT",
      name: "Lumen Batten",
      subtitle: "Emergency Batten Luminaire",
      note: "Maintains illumination along the egress path on mains failure.",
      description: [
        "Surface-mounted emergency batten for corridors, stairs and car parks. Holds the required illumination along the path of travel when mains power fails.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test", "Networked"] },
        { label: "Mounting", options: ["Surface", "Suspended"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Emergency duration", value: "90 minutes" },
            { label: "Emergency classification", value: "C0:D12.5, C90:D12.5" },
            { label: "Charger type", value: "Smart charger" },
            { label: "IP rating", value: "IP44" },
            { label: "Standard", value: "AS2293" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Polycarbonate, opal diffuser" },
            { label: "Dimensions", value: "600 x 80 x 55 mm" },
            { label: "Weight", value: "1.0 kg" },
            { label: "Warranty", value: "3 years" },
          ],
        },
      ],
    },
    {
      slug: "emergency-spitfire",
      code: "AF-EM-SPT",
      name: "Lumen Recessed",
      subtitle: "Emergency Spitfire Downlight",
      note: "Recessed unit for finished ceilings in lobbies and foyers.",
      description: [
        "Recessed emergency downlight for finished ceilings where a surface batten would be visually intrusive. Common in lobbies, foyers and residential common areas.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test", "Networked"] },
        { label: "Finish", options: ["White", "Black", "Brushed"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Emergency duration", value: "90 minutes" },
            { label: "Cut-out", value: "70 mm" },
            { label: "Charger type", value: "Smart charger" },
            { label: "Standard", value: "AS2293" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Die-cast aluminium" },
            { label: "Dimensions", value: "90 mm dia x 60 mm" },
            { label: "Weight", value: "0.4 kg" },
            { label: "Warranty", value: "3 years" },
          ],
        },
      ],
    },
  ],

  "smoke-alarm-testing": [
    {
      slug: "photoelectric-240v",
      code: "AF-SD-PE",
      name: "Vigil 240",
      subtitle: "240V Photoelectric Smoke Alarm",
      note: "Standard detector for residential and strata buildings.",
      description: [
        "A 240V hard-wired photoelectric smoke alarm with a 10 year lithium battery backup. Photoelectric sensing responds faster to the smouldering fires that account for most residential fatalities.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Classic", "Self-Test", "Wireless interlinking"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Backup battery", value: "10 year sealed lithium" },
            { label: "Sensing", value: "Photoelectric" },
            { label: "Alarm level", value: "85 dB at 3 m" },
            { label: "Interconnection", value: "Wired or wireless, up to 40 units" },
            { label: "Standard", value: "AS3786" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "V0 flame-retardant ABS" },
            { label: "Dimensions", value: "120 mm dia x 45 mm" },
            { label: "Weight", value: "0.2 kg" },
            { label: "Warranty", value: "5 years" },
          ],
        },
      ],
    },
    {
      slug: "thermal-detector",
      code: "AF-SD-TH",
      name: "Vigil Heat",
      subtitle: "Thermal Heat Detector",
      note: "Kitchens and garages, where smoke units nuisance trip.",
      description: [
        "A fixed-temperature and rate-of-rise heat detector for spaces where cooking fumes, steam or exhaust would nuisance-trip a smoke alarm. Kitchens, garages and plant rooms are the usual placements.",
        SELF_TEST_NOTE,
      ],
      variants: [{ label: "Style", options: ["Classic", "Self-Test", "Wireless interlinking"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "220 - 240 VAC" },
            { label: "Backup battery", value: "10 year sealed lithium" },
            { label: "Sensing", value: "Fixed temperature + rate of rise" },
            { label: "Alarm threshold", value: "58°C fixed" },
            { label: "Alarm level", value: "85 dB at 3 m" },
            { label: "Standard", value: "AS1603.6" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "V0 flame-retardant ABS" },
            { label: "Dimensions", value: "120 mm dia x 45 mm" },
            { label: "Weight", value: "0.2 kg" },
            { label: "Warranty", value: "5 years" },
          ],
        },
      ],
    },
    {
      slug: "manual-call-point",
      code: "AF-SD-MCP",
      name: "Alert Point",
      subtitle: "Manual Call Point",
      note: "Break-glass point on the egress path.",
      description: [
        "Resettable manual call point for egress paths and exits, so an occupant can raise the alarm before detection triggers. Uses a re-settable element rather than breakable glass, so testing does not consume a part.",
      ],
      variants: [{ label: "Style", options: ["Surface mount", "Flush mount", "Weatherproof"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Operation", value: "Resettable element" },
            { label: "Contacts", value: "SPDT" },
            { label: "IP rating", value: "IP24D, IP67 weatherproof variant" },
            { label: "Standard", value: "AS1670.1" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Polycarbonate, signal red" },
            { label: "Dimensions", value: "87 x 87 x 55 mm" },
            { label: "Weight", value: "0.15 kg" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "sounder-strobe",
      code: "AF-SD-SND",
      name: "Alert Sounder",
      subtitle: "Alarm Sounder and Strobe",
      note: "Audible and visual occupant warning device.",
      description: [
        "Combined sounder and strobe for occupant warning. The visual element covers plant rooms and other high-noise areas where an audible alarm alone cannot be relied on.",
      ],
      variants: [{ label: "Style", options: ["Sounder only", "Sounder + strobe", "Weatherproof"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Voltage", value: "24 VDC" },
            { label: "Sound output", value: "100 dB at 1 m" },
            { label: "Tone selection", value: "32 selectable tones" },
            { label: "Strobe", value: "1 Hz, clear lens" },
            { label: "Standard", value: "AS1670.1" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Body", value: "Polycarbonate, signal red" },
            { label: "Dimensions", value: "100 mm dia x 90 mm" },
            { label: "Weight", value: "0.3 kg" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
  ],

  "diesel-pump-inspection": [
    {
      slug: "diesel-pump-controller",
      code: "AF-DP-CTL",
      name: "Ignition Control",
      subtitle: "Diesel Pump Controller",
      note: "Auto-start logic, alarms and fire panel interface.",
      description: [
        "The controller is what decides whether the pump starts. It monitors system pressure, runs the automatic weekly start, and reports fault and run status back to the fire indicator panel.",
        SELF_TEST_NOTE,
      ],
      variants: [{ label: "Style", options: ["Standard", "Self-Test", "Networked"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Supply", value: "240 VAC control, 24 VDC start" },
            { label: "Start modes", value: "Automatic, manual, weekly test" },
            { label: "Battery monitoring", value: "Dual bank with charger fault alarm" },
            { label: "Panel interface", value: "Volt-free contacts" },
            { label: "Standard", value: "AS2941" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Enclosure", value: "Powder-coated steel, signal red" },
            { label: "IP rating", value: "IP54" },
            { label: "Dimensions", value: "800 x 600 x 250 mm" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "jockey-pump",
      code: "AF-DP-JKY",
      name: "Hold Pressure",
      subtitle: "Jockey Pump",
      note: "Holds system pressure between demands.",
      description: [
        "The jockey pump keeps the system topped up so the main pump is not cycling on every minor pressure drop. A jockey that runs constantly is usually the first sign of a leak somewhere in the network.",
      ],
      variants: [{ label: "Capacity", options: ["0.75 kW", "1.5 kW", "2.2 kW"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Motor", value: "1.5 kW, 415 V three phase" },
            { label: "Flow", value: "20 L/min" },
            { label: "Head", value: "90 m" },
            { label: "Control", value: "Pressure switch, auto cut-in" },
            { label: "Standard", value: "AS2941" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Pump body", value: "Cast iron, bronze impeller" },
            { label: "Seal", value: "Mechanical, silicon carbide" },
            { label: "Weight", value: "38 kg" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "starting-battery-set",
      code: "AF-DP-BAT",
      name: "Dual Bank",
      subtitle: "Starting Battery Set",
      note: "Dual batteries with charger, the most common failure point.",
      description: [
        "Dual battery banks with automatic changeover, so a single flat bank cannot stop the pump starting. This is the component that most often fails a monthly test, which is why it carries its own monitoring.",
        SELF_TEST_NOTE,
      ],
      variants: [{ label: "Style", options: ["Standard", "Self-Test monitored"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Configuration", value: "Dual bank, automatic changeover" },
            { label: "Voltage", value: "24 VDC" },
            { label: "Capacity", value: "100 Ah per bank" },
            { label: "Charger", value: "Automatic float, fault monitored" },
            { label: "Standard", value: "AS2941" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Type", value: "Sealed lead acid" },
            { label: "Tray", value: "Powder-coated steel, vented" },
            { label: "Weight", value: "62 kg per bank" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "pressure-gauge-assembly",
      code: "AF-DP-GAU",
      name: "Line Gauge",
      subtitle: "Pressure Gauge Assembly",
      note: "Suction and discharge pressure verification.",
      description: [
        "Suction and discharge gauge set with isolation cocks, so pressures can be read and the gauges replaced without draining the system. The measured figures on your service report come from these.",
      ],
      variants: [{ label: "Range", options: ["0 - 1600 kPa", "0 - 2500 kPa"] }],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Range", value: "0 - 1600 kPa" },
            { label: "Accuracy", value: "±1.6% full scale" },
            { label: "Connection", value: "1/4 inch BSP bottom entry" },
            { label: "Standard", value: "AS2941" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Case", value: "Stainless steel, 100 mm dial" },
            { label: "Fill", value: "Glycerine damped" },
            { label: "Weight", value: "0.6 kg" },
            { label: "Warranty", value: "1 year" },
          ],
        },
      ],
    },
  ],

  "air-mechanical": [
    {
      slug: "fire-damper",
      code: "AF-AM-FD",
      name: "Barrier FD",
      subtitle: "Curtain Fire Damper",
      note: "Closes on heat to maintain compartment separation.",
      description: [
        "Curtain fire damper for ductwork crossing a fire-rated wall or floor. Held open in normal operation and released by a thermal element, restoring the compartment separation the duct penetration breaks.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Thermal release", "Motorised", "Self-Test monitored"] },
        { label: "Rating", options: ["-/120/-", "-/240/-"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Fire rating", value: "-/120/- to -/240/-" },
            { label: "Release temperature", value: "72°C thermal element" },
            { label: "Orientation", value: "Vertical or horizontal" },
            { label: "Standard", value: "AS1682.2" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Frame", value: "Galvanised steel" },
            { label: "Blades", value: "Interlocking curtain" },
            { label: "Sizes", value: "200 x 200 mm to 1200 x 1200 mm" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "smoke-damper",
      code: "AF-AM-SD",
      name: "Barrier SD",
      subtitle: "Motorised Smoke Damper",
      note: "Controls smoke movement through ductwork.",
      description: [
        "Motorised smoke damper driven from the fire indicator panel, so smoke can be held out of, or drawn from, a given zone. Unlike a fire damper it is actively controlled rather than heat released.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Motorised", "Self-Test monitored"] },
        { label: "Actuator", options: ["Spring return", "Fail in place"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Actuator", value: "24 VAC spring return" },
            { label: "Close time", value: "Under 15 seconds" },
            { label: "Leakage class", value: "Class 2" },
            { label: "Position feedback", value: "End switches to panel" },
            { label: "Standard", value: "AS1668.1" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Frame", value: "Galvanised steel" },
            { label: "Blades", value: "Opposed action, gasketed" },
            { label: "Sizes", value: "300 x 300 mm to 1500 x 1200 mm" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "smoke-exhaust-fan",
      code: "AF-AM-EXH",
      name: "Extract 400",
      subtitle: "Smoke Exhaust Fan",
      note: "Clears smoke from the fire compartment.",
      description: [
        "High-temperature rated axial exhaust fan for smoke removal. Certified to keep running in the conditions it is needed in, which is the whole point of the rating.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test monitored"] },
        { label: "Rating", options: ["300°C / 60 min", "400°C / 120 min"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Temperature rating", value: "400°C for 120 minutes" },
            { label: "Motor", value: "415 V three phase" },
            { label: "Airflow", value: "Up to 12 m³/s" },
            { label: "Control", value: "Fire mode override from panel" },
            { label: "Standard", value: "AS1668.1" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Casing", value: "Hot-dip galvanised steel" },
            { label: "Impeller", value: "Cast aluminium aerofoil" },
            { label: "Sizes", value: "500 mm to 1250 mm diameter" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
    {
      slug: "stair-pressurisation-fan",
      code: "AF-AM-PRS",
      name: "Stairwell Pressure",
      subtitle: "Stair Pressurisation Fan",
      note: "Keeps smoke out of the evacuation stair.",
      description: [
        "Pressurisation fan for fire-isolated stairs. Holds the stairwell at a higher pressure than the floors so smoke cannot enter the escape route while people are using it.",
        SELF_TEST_NOTE,
      ],
      variants: [
        { label: "Style", options: ["Standard", "Self-Test monitored"] },
        { label: "Control", options: ["Fixed speed", "Variable speed drive"] },
      ],
      specs: [
        {
          title: "Operational info",
          rows: [
            { label: "Pressure differential", value: "20 - 50 Pa" },
            { label: "Motor", value: "415 V three phase" },
            { label: "Control", value: "Variable speed with pressure sensing" },
            { label: "Door force limit", value: "110 N maximum" },
            { label: "Standard", value: "AS1668.1" },
          ],
        },
        {
          title: "Construction",
          rows: [
            { label: "Casing", value: "Galvanised steel, acoustic lined" },
            { label: "Impeller", value: "Backward curved centrifugal" },
            { label: "Sizes", value: "400 mm to 900 mm" },
            { label: "Warranty", value: "2 years" },
          ],
        },
      ],
    },
  ],
};

export function getProductsFor(slug: string): Product[] {
  return productsByService[slug] ?? [];
}

export function getProduct(serviceSlug: string, productSlug: string): Product | undefined {
  return getProductsFor(serviceSlug).find((p) => p.slug === productSlug);
}

/** Services that currently have a catalogue, for cross-linking and routing. */
export function servicesWithCatalogue() {
  return services.filter((s) => getProductsFor(s.slug).length > 0);
}
