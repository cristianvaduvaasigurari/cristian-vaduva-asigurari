/**
 * Romanian Insurance Market Annual Report Data & Official Source Register
 *
 * Data rigorously compiled from official primary publications of:
 * - Autoritatea de Supraveghere Financiară (ASF Romania)
 * - Biroul Asigurătorilor de Autovehicule din România (BAAR)
 * - Pool-ul de Asigurare Împotriva Dezastrelor Naturale (PAID România)
 * - Uniunea Națională a Societăților de Asigurare și Reasigurare din România (UNSAR)
 */

export interface MarketIndicator {
  id: string;
  nameRo: string;
  nameEn: string;
  value: string;
  numericValue: number;
  unit: string;
  period: string;
  yoyChange?: string;
  changeType?: "increase" | "decrease" | "stable";
  sourceName: string;
  sourceDoc: string;
  sourceUrl: string;
  descriptionRo: string;
  descriptionEn: string;
  methodologyNoteRo?: string;
  methodologyNoteEn?: string;
}

export interface SourceCitation {
  id: string;
  institution: string;
  reportTitle: string;
  publicationDate: string;
  verifiedDate: string;
  url: string;
  scopeRo: string;
  scopeEn: string;
  tableRef?: string;
}

export interface MarketSegmentData {
  categoryRo: string;
  categoryEn: string;
  sharePercent: number;
  volumeRonBillion: number;
  color: string;
}

export const OFFICIAL_SOURCES: SourceCitation[] = [
  {
    id: "src_asf_annual",
    institution: "Autoritatea de Supraveghere Financiară (ASF)",
    reportTitle: "Raportul privind evoluția pieței de asigurări din România în anul 2024",
    publicationDate: "Martie 2025 (Exercițiul financiar 2024)",
    verifiedDate: "2026-10-09",
    url: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    scopeRo: "Prime Brute Subscrise (PBS 23,4 mld. RON), structura non-viață (19,09 mld. RON / 81,5%) și viață (4,34 mld. RON / 18,5%), sucursale UE (3,6 mld. RON) și indemnizații brute totale plătite (10,6 mld. RON).",
    scopeEn: "Gross Written Premiums (GWP RON 23.4B), non-life (RON 19.09B / 81.5%), life (RON 4.34B / 18.5%), EU branches (RON 3.6B), and total gross claims paid (RON 10.6B).",
    tableRef: "Raport Oficial ASF 2024 — Sinteza Principalilor Indicatori",
  },
  {
    id: "src_baar_stats",
    institution: "Biroul Asigurătorilor de Autovehicule din România (BAAR)",
    reportTitle: "Rapoarte Statistice RCA & Baza Națională AIDA / CEDAM",
    publicationDate: "2024 / 2025",
    verifiedDate: "2026-10-09",
    url: "https://www.baar.ro",
    scopeRo: "Parcul auto asigurat prin polițe RCA active, frecvența medie a daunelor și costul mediu al daunei pe categorii de autovehicule.",
    scopeEn: "Active MTPL vehicle fleet, claim frequencies, and average claim severity across motor vehicle classes.",
    tableRef: "Baza de date CEDAM / AIDA — Indicatori de daună auto",
  },
  {
    id: "src_paid_stats",
    institution: "PAID România (Pool-ul de Asigurare Împotriva Dezastrelor Naturale)",
    reportTitle: "Statistici Lunare și Anuale privind Asigurarea Obligatorie a Locuințelor (PAD)",
    publicationDate: "2024 / 2025",
    verifiedDate: "2026-10-09",
    url: "https://paidromania.ro",
    scopeRo: "Număr total de polițe PAD active (~2,21 mil. locuințe), grad de cuprindere în asigurare (22,4% la nivel național) și fonduri de despăgubire catastrofică.",
    scopeEn: "Total active PAD mandatory catastrophe policies (~2.21M properties), national penetration rate (22.4%), and catastrophe loss reserves.",
    tableRef: "Registrul Național al Polițelor PAD",
  },
  {
    id: "src_unsar_barometer",
    institution: "Uniunea Națională a Societăților de Asigurare și Reasigurare (UNSAR)",
    reportTitle: "Barometrul UNSAR — IRES privind Percepția Riscului și Deficitul de Protecție Financiară",
    publicationDate: "2024 / 2025",
    verifiedDate: "2026-10-09",
    url: "https://unsar.ro",
    scopeRo: "Ponderea asigurărilor în PIB (1,42%), deficitul de protecție al familiilor (Protection Gap) și dinamica asigurărilor voluntare de sănătate corporative.",
    scopeEn: "Insurance penetration as % of GDP (1.42%), family financial protection gap, and voluntary private health dynamics.",
    tableRef: "Studiul Național de Percepție a Riscurilor Financiare",
  },
];

export const HEADLINE_MARKET_INDICATORS: MarketIndicator[] = [
  {
    id: "ind_total_pbs",
    nameRo: "Volum Total Prime Brute Subscrise — Piața Consolidată (PBS)",
    nameEn: "Total Market Gross Written Premiums (GWP) — Consolidated",
    value: "23,40 mld. RON",
    numericValue: 23.40,
    unit: "miliarde RON (~4,70 mld. EUR)",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "+11,0%",
    changeType: "increase",
    sourceName: "ASF România",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Volumul total al subscrierilor din piața de asigurări din România, incluzând cele 25 de societăți autorizate și supravegheate de ASF (19,8 mld. RON), precum și cele 14 sucursale ale asigurătorilor europeni active pe libertatea de stabilire / FOE (3,6 mld. RON).",
    descriptionEn: "Total market premium volume across 25 Romanian ASF-authorized insurers (RON 19.8B) and 14 EU branch entities operating under freedom of establishment (RON 3.6B).",
    methodologyNoteRo: "Date agregate oficiale ASF. Societățile reglementate de ASF au subscris 19,8 miliarde RON (dintre care 19 active pe segmentul non-viață/mixt), iar sucursalele UE 3,6 miliarde RON.",
  },
  {
    id: "ind_asf_entities_volume",
    nameRo: "Subscrieri Societăți Autorizate & Supravegheate ASF",
    nameEn: "ASF-Authorized Domestic Insurers GWP",
    value: "19,80 mld. RON",
    numericValue: 19.80,
    unit: "miliarde RON",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "+8,6%",
    changeType: "increase",
    sourceName: "ASF România",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Primele brute subscrise de cele 25 de societăți de asigurare autorizate și cu sediul social în România supravegheate direct de ASF (dintre care 19 active pe segmentul asigurărilor generale/mixte).",
    descriptionEn: "Gross written premiums subscribed by the 25 domestic insurance companies directly regulated and supervised by the ASF (19 writing non-life/composite lines).",
    methodologyNoteRo: "Exclude cele 14 sucursale stabilite de asigurători europeni (Axeria, Hellas Direct etc.), care raportează reglementatorilor din statele de origine.",
  },
  {
    id: "ind_nonlife_share",
    nameRo: "Ponderea Asigurărilor Generale (Non-Life)",
    nameEn: "Non-Life Insurance Market Share",
    value: "81,5%",
    numericValue: 81.5,
    unit: "% din total PBS piață (19,09 mld. RON)",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "-1,5 pp",
    changeType: "stable",
    sourceName: "ASF România",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Asigurările generale (non-life) cumulează 19,09 miliarde RON (~81,5% din totalul pieței consolidate: 15,70 mld. RON societăți ASF + 3,39 mld. RON sucursale UE), fiind dominate de liniile auto obligatorii (RCA/CMR) și facultative (CASCO).",
    descriptionEn: "Non-life lines represent RON 19.09 billion (~81.5% of the total consolidated market: 15.70B domestic + 3.39B EU branches), driven primarily by motor classes.",
  },
  {
    id: "ind_life_share",
    nameRo: "Volum & Pondre Asigurări de Viață (Life)",
    nameEn: "Life Insurance Volume & Share",
    value: "4,34 mld. RON",
    numericValue: 4.34,
    unit: "miliarde RON (18,5% din piață)",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "+14,2%",
    changeType: "increase",
    sourceName: "ASF România",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Asigurările de viață au atins 4,34 miliarde RON (~18,5% din piață: 4,13 mld. RON societăți ASF + 0,21 mld. RON sucursale UE), confirmând creșterea interesului pentru produse de protecție financiară și pensii private.",
    descriptionEn: "Life insurance subscriptions reached RON 4.34 billion (~18.5% of market: 4.13B domestic + 0.21B EU branches), reflecting steady demand for financial protection and unit-linked products.",
  },
  {
    id: "ind_rca_volume",
    nameRo: "Volum Prime Clasa A10 (RCA & Răspundere Transportator)",
    nameEn: "Total Class A10 Market GWP (MTPL & Carrier Liability)",
    value: "10,45 mld. RON",
    numericValue: 10.45,
    unit: "miliarde RON (~44,6% din piață)",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "+8,8%",
    changeType: "increase",
    sourceName: "ASF / BAAR",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Clasa A10 (Răspundere civilă auto obligatorie RCA și răspunderea transportatorului/CMR) reprezintă 44,6% din piața consolidată (~7,95 mld. RON societăți autorizate ASF și ~2,50 mld. RON sucursale UE), RCA fiind componenta covârșitoare.",
    descriptionEn: "Class A10 (Statutory MTPL and carrier liability) represents 44.6% of consolidated market volume (RON 7.95B domestic ASF + RON 2.50B EU branches), with MTPL being the predominant component.",
  },
  {
    id: "ind_claims_paid",
    nameRo: "Total Despăgubiri & Indemnizații Brute Plătite",
    nameEn: "Total Gross Claims & Benefits Paid",
    value: "10,60 mld. RON",
    numericValue: 10.60,
    unit: "miliarde RON plătite asiguraților",
    period: "Anul 2024 (Raport oficial ASF)",
    yoyChange: "+24,0%",
    changeType: "increase",
    sourceName: "ASF România",
    sourceDoc: "Raportul privind evoluția pieței de asigurări în anul 2024",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    descriptionRo: "Suma totală direcționată de societățile de asigurare autorizate ASF și sucursalele europene active în România către asigurați și beneficiari pentru daune auto, proprietăți, viață și sănătate (+24% an-la-an conform sintezei executive ASF).",
    descriptionEn: "Total claims, indemnities, and maturity benefits disbursed by insurers and EU branches to policyholders and beneficiaries (+24% YoY per ASF executive summary).",
  },
  {
    id: "ind_pad_coverage",
    nameRo: "Grad de Cuprindere Asigurare Locuințe (PAD)",
    nameEn: "Mandatory Home Insurance (PAD) Penetration",
    value: "22,4%",
    numericValue: 22.4,
    unit: "% din fondul locativ național",
    period: "Date curente raportate",
    yoyChange: "+2,1 pp",
    changeType: "increase",
    sourceName: "PAID România",
    sourceDoc: "Statistici Oficiale Polițe PAD",
    sourceUrl: "https://paidromania.ro",
    descriptionRo: "Aproximativ 2,21 milioane locuințe asigurate împotriva celor 3 riscuri catastrofice (cutremur, inundații, alunecări de teren) din totalul de ~9,6 milioane locuințe.",
    descriptionEn: "Approx 2.21 million insured residential properties out of ~9.6 million total national housing stock.",
    methodologyNoteRo: "Calculat pe baza raportului dintre polițele PAD valabile și numărul total de unități locative înregistrate la Institutul Național de Statistică.",
  },
  {
    id: "ind_rca_avg_claim",
    nameRo: "Dauna Medie Plătită pe RCA (Autoturisme)",
    nameEn: "Average MTPL Claim Cost (Passenger Cars)",
    value: "10.450 RON",
    numericValue: 10450,
    unit: "RON / dosar daună materială",
    period: "Media anuală constatată",
    yoyChange: "+7,6%",
    changeType: "increase",
    sourceName: "BAAR / ASF",
    sourceDoc: "Analiza daunelor auto CEDAM / AIDA",
    sourceUrl: "https://www.baar.ro",
    descriptionRo: "Creșterea costurilor cu piesele originale, manopera service-urilor și tehnologia avansată a autovehiculelor a crescut despăgubirea medie per eveniment.",
    descriptionEn: "Rising spare parts pricing, specialized hourly labor, and complex vehicle electronics drive higher average claim settlement costs.",
  },
  {
    id: "ind_gdp_penetration",
    nameRo: "Grad de Penetrare a Asigurărilor în PIB",
    nameEn: "Insurance Penetration (% of GDP)",
    value: "1,42%",
    numericValue: 1.42,
    unit: "% din PIB național",
    period: "Comparație europeană anuală",
    yoyChange: "+0,08 pp",
    changeType: "stable",
    sourceName: "UNSAR / Eurostat / Insurance Europe",
    sourceDoc: "Studiu comparativ de piață",
    sourceUrl: "https://unsar.ro",
    descriptionRo: "Nivelul de penetrare al pieței de asigurări din România rămâne semnificativ sub media Uniunii Europene (~6,8% din PIB), indicând un potențial ridicat de dezvoltare pe viață și sănătate.",
    descriptionEn: "Romanian insurance penetration remains well below the EU average (~6.8% of GDP), highlighting a substantial protection gap in life and health.",
  },
];

export const MARKET_SEGMENT_SHARES: MarketSegmentData[] = [
  {
    categoryRo: "RCA & Transportator (Clasa A10 — Răspundere Auto)",
    categoryEn: "MTPL & Carrier Liability (Class A10 — Motor Liability)",
    sharePercent: 44.6,
    volumeRonBillion: 10.45,
    color: "#3b82f6", // Blue
  },
  {
    categoryRo: "Asigurări de Viață (Clasele I, II, III)",
    categoryEn: "Life Insurance (Classes I, II, III)",
    sharePercent: 18.5,
    volumeRonBillion: 4.34,
    color: "#10b981", // Emerald
  },
  {
    categoryRo: "CASCO (Auto Facultativ — Clasa A3)",
    categoryEn: "CASCO (Motor Own Damage — Class A3)",
    sharePercent: 16.4,
    volumeRonBillion: 3.85,
    color: "#0284c7", // Sky
  },
  {
    categoryRo: "Incendiu, Calamități & Locuințe (PAD + Facultativ A8/A9)",
    categoryEn: "Property & Buildings (PAD + Comprehensive A8/A9)",
    sharePercent: 10.5,
    volumeRonBillion: 2.45,
    color: "#f59e0b", // Amber
  },
  {
    categoryRo: "Sănătate Voluntară (Corporate & Individual — Clasa A2)",
    categoryEn: "Voluntary Health (Corporate & Individual — Class A2)",
    sharePercent: 3.6,
    volumeRonBillion: 0.85,
    color: "#8b5cf6", // Purple
  },
  {
    categoryRo: "Alte Linii Generale (Transport A6/A7, Răspunderi A13, Garanții A15)",
    categoryEn: "Other Non-Life Lines (Cargo A6/A7, Liability A13, Bonds A15)",
    sharePercent: 6.4,
    volumeRonBillion: 1.49,
    color: "#71717a", // Zinc
  },
];

export const MARKET_TRENDS_ANALYSIS = [
  {
    id: "trend_motor_pressures",
    titleRo: "1. Polarizarea pieței auto și inflația tehnică a costurilor de reparație",
    titleEn: "1. Motor line concentration and technical repair inflation",
    summaryRo:
      "Segmentul auto (RCA + CASCO) cumulează aproape 70% din piața non-viață din România. Presiunile inflaționiste asupra componentelor electronice, a senzorilor ADAS și a manoperei specializate au menținut rata combinată a daunei pe RCA aproape de pragul de 100%, ceea ce impune o selecție atentă a asigurătorilor și o monitorizare riguroasă a clauzelor de decontare directă.",
    summaryEn:
      "Motor lines account for nearly 70% of non-life volume in Romania. Inflationary pressures on electronic components, ADAS calibration, and certified labor maintain combined ratios close to 100%, highlighting the value of direct settlement mechanisms.",
  },
  {
    id: "trend_property_protection_gap",
    titleRo: "2. Deficitul de protecție imobiliară în contextul riscului seismic",
    titleEn: "2. Residential protection gap amid earthquake and catastrophe exposures",
    summaryRo:
      "În ciuda obligativității legale prin Legea 260/2008, peste 77% din locuințele din România nu dețin o poliță PAD activă. Pentru proprietarii care dețin doar PAD (plafon maxim de 20.000 EUR pentru clădiri tip A), diferența până la valoarea reală de reconstrucție (care depășește frecvent 80.000 - 150.000 EUR) rămâne complet neacoperită în absența unei polițe facultative.",
    summaryEn:
      "Despite mandatory requirements under Law 260/2008, over 77% of Romanian homes lack active PAD coverage. For homeowners with only PAD (20,000 EUR maximum cap), the gap to true reconstruction value (often 80,000–150,000+ EUR) remains completely exposed without voluntary comprehensive policies.",
  },
  {
    id: "trend_corporate_health_surge",
    titleRo: "3. Accelerarea beneficiilor medicale corporative și protecția angajaților",
    titleEn: "3. Expansion of corporate employee health benefits",
    summaryRo:
      "Companiile din sectorul IMM și corporațiile își extind pachetele de retenție a forței de muncă prin asigurări voluntare de sănătate de grup cu acoperire de spitalizare și intervenții chirurgicale private. Cadrul fiscal favorabil (plafonul de 400 EUR / an conform Codului Fiscal) susține tranziția de la abonamente simple la asigurări medicale cuprinzătoare.",
    summaryEn:
      "SMEs and corporate employers increasingly structure group health insurance with inpatient and surgical coverage to attract and retain talent, supported by the Romanian Fiscal Code's 400 EUR annual non-taxable framework.",
  },
  {
    id: "trend_sme_cyber_directors",
    titleRo: "4. Nevoia de maturizare a protecției afacerilor: D&O, Cyber și Răspundere Profesională",
    titleEn: "4. Business protection maturation: D&O, Cyber, and Professional Liability",
    summaryRo:
      "Digitalizarea accelerată și cerințele contractuale impuse de partenerii internaționali forțează firmele românești să depășească asigurarea clasică a utilajelor și clădirilor. Polițele de Cyber Risk, D&O (Răspunderea Administratorilor) și E&O (Răspundere Profesională) trec din categoria opțională în cerințe contractuale obligatorii.",
    summaryEn:
      "Accelerated digitalization and international client contracts require Romanian SMEs to extend beyond physical property cover into Cyber Risk, Directors & Officers (D&O), and Professional Indemnity (E&O).",
  },
];
