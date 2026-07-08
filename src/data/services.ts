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
  // ===================== PERSONAL =====================
  "life-insurance": {
    id: "life-insurance",
    slug: "life-insurance",
    title: "Asigurări de Viață",
    shortDescription: "Protecție financiară completă pentru tine și cei dragi, oriunde v-ați afla.",
    longDescription: "Un plan solid de asigurare de viață reprezintă pilonul de bază al protecției tale financiare și al administrării patrimoniului. În parteneriat cu Generali, oferim acoperiri ample care mențin standardul de viață al familiei tale în caz de neprevăzut.",
    whatIsIt: "Asigurarea de viață tradițională este un contract prin care se transferă riscul unui deces prematur, al invalidității sau al unor afecțiuni medicale grave către compania de asigurări, în schimbul unei prime plătite regulat.",
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
      { q: "Banii se întorc dacă nu pățesc nimic?", a: "Aceasta este o asigurare pură de risc. Pentru componenta de economisire recomandăm varianta cu capitalizare." }
    ],
    iconName: "Heart"
  },
  "life-capitalization": {
    id: "life-capitalization",
    slug: "life-capitalization",
    title: "Asigurări de Viață cu Capitalizare",
    shortDescription: "Protecție și investiție simultană pentru planificarea viitorului financiar.",
    longDescription: "Un produs premium 2-în-1. Pe lângă protecția masivă a vieții asiguratului, o parte din primă este investită inteligent pentru a constitui un fond de economii sau de investiții ce poate fi retras la maturitate.",
    whatIsIt: "Este o asigurare de viață care combină protecția împotriva riscului cu acumularea de capital. La finalul contractului (ex: 15-20 de ani), chiar dacă riscul asigurat nu s-a produs, primești înapoi capitalul acumulat plus eventualul randament investițional.",
    whyIsItImportant: "Oferă disciplină financiară. Economisești regulat pentru viitor (pensie, educația copiilor), având certitudinea că, dacă se întâmplă o tragedie, scopul financiar este atins instantaneu de către compania de asigurări.",
    targetAudience: [
      "Persoane care doresc să economisească pentru studenția copiilor.",
      "Cei ce își doresc un supliment financiar major la vârsta pensionării.",
      "Investitori prudenți ce vor o garanție atașată capitalului lor."
    ],
    benefits: [
      { title: "Garanția la maturitate", description: "Capital garantat la finalul perioadei contractuale." },
      { title: "Dublă protecție", description: "Acoperi un risc sever și strângi bani simultan." },
      { title: "Indexare la inflație", description: "Posibilitatea protejării banilor împotriva inflației." }
    ],
    risksCovered: [
      "Deces prematur (caz în care se plătește capitalul țintă).",
      "Supraviețuire la maturitate (plata capitalului acumulat).",
      "Boli grave sau invaliditate (clauze opționale)."
    ],
    practicalExamples: [
      { title: "Educația copilului", description: "Părintele încheie polița când copilul se naște. După 18 ani, la maturitate, fondul de 40.000 EUR îi susține facultatea în străinătate. Dacă părintele ar fi decedat în anul 5, copilul primea oricum cei 40.000 EUR garantat." }
    ],
    whyGenerali: [
      "Experiență investițională prin Generali Investments.",
      "Garantarea fondurilor conform celor mai stricte norme europene.",
      "Transparență și rapoarte anuale ale contului."
    ],
    faqs: [
      { q: "Pot retrage bani înainte de termen?", a: "Da, există valoare de răscumpărare după primii 2-3 ani, însă retragerea anticipată vine cu penalități contractuale." },
      { q: "Ce se întâmplă dacă opresc plățile?", a: "Polița poate fi redusă, iar suma acumulată rămâne în cont producând randament până la maturitate, cu o sumă asigurată recalculată." }
    ],
    iconName: "TrendingUp"
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
      { q: "Sunt acoperite afecțiunile preexistente?", a: "De regulă nu, sau sunt acoperite doar după o perioadă de așteptare." }
    ],
    iconName: "Activity"
  },
  "home-insurance": {
    id: "home-insurance",
    slug: "home-insurance",
    title: "Asigurări de Locuință (Facultative)",
    shortDescription: "Protejează-ți investiția imobiliară la valoarea ei reală.",
    longDescription: "Un imobil premium merită o acoperire pe măsură. Oferim asigurări de locuință care nu protejează doar pereții, ci finisajele de lux, bunurile de valoare și chiar și responsabilitatea ta față de terți.",
    whatIsIt: "Asigurarea facultativă de locuință compensează financiar proprietarul în cazul în care imobilul sau bunurile sunt distruse parțial sau total. Protejează valoarea reală de piață/înlocuire a casei.",
    whyIsItImportant: "Majoritatea averii unui individ se află imobilizată în reședința sa. Pierderea ei în urma unui incendiu ar echivala cu un dezastru financiar iremediabil în lipsa unei polițe All-Risk.",
    targetAudience: [
      "Proprietari de vile, case și apartamente.",
      "Investitori care închiriază proprietăți (protecție pentru distrugeri).",
      "Persoane care locuiesc cu chirie (își pot asigura bunurile lor din locuința altcuiva)."
    ],
    benefits: [
      { title: "Toate Riscurile", description: "Standardul suprem în asigurări: orice nu este clar exclus, este acoperit." },
      { title: "Răspundere față de terți", description: "Dacă vecinii sunt afectați de inundația ta, plătim noi reparațiile." },
      { title: "Asistență la domiciliu", description: "Intervenția unui instalator sau lăcătuș plătit de noi la o simplă chemare." }
    ],
    risksCovered: [
      "Incendiu, trăsnet, explozie.",
      "Furt prin efracție și tâlhărie.",
      "Apă de conductă și refulări.",
      "Fenomene meteo (furtună, grindină, greutatea zăpezii).",
      "Vandalism și spargerea geamurilor."
    ],
    practicalExamples: [
      { title: "Inundație catastrofală la bloc", description: "O țeavă cedează cât ești în vacanță. Sunt inundați toți vecinii pe 4 etaje. Polița ta facultativă plătește reparația parchetului tău și zugrăvelile/reparațiile celor 4 vecini afectați." }
    ],
    whyGenerali: [
      "Despăgubiri rapide, de multe ori cu constatare digitală sau video.",
      "Pachete flexibile, de la apartamente de 50k la vile de 2 Milioane EUR.",
      "Istoric impecabil în plata daunelor catastrofice."
    ],
    faqs: [
      { q: "Ce diferență este între aceasta și PAD?", a: "PAD acoperă strict 3 dezastre naturale în limita a 20.000 EUR. Polița facultativă acoperă TOT restul la valoarea reală." },
      { q: "Pot asigura și o casă din lemn?", a: "Da, însă primele vor diferi datorită gradului diferit de combustibilitate." }
    ],
    iconName: "Home"
  },
  "pad-insurance": {
    id: "pad-insurance",
    slug: "pad-insurance",
    title: "Asigurări PAD",
    shortDescription: "Asigurarea obligatorie împotriva dezastrelor naturale.",
    longDescription: "PAD (Polița de Asigurare Împotriva Dezastrelor Naturale) este prima treaptă de protecție obligatorie cerută de statul român. Este o poliță socială și standardizată pentru protecția de bază.",
    whatIsIt: "Este o poliță obligatorie prin lege care acoperă exclusiv daunele provocate de cutremur, inundații naturale și alunecări de teren.",
    whyIsItImportant: "Este o cerință legală. De asemenea, nu poți achiziționa o asigurare de locuință facultativă (care îți protejează cu adevărat investiția) fără a deține mai întâi o poliță PAD valabilă.",
    targetAudience: [
      "Orice persoană fizică sau juridică ce deține o locuință cu destinație de locuire pe teritoriul României."
    ],
    benefits: [
      { title: "Standardizată", description: "Costa exact 130 RON/an (Tip A) sau 50 RON/an (Tip B)." },
      { title: "Emisie rapidă", description: "Se emite în câteva minute și poate fi reînnoită automat." },
      { title: "Legal Compliance", description: "Eviți amenzile legale din partea autorităților." }
    ],
    risksCovered: [
      "Cutremur de pământ.",
      "Inundații naturale.",
      "Alunecări de teren."
    ],
    practicalExamples: [
      { title: "Daună la Cutremur", description: "După un seism major, casa tip A este grav afectată. PAD-ul despăgubește suma fixă legală de 100.000 RON (aprox 20.000 EUR), bani ce pot acoperi o fracțiune din reconstrucție. (Restul trebuie acoperit de o poliță facultativă)." }
    ],
    whyGenerali: [
      "Generali emite PAD rapid și oferă integrare perfectă cu polița facultativă superioară, pentru un discount la pachet."
    ],
    faqs: [
      { q: "Primesc amendă dacă nu am PAD?", a: "Legea prevede amenzi între 100 și 500 RON, aplicabile de către primării." },
      { q: "PAD acoperă inundația de la țeava spartă a vecinului?", a: "Nu. PAD acoperă STRICT inundațiile din cauze naturale (revărsări de râuri). Daunele de la vecini se acoperă prin asigurare facultativă." }
    ],
    iconName: "Shield"
  },
  "travel-insurance": {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Asigurări Travel",
    shortDescription: "Liniște deplină oriunde călătorești, cu protecție medicală și storno premium.",
    longDescription: "Călătoriile internaționale trebuie să fie despre experiențe. Elimină riscul falimentului personal din cauza unei spitalizări de urgență în străinătate (ex. SUA/Elveția) prin polițele noastre de travel.",
    whatIsIt: "O asigurare temporară sau anuală care decontează costurile actului medical din străinătate și compensează pierderile logistice (zbor anulat, bagaj pierdut).",
    whyIsItImportant: "Tratamentele medicale în afara României sunt exorbitante. O operație de apendicită în SUA poate depăși 50.000 USD. Fără asigurare, pacienții suportă din bugetul propriu aceste facturi.",
    targetAudience: [
      "Orice persoană ce iese din țară (Business sau Leisure).",
      "Pasionați de sporturi de agreement (schi, scufundări)."
    ],
    benefits: [
      { title: "Call Center 24/7", description: "Asistență în limba ta la orice oră din zi." },
      { title: "Acoperire COVID", description: "Boli infecțioase incluse standard." },
      { title: "Multi-Trip Anual", description: "Opțiune pentru a plăti o singură dată și a fi acoperit la toate ieșirile din acel an." }
    ],
    risksCovered: [
      "Spitalizare și asistență medicală de urgență.",
      "Repatriere medicală sau în caz de deces.",
      "Anularea excursiei (clauza Storno) din motive obiective.",
      "Pierderea documentelor și a bagajelor de cală."
    ],
    practicalExamples: [
      { title: "Fractură pe pârtie", description: "Elicopterul de salvare din Alpi intervine. Cost 5.000 EUR + Spital 8.000 EUR. Totul e decontat direct prin centrala de asistență Generali, fără avansuri din partea clientului." }
    ],
    whyGenerali: [
      "Generali operează asistența prin rețeaua Europ Assistance, cel mai puternic grup de intervenție globală, aparținând tot grupului Generali."
    ],
    faqs: [
      { q: "Ce se întâmplă dacă pierd avionul din vina mea?", a: "Greșelile proprii nu sunt acoperite (ex: am adormit). Se acoperă anulările din cauze obiective, cum ar fi o spitalizare bruscă înainte de zbor." }
    ],
    iconName: "Plane"
  },
  "accident-insurance": {
    id: "accident-insurance",
    slug: "accident-insurance",
    title: "Asigurări de Accidente",
    shortDescription: "Indemnizație directă în bani cash în caz de accident, spitalizare sau fracturi.",
    longDescription: "Un accident îți oprește capacitatea de a munci și generează costuri extra. Asigurarea de accidente îți livrează rapid o sumă de bani (cash) pentru a-ți asigura confortul în perioada de recuperare.",
    whatIsIt: "Spre deosebire de asigurarea de sănătate (care plătește spitalul), asigurarea de accident plătește direct ASIGURATUL. O sumă fixă prestabilită este virată în cont pentru diagnosticarea cu fracturi, arsuri sau zile de spitalizare.",
    whyIsItImportant: "Oferă lichiditate imediată. Banii obținuți pot fi folosiți pentru plata chiriei, cumpărarea unor orteze scumpe sau ședințe de kinetoterapie care altfel nu ar fi decontate.",
    targetAudience: [
      "Persoane foarte active, cu viață dinamică.",
      "Părinți care doresc o protecție foarte accesibilă pentru neastâmpărul copiilor lor la școală sau la sport.",
      "Freelanceri (orice zi de stat acasă înseamnă venit 0)."
    ],
    benefits: [
      { title: "Plata directă", description: "Banii intră pe cardul tău bancar. Tu decizi ce faci cu ei." },
      { title: "Cost extrem de mic", description: "O poliță ce costă câțiva zeci de euro pe an poate aduce mii de euro la daună." },
      { title: "Fără limitări medicale", description: "Nu ai nevoie de analize la intrarea în asigurare." }
    ],
    risksCovered: [
      "Fracturi, entorse severe, arsuri din accidente casnice, auto sau rutiere.",
      "Indemnizație zilnică de spitalizare (ex: primești 100 EUR pentru fiecare zi de internare).",
      "Invaliditate permanentă din accident."
    ],
    practicalExamples: [
      { title: "Căzătură de pe bicicletă", description: "Îți fracturezi clavicula. Trimiți poza cu radiografia și biletul de ieșire și primești o indemnizație de 1.500 EUR." }
    ],
    whyGenerali: [
      "Procesare digitală a daunelor și timp record de plată a sumelor în contul clientului."
    ],
    faqs: [
      { q: "Pot avea și asigurare de sănătate și de accident?", a: "Da, sunt complementare. Sănătatea plătește spitalizarea la clinica privată, iar asigurarea de Accident îți dă și ție cash." }
    ],
    iconName: "Stethoscope"
  },

  // ===================== AUTO =====================
  "rca": {
    id: "rca",
    slug: "rca",
    title: "Asigurări RCA",
    shortDescription: "Protecția ta legală extinsă pe șosele, inclusiv opțiuni de Decontare Directă.",
    longDescription: "Asigurarea de Răspundere Civilă Auto nu trebuie privită ca o simplă taxă de drum. RCA-ul tău poate deveni instrumentul tău de reparație rapidă dacă alegi inteligent acoperirile suplimentare.",
    whatIsIt: "Asigurarea obligatorie prin care compania ta de asigurări despăgubește persoana (terțul) pe care tu ai lovit-o cu mașina, protejându-te astfel pe tine de popriri pe conturi pentru plata daunelor.",
    whyIsItImportant: "Pe lângă faptul că este impusă de Codul Rutier, o daună majoră în care mașina terțului este făcută daună totală, sau în care există victime umane, te-ar putea ruina pe viață financiar fără sprijinul unui RCA care are limite de milioane de euro.",
    targetAudience: [
      "Orice proprietar de vehicul înmatriculat."
    ],
    benefits: [
      { title: "Decontare Directă", description: "Cea mai importantă clauză. Dacă ești lovit, îți repari mașina pe propriul tău RCA, rapid, fără să aștepți după vinovat." },
      { title: "Cotații instantanee", description: "Comparăm instant tarifele și reducerile de Bonus/Malus." },
      { title: "Validitate digitală", description: "Polița este valabilă direct de pe ecranul telefonului." }
    ],
    risksCovered: [
      "Avarii materiale provocate terților.",
      "Vătămări corporale sau decesul terților (inclusiv a pasagerilor tăi, cu excepția șoferului vinovat).",
      "Avarii provocate domeniului public (stâlpi, garduri)."
    ],
    practicalExamples: [
      { title: "Impact în trafic cu Decontare Directă", description: "Un șofer fără RCA valabil sau asigurat la o firmă cu probleme te lovește. Clauza de decontare directă a poliței tale îți despăgubește imediat reparația." }
    ],
    whyGenerali: [
      "Servicii rapide de decontare directă, garantând că nu ești plimbat prin birocrație inutilă când ai cu adevărat nevoie de mașină."
    ],
    faqs: [
      { q: "Ce este sistemul Bonus-Malus?", a: "Sistem care recompensează (Bonus) prin scăderea tarifului pe șoferii fără daune și sancționează (Malus) pe cei cu accidente în istoric." }
    ],
    iconName: "Shield"
  },
  "casco": {
    id: "casco",
    slug: "casco",
    title: "Asigurări CASCO",
    shortDescription: "Garanția All-Risk pentru autoturismul tău premium.",
    longDescription: "Un autoturism de lux necesită siguranță la nivel de reprezentanță. CASCO protejează mașina indiferent de natura incidentului rutier, oferind siguranța păstrării investiției auto intacte.",
    whatIsIt: "Asigurarea auto facultativă care acoperă daunele mașinii TALE, chiar dacă accidentul a fost produs din vina ta, chiar dacă l-ai găsit lovit în parcare, sau a fost vandalizat/furat.",
    whyIsItImportant: "RCA-ul nu îți protejează mașina proprie. Un autoturism modern are reparații extrem de scumpe (senzori radar, faruri LED/Laser de mii de euro). O daună minoră poate destabiliza bugetul.",
    targetAudience: [
      "Posesori de vehicule premium sau relativ noi (sub 10 ani vechime).",
      "Persoane cu vehicule în regim de Leasing (este obligatorie).",
      "Cei care doresc să beneficieze mereu de un vehicul la schimb în caz de daună."
    ],
    benefits: [
      { title: "All-Risk", description: "Acoperă inclusiv greșelile proprii de șofat." },
      { title: "Valoare menținută", description: "Vehiculul își păstrează garanția fiind reparat exclusiv în reprezentanțe autorizate." },
      { title: "Mașină la schimb", description: "Nu rămâi niciodată pieton. Asigurătorul acoperă costul unei mașini închiriate." }
    ],
    risksCovered: [
      "Coliziuni (din vina proprie sau autor necunoscut).",
      "Furt total sau parțial și tentative de furt.",
      "Fenomene naturale (grindină, căderi de copaci, inundație).",
      "Vandalism."
    ],
    practicalExamples: [
      { title: "Grindină", description: "O furtună violentă de vară cu grindină distruge plafonul mașinii. CASCO acoperă reparația la tehnologie PDR fără costuri din partea ta." }
    ],
    whyGenerali: [
      "Evaluări foto de la distanță pentru despăgubiri rapide.",
      "Nu folosim piese after-market ieftine, doar piese originale pentru mașinile asigurate corect."
    ],
    faqs: [
      { q: "Ce este Franșiza?", a: "Este partea din daună pe care o suporți tu (ex: 100 EUR pe eveniment). Optând pentru o franșiză, costul anual al asigurării CASCO scade considerabil." }
    ],
    iconName: "Shield"
  },
  "auto-insurance": {
    id: "auto-insurance",
    slug: "auto-insurance",
    title: "Asigurări Auto Complexe",
    shortDescription: "Pachete integrate (RCA + CASCO + Asistență) pentru un management auto perfect.",
    longDescription: "Gestionăm întregul tău portofoliu auto printr-o abordare de tip 'one-stop-shop'. Asigurăm asistență rutieră VIP, servicii de anvelope, și o aliniere a tuturor polițelor.",
    whatIsIt: "Un program dedicat clienților de retail premium care doresc ca un singur consultant să aibă grijă de reînnoiri, daune și pachete RCA+CASCO pe același vehicul, fără stres administrativ.",
    whyIsItImportant: "Centralizarea elimină riscul de a rula cu polițe expirate și garantează că nu există suprapuneri (sau lipsuri) în acoperirea pe care o cumperi.",
    targetAudience: [
      "Familii cu 2-3 autoturisme.",
      "Posesori de autoturisme de lux care necesită atenție personalizată."
    ],
    benefits: [
      { title: "One-Stop-Shop", description: "Același consultant pentru emitere, consultanță și daune." },
      { title: "Sinergie", description: "Costuri optimizate prin combinarea RCA-ului cu CASCO la același asigurător." },
      { title: "Notificări VIP", description: "Serviciu activ de prevenție a expirării." }
    ],
    risksCovered: [
      "Toate riscurile RCA și CASCO integrate într-un singur portofoliu."
    ],
    practicalExamples: [
      { title: "Gestiune impecabilă", description: "Nu îți bați capul cu amintirea scadențelor. Consultantul rezolvă totul, iar tu doar aprobi oferta digitală din aplicație." }
    ],
    whyGenerali: [
      "Partenerul principal pentru brandurile auto de prestigiu din România."
    ],
    faqs: [
      { q: "Beneficiez de reduceri dacă iau RCA și CASCO la Generali?", a: "Da, pachetele combinate generează bonificații pe componenta de CASCO." }
    ],
    iconName: "Car"
  },
  "fleet-insurance": {
    id: "fleet-insurance",
    slug: "fleet-insurance",
    title: "Asigurări Flote Auto",
    shortDescription: "Soluții B2B de optimizare a costurilor și gestiune integrată a parcurilor auto.",
    longDescription: "Gestiunea a zeci sau sute de autovehicule este critică pentru cash-flow-ul unei companii. Transformăm o cheltuială dispersată într-un program negociat unitar, transparent, care protejează operațiunile businessului tău.",
    whatIsIt: "Asigurarea unificată a unui portofoliu de mașini aparținând aceleiași companii juridice, beneficiind de tarife comerciale negociate pe volum, independent de istoricul de Bonus-Malus per mașină.",
    whyIsItImportant: "Reduce semnificativ prețul unitar pe mașină. În plus, centralizarea tuturor datelor de expirare pe o singură dată din an eliberează departamentul administrativ de zeci de ore de muncă birocratică.",
    targetAudience: [
      "Firme de transport și curierat.",
      "Companii de distribuție sau FMCG.",
      "Flote de mașini ale departamentelor de vânzări."
    ],
    benefits: [
      { title: "Preț FIX per categorie", description: "Orice mașină nouă introdusă în flotă primește automat prețul preferențial agreat, fără surprize." },
      { title: "Alinierea scadențelor", description: "Toate vehiculele expiră și se reînnoiesc în aceeași zi a anului." },
      { title: "Gestiune centralizată a daunelor", description: "Un sistem clar de raportare a daunalității pentru management." }
    ],
    risksCovered: [
      "Riscurile RCA de flotă și CASCO de flotă (opțional).",
      "Asistența rutieră a vehiculelor utilitare."
    ],
    practicalExamples: [
      { title: "Simplificare administrativă", description: "O companie cu 50 de mașini avea 50 de scadențe. Le-am grupat pe 1 Iulie, emițând o factură unică cu reducere de 30% față de polițele individuale." }
    ],
    whyGenerali: [
      "Flexibilitate supremă la adăugarea / ștergerea vehiculelor din parcul auto asigurat și returnarea precisă a primelor neconsumate."
    ],
    faqs: [
      { q: "De la câte vehicule se consideră flotă?", a: "La Generali, politica comercială permite oferte speciale pentru clienții B2B începând de regulă cu 10 autovehicule." }
    ],
    iconName: "Truck"
  },

  // ===================== BUSINESS =====================
  "imm-insurance": {
    id: "imm-insurance",
    slug: "imm-insurance",
    title: "Asigurări IMM",
    shortDescription: "Pachetul All-in-One ideal pentru întreprinderi mici și mijlocii.",
    longDescription: "Un business IMM se bazează pe flux de numerar constant și pe o echipă mică dar critică. Un incendiu sau un furt nu reprezintă doar pagube materiale, ci un colaps operațional pe care asigurarea noastră îl previne.",
    whatIsIt: "Un pachet modular de asigurări care grupează în aceeași poliță protecția imobilelor, a echipamentelor, mărfurilor, a răspunderii față de terți și a angajaților, special conceput pentru bugetul unui IMM.",
    whyIsItImportant: "Majoritatea IMM-urilor care suferă o daună catastrofică și nu sunt asigurate intră în faliment în mai puțin de 6 luni. Polița oferă fondurile de urgență pentru reconstrucție și salarii pe perioada nefuncționării.",
    targetAudience: [
      "Magazine de retail, HoReCa, service-uri auto.",
      "Clinici stomatologice, saloane de înfrumusețare.",
      "Ateliere de producție mici și depozite."
    ],
    benefits: [
      { title: "Modularitate", description: "Cumperi doar acoperirile pe care businessul tău le folosește." },
      { title: "Răspundere inclusă", description: "Protecție dacă produsele tale sau activitatea ta rănesc un client." },
      { title: "Cost optimizat", description: "Pachetul cumulat este mult mai ieftin decât polițele cumpărate separat." }
    ],
    risksCovered: [
      "Distrugerea activelor fizice și stocurilor de marfă.",
      "Întreruperea activității (Business Interruption).",
      "Avarii accidentale la utilaje vitale.",
      "Furt din casierie."
    ],
    practicalExamples: [
      { title: "Inundație la un centru medical", description: "Apa distruge aparatura și cabinetul este închis 2 luni. Asigurarea despăgubește ecograful, mobilierul și acoperă veniturile/salariile ratate în cele 2 luni." }
    ],
    whyGenerali: [
      "Servicii croite special pentru antreprenorii români și plata în rate flexibile pentru a proteja cash-flow-ul."
    ],
    faqs: [
      { q: "Mă costă mult?", a: "Nu, pentru un IMM tipic o poliță cuprinzătoare reprezintă o fracțiune minimală din costurile lunare operaționale, de obicei sub costul abonamentului la internet." }
    ],
    iconName: "Briefcase"
  },
  "business-insurance": {
    id: "business-insurance",
    slug: "business-insurance",
    title: "Asigurări Corporate (Corporate & Cyber)",
    shortDescription: "Programe complexe de reasigurare și cyber security pentru mari corporații.",
    longDescription: "Corporațiile se confruntă cu expuneri globale, atacuri informatice și contracte de răspundere gigantice. Arhitectăm programe de 'Risk Management' și master-polițe internaționale care garantează solvabilitatea la nivel înalt.",
    whatIsIt: "Pachete avansate de asigurare (incluzând protecție Cibernetică/Cyber Risk, Terorism, Business Interruption complex) subscrise prin piețele de reasigurare europene.",
    whyIsItImportant: "Un atac informatic poate opri linii de asamblare și genera pierderi de zeci de milioane de euro. Asigurările Corporate sunt instrumente financiare vitale pentru liniștea boardului și acționarilor.",
    targetAudience: [
      "Corporații Multinaționale.",
      "Fabrici cu exporturi globale.",
      "Firme de tehnologie și Fin-Tech."
    ],
    benefits: [
      { title: "Protecție Cyber", description: "Acoperă costurile investigației ransomware, notificarea clienților și amenzile GDPR aferente." },
      { title: "Răspundere Produs", description: "Apară producătorul de daunele cauzate de produsele sale vândute internațional." },
      { title: "Asistență de criză", description: "Experți PR plătiți de poliță pentru a gestiona daunele de imagine." }
    ],
    risksCovered: [
      "Cyber Attacks, Ransomware, Data Breach.",
      "Daune materiale la nivel de capacități industriale majore.",
      "Întreruperi lungi pe lanțul de furnizare (Supply Chain Interruption)."
    ],
    practicalExamples: [
      { title: "Ransomware Attack", description: "O fabrică este oprită de hackeri. Polița Cyber asigură experții IT de top pentru decriptare, acoperă pierderea financiară pe zilele oprite și eventual, legal, chiar și răscumpărarea dacă este aprobată jurisdicțional." }
    ],
    whyGenerali: [
      "Generali Global Corporate & Commercial este printre puținii jucători globali capabili să susțină daune industriale de sute de milioane de euro."
    ],
    faqs: [
      { q: "Este necesar un audit IT pentru polița Cyber?", a: "Da, asigurătorul cere verificarea standardelor minime de securitate (firewalls, backups) înainte de preluarea riscului." }
    ],
    iconName: "Building"
  },
  "commercial-property": {
    id: "commercial-property",
    slug: "commercial-property",
    title: "Asigurări Clădiri Comerciale",
    shortDescription: "Protecția portofoliilor de Real Estate: birouri, mall-uri, parcuri logistice.",
    longDescription: "Activele tale imobiliare comerciale sunt inima businessului tău. O clădire de birouri sau o hală logistică necesită o protecție All-Risk capabilă să refacă structura din temelii și să despăgubească chiriașii.",
    whatIsIt: "Asigurarea specializată de Property destinate afacerilor. Acoperă clădirile comerciale la valoarea lor de reconstrucție 'la nou' și protejează veniturile dezvoltatorului (Loss of Rent).",
    whyIsItImportant: "Dacă un chiriaș provoacă un incendiu masiv într-un parc logistic, costul reconstrucției este enorm. Asigurarea elimină nevoia fondurilor proprii pentru refacere.",
    targetAudience: [
      "Fonduri de investiții Real Estate.",
      "Dezvoltatori imobiliari comerciali.",
      "Asociații de proprietari ale clădirilor de birouri (Owner Associations)."
    ],
    benefits: [
      { title: "Rent Loss Guarantee", description: "Cât timp clădirea se află în reconstrucție (ex: 12 luni), asigurătorul îți virează în cont valoarea chiriilor contractate de care ești privat." },
      { title: "Acoperire utilaje clădire", description: "Include chillere, lifturi de mare viteză, generatoare complexe." },
      { title: "Flexibilitate a chiriașului", description: "Clauze de renunțare la regres față de chiriași premium." }
    ],
    risksCovered: [
      "Foc, trăsnet, explozie, impact cu aeronave/vehicule.",
      "Fenomene naturale severe și cutremure majore.",
      "Riscuri tehnice și terorism."
    ],
    practicalExamples: [
      { title: "Incendiu Mall", description: "Un incendiu afectează food-court-ul unui mall. Generali finanțează reparația structurii afectate, izolarea fumului, înlocuirea finisajelor premium și compensează operatorul mall-ului pentru absența încasărilor." }
    ],
    whyGenerali: [
      "Rețea vastă de evaluatori industriali și capacitate de a emite scrisori de garanție bancară pentru împrumuturi imobiliare majore bazate pe aceste polițe."
    ],
    faqs: [
      { q: "Cine asigură fit-out-ul (amenajările) chiriașului?", a: "În mod normal, chiriașul își asigură propriile îmbunătățiri printr-o poliță separată. Noi asigurăm 'shell and core'-ul clădirii." }
    ],
    iconName: "Building2"
  },
  "goods-insurance": {
    id: "goods-insurance",
    slug: "goods-insurance",
    title: "Asigurări Bunuri (Cargo & Stocuri)",
    shortDescription: "Siguranță pentru mărfurile aflate în tranzit intern, internațional sau depozitate.",
    longDescription: "Lanțurile de aprovizionare moderne sunt vulnerabile. Produsele tale pot suferi accidente auto pe rute internaționale, furturi sau avarii în timpul manipulării. Polița Cargo preia aceste riscuri complet.",
    whatIsIt: "Asigurarea de Bunuri în Tranzit (Cargo) și Stocuri protejează contravaloarea mărfurilor pe durata transportului maritim, terestru sau aerian, de la poarta producătorului până la clientul final.",
    whyIsItImportant: "Transportatorii sunt limitați legal în responsabilitatea lor (ex: convenția CMR oferă aprox. 10 EUR / kg de marfă). Dacă transporți electronice scumpe de 100 kg, fără poliță Cargo primești doar 1.000 EUR despăgubire la o daună totală, indiferent de valoarea reală a bunurilor.",
    targetAudience: [
      "Case de expediție și importatori / exportatori.",
      "Companii de producție care trimit marfă proprie (pachete Stock & Transit).",
      "Comercianți E-commerce de volum."
    ],
    benefits: [
      { title: "Acoperire globală", description: "Pe apă, aer sau pământ, oriunde în lume." },
      { title: "Fără limită de greutate", description: "Despăgubirea se face la valoarea din factura comercială a mărfii, nu la kilogram." },
      { title: "Polițe deschise (Open Cover)", description: "Declarații automate lunare pentru toți paleții transportați, fără să anunți fiecare cursă." }
    ],
    risksCovered: [
      "Accidente rutiere / naufragii în care se distruge marfa.",
      "Furtul complet al mijlocului de transport.",
      "Daune prin udație, oxidare sau manipulare defectuoasă cu stivuitorul."
    ],
    practicalExamples: [
      { title: "Accident pe Autostradă", description: "Un camion cu produse cosmetice premium derapează. Transportatorul oferă despăgubire pe limită CMR, însă polița ta Cargo completă acoperă restul valorii facturii de 80.000 EUR." }
    ],
    whyGenerali: [
      "Specialiști marini dedicați, capabili să subscrie riscuri complexe logistice și rute multimodale internaționale."
    ],
    faqs: [
      { q: "Se asigură și ambalajul?", a: "Da, asigurarea poate include costul ambalării, al transportului și un profit anticipat (uzual 10%)." }
    ],
    iconName: "Truck"
  },
  "professional-protection": {
    id: "professional-protection",
    slug: "professional-protection",
    title: "Răspundere Civilă Profesională (Malpraxis/E&O)",
    shortDescription: "Protecție legală și financiară contra erorilor și omisiunilor din profesia ta.",
    longDescription: "Orice profesionist este expus riscului de a greși. O eroare de cod, o decizie medicală nefastă sau un calcul structural greșit pot genera daune milioanelor de euro clienților, transformându-se în procese distructive.",
    whatIsIt: "Cunoscută ca asigurare de 'Erori și Omisiuni' (E&O) sau Malpraxis, protejează patrimoniul profesioniștilor acoperind cheltuielile de apărare în tribunal și despăgubirile financiare datorate clientului prejudiciat.",
    whyIsItImportant: "Îți salvează cariera. De cele mai multe ori onorariile de avocați pentru a te apăra (chiar dacă se dovedește că nu ai greșit) pot duce o afacere mică în faliment. Polița preia aceste costuri de apărare instant.",
    targetAudience: [
      "Agenții IT și dezvoltatori de software (IT Liability).",
      "Medici, asistente, stomatologi și clinici private.",
      "Arhitecți, constructori, proiectanți (PI - Professional Indemnity).",
      "Contabili, experți fiscali, brokeri."
    ],
    benefits: [
      { title: "Scut financiar", description: "Protejează averea personală a asociatului care a greșit." },
      { title: "Acoperire legală", description: "Plătim avocații experți să te reprezinte în instanță." },
      { title: "Îndeplinirea cerințelor", description: "Multe contracte majore (B2B) impun ca furnizorul să aibă o poliță E&O de minim 1 Milion EUR pentru a putea semna." }
    ],
    risksCovered: [
      "Erori de diagnostic sau de tratament.",
      "Livrarea unui soft cu bug-uri care duce la oprirea sistemelor clientului.",
      "Pierderea documentelor esențiale ale clienților.",
      "Calcul structural greșit ce cauzează daune la o lucrare de construcție."
    ],
    practicalExamples: [
      { title: "Eroare IT majoră", description: "Actualizezi sistemul informatic al unui client e-commerce, dar creezi o breșă care le blochează vânzările de Black Friday timp de 4 ore. Clientul cere daune de 100.000 EUR. Polița ta IT Liability le achită." }
    ],
    whyGenerali: [
      "Vastă expertiză în gestionarea litigiilor complexe și acoperiri tailor-made pentru companii din industriile high-tech."
    ],
    faqs: [
      { q: "Sunt acoperite faptele intenționate?", a: "Nu, actele malițioase sau faptele penale săvârșite cu intenție sunt întotdeauna excluse." }
    ],
    iconName: "Award"
  },
  "liability-insurance": {
    id: "liability-insurance",
    slug: "liability-insurance",
    title: "Răspundere Civilă Generală",
    shortDescription: "Umbrela legală a companiei tale față de prejudiciile aduse publicului larg.",
    longDescription: "Orice activitate comercială aduce cu sine riscul de a vătăma terțe persoane sau bunurile acestora. Asigurarea de Răspundere Generală preia stresul litigiilor născute din incidentele întâmplate pe durata operațiunilor tale.",
    whatIsIt: "Asigurarea care protejează firma atunci când activitatea acesteia sau locația fizică provoacă vătămări corporale, îmbolnăviri sau pagube materiale altor persoane (clienți, vizitatori, furnizori).",
    whyIsItImportant: "Spre deosebire de erorile profesionale (E&O), aici vorbim de daune fizice. Dacă un client suferă o dizabilitate în urma vizitei la sediul tău, despăgubirile civile dictate de instanță pot fi colosale.",
    targetAudience: [
      "Proprietari de centre comerciale, restaurante și hoteluri.",
      "Companii de producție și asamblare.",
      "Organizatori de evenimente, constructori (Răspunderea Constructorului)."
    ],
    benefits: [
      { title: "Atenuarea șocurilor financiare", description: "Compania își continuă activitatea chiar și sub presiunea unui litigiu major." },
      { title: "Încredere pentru parteneri", description: "O firmă asigurată inspiră încredere și profesionalism contractorilor." },
      { title: "Acoperirea Produsului (Product Liability)", description: "Protecție suplimentară dacă bunul tău vândut rănește pe cineva ulterior (ex: toxiinfecție de la un produs expirat accidental)." }
    ],
    risksCovered: [
      "Vătămări corporale cauzate vizitatorilor în incintă.",
      "Distrugerea accidentală a bunurilor altor persoane.",
      "Răspunderea chiriașului față de imobilul închiriat."
    ],
    practicalExamples: [
      { title: "Accident în magazin", description: "Podeaua proaspăt spălată nu este semnalizată. Un client alunecă, își fracturează șoldul și dă în judecată firma pentru îngrijiri medicale și daune morale. Polița achită integral sumele." }
    ],
    whyGenerali: [
      "Soluții de răspundere complexă cu limite de zeci de milioane de euro susținute prin reasigurare europeană."
    ],
    faqs: [
      { q: "Răspunderea acoperă și accidentele de muncă ale angajaților mei?", a: "Acolo intervine polița de 'Răspunderea Angajatorului față de Angajați' care poate fi adăugată ca extensie la această poliță de bază." }
    ],
    iconName: "Scale"
  },
  "d-and-o": {
    id: "d-and-o",
    slug: "d-and-o",
    title: "Asigurări pentru Directori și Administratori (D&O)",
    shortDescription: "Protecția averii personale a membrilor Board-ului de deciziile manageriale.",
    longDescription: "A lua decizii la vârful unei companii implică riscuri imense. Acționarii, autoritățile de reglementare și competitorii pot atrage direct răspunderea liderilor companiei pentru deciziile luate, punând în pericol averea personală a acestora.",
    whatIsIt: "Asigurarea D&O (Directors and Officers Liability) despăgubește costurile de apărare juridică și daunele financiare impuse conducerii unei corporații rezultate dintr-un act managerial considerat eronat sau neglijent.",
    whyIsItImportant: "Directorii răspund solidari cu averea lor personală. O decizie proastă privind o fuziune, o eroare de calcul strategic care scade bursa companiei, poate duce la confiscarea conturilor personale. D&O este 'vesta de salvare' a managementului.",
    targetAudience: [
      "CEO, CFO și toți membrii C-Level (Executivi).",
      "Membrii Consiliilor de Administrație (Board of Directors).",
      "Companii listate la bursă sau startup-uri puternic finanțate de VC-uri."
    ],
    benefits: [
      { title: "Atragerea talentelor", description: "Niciun CEO de top nu se va alătura boardului fără o poliță D&O de milioane." },
      { title: "Costuri de investigație", description: "Acoperă inclusiv cheltuielile masive rezultate din investigațiile autorităților (ex: Consiliul Concurenței)." },
      { title: "Separarea firmei de persoană", description: "Compania plătește polița pentru a garanta siguranța executivului său." }
    ],
    risksCovered: [
      "Încălcări ale obligațiilor fiduciare.",
      "Procese intentate de acționari pentru pierderi financiare aduse companiei.",
      "Investigații ale autorităților statului."
    ],
    practicalExamples: [
      { title: "Procesul Acționarilor", description: "Boardul aprobă o achiziție, dar due-diligence-ul este superficial. Acționarii acuză conducerea de neglijență severă și dau în judecată membrii personal pentru prejudiciul creat. Polița achită zecile de mii de euro pentru echipa legală defensivă a fiecărui director." }
    ],
    whyGenerali: [
      "Capacitatea de a oferi protecție solidă în jurisdicții multiple (Global Coverage), protejând executivii chiar dacă litigiul are loc în Statele Unite."
    ],
    faqs: [
      { q: "Sunt acoperite amenzile penale?", a: "Nu, amenzile cu caracter penal și actele de fraudă dovedită/intenționată în justiție nu sunt și nu pot fi asigurate legal." }
    ],
    iconName: "Award"
  },
  "investor-insurance": {
    id: "investor-insurance",
    slug: "investor-insurance",
    title: "Asigurări pentru Investitori",
    shortDescription: "Protejarea injecțiilor de capital, acoperirea M&A și garantarea tranzacțiilor.",
    longDescription: "Tranzacțiile complexe de Fuziuni și Achiziții (M&A) ascund vulnerabilități, iar protejarea portofoliului unui fond de investiții necesită mai mult decât un due-diligence de bază. Structurăm instrumente financiare de mitigare a riscului tranzacțional.",
    whatIsIt: "Pachete de asigurare tranzacționale de tip W&I (Warranty & Indemnity Insurance) și protecția activelor investiționale. Aceste polițe preiau riscul ca garanțiile oferite de vânzător într-un contract de vânzare-cumpărare de companii să fie false sau inexacte.",
    whyIsItImportant: "Deblochează capitalul. Vânzătorul unei companii poate să nu fie de acord cu reținerea unei garanții financiare (escrow) de ani de zile de către cumpărător. Polița W&I înlocuiește acel escrow, asigurătorul preluând riscul de daune ascunse.",
    targetAudience: [
      "Fonduri de Private Equity și Venture Capital.",
      "Business Angels și investitori strategici corporativi.",
      "Firme de avocatură M&A."
    ],
    benefits: [
      { title: "Clean Exit", description: "Vânzătorul își primește banii și închide capitolul fără datorii ascunse viitoare." },
      { title: "Licitații competitive", description: "Cumpărătorul care vine cu o ofertă susținută de W&I este mult mai atractiv." },
      { title: "Solvabilitate", description: "Dacă apar datorii din trecut, fondul de investiții este despăgubit de o entitate solvabilă (Generali), nu depinde de vânzătorul care poate a cheltuit deja banii." }
    ],
    risksCovered: [
      "Datorii fiscale istorice neidentificate în due-diligence.",
      "Litigii apărute din trecut (ex: foști angajați dau în judecată firma cumpărată pentru fapte dinaintea tranzacției).",
      "Protecția titlului de proprietate asupra acțiunilor."
    ],
    practicalExamples: [
      { title: "Taxe ascunse", description: "Un Private Equity cumpără o fabrică. Un an mai târziu, ANAF face control pe o perioadă dinaintea achiziției și găsește o gaură de 2 Milioane EUR. Asigurarea W&I acoperă gaura, protejând randamentul (IRR-ul) investitorului." }
    ],
    whyGenerali: [
      "O divizie dedicată W&I la nivel internațional care analizează rapid structura M&A-urilor și emite angajamente de plată în ritmul alert necesar closing-ului corporativ."
    ],
    faqs: [
      { q: "Înlocuiește W&I-ul o analiză Due-Diligence?", a: "Nu, dimpotrivă. O poliță W&I poate fi emisă doar dacă s-a realizat un Due-Diligence profesional solid, asigurătorul acoperind riscurile 'necunoscute', nu cele descoperite deja." }
    ],
    iconName: "Building2"
  }
};
