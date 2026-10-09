export interface UnderwritingFactor {
  title: string;
  description: string;
  titleRo: string;
  descriptionRo: string;
}

export interface ApproachPoint {
  title: string;
  description: string;
  titleRo: string;
  descriptionRo: string;
}

export interface AdvisorQuestion {
  question: string;
  questionRo: string;
  context: string;
  contextRo: string;
}

export interface PrivateClientCategory {
  slug: string;
  id: string;
  title: string;
  titleRo: string;
  navTitle: string;
  navTitleRo: string;
  badge: string;
  badgeRo: string;
  tagline: string;
  taglineRo: string;
  heroIntro: string;
  heroIntroRo: string;
  longDescription: string;
  longDescriptionRo: string;
  coverageCategories: string[];
  coverageCategoriesRo: string[];
  underwritingFactors: UnderwritingFactor[];
  approachPoints: ApproachPoint[];
  keyConsiderations: string[];
  keyConsiderationsRo: string[];
  advisorQuestions: AdvisorQuestion[];
  requestedDocumentation: string[];
  requestedDocumentationRo: string[];
  commonExclusions: string[];
  commonExclusionsRo: string[];
  seoTitle: string;
  seoTitleRo: string;
  seoDescription: string;
  seoDescriptionRo: string;
  accentColor: string;
  imageAlt: string;
  assetOptions: string[];
  assetOptionsRo: string[];
}

export const privateClientProcess = [
  {
    step: "01",
    name: "Discovery & Valuation",
    nameRo: "Evaluare & Încadrare",
    title: "Portfolio Audit",
    titleRo: "Audit de Patrimoniu",
    desc: "Detailed cataloging of assets, current appraisals, ownership structures, and existing policy terms.",
    descRo: "Inventarierea detaliată a activelor, evaluărilor curente, structurilor de deținere și termenilor polițelor existente."
  },
  {
    step: "02",
    name: "Risk Engineering",
    nameRo: "Analiză de Risc",
    title: "Vulnerability Assessment",
    titleRo: "Evaluare Vulnerabilități",
    desc: "Physical security review, geographical exposure modeling, transit logistics, and operational profile.",
    descRo: "Inspectarea securității fizice, modelarea expunerii geografice, logistica de transport și profilul operațional."
  },
  {
    step: "03",
    name: "Specialist Placement",
    nameRo: "Plasament Specializat",
    title: "Underwriter Negotiation",
    titleRo: "Negociere cu Subscriitori",
    desc: "Bespoke wording negotiation with specialist high-net-worth underwriting syndicates and insurers.",
    descRo: "Negocierea clauzelor specifice cu sindicate și asiguratori specializați pe riscuri de mare valoare."
  },
  {
    step: "04",
    name: "Active Stewardship",
    nameRo: "Asistență Continuă",
    title: "Claims & Portfolio Management",
    titleRo: "Gestiune Daune & Portofoliu",
    desc: "Dedicated discreet claims assistance, annual valuation benchmarking, and immediate coverage adjustments for new acquisitions.",
    descRo: "Asistență discretă dedicată în caz de daună, actualizarea periodică a evaluărilor și adaptarea rapidă a protecției la noi achiziții."
  }
];

export const privateClientCategories: Record<string, PrivateClientCategory> = {
  supercars: {
    slug: "supercars",
    id: "supercars",
    title: "Supercars & High-Value Vehicles",
    titleRo: "Supercar-uri & Automobile de Excepție",
    navTitle: "Supercars & Exotics",
    navTitleRo: "Supercar-uri & Exotice",
    badge: "AUTOMOTIVE PATRIMONY",
    badgeRo: "PATRIMONIU AUTOMOBIL",
    tagline: "Specialist risk architecture for exceptional vehicles and collector assets.",
    taglineRo: "Arhitectură de risc dedicată vehiculelor de înaltă performanță și colecțiilor auto.",
    heroIntro:
      "Specialist insurance considerations for supercars, hypercars, exotic builds, and classic collector automobiles where standard motor schedules cannot reflect real market values or bespoke repair requirements.",
    heroIntroRo:
      "Consultanță de asigurare specializată pentru supercar-uri, hypercar-uri, vehicule exotice și automobile clasice de colecție, unde grilele standard CASCO nu reflectă valoarea reală de piață sau cerințele de reparație OEM.",
    longDescription:
      "High-performance and rare vehicles possess risk profiles and valuation structures that standard motor insurers cannot accurately assess. From bespoke craftsmanship and carbon composites to appreciated collector market valuations and specialized repair logistics, our advisory structures coverage specifically around how the vehicle is owned, stored, and driven. Terms and availability remain subject to individual underwriter review and policy wording.",
    longDescriptionRo:
      "Vehiculele de înaltă performanță și seriile limitate prezintă profiluri de risc și structuri de evaluare pe care asigurătorii standard de masă nu le pot calibra adecvat. De la caroserii din fibră de carbon și componente artizanale, până la cote de piață în creștere și logistică specializată de transport, structurăm protecția în funcție de modul exact în care vehiculul este deținut, garat și utilizat. Termenii depind întotdeauna de subscrierea asiguratorului și formularea exactă a poliței.",
    coverageCategories: [
      "Supercars & Hypercars",
      "High-Performance & GT Vehicles",
      "Classic & Historic Collector Automobiles",
      "Restomod & Bespoke Custom Builds",
      "Multi-Car High-Value Private Collections",
      "Enclosed Transit & Concours Exposure",
      "Agreed Value Endorsement Considerations",
      "Specialist OEM Repair Facility Choice"
    ],
    coverageCategoriesRo: [
      "Supercar-uri & Hypercar-uri",
      "Vehicule de Înaltă Performanță & GT",
      "Automobile Clasice & de Epocă",
      "Construcții Restomod & Personalizate",
      "Colecții Private Multi-Car",
      "Transport în Remorcă Închisă & Evenimente Concours",
      "Clauze de Valoare Agreată (Agreed Value)",
      "Alegerea Service-ului Autorizat de Producător (OEM)"
    ],
    underwritingFactors: [
      {
        title: "Agreed Valuation & Market Movement",
        titleRo: "Valoare Agreată & Dinamica Pieței",
        description: "Establishing fixed, pre-agreed values reflecting actual replacement or verified collector auction benchmarks rather than book depreciation.",
        descriptionRo: "Stabilirea unei valori agreate fixe, bazate pe expertize autorizate și cote reale de licitație, evitând tabelele standard de depreciere contabilă."
      },
      {
        title: "Ownership & Registration Entities",
        titleRo: "Structura Deținerii & Înmatriculării",
        description: "Reviewing coverage alignment across corporate holding entities, private leasing, family trusts, or cross-border registration jurisdictions.",
        descriptionRo: "Corelarea acoperirii în funcție de deținerea pe persoană fizică, societate comercială, leasing financiar sau structuri transfrontaliere."
      },
      {
        title: "Usage Profiles & Restricted Mileage",
        titleRo: "Profilul de Utilizare & Kilometraj",
        description: "Structuring terms around seasonal private driving, collection storage, or restricted mileage agreements.",
        descriptionRo: "Diferențierea termenilor pentru utilizare ocazională de weekend, garare de colecție sau rulaj limitat agreat contractual."
      },
      {
        title: "Garaging & Security Architecture",
        titleRo: "Garare & Sisteme de Securitate",
        description: "Assessing physical garaging, automated fire suppression, monitored telemetry, and satellite tracking systems.",
        descriptionRo: "Evaluarea garării în spațiu securizat, a sistemelor anti-incendiu dedicate, monitorizării GPS active și pazei perimetrale."
      },
      {
        title: "Authorized Factory Repair Logistics",
        titleRo: "Reparații în Centre Autorizate de Fabrică",
        description: "Ensuring claims clauses preserve the right to use official manufacturer workshops and original OEM carbon/mechanical parts.",
        descriptionRo: "Verificarea dreptului contractual de a efectua reparațiile exclusiv în ateliere agreate de producător, cu piese de origine OEM."
      },
      {
        title: "Transit & Transportation Exposure",
        titleRo: "Transport & Logistică Dedicată",
        description: "Covering risks during professional transport to official service hubs, track exhibitions, or European rallies.",
        descriptionRo: "Acoperirea riscurilor în timpul transportului pe platforme închise către revizii oficiale, evenimente de profil sau expoziții internaționale."
      }
    ],
    approachPoints: [
      {
        title: "Individual Risk Profiling",
        titleRo: "Profilare Individuală a Riscului",
        description: "We avoid automated mass-market rating matrices, structuring terms specifically for high-net-worth vehicle assets.",
        descriptionRo: "Evităm algoritmii de masă rigizi, structurând dosarul de asigurare în raport cu specificațiile exacte ale vehiculului."
      },
      {
        title: "Valuation Documentation Review",
        titleRo: "Verificarea Documentației de Evaluare",
        description: "We coordinate with recognized automotive evaluators to support underwriting submissions.",
        descriptionRo: "Colaborăm cu experți independenți și evaluatori autorizați pentru fundamentarea valorilor asigurate."
      },
      {
        title: "Confidential Advisory",
        titleRo: "Consultanță Confidențială",
        description: "Vehicle storage locations, registration details, and client identity remain strictly protected.",
        descriptionRo: "Locația garării, datele de înmatriculare și identitatea proprietarului sunt tratate cu maximă discreție."
      }
    ],
    keyConsiderations: [
      "Explicit confirmation of agreed value without unagreed depreciation schedules",
      "Pre-authorized manufacturer specialist repair facility clauses",
      "Geographical driving limits across European and international territories",
      "Enclosed trailer transport and concierge transit provisions",
      "Multi-vehicle consolidation under a single coordinated schedule"
    ],
    keyConsiderationsRo: [
      "Confirmarea explicită a valorii agreate, fără aplicarea tabelelor de uzură standard",
      "Dreptul de a efectua reparațiile în rețeaua oficială a mărcii (ex: Ferrari, Porsche, Lamborghini)",
      "Extinderea teritorială completă pentru deplasări europene și internaționale",
      "Acoperirea riscurilor în timpul transportului pe platformă închisă",
      "Consolidarea mai multor vehicule de colecție într-un singur dosar administrativ"
    ],
    advisorQuestions: [
      {
        question: "Is track driving or closed-circuit exhibition covered?",
        questionRo: "Sunt acoperite evenimentele pe circuit închis sau raliurile de regularitate?",
        context: "Most standard policies strictly exclude closed-circuit events unless explicitly endorsed by specialist underwriters.",
        contextRo: "Majoritatea polițelor standard exclud strict evenimentele pe circuit, cu excepția cazului în care există o clauză specială negociată."
      },
      {
        question: "How is total loss compensated: market value or agreed appraisal?",
        questionRo: "Cum se calculează dauna totală: pe baza valorii de catalog sau a valorii agreate din raport?",
        context: "Clarifying whether compensation relies on depreciated book tables or a fixed certified valuation certificate.",
        contextRo: "Este esențial de știut dacă despăgubirea se raportează la un tabel de depreciere sau la valoarea fixă convenită la emitere."
      },
      {
        question: "Are named drivers strictly required or is open driving permitted?",
        questionRo: "Sunt impuși doar șoferi nominalizați sau este permisă conducerea ocazională?",
        context: "High-power vehicles often have minimum driver age, experience, and named-driver endorsements in the policy wording.",
        contextRo: "Vehiculele de mare putere pot include cerințe de vârstă minimă, experiență la volan sau clauze stricte privind șoferii nominalizați."
      }
    ],
    requestedDocumentation: [
      "Official vehicle registration and certificate of conformity",
      "Recent independent valuation report (for classic or appreciated builds)",
      "Documentation of security equipment (GPS telemetry, immoblizers, facility security)",
      "Service history and official maintenance log"
    ],
    requestedDocumentationRo: [
      "Certificat de înmatriculare și carte de identitate a vehiculului",
      "Raport recent de expertiză / evaluare autorizată (pentru modele rare sau clasice)",
      "Confirmarea sistemelor de securitate (sistem GPS monitorizat, garare securizată)",
      "Istoric complet de service și mentenanță la reprezentanță autorizată"
    ],
    commonExclusions: [
      "Competitive racing, timed events, or unauthorized track sessions",
      "Gradual mechanical breakdown, normal wear and tear, and cosmetic weathering",
      "Unattended vehicle theft where keys or tracking fobs were left inside",
      "Driving outside agreed territorial or geographical zones without prior notification"
    ],
    commonExclusionsRo: [
      "Curse de viteză, competiții cronometrate sau sesiuni de circuit neautorizate expres",
      "Uzura mecanică normală, defecte de fabricație sau degradarea treptată a finisajelor",
      "Furtul vehiculului nesupravegheat dacă cheile sau transponderul au fost lăsate la bord",
      "Deplasarea în afara limitelor teritoriale agreate fără notificare prealabilă"
    ],
    seoTitle: "Supercar & Exotic Car Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Supercar & Automobile Exotice | Cristian Văduva Private Client",
    seoDescription:
      "Private client insurance advisory for supercars, hypercars, exotic and classic collector vehicles. Specialist risk structuring and agreed value considerations.",
    seoDescriptionRo:
      "Consultanță specializată de asigurare pentru supercar-uri, hypercar-uri și colecții auto de lux. Structurarea valorii agreate și protecție dedicată patrimoniului automobilistic.",
    accentColor: "slate",
    imageAlt: "Supercar aerodynamic lines and composite materials detail",
    assetOptions: [
      "Modern Supercar / Hypercar",
      "High-Performance GT / Saloon",
      "Classic / Vintage Collector Automobile",
      "Restomod / Bespoke Coachbuilt Vehicle",
      "Multi-Car Private Collection"
    ],
    assetOptionsRo: [
      "Supercar Modern / Hypercar",
      "Automobil GT / Sedan de Înaltă Performanță",
      "Automobil Clasic / de Colecție",
      "Vehicul Restomod / Caroserie Personalizată",
      "Colecție Auto Privată Multi-Car"
    ]
  },

  yachts: {
    slug: "yachts",
    id: "yachts",
    title: "Yachts & Marine Assets",
    titleRo: "Iahturi & Ambarcațiuni Maritime",
    navTitle: "Yachts & Marine",
    navTitleRo: "Iahturi & Marină",
    badge: "MARITIME ADVISORY",
    badgeRo: "PATRIMONIU MARITIM",
    tagline: "Marine hull, machinery, and protection & indemnity risk structuring.",
    taglineRo: "Protecție structurală pentru corp navă, mașini, echipaj și răspundere maritimă.",
    heroIntro:
      "Comprehensive advisory for motor yachts, sailing vessels, catamarans, and superyachts operating across European waters, the Mediterranean basin, and international cruising grounds.",
    heroIntroRo:
      "Consultanță tehnică de asigurare pentru iahturi cu motor, veliere, catamarane și superiahturi care navighează în ape europene, bazinul mediteranean și rute internaționale.",
    longDescription:
      "Maritime assets present multi-faceted risk exposure spanning navigation limits, mooring safety, salvage commitments, environmental liability, and crew welfare. We structure coverage addressing hull & machinery, comprehensive P&I (Protection & Indemnity), tender vessels, water-sports liability, and winter storage protocols, subject to vessel survey and underwriter acceptance.",
    longDescriptionRo:
      "Ambarcațiunile de agrement și superiahturile implică riscuri complexe: limite de navigație, siguranța la dană, operațiuni de salvare, poluare accidentală și protecția echipajului. Structurăm polițe pentru corp și motor (Hull & Machinery), răspundere civilă maritimă (P&I), ambarcațiuni auxiliare (tenders) și iernare la uscat, în baza rapoartelor de inspecție navală și subscrierii specializate.",
    coverageCategories: [
      "Hull & Machinery (H&M) Protection",
      "Protection & Indemnity (P&I) Third-Party Liability",
      "Crew Welfare, Medical & Employer Liability",
      "Tender Boats, Jet Skis & Water Toys",
      "Pollution & Wreck Removal Indemnity",
      "Mooring, Marina Berth & Dry Dock Wintering",
      "Charter Liability (Private vs Commercial Use)",
      "Salvage & Emergency Towing Provisions"
    ],
    coverageCategoriesRo: [
      "Asigurare Corp & Motoare (Hull & Machinery)",
      "Răspundere Civilă Maritimă (P&I / Third-Party Liability)",
      "Protecția Echipajului & Răspunderea Armatorului",
      "Ambarcațiuni Auxiliare (Tender), Jet-Ski & Toys",
      "Cheltuieli de Poluare & Îndepărtare a Epavei",
      "Dană, Marină Privată & Iernare la Uscat",
      "Utilizare Privată vs Utilizare în Regim Charter",
      "Asistență la Salvare & Remorcaj Maritim"
    ],
    underwritingFactors: [
      {
        title: "Navigation Limits & Cruising Grounds",
        titleRo: "Zone de Navigație & Limite Geografice",
        description: "Defining authorized waters (e.g. Mediterranean, Black Sea, Caribbean) and seasonal transit schedules.",
        descriptionRo: "Delimitarea apelor autorizate pentru navigație (Marea Mediterană, Marea Neagră, Atlantic) și a perioadelor sezoniere."
      },
      {
        title: "Vessel Survey & Classification",
        titleRo: "Inspecție Tehnică (Survey) & Clasă",
        description: "Reviewing independent marine survey reports, hull condition, maintenance logs, and registry flag requirements.",
        descriptionRo: "Analiza raportului de survey maritim, stării corpului navei, registrelor de pavilion și istoricului de mentenanță."
      },
      {
        title: "Skipper & Crew Qualifications",
        titleRo: "Calificarea Skipper-ului & Echipajului",
        description: "Assessing skipper certification (e.g. RYA Yachtmaster, commercial endorsements) and permanent crew contracts.",
        descriptionRo: "Evaluarea brevetelor de căpitan/skipper, a experienței pe tipul respectiv de navă și a contractelor echipajului."
      },
      {
        title: "Mooring Protocols & Winter Lay-Up",
        titleRo: "Regim de Acostare & Iernare",
        description: "Evaluating marina contract terms, swinging moorings, typhoon/cyclone seasonal plans, and dry dock storage.",
        descriptionRo: "Verificarea contractelor de marină, a condițiilor de acostare și a măsurilor de protecție pe perioada iernării."
      }
    ],
    approachPoints: [
      {
        title: "Marine Wording Precision",
        titleRo: "Claritate în Clauzele Maritime",
        description: "We review Institute Yacht Clauses and bespoke wordings to eliminate ambiguous seaworthiness exclusions.",
        descriptionRo: "Analizăm clauzele internaționale (Institute Yacht Clauses) pentru a preveni excluderile legate de navigabilitate."
      },
      {
        title: "Flag & Registry Alignment",
        titleRo: "Corelare cu Pavilionul & Jurisdicția",
        description: "Structuring coverage compliant with EU maritime directives, Red Ensign flags, and local port authority mandates.",
        descriptionRo: "Asigurăm conformitatea cu cerințele autorităților portuare, pavilionul navei și normele maritime internaționale."
      },
      {
        title: "Emergency Salvage Coordination",
        titleRo: "Consultanță în Situații de Salvare",
        description: "Advising on standard Lloyd's Open Form (LOF) provisions and emergency salvage liabilities.",
        descriptionRo: "Consiliere privind contractele standard de salvare (Lloyd's Open Form) și limitarea costurilor de remorcaj."
      }
    ],
    keyConsiderations: [
      "Institute Yacht Clauses (IYC) vs proprietary underwriter conditions",
      "P&I liability limits matching major Mediterranean and international marina requirements",
      "Agreed value hull basis without unagreed deduction for 'new for old' parts",
      "Charter extension clauses if the yacht is occasionally chartered out",
      "Tender and water toy liability extended beyond the parent vessel"
    ],
    keyConsiderationsRo: [
      "Analiza clauzelor standard internaționale (Institute Yacht Clauses) vs clauze specifice",
      "Limite P&I conforme cu cerințele marineler de prestigiu din Mediterană",
      "Valoare agreată pentru corp și motoare fără aplicarea principiului 'nou pentru vechi'",
      "Extindere pentru charter ocazional dacă nava generează venituri",
      "Acoperirea ambarcațiunilor auxiliare și jucăriilor nautice în afara corpului principal"
    ],
    advisorQuestions: [
      {
        question: "Does the policy require a professional skipper or allow bareboat operation?",
        questionRo: "Polița impune căpitan profesionist atestat sau permite navigația de către proprietar?",
        context: "Policies for vessels over certain lengths or engine power specify mandatory crew requirements in the schedule.",
        contextRo: "Pentru ambarcațiuni peste anumite dimensiuni sau puteri, asiguratorii specifică obligativitatea echipajului calificat."
      },
      {
        question: "Are salvage awards and environmental wreck removal covered without sub-limits?",
        questionRo: "Cheltuielile de salvare și îndepărtare a epavei sunt incluse la limita totală?",
        context: "Marina regulations often demand proof of unlimited wreck removal and anti-pollution indemnity.",
        contextRo: "Regulamentele marineler moderne cer frecvent dovada acoperirii costurilor de ranfluare și depoluare fără sub-limite reduse."
      }
    ],
    requestedDocumentation: [
      "Vessel registration / Certificate of Registry",
      "Recent out-of-water marine survey report",
      "Skipper / captain resume and nautical qualifications",
      "Marina mooring agreement and winter storage contract"
    ],
    requestedDocumentationRo: [
      "Certificat de ambarcațiune / Act de naționalitate",
      "Raport recent de survey naval (cu inspecție la uscat a corpului)",
      "Brevet de navigație și CV maritim al căpitanului",
      "Contract de închiriere a locului de dană și contract de iernare"
    ],
    commonExclusions: [
      "Sailing outside agreed geographical navigation zones without insurer endorsement",
      "Gradual osmosis, corrosion, wear and tear, and lack of reasonable maintenance",
      "Named windstorms in designated hurricane/typhoon zones during exclusion seasons",
      "Unlicensed commercial chartering when insured strictly on a private pleasure basis"
    ],
    commonExclusionsRo: [
      "Navigația în afara zonelor maritime agreate fără avizul asiguratorului",
      "Osmoza treptată, coroziunea marină și degradarea din lipsă de întreținere periodică",
      "Furtuni sezoniere în zone tropicale restricționate în perioada de risc",
      "Utilizarea comercială în regim charter dacă nava este asigurată strict pentru agrement privat"
    ],
    seoTitle: "Yacht & Marine Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Iahturi & Ambarcațiuni Maritime | Cristian Văduva Private Client",
    seoDescription:
      "Private client marine insurance advisory for motor yachts, sailing boats, and superyachts. Hull & machinery, P&I liability, and bespoke navigation terms.",
    seoDescriptionRo:
      "Consultanță dedicată pentru asigurarea iahturilor cu motor, velierelor și ambarcațiunilor de lux. Asigurare CASCO maritim (H&M), răspundere civilă P&I și navigație internațională.",
    accentColor: "blue",
    imageAlt: "Yacht bow slicing through blue open water at sunset",
    assetOptions: [
      "Motor Yacht (12m - 24m)",
      "Superyacht (> 24m)",
      "Sailing Yacht / Catamaran",
      "High-Performance Powerboat",
      "Multi-Vessel Marine Portfolio"
    ],
    assetOptionsRo: [
      "Iaht cu Motor (12m - 24m)",
      "Superiaht (> 24m)",
      "Velier / Catamaran",
      "Ambarcațiune Sportivă de Mare Viteză",
      "Portofoliu Maritim Mixt"
    ]
  },

  "private-aviation": {
    slug: "private-aviation",
    id: "private-aviation",
    title: "Private Aviation & Aircraft",
    titleRo: "Aviație Privată & Aeronave",
    navTitle: "Private Aviation",
    navTitleRo: "Aviație Privată",
    badge: "AVIATION PATRIMONY",
    badgeRo: "PATRIMONIU AERIAN",
    tagline: "Aviation hull, spares, passenger liability, and third-party risk advisory.",
    taglineRo: "Protecție structurală pentru corp aeronavă, piese de schimb și răspundere aeronautică.",
    heroIntro:
      "Specialist risk advisory for private jets, turboprops, helicopters, and fractional aircraft holdings, aligned with European Aviation Safety Agency (EASA) and international standards.",
    heroIntroRo:
      "Consultanță de specialitate pentru avioane private, turbopropulsoare, elicoptere și cote de proprietate fracționată, în deplină conformitate cu reglementările EASA și normele internaționale.",
    longDescription:
      "Aviation risk encompasses substantial hull values, complex maintenance agreements, pilot flight hour requirements, and strict international third-party passenger liabilities. We help owners, corporate flight departments, and family offices review aviation policies covering Hull All Risks, Hull War, spares, crew personal accident, and comprehensive Third-Party / Passenger Legal Liability.",
    longDescriptionRo:
      "Riscurile aeronautice implică valori ridicate ale celulei și motoarelor, contracte complexe de mentenanță (PBH / CAMO), cerințe stricte de experiență a piloților și răspunderi civile internaționale față de terți și pasageri. Asistăm proprietarii și departamentele de zbor în structurarea polițelor de Corp Aeronavă (Hull All Risks), Război & Confiscare (Hull War), piese de schimb și răspundere aeronautică extinsă.",
    coverageCategories: [
      "Aircraft Hull All Risks (Ground & In-Flight)",
      "Hull War, Hijacking & Extortion Endorsement",
      "Third-Party & Passenger Legal Liability (Combined Single Limit)",
      "Spare Engines, Avionics & Parts Coverage",
      "Pilot & Crew Personal Accident Indemnity",
      "Hangar & Ground Handling Liability",
      "Premises, Products & Hangar Keepers Coverage",
      "Medical Evacuation & Repatriation Endorsements"
    ],
    coverageCategoriesRo: [
      "Corp Aeronavă la Sol & în Zbor (Hull All Risks)",
      "Riscuri de Război, Deturnare & Confiscare (Hull War)",
      "Răspundere Față de Terți & Pasageri (Combined Single Limit - CSL)",
      "Motoare de Schimb, Avionică & Piese de Rezervă",
      "Accidente Personale pentru Piloți & Echipaj",
      "Răspundere în Hangar & Deservire la Sol",
      "Asigurare Răspundere Hangar Keepers",
      "Evacuare Medicală de Urgență & Repatriere"
    ],
    underwritingFactors: [
      {
        title: "Aircraft Specifications & Airworthiness",
        titleRo: "Specificații Tehnice & Navigabilitate",
        description: "Assessing manufacturer (e.g. Gulfstream, Bombardier, Pilatus), total airframe hours, avionics suite, and CAMO management.",
        descriptionRo: "Evaluarea producătorului, orelor totale de zbor ale celulei, motoarelor, suitei de avionică și a organizației de mentenanță (CAMO)."
      },
      {
        title: "Pilot Qualification & Flight Experience",
        titleRo: "Calificarea & Experiența Piloților",
        description: "Reviewing type ratings, annual simulator recurrent training, captain total hours, and hours on specific aircraft make/model.",
        descriptionRo: "Verificarea calificării de tip (Type Rating), antrenamentului periodic pe simulator, orelor totale și orelor pe tipul respectiv de aeronavă."
      },
      {
        title: "Geographical Territory & Operations",
        titleRo: "Teritoriu Geografic & Tip de Operațiuni",
        description: "Evaluating authorized flight corridors, high-risk airspaces, unpaved runway usage, and international overflight permits.",
        descriptionRo: "Delimitarea rutelor autorizate de zbor, a zborurilor transatlantice, utilizării pistelor neamenajate și a zonelor de risc geopolitic."
      }
    ],
    approachPoints: [
      {
        title: "CSL Liability Optimization",
        titleRo: "Optimizarea Limitei Globale CSL",
        description: "We verify that Combined Single Limits (CSL) meet or exceed EC 785/2004 requirements and corporate risk appetite.",
        descriptionRo: "Verificăm dacă limitele de răspundere respectă Regulamentul European EC 785/2004 și cerințele zborurilor internaționale."
      },
      {
        title: "Agreed Value Aircraft Basis",
        titleRo: "Valoare Agreată pe Corp Aeronavă",
        description: "Structuring agreed valuation endorsements aligned with current market values and engine program balances.",
        descriptionRo: "Structurarea valorii agreate corelate cu starea tehnică reală și programele de mentenanță a motoarelor (ex: ESP, JSSI)."
      }
    ],
    keyConsiderations: [
      "Compliance with EU Regulation (EC) No 785/2004 mandatory liability minimums",
      "Engine maintenance program integration (e.g. Rolls-Royce CorporateCare, Pratt & Whitney ESP)",
      "Pilot warranty clauses regarding recurrent training and minimum time-on-type",
      "Hull War and political risk inclusions for cross-border international itineraries"
    ],
    keyConsiderationsRo: [
      "Conformitate cu Regulamentul European (CE) Nr. 785/2004 privind limitele minime obligatorii",
      "Corelarea cu programele de mentenanță a motoarelor (ex: Rolls-Royce CorporateCare, Pratt & Whitney)",
      "Clauze privind calificarea piloților și obligativitatea simulatorului anual",
      "Includerea riscurilor de război și confiscare pentru zboruri internaționale"
    ],
    advisorQuestions: [
      {
        question: "Does the policy maintain open pilot warranty or strict named-pilot requirements?",
        questionRo: "Polița include o clauză de piloți aprobați generic (Open Pilot Warranty) sau impune doar piloți nominalizați?",
        context: "Understanding whether replacement or freelance pilots can operate the aircraft without prior insurer endorsement.",
        contextRo: "Este esențial de știut dacă piloții freelance pot opera zborul fără aprobare scrisă prealabilă de la asigurator."
      }
    ],
    requestedDocumentation: [
      "Certificate of Airworthiness (C of A) and Air Registration Certificate",
      "Pilot licenses, medical certificates, and recent simulator training records",
      "CAMO maintenance status report and engine program agreement details"
    ],
    requestedDocumentationRo: [
      "Certificat de Navigabilitate (C of A) și Certificat de Înmatriculare",
      "Licențe de zbor, certificate medicale și adeverințe de antrenament pe simulator",
      "Raport de la organizația de management a navigabilității (CAMO) și situația motoarelor"
    ],
    commonExclusions: [
      "Flights operated by pilots who do not satisfy the pilot warranty training requirements",
      "Operations in internationally sanctioned airspaces or declared war zones without endorsement",
      "Wear and tear, metal fatigue, and gradual degradation not caused by an insured peril"
    ],
    commonExclusionsRo: [
      "Zboruri efectuate de echipaje care nu îndeplinesc cerințele din clauza de piloți a poliței",
      "Operarea în spații aeriene supuse sancțiunilor internaționale fără acord expres",
      "Uzură mecanică treptată, coroziune sau oboseală a materialului neprovocate de un incident asigurat"
    ],
    seoTitle: "Private Aviation & Jet Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Aviație Privată & Elicoptere | Cristian Văduva Private Client",
    seoDescription:
      "Private client aviation insurance advisory for private jets, turboprops, helicopters, and corporate aircraft. Hull all risks, spares, and CSL liability.",
    seoDescriptionRo:
      "Consultanță de asigurare pentru avioane private, turbopropulsoare și elicoptere. Asigurare Corp Aeronavă, piese de schimb și răspundere aeronautică civilă.",
    accentColor: "sky",
    imageAlt: "Private jet cockpit avionics and turbine engine profile",
    assetOptions: [
      "Light / Midsize Business Jet",
      "Long-Range / Heavy Business Jet",
      "Turboprop Aircraft",
      "Twin-Engine / Single-Engine Helicopter",
      "Fractional Ownership Aircraft Share"
    ],
    assetOptionsRo: [
      "Avion Privat Ușor / Mediu (Light/Midsize Jet)",
      "Avion Privat Long-Range (Heavy Jet)",
      "Aeronava Turbopropulsor",
      "Elicopter Bimotor / Monomotor",
      "Cotă de Proprietate Fracționată (Fractional Share)"
    ]
  },

  "jewellery-watches": {
    slug: "jewellery-watches",
    id: "jewellery-watches",
    title: "Jewellery & Luxury Watches",
    titleRo: "Bijuterii & Ceasuri de Lux",
    navTitle: "Jewellery & Watches",
    navTitleRo: "Bijuterii & Ceasuri",
    badge: "HOROLOGY & HIGH JEWELLERY",
    badgeRo: "OROLOGERIE & BIJUTERII",
    tagline: "Worldwide, agreed-value protection for rare horology and high jewellery.",
    taglineRo: "Protecție la valoare agreată, cu acoperire mondială, pentru ceasuri rare și bijuterii fine.",
    heroIntro:
      "Specialist advisory for haute horlogerie, vintage collectible timepieces, rare gemstones, and high jewellery portfolios that exceed the sub-limits of traditional home policies.",
    heroIntroRo:
      "Consultanță specializată pentru piese de înaltă orologerie, ceasuri rare de colecție, diamante și bijuterii prețioase care depășesc limitele reduse ale polițelor standard de locuință.",
    longDescription:
      "Standard residential policies frequently cap jewellery and watch claims to nominal amounts, enforce restrictive safe-storage conditions, or apply standard depreciation. We help collectors structure standalone or endorsed High-Net-Worth policies providing worldwide all-risks cover, agreed valuation without excess, accidental damage protection, and coverage for items while worn, in transit, or on exhibition.",
    longDescriptionRo:
      "Polițele standard de locuință plafonează frecvent bunurile de valoare la sume modeste, impun condiții nerealiste de păstrare în seif sau aplică deprecieri. Structurăm polițe dedicate pentru clienți privați, care oferă acoperire mondială All Risks, valoare agreată fără franșiză la furt, protecție la daune accidentale și acoperire completă când piesele sunt purtate, în călătorie sau la evenimente.",
    coverageCategories: [
      "Haute Horlogerie & Independent Watchmakers",
      "Vintage & Discontinued Collectible Timepieces",
      "High Jewellery & Rare Gemstones",
      "Worldwide All-Risks Cover (While Worn & In Transit)",
      "Agreed Value / Certified Appraisal Endorsements",
      "Accidental Damage, Glass Breakage & Loss of Stone",
      "Unspecified Floater Allowances for New Acquisitions",
      "Vault Storage & Safe Depository Discount Options"
    ],
    coverageCategoriesRo: [
      "Ceasuri de Înaltă Orologerie & Mărci Independente",
      "Piese Vintage & Modele de Colecție Scoase din Producție",
      "Bijuterii Fine, Diamante & Pietre Prețioase",
      "Acoperire Mondială All-Risks (Purtare & Călătorii)",
      "Clauză de Valoare Agreată / Raport de Expertiză Certificat",
      "Deteriorare Accidentală, Spargerea Geamului & Pierderea Pietrei",
      "Marjă Automată de Acoperire pentru Noi Achiziții (Floater)",
      "Opțiuni de Reducere pentru Păstrare în Seif Bancar / Casă de Valori"
    ],
    underwritingFactors: [
      {
        title: "Certified Appraisal & Invoicing",
        titleRo: "Evaluare Certificată & Documente de Achiziție",
        description: "Establishing value via official certificates of authenticity, manufacturer archives, and recognized horological appraisals.",
        descriptionRo: "Fundamentarea valorii pe baza certificatelor de origine, extraselor de arhivă ale manufacturilor și evaluărilor de specialitate."
      },
      {
        title: "Safe & Security Specifications",
        titleRo: "Specificații Seif & Măsuri de Securitate",
        description: "Assessing home safe ratings (e.g. Eurograde I–V), monitored alarm integration, and dual-custody bank vaults.",
        descriptionRo: "Evaluarea clasei de securitate a seifului de la domiciliu (Eurograde), a senzorilor seismici și a păstrării în casete de valori."
      },
      {
        title: "Wearing Habits & Travel Profile",
        titleRo: "Obiceiuri de Purtare & Profil de Călătorie",
        description: "Reviewing whether items are worn internationally, kept in hotel safes, or transported in hand luggage.",
        descriptionRo: "Stabilirea termenilor când piesele sunt purtate în călătorii internaționale, păstrate în seiful camerei de hotel sau transportate în bagajul de mână."
      }
    ],
    approachPoints: [
      {
        title: "No-Depreciation Guarantee",
        titleRo: "Valoare Agreată fără Depreciere",
        description: "We negotiate agreed value schedules ensuring market-appreciation pieces are compensated at certified value.",
        descriptionRo: "Structurăm liste de valori agreate, asigurând compensarea corectă pentru ceasurile cu cerere ridicată pe piața secundară."
      },
      {
        title: "Automatic Cover for New Acquisitions",
        titleRo: "Acoperire Automată pentru Noi Achiziții",
        description: "Specialist policies provide automatic temporary cover (e.g. up to 25% for 30–60 days) for newly acquired pieces.",
        descriptionRo: "Polițele dedicate oferă o marjă de acoperire automată temporară (ex: 25% timp de 30-60 de zile) pentru piesele nou achiziționate."
      }
    ],
    keyConsiderations: [
      "Worldwide all-risks territory without restrictive travel warranties",
      "No compulsory safe-storage warranty when items are being actively worn or used",
      "Pairs and sets clause ensuring total settlement if one earring or component is lost",
      "Restoration and authorized manufacture service centre clauses"
    ],
    keyConsiderationsRo: [
      "Teritoriu de acoperire mondial All-Risks, fără restricții rigide de călătorie",
      "Lipsa clauzelor abuzive de 'păstrare obligatorie în seif' atunci când piesa este purtată",
      "Clauza de seturi și perechi (acoperire totală dacă o componentă dintr-un set este irecuperabilă)",
      "Dreptul de a trimite ceasul pentru restaurare direct la manufactura de origine din Elveția"
    ],
    advisorQuestions: [
      {
        question: "Does the policy require items above a specific value to be locked in a safe when not worn?",
        questionRo: "Polița impune păstrarea în seif a pieselor peste o anumită valoare atunci când nu sunt purtate?",
        context: "Reviewing specific safe warranty thresholds prevents claim denials following home burglary.",
        contextRo: "Verificarea pragului valoric de la care este obligatoriu seiful certificat previne refuzul despăgubirii în caz de efracție."
      }
    ],
    requestedDocumentation: [
      "Sales invoices or official certificates of authenticity (Box & Papers)",
      "Recent valuation certificates from accredited gemologists or watch specialists",
      "Photographs of serial numbers, hallmarks, and reference numbers"
    ],
    requestedDocumentationRo: [
      "Facturi de achiziție sau certificate de autenticitate (Cutie & Acte / Extrase de arhivă)",
      "Rapoarte recente de evaluare de la gemologi sau experți orologeri autorizați",
      "Fotografii de detaliu cu seriile carcasei, mecanismului și poansoanele metalului prețios"
    ],
    commonExclusions: [
      "Mysterious disappearance where no plausible circumstance or time of loss can be established",
      "Damage caused by unauthorized repairers or amateur attempts at servicing",
      "Checking jewellery in hold luggage on commercial airlines (must be in hand luggage)"
    ],
    commonExclusionsRo: [
      "Dispariție misterioasă neexplicată, fără circumstanțe clare ale evenimentului",
      "Daune provocate de intervenții neautorizate sau reparații necalificate",
      "Lăsarea bijuteriilor în bagajul de cală al companiilor aeriene (este obligatoriu bagajul de mână)"
    ],
    seoTitle: "Luxury Watch & Jewellery Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Ceasuri de Lux & Bijuterii | Cristian Văduva Private Client",
    seoDescription:
      "Private client insurance advisory for haute horlogerie, vintage watches, diamonds, and high jewellery. Worldwide agreed value and all-risks protection.",
    seoDescriptionRo:
      "Consultanță de asigurare pentru ceasuri de colecție, orologerie de lux și bijuterii cu diamante. Acoperire All Risks la valoare agreată în întreaga lume.",
    accentColor: "amber",
    imageAlt: "Haute horlogerie balance wheel and hand-finished movement detail",
    assetOptions: [
      "Watch Collection (Haute Horlogerie)",
      "Single High-Value Timepiece",
      "High Jewellery & Diamond Portfolio",
      "Combined Jewellery & Watch Collection",
      "Historical / Vintage Collector Pieces"
    ],
    assetOptionsRo: [
      "Colecție de Ceasuri (Haute Horlogerie)",
      "Piesă Individuală de Foarte Mare Valoare",
      "Portofoliu Bijuterii Fine & Diamante",
      "Colecție Mixtă Ceasuri & Bijuterii",
      "Piese Istorice / Vintage de Colecție"
    ]
  },

  "fine-art-collectibles": {
    slug: "fine-art-collectibles",
    id: "fine-art-collectibles",
    title: "Fine Art & Collectibles",
    titleRo: "Artă Plastică & Obiecte de Colecție",
    navTitle: "Fine Art & Art",
    navTitleRo: "Artă & Colecții",
    badge: "FINE ART & CURATION",
    badgeRo: "ARTĂ & PATRIMONIU CULTURAL",
    tagline: "All-risks protection for paintings, sculpture, antiques, and rare collections.",
    taglineRo: "Protecție All-Risks pentru tablouri, sculptură, antichități și colecții de patrimoniu.",
    heroIntro:
      "Specialist insurance advisory for private collectors, family foundations, and estates holding master paintings, contemporary art, sculpture, manuscripts, and rare antiquities.",
    heroIntroRo:
      "Consultanță dedicată colecționarilor privați, fundațiilor de familie și galeriilor private pentru pictură clasică și contemporană, sculptură, manuscrise și antichități valoroase.",
    longDescription:
      "Fine art requires distinct underwriting approaches: physical damage during transit, environmental fluctuations, restoration valuation depreciation, and Title/Provenance dispute exposure. We structure policies that provide Wall-to-Wall all-risks cover, professional conservation expense reimbursement, loss-in-value compensation following partial restoration, and automatic transit protections.",
    longDescriptionRo:
      "Operele de artă necesită o abordare specifică de subscriere: riscuri de transport și manipulare, fluctuații de microclimat, deprecierea valorii artistice după restaurare și riscuri de proveniență. Structurăm polițe 'Wall-to-Wall' All Risks care acoperă conservarea profesională, pierderea de valoare estetică după restaurare și extinderea automată în timpul împrumuturilor la expoziții.",
    coverageCategories: [
      "Paintings, Drawings & Mixed Media Masterpieces",
      "Sculptures, Installations & Monumental Works",
      "Antique Furniture, Rare Books & Manuscripts",
      "Wall-to-Wall Transit, Exhibition & Loan Coverage",
      "Defective Title & Provenance Legal Defense Considerations",
      "Depreciation Indemnity Following Partial Physical Damage",
      "Emergency Evacuation & Specialist Restoration Fees",
      "New Acquisition Automatic Ingestion Cover"
    ],
    coverageCategoriesRo: [
      "Picturi, Desene & Capodopere Mixte",
      "Sculpturi, Instalații & Lucrări Monumentale",
      "Mobilier de Epocă, Cărți Rare & Manuscrise",
      "Acoperire 'Wall-to-Wall' (Tranzit, Expoziții & Împrumuturi)",
      "Protecție la Vicii de Titlu & Drept de Proveniență",
      "Despăgubire pentru Deprecierea Artistică după Restaurare",
      "Evacuare de Urgență & Onorarii de Restaurare Specializată",
      "Protecție Automată pentru Achiziții Noi la Licitații"
    ],
    underwritingFactors: [
      {
        title: "Provenance & Authenticity Verification",
        titleRo: "Proveniență & Autenticitate",
        description: "Reviewing certificates of authenticity, catalogue raisonné references, exhibition history, and invoice records.",
        descriptionRo: "Verificarea certificatelor de autenticitate, mențiunilor în cataloagele raisonné, istoricului expozițional și facturilor de la case de licitație."
      },
      {
        title: "Display Environment & Climate Control",
        titleRo: "Mediu de Expunere & Controlul Climatului",
        description: "Assessing ambient temperature stability, UV glazing, moisture barrier systems, and distance from plumbing lines.",
        descriptionRo: "Evaluarea stabilității termohigrometrice, a sticlei de protecție UV, a barierei anti-umezeală și a distanței față de instalațiile sanitare."
      },
      {
        title: "Handling & Professional Packing Protocols",
        titleRo: "Protocoale de Manipulare & Ambalare",
        description: "Requiring certified art handlers and climate-controlled bespoke crating for international transit or loans.",
        descriptionRo: "Utilizarea companiilor specializate în transport de artă, cu lăzi climatizate confecționate pe măsură."
      }
    ],
    approachPoints: [
      {
        title: "Depreciation Protection (Loss in Value)",
        titleRo: "Compensarea Pierderii de Valoare (Loss in Value)",
        description: "If an artwork is damaged and restored, specialist policies pay both the restoration cost and the resulting loss in market value.",
        descriptionRo: "Dacă o operă este restaurată în urma unei daune, polița achită atât costul restaurării, cât și deprecierea cotei de piață rezultate."
      },
      {
        title: "Defective Title Defense",
        titleRo: "Consultanță privind Viciile de Titlu",
        description: "Protection against legal costs should a historical ownership claim arise regarding an acquired work.",
        descriptionRo: "Acoperirea cheltuielilor de apărare juridică dacă apar revendicări istorice privind titlul de proprietate al unei lucrări achiziționate."
      }
    ],
    keyConsiderations: [
      "Wall-to-Wall coverage extending from sender's premises through transit to installation",
      "Right to choose independent qualified art restorers rather than insurer-selected general contractors",
      "Automatic temporary increase in sum insured for auction purchases",
      "Smoke, water damage, and accidental drop protection while on display"
    ],
    keyConsiderationsRo: [
      "Acoperire de la 'perete la perete' (Wall-to-Wall), de la preluare, pe durata tranzitului și până la fixarea pe perete",
      "Dreptul de a desemna restauratori de artă independenți atestați de Ministerul Culturii / instituții internaționale",
      "Majorare temporară automată a sumei asigurate pentru lucrări proaspăt adjudecate la licitație",
      "Protecție la fum, infiltrații de apă și desprindere accidentală de pe simeză"
    ],
    advisorQuestions: [
      {
        question: "Does the policy pay for diminished market value following expert restoration?",
        questionRo: "Polița acoperă deprecierea valorii de piață dacă tabloul restaurat își pierde din cota inițială?",
        context: "Standard property policies only pay repair costs; fine art policies include loss-of-value indemnity.",
        contextRo: "Polițele standard achită doar factura restauratorului, în timp ce polițele de artă compensează și pierderea de valoare de colecție."
      }
    ],
    requestedDocumentation: [
      "Catalogue provenance documentation or certificate from recognized art expert",
      "Independent appraisal or auction house purchase invoice",
      "Condition report prepared prior to transit or major loans"
    ],
    requestedDocumentationRo: [
      "Documentație de proveniență, catalog sau expertiză de la un critic/expert de artă autorizat",
      "Factură de achiziție de la casa de licitații (ex: Artmark, Sotheby's, Christie's) sau raport de evaluare",
      "Raport de stare de conservare (Condition Report) întocmit înainte de transport sau împrumut"
    ],
    commonExclusions: [
      "Gradual deterioration, inherent vice, fading from direct unshielded sunlight, and biological mould",
      "Damage caused by cleaning, restoration or framing conducted by unqualified individuals",
      "Losses arising during transit where non-specialist courier services were utilized"
    ],
    commonExclusionsRo: [
      "Degradare naturală treptată, viciu propriu al materialului, decolorare de la soare și mucegai",
      "Daune produse în timpul curățării, restaurării sau înrămării de către persoane neautorizate",
      "Daune produse în timpul transportului dacă s-au utilizat firme de curierat generalist în loc de transportatori de artă"
    ],
    seoTitle: "Fine Art & Collectibles Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Artă & Obiecte de Colecție | Cristian Văduva Private Client",
    seoDescription:
      "Private client fine art insurance advisory for paintings, sculpture, antiques, and collections. Wall-to-wall transit, loss-in-value, and restoration cover.",
    seoDescriptionRo:
      "Consultanță dedicată pentru asigurarea operelor de artă, sculpturilor, picturilor de patrimoniu și antichităților. Acoperire All Risks, transport securizat și depreciere artistică.",
    accentColor: "rose",
    imageAlt: "Contemporary sculpture texture and museum-grade lighting detail",
    assetOptions: [
      "Private Fine Art Collection (Paintings & Sculpture)",
      "Single Masterpiece / High-Value Artwork",
      "Antiquities, Rare Books & Manuscripts",
      "Corporate / Foundation Art Holdings",
      "Exhibition & Museum Loan Portfolio"
    ],
    assetOptionsRo: [
      "Colecție Privată de Artă (Pictură & Sculptură)",
      "Operă de Artă Individuală de Mare Valoare",
      "Antichități, Cărți Rare & Manuscrise",
      "Portofoliu de Artă al unei Companii sau Fundații",
      "Opere Destinate Expozițiilor sau Împrumuturilor Muzeale"
    ]
  },

  "luxury-homes": {
    slug: "luxury-homes",
    id: "luxury-homes",
    title: "Luxury Homes & Estates",
    titleRo: "Reședințe de Lux & Domenii Private",
    navTitle: "Luxury Homes & Estates",
    navTitleRo: "Reședințe & Domenii",
    badge: "ESTATE ARCHITECTURE",
    badgeRo: "PATRIMONIU IMOBILIAR",
    tagline: "Comprehensive risk engineering for prime residences, villas, and multi-property estates.",
    taglineRo: "Inginerie de risc și protecție extinsă pentru vile de lux, domenii private și reședințe multiple.",
    heroIntro:
      "High-value residential properties feature bespoke architectural finishes, smart building automation, landscaped grounds, outbuildings, and fine interior fit-outs that standard homeowner policies fail to reconstruct accurately.",
    heroIntroRo:
      "Proprietățile rezidențiale de prestigiu integrează finisaje arhitecturale de lux, automatizări inteligente, parcuri private și dependințe pe care polițele standard de locuință nu le pot reconstrui la standardul inițial.",
    longDescription:
      "A luxury home is rarely a standard brick-and-mortar structure. Imported marbles, custom millwork, integrated wellness spas, home cinemas, and historical heritage elements require guaranteed rebuilding costs without average-clause penalization. We structure High-Net-Worth homeowner policies covering alternative accommodation of equal standard, landscape rebuilding, subsidence, and comprehensive domestic liability.",
    longDescriptionRo:
      "O reședință premium implică materiale nobile (marmură masivă, tâmplării artizanale), facilități wellness, sisteme smart-home și amenajări peisagistice complexe. Structurăm polițe pentru proprietăți de lux care garantează costul real de reconstrucție fără aplicarea regulii proporționale (subasigurare), asigură cazare alternativă la standard echivalent și acoperă grădinile amenajate și dependințele.",
    coverageCategories: [
      "Comprehensive Rebuilding Cost Basis (No Average Clause Penalty)",
      "Historic, Heritage & Listed Architectural Fit-Outs",
      "Landscaping, Mature Trees, Pools & External Pavilions",
      "Smart-Home Automation, Geothermal & Solar Infrastructure",
      "Equal-Standard Alternative Accommodation During Repairs",
      "Water Ingress, Trace & Access Pipe Investigation Expenses",
      "Domestic Staff Employers & Public Property Liability",
      "Multi-Property Portfolios Under a Master Schedule"
    ],
    coverageCategoriesRo: [
      "Reconstrucție la Cost Real fără Aplicarea Regulii Proporționale",
      "Finisaje Arhitecturale Premium & Imobile cu Valoare de Patrimoniu",
      "Amenajări Peisagistice, Copaci Maturați, Piscine & Pavilioane",
      "Sisteme Smart Home, Pompe de Căldură & Panouri Solare",
      "Locuință Alternativă la Standard Similar pe Durata Reparațiilor",
      "Localizarea și Repararea Scurgerilor de Apă (Trace & Access)",
      "Răspunderea Proprietarului Față de Terți & Personalul Casnic",
      "Consolidarea Portofoliilor Imobiliare Multiple într-o Singură Poliță"
    ],
    underwritingFactors: [
      {
        title: "Guaranteed Rebuilding Cost Appraisal",
        titleRo: "Evaluarea Costului Real de Reconstrucție",
        description: "Calculating full reconstruction costs including debris clearance, architect fees, and specialized craftsmen labor rates.",
        descriptionRo: "Calcularea costului total de reconstrucție, incluzând onorariile de arhitectură, proiectare și manopera meșterilor specializați."
      },
      {
        title: "Smart Water Leak Telemetry & Security",
        titleRo: "Sisteme Inteligente Anti-Inundație & Securitate",
        description: "Assessing automatic water shut-off valves, thermal sensors, 24/7 monitored alarms, and perimeter CCTV.",
        descriptionRo: "Evaluarea electrovalvelor automate de oprire a apei, senzorilor de inundație, camerelor CCTV și pazei permanente."
      },
      {
        title: "Outbuildings, Pools & Complex Fixtures",
        titleRo: "Dependințe, Piscine & Instalații Speciale",
        description: "Including guest houses, security lodges, tennis courts, wine cellars, and spa pavilions within the schedule.",
        descriptionRo: "Includerea în poliță a caselor de oaspeți, foișoarelor, piscinelor încălzite, cramelor și terenurilor de sport."
      }
    ],
    approachPoints: [
      {
        title: "No Under-Insurance Penalty",
        titleRo: "Eliminarea Clauzei de Subasigurare",
        description: "High-net-worth policies eliminate proportional deduction clauses when property appraisals are maintained.",
        descriptionRo: "Polițele private client elimină regula proporțională dacă evaluarea inițială a fost agreată cu asigurătorul."
      },
      {
        title: "Trace & Access Coverage",
        titleRo: "Acoperire Extinsă 'Trace & Access'",
        description: "Full reimbursement for the cost of opening walls and floors to locate hidden pipe leaks, plus full restoration.",
        descriptionRo: "Decontarea integrală a costurilor de spargere a pereților sau pardoselilor pentru localizarea avariilor ascunse și refacerea finisajelor."
      }
    ],
    keyConsiderations: [
      "Rebuilding value calculated on bespoke architectural reconstruction rather than standard square-meter averages",
      "Unrestricted alternative accommodation allowing the family to rent a comparable luxury residence",
      "Comprehensive underground service and geothermal installation coverage",
      "Worldwide cover for contents temporarily removed from the premises"
    ],
    keyConsiderationsRo: [
      "Valoare de reconstrucție calculată pe baza finisajelor reale, nu pe medii statistice generice pe metru pătrat",
      "Buget generos de relocare care permite închirierea unei vile de lux similare pe durata renovărilor majore",
      "Protecția branșamentelor subterane, a forajelor geotermale și a instalațiilor exterioare",
      "Acoperire pentru bunurile personale mutate temporar în altă locație (ex: la reședința de vacanță)"
    ],
    advisorQuestions: [
      {
        question: "Does the policy provide extended alternative accommodation with no restrictive time limits?",
        questionRo: "Polița asigură cazare alternativă de lux pe o perioadă suficientă (12–24 luni) în cazul unei daune majore?",
        context: "Major rebuilds of luxury properties often take 18–24 months due to custom materials and permitting.",
        contextRo: "Reconstrucția unei proprietăți premium poate dura 18-24 de luni din cauza materialelor speciale importate și avizelor."
      }
    ],
    requestedDocumentation: [
      "Architectural plans, cadastral documentation, and recent construction evaluation",
      "Security system configuration certificate (Alarm, CCTV, automatic perimeter gates)",
      "Details of specialized installations (Smart home, generator, water filtration, spa)"
    ],
    requestedDocumentationRo: [
      "Planuri de arhitectură, documentație cadastrală și deviz de finisaje / raport de evaluare",
      "Certificat de conformitate pentru sistemul de securitate și monitorizare 24/7",
      "Lista echipamentelor speciale (pompe de căldură, generator de rezervă, sistem smart-home)"
    ],
    commonExclusions: [
      "Normal settlement, ground movement without catastrophic subsidence, and structural shrinkage",
      "Damage caused by gradual dampness, condensation or lack of basic maintenance",
      "Unoccupied property exclusions if the home is vacant for over 60 days without notification"
    ],
    commonExclusionsRo: [
      "Tasarea normală a terenului, crăpături minore de așezare a clădirii fără alunecare de teren",
      "Igrasie, condens și daune produse de lipsa încălzirii pe timp de iarnă",
      "Excluderi specifice dacă proprietatea rămâne neocupată peste 60 de zile consecutive fără notificare"
    ],
    seoTitle: "Luxury Home & Estate Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Reședințe de Lux & Domenii Private | Cristian Văduva Private Client",
    seoDescription:
      "Private client estate insurance advisory for luxury villas, prime penthouses, and heritage residences. Guaranteed rebuilding cost and trace & access cover.",
    seoDescriptionRo:
      "Consultanță de asigurare pentru vile de lux, penthouse-uri și domenii rezidențiale. Reconstrucție la valoare reală, fără subasigurare, și protecție completă a patrimoniului imobiliar.",
    accentColor: "emerald",
    imageAlt: "Contemporary architectural villa facade with reflective swimming pool",
    assetOptions: [
      "Luxury Villa / Prime Detached Residence",
      "Penthouse / Prime Urban Apartment",
      "Historic / Heritage Manor House",
      "Country Estate with Multiple Outbuildings",
      "Multi-Property Residential Portfolio"
    ],
    assetOptionsRo: [
      "Vilă de Lux / Reședință Individuală Premium",
      "Penthouse / Apartament Urban de Prestigiu",
      "Conac Istoric / Imobil cu Valoare de Patrimoniu",
      "Domeniu Privat cu Dependințe & Parcuri",
      "Portofoliu Rezidențial Multi-Proprietate"
    ]
  },

  collections: {
    slug: "collections",
    id: "collections",
    title: "Personal Collections & Rare Assets",
    titleRo: "Colecții Private & Active Rare",
    navTitle: "Collections & Assets",
    navTitleRo: "Colecții & Bunuri",
    badge: "COLLECTOR PATRIMONY",
    badgeRo: "PATRIMONIU DE COLECȚIE",
    tagline: "Tailored protection for rare wine cellars, musical instruments, coins, and bespoke assets.",
    taglineRo: "Protecție personalizată pentru crame de colecție, instrumente muzicale rare, numismatică și active unice.",
    heroIntro:
      "Dedicated risk solutions for specialized passions: grand cru wine cellars, rare musical instruments, collectible coins, stamps, historical arms, sports memorabilia, and bespoke luxury assets.",
    heroIntroRo:
      "Soluții de protecție dedicate pasiunilor de mare valoare: crame de vinuri de colecție, instrumente muzicale rare, numismatică, filatelie, arme de colecție și memorabilitate sportivă.",
    longDescription:
      "Passionate collecting often creates concentrated financial values with unique vulnerabilities. A wine cellar requires temperature failure and label damage coverage; a Stradivarius or master cello requires tone loss protection; numismatic collections require transit and exhibition clauses. We structure policies that recognize the intrinsic collector value of these specialized assets.",
    longDescriptionRo:
      "Colecțiile private concentrează valori patrimoniale considerabile, având riscuri specifice: o cramă rară necesită protecție la defectarea instalației de climatizare și deteriorarea etichetelor; un instrument muzical de maestru necesită acoperire pentru deprecierea acustică în caz de fisură; colecțiile numismatice au nevoie de clauze pentru transport. Structurăm polițe care recunosc valoarea reală de colecție.",
    coverageCategories: [
      "Fine Wine Cellars & Rare Spirits (Temperature Failure & Breakage)",
      "Master Musical Instruments (Violins, Cellos, Pianos)",
      "Numismatic (Coins), Medals & Rare Currency Collections",
      "Philatelic (Stamps) & Historical Document Archives",
      "Sporting Guns, Bespoke Firearms & Antique Militaria",
      "Sports Memorabilia, Cinema & Cultural Collectibles",
      "Transit & Exhibition Loan Floaters",
      "Agreed Inventory Schedule with Annual Indexation"
    ],
    coverageCategoriesRo: [
      "Crame de Vinuri Fine & Băuturi Rare (Defectare Climatizare & Spargere)",
      "Instrumente Muzicale de Maestru (Viori, Violoncele, Piane de Concert)",
      "Colecții Numismatice (Monede de Aur, Monede Antice & Bancnote)",
      "Filatelie & Arhive de Documente Istorice",
      "Arme de Vânătoare Artizanale & Antichități Militare",
      "Memorabilitate Sportivă & Obiecte de Cultură Pop",
      "Acoperire pentru Transport, Expoziții & Evaluări",
      "Inventar Agreat cu Clauză de Indexare Periodică"
    ],
    underwritingFactors: [
      {
        title: "Cellar Telemetry & Climate Control",
        titleRo: "Monitorizarea Temperaturii & Umidității",
        description: "Assessing backup cooling systems, generator integration, and temperature fluctuation telemetry for fine wines.",
        descriptionRo: "Evaluarea sistemelor de climatizare redundante, a generatoarelor de urgență și senzorilor de temperatură pentru crame."
      },
      {
        title: "Inventory Cataloging & Certification",
        titleRo: "Catalogarea & Certificarea Inventarului",
        description: "Maintaining itemized schedules with bottle numbers, provenance invoices, instrument certificates, or grading slabs.",
        descriptionRo: "Menținerea listelor detaliate cu numere de inventar, certificate de autenticitate (ex: NGC/PCGS pentru monede) și facturi de proveniență."
      }
    ],
    approachPoints: [
      {
        title: "Label & Bottle Damage Protection",
        titleRo: "Protecția Etichetelor & Integrității Sticlelor",
        description: "Covers the loss in value if fine wine labels are damaged by cellar moisture or accidental water ingress.",
        descriptionRo: "Acoperirea pierderii de valoare dacă etichetele vinurilor de colecție sunt distruse de umiditate sau infiltrații de apă."
      },
      {
        title: "Musical Instrument Acoustic Loss Cover",
        titleRo: "Deprecierea Sonorității Instrumentelor Muzicale",
        description: "Covers depreciation if a restored master instrument loses its historical acoustic brilliance following a repair.",
        descriptionRo: "Despăgubire pentru diminuarea calităților acustice ale unui instrument istoric restaurat în urma unui accident."
      }
    ],
    keyConsiderations: [
      "Bottle breakage during handling and accidental temperature spoilage",
      "Worldwide transit coverage for musical instruments traveling with musicians",
      "Loss of market value following physical repairs to collectible items",
      "Simplified schedule updates for active collector acquisitions"
    ],
    keyConsiderationsRo: [
      "Spargerea accidentală a sticlelor în timpul manipulării și alterarea vinului din cauza căderii climatizării",
      "Acoperire mondială în timpul deplasărilor pentru instrumente muzicale de concert",
      "Despăgubire pentru diminuarea valorii de colecție în urma reparațiilor fizice",
      "Procedură simplificată de actualizare a listei la fiecare nouă achiziție"
    ],
    advisorQuestions: [
      {
        question: "Does the policy cover temperature spoilage if the cooling unit fails mechanically?",
        questionRo: "Polița acoperă alterarea vinurilor în cazul opririi accidentale a instalației de răcire?",
        context: "Standard policies exclude temperature change unless caused by a specific fire or storm peril.",
        contextRo: "Polițele standard exclud variațiile de temperatură dacă nu sunt cauzate de un incendiu sau dezastru exterior."
      }
    ],
    requestedDocumentation: [
      "Detailed inventory schedule with valuation and item descriptions",
      "Purchase invoices, auction house lot sheets, or recognized grading certificates",
      "Security description for the dedicated storage facility or collection room"
    ],
    requestedDocumentationRo: [
      "Inventar detaliat al colecției cu descrieri, cote și fotografii",
      "Facturi de achiziție, fișe de licitație sau certificate de gradare recunoscute",
      "Descrierea măsurilor de securitate din camera de colecție sau crama privată"
    ],
    commonExclusions: [
      "Natural cork failure, ullage, weeping, and gradual biochemical maturation of wine",
      "Wear and tear, string breakage, and climatic wood movement of musical instruments",
      "Gradual oxidation, fading or discoloration from normal ambient light exposure"
    ],
    commonExclusionsRo: [
      "Degradarea naturală a dopului de plută, scăderea nivelului din sticlă (ullage) și maturarea biochimică normală",
      "Ruperea corzilor, uzura normală a tastierei sau a mecanismelor instrumentelor",
      "Oxidarea lentă, decolorarea naturală sau degradarea produsă de lumina ambientală"
    ],
    seoTitle: "Collector & Rare Asset Insurance Advisory | Cristian Văduva",
    seoTitleRo: "Asigurare Colecții Private & Vinuri Fine | Cristian Văduva Private Client",
    seoDescription:
      "Private client insurance advisory for fine wine cellars, musical instruments, coins, and unique collectibles. Agreed value and specialist all-risks terms.",
    seoDescriptionRo:
      "Consultanță de asigurare pentru crame de vinuri de colecție, instrumente muzicale de maestru, monede rare și active de patrimoniu. Acoperire All Risks la valoare convenită.",
    accentColor: "purple",
    imageAlt: "Rare wine cellar bottles and illuminated oak storage casks",
    assetOptions: [
      "Fine Wine Cellar / Rare Spirits Collection",
      "Master Musical Instruments (Violin / Cello / Piano)",
      "Numismatic / Rare Coin & Medal Collection",
      "Rare Books, Manuscripts & Philatelic Archive",
      "Historical Weapons / Bespoke Hunting Arms"
    ],
    assetOptionsRo: [
      "Cramă de Vinuri de Colecție & Băuturi Rare",
      "Instrumente Muzicale de Maestru (Vioară, Violoncel, Pian)",
      "Colecție Numismatică / Monede & Medalii Rare",
      "Cărți Rare, Manuscrise & Arhivă Filatelică",
      "Arme de Vânătoare Artizanale / Piese Istorice"
    ]
  },

  "private-client-liability": {
    slug: "private-client-liability",
    id: "private-client-liability",
    title: "Private Client & Lifestyle Liability",
    titleRo: "Răspundere Civilă & Stil de Viață",
    navTitle: "Private Liability",
    navTitleRo: "Răspundere Civilă",
    badge: "PATRIMONY PROTECTION",
    badgeRo: "PROTECȚIA PATRIMONIULUI",
    tagline: "High-limit personal umbrella liability, domestic staff, and reputational defense.",
    taglineRo: "Protecție extinsă de răspundere civilă personală, personal casnic și apărare juridică.",
    heroIntro:
      "High-profile individuals and families face magnified liability exposures where a single unforeseen accident, property incident, or domestic dispute can trigger substantial multi-million compensation claims.",
    heroIntroRo:
      "Persoanele cu un patrimoniu important și familiile acestora sunt expuse unor riscuri juridice majore, unde un accident neprevăzut sau un litigiu legat de proprietăți poate genera pretenții financiare substanțiale.",
    longDescription:
      "Standard civil liability policies included in basic homeowner contracts feature low statutory caps (e.g. 50,000–100,000 EUR) that are entirely inadequate for serious bodily injury claims or cross-border disputes. We structure High-Net-Worth Umbrella Liability programs providing comprehensive limits (e.g. 5,000,000 to 20,000,000+ EUR), domestic employer's liability, worldwide jurisdiction, and specialized legal defense support.",
    longDescriptionRo:
      "Polițele standard de răspundere civilă au plafoane modeste (50.000–100.000 EUR), total insuficiente în fața unor vătămări corporale grave sau litigii internaționale. Structurăm programe de tip 'Umbrella Liability' cu limite substanțiale (5.000.000 - 20.000.000+ EUR), care acoperă răspunderea pentru personalul casnic (menajere, șoferi, gărzi de corp), jurisdicția mondială și costurile de asistență juridică de elită.",
    coverageCategories: [
      "High-Limit Worldwide Personal Umbrella Liability",
      "Domestic Staff Employer's Liability (Housekeepers, Drivers, Security)",
      "Tenant & Landlord Property Damage Liabilities",
      "Watercraft & Recreational Vehicle Excess Liability",
      "Equestrian, Hunting & Sporting Activity Liability",
      "Children & Student Family Liability (Abroad & Domestic)",
      "Legal Defense & Defamation Defense Coverage Considerations",
      "Crisis Management & Identity Theft Mitigation Endorsements"
    ],
    coverageCategoriesRo: [
      "Polițe 'Umbrella Liability' cu Limite Extinse la Nivel Mondial",
      "Răspunderea Angajatorului pentru Personalul Casnic (Șoferi, Menaj, Pază)",
      "Răspunderea Proprietarului & Chiriașului pentru Daune la Imobil",
      "Extindere de Răspundere pentru Ambarcațiuni & Vehicule de Agrement",
      "Răspundere pentru Activități Ecvestre, Vânătoare & Sporturi",
      "Răspunderea Familiei pentru Copii / Studenți Aflați la Studii în Străinătate",
      "Cheltuieli de Apărare Juridică & Asistență Reputațională",
      "Consultanță în Managementul Crizelor & Protecția Identității"
    ],
    underwritingFactors: [
      {
        title: "Underlying Policy Foundation Review",
        titleRo: "Analiza Polițelor Primare Existente",
        description: "Ensuring primary auto, home, and boat liability limits meet umbrella underwriter threshold requirements.",
        descriptionRo: "Verificarea limitelor minime din polițele de bază (CASCO, locuință, iaht) necesare pentru activarea poliței Umbrella."
      },
      {
        title: "Domestic Staff & Direct Contractors",
        titleRo: "Personal Casnic & Contractori Direcți",
        description: "Assessing employment contracts, health & safety protocols for drivers, chefs, housekeepers, and security teams.",
        descriptionRo: "Evaluarea contractelor de muncă și a măsurilor de protecție pentru șoferi, personal de securitate și menaj."
      },
      {
        title: "High-Risk Sporting & Lifestyle Activities",
        titleRo: "Sporturi & Activități cu Grad Ridicat de Risc",
        description: "Reviewing equestrian stables, hunting syndicates, yacht charters, and private airfield operations.",
        descriptionRo: "Analiza activităților de echitație, partidelor de vânătoare, deținerii de ambarcațiuni și a evenimentelor private."
      }
    ],
    approachPoints: [
      {
        title: "Worldwide Jurisdiction Coverage",
        titleRo: "Acoperire cu Jurisdicție Mondială",
        description: "Coverage extends across worldwide jurisdictions, protecting assets against foreign lawsuits and cross-border claims.",
        descriptionRo: "Acoperirea este valabilă la nivel mondial, protejând patrimoniul împotriva acțiunilor în instanță din jurisdicții străine."
      },
      {
        title: "Independent Legal Representation",
        titleRo: "Alegerea Avocaților de Apărare",
        description: "Specialist underwriters support the engagement of top-tier legal counsel to defend complex liability claims.",
        descriptionRo: "Asiguratorii specializați permit implicarea avocaților de top pentru gestionarea litigiilor complexe."
      }
    ],
    keyConsiderations: [
      "Excess liability limits sitting above standard home and motor policy ceilings",
      "Protection for board directorships of non-profit or charitable foundations",
      "Worldwide coverage for children studying at international universities",
      "Defense costs paid in addition to the liability indemnity limit"
    ],
    keyConsiderationsRo: [
      "Limite suplimentare de răspundere care intervin peste plafoanele polițelor de locuință și auto",
      "Protecție pentru participarea în consilii de administrație ale fundațiilor caritabile sau ONG-urilor",
      "Acoperire mondială pentru copiii aflați la studii în străinătate",
      "Onorariile avocaților de apărare decontate în plus față de limita principală de despăgubire"
    ],
    advisorQuestions: [
      {
        question: "Are defense costs included inside the policy limit or paid in addition to it?",
        questionRo: "Costurile de apărare juridică sunt incluse în limita poliței sau se plătesc în plus?",
        context: "In complex litigation, legal fees can consume significant capital before any settlement is reached.",
        contextRo: "În litigiile complexe, onorariile caselor de avocatură pot epuiza o mare parte din limită dacă nu sunt plătite separat."
      }
    ],
    requestedDocumentation: [
      "Schedule of primary liability policies (Homeowners, Motor, Watercraft)",
      "Number and role summary of domestic employees",
      "Overview of lifestyle assets (Stables, boats, private properties held)"
    ],
    requestedDocumentationRo: [
      "Lista polițelor primare de răspundere existente (Locuință, CASCO/RCA, Ambarcațiuni)",
      "Numărul și rolul angajaților casnici (șoferi, personal de îngrijire, menaj)",
      "Sumar al proprietăților deținute și activităților speciale (cai de rasă, ambarcațiuni)"
    ],
    commonExclusions: [
      "Pure commercial / corporate business liabilities (requires commercial CGL / D&O policy)",
      "Intentional, fraudulent or criminal acts committed by the insured",
      "Contractual liability assumed voluntarily without legal obligation"
    ],
    commonExclusionsRo: [
      "Răspunderi comerciale din activitatea firmelor (necesită polițe distincte de răspundere profesională / D&O)",
      "Fapte intenționate, dolosive sau penale comise de asigurat",
      "Răspunderi asumate voluntar prin contracte fără o obligație legală preexistentă"
    ],
    seoTitle: "Private Client Umbrella & Personal Liability | Cristian Văduva",
    seoTitleRo: "Asigurare Răspundere Civilă Private Client | Cristian Văduva",
    seoDescription:
      "Private client umbrella liability insurance advisory for high-net-worth individuals, domestic employers, and family estates. High limits and worldwide defense.",
    seoDescriptionRo:
      "Consultanță de asigurare pentru răspundere civilă extinsă (Umbrella Liability), personal casnic și protecție patrimonială. Limite ridicate și acoperire mondială.",
    accentColor: "indigo",
    imageAlt: "Architectural modern estate gates and security perimeter lighting",
    assetOptions: [
      "High-Limit Umbrella Liability Program",
      "Domestic Staff Employer's Liability",
      "Equestrian & Estate Liability Structure",
      "International Family & Student Liability",
      "Comprehensive Lifestyle Risk Review"
    ],
    assetOptionsRo: [
      "Program 'Umbrella Liability' cu Limite Ridicate",
      "Răspunderea Angajatorului pentru Personal Casnic",
      "Răspundere pentru Domenii Private & Activități Ecvestre",
      "Răspundere pentru Membrii Familiei Aflați în Străinătate",
      "Audit Complet de Răspundere Civilă & Stil de Viață"
    ]
  }
};
