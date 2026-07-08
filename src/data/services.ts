export type ServiceContent = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export const servicesData: Record<string, ServiceContent> = {
  "life-insurance": {
    id: "life-insurance",
    slug: "life-insurance",
    title: "Asigurări de Viață",
    shortDescription: "Securitate financiară pe termen lung pentru tine și familia ta, gestionată de experți.",
    longDescription: "O asigurare de viață nu este doar un document, ci promisiunea că viitorul celor dragi este în siguranță, indiferent de neprevăzut. În parteneriat cu Generali, oferim planuri de protecție flexibile care acoperă riscuri majore și construiesc stabilitate financiară pe termen lung.",
    iconName: "Heart",
    benefits: [
      { title: "Acoperire globală", description: "Protecție oriunde în lume, 24/7." },
      { title: "Flexibilitate", description: "Ajustarea sumelor asigurate în funcție de nevoile din diferite etape ale vieții." },
      { title: "Stabilitate Generali", description: "Polițe susținute de unul dintre cele mai sigure grupuri financiare din Europa." },
    ],
    process: [
      { step: 1, title: "Evaluarea nevoilor", description: "Analizăm situația ta financiară și familială." },
      { step: 2, title: "Proiectarea soluției", description: "Construim un pachet personalizat de acoperire." },
      { step: 3, title: "Emiterea poliței", description: "Finalizăm documentația digital și rapid." }
    ],
    faqs: [
      { q: "Când este cel mai bun moment să închei o asigurare de viață?", a: "Cât mai devreme. Primele sunt mai mici când ești tânăr și sănătos, garantându-ți protecția la costuri optime." },
      { q: "Pot modifica beneficiarii ulterior?", a: "Da, beneficiarii poliței pot fi actualizați oricând prin cerere scrisă." }
    ]
  },
  "health-insurance": {
    id: "health-insurance",
    slug: "health-insurance",
    title: "Asigurări de Sănătate",
    shortDescription: "Acces neîngrădit la clinici și spitale private de top, național și internațional.",
    longDescription: "Asigurările private de sănătate oferă confort, rapiditate și excelență medicală. Scăpăm de timpii de așteptare din sistemul public și îți oferim acces la expertiză medicală de lux și tehnologie de ultimă oră pentru tine și familia ta.",
    iconName: "Activity",
    benefits: [
      { title: "Rețea premium", description: "Acces la cele mai bune rețele private (Regina Maria, Medlife, Sanador, etc.)." },
      { title: "Fără cozi", description: "Programări rapide și decontare directă a serviciilor." },
      { title: "Acoperire spitalizare", description: "Costuri acoperite pentru intervenții complexe și spitalizare." },
    ],
    process: [
      { step: 1, title: "Analiza opțiunilor", description: "Alegem nivelul de acoperire (ambulatoriu, spitalizare, intervenții)." },
      { step: 2, title: "Declarația de sănătate", description: "Completăm un scurt chestionar medical." },
      { step: 3, title: "Activarea", description: "Polița ta devine activă și primești cardul digital." }
    ],
    faqs: [
      { q: "Acoperă afecțiuni preexistente?", a: "În general, afecțiunile preexistente nu sunt acoperite standard, dar pot exista pachete speciale sau perioade de așteptare." },
      { q: "Ce se întâmplă în caz de urgență?", a: "Serviciile de prim-ajutor și internare de urgență sunt de obicei acoperite integral în limita sumei asigurate." }
    ]
  },
  "travel-insurance": {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Asigurări de Călătorie",
    shortDescription: "Explorează lumea fără griji cu acoperire premium pentru bagaje, sănătate și anulări.",
    longDescription: "Călătoriile ar trebui să fie exclusiv despre experiențe pozitive. Asigurările noastre premium de călătorie te protejează împotriva cheltuielilor medicale neprevăzute în străinătate, anulării zborurilor sau pierderii bagajelor. Un serviciu esențial pentru orice călător.",
    iconName: "Plane",
    benefits: [
      { title: "Asistență 24/7", description: "Call center dedicat pentru urgențe internaționale." },
      { title: "Acoperire COVID & Pandemii", description: "Polițele includ protecție pentru riscuri epidemiologice." },
      { title: "Sporturi extreme", description: "Opțiuni extensibile pentru schi, scufundări sau alpinism." },
    ],
    process: [
      { step: 1, title: "Detalii călătorie", description: "Introducem destinația și durata șederii." },
      { step: 2, title: "Alegerea pachetului", description: "Alegem limita de despăgubire și clauzele adiționale." },
      { step: 3, title: "Emitere instantă", description: "Polița este trimisă pe email în câteva minute." }
    ],
    faqs: [
      { q: "Asigurarea este valabilă pe orice continent?", a: "Puteți opta pentru acoperire Europa sau acoperire Mondială (cu sau fără SUA/Canada)." },
      { q: "Sunt acoperite sporturile de iarnă?", a: "Da, prin selectarea unei clauze adiționale pentru sporturi de agreement." }
    ]
  },
  "home-insurance": {
    id: "home-insurance",
    slug: "home-insurance",
    title: "Asigurări Locuință (PAD + Facultativă)",
    shortDescription: "Protecție completă pentru patrimoniul tău imobiliar și bunurile de valoare.",
    longDescription: "Fie că vorbim de reședința principală, o casă de vacanță sau un portofoliu de proprietăți destinate închirierii, protecția lor este vitală. Oferim pachete extinse care trec mult peste simpla asigurare PAD, protejând valoarea reală a investiției tale imobiliare.",
    iconName: "Home",
    benefits: [
      { title: "Toate riscurile", description: "Acoperire pentru incendiu, inundație, furt, avarii accidentale." },
      { title: "Răspundere civilă", description: "Acoperă daunele produse vecinilor." },
      { title: "Asistență tehnică", description: "Servicii de urgență (instalator, lăcătuș, electrician) la domiciliu." },
    ],
    process: [
      { step: 1, title: "Evaluarea proprietății", description: "Stabilim valoarea de înlocuire a clădirii și bunurilor." },
      { step: 2, title: "Personalizare", description: "Adăugăm clauze pentru bunuri de valoare, artă, panouri solare." },
      { step: 3, title: "Protecție activă", description: "Garanția patrimoniului tău intră în vigoare." }
    ],
    faqs: [
      { q: "Ce se întâmplă în cazul unei inundații majore?", a: "Sunteți despăgubit pentru refacerea locuinței, înlocuirea mobilei afectate și cazare temporară dacă este necesar." },
      { q: "Este PAD-ul obligatoriu?", a: "Da, legea impune PAD-ul, dar asigurarea facultativă extinde protecția la valoarea reală a pieței." }
    ]
  },
  "auto-insurance": {
    id: "auto-insurance",
    slug: "auto-insurance",
    title: "Asigurări Auto",
    shortDescription: "Soluții premium pentru vehiculul tău, acoperind orice neplăcere rutieră.",
    longDescription: "Îți oferim liniște la volan prin pachete auto gândite pentru confort maxim. De la mașini de familie până la vehicule de lux, ne asigurăm că beneficiezi de asistență rutieră premium, decontare directă și reparații în cele mai bune reprezentanțe.",
    iconName: "Car",
    benefits: [
      { title: "Decontare Directă", description: "Scapi de stresul recuperării banilor de la asigurătorul vinovatului." },
      { title: "Asistență VIP", description: "Tractare, mașină la schimb și cazare în caz de defecțiune." },
      { title: "Reparații garantate", description: "Parteneriate cu reprezentanțe oficiale și ateliere de top." },
    ],
    process: [
      { step: 1, title: "Colectarea datelor", description: "Verificăm documentele autovehiculului și ale proprietarului." },
      { step: 2, title: "Oferta", description: "Analizăm prețurile și acoperirile la toți partenerii noștri." },
      { step: 3, title: "Emiterea", description: "Primești polița digitală valabilă imediat." }
    ],
    faqs: [
      { q: "Care e diferența între RCA și CASCO?", a: "RCA despăgubește terții păgubiți de tine. CASCO despăgubește propria mașină, indiferent de a cui este vina." },
      { q: "Primesc mașină la schimb?", a: "Da, opțiunea de vehicul de schimb este inclusă în majoritatea pachetelor noastre CASCO premium." }
    ]
  },
  "rca": {
    id: "rca",
    slug: "rca",
    title: "Asigurări RCA",
    shortDescription: "Asigurare obligatorie auto cu clauze opționale de decontare directă.",
    longDescription: "RCA-ul nu trebuie să fie doar o obligație legală. Printr-o poliță RCA optimizată cu clauza de Decontare Directă, te protejezi de un proces lung în cazul în care ești lovit de un șofer asigurat la o companie cu istoric dificil la plăți.",
    iconName: "Shield",
    benefits: [
      { title: "Cotații Rapide", description: "Comparăm instant zeci de oferte." },
      { title: "Decontare Directă", description: "Opțiunea ideală pentru rezolvarea rapidă a daunelor." },
      { title: "Notificări de expirare", description: "Sistem automat pentru a nu uita niciodată prelungirea." },
    ],
    process: [
      { step: 1, title: "Trimite talonul", description: "O simplă poză e suficientă pentru a obține oferte." },
      { step: 2, title: "Alege prețul", description: "Selecționezi oferta optimă pentru bugetul tău." },
      { step: 3, title: "Plata online", description: "Plătești în siguranță și primești RCA-ul pe email." }
    ],
    faqs: [
      { q: "Ce influențează prețul RCA?", a: "Istoricul de daune (Bonus-Malus), vârsta șoferului, capacitatea cilindrică și localitatea." },
      { q: "Pot plăti în rate?", a: "Da, polițele pe 12 luni pot fi plătite în rate prin anumite instrumente bancare partenere." }
    ]
  },
  "casco": {
    id: "casco",
    slug: "casco",
    title: "Asigurări CASCO",
    shortDescription: "Polițe CASCO All-Risk pentru mașini de lux și flotă.",
    longDescription: "CASCO reprezintă cel mai înalt nivel de protecție pentru investiția ta auto. Asigură despăgubiri pentru furt, avarii din vina proprie, fenomene meteo extreme, vandalism sau daune cu autor necunoscut. Serviciu esențial pentru liniștea ta financiară.",
    iconName: "Shield",
    benefits: [
      { title: "Fără surprize", description: "Acoperire All-Risk transparentă." },
      { title: "Reparație la Reprezentanță", description: "Garanția păstrării calității producătorului." },
      { title: "Valoare menținută", description: "Acoperire specială pentru valoarea de nou în primul an." },
    ],
    process: [
      { step: 1, title: "Inspecția de risc", description: "Realizăm pozele mașinii (poate fi făcută și de tine digital)." },
      { step: 2, title: "Setarea franșizei", description: "Alegem nivelul franșizei pentru a optimiza costul." },
      { step: 3, title: "Activare", description: "Confirmarea și activarea imediată a protecției." }
    ],
    faqs: [
      { q: "Ce este o franșiză?", a: "Partea din daună suportată de tine. O franșiză mai mare scade prețul anual al poliței." },
      { q: "Mașina a fost furată, ce se întâmplă?", a: "Veți fi despăgubit la valoarea asigurată a mașinii din momentul respectiv." }
    ]
  },
  "imm-insurance": {
    id: "imm-insurance",
    slug: "imm-insurance",
    title: "Asigurări IMM",
    shortDescription: "Protecția afacerii tale: clădiri, stocuri, echipamente și întreruperea activității.",
    longDescription: "Un business de succes este un business protejat. Soluțiile noastre de asigurare pentru Întreprinderi Mici și Mijlocii (IMM) acoperă spațiile comerciale, echipamentele vitale, mărfurile și, foarte important, pierderile de profit survenite în urma unui eveniment asigurat.",
    iconName: "Briefcase",
    benefits: [
      { title: "Business Interruption", description: "Acoperirea pierderii de profit net din perioada de întrerupere." },
      { title: "All-in-One", description: "O singură poliță pentru patrimoniu, stocuri și răspunderi." },
      { title: "Adaptabilitate", description: "Polițe customizate pentru specificul fiecărei industrii." },
    ],
    process: [
      { step: 1, title: "Audit de risc", description: "Analizăm expunerea afacerii la riscuri specifice." },
      { step: 2, title: "Structurarea ofertei", description: "Combinăm modulele de asigurare necesare." },
      { step: 3, title: "Mentenanță", description: "Ajustăm polița anual pe măsură ce firma crește." }
    ],
    faqs: [
      { q: "Ce se întâmplă dacă îmi ia foc depozitul?", a: "Polița despăgubește valoarea clădirii, a mărfii și profitul nerealizat în timpul refacerii." },
      { q: "Este asigurat și echipamentul IT?", a: "Da, asigurarea de avarii accidentale a echipamentelor electronice poate fi inclusă." }
    ]
  },
  "business-insurance": {
    id: "business-insurance",
    slug: "business-insurance",
    title: "Asigurări Corporate / Business",
    shortDescription: "Management integrat al riscurilor pentru corporații și afaceri mari.",
    longDescription: "Structurăm programe complexe de asigurare pentru companii cu nevoi complexe. Ne adresăm riscurilor corporative, de la răspunderea directorilor (D&O), la riscuri cibernetice (Cyber Risk) și erori profesionale, asigurând stabilitatea la nivel înalt a businessului.",
    iconName: "Building",
    benefits: [
      { title: "Risk Management", description: "Consultanță continuă pentru minimizarea expunerilor." },
      { title: "Polițe D&O", description: "Protecția averii personale a board-ului de directori." },
      { title: "Cyber Security", description: "Acoperire financiară în caz de atacuri informatice și data breaches." },
    ],
    process: [
      { step: 1, title: "Evaluare complexă", description: "Identificăm toate scenariile de risc corporativ." },
      { step: 2, title: "Negociere cu asigurătorii", description: "Obținem pachete exclusiviste de reasigurare." },
      { step: 3, title: "Implementare", description: "Asistăm în gestionarea oricărui eveniment complex." }
    ],
    faqs: [
      { q: "Ce acoperă o poliță Cyber?", a: "Pierderile de business, cheltuielile cu recuperarea datelor și PR pentru managementul crizei." },
      { q: "Cum funcționează asigurarea D&O?", a: "Protejează directorii împotriva proceselor acționarilor pentru decizii de management greșite." }
    ]
  },
  "liability-insurance": {
    id: "liability-insurance",
    slug: "liability-insurance",
    title: "Răspundere Civilă",
    shortDescription: "Protejează-te financiar împotriva prejudiciilor cauzate terților.",
    longDescription: "Orice activitate comercială sau privată poate produce accidental daune altor persoane. Asigurarea de răspundere civilă legală preia povara despăgubirilor, cheltuielilor de judecată și te ajută să îți păstrezi reputația și capitalul intact.",
    iconName: "Scale",
    benefits: [
      { title: "Protecție legală", description: "Acoperă inclusiv cheltuielile de apărare în instanță." },
      { title: "Acoperire produse", description: "Pentru daune provocate de produsele fabricate/vândute." },
      { title: "Răspunderea chiriașului", description: "Te protejează față de proprietar pentru distrugeri." },
    ],
    process: [
      { step: 1, title: "Identificarea riscului", description: "Stabilim suma asigurată în funcție de potențialul daunelor." },
      { step: 2, title: "Emiterea poliței", description: "Acoperim operațiunile și produsele." },
      { step: 3, title: "Gestiune daune", description: "În caz de incident, gestionăm interacțiunea cu păgubitul." }
    ],
    faqs: [
      { q: "Este obligatorie pentru firme?", a: "Depinde de domeniu, dar este vitală oricărui business ce interacționează cu publicul." },
      { q: "Ce se întâmplă dacă un client alunecă în magazinul meu?", a: "Polița preia despăgubirile solicitate de client (vătămări corporale)." }
    ]
  },
  "commercial-property": {
    id: "commercial-property",
    slug: "commercial-property",
    title: "Commercial Property",
    shortDescription: "Securizează-ți portofoliul de clădiri de birouri, spații comerciale sau logistice.",
    longDescription: "Investițiile tale în imobiliare comerciale sunt asigurate la cele mai înalte standarde de piață. Colaborăm cu Generali pentru a oferi soluții 'All-Risks' care protejează marile active împotriva dezastrelor naturale, incendiilor sau altor daune catastrofice.",
    iconName: "Building2",
    benefits: [
      { title: "Valoare de înlocuire nouă", description: "Despăgubiri calculate pentru refacerea la standarde curente." },
      { title: "Acoperire chirie", description: "Kompensarea pierderii veniturilor din chirie în caz de dezastru." },
      { title: "Terorism / Greve", description: "Riscuri speciale incluse în mod standardizat." },
    ],
    process: [
      { step: 1, title: "Analiza portofoliului", description: "Evaluăm individual fiecare locație." },
      { step: 2, title: "Structurarea master-poliței", description: "Unificăm toate proprietățile sub un singur program eficient." },
      { step: 3, title: "Update anual", description: "Re-evaluăm valorile anual pentru a evita subasigurarea." }
    ],
    faqs: [
      { q: "Este asigurat și conținutul chiriașilor?", a: "Nu, ei trebuie să-și asigure propriile bunuri. Noi asigurăm clădirea și instalațiile." },
      { q: "Ce presupune pierderea chiriei?", a: "Dacă clădirea devine inutilizabilă un an, vă plătim venitul din chirii pe care l-ați fi încasat." }
    ]
  },
  "fleet-insurance": {
    id: "fleet-insurance",
    slug: "fleet-insurance",
    title: "Asigurări Flote Auto",
    shortDescription: "Management optimizat al costurilor și riscurilor pentru parcul tău auto.",
    longDescription: "Fie că ai o flotă de 5 sau 500 de vehicule, gestionarea asigurărilor necesită o abordare unitară. Negociem reduceri de flotă substanțiale și unificăm scadențele, transformând RCA-ul și CASCO-ul într-un sistem simplu și ușor de gestionat.",
    iconName: "Truck",
    benefits: [
      { title: "Scadență unică", description: "Mai puțină birocrație, o singură dată de reînnoire." },
      { title: "Costuri reduse", description: "Prețuri preferențiale bazate pe volum și istoric de flotă." },
      { title: "Gestiune dedicată", description: "Account manager personal pentru deschiderea și instrumentarea daunelor." },
    ],
    process: [
      { step: 1, title: "Analiza parcului", description: "Verificăm daunalitatea istorică a flotei." },
      { step: 2, title: "Negocierea", description: "Obținem tarife fixe unitare per categorie de vehicul." },
      { step: 3, title: "Emiterea automată", description: "Platforma emite polițele la cerere fără birocrație." }
    ],
    faqs: [
      { q: "Care e numărul minim pentru o flotă?", a: "În general, ofertele speciale de flotă încep de la 10 vehicule." },
      { q: "Cum influențează daunele prețul?", a: "Analizăm raportul dintre prime plătite și daune (Loss Ratio) pentru negocierea anuală." }
    ]
  },
  "employee-benefits": {
    id: "employee-benefits",
    slug: "employee-benefits",
    title: "Employee Benefits",
    shortDescription: "Fidelizează-ți angajații prin pachete premium de sănătate și viață.",
    longDescription: "Pachetele de beneficii pentru angajați (asigurări private de sănătate, pensii private, asigurări de viață) sunt un instrument puternic de atragere și retenție a talentelor. Oferim planuri flexibile, complet deductibile fiscal, susținute de Generali.",
    iconName: "Users",
    benefits: [
      { title: "Deductibilitate fiscală", description: "Avantaje fiscale pentru angajator în limita a 400 EUR/an/angajat." },
      { title: "Retenție crescută", description: "Un element esențial al pachetului modern de compensare." },
      { title: "Grijă pentru echipă", description: "Angajați mai sănătoși, mai fericiți și mai productivi." },
    ],
    process: [
      { step: 1, title: "Diagnoza HR", description: "Înțelegem structura echipei și obiectivele de buget." },
      { step: 2, title: "Design-ul planului", description: "Construim planuri ierarhizate (Standard, Management, Executiv)." },
      { step: 3, title: "Onboarding-ul angajaților", description: "Prezentăm beneficiile echipei și livrăm cardurile." }
    ],
    faqs: [
      { q: "Se pot include membrii familiei?", a: "Da, pachetele permit includerea soțului/soției și a copiilor, suportați de angajator sau direct de angajat." },
      { q: "Care este pachetul preferat în România?", a: "Asigurarea privată de sănătate este cel mai dorit beneficiu extra-salarial de către români." }
    ]
  },
  "professional-protection": {
    id: "professional-protection",
    slug: "professional-protection",
    title: "Malpraxis & Răspundere Profesională",
    shortDescription: "Siguranță deplină pentru medici, avocați, IT-ști, arhitecți și ingineri.",
    longDescription: "O eroare umană neintenționată nu trebuie să îți distrugă cariera. Asigurările de răspundere civilă profesională acoperă prejudiciile aduse clienților tăi din neglijență sau erori profesionale, asigurând și cheltuielile legale.",
    iconName: "Award",
    benefits: [
      { title: "Siguranța meseriei", description: "Exersezi profesia fără stresul proceselor distructive." },
      { title: "Acoperire legală", description: "Include onorariile avocaților și cheltuielile de judecată." },
      { title: "Limite înalte", description: "Polițe de la 10.000 EUR până la milioane de EUR acoperire." },
    ],
    process: [
      { step: 1, title: "Declarația de risc", description: "Completăm un chestionar specific domeniului tău de activitate." },
      { step: 2, title: "Emiterea", description: "Validăm certificările și eliberăm polița." },
      { step: 3, title: "Lucru în siguranță", description: "Ești complet protejat pe durata valabilității poliței." }
    ],
    faqs: [
      { q: "Cine trebuie să aibă această asigurare?", a: "Medici, arhitecți, contabili, dezvoltatori IT, consultanți și avocați." },
      { q: "Ce excluderi majore există?", a: "Faptele săvârșite cu intenție, fraudele și încălcările voite ale legii nu sunt acoperite." }
    ]
  },
  "accident-insurance": {
    id: "accident-insurance",
    slug: "accident-insurance",
    title: "Asigurări de Accidente",
    shortDescription: "Sprijin financiar rapid în caz de vătămare corporală, invaliditate sau spitalizare.",
    longDescription: "Accidentele sunt neprevăzute și de multe ori au un impact financiar masiv. Această poliță oferă sume de bani cash în caz de fracturi, arsuri, invaliditate permanentă sau necesitate de spitalizare în urma unui accident (atât auto, cât și casnic sau sportiv).",
    iconName: "Stethoscope",
    benefits: [
      { title: "Despăgubire fixă", description: "Primești bani numerar în funcție de severitatea accidentului." },
      { title: "Spitalizare din accident", description: "Indemnizație zilnică (ex. 100 EUR/zi) pe perioada spitalizării." },
      { title: "Costuri reduse", description: "O poliță extrem de accesibilă ca preț pentru nivelul de protecție oferit." },
    ],
    process: [
      { step: 1, title: "Selectarea sumelor", description: "Alegem suma fixă despăgubită pentru invaliditate sau fracturi." },
      { step: 2, title: "Activare imediată", description: "Fără examene medicale complexe la emitere." },
      { step: 3, title: "Plata daunei", description: "Prezentarea biletului de externare / radiografiei aduce despăgubirea." }
    ],
    faqs: [
      { q: "Care este diferența față de o asigurare de sănătate?", a: "Polița de accident plătește o sumă cash ca despăgubire. Cea de sănătate decontează factura clinicii private." },
      { q: "Acoperă sporturile de performanță?", a: "Sportivii profesioniști necesită clauze speciale sau polițe dedicate." }
    ]
  }
};
