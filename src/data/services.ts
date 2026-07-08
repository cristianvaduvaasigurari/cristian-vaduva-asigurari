export type ServiceContent = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  whatIsIt: string;
  whyIsItImportant: string;
  targetAudience: string[];
  benefits: { title: string; description: string }[];
  risksCovered: string[];
  practicalExamples: { title: string; description: string }[];
  whyGenerali: string[];
  faqs: { q: string; a: string }[];
  iconName: string;
};

export const servicesData: Record<string, ServiceContent> = {
  "life-insurance": {
    id: "life-insurance",
    slug: "life-insurance",
    title: "Asigurări de Viață",
    shortDescription: "Protecție financiară completă pentru tine și cei dragi, oriunde v-ați afla.",
    longDescription: "Un plan solid de asigurare de viață reprezintă pilonul de bază al protecției tale financiare și al administrării patrimoniului. În parteneriat cu Generali, oferim acoperiri ample care mențin standardul de viață al familiei tale în caz de neprevăzut.",
    whatIsIt: "Asigurarea de viață este un contract prin care se transferă riscul unui deces prematur, al invalidității sau al unor afecțiuni medicale grave către compania de asigurări, în schimbul unei prime plătite regulat.",
    whyIsItImportant: "În absența unui plan de rezervă masiv, dispariția prematură a pilonului financiar principal dintr-o familie poate lăsa în urmă datorii (credite ipotecare) și incapacitatea moștenitorilor de a menține un nivel de trai decent.",
    targetAudience: [
      "Părinți și tineri familiști care au persoane în întreținere.",
      "Persoane cu credite ipotecare mari sau alte datorii majore.",
      "Persoane care doresc să lase o moștenire garantată."
    ],
    benefits: [
      { title: "Securitate garantată", description: "Suma asigurată stabilită este garantată prin contract și ajunge rapid la beneficiari." },
      { title: "Flexibilitate a primelor", description: "Plata se poate face lunar, trimestrial, semestrial sau anual." },
      { title: "Independență de taxe", description: "Indemnizația de asigurare de viață nu este, în general, impozabilă." }
    ],
    risksCovered: [
      "Deces din orice cauză (accident sau boală).",
      "Invaliditate permanentă totală sau parțială.",
      "Afecțiuni grave (opțional).",
      "Spitalizare din accident."
    ],
    practicalExamples: [
      { title: "Protecția Familiei", description: "Un tată de familie suferă un infarct fatal. Polița plătește familiei capitalul de 150.000 EUR, bani cu care aceștia își achită creditul casei și finanțează facultatea copiilor." }
    ],
    whyGenerali: [
      "Peste 190 de ani de experiență mondială în plata daunelor.",
      "Stabilitate financiară recunoscută la nivel global.",
      "Rețea de asistență rapidă și lichidități imense."
    ],
    faqs: [
      { q: "Când este momentul ideal pentru a o încheia?", a: "Cât mai devreme. Persoanele tinere și sănătoase primesc cote mult mai avantajoase." },
      { q: "Banii se întorc dacă nu pățesc nimic?", a: "Polița standard este de risc, însă poți opta pentru o poliță de viață cu componentă de economisire (capitalizare), caz în care banii se întorc la maturitate." }
    ],
    iconName: "Heart"
  },
  "health-insurance": {
    id: "health-insurance",
    slug: "health-insurance",
    title: "Asigurări de Sănătate",
    shortDescription: "Acces direct și rapid în clinicile și spitalele private de top.",
    longDescription: "Sănătatea nu este negociabilă. Pachetele noastre de asigurare de sănătate private decontează cheltuielile majore și minore, oferindu-ți acces instant la excelența medicală privată.",
    whatIsIt: "Un abonament la un sistem premium de sănătate care funcționează independent de sistemul de stat. Asigurătorul plătește (decontează direct) contravaloarea serviciilor medicale prestate de clinicile și spitalele private partenere.",
    whyIsItImportant: "Timpul înseamnă viață în caz de afecțiuni medicale. Asigurarea îți permite să ocolești listele lungi de așteptare din sistemul public și să primești expertiză de la medici de elită exact când ai nevoie.",
    targetAudience: [
      "Orice persoană care își permite și își dorește servicii medicale la standarde occidentale.",
      "Familii cu copii (pachetele familiale acoperă bolile copilăriei).",
      "Freelanceri sau antreprenori care nu au pachete de beneficii corporate."
    ],
    benefits: [
      { title: "Fără cozi", description: "Programare telefonică sau prin aplicație direct la specialist." },
      { title: "Spitalizare de lux", description: "Acoperirea costurilor pentru intervenții complexe și condiții de internare premium." },
      { title: "Acoperire internațională", description: "Opțional, tratamente efectuate la clinici renumite din străinătate." }
    ],
    risksCovered: [
      "Consultații și analize de rutină.",
      "Investigații complexe (RMN, CT, Ecografii).",
      "Spitalizare în rezervă single/double.",
      "Intervenții chirurgicale clasice sau laparoscopice."
    ],
    practicalExamples: [
      { title: "Intervenție la ligamente", description: "În urma unui accident, clientul are nevoie de operație la genunchi. Spitalul privat facturează 4.000 EUR, cost preluat integral și direct de asigurător." }
    ],
    whyGenerali: [
      "Parteneriate cu TOATE rețelele medicale majore (Regina Maria, Medlife, Sanador, Ponderas, etc.).",
      "Sistem de pre-aprobare digital rapid și eficient.",
      "Decontare directă la parteneri."
    ],
    faqs: [
      { q: "Pot merge la o clinică care nu e în rețeaua voastră?", a: "Da, plătești tu și trimiți factura către noi pentru decontare conform limitelor din contract." },
      { q: "Sunt acoperite afecțiunile preexistente?", a: "De regulă nu, sau sunt acoperite doar după o perioadă de așteptare stabilită contractual." }
    ],
    iconName: "Activity"
  },
  "auto-insurance": {
    id: "auto-insurance",
    slug: "auto-insurance",
    title: "Asigurări Auto",
    shortDescription: "Garanția All-Risk pentru autoturismul tău premium. Pachete complete RCA și CASCO.",
    longDescription: "Un autoturism de lux necesită siguranță la nivel de reprezentanță. Fie că discutăm despre o banală zgârietură în parcare, sau de o daună majoră provocată unui terț, protecția auto este indispensabilă.",
    whatIsIt: "O soluție integrată (RCA obligatoriu + CASCO facultativ) care acoperă daunele mașinii TALE și daunele provocate terților, acoperind chiar și greșelile proprii, fenomenele naturale sau vandalismul.",
    whyIsItImportant: "RCA-ul te protejează legal, dar CASCO îți protejează investiția. Un autoturism modern are reparații extrem de scumpe (senzori radar, faruri LED de mii de euro). O daună minoră poate destabiliza bugetul dacă nu ai CASCO.",
    targetAudience: [
      "Posesori de vehicule premium sau relativ noi (sub 10 ani vechime).",
      "Persoane cu vehicule în regim de Leasing (unde CASCO este obligatoriu).",
      "Orice șofer care are nevoie de mobilitate continuă și Decontare Directă."
    ],
    benefits: [
      { title: "All-Risk CASCO", description: "Acoperă inclusiv greșelile proprii de șofat." },
      { title: "Mașină la schimb", description: "Nu rămâi niciodată pieton. Acoperim costul unei mașini închiriate în caz de reparație." },
      { title: "Decontare Directă la RCA", description: "Dacă ești lovit, îți repari mașina pe propriul tău RCA, fără să aștepți după vinovat." }
    ],
    risksCovered: [
      "Coliziuni (din vina proprie sau autor necunoscut).",
      "Furt total sau parțial și tentative de furt.",
      "Fenomene naturale (grindină, căderi de copaci, inundație).",
      "Vandalism și daune produse terților."
    ],
    practicalExamples: [
      { title: "Furtună violentă", description: "O furtună de vară cu grindină distruge plafonul mașinii. CASCO acoperă reparația la tehnologie PDR fără costuri din partea ta." },
      { title: "Accident rutier", description: "Un șofer fără RCA valid te lovește. Clauza de Decontare Directă a poliței tale RCA preia reparația imediat." }
    ],
    whyGenerali: [
      "Evaluări foto de la distanță pentru despăgubiri rapide.",
      "Reparații exclusiv în reprezentanțe autorizate, folosind doar piese originale.",
      "Generali este partenerul preferat al marilor branduri auto de prestigiu."
    ],
    faqs: [
      { q: "Ce este Franșiza la CASCO?", a: "Este partea din daună pe care o suporți tu (ex: 100 EUR pe eveniment). Optând pentru o franșiză, costul anual al asigurării CASCO scade considerabil." },
      { q: "Beneficiez de reduceri dacă iau RCA și CASCO la Generali?", a: "Da, pachetele combinate generează bonificații atractive pe componenta de CASCO." }
    ],
    iconName: "Car"
  },
  "travel-insurance": {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Asigurări Travel",
    shortDescription: "Liniște deplină oriunde călătorești, cu protecție medicală și storno premium.",
    longDescription: "Călătoriile internaționale trebuie să fie despre experiențe. Elimină riscul falimentului personal din cauza unei spitalizări de urgență în străinătate (ex. SUA/Elveția) prin polițele noastre de travel.",
    whatIsIt: "O asigurare temporară sau anuală care decontează costurile actului medical din străinătate și compensează pierderile logistice (zbor anulat, bagaj pierdut).",
    whyIsItImportant: "Tratamentele medicale în afara României sunt exorbitante. O operație de urgență în SUA poate depăși 50.000 USD. Fără asigurare, pacienții suportă din bugetul propriu aceste facturi uriașe.",
    targetAudience: [
      "Orice persoană ce iese din țară (Business sau Leisure).",
      "Familii care pleacă în vacanțe cu copiii.",
      "Pasionați de sporturi de agreement (schi, scufundări, drumeții)."
    ],
    benefits: [
      { title: "Call Center 24/7", description: "Asistență în limba ta la orice oră din zi, oferită prin Europ Assistance." },
      { title: "Acoperire COVID", description: "Boli infecțioase și carantină incluse standard în poliță." },
      { title: "Multi-Trip Anual", description: "Opțiune pentru a plăti o singură dată și a fi acoperit la toate ieșirile din acel an." }
    ],
    risksCovered: [
      "Spitalizare și asistență medicală de urgență.",
      "Repatriere medicală sau în caz de deces.",
      "Anularea excursiei (clauza Storno) din motive obiective (boală).",
      "Pierderea documentelor, zboruri anulate și bagaje de cală pierdute."
    ],
    practicalExamples: [
      { title: "Fractură pe pârtie", description: "Elicopterul de salvare din Alpi intervine. Cost 5.000 EUR + Spital 8.000 EUR. Totul e decontat direct prin centrala de asistență Generali, fără avansuri din partea ta." }
    ],
    whyGenerali: [
      "Generali operează asistența prin rețeaua Europ Assistance, cel mai puternic grup de intervenție globală, aparținând tot grupului Generali.",
      "Aprobări rapide pentru proceduri scumpe în afara țării."
    ],
    faqs: [
      { q: "Ce se întâmplă dacă pierd avionul din vina mea?", a: "Greșelile proprii nu sunt acoperite (ex: am întârziat la aeroport). Se acoperă anulările din cauze obiective, cum ar fi o spitalizare bruscă înainte de zbor." },
      { q: "Polița acoperă și sporturile extreme?", a: "Sporturile de iarnă sau sporturile extreme necesită activarea unei clauze suplimentare, cu o primă ușor majorată." }
    ],
    iconName: "Plane"
  },
  "imm-insurance": {
    id: "imm-insurance",
    slug: "imm-insurance",
    title: "Asigurări IMM",
    shortDescription: "Pachetul All-in-One ideal pentru protejarea întreprinderilor mici și mijlocii.",
    longDescription: "Un business IMM se bazează pe flux de numerar constant și pe o echipă mică, dar critică. Un incendiu, o eroare umană sau un furt nu reprezintă doar pagube materiale, ci un colaps operațional pe care asigurarea noastră îl previne.",
    whatIsIt: "Un pachet modular de asigurări care grupează în aceeași poliță protecția imobilelor, a echipamentelor, mărfurilor, a răspunderii față de terți și a angajaților, special conceput pentru bugetul unui IMM.",
    whyIsItImportant: "Majoritatea IMM-urilor care suferă o daună catastrofică (incendiu, proces costisitor cu un client accidentat) și nu sunt asigurate, intră în faliment în mai puțin de 6 luni. Polița oferă fondurile de urgență pentru reconstrucție și salarii pe perioada nefuncționării.",
    targetAudience: [
      "Magazine de retail, restaurante, cafenele (HoReCa).",
      "Service-uri auto, ateliere de producție mici și depozite.",
      "Clinici stomatologice, saloane de înfrumusețare și birouri de IT/Consultanță."
    ],
    benefits: [
      { title: "Modularitate Totală", description: "Cumperi și plătești doar acoperirile de care afacerea ta are cu adevărat nevoie." },
      { title: "Răspundere Inclusă", description: "Protecție completă dacă produsele tale sau activitatea ta rănesc accidental un client." },
      { title: "Cost Optimizat", description: "Pachetul cumulat (Property + Liability) este mult mai eficient financiar decât polițele cumpărate separat." }
    ],
    risksCovered: [
      "Distrugerea activelor fizice (clădiri, birouri) și stocurilor de marfă.",
      "Întreruperea activității (Business Interruption - compensează profitul nerealizat).",
      "Avarii accidentale la utilaje vitale (echipamente medicale, utilaje de fabricație).",
      "Răspunderea profesională și Răspunderea față de angajați."
    ],
    practicalExamples: [
      { title: "Inundație la un centru medical", description: "O țeavă cedează noaptea și distruge aparatura. Cabinetul este închis 2 luni. Asigurarea despăgubește ecograful, mobilierul și îți acoperă veniturile și salariile ratate în cele 2 luni de oprire." },
      { title: "Accident în magazin", description: "Un client alunecă pe podeaua udă a cafenelei tale, suferă o fractură și te dă în judecată. Polița îți plătește avocații și daunele cerute de client." }
    ],
    whyGenerali: [
      "Generali oferă servicii croite special pentru antreprenorii români.",
      "Plata primei se poate face în rate flexibile pentru a nu bloca cash-flow-ul firmei.",
      "Asistență tehnică de specialitate și evaluatori industriali capabili să rezolve daune complexe rapid."
    ],
    faqs: [
      { q: "Mă costă mult o astfel de asigurare?", a: "Nu, pentru un IMM tipic o poliță cuprinzătoare reprezintă o fracțiune minimală din costurile lunare operaționale, adesea costând mai puțin decât abonamentele de telecomunicații ale firmei." },
      { q: "Sunt acoperite bunurile și echipamentele angajaților?", a: "Da, polița poate fi extinsă pentru a acoperi laptopurile, telefoanele de serviciu și bunurile personale ale angajaților aflate în incinta asigurată." }
    ],
    iconName: "Briefcase"
  }
};
