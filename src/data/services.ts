export type ServiceContent = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  whatIsIt: string;
  risksCovered: string[];
  targetAudience: string[];
  practicalExamples: { title: string; description: string }[];
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
    shortDescription: "Securitate financiară pe termen lung pentru tine și familia ta.",
    longDescription: "O asigurare de viață nu este doar un document, ci promisiunea că viitorul celor dragi este în siguranță, indiferent de neprevăzut. În parteneriat cu Generali, oferim planuri de protecție flexibile care acoperă riscuri majore și construiesc stabilitate financiară pe termen lung.",
    whatIsIt: "Asigurarea de viață reprezintă o plasă de siguranță financiară. Funcționează prin transferul riscului major (deces sau invaliditate) către o companie de asigurări capabilă să plătească instantaneu despăgubiri masive, asigurând astfel continuitatea nivelului de trai pentru familia ta.",
    risksCovered: [
      "Deces din accident sau boală",
      "Invaliditate permanentă din accident",
      "Boli grave (cancer, infarct, AVC)",
      "Spitalizare și intervenții chirurgicale"
    ],
    targetAudience: [
      "Părinți cu persoane în întreținere (copii minori).",
      "Antreprenori care sunt pilonul principal de venit al familiei.",
      "Persoane cu credite ipotecare semnificative.",
      "Business-uri care depind de un „Key Man”."
    ],
    practicalExamples: [
      {
        title: "Protecția Familiei",
        description: "Dacă susținătorul financiar principal al familiei are un accident fatal, polița plătește suma asigurată de 200.000€, permițând achitarea datoriilor."
      },
      {
        title: "Boli Grave",
        description: "În cazul diagnosticării cu o formă de cancer acoperită, asiguratul primește un capital de 50.000€ pentru tratament."
      }
    ],
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
      { q: "Când este cel mai bun moment să închei o asigurare de viață?", a: "Cât mai devreme. Primele sunt mai mici când ești tânăr și sănătos." },
      { q: "Pot modifica beneficiarii ulterior?", a: "Da, beneficiarii poliței pot fi actualizați oricând prin cerere scrisă." }
    ]
  },
  "health-insurance": {
    id: "health-insurance",
    slug: "health-insurance",
    title: "Asigurări de Sănătate",
    shortDescription: "Acces neîngrădit la clinici și spitale private de top, național și internațional.",
    longDescription: "Asigurările private de sănătate oferă confort, rapiditate și excelență medicală. Scăpăm de timpii de așteptare din sistemul public și îți oferim acces la expertiză medicală de lux și tehnologie de ultimă oră pentru tine și familia ta.",
    whatIsIt: "Asigurarea de sănătate privată este abonamentul tău la un ecosistem medical premium. Îți permite accesarea consultațiilor, analizelor, investigațiilor imagistice (RMN/CT) și chiar a intervențiilor chirurgicale complexe în rețele medicale de stat și private, decontând direct costurile.",
    risksCovered: [
      "Consultații medicale de specialitate",
      "Analize de laborator și imagistică avansată",
      "Spitalizare în rețele private",
      "Intervenții chirurgicale și tratamente oncologice",
      "Medicamente pe rețetă în anumite planuri"
    ],
    targetAudience: [
      "Persoane care doresc acces rapid și direct la sistemul medical privat.",
      "Familii care își doresc o rețea pediatrică de top pentru copiii lor.",
      "Antreprenori pentru care timpul înseamnă bani și nu își permit să stea la cozi."
    ],
    practicalExamples: [
      {
        title: "Intervenție chirurgicală rapidă",
        description: "Dacă suferi o afecțiune ce necesită operație, poți opta pentru o clinică privată de top. Asigurarea decontează costurile de zeci de mii de euro direct către spital."
      },
      {
        title: "Prevenție anuală",
        description: "Efectuezi analize complexe, ecografii și un RMN necesar de rutină, iar factura la clinica privată este suportată de asigurător."
      }
    ],
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
      { q: "Acoperă afecțiuni preexistente?", a: "În general nu, dar pot exista pachete speciale sau perioade de așteptare." },
      { q: "Ce se întâmplă în caz de urgență?", a: "Serviciile de prim-ajutor și internare de urgență sunt de obicei acoperite integral în limita sumei asigurate." }
    ]
  },
  "travel-insurance": {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Asigurări de Călătorie",
    shortDescription: "Explorează lumea fără griji cu acoperire premium pentru bagaje, sănătate și anulări.",
    longDescription: "Călătoriile ar trebui să fie exclusiv despre experiențe pozitive. Asigurările noastre premium de călătorie te protejează împotriva cheltuielilor medicale neprevăzute în străinătate, anulării zborurilor sau pierderii bagajelor.",
    whatIsIt: "O poliță temporară sau anuală (Multi-Trip) care te scutește de costurile asistenței medicale din afara țării și acoperă neplăcerile logistice din timpul călătoriilor.",
    risksCovered: [
      "Costuri medicale și spitalizare de urgență în străinătate",
      "Repatriere medicală",
      "Anularea călătoriei (Storno)",
      "Pierderea sau întârzierea bagajelor",
      "Răspunderea civilă față de terți pe durata călătoriei"
    ],
    targetAudience: [
      "Turiști pasionați de destinații exotice sau city-break-uri.",
      "Oameni de afaceri cu multiple zboruri externe.",
      "Pasionați de sporturi de iarnă sau sporturi nautice."
    ],
    practicalExamples: [
      {
        title: "Costuri medicale externe",
        description: "Pe pârtia din Austria suferi o fractură. Elicopterul SMURD și intervenția la clinica privată ajung la 15.000€. Polița travel premium acoperă direct toate aceste cheltuieli."
      },
      {
        title: "Pierderea bagajului",
        description: "Ajungi în Dubai, dar bagajele tale au rămas în escală. Asigurarea îți oferă un buget de urgență pentru articole de strictă necesitate."
      }
    ],
    iconName: "Plane",
    benefits: [
      { title: "Asistență 24/7", description: "Call center dedicat pentru urgențe internaționale." },
      { title: "Acoperire COVID", description: "Polițele includ protecție pentru riscuri epidemiologice." },
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
    title: "Asigurări Locuință",
    shortDescription: "Protecție completă pentru patrimoniul tău imobiliar și bunurile de valoare.",
    longDescription: "Fie că vorbim de reședința principală, o casă de vacanță sau un portofoliu de proprietăți destinate închirierii, protecția lor este vitală. Oferim pachete extinse care trec mult peste simpla asigurare PAD.",
    whatIsIt: "Asigurarea facultativă de locuință protejează imobilul la valoarea reală de piață/înlocuire, incluzând și bunurile din interior, finisajele de lux și răspunderea civilă față de vecini.",
    risksCovered: [
      "Incendiu, trăsnet, explozie",
      "Inundații (inclusiv de la vecini sau conducte sparte)",
      "Furt prin efracție",
      "Vandalism și fenomene meteo extreme",
      "Daune provocate vecinilor (Răspundere civilă)"
    ],
    targetAudience: [
      "Proprietari de case sau apartamente.",
      "Investitori imobiliari cu portofolii de închiriere.",
      "Persoane cu credite ipotecare (cerință bancară).",
      "Chiriași (asigurarea bunurilor proprii)."
    ],
    practicalExamples: [
      {
        title: "Inundație la bloc",
        description: "O conductă se sparge și inunzi apartamentele a 3 vecini de dedesubt. Asigurarea ta de răspundere civilă acoperă reparațiile vecinilor."
      },
      {
        title: "Incendiu",
        description: "Un scurtcircuit distruge complet locuința. Asigurătorul plătește valoarea de reconstrucție și acoperă bunurile pierdute."
      }
    ],
    iconName: "Home",
    benefits: [
      { title: "Toate riscurile", description: "Acoperire pentru incendiu, inundație, furt, avarii accidentale." },
      { title: "Răspundere civilă", description: "Acoperă daunele produse vecinilor." },
      { title: "Asistență tehnică", description: "Servicii de urgență la domiciliu (instalator, lăcătuș, electrician)." },
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
    longDescription: "Îți oferim liniște la volan prin pachete auto gândite pentru confort maxim. Ne asigurăm că beneficiezi de asistență rutieră premium, decontare directă și reparații în cele mai bune reprezentanțe.",
    whatIsIt: "Un pachet ce combină RCA (asigurarea obligatorie de răspundere civilă auto) cu clauze premium, cum ar fi Decontarea Directă, sau polițe CASCO complete pentru protecția investiției auto.",
    risksCovered: [
      "Avarii produse din vina altor șoferi (RCA cu Decontare Directă)",
      "Avarii din propria vină sau cu autor necunoscut (CASCO)",
      "Furt, vandalism, grindină, inundație (CASCO)",
      "Asistență rutieră și tractare",
      "Vătămări corporale ale pasagerilor"
    ],
    targetAudience: [
      "Șoferi care doresc confort și siguranță.",
      "Proprietari de autoturisme noi sau în leasing.",
      "Persoane care călătoresc frecvent cu mașina și au nevoie de asistență premium."
    ],
    practicalExamples: [
      {
        title: "Accident fără vină",
        description: "Ești lovit în trafic de un șofer asigurat la o companie problematică. Ai decontare directă pe RCA-ul tău Generali, deci îți repari mașina rapid prin asigurătorul tău."
      },
      {
        title: "Avarie în parcare",
        description: "Găsești mașina zgâriată. Activezi polița CASCO, o duci la reprezentanță și primești mașină la schimb gratuit."
      }
    ],
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
  "imm-insurance": {
    id: "imm-insurance",
    slug: "imm-insurance",
    title: "Asigurări IMM",
    shortDescription: "Protecția afacerii tale: clădiri, stocuri, echipamente și întreruperea activității.",
    longDescription: "Un business de succes este un business protejat. Soluțiile noastre de asigurare pentru Întreprinderi Mici și Mijlocii (IMM) acoperă spațiile comerciale, echipamentele vitale, mărfurile și, foarte important, pierderile de profit survenite în urma unui eveniment asigurat.",
    whatIsIt: "Asigurarea integrată pentru afaceri acoperă atât clădirile și echipamentele companiei, cât și stocurile, răspunderile față de terți și compensarea pierderii de profit dacă afacerea este oprită din funcționare de un dezastru.",
    risksCovered: [
      "Distrugerea clădirilor sau spațiilor din incendii, inundații, fenomene naturale",
      "Furtul sau distrugerea echipamentelor și utilajelor",
      "Pierderea stocurilor de marfă",
      "Răspunderea față de clienți sau angajați",
      "Pierderea de profit din întreruperea activității"
    ],
    targetAudience: [
      "Afaceri de retail și magazine fizice.",
      "Clinici medicale, saloane și furnizori de servicii.",
      "Depozite și companii de distribuție.",
      "Restaurante și cafenele (HoReCa)."
    ],
    practicalExamples: [
      {
        title: "Incendiu la restaurant",
        description: "Un scurtcircuit provoacă un incendiu major. Polița plătește reparația locației, echipamentele distruse și profitul net pe care locația nu îl produce cât timp este închisă pentru reparații."
      },
      {
        title: "Furt în magazin",
        description: "Hoții sparg geamurile unui magazin de electronice și sustrag marfă. Asigurarea acoperă atât daunele clădirii cât și contravaloarea produselor sustrase."
      }
    ],
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
    longDescription: "Structurăm programe complexe de asigurare pentru companii cu nevoi complexe. Ne adresăm riscurilor corporative, de la răspunderea directorilor (D&O), la riscuri cibernetice (Cyber Risk) și erori profesionale.",
    whatIsIt: "Un pachet de risk management corporate, dedicat companiilor mari. Include acoperiri sofisticate precum D&O (Directors & Officers Liability), asigurare cibernetică și transferul riscurilor operaționale majore.",
    risksCovered: [
      "Răspunderea managerilor și directorilor (D&O)",
      "Atacuri cibernetice și scurgeri de date (Cyber Risk)",
      "Erori și omisiuni profesionale",
      "Riscuri industriale complexe",
      "Răspunderea produsului la nivel global"
    ],
    targetAudience: [
      "Corporații naționale și multinaționale.",
      "Fabrici și unități mari de producție.",
      "Companii IT, Fin-Tech și agenții de software.",
      "Fonduri de investiții și membrii Boardului de Directori."
    ],
    practicalExamples: [
      {
        title: "Atac Ransomware",
        description: "Hackerii criptează serverele companiei și blochează activitatea, cerând o recompensă. Asigurarea Cyber preia costul investigațiilor IT, plata specialiștilor de recuperare date și pierderea de profit din zilele de nefuncționare."
      },
      {
        title: "Proces împotriva Boardului",
        description: "Un grup de acționari dă în judecată CEO-ul pentru o decizie managerială care a cauzat pierderi financiare. Polița D&O preia onorariile avocatului și eventualele despăgubiri decise de instanță."
      }
    ],
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
    whatIsIt: "Asigurarea care plătește în locul tău dacă tu (sau afacerea ta) ești găsit vinovat legal pentru producerea unei pagube materiale sau a unei vătămări corporale aduse unei terțe persoane.",
    risksCovered: [
      "Vătămări corporale ale terților pe proprietatea asigurată",
      "Daune materiale produse vecinilor sau clienților",
      "Răspunderea chiriașului față de proprietar",
      "Cheltuieli legale de apărare în instanță",
      "Răspunderea legată de produsele defecte"
    ],
    targetAudience: [
      "Proprietari de spații comerciale sau clădiri de birouri.",
      "Companii de servicii (reparații, mentenanță, curățenie).",
      "Persoane fizice (răspunderea capului familiei).",
      "Producători sau importatori de bunuri."
    ],
    practicalExamples: [
      {
        title: "Client alunecă în magazin",
        description: "Pe timpul iernii, un client alunecă pe podeaua umedă din magazinul tău și suferă o fractură. Polița achită cheltuielile medicale și eventualele despăgubiri morale cerute de client."
      },
      {
        title: "Produs cu defect",
        description: "Vinzi un produs alimentar care cauzează toxiinfecții unui număr de clienți. Asigurarea de răspundere a produsului va prelua litigiile și costurile de despăgubire."
      }
    ],
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
    whatIsIt: "O soluție specifică pentru Real Estate-ul comercial care protejează parcurile logistice, mall-urile, clădirile de birouri sau hotelurile. Include atât componenta de property cât și clauze specifice pentru pierderea chiriei.",
    risksCovered: [
      "Distrugerea parțială sau totală a imobilului (incendiu, trăsnet, cutremur)",
      "Terorism, vandalism și greve",
      "Pierderea venitului din chirii (Rent Loss)",
      "Răspunderea față de chiriași și vizitatori",
      "Avarii la echipamente de deservire a clădirii (HVAC, lifturi)"
    ],
    targetAudience: [
      "Dezvoltatori imobiliari.",
      "Fonduri de investiții Real Estate.",
      "Proprietari de Mall-uri și Spații Logistice.",
      "Asociații de proprietari pentru clădiri premium."
    ],
    practicalExamples: [
      {
        title: "Incendiu parțial la clădirea de birouri",
        description: "Focul distruge un etaj din clădire. Asigurarea repară etajul, dar îți plătește și chiria lunară garantată contractual pe care chiriașul refuză să o mai achite în perioada reparației."
      },
      {
        title: "Avarie echipament HVAC",
        description: "Sistemul central de climatizare cedează din cauza unui incident electric, costând 80.000€ înlocuirea sa. Polița acoperă piesa și manopera aferentă."
      }
    ],
    iconName: "Building2",
    benefits: [
      { title: "Valoare de înlocuire nouă", description: "Despăgubiri calculate pentru refacerea la standarde curente." },
      { title: "Acoperire chirie", description: "Compensarea pierderii veniturilor din chirie în caz de dezastru." },
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
    longDescription: "Fie că ai o flotă de 5 sau 500 de vehicule, gestionarea asigurărilor necesită o abordare unitară. Negociem reduceri de flotă substanțiale și unificăm scadențele, transformând RCA-ul și CASCO-ul într-un sistem simplu.",
    whatIsIt: "Un program de asigurare integrat pentru mașinile deținute de persoană juridică, care unifică termenele de plată și negociază tarife reduse globale, scăzând costul per mașină.",
    risksCovered: [
      "Avarii cu sau fără autor necunoscut (CASCO Flotă)",
      "Răspundere civilă obligatorie (RCA Flotă)",
      "Furt total și parțial",
      "Daune cauzate de angajați în timpul delegării",
      "Asistență rutieră pentru flota operațională"
    ],
    targetAudience: [
      "Companii de transport sau logistică.",
      "Firme cu agenți de vânzări pe teren.",
      "Corporații cu mașini de serviciu tip benefit.",
      "Flote de utilaje sau dube pentru distribuție."
    ],
    practicalExamples: [
      {
        title: "Tractare simultană",
        description: "Un angajat este implicat într-un accident, iar altul are pană în altă zonă a țării. Ambele vehicule beneficiază instant de platformă și tractare grație poliței unice cu Call-Center dedicat de flotă."
      },
      {
        title: "Ajustare la scadență",
        description: "În loc să faci reînnoiri pentru 30 de mașini în luni diferite, toată flota se aliniază la o singură scadență, permițând previzionarea financiară clară a bugetului auto."
      }
    ],
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
    whatIsIt: "Un program complet extra-salarial pe care un angajator îl oferă echipei. Cel mai adesea constă într-o asigurare privată de sănătate de top care oferă acces la rețele premium, plus asigurări de viață la nivel de grup.",
    risksCovered: [
      "Cheltuielile medicale recurente sau de specialitate ale angajaților",
      "Intervenții chirurgicale și spitalizare",
      "Decesul sau accidentarea angajatului",
      "Includerea membrilor de familie (soț/soție, copii)"
    ],
    targetAudience: [
      "Departamente HR care doresc să atragă și să rețină talente.",
      "Companii din IT, Servicii Financiare și Consultanță.",
      "Fabrici și corporații preocupate de bunăstarea echipei.",
      "Angajatori care caută optimizare fiscală (avantajul deductibilității)."
    ],
    practicalExamples: [
      {
        title: "Consultație la rețeaua Regina Maria",
        description: "Angajatul suferă o problemă de sănătate, utilizează cardul de asigurare privat deținut de firmă și accesează medicii de top fără să plătească nimic din buzunar."
      },
      {
        title: "Deductibilitate Fiscală",
        description: "Angajatorul beneficiază de deductibilitate fiscală în limita a 400 EUR per angajat pe an, scutind taxe raportat la același echivalent acordat sub formă de salariu net."
      }
    ],
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
      { q: "Se pot include membrii familiei?", a: "Da, pachetele permit includerea soțului/soției și a copiilor." },
      { q: "Care este pachetul preferat în România?", a: "Asigurarea privată de sănătate este cel mai dorit beneficiu extra-salarial de către români." }
    ]
  },
  "professional-protection": {
    id: "professional-protection",
    slug: "professional-protection",
    title: "Malpraxis & Răspundere Profesională",
    shortDescription: "Siguranță deplină pentru medici, avocați, IT-ști, arhitecți și ingineri.",
    longDescription: "O eroare umană neintenționată nu trebuie să îți distrugă cariera. Asigurările de răspundere civilă profesională acoperă prejudiciile aduse clienților tăi din neglijență sau erori profesionale, asigurând și cheltuielile legale.",
    whatIsIt: "Asigurarea de erori și omisiuni (Errors & Omissions) preia riscul meseriilor unde o mică greșeală poate cauza daune materiale majore sau daune corporale pacienților/clienților tăi.",
    risksCovered: [
      "Erori de diagnosticare, neglijență medicală (Malpraxis medical).",
      "Erori de proiectare arhitecturală sau inginerească care duc la pagube.",
      "Bug-uri software livrate care duc la pierderi de business pentru client.",
      "Omisiuni în activitatea contabilă și de audit financiar.",
      "Costurile uriașe ale onorariilor de judecată pentru apărare."
    ],
    targetAudience: [
      "Medici, clinici și personal sanitar.",
      "Arhitecți, ingineri constructori, proiectanți.",
      "Avocați, notari, experți contabili, brokeri.",
      "Firme de software și servicii IT care semnează SLA-uri stricte cu clienții externi."
    ],
    practicalExamples: [
      {
        title: "Malpraxis Medical",
        description: "Un medic chirurg este dat în judecată de un pacient pentru o complicație postoperatorie rară. Asigurarea preia cheltuielile de judecată și despăgubirea legală acordată pacientului."
      },
      {
        title: "Eroare Software / IT",
        description: "Livrezi o platformă pentru un client, dar din cauza unui bug neprevăzut, site-ul pică în weekendul de Black Friday, generând pierderi de 50.000€. Polița ta de IT Liability achită despăgubirea."
      }
    ],
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
    longDescription: "Accidentele sunt neprevăzute și de multe ori au un impact financiar masiv. Această poliță oferă sume de bani cash în caz de fracturi, arsuri, invaliditate permanentă sau necesitate de spitalizare în urma unui accident.",
    whatIsIt: "O protecție directă de tip 'cash payout'. În momentul în care suferi un accident (de exemplu fractură de os), trimiți radiografia și primești direct un procent din suma asigurată în cont, fără a justifica pe ce cheltui banii.",
    risksCovered: [
      "Fracturi, arsuri, vătămări corporale din orice fel de accident.",
      "Spitalizare din accident (indemnizație fixă per zi de stat în spital).",
      "Invaliditate parțială sau permanentă rezultată din accident.",
      "Intervenții chirurgicale ortopedice / traumatologice."
    ],
    targetAudience: [
      "Persoane active, pasionate de sport, ciclism, schi.",
      "Muncitori în domenii cu risc mai ridicat.",
      "Copii (asigurări speciale pentru copii activi) care se accidentează la școală sau la joacă.",
      "Orice persoană care vrea o protecție foarte accesibilă, ce acoperă situațiile neașteptate."
    ],
    practicalExamples: [
      {
        title: "Fractură la schi",
        description: "Pe timpul vacanței îți rupi brațul. Pe baza biletului de ieșire din spital care atestă fractura, polița virează suma de bani echivalentă pe cardul tău bancar pentru a te ajuta în perioada de refacere."
      },
      {
        title: "Spitalizare 10 zile",
        description: "Ai avut un accident de mașină, iar polița prevede 100€ pe zi de spitalizare. După cele 10 zile de internare, primești 1000€ suplimentari, compensând faptul că nu ai putut munci în acea perioadă."
      }
    ],
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
