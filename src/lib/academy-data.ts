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
const generateHomeFindContent = () => `
## Introducere: De ce sistemul clasic de achiziție este depășit?

Achiziția unei proprietăți este, pentru majoritatea oamenilor, cea mai importantă decizie financiară din viață. Cu toate acestea, piața imobiliară tradițională este plină de asimetrii informaționale: agenții imobiliari reprezintă adesea vânzătorul, iar cumpărătorul navighează "în orb", bazându-se pe emoții, poze prelucrate și vizionări grăbite de 15 minute. 

Ce este o proprietate? Un simplu acoperiș deasupra capului sau un activ financiar care trebuie să performeze? Home Find schimbă radical această paradigmă. Nu vindem case. Cumpărăm randamente, liniște și structuri sigure pentru clienții noștri.

## Ce este Home Find?

Home Find este o divizie de "Buyer Representation" (Reprezentarea Cumpărătorului) exclusivistă, integrată cu tehnologia Proptech. Spre deosebire de o agenție imobiliară clasică, noi nu listăm zeci de proprietăți în speranța că vom găsi un cumpărător. Noi lucrăm strict pentru tine, Cumpărătorul, și căutăm pe întreaga piață (inclusiv proprietăți "off-market") acel activ care corespunde 100% cu profilul tău de risc, bugetul și obiectivele pe termen lung.

## De ce contează reprezentarea exclusivă?

- **Conflictul de interese eliminat:** Agentul vânzătorului vrea prețul maxim. Noi vrem prețul corect, condiții contractuale sigure și zero vicii ascunse.
- **Timp salvat:** Omiterea zecilor de vizionări inutile. Vizionăm noi 20 de proprietăți și îți prezentăm doar cele mai bune 3, printr-un raport de analiză tehnică și financiară.
- **Acces la proprietăți "Off-Market":** Multe proprietăți premium, terenuri cu potențial sau oportunități de tip "distressed" (executări, vânzări urgente) nu ajung niciodată pe portalurile publice. Prin rețeaua noastră, ai acces prioritar.

## Cum funcționează procesul Home Find?

Procesul este strict structurat, ingineresc, pentru a elimina orice decizie bazată pe emoție pură.

### 1. Sesiunea de Calibrare (Onboarding)
Totul începe cu un interviu financiar detaliat. Nu te întrebăm doar "câte camere vrei?". Analizăm bugetul maxim de achiziție, structura de finanțare (cash vs. credit), randamentul dorit (dacă e investiție), orizontul de timp și preferințele de lifestyle.

### 2. Maparea și Scanarea Pieței
Algoritmii noștri și echipa de analiști scanează zilnic baze de date, licitații, contactează direct proprietari din zonele vizate și analizează istoricul de preț al zonei. Generăm o listă scurtă (Shortlist).

### 3. Inspecția Tehnică și Juridică Preliminară
Înainte de a te chema la vizionare, noi mergem pe teren. Verificăm viciile de structură vizibile, instalațiile, vecinătățile (proximitate față de surse de zgomot), și cerem actele de proprietate pentru o verificare juridică rapidă (sarcini, litigii, istoric).

### 4. Raportul "AiX Property Assessment"
Primești un raport detaliat pentru fiecare proprietate din "Shortlist". Raportul include calculul Randamentului Net (Net Yield), estimarea costurilor de renovare, analiza comparativă de piață (CMA) și riscurile asociate.

### 5. Negocierea și Închiderea Tranzacției (The Closing)
Aici intervine cu adevărat expertiza noastră. Negociem agresiv, dar argumentat. Structurăm antecontractul astfel încât avansul tău să fie 100% protejat. Colaborăm cu notari și avocați parteneri pentru a asigura un transfer de proprietate perfect curat.

## Exemple Practice: Capcane Evitate

- **Cazul "Apartamentului Proaspăt Renovat":** Un client a dorit un apartament superb la un preț atractiv. Inspecția noastră tehnică a dezvăluit că "renovarea" ascundea igrasie severă și infiltrații de la terasă (ultimul etaj). Am salvat clientul de o pagubă de mii de euro.
- **Cazul "Randamentului Fals":** Un apartament vândut "la pachet cu chiriaș" promitea 7% randament. Analiza noastră a arătat că acel chiriaș plătea peste prețul pieței (probabil un aranjament pe termen scurt), iar cheltuielile de mentenanță erau uriașe. Randamentul real era de 3.5%.

## Sfaturi pentru Cumpărători

- Nu te lăsa presat de "oferte care expiră mâine". O proprietate bună se cumpără cu mintea, nu cu frica de a o pierde.
- Cere întotdeauna certificatul energetic, extrasul de carte funciară la zi și istoricul plăților la întreținere.
- Calculează costul "invizibil": naveta zilnică, taxele de parcare, renovările iminente.

<div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
  <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">💡 Tip AiX</h4>
  <p class="text-blue-700">Dacă ești investitor, nu cumpăra ceea ce îți place ție personal, cumpără ceea ce se cere pe piața de închirieri în acea zonă. Designul neutru, optimizarea spațiului și mentenanța ieftină sunt secretele randamentului.</p>
</div>

## Avertismente

- Nu plăti niciodată un avans semnificativ fără o clauză de "Due Diligence" (perioadă de verificare).
- Evită proprietățile aflate în litigiu, chiar dacă "sunt aproape rezolvate". Timpul tău și banii tăi nu trebuie blocați în procese.

## Întrebări Frecvente (FAQ)

**1. Cât costă serviciul Home Find?**
Fiind un serviciu premium de reprezentare exclusivă, lucrăm pe bază de comision de succes (între 2% și 3% + TVA din prețul final), dar valoarea adusă prin negociere și riscuri evitate depășește adesea cu mult acest onorariu.

**2. Găsiți și credite ipotecare?**
Da. Interfațăm achiziția cu soluții de finanțare optime, analizând oferte de la toate băncile majore.

**3. Cât durează procesul?**
De la onboarding până la găsirea proprietății durează în medie 30-45 de zile, urmat de procesul juridic (aprox. 14-30 zile).

## Sumar

Home Find transformă cumpărarea unei case dintr-un proces stresant și plin de capcane, într-o achiziție sigură, matematic demonstrată, asistată de experți dedicați exclusiv interesului tău.

## Call to Action

Ești pregătit să cumperi inteligent? Programează o sesiune de strategie imobiliară și lasă echipa noastră să găsească activul perfect pentru tine.
`;

const generateAixOsContent = () => `
## Introducere: De la Haos Financiar la Orchestare Perfectă

Trăim într-o lume în care fiecare persoană are zeci de conturi bancare, polițe de asigurare răspândite la diferiți brokeri, proprietăți imobiliare și investiții pe diverse platforme. Rezultatul? Un haos financiar în care este imposibil să ai o imagine clară asupra patrimoniului tău, să identifici riscurile ascunse sau să știi exact cât valorezi net. AiX OS este soluția supremă la această problemă.

## Ce este AiX OS?

AiX OS este un Ecosistem Financiar Inteligent (Financial Operating System) care funcționează ca un "creier" central pentru toată viața ta financiară. Nu este doar o aplicație de bugetare, ci un sistem avansat care îți digitalizează, analizează și optimizează întregul patrimoniu. Folosind inteligența artificială, AiX OS creează un "Financial Twin" – o copie digitală a situației tale financiare curente.

## De ce contează AiX OS?

Cea mai mare greșeală a planificării financiare tradiționale este fragmentarea. Dacă îți iei o asigurare de viață, agentul nu știe ce credite ai. Dacă îți iei un credit, bancherul nu știe ce investiții ai. AiX OS sparge aceste silozuri. Oferă o vedere de ansamblu (360 de grade) care permite simularea unor scenarii complexe și identificarea vulnerabilităților înainte ca ele să devină crize.

## Funcționalități Principale

### 1. The Wealth Dashboard
O singură pagină, un singur adevăr. Aici vezi "Net Worth-ul" tău (Averea Netă), actualizat în timp real. Sistemul integrează valoarea estimată a proprietăților tale, conturile bancare, portofoliul de investiții și scade automat pasivele (creditele ipotecare, leasing-urile).

### 2. AiX Financial Twin
Creezi o clonă digitală a profilului tău. Poți rula simulări: "Ce se întâmplă dacă dobânzile cresc cu 2%?", "Cum arată cash-flow-ul familiei dacă venitul meu dispare brusc timp de 6 luni?". Sistemul îți arată exact unde "sângerezi" financiar.

### 3. Vault-ul Securizat (Document Management)
Nu mai cauți polița RCA în torpedoul mașinii sau contractul casei prin dosare prăfuite. Toate documentele vitale sunt scanate, criptate și stocate în Vault-ul AiX OS. Sistemul citește datele de expirare și te notifică automat cu 30 de zile înainte.

### 4. Arhitectura de Protecție (Protection Score)
Algoritmul analizează ce polițe ai și le compară cu expunerea ta la risc. Dacă ai un credit de 100.000 EUR dar nu ai o asigurare de viață, Scor-ul tău de Protecție va scădea drastic, generând o alertă roșie ("Vulnerabilitate Critică").

## Exemple Practice: Puterea AiX OS

- **Identificarea "Găurilor Negre":** Un client credea că este foarte profitabil pentru că încasa chirii lunare consistente. Introducând datele în AiX OS, sistemul a calculat rata internă de rentabilitate (IRR) și a demonstrat că, ajustat la inflație și costurile de mentenanță ascunse, randamentul său real era negativ.
- **Optimizarea Succesiunii:** Prin maparea clară a tuturor activelor în AiX OS, un client a putut genera instantaneu un "Wealth Passport", un document vital care i-a facilitat crearea unui plan succesoral clar cu avocatul său, economisind luni de investigații.

## Sfaturi pentru Utilizatori

- **Transparență Totală:** Sistemul funcționează optim doar dacă introduci date reale. Un "Financial Twin" bazat pe date parțiale va genera recomandări greșite.
- **Actualizează Constant:** Dacă vinzi o mașină sau achiți anticipat un credit, actualizează starea în AiX OS pentru a menține scorul de risc precis.
- **Folosește Simulatorul:** Înainte de a lua orice decizie financiară majoră (ex: cumpărarea unei noi case), rulează scenariul în AiX OS.

<div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 my-8">
  <h4 class="font-bold text-emerald-800 mb-2 flex items-center gap-2">💡 Tip AiX</h4>
  <p class="text-emerald-700">Sincronizează calendarele de reînnoire ale polițelor tale. AiX OS îți va permite să negociezi oferte mai bune de reînnoire, având timp suficient înainte de expirarea poliței curente.</p>
</div>

## Avertismente

- **Securitatea Datelor:** Nu partaja niciodată datele de logare ale contului tău AiX OS. Deși sistemul folosește criptare bancară, securitatea parolei tale este esențială.
- **Nu Înlocuiește Sfaturile Legale:** AiX OS îți dă matematica și direcția, dar execuția structurilor juridice complexe (trust-uri, fundații) trebuie făcută alături de experți legali.

## Întrebări Frecvente (FAQ)

**1. Cât de sigure sunt datele mele în AiX OS?**
Folosim protocoale de securitate la standarde militare și criptare End-to-End. Datele tale financiare nu sunt vândute niciodată terților.

**2. Pot folosi AiX OS dacă am venituri mici?**
Da. Disciplina financiară începe de la primul salariu. Maparea datoriilor (credite de consum) și crearea unui fond de urgență sunt primii pași în ecosistem.

**3. Cum se diferențiază de aplicațiile bancare obișnuite?**
Aplicația băncii îți arată doar ce se întâmplă la acea bancă. AiX OS este "Agnostic" – consolidează informații de la toate instituțiile, asiguratorii și din piața imobiliară.

## Sumar

AiX OS este mai mult decât un soft; este un consultant financiar digital care lucrează 24/7. Te ajută să treci de la decizii financiare reactive, bazate pe stres, la o arhitectură financiară proactivă și invincibilă.

## Call to Action

Preia controlul asupra viitorului tău financiar. Creează-ți astăzi profilul AiX OS și descoperă care este Scor-ul tău de Protecție.
`;

const generateRcaContent = () => `
## Introducere: De ce RCA-ul nu este doar "o taxă pe mașină"

Asigurarea de Răspundere Civilă Auto (RCA) este obligatorie prin lege, ceea ce a creat, din păcate, o percepție greșită în rândul șoferilor: aceea că RCA-ul este o simplă "taxă" pe care trebuie să o plătești ca să nu primești amendă de la poliție. Această mentalitate duce la decizii financiare catastrofale, cum ar fi alegerea constantă a celui mai ieftin asigurator de pe piață, fără a înțelege riscurile.

În realitate, RCA-ul este un scut financiar imens. El preia răspunderea ta legală pentru daunele (materiale sau vătămări corporale) pe care le provoci altora dintr-o greșeală în trafic.

## Ce este RCA și cum funcționează?

RCA-ul despăgubește terțul prejudiciat. Dacă tu lovești o mașină din spate, polița ta RCA va plăti reparația mașinii celuilalt șofer. Limitele de despăgubire sunt enorme, stabilite la nivel european: milioane de euro pentru vătămări corporale și peste un milion de euro pentru daune materiale.

De ce contează la cine îți faci RCA dacă el plătește pe altul? Pentru că, în caz de accident grav, dacă asiguratorul tău este rău-platnic sau dă faliment, terțul prejudiciat (victima) te poate da în judecată direct pe TINE pentru recuperarea daunelor!

## Decontarea Directă: Revoluția RCA-ului

Cea mai importantă clauză pe care trebuie să o adaugi poliței tale RCA este "Decontarea Directă". 

### Ce este Decontarea Directă?
Fără ea, dacă cineva te lovește pe tine, trebuie să îți repari mașina pe polița LUI RCA (și să te rogi să aibă un asigurator bun). 
CU Decontarea Directă, dacă ești lovit, mergi la PROPRIUL tău asigurator RCA, îi prezinți constatarea amiabilă, el îți repară mașina imediat, și apoi asiguratorul tău se va "lupta" cu asiguratorul vinovatului pentru a recupera banii.

### De ce este vitală?
Îți cumperi, practic, servicii de asistență și reparație de la asiguratorul tău, protejându-te de calitatea slabă a asigurării celui care te-a lovit. Costa infim (de obicei 100-200 RON pe an), dar îți salvează mii de euro și luni de stres.

## Sistemul Bonus-Malus

Acesta este sistemul prin care asiguratorii te recompensează sau te penalizează în funcție de comportamentul tău în trafic.

- **Bonus (B0 la B8):** Dacă nu ai daune, în fiecare an urci o clasă de Bonus. Fiecare clasă reduce prețul poliței. Clasa maximă (B8) îți aduce o reducere de 50% din tariful de bază.
- **Malus (M1 la M8):** Dacă provoci un accident, ești penalizat cu 2 clase (ex: din B4 cazi în B2). Dacă ai daune multiple, intri în clasele M, ceea ce înseamnă majorări uriașe ale prețului (până la +80%).

## Exemple Practice: Greșeli Frecvente

- **Cazul "Cel mai ieftin asigurator":** Un client a refuzat Decontarea Directă pentru a economisi 150 RON. A fost lovit de un șofer asigurat la o companie în dificultate financiară. Reparația de 4000 EUR a fost aprobată după 6 luni, timp în care mașina a stat în service. Dacă ar fi avut Decontarea Directă la un asigurator premium, mașina ar fi fost gata în 2 săptămâni.
- **Cazul "Amiabila Completată Greșit":** După o tamponare, șoferii au completat amiabila fără a face schița clară a direcției de deplasare. Asiguratorul a dat "Culpă Comună" (50/50), ceea ce a însemnat că ambii și-au pierdut clasele de Bonus, iar despăgubirile au fost înjumătățite.

## Sfaturi pentru RCA

- **Alege Asiguratori de Top (Tier 1):** Mai ales dacă iei Decontarea Directă. Vrei să te repari pe polița ta RCA la fel de rapid ca pe CASCO.
- **Fă poze la locul accidentului:** Înainte de a muta mașinile, fotografiază poziția lor, semnele de circulație din zonă și daunele vizibile.
- **Completează Formularul Corect:** Asigură-te că ambele părți au semnat și că datele sunt lizibile.

<div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
  <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">💡 Tip AiX</h4>
  <p class="text-blue-700">Dacă vinzi mașina înainte de expirarea poliței RCA, poți cere returnarea primei (banilor) pentru lunile rămase, trimițând asiguratorului contractul de vânzare-cumpărare și radierea fiscală.</p>
</div>

## Avertismente

- **Conducerea sub Influența Alcoolului:** Dacă provoci un accident beat sau fără permis, asiguratorul RCA va despăgubi victima, dar va veni cu "Acțiune în Regres" împotriva ta. Adică te va executa silit pentru a-și recupera absolut toți banii plătiți.
- **Nesemnalizarea Daunei în 24h:** Legea impune anunțarea asiguratorului sau a Poliției în termen scurt. Întârzierile nejustificate pot duce la investigații antifraudă și refuzul plății.

## Întrebări Frecvente (FAQ)

**1. Trebuie să am RCA fizic (hârtie)?**
Nu, este suficient să ai polița în format digital (PDF pe telefon) conform reglementărilor actuale din România.

**2. RCA-ul acoperă furtul mașinii mele?**
Sub nicio formă. RCA despăgubește doar daunele făcute altora. Pentru furt, fenomene naturale sau avarii proprii, ai nevoie de CASCO.

**3. Ce se întâmplă dacă sunt lovit de un șofer fără RCA?**
Vei fi despăgubit de BAAR (Biroul Asigurătorilor de Autovehicule din România) din Fondul de Protecție a Victimelor Străzii, dar procesul este greoi. Iarăși, dacă ai CASCO, scapi de acest stres.

## Sumar

RCA-ul nu trebuie privit ca o taxă, ci ca pe o responsabilitate socială și un scut de protecție împotriva ruinării financiare. Împreună cu Decontarea Directă, devine un instrument cu adevărat util pentru tine.

## Call to Action

Verifică clasa ta de Bonus-Malus și solicită o cotație RCA + Decontare Directă la asiguratorii premium recomandați de AiX OS.
`;

const generatePatrimoniuContent = () => `
## Introducere: De la Câștig la Păstrare

Construirea averii este doar jumătate din ecuație. A doua jumătate, mult mai complexă și adesea ignorată în România, este protejarea, conservarea și transferul acestei averi. "Asset Protection" (Protejarea Patrimoniului) nu este doar pentru miliardari; este esențială pentru orice antreprenor, profesionist (medic, arhitect) sau investitor care dorește să își asigure moștenirea financiară împotriva litigiilor, divorțurilor, falimentelor comerciale sau taxelor excesive.

## Ce este Protejarea Patrimoniului?

Protejarea patrimoniului reprezintă implementarea de strategii juridice și financiare preemptive (înainte de apariția unei probleme) pentru a separa activele personale de riscurile de business sau profesionale. Scopul nu este evaziunea fiscală sau ascunderea banilor de creditori legitimi (ceea ce constituie infracțiune), ci folosirea legii pentru a construi bariere ("firewalls") în jurul averii tale.

## De ce contează în România?

- **Răspunderea Administratorului:** Mulți antreprenori români cred că forma "S.R.L." (Societate cu Răspundere Limitată) le protejează casa și mașina personală în caz de faliment. Greșit! În caz de insolvență din culpă (ex: management defectuos, neplata taxelor la stat), ANAF-ul sau creditorii pot atrage răspunderea personală a administratorului, executându-i averea privată.
- **Răspunderea Profesională (Malpraxis):** Un chirurg sau un inginer proiectant riscă procese civile de milioane de euro pentru o eroare umană. Dacă asigurarea de malpraxis nu acoperă întreaga sumă, activele lor personale sunt în pericol.
- **Vulnerabilitatea Succesorală:** Fără o planificare corectă, decesul "capului familiei" poate lăsa conturile blocate, partenerii de afaceri preluând controlul companiei, și moștenitorii sfâșiindu-se în procese civile ani de zile.

## Structuri de Bază în Asset Protection

### 1. Separarea Entităților (The Corporate Firewall)
Niciodată nu trebuie să deții activele valoroase (clădiri, echipamente, patente) pe aceeași companie care desfășoară activitatea operațională și care încheie contractele (cea expusă la litigii). Se folosește o structură "Holding - Operațional". Compania Operațională închiriază activele de la Compania Holding. Dacă Operaționalul dă faliment, creditorii nu pot atinge clădirile din Holding.

### 2. Asigurările "Umbrelă" și D&O
Asigurarea "Directors & Officers" (D&O) preia răspunderea civilă a administratorului. Asigurările profesionale de malpraxis și cele generale de răspundere (CGL) sunt prima linie de apărare. Nu poți proteja eficient activele fără a avea "scutul" asigurărilor activat.

### 3. Divizarea Patrimonială Matrimonială
În România, regimul implicit este "comunitatea legală de bunuri". Dacă unul dintre soți este antreprenor cu riscuri mari, contractul prenupțial sau convenția matrimonială de "separație de bunuri" este vitală pentru a proteja jumătatea de avere a soțului neimplicat în afaceri de creditorii firmei.

### 4. Instrumente de Transfer Succesoral
- **Asigurarea de viață de risc pur:** Asigură lichiditate imediată familiei, nefiind supusă masei succesorale (nu se împarte, merge direct la beneficiarul desemnat).
- **Testamente și Planificări:** Folosirea mandatelor "post-mortem" sau a clauzelor specifice în statutele companiilor (clauze de preempțiune la decesul asociatului).

## Exemple Practice: Cum se pierd averile

- **Cazul "Garantării în Nume Personal":** Un antreprenor a luat un credit pe firmă, dar banca i-a cerut "bilet la ordin avalizat în nume personal". Când firma a intrat în insolvență din cauza pieței, banca l-a executat silit pe persoană fizică, luându-i casele de vacanță pe care le acumulase în 10 ani.
- **Cazul "Moștenirii Blocate":** Un investitor cu conturi de brokeraj mari în străinătate a decedat fără testament. Familia a trebuit să angajeze avocați internaționali, plătind taxe succesorale externe uriașe, și a durat 3 ani până au avut acces la lichidități.

## Sfaturi pentru Protejarea Patrimoniului

- **Acționează devreme:** Strategiile de protecție trebuie create "pe timp de pace". Orice transfer de active făcut "pe timp de război" (după ce ai fost dat în judecată sau ai datorii la Fisc) va fi anulat în instanță ca fiind "acțiune pauliană" sau "fraudare a creditorilor".
- **Diversificare jurisdicțională:** Nu ține toți banii într-o singură țară, într-o singură valută și la o singură bancă.
- **Păstrează confidențialitatea:** Nu îți expune valoarea netă public. Discreția este prima formă de protecție.

<div class="bg-rose-50 p-6 rounded-2xl border border-rose-100 my-8">
  <h4 class="font-bold text-rose-800 mb-2 flex items-center gap-2">⚠️ Avertisment</h4>
  <p class="text-rose-700">Evitați soluțiile miraculoase vândute pe internet de tip "Firme Offshore în Seychelles" fără o consultanță fiscală serioasă. Regulile anti-evaziune s-au înăsprit masiv (ex: CRS, FATCA), iar ascunderea activelor nedeclarate vă expune la dosare penale.</p>
</div>

## Întrebări Frecvente (FAQ)

**1. Ce este un Trust? Se aplică în România?**
România a implementat în Codul Civil instituția "Fiduciei" (echivalentul latin al Trust-ului anglo-saxon). Poți transfera activele tale către un Fiduciar, care le administrează în folosul unor beneficiari (ex: copiii tăi), izolându-le de riscurile tale personale.

**2. Fundația Privată este o soluție bună?**
Da, în anumite jurisdicții europene (Liechtenstein, Austria), fundațiile de familie sunt excelente pentru protecție inter-generațională, dar necesită un patrimoniu de minimum câteva milioane de euro pentru a justifica costurile de administrare.

**3. Asigurările Unit-Linked protejează de executare silită?**
Da. În legislația din România, polițele de asigurare de viață (inclusiv cele cu componentă investițională) nu pot fi urmărite silit (sechestrate) de creditori pe parcursul acumulării, oferind un grad ridicat de protecție a capitalului.

## Sumar

Protejarea patrimoniului este arta de a controla totul fără a deține, în mod direct și vulnerabil, nimic pe persoană fizică expusă. Soluțiile hibride (Holdinguri, Asigurări, Fiducie) creează un scut indestructibil în fața incertitudinii.

## Call to Action

Programează un "Audit de Vulnerabilitate Patrimonială" cu echipa AiX OS și protejează-ți munca de o viață înainte să fie prea târziu.
`;

const generateIndependentaContent = () => `
## Introducere: Mitul Pensionării la 65 de Ani

Societatea modernă ne învață un singur traseu: învață, muncește 40 de ani, economisește (dacă poți) și pensionează-te la 65 de ani cu o pensie de stat care abia acoperă medicamentele. Acest model este depășit matematic și demografic. Independența Financiară (Financial Independence / FIRE) nu înseamnă să devii miliardar, ci să ajungi în punctul în care venitul tău pasiv (generat de active) depășește cheltuielile tale de trai. Din acel moment, munca devine o opțiune, nu o obligație.

## Ce este Independența Financiară?

Independența financiară este starea în care capitalul tău lucrează pentru tine mai eficient decât lucrezi tu pentru capital. Este rezultatul a trei piloni fundamentali:
1.  **Reducerea Ratei de Cheltuieli** (Traiul sub posibilități).
2.  **Maximizarea Veniturilor** (Scalarea carierei sau business-ului).
3.  **Investițiile Compuse** (Plasarea diferenței în active producătoare de valoare).

## Regula de 4% (The 4% Rule)

Câți bani îți trebuie pentru a fi liber financiar? Regula de 4% (cunoscută din Studiul Trinity) este busola. Această regulă spune că poți retrage, ajustat la inflație, 4% din portofoliul tău de investiții diversificat în fiecare an, fără a epuiza capitalul timp de cel puțin 30 de ani.

**Calculul "Numărului Tău":**
Cheltuielile tale anuale estimate × 25 = Suma de care ai nevoie.

*Exemplu:* Dacă ai nevoie de 2000 EUR pe lună pentru a trăi bine (24.000 EUR/an), "Numărul Tău" pentru independență financiară este: 24.000 × 25 = **600.000 EUR**.
Dacă ai 600.000 EUR investiți în indici bursieri și imobiliare, ei vor genera suficient (din dobânzi, dividende și apreciere) pentru a-ți susține stilul de viață la nesfârșit.

## Etapele Construirii Averii

### 1. Fondul de Siguranță (Urgență)
Primul pas. Nu investești niciun leu până nu ai echivalentul a 3-6 luni de cheltuieli într-un depozit bancar lichid sau titluri de stat pe termen scurt. Acesta este scutul tău împotriva concedierilor, urgențelor medicale majore sau reparațiilor auto masive. Te previne din a vinde activele în pierdere când ai nevoie urgentă de cash.

### 2. Eliminarea Datoriilor "Toxice"
Creditele de consum (cu dobânzi de 10-15%) și cardurile de credit (dobânzi de >20%) sunt "hemoragii financiare". Nicio investiție sigură nu îți va aduce constant un randament mai mare decât dobânda pe care o plătești la cardul de credit. Achită-le folosind metoda "Avalanșei" (dobânda cea mai mare prima) sau "Bulgărelui de Zăpadă" (soldul cel mai mic primul).

### 3. Magia Dobânzii Compuse (Albert Einstein: "A 8-a minune a lumii")
Dacă investești 300 EUR pe lună, timp de 30 de ani, la un randament mediu istoric al pieței de 8% pe an:
- Suma investită de tine: 108.000 EUR
- Valoarea portofoliului la final: **447.000 EUR**
Diferența de peste 330.000 EUR este dobânda compusă (câștigul generat de câștigurile anterioare). Secretul aici nu este suma, ci **Timpul**.

### 4. Diversificarea (Asset Allocation)
Nu pune toate ouăle în același coș:
- **Bursa (Acțiuni/ETF-uri):** Oferă cel mai mare randament pe termen lung, dar cu volatilitate ridicată. Se recomandă ETF-uri globale (S&P 500, MSCI World).
- **Imobiliare (Real Estate):** Oferă cash-flow constant și protecție anti-inflație.
- **Titluri de Stat / Obligațiuni:** Oferă siguranță și volatilitate redusă.

## Exemple Practice: Cum eșuează planurile

- **Inflația Stilului de Viață (Lifestyle Creep):** Primești o mărire de salariu de 500 EUR, te muți la o casă mai mare (rată mai mare cu 300 EUR) și iei o mașină nouă (leasing de 200 EUR). Deși câștigi mai mult, economisești exact zero. Capacitatea ta de a ajunge independent financiar stagnează.
- **Specula în loc de Investiție:** "Cumpăr crypto obscura X pentru că sigur crește 1000%". Aceasta este loterie, nu investiție. Banii destinați libertății financiare pe termen lung nu se joacă la cazino.

## Sfaturi pentru Optimizare

- **Plătește-te pe tine primul:** Automatizează economisirea. În ziua de salariu, 20% merg automat în contul de investiții. Trăiești cu restul. Dacă aștepți la finalul lunii să vezi ce "mai rămâne", nu va mai rămâne nimic.
- **Folosește scuturile fiscale:** În România, pilonul 3 (pensia privată facultativă) este parțial deductibil, iar asigurările Unit-Linked cu componentă de viață au anumite scutiri de impozit la ieșire. Titlurile de stat sunt 100% neimpozabile.

<div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
  <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">💡 Tip AiX</h4>
  <p class="text-blue-700">Evită mentalitatea "Get Rich Quick". Focusul trebuie să fie pe "Get Rich For Sure". Consistența bate întotdeauna momentul intrării în piață (Time in the market beats timing the market).</p>
</div>

## Avertismente

- **Frica de Volatilitate:** Piețele financiare se prăbușesc periodic (2000, 2008, 2020). Este un ciclu natural. Cei care vând în panică pierd. Cei care continuă să investească constant cumpără active "la reducere".
- **Inflația este Inamicul Tăcut:** Dacă ții 100.000 EUR cash "la saltea" timp de 10 ani cu o inflație medie de 5%, puterea ta reală de cumpărare scade la 60.000 EUR. Siguranța absolută a cash-ului este, de fapt, pierdere garantată.

## Întrebări Frecvente (FAQ)

**1. Ce este un ETF?**
Exchange Traded Fund. Un coș cu sute de acțiuni ale celor mai mari companii. Cumpărând o unitate de fond, investești instantaneu în toată economia globală sau americană, eliminând riscul ca o singură firmă să dea faliment.

**2. Cât la sută din venit ar trebui să economisesc?**
Minimum 15-20%. Dacă dorești să accelerezi spre FIRE (Financial Independence, Retire Early), procentul trebuie să depășească 30-40%.

**3. Cum mă ajută polița de viață în acest plan?**
Polița de viață îți protejează "Numărul Tău". Dacă ai acumulat 100.000 EUR dar mori mâine, ai ratat targetul de 600.000 EUR pentru familia ta. Polița de risc acoperă "gap-ul" de 500.000 EUR imediat.

## Sumar

Independența financiară este un maraton matematic, nu un sprint norocos. Cunoaște-ți cifrele, controlează-ți comportamentul consumist și folosește inteligent dobânda compusă.

## Call to Action

Calculează-ți "Numărul" folosind AiX Simulator și creează-ți azi arhitectura de investiții recurente prin platforma noastră.
`;

const generateAchizitieLocuintaContent = () => `
## Introducere: Cea mai mare decizie financiară

Cumpărarea unei locuințe este un proces emoțional, dar consecințele sunt pur financiare și te vor însoți timp de 20-30 de ani. Majoritatea oamenilor petrec mai mult timp analizând ce televizor să cumpere decât actele casei pentru care se îndatorează o viață. 

Acest ghid detaliază pașii critici, capcanele juridice și calculele financiare pe care trebuie să le stăpânești ÎNAINTE de a semna la notar.

## Etapa 1: Calibrarea Financiară (Bugetul Real)

### Regula de Aur: Gradul de Îndatorare
Băncile permit un grad maxim de îndatorare de 40% din veniturile nete lunare. Noi recomandăm ca rata să nu depășească **30%** (ideal 25%) din venitul cumulat al familiei. O dobândă variabilă poate crește (IRCC/ROBOR), transformând o rată suportabilă într-un coșmar financiar.

### Costurile Ascunse ale Achiziției
Avansul de 15% nu este singurul efort financiar. Trebuie să ai cash pentru:
1.  **Taxe Notariale și Înscrierea la Cartea Funciară:** Aprox. 1.5% - 2% din valoarea proprietății.
2.  **Taxe Bancare:** Evaluarea imobilului (100-200 EUR), analiza dosarului.
3.  **Renovare și Mobilare:** Minim 10-15% din valoarea de achiziție, chiar și pentru finisaje "la cheie" (bucătării, electrocasnice).
4.  **Fondul de Urgență al Proprietarului:** Trebuie să mai ai 3 rate salvate deoparte + bani de urgențe majore (centrală defectă).

## Etapa 2: Căutarea și Analiza Zonei

**"Location, Location, Location"**
Poți schimba faianța, dar nu poți schimba vecinii sau distanța față de metrou.
- **Verifică PUG/PUZ (Planurile de Urbanism):** Acel teren liber de lângă blocul tău de 4 etaje are aviz pentru un zgârie-nori care îți va bloca soarele? Du-te la Primărie și verifică.
- **Infrastructura "la pas":** Nu crede agentul care spune "5 minute de metrou". Fă traseul la ora 8:00 dimineața pe jos. E noroi? E lipsă de trotuar?

## Etapa 3: Inspecția Tehnică (Vicii Ascunse)

Nu cumpăra pe baza zugrăvelii proaspete.
1.  **Imobile Vechi (Înainte de 1990):** Atenție masivă la instalația electrică (fire de aluminiu care trebuie înlocuite obligatoriu) și la instalația sanitară. Verifică risc seismic (Bulina Roșie interzice creditarea bancară).
2.  **Imobile Noi:** Verifică izolația fonică. Pune pe cineva să meargă în apartamentul de deasupra. Verifică presiunea apei la etajele superioare. Cere Cartea Tehnică a Construcției și verifică calitatea betonului (raport diriginte șantier).
3.  **Ultimul etaj și parterul:** Verifică infiltrațiile pe tavan, respectiv umezeala și izolația slabă din subsol.

## Etapa 4: Auditul Juridic (Actele Proprietății)

Acesta este pasul unde notarii și băncile ajută, dar nu te protejează complet.

- **Extrasul de Carte Funciară:** Trebuie să fie "Liber de Sarcini" (fără ipoteci, executări, litigii în instanță). Dacă există sarcini, ele trebuie radiate înaintea sau la momentul achiziției.
- **Releveul (Schița):** Corespunde schița cu realitatea? Dacă proprietarul a dărâmat un perete "de rezistență" fără autorizație, banca NU va acorda creditul, iar tu preiei o ilegalitate.
- **Istoricul Dobândirilor:** A fost cumpărat prin Legea 112 (case naționalizate)? Riscurile de revendicare de la foștii proprietari pot fi uriașe pe termen lung. Cere avizul unui avocat.

## Etapa 5: Structura de Finanțare (Creditul)

- **Avansul:** Cu cât avansul este mai mare, cu atât costul total al creditului scade exponențial.
- **Dobândă Fixă vs. Variabilă:** Pe perioade de dobânzi mari în piață, o ofertă cu dobândă fixă pe primii 3-5 ani te protejează de șocuri. Refinanțarea este mereu o opțiune când piața se calmează.
- **Asigurarea de Viață pentru Credit:** Banca te va obliga. Soluția inteligentă: Nu o face prin bancă! Polițele de bancă acoperă de obicei doar soldul creditului (scade an de an). Fa-ți o poliță externă, la valoarea inițială, cesionează partea băncii, iar restul merge la familia ta.

<div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 my-8">
  <h4 class="font-bold text-amber-800 mb-2 flex items-center gap-2">⚠️ Avertisment: Antecontractul la Faza de Proiect</h4>
  <p class="text-amber-700">Dacă cumperi într-un bloc "pe hârtie" (off-plan), NU DA AVANSURI MASIVE (ex: 50%-90%) pentru "un discount", decât dacă dezvoltatorul are un cont "Escrow". Dacă firma dezvoltatorului dă faliment, devii un simplu creditor chirografar și îți pierzi banii.</p>
</div>

## Etapa 6: Asigurarea Locuinței și PAD

Imediat după semnarea Contractului de Vânzare-Cumpărare, devii proprietar. Ce faci dacă a doua zi, la mutare, spargi o țeavă și inunzi 4 etaje sub tine?
1.  **PAD (Asigurarea Obligatorie):** Acoperă doar 20.000 EUR pentru Dezastre (Cutremur, Inundație naturală, Alunecare Teren). Atât.
2.  **Polița Facultativă All-Risk:** Obligatorie! Acoperă incendiul, explozia (și din vecini), inundația de la conducte, furtul, și, cel mai important, Răspunderea Civilă față de Terți (dacă tu îți inunzi vecinul de jos, asiguratorul plătește renovarea lui).

## Întrebări Frecvente (FAQ)

**1. Să aștept să "scadă prețurile"?**
Nimeni nu poate anticipa piața. Dacă ai nevoie de o casă pentru locuit pe termen lung (10+ ani) și rata îți permite să economisești în continuare, "timing-ul" contează mult mai puțin.

**2. Ce este DAE?**
Dobânda Anuală Efectivă. Este costul TOTAL al creditului, incluzând dobânda și toate comisioanele băncii. Compară ofertele băncilor exclusiv uitându-te la DAE, nu la dobânda nominală.

**3. Am nevoie de agent imobiliar?**
Nu obligatoriu, dar un agent de Reprezentare Exclusivă a Cumpărătorului (cum oferim prin serviciul Home Find) te scutește de negocieri proaste și capcane juridice, economisindu-ți mii de euro.

## Sumar

Achiziția imobiliară trebuie să fie 90% logică și matematică și doar 10% emoție. Verifică actele, calculează stresul bancar pe dobândă maximă și asigură imediat activul la valoarea reală.

## Call to Action

Înainte să dai un avans pentru o casă, descarcă "Checklist-ul de Inspecție Imobiliară AiX" din secțiunea Resurse sau programează o consultanță cu echipa Home Find.
`;

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
    content: generateHomeFindContent()
  },
  {
    slug: "ce-este-aix-os",
    title: "Ce este AiX OS: Ecosistemul Tău Financiar Inteligent",
    category: "AiX OS",
    readTime: "6 min",
    difficulty: "Începător",
    excerpt: "Află cum sistemul nostru de inteligență artificială interconectează activele tale, asigurările și planurile de viitor într-un singur loc.",
    content: generateAixOsContent()
  },
  {
    slug: "ghid-rca-complet",
    title: "Tot ce trebuie să știi despre RCA și decontarea directă",
    category: "Asigurări",
    readTime: "7 min",
    difficulty: "Începător",
    excerpt: "Ghidul suprem al șoferului român. Ce înseamnă decontarea directă, clasa Bonus Malus și cum să procedezi în caz de daună.",
    content: generateRcaContent()
  },
  {
    slug: "protejarea-patrimoniului-romania",
    title: "Protejarea patrimoniului în România",
    category: "Financial Planning",
    readTime: "14 min",
    difficulty: "Avansat",
    excerpt: "O analiză aprofundată a legislației, instrumentelor de protecție (trust-uri, fundații) și transferului averii inter-generațional.",
    content: generatePatrimoniuContent()
  },
  {
    slug: "independenta-financiara",
    title: "Cum îți construiești independența financiară",
    category: "Investiții",
    readTime: "11 min",
    difficulty: "Intermediar",
    excerpt: "Regula de 4%, importanța fondului de urgență și puterea dobânzii compuse explicate pe înțelesul tuturor.",
    content: generateIndependentaContent()
  },
  {
    slug: "ghid-cumparare-locuinta",
    title: "Ghid complet pentru cumpărarea unei locuințe",
    category: "Real Estate",
    readTime: "15 min",
    difficulty: "Intermediar",
    excerpt: "De la vizionare până la actele notariale. Cum să verifici constructorul și ce trebuie să asiguri chiar din prima zi.",
    content: generateAchizitieLocuintaContent()
  }
];

export const getAllArticles = (): Article[] => {
  return defaultArticles;
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return defaultArticles.find(a => a.slug === slug);
};
