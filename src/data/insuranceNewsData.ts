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

export type MaterialType =
  | "raport"
  | "comunicat"
  | "legislatie"
  | "decizie"
  | "informare"
  | "ghid";

export interface StructuredNewsContent {
  whatHappened: string;       // Ce s-a întâmplat / Ce a anunțat ASF
  importantData: string;      // Datele importante / cifre oficiale
  context: string;            // Context legislativ sau de piață
  whatItMeans: string;        // Pe cine afectează / ce înseamnă pentru asigurați
  whatClientMustKnow: string; // Ce trebuie să verifice cititorul în documentul original
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
  collectedAt?: string;       // Data colectării (YYYY-MM-DD)
  readTime: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: SourceTrustTier;
  materialType?: MaterialType;
  officialDocumentUrl?: string;
  officialDocumentLabel?: string;
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
  { id: "piata", label: "Piața & Solvabilitate ASF", categories: ["industrie"] },
  { id: "daune", label: "Daune & Despăgubiri", categories: ["daune"] },
  { id: "patrimoniu", label: "Locuință & Patrimoniu", categories: ["locuinta"] },
  { id: "persoane", label: "Sănătate, Viață & Pensii", categories: ["sanatate", "viata"] },
  { id: "business", label: "Business, Cargo & Cyber", categories: ["business", "cargo", "raspundere", "cyber"] },
  { id: "legislatie", label: "Legislație & Protecția Consumatorilor", categories: ["legislatie", "preventie"] },
];

export interface MaterialTypeFilter {
  id: string;
  label: string;
  types: MaterialType[];
}

export const MATERIAL_TYPE_FILTERS: MaterialTypeFilter[] = [
  { id: "all", label: "Toate Tipurile", types: [] },
  { id: "raport", label: "Rapoarte Oficiale ASF", types: ["raport"] },
  { id: "comunicat", label: "Comunicate de Presă", types: ["comunicat"] },
  { id: "legislatie", label: "Legislație & Norme", types: ["legislatie"] },
  { id: "decizie", label: "Decizii & Sancțiuni", types: ["decizie"] },
  { id: "ghid", label: "Ghiduri & Protecție Consumatori", types: ["ghid", "informare"] },
];

export const insuranceNewsData: InsuranceNewsArticle[] = [
  // =========================================================================
  // 1. ASF — RAPORTUL OFICIAL AL PIEȚEI S1 2026 (FEATURED STORY)
  // =========================================================================
  {
    id: "news-asf-raport-s1-2026",
    slug: "piata-asigurarilor-romania-crestere-s1-2026-raport-oficial-asf",
    title: "Piața asigurărilor din România a crescut cu 15% în primul semestru al anului 2026: Raportul Oficial ASF",
    subtitle: "Volumul primelor brute subscrise a atins 14,2 miliarde de lei, susținut de avansul sucursalelor europene și al pieței RCA.",
    excerpt: "Autoritatea de Supraveghere Financiară a publicat sinteza primului semestru 2026: subscrierile totale au avansat cu 15%, segmentul RCA a atins 6 miliarde de lei, iar dauna medie RCA a urcat cu 18% pe fondul inflației costurilor de reparație.",
    category: "industrie",
    categoryLabel: "Piața Asigurărilor & Rapoarte ASF",
    publishedAt: "2026-10-02",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3565/piata-asigurarilor-din-romania-a-crescut-cu-15%25-in-primul-semestru-al-anului-2026",
    sourceType: "OFFICIAL",
    materialType: "raport",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/6abf63d6120b7859068272.pdf",
    officialDocumentLabel: "Raportul Semestrial ASF S1 2026 (PDF Oficial)",
    status: "published",
    verified: true,
    featured: true,
    keyTakeaways: [
      "Primele brute subscrise totale (societăți ASF + sucursale UE) au atins 14,2 miliarde de lei (+15% față de S1 2025).",
      "Asigurările generale domină piața cu o pondere de 78% din volumul total.",
      "Piața RCA a generat 6 miliarde de lei subscrieri (+17%), iar prima medie la autoturisme a ajuns la 2.093 lei în T2 2026.",
      "Dauna medie RCA a crescut cu 18%, deși numărul dosarelor a scăzut ușor, semnalând inflația pieselor și a manoperei service.",
      "Ratele de solvabilitate și lichiditate ale asigurătorilor rămân supraunitare (lichiditate 2,83 non-viață, 3,5 viață)."
    ],
    structuredContent: {
      whatHappened: "ASF a publicat raportul oficial privind dinamica pieței de asigurări în primele șase luni ale anului 2026. Documentul reflectă o expansiune continuă a subscrierilor, dar și presiuni persistente asupra profitabilității tehnice pe ramura RCA.",
      importantData: "Subscrieri totale: 14,2 miliarde lei (+15% YoY). Companiile autorizate ASF au crescut cu 13%, iar sucursalele UE cu 31%. Rata combinată a daunei pe asigurări generale a urcat la 93,4% (+3,5 pp), în timp ce pe segmentul RCA depășește în continuare 100%. Prima medie RCA autoturisme: 2.093 lei în T2 2026 (+21% YoY). Prima medie RCA transport marfă: 4.698 lei (+6% YoY).",
      context: "Piața este caracterizată de o concentrare ridicată pe polițele auto obligatorii și de prezența activă a sucursalelor din state membre UE în baza pașaportului european (libertatea de stabilire).",
      whatItMeans: "Pentru șoferi și companii, majorarea daunei medii (+18%) pune presiune directă pe tarifele de reînnoire RCA și CASCO. Pentru stabilitatea pieței, ratele confortabile de lichiditate oferă siguranța solvabilității curente.",
      whatClientMustKnow: "Verificați tarifele înainte de expirarea poliței curente și comparați ofertele asigurătorilor licențiați ASF cu cele ale sucursalelor europene, acordând atenție decontării directe și rețelei de service-uri partenere.",
      conclusion: "Creșterea volumului subscrierilor confirmă maturizarea pieței, însă asigurații trebuie să își gestioneze atent riscurile prin reînnoiri timpurii și clauze de protecție împotriva subasigurării."
    },
    relatedServiceSlug: "rca-insurance",
    relatedServiceName: "Asigurare RCA",
    seoTitle: "Piața Asigurărilor S1 2026: Creștere de 15% | Raport Oficial ASF",
    seoDescription: "Analiza oficială ASF a pieței de asigurări din România la semestrul I 2026: 14,2 miliarde lei subscrieri, evoluția primei medii RCA și a daunelor plătite.",
    tags: ["ASF", "Piața Asigurărilor", "Raport Oficial", "RCA", "Solvabilitate", "Daune", "S1 2026"]
  },

  // =========================================================================
  // 2. ASF — TARIFELE DE REFERINȚĂ RCA 2026
  // =========================================================================
  {
    id: "news-asf-tarife-referinta-rca-2026",
    slug: "tarife-referinta-rca-2026-raport-actuarial-asf-asigurati-risc-ridicat",
    title: "Tarifele de Referință RCA 2026: Raportul Actuarial ASF și Mecanismul Asiguratului cu Risc Ridicat",
    subtitle: "ASF a publicat indicatorii de referință pentru polițele RCA și procedura de alocare a tarifelor plafonate prin BAAR.",
    excerpt: "Află cum se calculează tarifele de referință RCA stabilite de ASF, ce rol au în moderarea ofertelor din piață și cum pot beneficia persoanele fizice și flotele comerciale de alocarea la tariful de referință dacă primesc oferte disproporționate.",
    category: "rca",
    categoryLabel: "RCA & Tarife de Referință",
    publishedAt: "2026-09-15",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/app.php/ro/a/3475/2026---rapoarte-piata-asigurarilor",
    sourceType: "OFFICIAL",
    materialType: "raport",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/6a195de05081a611842474.pdf",
    officialDocumentLabel: "Raportul Actuarial Tarife Referință RCA (PDF Oficial)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Tariful de referință nu este un preț fix obligatoriu, ci un indicator actuarial orientativ calculat independent.",
      "Orice asigurat care primește 3 oferte peste tariful de referință multiplicat cu factorul N poate apela la BAAR.",
      "BAAR recalculează și alocă polița către un asigurător autorizat la tariful de referință ajustat cu clasa Bonus-Malus.",
      "Pentru flotele de transport marfă și distribuție, mecanismul previne blocajele financiare generate de cotațiile excesive."
    ],
    structuredContent: {
      whatHappened: "ASF a actualizat raportul actuarial privind tarifele de referință RCA, instrument fundamental reglementat de Legea nr. 132/2017 pentru monitorizarea dispersiei primelor în piață și protecția asiguraților împotriva volatilității excesive a prețurilor.",
      importantData: "Raportul stabilește primele orientative pe categorii de vehicule (autoturisme, autoutilitare, autocamioane peste 16t), vârstă a asiguratului și capacitate cilindrică / putere KW, luând în calcul frecvența istorică a daunelor și costul mediu al vătămărilor și daunelor materiale.",
      context: "Legea RCA obligă ASF să publice semestrial aceste valori de referință. Totodată, dacă cel mai mic tarif primit de un client depășește tariful de referință x 1,36 (factorul legal N), clientul se califică automat ca 'asigurat cu risc ridicat'.",
      whatItMeans: "Dacă un șofer sau o companie de transport primește doar oferte disproporționat de mari, nu este obligat să accepte prețurile umflate din piață: poate solicita oficial prin platforma BAAR emiterea poliței la tariful de referință.",
      whatClientMustKnow: "Pentru a declanșa procedura BAAR aveți nevoie de cel puțin 3 oferte de la asigurători diferiți aflate în perioada de valabilitate și cererea depusă cu minimum 20 de zile înainte de expirarea poliței anterioare.",
      conclusion: "Cunoașterea tarifului de referință și a procedurii asiguratului cu risc ridicat este cel mai eficient instrument de negociere și protecție a bugetului auto."
    },
    relatedServiceSlug: "rca-insurance",
    relatedServiceName: "Asigurare RCA",
    seoTitle: "Tarife de Referință RCA 2026 | Raport Actuarial ASF & Ghid BAAR",
    seoDescription: "Consultă tarifele de referință RCA 2026 calculate de ASF și procedura oficială de plafonare prin mecanismul asiguratului cu risc ridicat BAAR.",
    tags: ["RCA", "Tarife de Referință", "ASF", "BAAR", "Risc Ridicat", "Transport Marfă"]
  },

  // =========================================================================
  // 3. ASF — SANCȚIUNI TERMENE PLATĂ DAUNE & REZERVE
  // =========================================================================
  {
    id: "news-asf-sanctiuni-termene-despagubire-2026",
    slug: "decizii-sanctionare-asf-termene-despagubire-rca-rezerve-dauna",
    title: "Decizii de Sancționare ASF: Respectarea Termenelor Legale de Plată a Daunelor și Constituirea Rezervelor Tehnice",
    subtitle: "Consiliul ASF a sancționat nerespectarea termenului legal de 30 de zile pentru plata despăgubirilor și deficiențele de control intern.",
    excerpt: "Măsurile prudențiale adoptate de Consiliul ASF reconfirmă obligația strictă a asigurătorilor de a achita despăgubirile în termenul de 30 de zile conform Legii 132/2017 și sancționează întârzierile nejustificate în dosarele de daună.",
    category: "daune",
    categoryLabel: "Daune & Supraveghere ASF",
    publishedAt: "2026-08-26",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3545/decizii-de-sanctionare-si-alte-masuri-adoptate-de-consiliul-asf-in-luna-iulie-2026",
    sourceType: "OFFICIAL",
    materialType: "decizie",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Legea 132/2017 (art. 21) obligă asigurătorul să formuleze o ofertă sau să respingă motivat cererea în maximum 30 de zile.",
      "Plata despăgubirii trebuie efectuată în cel mult 10 zile de la data acceptării ofertei de către păgubit.",
      "Pentru fiecare zi de întârziere la plată, asigurătorul datorează penalități legale de 0,2% pe zi din valoarea despăgubirii.",
      "Consiliul ASF monitorizează periodic adecvarea rezervelor tehnice de daune avizate (RBNS) pentru garantarea solvabilității."
    ],
    structuredContent: {
      whatHappened: "Consiliul ASF a adoptat o serie de decizii de sancționare și măsuri de remediere vizând companii de asigurare pentru depășirea termenelor legale de soluționare a cererilor de despăgubire și inadecvarea mecanismelor de control intern în gestiunea dosarelor de daună.",
      importantData: "Printre măsurile consemnate oficial în buletinul ASF se numără avertismentele emise conform art. 21 din Legea nr. 132/2017 (nerespectarea termenului de plată a despăgubirilor auto) și sancțiuni pecuniare privind gestiunea rezervelor de daune avizate.",
      context: "Piața daunelor auto este supusă unei monitorizări continue din partea autorității de reglementare, întrucât întârzierile la plată afectează atât păgubiții nevinovați, cât și unitățile reparatoare care finanțează temporar reparațiile.",
      whatItMeans: "Pentru orice asigurat sau terț păgubit, aceste decizii confirmă că asigurătorii nu au dreptul discreționar de a amâna plățile sau de a solicita documente redundante după depunerea dosarului complet de daună.",
      whatClientMustKnow: "Dacă asigurătorul nu formulează un răspuns în 30 de zile sau nu virează suma în termen de 10 zile de la transmiterea contului IBAN, solicitați formal penalitățile de întârziere de 0,2%/zi și sesizați Direcția Conduită și Supraveghere ASF sau entitatea SAL-FIN.",
      conclusion: "Cunoașterea calendarului legal de daună și documentarea riguroasă a fiecărei comunicări constituie cheia încasării prompte și integrale a despăgubirilor."
    },
    relatedServiceSlug: "generator-dosar-dauna",
    relatedServiceName: "Generator Dosar Daună",
    seoTitle: "Sancțiuni ASF Termene Plată Despăgubiri RCA | Ghid Legal Daune",
    seoDescription: "Deciziile oficiale ASF privind sancționarea întârzierilor la plata daunelor RCA. Drepturile păgubiților, termene legale de 30 de zile și penalități.",
    tags: ["ASF", "Daune", "Sancțiuni", "RCA", "Legea 132/2017", "Despăgubiri", "Penalități"]
  },

  // =========================================================================
  // 4. ASF — PENSII PRIVATE S1 2026 (PILONUL II & III)
  // =========================================================================
  {
    id: "news-asf-pensii-private-s1-2026",
    slug: "evolutie-pensii-private-s1-2026-crestere-active-raport-asf",
    title: "Activele Pensiilor Private au depășit 246 miliarde lei la S1 2026: Raportul Oficial ASF",
    subtitle: "Creștere de aproape 40% a valorii fondurilor Pilon II și III, confirmând rolul esențial al economisirii pe termen lung.",
    excerpt: "Sistemul pensiilor private din România a atins 246,2 miliarde lei active administrate la jumătatea anului 2026, reprezentând peste 9% din PIB. Randamentele nete au depășit semnificativ rata medie a inflației.",
    category: "viata",
    categoryLabel: "Pensii Private & Viață",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3570/pensiile-private-isi-consolideaza-rolul-in-economie,-cu-o-crestere-de-aproape-40%25-a-activelor,-pana-la-246,2-miliarde-de-lei,-la-jumatatea-anului-2026",
    sourceType: "OFFICIAL",
    materialType: "comunicat",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Activele totale ale fondurilor de pensii private au atins 246,2 miliarde lei (+39% YoY).",
      "Pilonul II (pensii obligatorii administrate privat) concentrează peste 95% din totalul activelor.",
      "Numărul participanților înregistrați în sistem depășește 8,2 milioane de salariați români.",
      "Peste 65% din active sunt investite în titluri de stat românești, garantând un profil de risc prudențial."
    ],
    structuredContent: {
      whatHappened: "ASF a publicat raportul semestrial consolidat privind sistemul pensiilor private din România, evidențiind o creștere remarcabilă a activelor totale administrate de societățile autorizate.",
      importantData: "Active nete: 246,2 miliarde de lei la 30 iunie 2026, față de 177 miliarde în perioada similară din 2025 (+39%). Pilonul II deține 237 miliarde lei, iar Pilonul III (facultativ) a depășit 6,2 miliarde lei. Randamentul mediu anualizat al fondurilor depășește 7,5% pe ultimii 5 ani.",
      context: "Creșterea a fost susținută de majorarea cotei de virament către Pilonul II la 4,75% din venitul brut, dar și de aprecierea portofoliului de acțiuni de pe Bursa de Valori București (indicele BET) și randamentele obligațiunilor suverane.",
      whatItMeans: "Pentru fiecare angajat român, contul individual de Pilon II reprezintă o proprietate privată intangibilă și transmisibilă prin moștenire, distinctă de pensia de stat distribuită prin sistemul PAYG.",
      whatClientMustKnow: "Verificați periodic la ce fond de pensii sunteți înscris și ce sumă s-a acumulat în contul dvs. folosind aplicația digitală oficială a ASF ('Află la ce fond de pensii ești!'). Pentru pensia facultativă Pilon III, contribuția este deductibilă fiscal până la 400 € anual.",
      conclusion: "Pilonul II și Pilonul III reprezintă piloni esențiali ai securității financiare la vârsta retragerii din activitate, oferind randamente reale și protecție împotriva deficitului demografic de pensii de stat."
    },
    relatedServiceSlug: "life-insurance",
    relatedServiceName: "Asigurări de Viață & Pensii",
    seoTitle: "Evoluția Pensiilor Private S1 2026: 246,2 Mld. Lei | Raport ASF",
    seoDescription: "Analiza oficială ASF a fondurilor de pensii private Pilon II și III: creștere de 39% a activelor, structura investițiilor și verificarea contului.",
    tags: ["ASF", "Pensii Private", "Pilonul II", "Pilonul III", "Economisire", "Investiții"]
  },

  // =========================================================================
  // 5. ASF — DORA & REZILIENȚA OPERAȚIONALĂ DIGITALĂ
  // =========================================================================
  {
    id: "news-asf-dora-rezilienta-digitala-tic-2026",
    slug: "regulament-european-dora-instructiune-asf-riscuri-cibernetice-tic",
    title: "Regulamentul European DORA și Instrucțiunea ASF: Noi Standarde de Reziliență Operațională Digitală și Riscuri TIC",
    subtitle: "Companiile de asigurări, brokerii și entitățile financiare intră sub cerințele uniforme de securitate cibernetică și raportare a incidentelor.",
    excerpt: "ASF a emis instrucțiunea oficială privind estimarea pierderilor și raportarea incidentelor majore TIC, în aplicarea Regulamentului European (UE) 2022/2554 (DORA). Află ce obligații tehnice și de continuitate operațională devin obligatorii.",
    category: "cyber",
    categoryLabel: "Cyber Risk & Reglementare DORA",
    publishedAt: "2026-05-20",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://www.asfromania.ro/ro/c/388/dora---regulamentul-%28ue%29-2022/2554",
    sourceType: "OFFICIAL",
    materialType: "legislatie",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/666bea60cd681639758552.pdf",
    officialDocumentLabel: "Prezentare Oficială Regulament European DORA (PDF ASF)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "DORA creează un cadru juridic unic și obligatoriu pentru reziliența digitală în tot spațiul UE.",
      "Entitățile financiare trebuie să monitorizeze permanent riscurile asociate furnizorilor terți de servicii cloud și software.",
      "Incidentele majore de securitate TIC trebuie clasificate și raportate către ASF după o metodologie strictă.",
      "Asigurarea Cyber Risk devine o componentă cheie de mitigare a expunerii financiare în planurile de continuitate."
    ],
    structuredContent: {
      whatHappened: "ASF a implementat cadrul secundar de aplicare a Regulamentului (UE) 2022/2554 privind reziliența operațională digitală a sectorului financiar (DORA) și a publicat instrucțiunile tehnice privind cuantificarea costurilor asociate incidentelor majore cibernetice.",
      importantData: "Regulamentul se aplică societăților de asigurare și reasigurare, intermediarilor de asigurări mari, administratorilor de pensii private și instituțiilor pieței de capital, instituind audituri de securitate independente și teste periodice avansate de penetrare (TLPT).",
      context: "Digitalizarea accelerată a fluxurilor de emitere și gestiune a contractelor a crescut expunerea la atacuri de tip ransomware, scurgeri de date confidențiale și întreruperi de servicii cauzate de dependența de marii furnizori tehnologici internaționali.",
      whatItMeans: "Pentru mediul de afaceri și clienți, reglementarea garantează protecția strictă a datelor cu caracter personal și a istoricului dosarelor de daune, diminuând riscul indisponibilității platformelor online.",
      whatClientMustKnow: "Companiile care activează ca parteneri sau subcontractori în sectorul financiar trebuie să respecte cerințele DORA în contractele de furnizare TIC și să verifice acoperirea polițelor proprii de Răspundere Profesională IT și Cyber Risk.",
      conclusion: "Reziliența digitală nu mai este doar o chestiune de departament IT, ci o responsabilitate directă de guvernanță corporativă la nivelul conducerii executive a oricărei companii moderne."
    },
    relatedServiceSlug: "corporate-cyber-risk",
    relatedServiceName: "Asigurare Cyber Risk",
    seoTitle: "Regulament DORA & Reziliență Digitală | Instrucțiune Oficială ASF",
    seoDescription: "Cum se aplică Regulamentul DORA în piața de asigurări din România. Ghid oficial ASF privind cerințele TIC, raportarea incidentelor și polițele Cyber.",
    tags: ["DORA", "ASF", "Cyber Risk", "Reziliență Operațională", "Legislație UE", "Securitate IT"]
  },

  // =========================================================================
  // 6. ASF — NORMA 22/2021 PRIVIND DISTRIBUȚIA ÎN ASIGURĂRI (IDD)
  // =========================================================================
  {
    id: "news-asf-norma-distributie-idd-2026",
    slug: "modificare-norma-22-2021-distributie-asigurari-asf-protectie-consumatori",
    title: "Modificarea Normei ASF nr. 22/2021 privind Distribuția de Asigurări: Noi Cerințe de Conduită Profesională și Transparență",
    subtitle: "ASF consolidează protecția clienților prin cerințe extinse privind analiza cerințelor și nevoilor (DNT) și prevenirea conflictelor de interese.",
    excerpt: "Proiectul normativ ASF aduce clarificări esențiale în aplicarea Directivei privind Distribuția în Asigurări (IDD): vânzarea consultativă bazată pe nevoile reale ale clientului, transparența comisioanelor și formarea profesională continuă a distribuitorilor.",
    category: "legislatie",
    categoryLabel: "Distribuție & Conduită Profesională",
    publishedAt: "2026-04-10",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3395/proiect-norma--pentru-modificarea-si-completarea-normei-autoritatii-de-supraveghere-financiara-nr.-22/2021-privind-distributia-de-asigurari",
    sourceType: "OFFICIAL",
    materialType: "legislatie",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Distribuitorul este obligat să execute formularul de analiză a cerințelor și nevoilor (DNT) înainte de emiterea oricărei polițe.",
      "Este interzisă recomandarea unui produs nepotrivit doar pe baza unui comision de intermediere mai mare.",
      "Intermediarii și agenții trebuie să parcurgă anual minimum 15 ore de pregătire profesională continuă certificată de ISF.",
      "Documentul de informare privind produsul de asigurare (IPID/PID) trebuie furnizat obligatoriu gratuit pe suport durabil."
    ],
    structuredContent: {
      whatHappened: "ASF a actualizat Norma nr. 22/2021 privind distribuția de asigurări pentru a întări standardele de transparență, consiliere obiectivă și integritate operațională ale brokerilor și intermediarilor care operează pe piața din România.",
      importantData: "Actul normativ transpune fidel principiile europene IDD și instituie cerințe clare de documentare a fiecărei recomandări de asigurare, sancționând practicile incorecte de vânzare încrucișată (cross-selling netransparent).",
      context: "Consumatorul modern de asigurări are nevoie de claritate între ofertele existente în piață. Fără o analiză documentată a nevoilor specifice, există riscul achiziționării unor polițe redundante sau care conțin excluderi incompatibile cu profilul de risc al clientului.",
      whatItMeans: "Pentru client, modificarea reglementării înseamnă că partenerul sau brokerul de asigurări este obligat să acționeze onest, echitabil și profesional în interesul cel mai bun al asiguratului, explicând riscurile neacoperite.",
      whatClientMustKnow: "Înainte de a semna sau a plăti o poliță, asigurați-vă că ați primit Documentul de Informare (IPID) și că ați răspuns corect la chestionarul de analiză a nevoilor, deoarece răspunsurile furnizate servesc drept bază juridică a contractului.",
      conclusion: "Consilierea profesională autorizată adaugă valoare reală asiguratului prin identificarea lacunelor de protecție și selectarea acoperirilor optime raportate la buget."
    },
    relatedServiceSlug: "despre-mine",
    relatedServiceName: "Consultanță & Parteneriat Generali",
    seoTitle: "Modificarea Normei ASF 22/2021 | Distribuție Asigurări & IDD",
    seoDescription: "Prevederile esențiale ale Normei ASF privind distribuția în asigurări: analiza nevoilor clientului (DNT), documentul IPID și cerințe de transparență.",
    tags: ["ASF", "Distribuție Asigurări", "Norma 22/2021", "IDD", "IPID", "Protecția Consumatorilor"]
  },

  // =========================================================================
  // 7. ASF — SAL-FIN: SOLUȚIONAREA ALTERNATIVĂ A LITIGIILOR
  // =========================================================================
  {
    id: "news-asf-sal-fin-solutionare-litigii-2026",
    slug: "sal-fin-solutionare-alternativa-gratuita-litigii-asigurari-ghid-asf",
    title: "Entitatea SAL-FIN: Cum rezolvi gratuit și rapid litigiile cu asigurătorii fără proces în instanță",
    subtitle: "Procedura extrajudiciară sub egida ASF permite soluționarea disputelor privind despăgubirile în termen de 90 de zile.",
    excerpt: "Dacă asigurătorul refuză nejustificat plata daunei sau oferă o sumă disproporționat de mică, poți apela la SAL-FIN. Procedura este gratuită pentru consumatori, se derulează online și are forță juridică executorie dacă este acceptată.",
    category: "daune",
    categoryLabel: "Litigii Daune & SAL-FIN",
    publishedAt: "2026-06-18",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Entitatea de Soluționare Alternativă a Litigiilor (SAL-FIN) & ASF",
    sourceUrl: "https://asfromania.ro/ro/a/1551/sal-fin",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "SAL-FIN este singura entitate de soluționare alternativă a litigiilor din România competentă pe piața financiară nonbancară.",
      "Procedura este complet gratuită pentru consumatorii persoane fizice și se finalizează în maximum 90 de zile.",
      "Litigiul poate fi soluționat prin propunerea unei soluții (conciliere) sau prin impunerea unei soluții de arbitraj tehnic.",
      "Hotărârea acceptată de părți are puterea unei tranzacții judiciare cu titlu executoriu."
    ],
    structuredContent: {
      whatHappened: "ASF a actualizat regulamentul de funcționare a entității SAL-FIN, facilitând accesul digital al consumatorilor la procedurile de conciliere în dosarele de daună auto, locuință sau sănătate contestate.",
      importantData: "Peste 80% din procedurile derulate prin SAL-FIN se finalizează cu acordul părților, evitând termenele îndelungate de judecată (care în instanțele civile pot dura între 1 și 3 ani) și costurile ridicate cu taxele de timbru și onorariile de expertiză judiciară.",
      context: "Creată conform O.G. nr. 38/2015 și directivelor europene privind soluționarea alternativă a disputelor (ADR), SAL-FIN oferă un mecanism echidistant în care conciliatorii independenți analizează contractul de asigurare și condițiile de poliță.",
      whatItMeans: "Pentru un asigurat aflat în dezacord cu oferta de despăgubire a unui asigurător, SAL-FIN oferă pârghia legală de reevaluare a dosarului fără riscul de a suporta cheltuieli de judecată.",
      whatClientMustKnow: "Condiție preliminară: consumatorul trebuie să fi transmis anterior o reclamație scrisă către asigurător la care nu a primit răspuns în 30 de zile sau răspunsul a fost nesatisfăcător. Cererea se depune electronic pe www.salfin.ro.",
      conclusion: "SAL-FIN constituie o cale civilizată, rapidă și gratuită de obținere a despăgubirilor legitime, restabilind echilibrul între consumator și marile instituții financiare."
    },
    relatedServiceSlug: "generator-dosar-dauna",
    relatedServiceName: "Generator Dosar Daună",
    seoTitle: "SAL-FIN: Soluționarea Gratuită a Litigiilor din Asigurări | Ghid ASF",
    seoDescription: "Află cum funcționează SAL-FIN pentru rezolvarea disputelor de daună cu firmele de asigurări: procedură în 90 de zile, conciliere gratuită și soluții executorii.",
    tags: ["SAL-FIN", "ASF", "Litigii Asigurări", "Daune", "Reclamații", "Conciliere", "Protecția Consumatorilor"]
  },

  // =========================================================================
  // 8. ASF — GHIDUL OFICIAL AL AUTORITĂȚILOR EUROPENE (EIOPA / ESMA / EBA)
  // =========================================================================
  {
    id: "news-asf-ghid-consumatori-autoritati-europene-2026",
    slug: "ghidul-oficial-consumatori-asigurari-investitii-eiopa-esma-asf",
    title: "Ghidul Oficial al Autorităților Europene (EIOPA & ESMA) pentru Asigurați și Investitori: Clauze Critice și Protecția Economiilor",
    subtitle: "Material orientativ publicat de ASF pentru protecția consumatorilor împotriva inflației, excluderilor contractuale și fraudelor.",
    excerpt: "Autoritățile Europene de Supraveghere au sintetizat principalele riscuri financiare ale familiilor în climatul economic actual. Află ce trebuie să verifici în contractele de asigurare de viață, sănătate și bunuri.",
    category: "preventie",
    categoryLabel: "Ghiduri Oficiale & Protecție Financiară",
    publishedAt: "2026-05-12",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF) & EIOPA",
    sourceUrl: "https://asfromania.ro/ro/a/1689/ghiduri-asigurari",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/65798692c3361411225013.pdf",
    officialDocumentLabel: "Ghidul Oficial ESMA-EIOPA-EBA pentru Consumatori (PDF Oficial)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Inflația erodează sumele asigurate fixe: este necesară indexarea anuală a valorii reconstrucției și a sumelor asigurate de viață.",
      "Verificați lista excluderilor din contract înainte de semnare, nu după producerea evenimentului asigurat.",
      "Pentru asigurările de viață cu componentă investițională (Unit-Linked), randamentele trecute nu garantează performanța viitoare.",
      "Consumatorul are dreptul legal de retragere fără penalități în termen de 30 de zile de la încheierea unei asigurări de viață."
    ],
    structuredContent: {
      whatHappened: "ASF a pus la dispoziția publicului ghidul comun redactat de Autoritatea Europeană pentru Asigurări și Pensii Ocupaționale (EIOPA), Autoritatea Europeană pentru Valori Mobiliare și Piețe (ESMA) și Autoritatea Bancară Europeană (EBA).",
      importantData: "Documentul analizează impactul dobânzilor și inflației asupra contractelor pe termen lung, oferind o listă clară de verificare pentru asigurați privind costurile totale de administrare (TER) și clauzele de franșiză.",
      context: "Instabilitatea macroeconomică impune vigilență sporită: menținerea unei sume asigurate neschimbate timp de 5 ani poate conduce la o subasigurare de peste 30-40% în caz de daună totală la o clădire rezidențială.",
      whatItMeans: "Pentru familii, aplicarea recomandărilor din ghid previne surprizele neplăcute în caz de daună majoră, când se descoperă că despăgubirea este redusă proporțional cu gradul de subasigurare.",
      whatClientMustKnow: "Regula de aur a ghidului european: dacă nu înțelegeți un termen tehnic sau modul de calcul al unei despăgubiri, cereți clarificări scrise înainte de semnătură. Asigurarea trebuie să rezolve o nevoie certă, nu să creeze costuri opace.",
      conclusion: "Educația financiară și consultanța calificată transformă polița de asigurare într-un scut real de protecție a prosperității familiei."
    },
    relatedServiceSlug: "family-protection-pack",
    relatedServiceName: "Pachetul Protecția Familiei",
    seoTitle: "Ghid European Consumatori Asigurări & Investiții | EIOPA & ASF",
    seoDescription: "Ghidul oficial EIOPA și ASF pentru consumatorii de asigurări: clauze de excludere, indexarea cu inflația și protecția împotriva subasigurării.",
    tags: ["EIOPA", "ASF", "Ghid Consumatori", "Educație Financiară", "Protecție Financiară", "Subasigurare"]
  },

  // =========================================================================
  // 9. ASF — AVERTISMENT OFICIAL PRIVIND FRAUDELE & UZURPAREA IDENTITĂȚII
  // =========================================================================
  {
    id: "news-asf-alerte-fraude-identitate-2026",
    slug: "avertisment-oficial-asf-fraude-financiare-falsa-identitate-entitati-neautorizate",
    title: "Avertisment Oficial ASF: Cum te protejezi de tentativele de fraudă prin utilizarea frauduloasă a identității instituționale",
    subtitle: "ASF atrage atenția asupra apelurilor și site-urilor-clonă care pretind că deblochează despăgubiri sau taxe de asigurare.",
    excerpt: "Autoritatea de Supraveghere Financiară avertizează cetățenii: ASF nu apelează telefonic persoanele fizice pentru a le solicita plăți, comisioane sau date bancare. Află pașii de verificare în Registrul Public Oficial.",
    category: "preventie",
    categoryLabel: "Alerte de Securitate & Prevenție",
    publishedAt: "2026-05-18",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "3 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3113/autoritatea-de-supraveghere-financiara-atrage-atentia-cu-privire-la-email-urile-sau-apelurile-telefonice-primite-de-la-persoane-care-pretind-a-fi-angajati-ai-unor-entitati-autorizate-de-a.s.f.",
    sourceType: "OFFICIAL",
    materialType: "informare",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "ASF nu sună consumatorii de la numărul 0800.825.627 pentru a solicita date sau plăți.",
      "Nicio instituție oficială nu solicită taxe pentru a 'debloca' dosare de daună sau plăți de la FGA.",
      "Verificați orice intermediar sau societate în Registrul Public ASF înainte de a trimite documente sau bani.",
      "Fraudele din social media folosesc imagini clonate și promisiuni de câștiguri nerealiste în numele ASF."
    ],
    structuredContent: {
      whatHappened: "ASF a emis avertizări publice succesive privind proliferarea schemelor de inginerie socială și phishing în care atacatorii uzurpă identitatea vizuală a autorității de reglementare sau a unor asigurători consacrați.",
      importantData: "Peste 11.600 de sesizări și apeluri au fost procesate de ASF în S1 2026, o parte semnificativă vizând verificarea legitimității unor comunicări primite de la entități necunoscute din state terțe sau din mediul online.",
      context: "Tehnologiile moderne (deepfake, adrese email spoofate) permit infractorilor cibernetici să creeze aparența unor corespondențe oficiale din partea autorităților financiare.",
      whatItMeans: "Consumatorii trebuie să exercite o prudență extremă: transmiterea datelor de pe card sau a codurilor de securitate către terți care pretind că sunt inspectori ASF atrage pierderea irecuperabilă a fondurilor.",
      whatClientMustKnow: "Orice despăgubire sau virament din asigurări se face exclusiv prin cont bancar direct către titularul dreptului de despăgubire, fără nicio solicitare prealabilă de plată a vreunei garanții.",
      conclusion: "Vigilența și verificarea pe canale oficiale rămân cele mai eficiente măsuri de apărare împotriva fraudelor din spațiul digital."
    },
    relatedServiceSlug: "contact",
    relatedServiceName: "Contact & Asistență",
    seoTitle: "Avertisment ASF: Fraude Financiare & Falsă Identitate | Ghid Prevenție",
    seoDescription: "Avertismentul oficial ASF privind tentativele de fraudă, apelurile false și site-urile clonă. Cum să verifici un intermediar autorizat.",
    tags: ["ASF", "Avertisment", "Fraude", "Securitate", "Prevenție", "Registrul Public"]
  },

  // =========================================================================
  // 10. ASF & FGA — PROCEDURA DE PLATĂ A DESPĂGUBIRILOR DIN FALIMENTE
  // =========================================================================
  {
    id: "news-asf-fga-ghid-plati-faliment-2026",
    slug: "ghid-oficial-fga-asf-plata-despagubiri-faliment-asiguratori-plafon-legal",
    title: "Ghidul Oficial FGA și ASF: Procedura de Încasare a Despăgubirilor din Falimentele Asigurătorilor",
    subtitle: "Plafonul legal de garantare de 500.000 lei per creanță și pașii de depunere a cererii de plată online.",
    excerpt: "Fondul de Garantare a Asiguraților și ASF explică drepturile asiguraților și ale păgubiților RCA în cazul insolvenței unei companii de asigurări. Cum se depun Anexa 10 și cererile de plată fără intermediari neautorizați.",
    category: "legislatie",
    categoryLabel: "Fondul de Garantare & Stabilitate",
    publishedAt: "2026-06-20",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Fondul de Garantare a Asiguraților (FGA) & ASF",
    sourceUrl: "https://www.fgaromania.ro/",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "FGA garantează plata despăgubirilor până la 500.000 lei per creanță de asigurare conform Legii nr. 213/2015.",
      "Cererile de plată se depun de la data retragerii autorizației și până la 90 de zile de la rămânerea definitivă a falimentului.",
      "Procedura de avizare și cererea de plată (Anexa 10) se transmit gratuit exclusiv online pe portalul FGA.",
      "Nu plătiți niciun comision către intermediari care promit urgentarea dosarului: FGA instrumentează cererile strict cronologic."
    ],
    structuredContent: {
      whatHappened: "ASF și FGA au consolidat mecanismul operațional de preluare și plată a creanțelor rezultate din falimentele din piața asigurărilor, actualizând ghidul practic destinat creditorilor de asigurare.",
      importantData: "Plafonul legal de garantare stabilit prin OUG 102/2021 este de 500.000 de lei pentru fiecare creanță de asigurare datorată în temeiul unui contract de asigurare încheiat cu asigurătorul aflat în insolvență.",
      context: "FGA intervine ca fond de garantare public alimentat prin contribuțiile tuturor asigurătorilor autorizați din România, protejând consumatorii în situația extremă a eșecului financiar al unui operator de pe piață.",
      whatItMeans: "Dacă ați fost păgubit într-un accident produs de un asigurat al unei companii în faliment sau dacă dețineți o poliță facultativă la o astfel de companie, dreptul dvs. la despăgubire este protejat prin lege în limita plafonului.",
      whatClientMustKnow: "Urmăriți stadiul cererii de plată direct pe site-ul oficial www.fgaromania.ro folosind numărul de înregistrare primit la depunere. Asigurați-vă că dosarul conține actele constatatoare, devizul de reparație și extrasul de cont bancar valabil.",
      conclusion: "Mecanismul FGA funcționează ca o plasă de siguranță instituțională, asigurând continuitatea despăgubirilor indiferent de dificultățile financiare ale unui asigurător izolat."
    },
    relatedServiceSlug: "generator-dosar-dauna",
    relatedServiceName: "Generator Dosar Daună",
    seoTitle: "Ghid Oficial FGA: Plăți Despăgubiri Faliment | Procedură ASF",
    seoDescription: "Procedura oficială de încasare a despăgubirilor de la Fondul de Garantare a Asiguraților (FGA). Plafon de 500.000 lei, depunere Anexa 10 și pași legali.",
    tags: ["FGA", "ASF", "Faliment Asigurări", "Despăgubiri", "Plafon Garantare", "Legea 213/2015"]
  },

  // =========================================================================
  // 11. ASF — CLARIFICARE PRIVIND RAPORTĂRILE CONTABILE SEMESTRIALE
  // =========================================================================
  {
    id: "news-asf-raportari-contabile-semestriale-2026",
    slug: "clarificare-asf-obligatia-raportarilor-contabile-semestriale-entitati-asigurari",
    title: "Clarificare Oficială ASF: Obligativitatea Depunerii Raportărilor Contabile Semestriale pentru Companiile de Asigurări și Brokeri",
    subtitle: "Derogările Ministerului Finanțelor nu se aplică pieței financiare nebancare, entitățile supravegheate rămânând sub raportare Solvency II.",
    excerpt: "ASF a emis o notă de clarificare oficială confirmând că entitățile din domeniul asigurărilor au obligația fermă de a întocmi și depune raportările contabile semestriale, asigurând monitorizarea neîntreruptă a solvabilității.",
    category: "legislatie",
    categoryLabel: "Prudență & Reglementare Contabilă",
    publishedAt: "2026-07-22",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "3 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3521/clarificare-privind-obligatia-de-intocmire-si-depunere-a-raportarilor-contabile-semestriale-de-catre-entitatile-din-domeniul-asigurarilor",
    sourceType: "OFFICIAL",
    materialType: "decizie",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Reglementările specifice ASF (Norma nr. 34/2020) prevalează asupra normelor generale ale Ministerului Finanțelor.",
      "Asigurătorii și brokerii autorizați transmit situațiile financiare semestriale pentru verificarea adecvării capitalului.",
      "Raportarea permite monitorizarea promptă a lichidității și a constituirii rezervelor tehnice de daună.",
      "Transparența contabilă strictă previne acumularea dezechilibrelor de solvabilitate în sistem."
    ],
    structuredContent: {
      whatHappened: "ASF a intervenit public cu o clarificare fermă în urma anunțului Ministerului Finanțelor privind eliminarea raportărilor semestriale pentru anumite categorii de agenți economici, precizând că domeniul asigurărilor este exceptat de la această relaxare.",
      importantData: "Toate societățile de asigurare și intermediarii care aplică reglementările contabile aprobate prin Norma ASF nr. 34/2020 au obligația de a transmite raportările semestriale la termenele statutare stabilite.",
      context: "Directiva europeană Solvency II impune o monitorizare continuă a cerinței de capital de solvabilitate (SCR) și a cerinței de capital minim (MCR). Renunțarea la raportările semestriale ar fi creat un unghi mort de supraveghere incompatibil cu legislația UE.",
      whatItMeans: "Pentru piață și asigurați, menținerea raportărilor garantează că sănătatea financiară a asigurătorilor este verificată periodic de către autoritate, diminuând riscul de instabilitate.",
      whatClientMustKnow: "Piața asigurărilor funcționează sub cele mai stricte rigori prudențiale din economie. Asigurații pot avea certitudinea că operatorii autorizați sunt auditați continuu.",
      conclusion: "Rigoarea prudențială și menținerea standardelor stricte de transparență consolidează încrederea consumatorilor în piața națională de asigurări."
    },
    relatedServiceSlug: "despre-mine",
    relatedServiceName: "Consultanță & Parteneriat Generali",
    seoTitle: "Clarificare ASF: Raportări Contabile Semestriale Asigurări | Notă Oficială",
    seoDescription: "Nota oficială ASF privind obligativitatea depunerii raportărilor contabile semestriale de către societățile de asigurare și brokeri conform Normei 34/2020.",
    tags: ["ASF", "Raportări Contabile", "Solvency II", "Norma 34/2020", "Supraveghere", "Solvabilitate"]
  },

  // =========================================================================
  // 12. ASF — BILANȚ CALL CENTER & PROTECȚIA CONSUMATORILOR S1 2026
  // =========================================================================
  {
    id: "news-asf-bilant-call-center-consumatori-2026",
    slug: "bilant-asf-call-center-protectia-consumatorilor-interactiuni-s1-2026",
    title: "Bilanț Relații cu Consumatorii S1 2026: Peste 11.600 de apeluri gestionate de Call Center-ul ASF și 332.000 de verificări ale fondurilor de pensii",
    subtitle: "Domeniul asigurărilor a generat cea mai mare parte a solicitărilor de clarificare din partea publicului larg.",
    excerpt: "Raportul oficial ASF privind activitatea de relații cu publicul în prima jumătate a anului 2026 indică un interes ridicat al cetățenilor pentru soluționarea dosarelor RCA, procedurile FGA și verificarea apartenenței la fondurile de pensii Pilon II.",
    category: "preventie",
    categoryLabel: "Consumatori & Asistență Publică",
    publishedAt: "2026-07-30",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "3 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/3523/peste-11.600-de-interactiuni-telefonice-gestionate-de-call-center-ul-asf--in-primul-semestru-al-anului-2026",
    sourceType: "OFFICIAL",
    materialType: "comunicat",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Peste 11.600 de interacțiuni telefonice directe preluate prin TelVerde ASF în primele 6 luni ale anului.",
      "Segmentul asigurărilor a reprezentat circa 65% din totalul solicitărilor cetățenilor.",
      "Aplicația electronică 'Află la ce fond de pensii ești!' a fost accesată de peste 332.000 de persoane.",
      "ASF oferă gratuit consultanță privind drepturile asiguraților și pașii de urmat în caz de divergențe."
    ],
    structuredContent: {
      whatHappened: "ASF a prezentat bilanțul activității de comunicare directă cu consumatorii pe primul semestru al anului 2026, subliniind creșterea utilizării canalelor digitale de informare și a liniei telefonice gratuite de asistență.",
      importantData: "Interacțiuni Call Center: 11.600 apeluri. Utilizatori aplicație pensii: 332.000 căutări. Temele prioritare: plata despăgubirilor auto (Legea 132/2017), cererile de plată FGA și calculul claselor Bonus-Malus.",
      context: "Creșterea nivelului de conștientizare financiară determină tot mai mulți asigurați să își verifice activ drepturile legale înainte de a accepta oferte diminuate de despăgubire.",
      whatItMeans: "Pentru cetățeni, existența serviciului de call center ASF (0800.825.627) oferă o linie neutră de validare în situațiile în care comunicarea cu asigurătorul este blocată.",
      whatClientMustKnow: "Înainte de a suna la call center, pregătiți seria de șasiu a vehiculului, numărul dosarului de daună și denumirea companiei de asigurare pentru a primi îndrumare tehnică exactă.",
      conclusion: "Accesul facil la informații oficiale și canale transparente de dialog reprezintă cheia protecției eficiente a consumatorilor pe piața de asigurări."
    },
    relatedServiceSlug: "contact",
    relatedServiceName: "Contact & Asistență",
    seoTitle: "Bilanț Call Center ASF S1 2026: 11.600 Apeluri & Pensii | Raport",
    seoDescription: "Bilanțul oficial al interacțiunilor ASF cu consumatorii în S1 2026: dosare de daună, tarife RCA și verificarea contului de pensii Pilon II.",
    tags: ["ASF", "Consumatori", "Call Center", "Petiții", "Pensii Private", "Asistență"]
  },

  // =========================================================================
  // 13. ASF — RAPORTUL OFICIAL TRIMESTRUL I 2026 (PIAȚA ASIGURĂRILOR)
  // =========================================================================
  {
    id: "news-asf-raport-t1-2026-piata-asigurari",
    slug: "raport-trimestrul-1-2026-piata-asigurari-evolutie-clase-asf",
    title: "Raportul ASF pe Primul Trimestru 2026: Subscrieri pe Clase de Asigurare și Rata Daunei",
    subtitle: "Dinamica pieței non-viață și a asigurărilor de sănătate corporate la începutul exercițiului financiar 2026.",
    excerpt: "Raportul trimestrial publicat de ASF detaliază performanța tehnică a companiilor de asigurări în T1 2026: evoluția claselor A3 (CASCO), A8 (incendiu și calamități) și A10 (RCA/CMR), reflectând creșterea gradului de protecție al companiilor.",
    category: "industrie",
    categoryLabel: "Rapoarte Trimestriale ASF",
    publishedAt: "2026-06-15",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/app.php/ro/a/3475/2026---rapoarte-piata-asigurarilor",
    sourceType: "OFFICIAL",
    materialType: "raport",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/6a562c44b2ef8222294237.pdf",
    officialDocumentLabel: "Raportul Trimestrial ASF T1 2026 (PDF Oficial)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Subscrierile din T1 2026 au confirmat tendința de consolidare a segmentelor CASCO și Sănătate de grup.",
      "Ponderea asigurărilor generale a rămas dominantă la peste 80% din volumul total de piață.",
      "Asigurările de bunuri (clasa A8 - incendiu și calamități naturale) au înregistrat un avans susținut pe segmentul IMM.",
      "Companiile autorizate de ASF au menținut o rată de solvabilitate confortabilă conform regimului Solvency II."
    ],
    structuredContent: {
      whatHappened: "ASF a dat publicității raportul detaliat privind evoluția pieței de asigurări în primele trei luni ale anului 2026, incluzând datele statistice agregate ale tuturor societăților autorizate și ale sucursalelor europene.",
      importantData: "Documentul analizează structura primelor brute subscrise pe fiecare clasă de asigurare, nivelul rezervelor de daune neachitate și dinamica indemnizațiilor brute plătite asiguraților.",
      context: "Trimestrul I reprezintă de regulă o perioadă de reînnoire masivă a contractelor comerciale de asigurare ale companiilor (flote auto, asigurări de proprietăți industriale, garanții contractuale).",
      whatItMeans: "Pentru mediul de afaceri, datele trimestriale confirmă apetitul sporit al asigurătorilor pentru riscurile comerciale calificate și stabilitatea prețurilor pe liniile non-auto.",
      whatClientMustKnow: "Raportul oficial ASF conține anexele editabile cu clasamentele de piață, permițând asiguraților să evalueze cota de piață și stabilitatea companiei la care dețin polițe.",
      conclusion: "Rezultatele primului trimestru au pus bazele creșterii robuste de 15% confirmate ulterior la semestrul I 2026."
    },
    relatedServiceSlug: "sme-business-pack",
    relatedServiceName: "Pachetul Corporate & IMM",
    seoTitle: "Raport ASF Trimestrul I 2026 | Piața Asigurărilor România",
    seoDescription: "Datele oficiale ASF pe primul trimestru 2026: volum prime brute subscrise, structura pe clase non-viață și solvabilitatea societăților.",
    tags: ["ASF", "Raport Trimestrial", "T1 2026", "Piața Asigurărilor", "CASCO", "IMM", "Solvabilitate"]
  },

  // =========================================================================
  // 14. ASF & PAID — GHIDUL OFICIAL AL ASIGURĂRII OBLIGATORII PAD
  // =========================================================================
  {
    id: "news-asf-ghid-pad-locuinte-2026",
    slug: "ghidul-oficial-pad-paid-romania-asf-asigurarea-obligatorie-locuinte",
    title: "Ghidul Oficial al Asigurării Obligatorii a Locuinței (PAD): Cadrul Legal, Suma Asigurată și Interdicția Emiterii fără PAD",
    subtitle: "Ce prevede Legea nr. 260/2008 privind protecția împotriva cutremurelor, inundațiilor și alunecărilor de teren.",
    excerpt: "Materialul oficial publicat de ASF și PAID România explică mecanismul poliței PAD: prima de 130 lei/an pentru 20.000 € acoperire, obligativitatea deținerii PAD pentru orice asigurare facultativă și rolul la tranzacțiile imobiliare.",
    category: "locuinta",
    categoryLabel: "Asigurări Locuință & Ghid PAD",
    publishedAt: "2026-05-10",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "PAID România & Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/ro/a/1689/ghiduri-asigurari",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/60d323a97493f672717392.pdf",
    officialDocumentLabel: "Ghidul Oficial PAD (PDF ASF / PAID)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polița PAD este obligatorie prin Legea 260/2008 pentru toate locuințele de pe teritoriul României.",
      "Suma asigurată este de 20.000 € (primă 130 lei/an) pentru Tip A și 10.000 € (primă 50 lei/an) pentru Tip B.",
      "Companiile de asigurări au interdicția legală de a emite o poliță facultativă fără o poliță PAD activă în prealabil.",
      "Polița PAD acoperă exclusiv 3 riscuri catastrofice: cutremur, inundații naturale și alunecări de teren."
    ],
    structuredContent: {
      whatHappened: "ASF și PAID România au actualizat ghidul de informare privind asigurarea obligatorie a locuințelor, clarificând aplicarea modificărilor legislative care interzic înregistrarea tranzacțiilor la cartea funciară fără dovada asigurării PAD.",
      importantData: "Peste 2,2 milioane de locuințe sunt asigurate prin PAD la nivel național, gradul de cuprindere situându-se la circa 22,4%. PAID dispune de un program de reasigurare catastrofică de peste 1,1 miliarde de euro plasat pe piețele internaționale.",
      context: "România este una dintre țările europene cu cea mai ridicată expunere seismică și la inundații de bazin hidrografic, mecanismul PAID fiind conceput ca un pool de solidaritate națională.",
      whatItMeans: "Pentru orice proprietar, deținerea poliței PAD este o obligație legală, dar plafonul de 20.000 € nu acoperă decât o fracțiune din valoarea unei locuințe. Protecția completă impune adăugarea unei polițe facultative pentru incendiu, explozie și furtună.",
      whatClientMustKnow: "Verificați valabilitatea poliței PAD înainte de expirare. Asigurarea facultativă nu poate fi reînnoită dacă polița PAD a expirat fie și cu o singură zi.",
      conclusion: "Polița PAD asigură respectarea legii și o bază catastrofică esențială, fiind primul pas obligatoriu în securizarea căminului familiei."
    },
    relatedServiceSlug: "home-insurance",
    relatedServiceName: "Asigurare Locuință",
    seoTitle: "Ghidul Oficial PAD: Asigurarea Obligatorie Locuințe | PAID & ASF",
    seoDescription: "Totul despre polița obligatorie de locuință PAD conform Legii 260/2008: sume asigurate, riscuri acoperite și ghidul oficial descărcabil în PDF.",
    tags: ["PAD", "PAID România", "ASF", "Asigurare Locuință", "Cutremur", "Inundații", "Ghid Oficial"]
  },

  // =========================================================================
  // 15. ASF — RAPORTUL ANUAL CONSOLIDAT AL PIEȚEI ASIGURĂRILOR (2024 / 2025)
  // =========================================================================
  {
    id: "news-asf-raport-anual-consolidat-2024",
    slug: "raport-anual-oficial-asf-piata-asigurari-romania-consolidat",
    title: "Raportul Anual Consolidat al Pieței Asigurărilor: 23,4 miliarde lei Prime Brute Subscrise și 10,6 miliarde lei Despăgubiri Achitate",
    subtitle: "Analiza exhaustivă a sectorului de asigurări din România publicată de ASF: structura pe piețe, solvabilitate și despăgubiri record.",
    excerpt: "Raportul anual oficial al ASF consemnează o piață totală de 23,4 miliarde de lei, dominată de asigurările generale (81,5%), și o creștere anuală de 24% a despăgubirilor plătite către asigurați și terți păgubiți.",
    category: "industrie",
    categoryLabel: "Raport Anual Consolidat ASF",
    publishedAt: "2025-03-25",
    updatedAt: "2026-10-18",
    collectedAt: "2026-10-18",
    readTime: "6 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    sourceType: "OFFICIAL",
    materialType: "raport",
    officialDocumentUrl: "https://asfromania.ro/uploads/articole/attachments/67efbfa31bf14595716642.pdf",
    officialDocumentLabel: "Raportul Anual Integral ASF (PDF Oficial)",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Volum total piață: 23,40 miliarde RON (19,8 mld. RON societăți reglementate ASF + 3,6 mld. RON sucursale UE).",
      "Asigurările generale (non-life) însumează 19,09 miliarde RON (81,5% din total piață).",
      "Asigurările de viață (life) reprezintă 4,34 miliarde RON (18,5% din totalul subscrierilor).",
      "Indemnizațiile brute plătite au atins nivelul record de 10,60 miliarde RON (+24% YoY).",
      "Pe piață activează 25 de societăți de asigurare autorizate ASF și 14 sucursale europene pe pașaport FOE."
    ],
    structuredContent: {
      whatHappened: "ASF a publicat sinteza anuală completă a pieței de asigurări din România, documentul de referință fundamental pentru toți profesioniștii, companiile și instituțiile financiare din țară.",
      importantData: "23,40 miliarde lei PBS total. Creștere anuală a subscrierilor de 11%. Plățile de despăgubiri au crescut de două ori mai rapid decât subscrierile (+24% YoY, până la 10,6 miliarde lei), confirmând rolul de amortizor financiar al industriei.",
      context: "Exercițiul analizat a fost marcat de stabilizarea cotei de piață după ieșirea operatorilor insolvenți și creșterea ponderii sucursalelor europene (precum Axeria IARD și Hellas Direct).",
      whatItMeans: "Volumul mare de despăgubiri achitate demonstrează că sistemul funcționează și compensează pierderile reale, dar impune o selecție atentă a asigurătorilor solvabili cu lichidități solide.",
      whatClientMustKnow: "Înainte de a alege un asigurător, verificați dacă acesta este supravegheat direct de ASF sau dacă este o sucursală europeană ce raportează reglementatorului din statul de origine (Franța, Grecia etc.).",
      conclusion: "Raportul anual ASF atestă forța financiară a pieței de asigurări din România, oferind o bază solidă pentru deciziile de protecție a patrimoniului și afacerilor."
    },
    relatedServiceSlug: "despre-mine",
    relatedServiceName: "Consultanță & Parteneriat Generali",
    seoTitle: "Raport Anual ASF Piața Asigurărilor România | Sinteză Oficială",
    seoDescription: "Datele oficiale agregate din Raportul Anual ASF: 23,4 miliarde lei subscrieri, 10,6 miliarde lei despăgubiri achitate și structura pe societăți.",
    tags: ["ASF", "Raport Anual", "Piața Asigurărilor", "Statistici Oficiale", "Solvență", "Despăgubiri"]
  },

  // =========================================================================
  // 16. BAAR — DIGITALIZAREA CONSTATĂRII AMIABILE (APLICAȚIA OFICIALĂ)
  // =========================================================================
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
    collectedAt: "2026-10-18",
    readTime: "3 min",
    sourceName: "Biroul Asigurătorilor de Autovehicule din România (BAAR)",
    sourceUrl: "https://www.baar.ro",
    sourceType: "OFFICIAL",
    materialType: "comunicat",
    status: "published",
    verified: true,
    featured: false,
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

  // =========================================================================
  // 17. UNSAR — CREȘTERE DESPĂGUBIRI CASCO FENOMENE METEO EXTREME
  // =========================================================================
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
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Uniunea Națională a Societăților de Asigurare și Reasigurare din România (UNSAR)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "comunicat",
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

  // =========================================================================
  // 18. PAID & UNSAR — POLIȚA PAD VS ASIGURAREA FACULTATIVĂ DE LOCUINȚĂ
  // =========================================================================
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
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Pool-ul de Asigurare Împotriva Dezastrelor Naturale (PAID România) & UNSAR",
    sourceUrl: "https://paidromania.ro",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
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

  // =========================================================================
  // 19. CASCO PENTRU MAȘINI ELECTRICE ȘI PLUG-IN HYBRID
  // =========================================================================
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
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "UNSAR & Asociația Producătorilor și Importatorilor de Automobile (APIA)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "ghid",
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

  // =========================================================================
  // 20. EIOPA & DNSC — DIRECTIVA EUROPEANĂ NIS 2 ȘI CYBER RISK
  // =========================================================================
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
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "European Insurance and Occupational Pensions Authority (EIOPA) & DNSC",
    sourceUrl: "https://www.eiopa.europa.eu",
    sourceType: "OFFICIAL",
    materialType: "legislatie",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Asigurarea Cyber Risk și conformitatea cu Directiva NIS 2 sunt noțiuni distincte: o poliță de asigurare nu substituie obligațiile legale de securitate IT.",
      "Amenzile administrative aplicate de autoritățile de reglementare (DNSC / GDPR) nu pot fi asigurate legal în majoritatea jurisdicțiilor europene.",
      "Polița Cyber acoperă cheltuielile urgente de investigație forensic (IT forensics), restaurarea bazelor de date și notificarea persoanelor vizate.",
      "Pierderea de profit generată de întreruperea activității (Business Interruption) din cauza atacurilor cibernetice reprezintă componenta cu cel mai mare impact financiar."
    ],
    structuredContent: {
      whatHappened: "Implementarea la nivel național a Directivei (UE) 2022/2555 (NIS 2) privind măsuri pentru un nivel comun ridicat de securitate cibernetică a generat o cerere fără precedent pentru asigurări de risc cibernetic în rândul companiilor medii și mari.",
      importantData: "Directiva vizează entități esențiale și importante din 18 sectoare economice (energie, transporturi, bănci, sănătate, infrastructură digitală, producție, distribuție alimentară și servicii poștale). Amenzile pentru neconformitate pot ajunge până la 10 milioane € sau 2% din cifra de afaceri globală.",
      context: "Atacurile de tip ransomware și compromiterea lanțurilor de furnizori (supply-chain attacks) au devenit principala amenințare la adresa continuității operaționale a afacerilor europene.",
      whatItMeans: "O companie care suferă un incident cibernetic se confruntă cu două provocări simultane: cerința legală de raportare către autoritatea națională (DNSC) în maximum 24 de ore și impactul financiar al paralizării sistemelor informatice.",
      whatClientMustKnow: "Înainte de subscrierea unei polițe Cyber, compania trebuie să demonstreze existența măsurilor de bază: autentificare cu factor multiplu (MFA), backup-uri offline izolate, politici de patch management și instruirea periodică a angajaților împotriva phishing-ului.",
      conclusion: "Conformitatea NIS2 stabilește standardul tehnic minim de igienă cibernetică, în timp ce polița Cyber Risk asigură solvabilitatea financiară a companiei când un atac reușește să străpungă mecanismele de apărare."
    },
    relatedServiceSlug: "corporate-cyber-risk",
    relatedServiceName: "Asigurare Cyber Risk",
    seoTitle: "Directiva NIS 2 vs Asigurarea Cyber Risk | Ghid EIOPA & DNSC",
    seoDescription: "Diferența dintre cerințele legale de conformitate NIS 2 și transferul financiar al riscurilor prin polițe Cyber Risk pentru companii românești.",
    tags: ["Cyber Risk", "NIS 2", "EIOPA", "DNSC", "Securitate Cibernetică", "Ransomware", "Business"]
  },

  // =========================================================================
  // 21. PRIVATE CLIENT — CEASURI DE LUX, BIJUTERII ȘI ARTĂ
  // =========================================================================
  {
    id: "news-private-client-ceasuri-arta-2026",
    slug: "asigurare-ceasuri-de-lux-bijuterii-arta-colectii-private-client",
    title: "Asigurarea Ceasurilor de Lux, a Bijuteriilor și a Operelor de Artă: Criterii de Evaluare și Clauze Speciale",
    subtitle: "Cum se protejează corect activele de mare valoare: de la expertiza de autenticitate până la clauza de depreciere post-daună.",
    excerpt: "Bunurile de colecție, ceasurile de înaltă orologerie și bijuteriile fine nu sunt acoperite adecvat de o poliță standard de locuință din cauza sub-limitelor restrictive. Află ce presupune o asigurare de tip Private Client cu acoperire mondială All-Risks.",
    category: "business",
    categoryLabel: "Private Client & High Net Worth",
    publishedAt: "2026-08-20",
    updatedAt: "2026-09-10",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "Private Client Insurance Network & Lloyd's Syndicate Partners",
    sourceUrl: "https://www.lloyds.com",
    sourceType: "SPECIALIZED_MEDIA",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Polițele standard de locuință plafonează de regulă bunurile de valoare la 2.000 € – 5.000 € per eveniment.",
      "Asigurarea Private Client funcționează pe principiul Agreed Value (valoare convenită pe baza certificatelor de autenticitate și a rapoartelor de evaluare).",
      "Acoperirea este Worldwide All-Risks (valabilă oriunde în lume, inclusiv în timpul călătoriilor și purtării zilnice).",
      "Polița include clauza de depreciere artistică (pierderea de valoare a operei chiar și după o restaurare completă cu succes)."
    ],
    structuredContent: {
      whatHappened: "Creșterea achizițiilor de ceasuri de colecție (Rolex, Patek Philippe, Audemars Piguet), metale prețioase și artă plastică a generat nevoia de soluții de asigurare dedicate segmentului High Net Worth (HNW) în România.",
      importantData: "Piața secundară a ceasurilor de lux a înregistrat volatilități mari, iar facturile de achiziție vechi nu mai reflectă valoarea curentă de înlocuire pe piață, generând riscul de subasigurare gravă în cazul furtului.",
      context: "Condițiile standard de asigurare impun adesea prezența seifurilor omologate (grad european de securitate EN 1143-1) și monitorizare video permanentă pentru colecții a căror valoare depășește 100.000 €.",
      whatItMeans: "Posesorul unui ceas valoros purtat la încheietură într-o călătorie internațională este complet descoperit pe o poliță de locuință obișnuită dacă suferă o tâlhărie sau o pierdere accidentală în afara domiciliului.",
      whatClientMustKnow: "Actualizați rapoartele de evaluare independente la fiecare 2-3 ani și păstrați certificatele originale de proveniență și cutiile originale în locații separate de bunurile asigurate.",
      conclusion: "Activele de pasiune și investiție impun o arhitectură de asigurare dedicată, cu clauze contractuale confidențiale calibrate la standardele internaționale Private Client."
    },
    relatedServiceSlug: "personal-dossier",
    relatedServiceName: "Gestiune Dosar Personal",
    seoTitle: "Asigurare Ceasuri de Lux & Artă | Ghid Private Client",
    seoDescription: "Cum asiguri ceasuri de colecție, bijuterii și tablouri de valoare: valoare agreată, acoperire mondială All-Risks și expertiză de autenticitate.",
    tags: ["Private Client", "Ceasuri de Lux", "Bijuterii", "Artă", "Valoare Agreată", "High Net Worth"]
  },

  // =========================================================================
  // 22. MALPRAXIS MEDICAL — LIMITE MINIME VS PROTECȚIE REALĂ
  // =========================================================================
  {
    id: "news-malpraxis-medical-romania-2026",
    slug: "asigurare-malpraxis-medical-limite-legale-vs-protectie-reala",
    title: "Asigurarea de Malpraxis Medical: De ce Limita Minimă Legală este Insuficientă și Cum se Structurează Acoperirea Reale",
    subtitle: "Plafoanele obligatorii din România nu acoperă daunele morale solicitate în instanță în cazurile de vătămare gravă sau deces.",
    excerpt: "Ordinul comun MS/CNAS impune limite minime de la 12.000 € la 62.000 € pentru medici. Practica judiciară actuală acordă însă despăgubiri morale de ordinul sutelor de mii de euro. Află de ce extinderea răspunderii civile profesionale este indispensabilă.",
    category: "raspundere",
    categoryLabel: "Răspundere Profesională & Medicală",
    publishedAt: "2026-08-15",
    updatedAt: "2026-09-12",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Colegiul Medicilor din România & UNSAR",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Limita minimă obligatorie prevăzută de lege (ex: 62.000 € pentru medici în spitale) este depășită frecvent de sentințele judecătorești recente.",
      "Polița standard acoperă daunele materiale directe, dar poate conține excluderi sau sub-limite restrictive pentru daune morale.",
      "Cheltuielile de apărare juridică (onorariile avocaților și expertizele medico-legale) trebuie acoperite în mod distinct de limita de despăgubire.",
      "Clinicile și cabinetele medicale individuale răspund solidar cu personalul angajat, necesitând o poliță de răspundere a unității sanitare."
    ],
    structuredContent: {
      whatHappened: "Jurisprudența instanțelor din România arată o tendință de aliniere la standardele europene în cuantificarea daunelor morale acordate pacienților sau familiilor acestora în cazuri de erori medicale.",
      importantData: "Despăgubirile acordate în dosarele de malpraxis cu consecințe severe depășesc recurent 200.000 € - 500.000 €, în timp ce polița minimă obligatorie rămâne plafonată la valori stabilite în urmă cu aproape două decenii.",
      context: "Medicul răspunde cu întreg patrimoniul său personal pentru sumele ce depășesc plafonul asigurat prin contractul de malpraxis.",
      whatItMeans: "În lipsa unei polițe extinse cu sumă asigurată adecvată (de minimum 250.000 € – 500.000 €), o condamnare civilă definitivă poate duce la executarea silită a bunurilor și veniturilor medicului pe zeci de ani.",
      whatClientMustKnow: "Verificați: 1. Dacă polița acoperă daunele morale fără sub-limită procentuală. 2. Dacă include perioada de descoperire retroactivă și extinsă (claims-made vs occurrence). 3. Dacă acoperă procedurile de mediere și comisii de disciplină.",
      conclusion: "Asigurarea de malpraxis nu trebuie privită ca o simplă formalitate administrativă de avizare anuală, ci ca un instrument esențial de prezervare a securității profesionale și familiale."
    },
    relatedServiceSlug: "despre-mine",
    relatedServiceName: "Consultanță de Risc",
    seoTitle: "Asigurare Malpraxis Medical în România | Limite Legale vs Reale",
    seoDescription: "De ce limitele minime de malpraxis medical sunt insuficiente în fața instanțelor. Ghid complet despre sume asigurate recomandate și daune morale.",
    tags: ["Malpraxis", "Răspundere Profesională", "Medici", "Clinici", "Daune Morale", "UNSAR"]
  },

  // =========================================================================
  // 23. D&O — RĂSPUNDEREA ADMINISTRATORILOR ȘI DIRECTORILOR
  // =========================================================================
  {
    id: "news-do-directors-liability-2026",
    slug: "asigurare-do-directors-officers-raspundere-profesionala-ghid",
    title: "Asigurarea D&O (Directors & Officers) și Răspunderea Administratorilor: Ghid de Protecție a Patrimoniului Personal în Management",
    subtitle: "Cum protejează polița D&O deciziile de business ale administratorilor împotriva litigiilor inițiate de acționari, creditori sau autorități.",
    excerpt: "Conform Legii 31/1990 și Codului Civil, administratorii și directorii executivi răspund cu întregul patrimoniu personal pentru deciziile de gestiune greșite. Află ce acoperă o poliță D&O și cum se structurează corect acoperirea Side A, Side B și Side C.",
    category: "raspundere",
    categoryLabel: "Guvernanță & Răspundere D&O",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-12",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "UNSAR & Asociația Administratorilor de Companii din România",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Administratorii răspund solidar și cu patrimoniul propriu pentru prejudiciile cauzate societății sau terților din neglijență sau erori manageriale.",
      "Structura standard D&O cuprinde Side A (protecția directă a persoanei fizice când societatea nu poate indemniza), Side B (rambursarea societății) și Side C (entitatea însăși).",
      "Costurile de apărare juridică, expertiză contabilă și management de criză reputațională sunt decontate din primul moment al anchetei.",
      "Polița nu acoperă actele intenționate de fraudă sau infracțiunile săvârșite cu vinovăție dovedită prin sentință penală definitivă."
    ],
    structuredContent: {
      whatHappened: "Creșterea complexității reglementărilor economice (insolvență, drept fiscal, protecția mediului, legislație concurențială și raportare ESG) a multiplicat litigiile deschise împotriva persoanelor cu atribuții de conducere executivă din companiile românești.",
      importantData: "Peste 60% dintre cererile de despăgubire pe polițele D&O sunt reprezentate de cheltuielile masive de apărare juridică în fazele preliminare de investigație ale autorităților de reglementare, înainte de orice decizie de fond.",
      context: "Răspunderea contractuală și delictuală a administratorului este personală și nelimitată. În caz de insolvență a societății, lichidatorul judiciar are obligația legală de a analiza atragerea răspunderii patrimoniale a organelor de conducere.",
      whatItMeans: "O decizie strategică de afaceri care se dovedește nefavorabilă din motive neprevăzute de piață poate declanșa acțiuni în despăgubire din partea acționarilor minoritari sau a băncilor creditoare direct împotriva averii administratorului.",
      whatClientMustKnow: "Verificați: 1. Existența clauzei retroactive complete (fără limitare de timp pentru acte decizionale trecute). 2. Perioada extinsă de notificare (Run-off) de minimum 3-6 ani după părăsirea funcției executive.",
      conclusion: "Asigurarea D&O reprezintă un instrument obligatoriu de guvernanță corporativă modernă, fără de care acceptarea unui mandat de administrator implică un risc personal disproporționat."
    },
    relatedServiceSlug: "sme-business-pack",
    relatedServiceName: "Pachetul Corporate & IMM",
    seoTitle: "Asigurare D&O Răspunderea Administratorilor | Ghid Management",
    seoDescription: "Totul despre asigurarea de răspundere managerială D&O în România: Side A/B/C, protecția averii personale a directorilor și acoperirea litigiilor.",
    tags: ["D&O", "Răspundere Administratori", "Management", "Guvernanță", "Litigii Corporate", "UNSAR"]
  },

  // =========================================================================
  // 24. SĂNĂTATE CORPORATE — PLAFONUL FISCAL DE 400 € / AN
  // =========================================================================
  {
    id: "news-sanatate-corporate-deductibilitate-2026",
    slug: "sanatate-corporate-beneficii-fiscale-deductibilitate-angajatori",
    title: "Asigurările private de sănătate pentru echipe: Plafonul de deductibilitate fiscală de 400 € / an explicat pentru angajatori",
    subtitle: "Cum se optimizează pachetul de beneficii extrasalariale fără încărcare fiscală suplimentară conform Codului Fiscal.",
    excerpt: "Polițele voluntare de sănătate oferite de companii angajaților sunt scutite de taxe și contribuții sociale în limita a 400 € / an / persoană. Află cum diferă o asigurare completă de sănătate de un simplu abonament la o clinică privată.",
    category: "sanatate",
    categoryLabel: "Sănătate & Beneficii Fiscale",
    publishedAt: "2026-08-01",
    updatedAt: "2026-09-10",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Codul Fiscal (Legea 227/2015) & UNSAR",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "informare",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Primele de asigurare voluntară de sănătate sunt deductibile fiscal până la 400 € / an per angajat la calculul profitului impozabil.",
      "Beneficiul este neimpozabil și exceptat de la contribuțiile sociale (CAS și CASS) în limita plafonului lunar de 33% din salariul de bază.",
      "Asigurarea de sănătate acoperă spitalizarea, intervențiile chirurgicale și investigațiile complexe în orice spital privat partener.",
      "Față de abonamentul clasic, asigurarea transferă riscul costurilor medicale mari către compania de asigurări."
    ],
    structuredContent: {
      whatHappened: "Pe fondul deficitului de specialiști calificați, tot mai multe companii mici și mijlocii adoptă asigurările private de sănătate de grup ca instrument principal de atragere și retenție a talentelor.",
      importantData: "Plafonul anual de 400 € (echivalentul a circa 160-170 lei/lună) permite configurarea unor pachete de sănătate complete care includ consultații, analize de laborator, imagistică avansată (RMN/CT) și decontarea cheltuielilor de spitalizare.",
      context: "Articolele 76 și 142 din Codul Fiscal stabilesc un tratament fiscal favorabil pentru primele suportate de angajator în beneficiul angajaților săi, încurajând accesul la servicii medicale de calitate.",
      whatItMeans: "Pentru companie, acordarea unei asigurări de sănătate de 400 €/an costă exact 400 €, fără taxe salariale suplimentare. În schimb, aceeași sumă acordată ca mărire salarială netă ar genera costuri totale cu taxe de aproape dublu.",
      whatClientMustKnow: "Verificați rețeaua de parteneri medicali cu decontare directă și asigurați-vă că polița include clauză de preluare a bolilor cronice preexistente dacă grupul de angajați depășește numărul minim contractual impus de asigurător.",
      conclusion: "Asigurarea privată de sănătate reprezintă cea mai eficientă investiție fiscală în sănătatea, stabilitatea și motivația echipei dumneavoastră."
    },
    relatedServiceSlug: "health-insurance",
    relatedServiceName: "Asigurare de Sănătate",
    seoTitle: "Deductibilitate Asigurare Sănătate 400 € | Ghid Angajatori",
    seoDescription: "Ghid complet despre deductibilitatea fiscală de 400 € anual pentru asigurările de sănătate oferite angajaților conform Codului Fiscal.",
    tags: ["Sănătate", "Deductibilitate", "Codul Fiscal", "IMM", "Beneficii Extrasalariale", "UNSAR"]
  },

  // =========================================================================
  // 25. ASF — SISTEMUL BONUS-MALUS LA RCA
  // =========================================================================
  {
    id: "news-asf-bonus-malus-rca-evaluare",
    slug: "sistemul-bonus-malus-rca-criterii-evaluare-istoric-daunalitate",
    title: "Cum funcționează sistemul oficial Bonus-Malus la RCA: Criterii de evaluare și transferul istoricului de daunalitate",
    subtitle: "Regulile ASF privind reducerea de până la 50% a tarifului RCA pentru șoferii disciplinați și penalizările pentru accidente din culpă.",
    excerpt: "Sistemul Bonus-Malus recompensează conducătorii auto prudenți (clasa maximă B8 acordă o reducere de 50%) și penalizează accidentele din culpă (până la M8). Află cum se transferă clasa de Bonus-Malus când schimbi mașina și ce prevede Norma ASF nr. 20/2017.",
    category: "legislatie",
    categoryLabel: "Reglementare & Bonus-Malus",
    publishedAt: "2026-07-15",
    updatedAt: "2026-09-12",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "Autoritatea de Supraveghere Financiară (ASF)",
    sourceUrl: "https://asfromania.ro/app.php/ro/a/3475/2026---rapoarte-piata-asigurarilor",
    sourceType: "OFFICIAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Clasa de referință este B0 pentru vehiculele nou intrate în asigurare fără istoric pe CNP/CUI.",
      "Fiecare an calendaristic fără daune urcă șoferul cu 2 clase de bonus (B1 -> B8, unde B8 oferă 50% discount).",
      "Fiecare accident soldat cu plată din culpa asiguratului penalizează șoferul cu 2 clase de malus.",
      "Istoricul de Bonus-Malus este asociat CNP-ului persoanei fizice sau CUI-ului persoanei juridice, putând fi transferat la achiziția unui nou vehicul."
    ],
    structuredContent: {
      whatHappened: "ASF menține și monitorizează funcționarea sistemului Bonus-Malus integrat în baza de date națională AIDA gestionată de BAAR, garantând aplicarea uniformă a coeficienților tarifari de către toți asigurătorii autorizați.",
      importantData: "Sistemul cuprinde 8 clase de bonus (de la B1 la B8, coeficienți între 0,95 și 0,50) și 8 clase de malus (de la M1 la M8, coeficienți între 1,10 și 1,80). Peste 70% dintre vehiculele asigurate din România se încadrează în clase superioare de bonus (B6-B8).",
      context: "Norma ASF nr. 20/2017 reglementează modalitatea de calcul și de atribuire a clasei de daunalitate, prevenind abuzurile sau aplicarea arbitrară a tarifelor de asigurare.",
      whatItMeans: "Pentru un șofer aflat în clasa B8, polița RCA costă jumătate din prețul de bază al asigurătorului, în timp ce un conducător auto ajuns în clasa M8 va plăti cu 80% peste tariful standard din cauza daunelor repetate produse.",
      whatClientMustKnow: "La vânzarea unui autovehicul și achiziționarea altuia nou, solicitați transferul clasei de bonus acumulate, prezentând documentele de înstrăinare ale vechiului vehicul.",
      conclusion: "Păstrarea unui stil de conducere preventiv aduce o economie directă și substanțială în bugetul auto anual prin mecanismul oficial Bonus-Malus."
    },
    relatedServiceSlug: "rca-insurance",
    relatedServiceName: "Asigurare RCA",
    seoTitle: "Sistemul Bonus-Malus RCA Explicat | Reguli & Reduceri ASF",
    seoDescription: "Ghid complet despre sistemul oficial Bonus-Malus la RCA conform normelor ASF: clase de la B0 la B8, reduceri de până la 50% și transferul clasei.",
    tags: ["Bonus-Malus", "RCA", "ASF", "AIDA", "BAAR", "Tarife RCA", "Legislație"]
  },

  // =========================================================================
  // 26. VIAȚĂ — PROTECȚIE FINANCIARĂ VS ECONOMISIRE
  // =========================================================================
  {
    id: "news-viata-protectie-capitalizare-familie",
    slug: "asigurari-viata-protectie-financiara-economisire-context-economic",
    title: "Asigurările de viață cu componentă mixtă: Protecție financiară vs instrumente pure de economisire în contextul actual",
    subtitle: "Analiza randamentelor, a clauzelor suplimentare de sănătate și a rolului capitalizării garantate pentru viitorul familiei.",
    excerpt: "O asigurare de viață nu trebuie confundată cu un depozit bancar sau un fond speculativ. Funcția ei primară este garantarea continuității financiare a familiei în cazul evenimentelor majore nedorite (deces, invaliditate, boli grave).",
    category: "viata",
    categoryLabel: "Asigurări de Viață & Familie",
    publishedAt: "2026-07-01",
    updatedAt: "2026-09-12",
    collectedAt: "2026-10-18",
    readTime: "5 min",
    sourceName: "UNSAR & Asociația pentru Pensiile Administrate Privat (APAPR)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "ghid",
    status: "published",
    verified: true,
    featured: false,
    keyTakeaways: [
      "Obiectivul principal al poliței de viață este transferul riscului financiar extrem (decesul sau invaliditatea susținătorului de familie).",
      "Polițele mixte combină componenta de protecție pură cu un cont de economisire/capitalizare pe termen lung (10-25 ani).",
      "Clauzele adiționale de boli grave acordă despăgubire imediată la diagnosticarea afecțiunilor oncologice, cardiovasculare sau neurologice majore.",
      "Indemnizația de asigurare de viață nu intră în masa succesorală și este scutită de impozit pe venit conform legii."
    ],
    structuredContent: {
      whatHappened: "Studiile anuale privind deficitul de protecție financiară al familiilor din România (Protection Gap) arată că în cazul dispariției bruște a principalului aducător de venit, majoritatea gospodăriilor nu au rezerve pentru a rezista mai mult de 3-6 luni.",
      importantData: "Suma medie asigurată recomandată de planificatorii financiari este de cel puțin 3-5 ori venitul anual al familiei, la care se adaugă soldul creditelor ipotecare active.",
      context: "Într-un mediu cu volatilitate economică, asigurările tradiționale cu sumă garantată și participare la profit oferă o ancoră de stabilitate neafectată de fluctuațiile bursiere zilnice.",
      whatItMeans: "Pentru părinți, o poliță de viață bine calibrată garantează că fondurile necesare pentru educația copiilor și plata ratelor bancare vor exista indiferent de ceea ce se întâmplă cu sănătatea lor.",
      whatClientMustKnow: "Declarația de sănătate inițială trebuie completată cu onestitate absolută; omisiunea unor antecedente medicale grave poate duce la refuzul legitim al plății indemnizației de către asigurător.",
      conclusion: "Asigurarea de viață reprezintă piatra de temelie a oricărui plan financiar personal responsabil, garantând demnitatea și securitatea celor dragi."
    },
    relatedServiceSlug: "life-insurance",
    relatedServiceName: "Asigurare de Viață",
    seoTitle: "Asigurări de Viață Mixte & Protecția Familiei | Ghid Financiar",
    seoDescription: "Ghid complet despre asigurările de viață cu economisire: protecție financiară, clauze de boli grave, avantaje fiscale și calculul sumei necesare.",
    tags: ["Asigurare de Viață", "Protecția Familiei", "Economisire", "Boli Grave", "Planificare Financiară", "UNSAR"]
  },

  // =========================================================================
  // 27. CARGO VS CMR — DE CE LIMITA LEGALĂ LASĂ EXPUSĂ MARFA
  // =========================================================================
  {
    id: "news-cargo-marfa-transport-cmr",
    slug: "asigurarea-cargo-transport-marfa-riscuri-logistice-europene",
    title: "Asigurarea Cargo vs. Răspunderea CMR a Cărăușului: De ce limita legală pe kilogram lasă expusă marfa de valoare",
    subtitle: "Diferența critică dintre asigurarea de răspundere a transportatorului și polița de patrimoniu a proprietarului de marfă.",
    excerpt: "Mulți comercianți cred eronat că asigurarea CMR a transportatorului le garantează rambursarea valorii de factură în caz de pierdere. În realitate, Convenția CMR plafonează despăgubirea la ~10 € / kg. Află de ce polița Cargo All-Risks este indispensabilă.",
    category: "cargo",
    categoryLabel: "Transport & Logistică Cargo",
    publishedAt: "2026-06-20",
    updatedAt: "2026-09-10",
    collectedAt: "2026-10-18",
    readTime: "4 min",
    sourceName: "UNSAR & Uniunea Națională a Transportatorilor (UNTRR)",
    sourceUrl: "https://unsar.ro",
    sourceType: "INSTITUTIONAL",
    materialType: "ghid",
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

/** Helper to filter articles by material type */
export function getArticlesByMaterialType(type: MaterialType | "all"): InsuranceNewsArticle[] {
  const published = getPublishedNewsArticles();
  if (type === "all") return published;
  return published.filter(a => a.materialType === type);
}
