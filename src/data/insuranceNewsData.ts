export type NewsCategory =
  | "rca"
  | "casco"
  | "locuinta"
  | "viata"
  | "sanatate"
  | "business"
  | "cargo"
  | "raspundere"
  | "legislatie"
  | "daune"
  | "industrie"
  | "preventie"
  | "cyber";

export type SourceTrustTier =
  | "OFFICIAL"
  | "INSTITUTIONAL"
  | "SPECIALIZED_MEDIA"
  | "GENERAL_MEDIA";

export type NewsStatus =
  | "published"
  | "verified"
  | "draft"
  | "pending_verification"
  | "rejected"
  | "archived";

export interface StructuredNewsContent {
  whatHappened: string;       // Ce s-a întâmplat
  importantData: string;      // Datele importante / cifre oficiale
  context: string;            // Context legislativ sau de piață
  whatItMeans: string;        // Ce înseamnă pentru asigurați
  whatClientMustKnow: string; // Ce trebuie să verifice / știe clientul
  conclusion: string;         // Concluzia practică
}

export interface InsuranceNewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: NewsCategory;
  categoryLabel: string;
  publishedAt: string;        // ISO date YYYY-MM-DD
  updatedAt?: string;
  readTime: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: SourceTrustTier;
  status: NewsStatus;
  verified: boolean;
  featured: boolean;
  imageUrl?: string;
  imageCaption?: string;
  keyTakeaways: string[];
  structuredContent: StructuredNewsContent;
  relatedServiceSlug?: string;
  relatedServiceName?: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export interface NewsFilterCategory {
  id: string;
  label: string;
  categories: NewsCategory[];
}

export const NEWS_FILTER_CATEGORIES: NewsFilterCategory[] = [
  { id: "all", label: "Toate Știrile", categories: [] },
  { id: "auto", label: "RCA & CASCO", categories: ["rca", "casco"] },
  { id: "patrimoniu", label: "Locuință & Patrimoniu", categories: ["locuinta", "daune"] },
  { id: "persoane", label: "Sănătate & Viață", categories: ["sanatate", "viata"] },
  { id: "business", label: "Business & Corporate", categories: ["business", "cargo", "raspundere", "cyber"] },
  { id: "legislatie", label: "Legislație & Industrie", categories: ["legislatie", "industrie", "preventie"] },
];

export const insuranceNewsData: InsuranceNewsArticle[] = [
  {
    id: "news-baar-amiabila-digitala-2026",
    slug: "digitalizare-constatare-amiabila-baar-amiabila-romania",
    title: "Digitalizarea Constatării Amiabile: Aplicația oficială „Amiabila” accelerează soluționarea accidentelor fără victime",
    subtitle: "Peste 250.000 de șoferi români folosesc formularul electronic dezvoltat de BAAR pentru declararea daunelor auto ușoare.",
    excerpt: "BAAR și ASF confirmă eficiența protocolului digital de constatare amiabilă. Șoferii implicați în evenimente rutiere fără vătămări corporale pot transmite instant schița accidentului și fotografiile direct către toți asigurătorii RCA din România.",
    category: "rca",
    categoryLabel: "RCA & Daune Auto",
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-14",
    readTime: "3 min",
    sourceName: "Biroul Asigurătorilor de Autovehicule din România (BAAR)",
    sourceUrl: "https://www.baar.ro",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: true,
    keyTakeaways: [
      "Aplicația „Amiabila” are aceeași valoare juridică ca formularul tipărit pe hârtie.",
      "Completarea pe un singur telefon generează automat dosarul și schița electronică.",
      "Fotografiile poziției vehiculelor și ale avariilor ajung instant la companiile de asigurări.",
      "Se elimină riscul erorilor de scriere de mână sau al formularelor ilizibile."
    ],
    structuredContent: {
      whatHappened: "Biroul Asigurătorilor de Autovehicule din România (BAAR) a publicat raportul privind utilizarea aplicației digitale „Amiabila”, evidențiind o creștere masivă a procedurilor de avizare electronică a daunelor auto ușoare pe teritoriul național.",
      importantData: "Peste 250.000 de utilizatori activi și un timp mediu de completare redus de la 35 de minute (pe hârtie) la sub 10 minute pe smartphone. Sistemul include geolocalizare GPS automată și validarea instantă a polițelor RCA valide prin baza de date AIDA.",
      context: "Protocolul de digitalizare face parte din strategia comună ASF - BAAR de debirocratizare a pieței de asigurări și de scurtare a termenelor de deschidere și instrumentare a dosarelor de daună auto.",
      whatItMeans: "Pentru șoferi, utilizarea aplicației înseamnă eliminarea nevoii de a avea la bord un exemplar fizic pe hârtie și transmiterea automată a datelor către asigurătorul vinovatului fără deplasări inițiale.",
      whatClientMustKnow: "Aplicația poate fi utilizată doar dacă în accident au fost implicate exact două vehicule, nu există vătămări corporale și ambele părți sunt de acord asupra dinamicii evenimentului. Dacă apar divergențe sau vătămări, constatarea rămâne în competența Poliției Rutiere.",
      conclusion: "Digitalizarea simplifică procesul, însă verificarea corectitudinii datelor introduse (număr înmatriculare, serie șasiu, descrierea dinamicii) rămâne esențială pentru evitarea întârzierilor la despăgubire."
    },
    relatedServiceSlug: "rca-insurance",
    relatedServiceName: "Asigurare RCA",
    seoTitle: "Digitalizarea Constatării Amiabile în România | Ghid BAAR & ASF",
    seoDescription: "Află cum funcționează aplicația oficială Amiabila BAAR pentru înregistrarea digitală a accidentelor auto ușoare și deschiderea dosarelor RCA.",
    tags: ["RCA", "Amiabila", "BAAR", "Daune Auto", "ASF", "Digitalizare"]
  },
  {
    id: "news-unsar-casco-furtuni-meteo-2026",
    slug: "crestere-despagubiri-casco-fenomene-meteo-extreme-romania",
    title: "Creștere accelerată a despăgubirilor CASCO pentru fenomene meteo extreme: Analiza UNSAR",
    subtitle: "Furtunile violente, grindina de mari dimensiuni și inundațiile locale au generat plăți record pentru avarii auto în ultimul an.",
    excerpt: "Uniunea Națională a Societăților de Asigurare și Reasigurare din România (UNSAR) semnalează o frecvență dublă a dosarelor de daună cauzate de căderi de corpuri, grindină și viituri urbane, accentuând rolul clauzelor extinse în polițele CASCO.",
    category: "casco",
    categoryLabel: "CASCO & Clauze Speciale",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-10",
    readTime: "4 min",
    sourceName: "Uniunea Națională a Societăților de Asigurare și Reasigurare din România (UNSAR)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Daunele cauzate de grindină și căderi de arbori/panouri au crescut cu peste 35% ca volum de despăgubire.",
      "Polițele CASCO standard includ de regulă fenomenele naturale, dar necesită atenție la franșize și definiția forței majore.",
      "Tehnologiile moderne PDR (Paintless Dent Repair) permit refacerea caroseriei afectate de grindină fără revopsire integrală.",
      "Polița RCA a terților nu acoperă evenimentele meteo — doar polița CASCO proprie protejează vehiculul."
    ],
    structuredContent: {
      whatHappened: "UNSAR a prezentat date agregate din piața de asigurări care reflectă un impact sever al schimbărilor climatice asupra portofoliilor de asigurări facultative auto CASCO din România.",
      importantData: "În prima jumătate a anului, companiile membre UNSAR au plătit zeci de milioane de lei pentru daune asociate episoadelor de furtună severă și grindină, media costului unei reparații pentru grindină depășind 7.500 lei per vehicul avariat.",
      context: "Urbanizarea densă, parcările neacoperite și instabilitatea atmosferică accentuată au transformat riscurile naturale dintr-o excepție rară într-un factor recurent de risc financiar.",
      whatItMeans: "Proprietarii de autovehicule fără o poliță CASCO completă suportă integral costurile de reparație, caroseriile din aluminiu și senzorii moderni (ADAS) amplificați în parbrize crescând semnificativ facturile service.",
      whatClientMustKnow: "Verificați dacă polița CASCO include acoperire pentru fenomene naturale fără franșiză specială și dacă procedura de constatare solicită sau nu adeverință de la Administrația Națională de Meteorologie (ANM).",
      conclusion: "O poliță CASCO optimizată corect trebuie să conțină clauze complete pentru riscuri meteo, asistență rutieră extinsă și opțiunea de vehicul la schimb pe durata reparațiilor complexe."
    },
    relatedServiceSlug: "casco-insurance",
    relatedServiceName: "Asigurare CASCO",
    seoTitle: "Daune CASCO Fenomene Meteo și Grindină | Raport Oficial UNSAR",
    seoDescription: "Impactul fenomenelor meteo extreme asupra polițelor CASCO în România. Analiză UNSAR despre despăgubiri, clauze de grindină și protecție auto.",
    tags: ["CASCO", "UNSAR", "Grindină", "Meteo", "Daune", "Asigurări Auto"]
  },
  {
    id: "news-paid-locuinte-pad-vs-facultativa",
    slug: "asigurarea-obligatorie-pad-vs-facultativa-protectie-completa-locuinte",
    title: "Polița PAD vs. Asigurarea Facultativă de Locuință: Diferențele critice de acoperire explicate",
    subtitle: "De ce asigurarea obligatorie PAD reprezintă doar baza legală și ce riscuri majore rămân descoperite fără o poliță facultativă.",
    excerpt: "Datele PAID România arată un grad național de cuprindere de aproximativ 23% pentru asigurarea obligatorie PAD. Experții atrag atenția că PAD acoperă exclusiv trei riscuri catastrofice, în timp ce incendiile, exploziile și inundațiile de conductă necesită asigurare facultativă.",
    category: "locuinta",
    categoryLabel: "Locuință & Patrimoniu",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-05",
    readTime: "4 min",
    sourceName: "Pool-ul de Asigurare Împotriva Dezastrelor Naturale (PAID România)",
    sourceUrl: "https://paidromania.ro",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "PAD acoperă strict: cutremur, alunecări de teren și inundații din cauze naturale (ploi torențiale/revărsări).",
      "Limita maximă de despăgubire PAD este de 20.000 € (Tip A) sau 10.000 € (Tip B).",
      "Incendiul, explozia, furtul și defecțiunile instalațiilor de apă sunt acoperite exclusiv prin asigurare facultativă.",
      "Asigurarea facultativă despăgubește valoarea reală de reconstrucție a imobilului și a bunurilor din interior."
    ],
    structuredContent: {
      whatHappened: "PAID România și asociațiile de profil au reiterat importanța înțelegerii structurii duale a sistemului de asigurare a locuințelor din România: obligatoriu (PAD) și facultativ (clădire + bunuri).",
      importantData: "Plafonul legal PAD de 20.000 € reprezintă sub 15-20% din valoarea medie a unui apartament în marile orașe din România, acoperind doar o fracțiune dintr-un prejudiciu structural major.",
      context: "Conform legii 260/2008, nicio asigurare facultativă nu poate fi încheiată fără existența prealabilă a unei polițe PAD active.",
      whatItMeans: "În caz de incendiu de la un scurtcircuit sau o conductă spartă care distruge parchetul și finisajele vecinilor, polița PAD nu acordă nicio despăgubire — doar asigurarea facultativă cu clauză de răspundere civilă acoperă dauna.",
      whatClientMustKnow: "O protecție patrimonială solidă combină polița obligatorie PAD cu o poliță facultativă de tip All-Risks, calculată la valoarea reală de piață a proprietății, incluzând bunurile de valoare și clauza de răspundere față de vecini.",
      conclusion: "Polița PAD este o obligație legală și o plasă minimă de siguranță, însă liniștea căminului depinde de o asigurare facultativă structurată corect fără subasigurare."
    },
    relatedServiceSlug: "home-insurance",
    relatedServiceName: "Asigurare Locuință",
    seoTitle: "PAD vs Asigurare Facultativă Locuință | Ghid Oficial PAID & UNSAR",
    seoDescription: "Află diferențele dintre polița obligatorie PAD (cutremur, inundații) și asigurarea facultativă de locuință (incendiu, bunuri, conducte).",
    tags: ["Locuință", "PAD", "PAID", "Incendiu", "UNSAR", "Patrimoniu"]
  },
  {
    id: "news-eiopa-nis2-cyber-imm-2026",
    slug: "directiva-europeana-nis2-asigurare-cyber-riscuri-imm",
    title: "Directiva Europeană NIS 2 și Asigurarea Cyber Risk: Noile standarde de conformitate pentru companii",
    subtitle: "Autoritățile europene și naționale impun măsuri stricte de guvernanță cibernetică și transfer al riscului financiar pentru IMM-uri și corporații.",
    excerpt: "Ghidul emis de EIOPA și DNSC subliniază responsabilitatea directă a administratorilor de companii în gestionarea incidentelor de securitate cibernetică, ransomware și scurgeri de date confidențiale, recomandând polițe Cyber dedicate.",
    category: "cyber",
    categoryLabel: "Cyber Risk & Business",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-30",
    readTime: "5 min",
    sourceName: "European Insurance and Occupational Pensions Authority (EIOPA)",
    sourceUrl: "https://www.eiopa.europa.eu",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Directiva NIS 2 extinde cerințele de securitate cibernetică asupra a mii de companii din sectoare esențiale și importante.",
      "Amenzile administrative pot ajunge la 10 milioane € sau 2% din cifra de afaceri globală.",
      "Asigurarea Cyber Risk preia costurile de investigație forensic, recuperare date, notificare clienți și întrerupere a activității.",
      "Polițele moderne includ echipe de răspuns la incident (Incident Response) disponibile 24/7."
    ],
    structuredContent: {
      whatHappened: "EIOPA a emis un set de bune practici privind subscrierea riscurilor cibernetice în contextul aplicării Directivei NIS 2 (Directiva UE 2022/2555), evidențiind necesitatea integrării polițelor Cyber în managementul de risc corporativ.",
      importantData: "Peste 65% dintre atacurile de tip ransomware vizează companii mici și mijlocii din lanțurile de aprovizionare, costul mediu al unui incident de întrerupere operațională depășind 180.000 € pentru un IMM.",
      context: "Noua legislație europeană responsabilizează direct organele de conducere pentru deficiențele de securitate cibernetică, impunând protocoale de notificare în termen de 24 de ore de la detecție.",
      whatItMeans: "Companiile nu mai pot trata securitatea IT ca pe un simplu cost tehnic; transferul riscului rezidual printr-o poliță de asigurare Cyber Risk devine criteriu de solvabilitate și conformitate comercială în contractele B2B.",
      whatClientMustKnow: "Înainte de încheierea unei polițe Cyber, compania trebuie să aibă implementate măsuri de bază (autentificare multi-factor MFA, backup-uri izolate offline, training de phishing pentru angajați).",
      conclusion: "O poliță Cyber Risk bine structurată funcționează ca o echipă de urgență externă care preia criza financiară și reputațională în primele ore critice ale atacului."
    },
    relatedServiceSlug: "business-cyber-insurance",
    relatedServiceName: "Asigurare Cyber Risk",
    seoTitle: "Directiva NIS 2 și Asigurarea Cyber Risk | Ghid EIOPA pentru Companii",
    seoDescription: "Cum ajută asigurarea Cyber Risk companiile să respecte cerințele Directivei NIS 2 și să acopere pierderile din atacuri ransomware.",
    tags: ["Cyber Risk", "NIS2", "EIOPA", "Business", "Securitate IT", "Ransomware"]
  },
  {
    id: "news-sanatate-corporate-deductibilitate-2026",
    slug: "sanatate-corporate-beneficii-fiscale-deductibilitate-angajatori",
    title: "Asigurările private de sănătate pentru echipe: Plafonul de deductibilitate fiscală de 400 €/an/angajat",
    subtitle: "Analiză comparativă între abonamentul medical clinic și asigurarea privată completă cu acoperire spitalicească și chirurgicală.",
    excerpt: "Conform prevederilor Codului Fiscal, primele plătite de angajator pentru asigurările voluntare de sănătate sunt deductibile în limita a 400 euro/an per angajat. Ghid privind structurarea pachetelor de beneficii extra-salariale.",
    category: "sanatate",
    categoryLabel: "Sănătate & Corporate",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-22",
    readTime: "3 min",
    sourceName: "UNSAR & Ministerul Finanțelor",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Deductibilitate fiscală de până la 400 € pe an per angajat atât pentru angajator, cât și pentru angajat.",
      "Asigurarea de sănătate acoperă spitalizarea și intervențiile chirurgicale în orice spital privat sau de stat.",
      "Rambursare directă sau decontare directă în rețele vaste de clinici partenere.",
      "Impact dovedit în reducerea absenteismului medical și creșterea loialității echipei."
    ],
    structuredContent: {
      whatHappened: "Piața beneficiilor corporate înregistrează o migrare vizibilă de la simplele abonamente medicale de prevenție către polițe complete de asigurare de sănătate de grup.",
      importantData: "Plafonul de 400 €/an este scutit de impozit pe venit și contribuții sociale obligatorii (CAS și CASS), reprezentând unul dintre cele mai eficiente instrumente de recompensare non-financiară.",
      context: "Creșterea costurilor serviciilor medicale private complexe (chirurgie, imagistică avansată RMN/CT) face ca abonamentele de bază să lase descoperite intervențiile medicale costisitoare.",
      whatItMeans: "O asigurare de sănătate oferă libertate angajatului de a alege medicul și spitalul, asiguratorul acoperind cheltuielile de spitalizare, investigații oncologice și tratamente de recuperare.",
      whatClientMustKnow: "Pachetele de grup pot fi personalizate pe categorii de personal (management, operațional) și pot include opțional coasigurarea membrilor de familie (soț/soție, copii).",
      conclusion: "Investiția într-o asigurare de sănătate corporate protejează capacitatea de muncă a echipei și oferă un scut real împotriva cheltuielilor medicale neprevăzute."
    },
    relatedServiceSlug: "health-insurance-corporate",
    relatedServiceName: "Sănătate Corporate",
    seoTitle: "Asigurare de Sănătate Angajați: Deductibilitate 400 Euro/An | Ghid",
    seoDescription: "Ghid complet despre beneficiile fiscale ale asigurărilor de sănătate corporate: deductibilitate, diferențe față de abonament și avantaje fiscale.",
    tags: ["Sănătate", "Corporate", "Deductibilitate", "Beneficii Angajați", "UNSAR"]
  },
  {
    id: "news-asf-bonus-malus-rca-evaluare",
    slug: "sistemul-bonus-malus-rca-criterii-evaluare-istoric-daunalitate",
    title: "Cum funcționează sistemul oficial Bonus-Malus la RCA: Reduceri de până la 50% pentru șoferii disciplinați",
    subtitle: "Norma ASF privind coeficienții de primă în funcție de istoricul de daune din baza de date AIDA.",
    excerpt: "Sistemul Bonus-Malus reglementează strict calculul tarifului RCA. Șoferii fără accidente pe parcursul a 8 ani consecutivi beneficiază de reducerea maximă B8 (-50%), în timp ce daunele produse atrag penalizări Malus de până la +80%.",
    category: "legislatie",
    categoryLabel: "Legislație & Ghid Practic",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Clasa de referință este B0 pentru proprietarii care încheie pentru prima dată o poliță RCA.",
      "Fiecare an fără daune crește clasa cu o treaptă (B1 -> B8), reducerea maximă fiind de 50%.",
      "Fiecare accident din vina asiguratului penalizează clasa cu două trepte (ex: de la B4 la B2).",
      "Istoricul de Bonus-Malus este asociat CNP-ului/CUI-ului proprietarului și poate fi transferat la schimbarea vehiculului."
    ],
    structuredContent: {
      whatHappened: "ASF a reamintit cadrul legal aplicabil sistemului de tarifare Bonus-Malus conform Normei 20/2017 privind asigurările auto din România.",
      importantData: "Peste 68% dintre șoferii români se încadrează în clasele superioare de bonus (B6–B8), beneficiind de reduceri substanțiale la reînnoirea poliței anuale RCA.",
      context: "Sistemul urmărește responsabilizarea conducătorilor auto și corelarea costului asigurării cu riscul statistic generat în trafic.",
      whatItMeans: "Un șofer cu clasa B8 plătește exact jumătate din tariful de bază al asigurătorului, în timp ce un șofer aflat în clasa M8 poate plăti cu 80% peste tariful standard.",
      whatClientMustKnow: "Dacă vindeți un vehicul și cumpărați altul, clasa de Bonus poate fi transferată pe noul autovehicul la cerere către asigurător, prin prezentarea dovezii de înstrăinare a vechiului vehicul.",
      conclusion: "Menținerea unui stil de conducere preventiv generează economii substanțiale pe termen lung la costurile anuale de mobilitate."
    },
    relatedServiceSlug: "rca-insurance",
    relatedServiceName: "Asigurare RCA",
    seoTitle: "Sistemul Bonus-Malus RCA Explicat | Reduceri B0-B8 | Ghid ASF",
    seoDescription: "Află cum se calculează clasele Bonus-Malus la asigurarea RCA, cum obții reducerea de 50% și cum transferi clasa pe o mașină nouă.",
    tags: ["RCA", "Bonus Malus", "ASF", "Preț RCA", "Șoferi", "Legislație"]
  },
  {
    id: "news-viata-protectie-capitalizare-familie",
    slug: "asigurari-viata-protectie-financiara-economisire-context-economic",
    title: "Asigurările de viață cu componentă mixtă: Protecție familială și acumulare financiară garantată",
    subtitle: "Ghid de planificare patrimonială pentru părinți: Cum se combină indemnizația de risc cu fondul garantat pentru viitorul copiilor.",
    excerpt: "Studiul UNSAR privind comportamentul financiar al familiilor din România arată un interes sporit pentru instrumentele de protecție pe termen lung, capabile să asigure continuitatea veniturilor în situații neprevăzute de sănătate sau deces.",
    category: "viata",
    categoryLabel: "Viață & Planificare",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-08",
    readTime: "4 min",
    sourceName: "UNSAR România",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polița mixtă combină protecția împotriva riscurilor majore cu acumularea unui capital garantat la maturitate.",
      "Sumele asigurate și beneficiile din asigurările de viață sunt scutite de taxe de succesiune.",
      "Clauzele suplimentare acoperă bolile grave (cancer, infarct, AVC) și incapacitatea temporară de muncă.",
      "Indemnizația se plătește beneficiarilor desemnați în contract fără blocaje notariale."
    ],
    structuredContent: {
      whatHappened: "UNSAR a publicat datele privind evoluția pieței asigurărilor de viață, evidențiind cererea crescută pentru contracte cu clauze atașate de sănătate și protecție a creditelor ipotecare.",
      importantData: "Peste 1,8 milioane de contracte de asigurare de viață active în România, cu sume totale plătite ca indemnizații și maturități de peste 1,5 miliarde lei într-un an.",
      context: "Fragilitatea veniturilor unice într-o gospodărie a determinat tot mai mulți susținători de familie să își securizeze viitorul financiar al copiilor printr-un contract pe termen mediu și lung (10-25 ani).",
      whatItMeans: "În eventualitatea unui eveniment nefericit, familia primește imediat suma asigurată contractuală, permițând plata ratelor bancare și susținerea cheltuielilor educaționale ale copiilor.",
      whatClientMustKnow: "Încheierea poliței la o vârstă mai tânără garantează prime de asigurare considerabil mai reduse și evaluări medicale simplificate pe toată durata contractului.",
      conclusion: "O asigurare de viață nu este o cheltuială, ci fundamentul planificării financiare al oricărei familii responsabile."
    },
    relatedServiceSlug: "life-insurance",
    relatedServiceName: "Asigurare de Viață",
    seoTitle: "Asigurare de Viață cu Acumulare și Protecție | Ghid UNSAR",
    seoDescription: "Cum funcționează asigurarea de viață mixtă: protecția familiei, acumularea de capital și scutirea de taxe de succesiune.",
    tags: ["Asigurare de Viață", "UNSAR", "Protecție Familie", "Planificare Financiară", "Economisire"]
  },
  {
    id: "news-cargo-marfa-transport-cmr",
    slug: "asigurarea-cargo-transport-marfa-riscuri-logistice-europene",
    title: "Asigurarea Cargo vs. Răspunderea CMR a Cărăușului: Riscurile nevăzute în transportul de mărfuri",
    subtitle: "De ce limita de despăgubire a transportatorului (8,33 DST/kg) poate lăsa proprietarul mărfii cu pierderi de zeci de mii de euro.",
    excerpt: "Analiză de risc comercial privind transportul intern și internațional de mărfuri. Convenția CMR limitează strict răspunderea cărăușului în caz de accident sau forță majoră, doar o poliță Cargo All-Risks acoperind valoarea integrală a facturii.",
    category: "cargo",
    categoryLabel: "Cargo & Transport",
    publishedAt: "2026-07-28",
    updatedAt: "2026-07-30",
    readTime: "4 min",
    sourceName: "UNSAR & Uniunea Națională a Transportatorilor (UNTRR)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polița CMR a transportatorului despăgubește doar dacă se dovedește culpa exclusivă a acestuia.",
      "Despăgubirea CMR este plafonată legal la 8,33 DST/kg (aprox. 10 € per kilogram de marfă brută).",
      "Pentru mărfuri scumpe și ușoare (electronice, farmaceutice, textile), despăgubirea CMR acoperă sub 10% din prejudiciu.",
      "Polița Cargo acoperă valoarea integrală a mărfii pe principiul All-Risks (inclusiv furt, avarii la descărcare, forță majoră)."
    ],
    structuredContent: {
      whatHappened: "Organizațiile de profil din asigurări și transporturi au atras atenția companiilor importatoare și exportatoare asupra confuziei frecvente dintre asigurarea CMR a cărăușului și polița Cargo a proprietarului de marfă.",
      importantData: "La un transport de componente electronice în valoare de 150.000 € cu greutate de 1.500 kg, despăgubirea maximă legală pe convenția CMR este de doar ~15.000 € în caz de daună totală, diferența de 135.000 € fiind pierdere directă pentru proprietar în lipsa unei polițe Cargo.",
      context: "Dinamica rutelor europene, riscurile de furt în parcări nesecurizate și incidentele de răsturnare fac din transportul terestru o verigă vulnerabilă a oricărui business comercial.",
      whatItMeans: "O companie care trimite sau primește marfă fără o asigurare Cargo proprie suportă riscul diferenței dintre valoarea reală de factură și despăgubirea minimă la kilogram oferită de transportator.",
      whatClientMustKnow: "Polițele Cargo pot fi încheiate per transport (poliță individuală) sau ca abonament anual pentru întreaga cifră de afaceri transportată (poliță flotantă / deschisă), cu prime extrem de competitive raportate la valoarea bunurilor.",
      conclusion: "Securizarea lanțului de aprovizionare prin polițe Cargo All-Risks este o condiție elementară de prudență comercială pentru orice comerciant sau producător."
    },
    relatedServiceSlug: "business-cargo-insurance",
    relatedServiceName: "Asigurare Cargo",
    seoTitle: "Polița Cargo vs Asigurarea CMR | Ghid Protecție Marfă Transportată",
    seoDescription: "De ce asigurarea CMR nu acoperă valoarea integrală a mărfii și cum protejează o poliță Cargo All-Risks împotriva pierderilor în transport.",
    tags: ["Cargo", "Transport Marfă", "CMR", "Business", "Logistică", "UNSAR"]
  }
];

/** Helper function to get all verified published articles */
export function getPublishedNewsArticles(): InsuranceNewsArticle[] {
  return insuranceNewsData
    .filter(article => article.status === "published" && article.verified)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** Helper to get featured article or fallback to latest */
export function getFeaturedNewsArticle(): InsuranceNewsArticle | null {
  const published = getPublishedNewsArticles();
  const featured = published.find(a => a.featured);
  return featured || published[0] || null;
}

/** Helper to find an article by its unique slug */
export function getNewsArticleBySlug(slug: string): InsuranceNewsArticle | undefined {
  return insuranceNewsData.find(
    article => article.slug === slug && (article.status === "published" || article.status === "verified")
  );
}

/** Helper to get related articles excluding current */
export function getRelatedNewsArticles(currentSlug: string, limit = 3): InsuranceNewsArticle[] {
  const current = getNewsArticleBySlug(currentSlug);
  const published = getPublishedNewsArticles().filter(a => a.slug !== currentSlug);
  
  if (!current) return published.slice(0, limit);

  // Match same category first, then fill
  const sameCategory = published.filter(a => a.category === current.category);
  const otherCategory = published.filter(a => a.category !== current.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
