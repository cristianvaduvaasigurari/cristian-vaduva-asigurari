export interface PrivateClientCategory {
  slug: string;
  id: string;
  title: string;
  navTitle: string;
  badge: string;
  tagline: string;
  heroIntro: string;
  longDescription: string;
  coverageCategories: string[];
  underwritingFactors: {
    title: string;
    description: string;
  }[];
  approachPoints: {
    title: string;
    description: string;
  }[];
  keyConsiderations: string[];
  seoTitle: string;
  seoDescription: string;
  accentColor: string;
  imageAlt: string;
  assetOptions: string[];
}

export const privateClientCategories: Record<string, PrivateClientCategory> = {
  supercars: {
    slug: "supercars",
    id: "supercars",
    title: "Supercars & Exotics",
    navTitle: "Supercars & Exotics",
    badge: "AUTOMOTIVE PATRIMONY",
    tagline: "Protection for exceptional vehicles.",
    heroIntro:
      "Specialist insurance considerations for exceptional vehicles, high-value automobiles, hypercars and collector assets that exceed the boundaries of standard motor policies.",
    longDescription:
      "High-performance and rare vehicles possess risk profiles and valuation structures that standard motor insurers cannot accurately assess. From bespoke craftsmanship and carbon composites to appreciated collector market valuations and specialized repair logistics, our advisory structures coverage specifically around how the vehicle is owned, stored, and driven.",
    coverageCategories: [
      "Supercars & Hypercars",
      "High-Performance Vehicles",
      "Luxury Saloons & GTs",
      "Classic & Collector Automobiles",
      "Restomod & Bespoke Builds",
      "Multi-Car High-Value Fleets",
      "Transit & Concours Exposure",
      "Agreed Value Provisions"
    ],
    underwritingFactors: [
      {
        title: "Agreed Valuation & Appreciation",
        description: "Establishing fixed, pre-agreed values that reflect actual market and replacement value rather than book depreciation."
      },
      {
        title: "Ownership & Registration Structure",
        description: "Aligning coverage across corporate entities, trusts, leasing structures or private cross-border ownership."
      },
      {
        title: "Usage, Mileage & Driver Profile",
        description: "Structuring terms around private use, dedicated track events, or restricted mileage for collector vehicles."
      },
      {
        title: "Storage & Security Protocols",
        description: "Assessing climate-controlled garaging, perimeter telemetry, GPS trackers and specialized custodial facilities."
      },
      {
        title: "Bespoke Repair & OEM Parts Logistics",
        description: "Ensuring repairs are executed exclusively by authorized factory specialists with original manufacturer parts."
      },
      {
        title: "Transit & Event Transportation",
        description: "Coverage considerations during enclosed transport to rallies, international concourses, or service centers."
      }
    ],
    approachPoints: [
      {
        title: "Individual Assessment",
        description: "We do not rely on algorithmic mass-market rating matrices. Each automobile or fleet is reviewed individually based on exact specifications."
      },
      {
        title: "Agreed Value Negotiation",
        description: "We work with recognized automotive valuers and specialist underwriters to establish binding agreed value endorsements."
      },
      {
        title: "Confidential Placement",
        description: "Your personal details, collection locations and vehicle registrations remain strictly confidential throughout the advisory process."
      }
    ],
    keyConsiderations: [
      "Choice of manufacturer-authorized repair facility",
      "Original equipment manufacturer (OEM) replacement parts",
      "Depreciation protection and agreed value guarantees",
      "European and cross-border driving exposure",
      "Multi-vehicle collection structuring under a single review"
    ],
    seoTitle: "Supercar & High-Value Car Insurance | Cristian Văduva",
    seoDescription:
      "Private client insurance advisory for supercars, hypercars, exotic and classic collector vehicles. Bespoke risk assessment and specialist underwriting.",
    accentColor: "slate",
    imageAlt: "Supercar precision design and engineering detail",
    assetOptions: ["Supercar / Hypercar", "Classic / Collector Car", "High-Performance Fleet"]
  },

  yachts: {
    slug: "yachts",
    id: "yachts",
    title: "Yachts & Superyachts",
    navTitle: "Yachts & Superyachts",
    badge: "MARITIME ASSETS",
    tagline: "Protection structured around the vessel, its navigation and operation.",
    heroIntro:
      "Protection structured around the vessel, its use, navigation, ownership and associated marine risks across private and charter profiles.",
    longDescription:
      "Marine assets represent a convergence of complex risks: hull and machinery mechanics, liability across international maritime jurisdictions, crew welfare, and specialized onboard assets. We review vessel parameters to structure insurance solutions tailored to your cruising patterns, mooring locations, and operating frameworks.",
    coverageCategories: [
      "Motor Yachts & Superyachts",
      "Sailing Yachts & Catamarans",
      "Tenders & High-Speed Chase Boats",
      "Water Toys & Submersibles",
      "Protection & Indemnity (P&I) Liability",
      "Crew Welfare, Medical & Liability",
      "International Navigation Considerations",
      "Refit, Maintenance & Shipyard Risks"
    ],
    underwritingFactors: [
      {
        title: "Vessel Classification & Survey",
        description: "Valuation, hull material, propulsion systems, age and international maritime classification standards."
      },
      {
        title: "Cruising Limits & Geographic Scope",
        description: "Defining operational waters, seasonal migration routes, Mediterranean/Caribbean transit, and hurricane zones."
      },
      {
        title: "Mooring, Berthing & Winter Layup",
        description: "Marina security, dedicated berths, dry-dock storage, and safety protocols during off-season layup."
      },
      {
        title: "Skipper & Crew Competence",
        description: "Assessment of professional crew qualifications, maritime licenses, captain experience, and manning ratios."
      },
      {
        title: "Charter vs. Private Ownership",
        description: "Distinguishing pure private recreational use from commercial charter operations and VAT compliance structures."
      },
      {
        title: "Tenders, Toys & Ancillary Equipment",
        description: "Specific inventory scheduling for auxiliary chase boats, jet skis, diving equipment, and bespoke tenders."
      }
    ],
    approachPoints: [
      {
        title: "Maritime Specialization",
        description: "Structuring terms with leading marine underwriters recognized by global maritime authorities."
      },
      {
        title: "Navigational Flexibility",
        description: "Ensuring policy endorsements accommodate your planned voyages, seasonal relocations, and yard periods."
      },
      {
        title: "Comprehensive Risk Audit",
        description: "Reviewing crew agreements, charter contracts, and salvage clauses to eliminate coverage gaps."
      }
    ],
    keyConsiderations: [
      "Agreed hull & machinery valuation without automatic depreciation",
      "Pollution, wreck removal and maritime liability limits",
      "Crew personal accident, medical and repatriation coverage",
      "Emergency towing, salvage and assistance provisions",
      "Shipyard and refit liability alignments"
    ],
    seoTitle: "Yacht & Superyacht Insurance | Cristian Văduva",
    seoDescription:
      "Specialist private client insurance advisory for motor yachts, superyachts, sailing vessels and tenders. Comprehensive marine risk assessment.",
    accentColor: "sky",
    imageAlt: "Luxury yacht navigating open azure waters",
    assetOptions: ["Yacht", "Superyacht", "Sailing Vessel", "Tenders & Water Toys"]
  },

  "private-aviation": {
    slug: "private-aviation",
    id: "private-aviation",
    title: "Private Aviation",
    navTitle: "Private Aviation",
    badge: "AERONAUTICAL EXPOSURE",
    tagline: "Insurance considerations for privately owned and operated aircraft.",
    heroIntro:
      "Insurance considerations for privately owned and operated aircraft, business jets and helicopters, subject to underwriting and aircraft-specific assessment.",
    longDescription:
      "Aviation risk demands absolute technical precision. Whether you own an executive jet for business efficiency, a turboprop for regional mobility, or a helicopter for private estate access, coverage must encompass hull physical damage, third-party and passenger liability, hangar security, and cross-border flight permissions.",
    coverageCategories: [
      "Private Business Jets",
      "Turboprops & Executive Aircraft",
      "Helicopters & Rotorcraft",
      "Aircraft Hull Physical Damage (All-Risks)",
      "Comprehensive Aviation Liability (CSL)",
      "Passenger & Crew Personal Accident",
      "Hangar, Ground & Ingestion Risks",
      "Aircraft Ownership & Leasing SPVs"
    ],
    underwritingFactors: [
      {
        title: "Aircraft Specification & Avionics",
        description: "Make, model, serial, engine type, avionics suite, maintenance cycle, and airframe flight hours."
      },
      {
        title: "Pilot Qualifications & Flight Hours",
        description: "Captain and first officer ratings, simulator recurrent training, type hours, and medical certifications."
      },
      {
        title: "Operational Base & Hangarage",
        description: "Home base airfield infrastructure, dedicated hangar security, line maintenance, and fire suppression systems."
      },
      {
        title: "Geographic Scope & International Routes",
        description: "Approved territorial limits, international overflight permits, and war & allied perils endorsements."
      },
      {
        title: "Management Company vs. Owner-Piloted",
        description: "Evaluation of CAMO / AOC management oversight versus private owner-operator profiles."
      },
      {
        title: "Liability Limits & Passenger Capacity",
        description: "Combined single limit (CSL) liability structuring relative to asset scale, seating configuration, and passenger exposure."
      }
    ],
    approachPoints: [
      {
        title: "Aviation Market Placement",
        description: "Engaging specialist aviation underwriters with proven claims resolution track records and Lloyd's market access."
      },
      {
        title: "Technical Alignment",
        description: "Harmonizing policy wordings with your aircraft management agreement and manufacturer maintenance programs."
      },
      {
        title: "High-Limit Liability",
        description: "Constructing robust liability layers that insulate private wealth and corporate holding structures."
      }
    ],
    keyConsiderations: [
      "Agreed hull value with no deduction for betterment",
      "Third party, passenger, cargo and baggage legal liability",
      "Spares, replacement engines and equipment in transit",
      "War, hijacking and terrorism aviation perils",
      "Pilot training expenses and temporary replacement aircraft"
    ],
    seoTitle: "Private Jet & Aviation Insurance | Cristian Văduva",
    seoDescription:
      "Private aviation insurance advisory for private jets, business aircraft and helicopters. Precision hull and liability risk structuring.",
    accentColor: "indigo",
    imageAlt: "Private executive jet on tarmac ready for departure",
    assetOptions: ["Private Jet", "Helicopter", "Turboprop", "Aviation Fleet"]
  },

  "jewellery-watches": {
    slug: "jewellery-watches",
    id: "jewellery-watches",
    title: "Jewellery & Watches",
    navTitle: "Jewellery & Watches",
    badge: "HAUTE HORLOGERIE & JEWELLERY",
    tagline: "Protection for exceptional personal pieces.",
    heroIntro:
      "Protection for fine jewellery, high horology timepieces and exceptional personal pieces whose value extends far beyond their everyday use.",
    longDescription:
      "High-value watches and bespoke jewellery are portable, highly desirable, and subject to sudden market value fluctuations. Standard home contents policies severely cap single-item jewellery limits and impose restrictive wearing warranties. Private client placement provides worldwide, all-risks cover tailored to active lifestyles.",
    coverageCategories: [
      "Haute Horlogerie & Rare Watches",
      "Fine Jewellery & High Jewellery Collections",
      "Certified Diamonds & Colored Gemstones",
      "Heritage & Antique Pieces",
      "Agreed Value Schedules",
      "Worldwide Wearing & Transit Coverage",
      "Vault & Safe Deposit Deductible Options",
      "Mysterious Disappearance & Accidental Damage"
    ],
    underwritingFactors: [
      {
        title: "Independent Valuations & Appraisals",
        description: "Recent valuation certificates from certified gemologists or horological specialists with serial documentation."
      },
      {
        title: "Storage & Safe Specifications",
        description: "Home safe ratings (EN 1143-1 European grade standards), vault deposit boxes, and alarm link integration."
      },
      {
        title: "Wearing vs. Vault Ratio",
        description: "Establishing flexible terms for pieces worn regularly versus collection items securely stored in banking vaults."
      },
      {
        title: "Travel & International Transit",
        description: "Worldwide unencumbered coverage while travelling, including hotel safe warranties and transit exposure."
      },
      {
        title: "Market Value Inflation & Escalation",
        description: "Automatic appreciation buffers (e.g. up to 125%-150% of insured value) to counteract surging horology market values."
      },
      {
        title: "Pairs & Sets Clause",
        description: "Provisions ensuring full payment for complete sets if an irreplaceable individual item or earring is lost."
      }
    ],
    approachPoints: [
      {
        title: "Agreed Value Scheduling",
        description: "Every significant watch or jewel is itemized on an agreed value basis, removing dispute at the moment of claim."
      },
      {
        title: "Worldwide All-Risks",
        description: "Comprehensive protection against theft, loss, accidental damage and mysterious disappearance globally."
      },
      {
        title: "Discreet Handling",
        description: "Complete privacy of valuation reports and safe locations with encrypted handling of all appraisal files."
      }
    ],
    keyConsiderations: [
      "No burdensome itemized proof of purchase required on agreed schedules",
      "Worldwide protection while worn, travelling, or in transit",
      "Accidental stone loss, bezel damage and bracelet breakage",
      "Pairs and sets settlement clauses",
      "Flexible safe warranty provisions aligned with your lifestyle"
    ],
    seoTitle: "Jewellery & Luxury Watch Insurance | Cristian Văduva",
    seoDescription:
      "Private client insurance advisory for luxury watches, haute horlogerie, fine jewellery and precious gemstones. Worldwide all-risks protection.",
    accentColor: "amber",
    imageAlt: "Haute horlogerie watch movement and fine diamond jewellery craftsmanship",
    assetOptions: ["Luxury Watches", "Fine Jewellery", "Gemstones / Diamonds", "Horology Collection"]
  },

  "fine-art-collectibles": {
    slug: "fine-art-collectibles",
    id: "fine-art-collectibles",
    title: "Fine Art & Collectibles",
    navTitle: "Fine Art & Collectibles",
    badge: "FINE ART & CURATION",
    tagline: "Insurance considerations for collections and individual works.",
    heroIntro:
      "Insurance considerations for collections and individual pieces where valuation, provenance, storage, and movement can materially affect the risk.",
    longDescription:
      "Fine art requires an approach that understands conservation, provenance, and art market dynamics. A physical loss or partial damage to a canvas or sculpture involves not only restoration expenses, but also potential permanent loss of commercial value (depreciation). Our private client advisory structures specialized all-risks fine art coverage.",
    coverageCategories: [
      "Paintings & Works on Canvas",
      "Sculptures & Physical Installations",
      "Contemporary & Conceptual Art",
      "Old Masters & Antiquities",
      "Rare Books & Manuscripts",
      "Wine, Spirits & Cellar Portfolios",
      "Memorabilia & Historical Artifacts",
      "Exhibition, Loan & Transit Risks"
    ],
    underwritingFactors: [
      {
        title: "Provenance, Invoices & Cataloguing",
        description: "Documentation of authenticity, purchase history, condition reports, and gallery cataloguing."
      },
      {
        title: "Environmental & Climate Controls",
        description: "HVAC climate stability, humidity monitoring, UV filtration, fire suppression, and flood elevation."
      },
      {
        title: "Restoration & Depreciation Provisions",
        description: "Covering both the cost of restoration by an approved conservator and the resulting diminution in market value."
      },
      {
        title: "Transit, Packing & Handling",
        description: "White-glove art transit, bespoke crating, courier supervision, and temporary storage during relocation."
      },
      {
        title: "Exhibitions & Museum Loans",
        description: "Door-to-door coverage for items loaned to public institutions, galleries, or international art fairs."
      },
      {
        title: "Defective Title Coverage",
        description: "Protection against legal challenges to ownership arising from historical provenance disputes."
      }
    ],
    approachPoints: [
      {
        title: "Specialist Fine Art Wordings",
        description: "Utilizing wordings crafted specifically for art collectors, covering restoration costs and post-restoration depreciation."
      },
      {
        title: "Curatorial Freedom",
        description: "Flexible arrangements that allow you to display, rotate, or rehang works without cumbersome re-notification burdens."
      },
      {
        title: "Expert Valuation Network",
        description: "Assistance in engaging certified appraisers and conservators recognized by international auction houses."
      }
    ],
    keyConsiderations: [
      "Agreed value basis with automatic coverage for new acquisitions",
      "Physical loss or damage plus commercial depreciation after restoration",
      "Loss of pair or set compensation",
      "Emergency evacuation and professional art rescue coverage",
      "Climate control failure and accidental breakage protection"
    ],
    seoTitle: "Fine Art & Collectibles Insurance | Cristian Văduva",
    seoDescription:
      "Specialist private client insurance for fine art, paintings, sculptures, antiquities and rare collections. All-risks protection and depreciation cover.",
    accentColor: "stone",
    imageAlt: "Museum-grade fine art painting in contemporary gallery setting",
    assetOptions: ["Fine Art", "Sculptures", "Antiques", "Wine & Rare Spirits", "Collectibles"]
  },

  "luxury-homes": {
    slug: "luxury-homes",
    id: "luxury-homes",
    title: "Luxury Homes & Estates",
    navTitle: "Luxury Homes & Estates",
    badge: "PRIME RESIDENCES & ESTATES",
    tagline: "Protection structured around exceptional residences and estates.",
    heroIntro:
      "Protection structured around exceptional residences, valuable contents, architectural uniqueness and the broader risks associated with high-value private properties.",
    longDescription:
      "Prime residential real estate involves bespoke architecture, imported materials, integrated home automation, landscaped grounds, and extensive outbuildings. Standard residential policies fail to calculate true reconstruction costs and restrict coverage on unoccupancy, secondary homes, or high-value contents. We design portfolio policies matching the exact scale of your properties.",
    coverageCategories: [
      "Prime Luxury Residences & Villas",
      "Penthouses & High-End Urban Apartments",
      "Country Estates & Historic Properties",
      "Secondary & International Holiday Homes",
      "High-Value General Contents & Bespoke Interiors",
      "Landscaping, Outbuildings & Leisure Facilities",
      "Domestic Staff & Household Liability",
      "Alternative Accommodation of Equivalent Standard"
    ],
    underwritingFactors: [
      {
        title: "Rebuilding Cost Assessment",
        description: "Appraising true full reconstruction cost, including specialist architectural fees, bespoke materials and heritage requirements."
      },
      {
        title: "Multi-Property Portfolio Structuring",
        description: "Consolidating primary residences, city penthouses and vacation retreats under a unified master policy."
      },
      {
        title: "Home Automation & Security Systems",
        description: "Smart perimeter detection, monitored CCTV, physical barriers, flood sensors and professional security staffing."
      },
      {
        title: "Unoccupancy & Seasonal Tenancy",
        description: "Flexible terms accommodating extended travel, secondary home usage patterns, and seasonal occupancy."
      },
      {
        title: "High-Limit Alternative Accommodation",
        description: "Ensuring living expenses during repair mirror the high standard and location of the original residence."
      },
      {
        title: "Domestic Staff Risks",
        description: "Employer liability and fidelity considerations covering housekeepers, estate managers, private chefs and security teams."
      }
    ],
    approachPoints: [
      {
        title: "Guaranteed Rebuilding Terms",
        description: "Placement with insurers providing extended replacement cost cover to protect against surging construction inflation."
      },
      {
        title: "Single Policy Portfolio",
        description: "One renewal date, one point of contact, and seamless terms across your entire domestic property portfolio."
      },
      {
        title: "On-Site Risk Advisory",
        description: "Professional property risk assessments to identify vulnerability points and negotiate preferential terms."
      }
    ],
    keyConsiderations: [
      "Unlimited or high-limit building cover based on architectural appraisal",
      "Full contents coverage without strict individual item limits",
      "Cover for landscaped gardens, outdoor sculptures, swimming pools and tennis courts",
      "Generous alternative accommodation allowance for extended repairs",
      "Bespoke security and unoccupancy warranty flexibility"
    ],
    seoTitle: "Luxury Home & Estate Insurance | Cristian Văduva",
    seoDescription:
      "Private client insurance advisory for luxury residences, penthouses, country estates and secondary homes. Comprehensive property & contents protection.",
    accentColor: "emerald",
    imageAlt: "Contemporary architectural luxury residence with floor-to-ceiling glass and landscaped grounds",
    assetOptions: ["Luxury Residence", "Penthouse", "Country Estate", "Multiple Properties / Portfolio"]
  },

  collections: {
    slug: "collections",
    id: "collections",
    title: "Personal Collections",
    navTitle: "Personal Collections",
    badge: "BESPOKE CURATION",
    tagline: "A private collection rarely fits into a standard insurance box.",
    heroIntro:
      "A private collection rarely fits into a standard insurance box. Each collection requires its own assessment, inventory protocols and risk architecture.",
    longDescription:
      "Whether you curate exceptional timepieces, rare classic cars, rare vintage wines, historical manuscripts, numismatics, or contemporary design objects, private collections aggregate significant financial and sentimental capital. We structure tailored collection floaters that allow dynamic acquisition additions, agreed value peace of mind, and bespoke security arrangements.",
    coverageCategories: [
      "Multi-Category Mixed Collections",
      "Rare Horology & Pocket Watch Archives",
      "Vintage Automobile Collections",
      "Grand Cru & Rare Wine Cellars",
      "Numismatic & Rare Coin Collections",
      "Antique Arms & Historical Memorabilia",
      "Modern & Contemporary Design Pieces",
      "Dynamic New Acquisition Floaters"
    ],
    underwritingFactors: [
      {
        title: "Cross-Category Inventory Auditing",
        description: "Consolidating diverse asset classes under consistent valuation methodologies and risk management standards."
      },
      {
        title: "Dynamic Acquisition Allowances",
        description: "Automatic temporary coverage for newly acquired collection pieces (e.g. 30–60 days) prior to formal scheduling."
      },
      {
        title: "Specialized Storage & Micro-Environments",
        description: "Temperature-controlled wine cellars, humidity chambers for cigars/instruments, and vault systems."
      },
      {
        title: "Periodic Market Revaluation",
        description: "Establishing scheduled re-appraisal intervals to keep pace with emerging collector market trends."
      },
      {
        title: "Loss of Value & Set Integrity",
        description: "Compensating for the reduction in value of remaining collection pieces if an integral component is damaged."
      },
      {
        title: "Global Relocation & Exhibition",
        description: "Tailored transit riders for rotating collection pieces between private residences, banks, and exhibition spaces."
      }
    ],
    approachPoints: [
      {
        title: "Holistic Collection Review",
        description: "We examine the entire portfolio together, avoiding fragmented policies that create blind spots."
      },
      {
        title: "Automatic Ingestion",
        description: "Structuring generous acquisition floaters so new purchases are instantly protected from auction fall."
      },
      {
        title: "Discreet Documentation",
        description: "Confidential handling of inventory manifests, vault blueprints, and appraisal registries."
      }
    ],
    keyConsiderations: [
      "Single schedule covering diverse multi-category collections",
      "Automatic temporary cover for new auction purchases",
      "Loss of pair, set or series compensation",
      "Climate failure, cellar breakdown and spoilage protection",
      "Worldwide all-risks protection across residential and vault locations"
    ],
    seoTitle: "Private Collection Insurance | Cristian Văduva",
    seoDescription:
      "Specialist private client insurance for valuable personal collections: watches, art, wine, automobiles, and rare collectibles.",
    accentColor: "teal",
    imageAlt: "Curated private collector vault with rare horology and collectible artifacts",
    assetOptions: ["Private Collection", "Watches & Jewellery", "Art & Sculptures", "Wine Cellar", "Collector Automobiles"]
  },

  "private-client-liability": {
    slug: "private-client-liability",
    id: "private-client-liability",
    title: "Private Client Liability",
    navTitle: "Private Client Liability",
    badge: "REPUTATIONAL & ASSET DEFENCE",
    tagline: "Protection structured for individuals with significant personal exposure.",
    heroIntro:
      "Personal and excess liability protection structured for individuals with significant personal exposure, multiple properties and complex holding structures. Available coverage depends on underwriting, policy structure and jurisdiction.",
    longDescription:
      "High net worth individuals, business leaders, and families with public visibility face disproportionate liability risks. A single catastrophic event—on a private property, during recreation, involving domestic staff, or arising from board representation—can threaten substantial personal assets. Private client excess liability provides substantial liability limits above standard personal lines.",
    coverageCategories: [
      "Worldwide Personal Liability",
      "Excess / Umbrella Liability Layers",
      "Property & Estate Owner's Liability",
      "Domestic & Household Staff Employer Liability",
      "Recreational Activity & Sporting Liability",
      "Non-Profit & Charitable Board Exposure",
      "Defamation, Privacy & Reputational Defence",
      "Legal Defence & Advisory Costs"
    ],
    underwritingFactors: [
      {
        title: "Public Profile & Media Exposure",
        description: "Assessing personal visibility, prominence in business or public affairs, and associated litigation risk."
      },
      {
        title: "Property Portfolio & Land Holdings",
        description: "Reviewing swimming pools, equestrian facilities, private docks, and visitor accessibility across estates."
      },
      {
        title: "Domestic Staff Employment",
        description: "Evaluating contracts, health and safety, and employment liability for household staff and security teams."
      },
      {
        title: "Global Travel & Multi-Jurisdictional Exposure",
        description: "Harmonizing liability reach across European, North American and international legal frameworks."
      },
      {
        title: "Underlying Primary Policies",
        description: "Auditing underlying motor, home and marine liability limits to ensure seamless attachment of excess layers."
      },
      {
        title: "Directorships & Advisory Positions",
        description: "Reviewing volunteer, charitable or honorary board roles where corporate D&O may not extend full personal protection."
      }
    ],
    approachPoints: [
      {
        title: "Seamless Excess Layering",
        description: "Constructing excess liability that sits cleanly over underlying auto, home, and yacht primary policies without gaps."
      },
      {
        title: "Worldwide Scope",
        description: "Ensuring your defence and indemnity protection operates wherever your personal and family activities take you."
      },
      {
        title: "Defence Cost Protection",
        description: "Providing substantial resources for top-tier legal representation from the moment a formal claim arises."
      }
    ],
    keyConsiderations: [
      "Substantial personal liability limits (e.g. €5M, €10M+ subject to underwriting)",
      "Worldwide jurisdiction and legal defence costs included",
      "Household staff and domestic employer liability integration",
      "Property owner liability across multiple international residences",
      "Subject to individual underwriting and jurisdictional availability"
    ],
    seoTitle: "Private Client Liability Insurance | Cristian Văduva",
    seoDescription:
      "Private client personal and excess liability insurance advisory for high-net-worth individuals and families. Complex risk and asset protection.",
    accentColor: "slate",
    imageAlt: "Architectural private estate boardroom and advisory consultation setting",
    assetOptions: ["Personal Liability", "Excess / Umbrella Layer", "Domestic Staff Liability", "Estate / Property Liability"]
  }
};

export const privateClientProcess = [
  {
    step: "01",
    name: "DISCOVER",
    title: "Confidential Requirement Audit",
    desc: "We begin with a discreet review of your extraordinary assets, ownership structures, and personal risk profile."
  },
  {
    step: "02",
    name: "ASSESS",
    title: "Specialist Risk & Valuation Appraisal",
    desc: "We evaluate agreed valuations, security measures, storage micro-environments, and cross-border exposures."
  },
  {
    step: "03",
    name: "ADVISE",
    title: "Bespoke Placement Strategy",
    desc: "We construct structured coverage wordings and negotiate terms with leading private client and Lloyd's syndicates."
  },
  {
    step: "04",
    name: "QUOTE",
    title: "Binding Quotation & Active Stewardship",
    desc: "You receive transparent terms with dedicated ongoing management, automatic acquisition riders, and confidential claims support."
  }
];
