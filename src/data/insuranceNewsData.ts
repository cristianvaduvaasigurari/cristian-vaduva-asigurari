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
    subtitle: "De ce asigurarea obligatorie PAD și polița facultativă sunt produse distincte și ce riscuri majore rămân descoperite fără o asigurare facultativă.",
    excerpt: "PAD acoperă exclusiv 3 riscuri naturale catastrofice în limita legală de 20.000 € (sau 10.000 €). Incendiul, explozia, avariile instalațiilor de apă și răspunderea față de vecini necesită o asigurare facultativă adaptată valorii reale de reconstrucție.",
    category: "locuinta",
    categoryLabel: "Locuință & Patrimoniu",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-15",
    readTime: "5 min",
    sourceName: "Pool-ul de Asigurare Împotriva Dezastrelor Naturale (PAID România) & UNSAR",
    sourceUrl: "https://paidromania.ro",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: true,
    keyTakeaways: [
      "Polița PAD este o obligație legală (Legea 260/2008) ce acoperă exclusiv 3 riscuri naturale: cutremur, alunecări de teren și inundații din cauze naturale.",
      "Suma maximă asigurată prin PAD este plafonată prin lege la 20.000 € (Tip A) sau 10.000 € (Tip B), indiferent de valoarea reală de piață a proprietății.",
      "Incendiul, explozia, furtunile, inundațiile provocate de avarii la conducte și furtul sunt acoperite exclusiv prin polița facultativă de locuință.",
      "O poliță facultativă include uzual răspunderea civilă față de terți (pentru pagube produse vecinilor) și bunurile din interior în limitele contractuale stabilite."
    ],
    structuredContent: {
      whatHappened: "Analizele sectoriale ale PAID România și UNSAR reiterează distincția fundamentală dintre asigurarea obligatorie a locuințelor (PAD) și polițele facultative complete, atrăgând atenția asupra confuziei frecvente prin care proprietarii consideră eronat că polița obligatorie le acoperă toate riscurile domestice.",
      importantData: "Plafonul legal PAD de 20.000 € acoperă sub 15-20% din costul mediu de reconstrucție al unui apartament urban, în timp ce daunele produse de incendii sau avarii ale conductelor reprezintă peste 70% din frecvența dosarelor de daună raportate la nivel național.",
      context: "Conform Legii nr. 260/2008, deținerea unei polițe PAD active este o condiție legală prealabilă obligatorie pentru emiterea oricărei asigurări facultative de locuință. Cele două polițe funcționează complementar, nu interschimbabil.",
      whatItMeans: "În eventualitatea unui incendiu cauzat de un scurtcircuit sau a unei inundații provenite dintr-o țeavă spartă, polița PAD nu oferă nicio despăgubire. Doar o asigurare facultativă de locuință, calibrată la valoarea reală de reconstrucție și incluzând clauza de răspundere civilă, va prelua costurile de reparație și despăgubirea vecinilor afectați.",
      whatClientMustKnow: "Înainte de încheierea contractului facultativ, verificați: valoarea asigurată a clădirii (să nu existe subasigurare), sub-limitele pentru bunuri de valoare, clasa de risc seismic a imobilului (clădirile cu risc seismic major RsI pot avea restricții la subscrierea facultativă) și franșizele aplicabile.",
      conclusion: "Polița PAD asigură respectarea obligației legale și o protecție de bază împotriva catastrofelor naturale, în timp ce protecția completă a patrimoniului familial impune o poliță facultativă de tip All-Risks structurată transparent."
    },
    relatedServiceSlug: "home-insurance",
    relatedServiceName: "Asigurare Locuință",
    seoTitle: "Polița PAD vs Asigurarea Facultativă de Locuință | Ghid Diferențe & Acoperiri",
    seoDescription: "Află diferențele esențiale dintre asigurarea obligatorie PAD și polița facultativă de locuință: riscuri acoperite, limite de despăgubire și clauze critice.",
    tags: ["Locuință", "PAD", "PAID", "Incendiu", "UNSAR", "Patrimoniu", "Ghid Asigurări"]
  },
  {
    id: "news-casco-masini-electrice-ev-2026",
    slug: "asigurare-casco-masini-electrice-baterie-statie-incarcare",
    title: "CASCO pentru Mașini Electrice și Plug-in Hybrid: Bateria de Tracțiune, Stațiile de Încărcare și Clauze Critice",
    subtitle: "Ce trebuie să verifici în contractul CASCO pentru un vehicul electric: de la riscurile bateriei până la asistența rutieră dedicată.",
    excerpt: "Bateria de tracțiune reprezintă până la 40-50% din valoarea unui vehicul electric. Află cum se asigură corect acumulatorul, cablurile de încărcare, stațiile wallbox și de ce tractarea pe roți libere este strict interzisă.",
    category: "casco",
    categoryLabel: "CASCO & Vehicule Electrice",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-12",
    readTime: "5 min",
    sourceName: "UNSAR & Asociația Producătorilor și Importatorilor de Automobile (APIA)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Bateria de tracțiune trebuie acoperită explicit pentru avarii provocate de corpuri contondente pe carosabil, penetrare, șoc termic și incendiu.",
      "Garanția de producător acoperă defectele de fabricație și degradarea chimică, dar NU acoperă avariile accidentale – acestea intră exclusiv în sfera CASCO.",
      "Cablurile mobile de încărcare și stațiile de tip Wallbox instalate la domiciliu necesită includere dedicată în poliță pentru riscuri de furt și supratensiune.",
      "Tractarea unui EV trebuie efectuată exclusiv pe platformă fără rotația roților motrice, pentru a preveni inducția electrică și distrugerea invertoarelor."
    ],
    structuredContent: {
      whatHappened: "Creșterea parcului auto de vehicule electrice (BEV) și hibride reîncărcabile (PHEV) a determinat asigurătorii să adapteze clauzele de subscriere CASCO la cerințele tehnice specifice ale sistemelor de înaltă tensiune.",
      importantData: "Costul înlocuirii unui pachet complet de baterii de tracțiune variază uzual între 12.000 € și peste 35.000 € în funcție de capacitate și marcă, reprezentând componenta cu cel mai mare impact financiar în caz de daună majoră la șasiu.",
      context: "Particularitățile arhitecturii electrice impun protocoale riguroase de reparație: service-urile trebuie să dețină autorizare pentru lucru la înaltă tensiune, iar caroseriile din aluminiu compozit necesită tehnologii speciale de sudură și calibrare a senzorilor ADAS.",
      whatItMeans: "O poliță CASCO standard care nu specifică tratamentul componentelor electrice poate genera dispute la decontare privind cablurile de alimentare, stațiile de încărcare casnice sau modalitatea de remediere a bateriei afectate de un impact pe dedesubt.",
      whatClientMustKnow: "Verificați: 1. Dacă polița include avaria mecanică a bateriei prin impact la rulare. 2. Dacă asistența rutieră garantează platformă completă și încărcare mobilă de urgență în caz de descărcare completă. 3. Clauza de reparație exclusivă în rețeaua dealerilor autorizați ai mărcii.",
      conclusion: "CASCO pentru vehicule electrice este o investiție critică în protecția mobilității, cu condiția ca termenii contractuali să reflecte exact cerințele tehnologice ale propulsiei electrice."
    },
    relatedServiceSlug: "casco-insurance",
    relatedServiceName: "Asigurare CASCO",
    seoTitle: "CASCO Mașini Electrice: Baterie, Wallbox & Asistență Dedicată | Ghid",
    seoDescription: "Ghid complet despre asigurarea CASCO pentru mașini electrice: acoperirea bateriei de tracțiune, furtul cablurilor, stații wallbox și tractare pe platformă.",
    tags: ["CASCO", "Vehicule Electrice", "Baterie EV", "Wallbox", "Asigurări Auto", "UNSAR"]
  },
  {
    id: "news-eiopa-nis2-cyber-imm-2026",
    slug: "directiva-europeana-nis2-asigurare-cyber-riscuri-imm",
    title: "Directiva Europeană NIS 2 și Asigurarea Cyber Risk: Diferența dintre Conformitate Legală și Transferul Riscului",
    subtitle: "De ce asigurarea Cyber Risk nu ține loc de conformitate NIS2, dar oferă scutul financiar și operațional indispensabil în caz de atac.",
    excerpt: "Directiva (UE) 2022/2555 (NIS2) impune obligații legale stricte de guvernanță cibernetică. Asigurarea Cyber Risk nu elimină aceste obligații și nu achită amenzile de reglementare, dar acoperă investigația forensic, costurile de răspuns la criză și întreruperea activității.",
    category: "cyber",
    categoryLabel: "Cyber Risk & Business",
    publishedAt: "2026-08-28",
    updatedAt: "2026-09-14",
    readTime: "5 min",
    sourceName: "European Insurance and Occupational Pensions Authority (EIOPA) & DNSC",
    sourceUrl: "https://www.eiopa.europa.eu",
    sourceType: "OFFICIAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Asigurarea Cyber Risk și conformitatea cu Directiva NIS 2 sunt noțiuni distincte: o poliță de asigurare nu substituie obligațiile legale de securitate IT.",
      "Amenzile administrative aplicate de autoritățile de reglementare (DNSC / GDPR) nu pot fi asigurate legal în majoritatea jurisdicțiilor europene.",
      "Polița Cyber Risk preia cheltuielile operaționale majore: investigație forensic de urgență, restaurare baze de date, notificare clienți și pierderea de profit din Business Interruption.",
      "Asigurătorii solicită măsuri tehnice obligatorii de igienă cibernetică (MFA, backup-uri offline izolate, endpoint detection) înainte de emiterea ofertei."
    ],
    structuredContent: {
      whatHappened: "Autoritățile europene (EIOPA, ENISA) și naționale (DNSC) au publicat îndrumări privind articularea dintre cerințele obligatorii de conformitate prevăzute de Directiva NIS 2 (UE 2022/2555) și rolul polițelor de asigurare Cyber Risk în managementul continuității afacerii.",
      importantData: "NIS2 extinde obligațiile de securitate asupra a mii de entități esențiale și importante din 18 sectoare economice, prevăzând răspunderea directă a organelor de conducere și termene stricte de raportare a incidentelor semnificative (alertă timpurie în 24 de ore).",
      context: "Este esențial de subliniat că nu orice companie este automată subiect NIS2 (aplicabilitatea depinde de sector și dimensiune conform normelor legale), însă riscul atacurilor cibernetice de tip ransomware și supply chain afectează companiile indiferent de statutul lor de reglementare.",
      whatItMeans: "O companie care deține o poliță Cyber Risk beneficiază în caz de incident de o echipă specializată de Incident Response (investigatori IT forensic, consultanți de comunicare de criză, asistență juridică) și despăgubirea pierderilor financiare cauzate de oprirea activității, conform limitelor și condițiilor poliței.",
      whatClientMustKnow: "Înainte de a solicita o poliță Cyber: 1. Asigurați-vă că aveți implementată autentificarea cu factor multiplu (MFA) pe toate conturile administrative și accesul la distanță. 2. Verificați perioada de așteptare (waiting period) pentru clauza de întrerupere a afacerii (de regulă 8-12 ore). 3. Clarificați condițiile privind ingineria socială și plățile neautorizate.",
      conclusion: "Conformitatea NIS2 reprezintă datoria legală a organizației de a implementa măsuri tehnice adecvate, iar polița Cyber Risk este instrumentul financiar care protejează bilanțul companiei atunci când măsurile de apărare sunt depășite de un atac avansat."
    },
    relatedServiceSlug: "business-cyber-insurance",
    relatedServiceName: "Asigurare Cyber Risk",
    seoTitle: "Directiva NIS 2 vs Asigurarea Cyber Risk | Ghid Diferențe & Conformitate EIOPA",
    seoDescription: "Află diferența dintre conformitatea obligatorie NIS2 și polița de asigurare Cyber Risk: limite legale, răspuns la atacuri ransomware și investigații forensic.",
    tags: ["Cyber Risk", "NIS2", "EIOPA", "DNSC", "Securitate IT", "Business", "Ransomware"]
  },
  {
    id: "news-private-client-ceasuri-arta-2026",
    slug: "asigurare-ceasuri-de-lux-bijuterii-arta-colectii-private-client",
    title: "Asigurarea Ceasurilor de Lux, a Bijuteriilor și a Operelor de Artă: De ce Polițele Standard de Locuință sunt Insuficiente",
    subtitle: "Plafoanele reduse pentru bunuri de valoare, deprecierea la valoarea de piață și cerințele de securitate explicate pentru colecționari.",
    excerpt: "Polițele standard de locuință plafonează bunurile de valoare la sume de 2.000–5.000 € și exclud acoperirea în afara domiciliului. Află cum funcționează acoperirea All-Risks la Valoare Agreată pentru orologerie, bijuterii și artă.",
    category: "business",
    categoryLabel: "Private Client & Colecții",
    publishedAt: "2026-08-25",
    updatedAt: "2026-09-10",
    readTime: "5 min",
    sourceName: "Private Client Insurance Institute & Lloyd's Specialist Syndicates",
    sourceUrl: "https://insurance.cristianvaduva.com/private-client",
    sourceType: "SPECIALIZED_MEDIA",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polițele standard de locuință aplică sub-limite stricte pentru bijuterii și ceasuri (uzual 10-20% din suma bunurilor sau plafoane fixe de 2.000–5.000 €).",
      "Polițele dedicate Private Client oferă acoperire pe principiul 'Valoare Agreată' (Agreed Value), eliminând disputele privind deprecierea sau uzura morală.",
      "Acoperirea poate fi extinsă la nivel global (Worldwide Cover), protejând ceasurile și bijuteriile inclusiv în timpul deplasărilor sau al participării la evenimente.",
      "Pentru piese unice și artă plastică, dosarul de subscriere necesită rapoarte de expertiză gemologică, certificate de proveniență și seifuri certificate (standard EN 1143-1)."
    ],
    structuredContent: {
      whatHappened: "Creșterea valorii colecțiilor private de orologerie de lux (Rolex, Patek Philippe, Audemars Piguet), bijuterii de înaltă finețe și artă contemporană a evidențiat vulnerabilitatea contractelor standard de asigurare a locuinței în fața daunelor majore sau a furturilor calificate.",
      importantData: "Peste 85% dintre proprietarii de ceasuri de lux din România dețin doar o poliță standard de locuință, descoperind abia la producerea unui eveniment că plafonul contractual maxim pentru bijuterii acoperă doar o mică fracțiune din valoarea unei singure piese de colecție.",
      context: "Piața secundară a pieselor de colecție înregistrează adesea cotații peste prețul de catalog, ceea ce face ca principiul clasic de despăgubire la 'valoare de factură' să fie complet neadecvat fără o clauză expresă de Valoare Agreată.",
      whatItMeans: "O poliță dedicată de tip Private Client garantează despăgubirea sumei convenite contractual în baza certificatelor de autenticitate și a rapoartelor de evaluare periodică, fără aplicarea deducerilor de uzură și cu opțiunea de despăgubire pentru pierderea valorii artistice în caz de restaurare parțială.",
      whatClientMustKnow: "Înainte de subscriere, verificați: 1. Cerințele minime de securitate (clasificarea seifului, senzori seismici/volumetrici, conectare la dispecerat de intervenție rapidă). 2. Excluderile aplicabile în timpul transportului neînsoțit. 3. Periodicitatea obligatorie a reevaluării pieselor (recomandată la fiecare 2–3 ani).",
      conclusion: "Colecțiile de mare valoare necesită o abordare dedicată de subscriere Private Client, bazată pe confidențialitate absolută, evaluări certificate și clauze adaptate mobilității globale."
    },
    relatedServiceSlug: "/private-client/jewellery-watches",
    relatedServiceName: "Private Client — Jewellery & Watches",
    seoTitle: "Asigurare Ceasuri de Lux și Bijuterii | Ghid Private Client & Valoare Agreată",
    seoDescription: "De ce polițele standard de locuință nu protejează ceasurile de lux și arta. Află cum funcționează asigurarea Private Client cu valoare agreată și acoperire globală.",
    tags: ["Private Client", "Ceasuri de Lux", "Bijuterii", "Artă", "Valoare Agreată", "Patrimoniu"]
  },
  {
    id: "news-malpraxis-medical-romania-2026",
    slug: "asigurare-malpraxis-medical-limite-legale-vs-protectie-reala",
    title: "Asigurarea de Malpraxis Medical: De ce Limita Minimă Legală (Legea 95/2006) este Insuficientă în Practica Clinică",
    subtitle: "Analiza cadrului de răspundere civilă profesională medicală: de la plafoanele minime obligatorii la protecția cheltuielilor de judecată și daune morale.",
    excerpt: "Limitele minime legale prevăzute de legislația sanitară din România (10.000–62.000 €) nu mai corespund daunelor morale acordate în instanțe. Ghid practic privind structurarea poliței de răspundere profesională pentru medici și clinici private.",
    category: "raspundere",
    categoryLabel: "Răspundere Profesională & Medical",
    publishedAt: "2026-08-18",
    updatedAt: "2026-09-08",
    readTime: "5 min",
    sourceName: "Colegiul Medicilor din România & UNSAR",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Limitele minime prevăzute de Legea nr. 95/2006 variază între 10.000 € și 62.000 € în funcție de specialitate, reprezentând doar cerința obligatorie de avizare a liberei practici.",
      "Despăgubirile acordate de instanțele judecătorești pentru vătămări corporale grave sau deces depășesc frecvent 200.000–500.000 €, diferența fiind suportată direct din patrimoniul personal al medicului în lipsa unor limite extinse.",
      "Polița de malpraxis trebuie să acopere explicit onorariile avocaților, costurile expertizelor medico-legale și cheltuielile de judecată.",
      "Clinicile și spitalele private au o răspundere civilă delictuală distinctă (pentru infecții nosocomiale, defecțiuni ale aparaturii și fapta prepusului) care necesită o poliță de răspundere a entității medicale."
    ],
    structuredContent: {
      whatHappened: "Jurisprudența recentă a instanțelor din România reflectă o creștere substanțială a cuantumului daunelor morale și materiale solicitate în litigiile de răspundere medicală, determinând profesioniștii din sănătate să reevalueze adecvarea limitelor minime obligatorii de asigurare.",
      importantData: "Peste 90% dintre medicii din România dețin polițe emise exclusiv la pragul minim legal, expunându-și economiile și bunurile personale în cazul unei acțiuni în instanță complexe.",
      context: "Răspunderea civilă a personalului medical este reglementată de Titlul XV din Legea nr. 95/2006 privind reforma în domeniul sănătății. Totuși, legea stabilește doar un prag minim pentru exercitarea profesiei, nu un plafon maxim al pretențiilor ce pot fi formulate de pacienți.",
      whatItMeans: "În eventualitatea unei decizii judecătorești executorii care depășește limita poliței, asigurătorul achită doar suma contractuală asigurată, medicul răspunzând cu întreg patrimoniul său prezent și viitor pentru diferență.",
      whatClientMustKnow: "Când contractați o poliță de malpraxis: 1. Optați pentru limite extinse de acoperire (100.000–500.000 €). 2. Verificați includerea cheltuielilor de apărare juridică peste limita sumei asigurate. 3. Asigurați continuitatea clauzei de retroactivitate pentru fapte comise anterior dar reclamate în perioada de valabilitate a poliței curente (mecanism claims-made).",
      conclusion: "Asigurarea de malpraxis nu este o simplă formalitate birocratică pentru Colegiul Medicilor, ci instrumentul juridic esențial care protejează cariera, reputația și stabilitatea financiară a practicianului medical."
    },
    relatedServiceSlug: "business-malpractice-insurance",
    relatedServiceName: "Asigurare Malpraxis Medical",
    seoTitle: "Asigurare Malpraxis Medical | Limite Legale Legea 95/2006 vs Protecție Reală",
    seoDescription: "De ce limita minimă legală la malpraxis medical este insuficientă. Ghid despre răspunderea medicilor, daune morale, cheltuieli de judecată și clinici private.",
    tags: ["Malpraxis Medical", "Răspundere Profesională", "Medici", "Legea 95/2006", "Clinici Private", "UNSAR"]
  },
  {
    id: "news-do-directors-liability-2026",
    slug: "asigurare-do-directors-officers-raspundere-profesionala-ghid",
    title: "Asigurarea D&O (Directors & Officers) și Răspunderea Profesională: Mecanisme Claims-Made, Clauze Retroactive și Run-Off",
    subtitle: "Cum sunt protejate organele de conducere și societatea comercială împotriva riscului de răspundere managerială și pretențiilor terților.",
    excerpt: "Administratorii și directorii executivi răspund solidar și cu patrimoniul personal pentru deciziile de management. Află cum funcționează structura Side A, B și C, declanșatorii claims-made și perioada extinsă de notificare (Run-Off).",
    category: "raspundere",
    categoryLabel: "D&O & Răspundere Managerială",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-05",
    readTime: "5 min",
    sourceName: "UNSAR & Asociația Administratorilor și Directorilor din România",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polița D&O protejează patrimoniul personal al administratorilor, directorilor executivi și cenzorilor împotriva pretențiilor formulate de asociați, creditori, lichidatori sau autorități.",
      "Arhitectura tripartită D&O acoperă: Side A (răspundere directă neindemnizabilă a persoanei fizice), Side B (rambursare către companie) și Side C (entitate corporativă).",
      "Polițele D&O și de răspundere profesională funcționează pe principiul 'Claims-Made' – incidentul și notificarea trebuie să se încadreze în perioada de acoperire sau retroactivitate.",
      "Clauza de Run-Off (Extended Reporting Period) este indispensabilă la retragerea din funcție, vânzarea companiei sau fuziuni/achiziții pentru a acoperi deciziile din trecut."
    ],
    structuredContent: {
      whatHappened: "Creșterea complexității legislative (Legea societăților nr. 31/1990, Codul Insolvenței, legislația de mediu și conformitate fiscală) a amplificat semnificativ expunerea personală a directorilor și administratorilor de companii din România.",
      importantData: "Peste 70% din costurile unui dosar de răspundere managerială sunt reprezentate de onorariile juridice și cheltuielile de apărare în instanță în faza de investigație prealabilă, chiar și în cazurile în care acuzațiile sunt ulterior respinse ca nefondate.",
      context: "Răspunderea profesională (E&O) acoperă erorile și omisiunile în prestarea de servicii specializate către clienți (IT, consultanță, inginerie), în timp ce D&O acoperă actul decizional de guvernanță corporativă internă și externă.",
      whatItMeans: "O poliță D&O structurată corect preia din primul moment cheltuielile de asistență juridică calificată și eventualele despăgubiri civile stabilite prin hotărâri judecătorești, împiedicând executarea silită a conturilor personale și a bunurilor familiei administratorului.",
      whatClientMustKnow: "La negocierea poliței D&O: 1. Verificați data de retroactivitate (Full Prior Acts). 2. Asigurați-vă că nu există excluderi abuzive pentru insolvență sau conflicte între asociați. 3. Clauza de acoperire pentru foști directori (Run-Off) trebuie garantată pe o perioadă de minim 3–6 ani de la părăsirea mandatului.",
      conclusion: "Polița D&O este o condiție esențială de guvernanță corporativă modernă, fără de care asumarea unor decizii de afaceri strategice devine un risc personal necontrolat."
    },
    relatedServiceSlug: "business-directors-liability",
    relatedServiceName: "Asigurare Răspundere Administratori D&O",
    seoTitle: "Asigurarea D&O Răspunderea Administratorilor | Mecanisme Claims-Made & Side A/B/C",
    seoDescription: "Ghid complet despre asigurarea D&O (Directors & Officers): protecția patrimoniului administratorilor, mecanism claims-made, clauze retroactive și Run-Off.",
    tags: ["D&O", "Răspundere Administratori", "Business", "Guvernanță Corporativă", "Claims Made", "UNSAR"]
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
