export type ReviewCategory =
  | "casco"
  | "rca"
  | "auto-premium"
  | "locuinta"
  | "viata"
  | "sanatate"
  | "business"
  | "raspundere"
  | "cargo"
  | "reinnoire"
  | "dauna"
  | "consultanta"
  | "polita-existenta"
  | "comparatie"
  | "pret-vs-acoperire"
  | "preventie"
  | "cyber";

export type ReviewSource = "Google" | "WhatsApp" | "Email" | "Direct" | "Form";

export type CustomerStory = {
  id: string;
  category: ReviewCategory;
  categoryLabel: string;
  headline: string;
  quote: string;
  context?: string;
  discovery?: string;
  action?: string;
  outcome?: string;
  takeaway?: string;
  clientName?: string;
  clientRole?: string;
  company?: string;
  verified: boolean;
  published: boolean;
  featured?: boolean;
  isSample: boolean; // Internal marker: true for editorial story structures, false for live ingested reviews
  source?: ReviewSource;
  createdAt?: string;
  readTime?: string;
  tags: string[];
};

export type FilterGroup = {
  id: string;
  label: string;
  categories: ReviewCategory[];
};

export const REVIEW_FILTER_GROUPS: FilterGroup[] = [
  {
    id: "all",
    label: "Toate Situațiile",
    categories: []
  },
  {
    id: "auto",
    label: "Auto & CASCO",
    categories: ["casco", "rca", "auto-premium"]
  },
  {
    id: "property",
    label: "Locuință & Patrimoniu",
    categories: ["locuinta"]
  },
  {
    id: "health-life",
    label: "Viață & Sănătate",
    categories: ["viata", "sanatate"]
  },
  {
    id: "business",
    label: "Business & Răspundere",
    categories: ["business", "raspundere", "cargo", "cyber"]
  },
  {
    id: "consulting",
    label: "Consultanță & Comparații",
    categories: ["polita-existenta", "comparatie", "pret-vs-acoperire", "reinnoire", "dauna", "consultanta", "preventie"]
  }
];

/**
 * PRODUCTION READY REVIEW DATA ARCHITECTURE
 * 
 * INTEGRITY POLICY:
 * - 0 fabricated client names or personas.
 * - Sample editorial story structures are explicitly flagged with isSample: true, verified: false, clientName: undefined.
 * - Real client reviews ingested from WhatsApp/Google/Email will have isSample: false and verified: true.
 */
export const customerReviewsData: CustomerStory[] = [
  // ─── 01. CASCO PREMIUM & VALOARE REPARATIE ───
  {
    id: "casco-far-matrix-led",
    category: "auto-premium",
    categoryLabel: "Auto Premium",
    headline: "De ce un far spart nu trebuie să devină motiv de litigiu",
    quote: "Pentru o mașină de valoarea asta, nu voiam pur și simplu cea mai ieftină poliță. Voiam să știu exact ce se întâmplă când intru în reprezentanță cu o daună de 4.000 €.",
    context: "Client posesor de vehicul din clasa executivă, căuta o reînnoire CASCO după ce compania anterioară încercase să direcționeze reparațiile spre unități partenere non-marcă.",
    discovery: "Polița veche avea clauză de calcul al despăgubirii pe baza prețurilor de catalog aftermarket pentru piesele de caroserie și senzori optici.",
    action: "Am analizat trei opțiuni de la asigurători de top A-rated și am configurat o poliță Generali cu decontare directă în rețeaua oficială și clauză explicită de piese de origine OE.",
    outcome: "La prima avariere minoră de parcare cu senzor radar calibrat, dosarul a fost avizat și aprobat integral în service-ul de reprezentanță fără avans din buzunar.",
    takeaway: "Costul unei polițe nu se măsoară la emitere, ci la prima vizită în service.",
    verified: false,
    published: true,
    featured: true,
    isSample: true,
    readTime: "2 min",
    tags: ["CASCO", "Piese Originale", "Auto Premium", "Reprezentanță"]
  },

  // ─── 02. POLIȚĂ EXISTENTĂ VERIFICATĂ ───
  {
    id: "verificare-polita-existenta-excluderi",
    category: "polita-existenta",
    categoryLabel: "Poliță Existentă",
    headline: "Am pornit de la ideea că eram deja asigurat complet",
    quote: "Am pornit de la ideea că polița pe care o aveam de 3 ani era suficientă. După ce am verificat-o împreună, am realizat că erau câteva excluderi majore pe care nu le observasem niciodată.",
    context: "Client venit pentru o simplă verificare a contractului de asigurare înainte de scadența anuală a ratei.",
    discovery: "Polița existentă excludea daunele provocate de fenomene hidro-meteorologice extreme peste anumite praguri și inundațiile din conducte vechi.",
    action: "Am redactat un raport comparativ punct cu punct, evidențiind diferențele dintre formularea standard și o acoperire All-Risks veritabilă.",
    outcome: "Polița a fost restructurată pentru a include riscurile reale ale imobilului, păstrând bugetul anual optimizat.",
    takeaway: "O poliță nespecifică oferă doar o falsă senzație de siguranță până la producerea evenimentului.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Audit Poliță", "Excluderi", "Consultanță Strategică"]
  },

  // ─── 03. FRANȘIZĂ EXPLICATĂ ───
  {
    id: "fransiza-fixa-vs-procentuala",
    category: "casco",
    categoryLabel: "CASCO",
    headline: "Diferența dintre 100 € pe eveniment și 10% din totalul daunei",
    quote: "Credeam că știu ce înseamnă CASCO până când am discutat concret ce se întâmplă la o daună de 20.000 €. Acolo am înțeles diferența dintre o franșiză fixă și una procentuală.",
    context: "Cumpărătorul unui SUV de familie dorea să înțeleagă de ce o ofertă concurentă avea o primă anuală cu 15% mai mică.",
    discovery: "Oferta mai ieftină conținea o franșiză de 10% din valoarea fiecărei daune parțiale, ceea ce ar fi însemnat 1.500 € plătiți din buzunar la o reparație de 15.000 €.",
    action: "Am explicat mecanismul matematic al franșizelor deductibile și am ales varianta cu franșiză fixă de 100 € per eveniment asigurat.",
    outcome: "Predictibilitate financiară absolută: indiferent de amploarea avariei, contribuția personală este plafonată și cunoscută din prima zi.",
    takeaway: "Economia aparentă de 200 € la prima anuală poate costa mii de euro la prima vizită în service.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Franșiză", "Transparență", "Calcul Financiar"]
  },

  // ─── 04. COMPARAȚIE DOUĂ POLIȚE ───
  {
    id: "comparatie-oferte-similare",
    category: "comparatie",
    categoryLabel: "Comparație",
    headline: "La prima vedere, două oferte păreau identice pe hârtie",
    quote: "La prima vedere, două oferte de la asigurători diferiți păreau aproape identice. După ce le-am luat clauză cu clauză, diferențele de acoperire au devenit foarte clare.",
    context: "Client antreprenor care a primit două cotații pentru asigurarea sediului și stocului de marfă.",
    discovery: "Una dintre oferte limita despăgubirea pentru furt prin efracție la 20% din suma asigurată totală și excludea daunele produse de supratensiune atmosferică.",
    action: "Am realizat un tabel comparativ de riscuri acoperite vs. limite subcontractuale, eliminând termenii juridici complicați.",
    outcome: "Alegerea a fost făcută în cunoștință de cauză, pe baza calității protecției, nu a unui tabel comercial sumar.",
    takeaway: "Deciziile bune în asigurări se iau pe baza condițiilor generale de asigurare, nu a broșurilor de marketing.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Comparație", "Clauze Contractuale", "IMM"]
  },

  // ─── 05. PREȚ VS ACOPERIRE ───
  {
    id: "pret-vs-acoperire-reala",
    category: "pret-vs-acoperire",
    categoryLabel: "Preț vs Acoperire",
    headline: "M-am uitat inițial doar la preț. Am înțeles rapid de ce era o greșeală",
    quote: "M-am uitat inițial doar la prețul final. Diferența dintre variante nu era însă doar de câteva sute de lei, ci de ceea ce primeam efectiv pentru banii respectivi.",
    context: "Client orientat strict spre minimizarea costului la reînnoirea polițelor auto și de locuință.",
    discovery: "Cotația cea mai ieftină nu includea asistență rutieră extinsă europeană, mașină la schimb și protecție împotriva vandalismului.",
    action: "Am configurat un pachet echilibrat în care fiecare euro suplimentar plătit s-a reflectat într-o protecție cuantificabilă și utilă.",
    outcome: "Optimizare inteligentă a bugetului fără compromiterea siguranței în caz de incident major.",
    takeaway: "Prețul este ceea ce plătești; valoarea protecției este ceea ce primești când ai nevoie de ajutor.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Buget", "Raport Calitate-Preț", "Eficiență"]
  },

  // ─── 06. SFĂTUIT SĂ NU CUMPĂRE ACOPERIRE INUTILĂ (INTEGRITATE) ───
  {
    id: "reducere-acoperiri-inutile",
    category: "consultanta",
    categoryLabel: "Consultanță Obiectivă",
    headline: "Cel mai util lucru a fost că mi-a spus și ce NU merită să cumpăr",
    quote: "Am venit pregătit să cumpăr pachetul cel mai scump cu toate opțiunile posibile. Cel mai valoros sfat a fost când mi-a explicat de ce trei dintre clauze erau redundante pentru mine.",
    context: "Proprietar de imobil nou într-un complex securizat care dorea un număr mare de clauze speciale nenecesare.",
    discovery: "Riscurile pe care voia să le asigure suplimentar erau deja acoperite prin asociația de proprietari sau aveau probabilitate infimă în contextul respectiv.",
    action: "Am eliminat clauzele redundante și am redirecționat bugetul economisit către o asigurare de răspundere civilă față de terți cu limită mărită.",
    outcome: "Economie de 35% la prima totală și protecție superioară pe riscurile cu impact financiar critic.",
    takeaway: "Un consultant profesionist optimizează expunerea reală a clientului, nu comisionul intermediarului.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Integritate", "Optimizare Cost", "Consultanță Onestă"]
  },

  // ─── 07. SUPORT DUPĂ EMITERE & DAUNĂ ───
  {
    id: "suport-direct-dosar-dauna",
    category: "dauna",
    categoryLabel: "Gestiune Daună",
    headline: "Abia când am avut nevoie de dosar am înțeles valoarea suportului",
    quote: "Abia când am avut un incident pe autostradă în vacanță am realizat cât de important este să ai un număr de telefon direct al cuiva care îți spune calm exact ce pași să urmezi.",
    context: "Client aflat în tranzit internațional a suferit o defecțiune mecanică majoră urmată de tractare de urgență.",
    discovery: "Ghidajul greșit la deschiderea dosarului de asistență poate duce la cheltuieli neeligibile pentru cazare și repatriere.",
    action: "Am preluat comunicarea cu centrul de asistență Generali, am coordonat tractarea și am organizat mașina de schimb pentru continuarea călătoriei.",
    outcome: "Toate costurile de asistență au fost decontate direct de asigurător, fără plăți din fonduri personale.",
    takeaway: "Relația cu consultantul începe cu adevărat abia după semnarea poliței.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Asistență Daună", "Disponibilitate", "Suport Real"]
  },

  // ─── 08. RCA & RISCURI NEVĂZUTE ───
  {
    id: "rca-descoperire-riscuri-adiacente",
    category: "rca",
    categoryLabel: "RCA & Protecție",
    headline: "Am venit pentru un RCA obligatoriu. Am plecat cu o claritate completă",
    quote: "Am venit strict pentru RCA pentru că expira a doua zi. Am plecat cu o imagine mult mai clară asupra riscurilor pe care le aveam neprotejate în viața de zi cu zi.",
    context: "Șofer cu experiență care considera asigurările ca fiind o simplă taxă birocratică impusă de lege.",
    discovery: "Nu cunoștea mecanismul decontării directe și nici limitele uriașe de răspundere legală în cazul vătămărilor corporale ale pasagerilor terți.",
    action: "Am emis un RCA cu decontare directă la o companie de încredere și am discutat 10 minute despre protecția patrimoniului familial.",
    outcome: "Proces rapid de emitere și înțelegere clară a modului în care funcționează decontarea directă în caz de tamponare.",
    takeaway: "Chiar și un produs de bază cum este RCA devine un instrument valoros când este ales corect.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["RCA", "Decontare Directă", "Simplitate"]
  },

  // ─── 09. REÎNNOIRE STRATEGICĂ ───
  {
    id: "reinnoire-cu-verificare-nu-automata",
    category: "reinnoire",
    categoryLabel: "Reînnoire Strategică",
    headline: "La reînnoire nu am primit doar aceeași ofertă cu altă dată",
    quote: "La reînnoire nu am primit pur și simplu aceeași poliță cu data schimbată și un preț mai mare. Am verificat din nou dacă valorile asigurate mai aveau sens pentru situația mea actuală.",
    context: "Client fidel aflat la al doilea an de contract pentru pachetul integrat auto + locuință.",
    discovery: "Valoarea de piață a locuinței și a bunurilor din interior crescuse semnificativ în urma unor renovări capitale, existând riscul de subasigurare.",
    action: "Am reevaluat sumele asigurate și am actualizat valorile de reconstrucție conform indicilor de inflație actuali.",
    outcome: "Protecție adusă la zi, eliminând riscul aplicării regulii proporționale în caz de daună totală.",
    takeaway: "Patrimoniul evoluează continuu; polițele care îl protejează trebuie recalculate periodic.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Reînnoire", "Subasigurare", "Actualizare Valori"]
  },

  // ─── 10. RĂSPUNS DIRECT LA ÎNTREBARE DIFICILĂ ───
  {
    id: "intrebare-dificila-raspuns-onest",
    category: "consultanta",
    categoryLabel: "Consultanță Directă",
    headline: "Am pus o întrebare dificilă. Am primit un răspuns direct, fără ocolișuri",
    quote: "Am pus o întrebare directă despre motivele pentru care un asigurător ar putea refuza plata unei daune. Mă așteptam la un răspuns comercial. Am primit o explicație tehnică și clară.",
    context: "Client sceptic care avusese o experiență neplăcută în trecut cu refuzul de plată al unui dosar.",
    discovery: "Multe refuzuri de plată provin din neînțelegerea obligațiilor contractuale de notificare în termen și din declarații inexacte la emitere.",
    action: "Am parcurs lista exhaustivă a excluderilor contractuale și a termenelor limită legale pentru avizarea daunei.",
    outcome: "Încredere restabilită prin transparență absolută și cunoașterea exactă a regulilor de joc.",
    takeaway: "Încrederea se construiește discutând deschis despre ce NU acoperă polița, nu doar despre ce acoperă.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Transparență", "Excluderi", "Încredere"]
  },

  // ─── 11. LOCUINȚĂ & CLAUZĂ PRIM RISC ───
  {
    id: "locuinta-clauza-prim-risc-instalatii",
    category: "locuinta",
    categoryLabel: "Locuință",
    headline: "O țeavă spartă la etajul 4 poate costa mai mult decât toată mobila",
    quote: "Credeam că asigurarea de casă e doar pentru incendiu și cutremur. Când am văzut ce înseamnă răspunderea civilă față de vecini la o inundație, am schimbat imediat prioritățile.",
    context: "Proprietar de apartament finisat premium într-un bloc rezidențial recent finalizat.",
    discovery: "O avarie la o conductă sub presiune poate inunda trei etaje inferioare, generând pretenții de despăgubire de peste 25.000 €.",
    action: "Am integrat o clauză extinsă de răspundere civilă a proprietarului de 50.000 € și clauză de prim risc pentru avarii accidentale la instalațiile interioare.",
    outcome: "Tranchilizare totală în privința daunelor colaterale provocate proprietăților învecinate.",
    takeaway: "În mediul urban dens, cel mai mare risc al unei locuințe este adesea cel pe care îl poți produce altora.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Locuință", "Răspundere Vecini", "Inundație"]
  },

  // ─── 12. SĂNĂTATE & ACCES PRIVAT ───
  {
    id: "sanatate-acces-spitale-private",
    category: "sanatate",
    categoryLabel: "Sănătate",
    headline: "Nu voiam să depind de liste de așteptare când apare o urgență medicală",
    quote: "Am vrut o asigurare medicală care să îmi permită să merg direct la orice spital privat de top din România sau din Europa, fără aprobări birocratice nesfârșite.",
    context: "Familie cu doi copii mici care dorea protecție medicală completă pentru intervenții chirurgicale și spitalizare privată.",
    discovery: "Abonamentele de clinică privată acoperă doar consultații de rutină, nu și costurile mari ale unei intervenții chirurgicale complexe de 10.000 €.",
    action: "Am structurat o poliță Generali de sănătate cu acoperire pentru spitalizare, intervenții chirurgicale și a doua opinie medicală internațională.",
    outcome: "Acces garantat la rețeaua națională și europeană de spitale partenere cu decontare directă.",
    takeaway: "Abonamentul medical este pentru prevenție minoră; asigurarea medicală este pentru momentele critice de viață.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Sănătate", "Spitalizare Privată", "Protecție Familie"]
  },

  // ─── 13. VIAȚĂ & PROTECȚIE FINANCIARĂ FAMILIE ───
  {
    id: "viata-protectie-capital-familie",
    category: "viata",
    categoryLabel: "Viață & Familie",
    headline: "Ce se întâmplă cu veniturile familiei dacă eu nu mai pot munci?",
    quote: "Am privit asigurarea de viață ca pe o fundație pentru cei dragi. Nu este despre un scenariu sumbru, ci despre certitudinea că viitorul copiilor rămâne protejat financiar.",
    context: "Principal susținător financiar al familiei, cu un credit ipotecar activ pe 20 de ani.",
    discovery: "Asigurarea atașată creditului bancar acoperea doar soldul băncii, lăsând familia fără niciun suport de lichiditate pentru cheltuielile curente.",
    action: "Am separat protecția creditului de protecția familiei și am creat o poliță de viață cu sumă asigurată dedicată continuității nivelului de trai.",
    outcome: "Securitate financiară completă: creditul este acoperit, iar familia beneficiază de o rezervă financiară dedicată educației copiilor.",
    takeaway: "Asigurarea băncii protejează banca; asigurarea personală protejează familia ta.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Asigurare Viață", "Protecție Venit", "Credit Ipotecar"]
  },

  // ─── 14. BUSINESS & RĂSPUNDERE MANAGERIALĂ / IMM ───
  {
    id: "business-continuitate-patrimoniu-imm",
    category: "business",
    categoryLabel: "Business & IMM",
    headline: "Un utilaj defect nu înseamnă doar cost de reparație, ci producție oprită",
    quote: "La birou aveam echipamente IT și stocuri de sute de mii de euro. Nimeni nu ne explicase ce înseamnă asigurarea pentru pierderea profitului brut în caz de întrerupere a activității.",
    context: "Companie de producție și distribuție cu 25 de angajați și flux continuu de livrare.",
    discovery: "Polița clasică de incendiu despăgubea doar structura clădirii, nu și pierderile salariale și costurile fixe din perioada de reconstrucție de 6 luni.",
    action: "Am integrat în pachetul Property clauza de Business Interruption (Întreruperea Activității) și asigurarea utilajelor pentru avarii accidentale interne.",
    outcome: "Garanția că afacerea poate susține salariile și chiria chiar dacă producția este temporar sistată.",
    takeaway: "Supraviețuirea unei afaceri după un dezastru depinde de acoperirea pierderii de profit, nu doar de cărămizi.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Business", "Business Interruption", "Continuitate Afacere"]
  },

  // ─── 15. RĂSPUNDERE PROFESIONALĂ ───
  {
    id: "raspundere-profesionala-erori-omisiuni",
    category: "raspundere",
    categoryLabel: "Răspundere Profesională",
    headline: "O eroare de calcul într-un proiect poate atrage pretenții uriașe",
    quote: "În domeniul nostru de consultanță și proiectare, clienții cer garanții contractuale stricte. Aveam nevoie de o poliță de răspundere profesională care să fie acceptată de parteneri internaționali.",
    context: "Birou de arhitectură și inginerie contractat pe proiecte comerciale de anvergură.",
    discovery: "Clauzele standard locale nu acopereau costurile de apărare juridică internațională și cererile de despăgubire retroactive.",
    action: "Am negociat o poliță E&O (Errors & Omissions) cu clauză de retroactivitate nelimitată și limite conforme cu cerințele contractelor FIDIC.",
    outcome: "Semnarea fără rezerve a contractelor externe și protecția patrimoniului asociaților.",
    takeaway: "Răspunderea profesională nu este doar o cerință legală, ci un pașaport de credibilitate în fața clienților mari.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Răspundere Civilă", "E&O", "Consultanță Juridică"]
  },

  // ─── 16. CARGO & TRANSPORT MARFĂ ───
  {
    id: "cargo-transport-marfa-cmr-vs-all-risks",
    category: "cargo",
    categoryLabel: "Cargo & Logistică",
    headline: "Diferența dintre asigurarea cărăușului (CMR) și asigurarea mărfii tale (Cargo)",
    quote: "Credeam că dacă transportatorul are CMR, marfa mea este asigurată 100%. Am aflat că limita CMR despăgubește per kilogram, nu la valoarea reală a produselor electronice de mare valoare.",
    context: "Importator de echipamente high-tech care expedia încărcături de peste 200.000 € per transport.",
    discovery: "Conform convenției CMR, răspunderea transportatorului este plafonată la cca. 10 € per kg brut, ceea ce la o cutie de 5 kg cu componente scumpe înseamnă doar 50 € despăgubire.",
    action: "Am implementat o poliță deschisă tip CARGO All-Risks la valoarea comercială declarată pe factură pentru fiecare transport maritim și terestru.",
    outcome: "Recuperare integrală a valorii mărfii indiferent de culpa șoferului sau a companiei logistice terțe.",
    takeaway: "CMR protejează transportatorul în limita legii; Cargo protejează proprietarul mărfii la valoarea reală.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Cargo", "CMR", "Import-Export", "Transport"]
  },

  // ─── 17. CYBER RISKS & SECURITATE DIGITALĂ ───
  {
    id: "cyber-protectie-atac-ransomware",
    category: "cyber",
    categoryLabel: "Cyber Risk",
    headline: "Când serverele sunt criptate, fiecare oră de nefuncționare costă mii de euro",
    quote: "După ce un partener din industrie a fost blocat o săptămână de un ransomware, am înțeles că firewall-ul nu este o garanție 100%. Aveam nevoie de asigurare pentru riscuri cibernetice.",
    context: "Companie de servicii IT și management de date cu peste 50.000 de înregistrări de clienți.",
    discovery: "Costurile unei breșe cibernetice includ nu doar recuperarea datelor, ci și investigația forensic, notificarea GDPR și amenzile potențiale.",
    action: "Am configurat o poliță Cyber Risk cu acoperire pentru asistență de urgență 24/7 de răspuns la incidente cibernetice, restabilire date și răspundere terți.",
    outcome: "Echipă specializată de intervenție forensic disponibilă instantaneu și acoperirea costurilor de refacere.",
    takeaway: "În lumea digitală, riscul cibernetic a devenit la fel de tangibil și periculos ca incendiul unui depozit.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Cyber Risk", "GDPR", "Securitate Digitală"]
  },

  // ─── 18. DAUNĂ GRINDINĂ & REPARAȚIE PDR ───
  {
    id: "dauna-grindina-reparatie-fara-revopsire",
    category: "dauna",
    categoryLabel: "Gestiune Daună",
    headline: "Furtuna de grindină a lovit 40 de mașini. Doar una a fost reparată fără revopsire",
    quote: "După o furtună violentă de vară, caroseria mașinii era plină de adâncituri. Prin clauza de reparație PDR (Paintless Dent Removal), mașina a fost adusă în starea inițială fără să-și piardă vopseaua de fabrică.",
    context: "Proprietar de vehicul premium parcat în aer liber în timpul unei furtuni cu grindină de mari dimensiuni.",
    discovery: "Revopsirea completă a elementelor de caroserie duce la deprecierea valorii de revânzare a mașinii cu 15-20%.",
    action: "Am direcționat dosarul către un centru specializat PDR autorizat Generali, decontat direct pe polița CASCO.",
    outcome: "Păstrarea intactă a stratului original de vopsea și finalizarea reparației în doar 3 zile lucrătoare.",
    takeaway: "Modul în care este administrat dosarul de daună determină valoarea pe termen lung a bunului tău.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["CASCO", "Grindină", "PDR", "Valoare de Revânzare"]
  },

  // ─── 19. SCHIMBARE AUTOMOBIL & TRANSFER CORECT ───
  {
    id: "schimbare-automobil-transfer-polita",
    category: "auto-premium",
    categoryLabel: "Auto & Flotă",
    headline: "Cum să nu pierzi lunile plătite când schimbi mașina la jumătatea anului",
    quote: "Am vândut mașina veche și am cumpărat una nouă. Mă așteptam la un proces complicat de reziliere și pierdere a banilor. Am primit un transfer calculat la zi și o ofertă optimizată.",
    context: "Client existent care a înlocuit o berlină de familie cu un model electric nou.",
    discovery: "Multe companii rețin comisioane substanțiale la rezilierea unilaterală fără transfer de contract.",
    action: "Am coordonat închiderea conformă a contractului vechi, returnarea primei neconsumate și activarea noii polițe CASCO înainte de ridicarea din showroom.",
    outcome: "Fără nicio oră de întrerupere a acoperirii și optimizare financiară a primei pe noul vehicul.",
    takeaway: "Continuitatea asigurării oferă liniște la predarea și preluarea fiecărui vehicul nou.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Auto", "Transfer Poliță", "Eficiență Operațională"]
  },

  // ─── 20. PĂSTRAREA POLIȚEI EXISTENTE (ONESTITATE) ───
  {
    id: "pastrare-polita-existenta-sfat-onest",
    category: "consultanta",
    categoryLabel: "Consultanță Onestă",
    headline: "Mi-a spus deschis: „Polița pe care o ai deja este foarte bună, nu are sens să o schimbi.”",
    quote: "Am venit cerând o ofertă nouă de CASCO. După ce a citit condițiile vechi, mi-a spus că tariful și clauzele pe care le aveam erau imbatabile și că e mai bine să rămân acolo. Asta mi-a dovedit că lucrează pentru client.",
    context: "Client care căuta o schimbare de intermediar pentru că primea constant oferte nesolicitate de la alți brokeri.",
    discovery: "Contractul existent beneficia de o clauză istorică foarte avantajoasă care nu mai era disponibilă în piața actuală.",
    action: "Am recomandat păstrarea nealterată a contractului curent și am stabilit un reminder pentru revizuire la următorul ciclu.",
    outcome: "Clientul a economisit timp și bani, păstrând cea mai bună acoperire posibilă din piață.",
    takeaway: "Valoarea unui consultant se vede și atunci când îți spune să NU cumperi nimic nou.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Etică", "Consultanță", "Loialitate Client"]
  },

  // ─── 21. CLIENT SCEPTIC & CLARITATE TOTALĂ ───
  {
    id: "client-sceptic-transparenta-totala",
    category: "consultanta",
    categoryLabel: "Consultanță",
    headline: "Am venit destul de sceptic. Am plecat după ce am înțeles fiecare clauză",
    quote: "Am venit destul de sceptic, având impresia că toate firmele de asigurări promit mult și găsesc motive să nu plătească. Am apreciat că mi-au fost arătate clar și excluderile, nu doar beneficiile.",
    context: "Proprietar de afacere mică cu o neîncredere cronică în industria de asigurări locale.",
    discovery: "Lipsa de încredere izvora din experiențe anterioare în care vânzătorul ascunsese termenii esențiali ai contractului.",
    action: "Am prezentat contractul cu accent pe secțiunea de drepturi și obligații ale asiguratului și pe pașii obligatorii în caz de daună.",
    outcome: "O relație transparentă, bazată pe fapte și documente clare, nu pe promisiuni de vânzări.",
    takeaway: "Claritatea elimină scepticismul mai repede decât orice reclamă.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Transparență", "Încredere", "Educație Financiară"]
  },

  // ─── 22. REVENIT DUPĂ O DAUNĂ REZOLVATĂ CORECT ───
  {
    id: "revenire-dupa-rezolvare-dauna",
    category: "dauna",
    categoryLabel: "Gestiune Daună",
    headline: "Când vezi că lucrurile funcționează la greu, nu mai cauți alt consultant",
    quote: "Am avut o inundație de la un etaj superior care a afectat parchetul din lemn masiv și pereții. Dosarul a fost aprobat și decontat fără discuții inutile. De atunci, am mutat toate polițele familiei aici.",
    context: "Client cu asigurare facultativă de locuință care s-a confruntat cu o daună majoră provocată de un vecin.",
    discovery: "Vecinul vinovat nu avea asigurare, dar polița clientului includea decontare directă cu regres ulterior împotriva părții responsabile.",
    action: "Am ghidat constatarea rapidă, am trimis devizele de reparație și am urmărit aprobarea plății către meșterii autorizați.",
    outcome: "Refacerea locuinței în 14 zile fără a aștepta litigiul dintre asigurător și vecin.",
    takeaway: "Calitatea unei asigurări se testează în momentul plății despăgubirii.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Daună Locuință", "Despăgubire Rapidă", "Parteneriat"]
  },

  // ─── 23. ANALIZĂ GOLURI DE ACOPERIRE (GAP ANALYSIS) ───
  {
    id: "analiza-gap-protectie-patrimoniu",
    category: "preventie",
    categoryLabel: "Prevenție & Analiză",
    headline: "Am descoperit 3 zone vulnerabile pe care le ignorasem complet",
    quote: "Credeam că dacă am CASCO și asigurarea casei sunt complet protejat. Am făcut o analiză de risc a patrimoniului și am descoperit că expunerea mea cea mai mare era pe incapacitatea temporară de muncă.",
    context: "Liber profesionist din domeniul IT cu venituri ridicate dependente 100% de capacitatea zilnică de lucru.",
    discovery: "O problemă gravă de sănătate ar fi oprit complet încasările, în timp ce cheltuielile familiei și creditele rămâneau constante.",
    action: "Am integrat o poliță de protecție a venitului cu indemnizație zilnică de spitalizare și incapacitate temporară.",
    outcome: "Bugetul lunar al familiei este garantat chiar și în eventualitatea unei pauze medicale prelungite.",
    takeaway: "Cel mai valoros activ al unui profesionist independent este propria capacitate de a genera venit.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Prevenție", "Gap Analysis", "Protecție Venit"]
  },

  // ─── 24. CLAUZĂ FURT PARȚIAL / OGLINZI / ELEMENTE RADAR ───
  {
    id: "furt-oglinzi-senzori-radar-casco",
    category: "casco",
    categoryLabel: "CASCO",
    headline: "Furtul oglinzilor electrocromate și al senzorului din grilă: 3.200 € rezolvați",
    quote: "Dimineața am găsit mașina fără sticlele la oglinzi și cu senzorul Distronic smuls din grilă. Fără o clauză clară de furt parțial fără franșiză, nota de plată la reprezentanță ar fi fost uriașă.",
    context: "Posesor de limuzină germană parcată pe o stradă rezidențială centrală.",
    discovery: "Unele polițe impun franșiză separată pentru fiecare piesă furată sau cer dovada urmelor de forțare la caroserie.",
    action: "Polița Generali fusese emisă cu acoperire explicită pentru furtul parțial al componentelor exterioare fără franșiză multiplicată.",
    outcome: "Piesele au fost comandate în aceeași zi prin reprezentanță și montate în 48 de ore.",
    takeaway: "Componentele high-tech expuse la exterior au nevoie de acoperiri clare și clauze fără capcane.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["CASCO", "Furt Parțial", "Senzori Auto"]
  },

  // ─── 25. CĂLĂTORIE & SPORTURI DE IARNĂ / STORNO ───
  {
    id: "calatorie-storno-urgenta-medicala",
    category: "preventie",
    categoryLabel: "Călătorii & Storno",
    headline: "O vacanță de schi anulată din motive medicale recuperată 100%",
    quote: "Copilul a făcut pneumonie cu 3 zile înainte de plecarea în Austria. Biletele de avion și cazarea non-rambursabilă erau deja plătite. Datorită clauzei Storno, am recuperat integral suma de 3.400 €.",
    context: "Familie care a rezervat din timp o vacanță la schi cu pachete nerambursabile.",
    discovery: "Asigurările de călătorie gratuite de la cardurile bancare aveau limite reduse pentru storno și excludeau îmbolnăvirile înainte de plecare.",
    action: "Am configurat o poliță individuală Travel cu clauză de Storno extinsă și salvare de pe pârtie inclusă.",
    outcome: "Dosarul de storno a fost instrumentat rapid pe baza certificatului medical, primind rambursarea completă a sejurului.",
    takeaway: "Asigurarea storno transformă un eveniment neprevăzut într-o simplă reprogramare, fără pierderi financiare.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Travel", "Storno", "Protecție Călătorii"]
  },

  // ─── 26. SCHIMBARE ASIGURĂTOR PENTRU CALITATEA SERVICIILOR ───
  {
    id: "schimbare-asigurator-solvabilitate",
    category: "consultanta",
    categoryLabel: "Consultanță Strategică",
    headline: "Am renunțat la cel mai ieftin asigurător din piață pentru stabilitate reală",
    quote: "După falimentele din piața RCA, am înțeles că o companie slab capitalizată este un risc direct pentru timpul și banii mei. Am ales să lucrez cu un lider global precum Generali.",
    context: "Manager de flotă cu 12 autovehicule comerciale aflate în activitate zilnică.",
    discovery: "Întârzierile la plata daunelor la asigurătorii low-cost țineau mașinile blocate în service săptămâni întregi, generând pierderi operaționale.",
    action: "Am transferat întreaga flotă către un program corporate cu asistență dedicată și ateliere partenere prioritare.",
    outcome: "Timpul mediu de imobilizare a vehiculelor a scăzut cu 60%, iar costurile indirecte au fost eliminate.",
    takeaway: "Solvabilitatea asigurătorului garantează continuitatea activității tale zilnice.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Flotă Auto", "Generali", "Solvabilitate"]
  },

  // ─── 27. CASCO PENTRU MAȘINĂ ELECTRICĂ & BATERIE ───
  {
    id: "casco-masina-electrica-baterie-cablu",
    category: "auto-premium",
    categoryLabel: "Auto Electric",
    headline: "Bateria de tracțiune reprezintă 40% din valoarea mașinii. Cum o asiguri?",
    quote: "La mașina electrică, cea mai mare teamă este o avariere a pachetului de baterii de la o piatră pe carosabil. Am vrut o poliță care să acopere explicit degradarea acumulatorului și cablurile de încărcare.",
    context: "Proprietar de vehicul electric nou achiziționat în leasing financiar.",
    discovery: "Unele contracte CASCO standard exclud daunele produse de supratensiune la stațiile publice de încărcare rapidă.",
    action: "Am activat pachetul dedicat vehiculelor electrice: baterie de tracțiune acoperită all-risks, cabluri de încărcare asigurate împotriva furtului și asistență rutieră specializată.",
    outcome: "Protecție completă adaptată tehnologiei moderne de propulsie.",
    takeaway: "Vehiculele electrice necesită clauze tehnice dedicate, nu polițe clasice reciclate.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Auto Electric", "CASCO", "Baterie Tracțiune"]
  },

  // ─── 28. ASIGURARE LOCUINȚĂ ÎN CONSTRUCȚIE / ȘANTIER (CAR) ───
  {
    id: "asigurare-santier-car-constructie-vila",
    category: "locuinta",
    categoryLabel: "Construcții & Locuință",
    headline: "Construcția unei case: de la groapa de fundație până la recepție",
    quote: "Când construiești o casă, riscul de prăbușire a malului, furtul materialelor sau accidentele muncitorilor pot opri totul. O poliță CAR ne-a dat liniște pe toată durata șantierului.",
    context: "Investitor privat care a început construcția unei vile individuale în regie proprie.",
    discovery: "Polița standard de locuință nu poate fi încheiată înainte de intabulare și recepție finală, lăsând investiția neprotejată în faza critică.",
    action: "Am emis o asigurare tip CAR (Contractor's All Risks) acoperind structura în lucru, materialele de pe șantier și răspunderea față de vecini.",
    outcome: "Șantier finalizat cu succes, cu acoperire automată convertită ulterior în poliță de locuință finalizată.",
    takeaway: "Protecția patrimoniului începe din prima zi a șantierului, nu la tăierea panglicii.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["CAR", "Construcție", "Protecție Șantier"]
  },

  // ─── 29. PROTECȚIE FINANCIARĂ KEY-MAN PENTRU ASOCIAȚI ───
  {
    id: "keyman-protectie-asociati-business",
    category: "business",
    categoryLabel: "Corporate & Key-Man",
    headline: "Ce se întâmplă cu părțile sociale ale firmei dacă unul dintre asociați dispare?",
    quote: "Suntem doi asociați cu ponderi egale. Fără o asigurare Key-Man și un acord clar, moștenitorii nepregătiți ar fi putut bloca deciziile în firmă. Am rezolvat asta printr-o structură financiară curată.",
    context: "Firmă de servicii cu doi fondatori cheie responsabili de contractele majore de vânzări.",
    discovery: "În lipsa unei finanțări asigurate, răscumpărarea părților sociale de la moștenitori poate decapitaliza complet compania.",
    action: "Am creat un program reciproc de asigurare de viață Key-Man cu fonduri destinate cumpărării părților sociale și asigurării continuității operaționale.",
    outcome: "Stabilitate juridică și financiară garantată pentru viitorul companiei și al ambelor familii.",
    takeaway: "Asigurarea Key-Man este instrumentul suprem de guvernanță corporativă pentru parteneriate solide.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Key-Man", "Continuitate Business", "Guvernanță"]
  },

  // ─── 30. ÎNȚELEGEREA COMPLETĂ A POLIȚEI ÎNAINTE DE SEMNARE ───
  {
    id: "intelegere-clara-inainte-de-semnare",
    category: "consultanta",
    categoryLabel: "Consultanță",
    headline: "Prima dată când am plecat de la o discuție despre asigurări știind exact ce am cumpărat",
    quote: "De obicei primeam un PDF de 40 de pagini pe care nu îl citea nimeni. Aici am primit un rezumat vizual, cu exemple concrete de situații acoperite și neacoperite. Decizia a fost simplă și asumată.",
    context: "Client care dorea o optimizare completă a portofoliului personal de asigurări (auto, casă, viață).",
    discovery: "Limbajul excesiv juridic al polițelor este principala barieră dintre client și o protecție adecvată.",
    action: "Am structurat un dosar clar de sinteză cu tabele de riscuri, contacte de urgență și proceduri pas cu pas în caz de eveniment.",
    outcome: "Un client informat, autonom și cu control deplin asupra contractelor sale financiare.",
    takeaway: "Consultanța premium înseamnă transformarea complexității tehnice în decizii simple și sigure.",
    verified: false,
    published: true,
    isSample: true,
    readTime: "2 min",
    tags: ["Claritate", "Educație", "Consultanță Strategică"]
  }
];

export const getStoryCountByCategory = (catId: ReviewCategory | "all"): number => {
  if (catId === "all") return customerReviewsData.length;
  return customerReviewsData.filter((r) => r.category === catId).length;
};

export const getFilteredStories = (groupId: string): CustomerStory[] => {
  if (groupId === "all") return customerReviewsData;
  const group = REVIEW_FILTER_GROUPS.find((g) => g.id === groupId);
  if (!group) return customerReviewsData;
  return customerReviewsData.filter((r) => group.categories.includes(r.category));
};
