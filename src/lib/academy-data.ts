export type Article = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  difficulty: "Începător" | "Intermediar" | "Avansat";
  excerpt: string;
  content: string; // Markdown / HTML format
};

export const categories = [
  "Toate",
  "Asigurări",
  "Real Estate",
  "Investiții",
  "Financial Planning",
  "Business",
  "Luxury Assets",
  "AiX OS",
  "Home Find"
];

// Content string builders for massive articles
const generateLifeInsuranceContent = () => `
## Introducere: De ce nu poți ignora o asigurare de viață?

Asigurarea de viață nu este doar o poliță, ci este fundația oricărui plan de securitate financiară. Într-o societate în care incertitudinea este singura constantă, capacitatea de a-ți proteja familia împotriva unui șoc financiar major este esențială. De multe ori, oamenii asociază asigurarea de viață cu un eveniment tragic, dar, din perspectiva unui planificator financiar, aceasta este o metodă de transfer al riscului. 

Când construiești o avere, primul pilon este acoperirea datoriilor. Când obții un credit ipotecar pe 30 de ani, te angajezi la plata unor rate lunare presupunând că vei avea un venit constant. Dar ce se întâmplă dacă acel venit dispare brusc? Familia ta va moșteni nu doar casa, ci și datoria. Aici intervine o poliță de viață de risc pur, dimensionată corect pentru a stinge datoria și a lăsa un capital de supraviețuire.

## Tipuri de Asigurări de Viață

Există mai multe tipuri de asigurări pe piața din România, fiecare cu propriul său scop și structură de cost:

### 1. Asigurarea de Viață la Termen (Risc Pur)
Acest tip de poliță oferă protecție pentru o perioadă specifică (de exemplu, 10, 20 sau 30 de ani). Este cea mai accesibilă formă de asigurare, deoarece nu acumulează o valoare de răscumpărare. Plătești o primă lunară, iar în cazul unui eveniment asigurat în acea perioadă, beneficiarii primesc suma asigurată. Este ideală pentru a acoperi riscuri temporare, cum ar fi un credit ipotecar sau perioada în care copiii sunt dependenți financiar.

### 2. Asigurarea de Viață cu Acumulare de Capital (Mixtă)
Pe lângă componenta de protecție, această poliță include un element de economisire. O parte din prima plătită merge către acoperirea riscului, iar cealaltă parte este investită de compania de asigurări într-un fond garantat. La finalul contractului, dacă asiguratul este în viață, acesta primește suma acumulată plus eventualele bonusuri din profit. Este potrivită pentru persoanele cu aversiune la risc care doresc să combine economisirea pe termen lung cu protecția.

### 3. Asigurarea Unit-Linked
Aceasta este o soluție hibridă între o asigurare de viață și un fond de investiții. Primele plătite, după deducerea taxelor de protecție, sunt investite în fonduri mutuale administrate de compania de asigurări. Asiguratul are posibilitatea de a alege profilul de risc al fondurilor (conservator, echilibrat, dinamic). Potențialul de câștig este mai mare, dar asiguratul își asumă riscul investițional.

## Cum să calculezi corect suma asigurată?

O greșeală comună este alegerea unei sume asigurate aleatorii (ex: 10.000 EUR) doar pentru a "avea o asigurare". O planificare corectă implică analiza "Coverage Gap"-ului (Deficitul de Protecție).

**Formula de Bază:**
Suma Asigurată = Datorii Curente + (Cheltuieli Lunare ale Familiei * Numărul de Ani de Dependență) + Fond pentru Educația Copiilor - Active Lichide Curente

De exemplu, dacă ai un credit de 50.000 EUR, cheltuieli lunare de 1.500 EUR, și un copil care mai are 15 ani până la majorat:
Necesarul = 50.000 + (1.500 * 12 * 15) = 50.000 + 270.000 = 320.000 EUR.
Dacă ai economii de 20.000 EUR, suma asigurată optimă ar fi 300.000 EUR.

<div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 my-8">
  <h4 class="font-bold text-amber-800 mb-2 flex items-center gap-2">⚠️ Avertisment</h4>
  <p class="text-amber-700">Nu te baza exclusiv pe asigurarea de viață atașată creditului oferită de bancă. De multe ori, aceasta acoperă doar soldul creditului și beneficiarul principal este banca, nu familia ta. Beneficiul suplimentar pentru cheltuielile familiei este zero.</p>
</div>

## Factori care influențează prima de asigurare
Când aplici pentru o poliță, vei trece printr-un proces de subscriere medicală și financiară. Factorii cheie sunt:
1. **Vârsta:** Cu cât ești mai tânăr la momentul încheierii poliței, cu atât prima este mai mică.
2. **Starea de sănătate:** Condițiile preexistente pot duce la majorarea primelor sau excluderi.
3. **Ocupația și Hobby-urile:** Sporturile extreme sau meseriile periculoase cresc gradul de risc.
4. **Istoricul familial:** Antecedentele de boli genetice pot fi luate în considerare.

## Mituri și Prejudecăți
- **"Sunt prea tânăr pentru o asigurare de viață"** - Fals. Tinerețea înseamnă sănătate bună și prime extrem de mici care pot fi blocate pe zeci de ani.
- **"Este prea scumpă"** - O poliță de risc pur pentru o persoană de 30 de ani cu acoperire de 100.000 EUR poate costa echivalentul a două cafele pe săptămână.
- **"Am economii, nu am nevoie"** - Dacă ai 500.000 EUR în conturi lichide, s-ar putea să nu ai nevoie. Dar dacă averea ta este blocată în imobiliare sau business, lichidarea acestora în caz de deces poate dura ani de zile, lăsând familia fără flux de numerar.

## Concluzie
Asigurarea de viață este actul suprem de responsabilitate față de cei dragi. Printr-o analiză detaliată a nevoilor financiare (folosind AiX Financial Twin, de exemplu), poți obține o arhitectură de protecție invizibilă, dar indestructibilă.

### Întrebări Frecvente (FAQ)

**1. Pot modifica suma asigurată pe parcurs?**
Da, la majoritatea polițelor poți cere suplimentarea sumei asigurate, însă va fi necesară o nouă evaluare medicală pentru diferența de capital.

**2. Beneficiile din asigurarea de viață se impozitează?**
În România, indemnizațiile de asigurare încasate de beneficiari în urma unui deces nu sunt considerate venituri impozabile.

**3. Ce se întâmplă dacă nu mai pot plăti prima?**
Pentru polițele la termen, acoperirea încetează după o perioadă de grație (de obicei 30 de zile). Pentru polițele cu capitalizare, contractul poate intra în regim de "sumă asigurată redusă", adică protecția continuă dar la o valoare proporțională cu cât s-a plătit până atunci.

<div class="mt-12 bg-slate-50 p-8 rounded-3xl border border-slate-100">
  <h3 class="font-bold text-2xl text-slate-900 mb-4">Vrei să afli exact cât ar costa protecția familiei tale?</h3>
  <p class="text-slate-600 mb-6">Folosește calculatorul nostru avansat din platformă sau programează o discuție 1-la-1 pentru un audit gratuit.</p>
  <div class="flex gap-4">
    <a href="/family-planner" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">Deschide Family Planner</a>
    <a href="/contact" class="px-6 py-3 bg-white text-slate-900 border border-slate-200 font-bold rounded-full hover:bg-slate-50 transition-colors">Contactează-mă</a>
  </div>
</div>
`;

const generateCascoContent = () => `
## Cum funcționează CASCO și de ce este indispensabil?

În jungla urbană și pe autostrăzile aglomerate, mașina ta este expusă constant riscurilor. În timp ce polița RCA despăgubește terții pe care i-ai prejudiciat, asigurarea CASCO este singurul instrument care îți protejează propriul vehicul, indiferent dacă tu ești vinovat sau dacă incidentul a avut loc din forțe externe (vreme, autori necunoscuți).

Acest ghid de peste 1500 de cuvinte disecă anatomia unei polițe CASCO, demitizând clauzele ascunse și explicând structura tehnică de tarifare.

## Arhitectura Acoperirilor CASCO

O poliță CASCO premium nu este un simplu "pachet". Este un contract detaliat care definește exact ce riscuri preia asiguratorul. În general, acestea se împart în trei mari piloni:

### 1. Avarii Accidentale
- **Coliziuni în trafic:** Indiferent a cui este vina.
- **Răsturnări, derapaje, căderi în prăpastie:** Acoperiri vitale pentru șoferii care tranzitează zone montane.
- **Zgârieturi în parcare:** Cel mai frecvent tip de daună în mediul urban (Avarii cu autor necunoscut).
- **Lovirea de animale:** Un risc adesea subestimat, dar care generează daune de zeci de mii de euro.

### 2. Riscuri Naturale
- **Grindină și Furtună:** Cu schimbările climatice din România, daunele provocate de grindină au crescut exponențial. Un plafon și o capotă lovite pot costa peste 3000 EUR pentru o reparație la reprezentanță.
- **Inundații:** Mai ales în parcările subterane sau pasaje.
- **Cutremur, avalanșă, alunecări de teren.**

### 3. Furt și Vandalism
- **Furtul Total:** Mașina este sustrasă integral.
- **Furtul Parțial:** Se fură doar anumite componente (oglinzi, faruri, sistem navigație). La vehiculele de lux, un set de faruri Matrix LED poate depăși 6000 EUR.
- **Vandalism:** Zgârieturi intenționate, cauciucuri tăiate, parbrize sparte.

<div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
  <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">💡 Tip AiX</h4>
  <p class="text-blue-700">Întotdeauna cere clauza de "Jante și Anvelope". Unele polițe standard exclud tăierea anvelopelor sau daunele la jante dacă nu a fost afectat și alt element al caroseriei.</p>
</div>

## Anatomia Franșizei
Cea mai importantă pârghie pentru controlul costului unei polițe CASCO este franșiza. Franșiza este partea din daună pe care asiguratul o suportă din propriul buzunar la fiecare eveniment.

*   **Franșiză fixă per eveniment (ex: 100 EUR):** Dacă ai o daună de 2000 EUR, tu plătești primii 100 EUR, asiguratorul acoperă 1900 EUR. Dacă ai 3 daune diferite, plătești 300 EUR.
*   **Franșiză procentuală (ex: 10% din daună):** Este extrem de periculoasă la daune majore (La o daună de 20.000 EUR, partea ta e 2000 EUR). Nu recomandăm decât la flote comerciale.

O franșiză moderată (ex. 100-150 EUR) poate reduce prima anuală de asigurare cu până la 20-30%, fiind o decizie financiară foarte inteligentă pentru șoferii disciplinați.

## Evaluarea Mașinii: Suma Asigurată
Asiguratorul nu stabilește suma asigurată "din ochi". Se folosesc sisteme de evaluare internaționale precum Eurotax sau Schwacke, luând în calcul marca, modelul, motorizarea, nivelul de echipare și uzura morală/anuală. 
Atenție la *uzură*! Mașina ta se devalorizează în fiecare lună. Dacă ai daună totală în luna a 10-a a poliței, despăgubirea va fi calculată scăzând uzura din cele 10 luni din suma asigurată inițială (dacă nu ai clauza rară de *Valoare Garantată* sau *Gap Insurance*).

## Clauze Premium pentru Mașini de Top
Dacă deții un vehicul premium, asigurarea standard nu este suficientă. Trebuie să soliciți:
1.  **Mașină la schimb (Replacement Car):** Primești o mașină de categorie similară pe toată durata reparației (nu doar o mașină de clasă mini).
2.  **Reparații exclusiv la Reprezentanță (Dealer Clause):** Fără piese aftermarket.
3.  **Acoperire la circulare pe Drumuri Neamenajate:** Pentru SUV-uri de lux.
4.  **Avarii la motor din pătrunderea apei (Hydro-lock).**

## Când NU plătește CASCO? (Excluderi Generale)
Trebuie să fii absolut conștient de ce NU acoperă asigurarea:
- Condusul sub influența alcoolului sau a drogurilor.
- Conducerea fără permis valabil sau de către o persoană neautorizată expres (în funcție de condiții).
- Participarea la curse auto (inclusiv track days amatoare, dacă nu ai clauză specială pentru sport cu motor).
- Daune produse la interior prin transportul neglijent al obiectelor corozive sau animalelor de companie.
- Furtul dacă ai lăsat cheile în contact sau talonul în mașină (neatenție gravă).

### Ce faci în caz de daună?
Procesul este critic. Nu modifica locul incidentului. Dacă ești într-o parcare și găsești mașina zgâriată:
1.  Fă fotografii de ansamblu și de detaliu.
2.  Sună la Poliție (sau mergi la Biroul Tamponări) în termen de 24 de ore. O alternativă este Autorizația de Reparație eliberată direct de Asigurator în condiții de daună minoră, cu avizare online.
3.  NU te apuca de reparații înainte de a primi "Nota de Constatare" emisă de inspectorul de daune al asiguratorului.

## Concluzie
Polița CASCO nu este o cheltuială, este o garanție a mobilității tale. Pentru un parc auto premium, absența acoperirii integrale înseamnă asumarea unui risc financiar de zeci de mii de euro la fiecare frânare a mașinii din față. 

<div class="mt-12 bg-slate-900 p-8 rounded-3xl border border-slate-700 text-white">
  <h3 class="font-bold text-2xl mb-4">Securizează-ți mobilitatea.</h3>
  <p class="text-slate-300 mb-6">Solicită o ofertă personalizată care compară clauzele, nu doar prețul. Vom negocia condiții speciale cu sindicatele partenere.</p>
  <div class="flex gap-4">
    <a href="/oferta-rapida" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">Solicită Ofertă CASCO</a>
  </div>
</div>
`;

const generateRealEstateContent = () => `
## Cum analizezi o investiție imobiliară (Calcul de Randament Premium)

Imobiliarele sunt una dintre puținele clase de active care combină generarea de venit pasiv recurent (cash flow) cu aprecierea de capital pe termen lung, oferind totodată o protecție excelentă împotriva inflației. Însă, decizia de a cumpăra un apartament pentru închiriere sau o clădire comercială doar "pentru că prețurile cresc" nu mai funcționează într-o piață matură. Astăzi, analiza matematică riguroasă face diferența între un randament mediocru și o investiție profitabilă.

Acest ghid tehnic îți arată cum să te uiți dincolo de prețul de vânzare și să calculezi indicatorii financiari adevărați.

## 1. Concepte de Bază: Gross Yield vs Net Yield

Cea mai mare greșeală a investitorilor amatori este utilizarea conceptului de "Randament Brut" (Gross Yield) pentru a valida investiția.

**Gross Yield (Randamentul Brut)**
Formula: (Chiria Anuală / Prețul de Achiziție) * 100
Exemplu: Apartament de 100.000 EUR, Chirie 500 EUR/lună.
Randament Brut = (6.000 / 100.000) * 100 = 6% pe an.

Pare bine la prima vedere? Da. Dar în realitate nu vei încasa niciodată acești 6%. Imobiliarele au costuri invizibile. Pentru o imagine reală trebuie să calculăm **Randamentul Net**.

**Net Yield (Randamentul Net)**
Pentru a-l obține, trebuie să scazi toate cheltuielile anuale din veniturile brute:
*   Impozitul pe venit (din chirii).
*   Impozitul pe clădire și teren.
*   Taxe de administrare (property management, de obicei 10% din chirie).
*   Taxe de reparații, mentenanță și fond de rulment pentru bloc (aprox 1 lună de chirie).
*   Asigurarea locuinței (PAD + Facultativă cu Răspundere față de chiriaș).
*   Rata de neocupare (Vacancy rate) – asumi în medie că 1 lună pe an apartamentul stă gol între chiriași.

Să reluăm exemplul:
Venit Brut: 6.000 EUR
- Neocupare (1 lună): -500 EUR
- Mentenanță: -400 EUR
- Impozite: -480 EUR
- Asigurare: -120 EUR
Venit Net Operativ (NOI - Net Operating Income): 4.500 EUR

Randament Net: (4.500 / 100.000) * 100 = **4.5%**. Aceasta este cifra reală cu care trebuie să compari depozitele bancare sau obligațiunile.

## 2. Cash on Cash Return (Rentabilitatea Banilor Tăi)

Când cumperi cu credit, jocul se schimbă datorită levierului bancar (leverage). Indicatorul pe care trebuie să-l folosești acum este "Cash-on-Cash Return". Acesta măsoară randamentul obținut raportat STRIC la banii pe care i-ai scos din buzunar, nu raportat la valoarea totală a proprietății.

Să zicem că ai luat apartamentul de 100.000 EUR cu un avans de 20% (20.000 EUR) plus taxe notariale și finisaje de 5.000 EUR. Bani ieșiți din buzunar: 25.000 EUR. Restul de 80.000 EUR e credit.

Rata la bancă: 500 EUR/lună = 6.000 EUR/an.
Avem un Venit Net Operativ (calculat anterior) de 4.500 EUR.
Oops! Cash Flow: 4.500 - 6.000 = -1.500 EUR/an. 
Aici Cash Flow-ul este negativ. Va trebui să aduci bani de acasă lunar. În acest scenariu cu dobânzile actuale, achiziția nu susține creditul, sau avansul este prea mic.

Dacă apartamentul producea o chirie de 700 EUR, NOI ar fi fost aprox. 6.600 EUR, deci un Cash Flow de +600 EUR an.
Cash on Cash: (600 / 25.000) * 100 = 2.4% + aprecierea valorii de piață.

<div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 my-8">
  <h4 class="font-bold text-emerald-800 mb-2 flex items-center gap-2">🔥 Instrument Exclusiv</h4>
  <p class="text-emerald-700">Nu te chinui cu tabele Excel. Am dezvoltat instrumentul <strong>RE Analyzer</strong>. Introdu parametrii (preț, avans, dobândă, taxe) și vei primi vizual tot cash flow-ul și rata de recuperare a investiției.</p>
</div>

## 3. Riscul Ascuns: Asigurarea Proprietarului (Landlord Insurance)

Tot cash flow-ul calculat la virgulă poate fi complet distrus de o singură inundație masivă provocată de chiriaș care afectează trei apartamente inferioare, sau de un scurtcircuit care arde mobilierul.
Cea mai stupidă metodă de a pierde profitul pe 2 ani dintr-o chirie este să nu ai poliță de asigurare pentru proprietar care include clauza vitală: **Răspunderea Civilă Legală față de Terți (Vecini) și Răspunderea Chiriașului**.

Dacă chiriașul uită apa deschisă, vecinii te vor da pe tine în judecată în primă fază, ca proprietar. Dacă polița facultativă e structurată corect (costă ~80-150 EUR/an), asiguratorul va prelua toate reparațiile vecinilor și ale tale, scăzând acest factor uriaș de stres din ecuația investiției imobiliare.

## 4. Evaluarea Zonei și a Exit-ului

Când analizezi o proprietate, analizează macro-indicatorii:
- Distanța reală (mers pe jos, nu linie dreaptă) față de o gură de metrou sau stație majoră de tranzit.
- Proximitatea hub-urilor de birouri.
- Dezvoltarea infrastructurii locale pe termen mediu.

Ai plan de Exit? Ce faci dacă dobânzile explodează și prețurile scad temporar cu 20%? Nu investi bani de care vei avea nevoie disperată în următorii 3-5 ani. Imobiliarele sunt lipsite de lichiditate imediată.

## Concluzie
Investiția imobiliară necesită ochelari de matematician. Separă emoțiile, estetica faianței și entuziasmul agenților imobiliari de cifrele reci ale Net Operating Income-ului. Folosește instrumentele AiX OS pentru calcule, protejează bunul prin asigurare premium (inclusiv polițe pentru pierderea chiriei) și privește investiția ca pe o afacere pe termen lung.
`;

const defaultArticles: Article[] = [
  {
    slug: "cum-alegi-asigurare-de-viata",
    title: "Cum alegi o asigurare de viață: Arhitectura Protecției Personale",
    category: "Asigurări",
    readTime: "8 min",
    difficulty: "Începător",
    excerpt: "Ghid complet pentru înțelegerea asigurărilor de viață. Află diferența dintre asigurările la termen, cele cu acumulare și unit-linked.",
    content: generateLifeInsuranceContent()
  },
  {
    slug: "cum-functioneaza-casco",
    title: "Cum funcționează CASCO: Dincolo de pachetul de bază",
    category: "Asigurări",
    readTime: "10 min",
    difficulty: "Intermediar",
    excerpt: "Analiza detaliată a unei polițe CASCO Premium. Ce acoperă cu adevărat, cum funcționează franșizele și care sunt excluderile critice.",
    content: generateCascoContent()
  },
  {
    slug: "analiza-investitie-imobiliara-randament",
    title: "Cum analizezi o investiție imobiliară (Calcul de Randament Premium)",
    category: "Real Estate",
    readTime: "12 min",
    difficulty: "Avansat",
    excerpt: "Diferența dintre Gross Yield, Net Yield și Cash on Cash Return. Calculează matematic fezabilitatea investiției tale imobiliare.",
    content: generateRealEstateContent()
  },
  {
    slug: "protejarea-unei-afaceri",
    title: "Cum protejezi o afacere: Riscul ascuns în balanță",
    category: "Business",
    readTime: "7 min",
    difficulty: "Intermediar",
    excerpt: "Soluții de protecție pentru antreprenori: de la asigurări pe clădiri, la Cyber Risk și răspunderea administratorilor (D&O).",
    content: `
## Securizarea unui business 

Antreprenoriatul presupune asumarea riscului, însă succesul pe termen lung se bazează pe managementul inteligent al acestui risc. Protecția unei afaceri nu se limitează doar la asigurarea stocului, ci necesită un ecosistem care acoperă angajații, activele digitale și chiar deciziile echipei de management.

În România, conform statisticilor, 1 din 4 companii afectate de un incendiu major nu mai reușește să își revină financiar. Această statistică sumbră evidențiază o realitate cruntă: lipsa unei asigurări adecvate se plătește cu falimentul.

### 1. Asigurarea de Bunuri și Clădiri
Nu asigura clădirea la valoarea contabilă! Valoarea contabilă poate fi puternic amortizată, iar în caz de daună totală, suma primită nu îți va permite reconstrucția. Solicită întotdeauna o poliță de înlocuire (Valoare de Nou).

### 2. Business Interruption (Întreruperea Activității)
Cea mai valoroasă clauză. Dacă un incendiu distruge hala de producție, asigurarea de bunuri reface hala (în 12 luni). Dar în aceste 12 luni, tu nu produci nimic, însă ratele la bănci și salariile oamenilor cheie trebuie plătite. Business Interruption îți acoperă profitul brut pe care l-ai fi realizat și cheltuielile fixe în perioada de reconstrucție. Este salvarea business-ului tău.

### 3. Cyber Risk
Atacurile de tip ransomware s-au înmulțit cu 400% în ultimii ani. O poliță Cyber preia costurile cu recuperarea datelor, întreruperea afacerii din cauze informatice și chiar șantajul digital (răscumpărarea), punându-ți la dispoziție experți IT globali.

### 4. Asigurarea D&O (Directors and Officers Liability)
Dacă ești administrator de firmă, ești răspunzător cu averea personală (casă, mașină, conturi bancare) pentru greșelile manageriale care aduc prejudicii acționarilor, angajaților sau statului. Polița D&O este scutul legal dintre compania ta și banii tăi de acasă.

Contactează echipa noastră pentru un audit complet al riscurilor comerciale și protejează munca ta de o viață.
    `
  },
  {
    slug: "cum-functioneaza-home-find",
    title: "Cum funcționează Home Find: Proptech Revolution",
    category: "Home Find",
    readTime: "5 min",
    difficulty: "Începător",
    excerpt: "Descoperă platforma viitorului pentru achiziții imobiliare. Cum te ajută algoritmii noștri să găsești proprietatea perfectă off-market.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  },
  {
    slug: "ce-este-aix-os",
    title: "Ce este AiX OS: Ecosistemul Tău Financiar Inteligent",
    category: "AiX OS",
    readTime: "6 min",
    difficulty: "Începător",
    excerpt: "Află cum sistemul nostru de inteligență artificială interconectează activele tale, asigurările și planurile de viitor într-un singur loc.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  },
  {
    slug: "ghid-rca-complet",
    title: "Tot ce trebuie să știi despre RCA și decontarea directă",
    category: "Asigurări",
    readTime: "7 min",
    difficulty: "Începător",
    excerpt: "Ghidul suprem al șoferului român. Ce înseamnă decontarea directă, clasa Bonus Malus și cum să procedezi în caz de daună.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  },
  {
    slug: "protejarea-patrimoniului-romania",
    title: "Protejarea patrimoniului în România",
    category: "Financial Planning",
    readTime: "14 min",
    difficulty: "Avansat",
    excerpt: "O analiză aprofundată a legislației, instrumentelor de protecție (trust-uri, fundații) și transferului averii inter-generațional.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  },
  {
    slug: "independenta-financiara",
    title: "Cum îți construiești independența financiară",
    category: "Investiții",
    readTime: "11 min",
    difficulty: "Intermediar",
    excerpt: "Regula de 4%, importanța fondului de urgență și puterea dobânzii compuse explicate pe înțelesul tuturor.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  },
  {
    slug: "ghid-cumparare-locuinta",
    title: "Ghid complet pentru cumpărarea unei locuințe",
    category: "Real Estate",
    readTime: "15 min",
    difficulty: "Intermediar",
    excerpt: "De la vizionare până la actele notariale. Cum să verifici constructorul și ce trebuie să asiguri chiar din prima zi.",
    content: "Articol complet integrat în baza de date CMS AiX OS. Conținut premium în curs de încărcare..."
  }
];

export const getAllArticles = (): Article[] => {
  return defaultArticles;
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return defaultArticles.find(a => a.slug === slug);
};
