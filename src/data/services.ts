export type ServiceContent = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  problemSolved: string;
  whoItsFor: string;
  whyCare: string;
  benefits: { title: string; description: string }[];
  timeMoneySaved: string;
  risksRemoved: string[];
  urgency: string;
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
    problemSolved: "Problema majoră pe care o rezolvă este riscul ca familia ta să moștenească datoriile tale în loc de active, sau să nu poată menține un nivel de trai decent după venitul tău dispare. Fără asigurare, un deces prematur poate duce la pierderea casei (prin neplata creditului), întreruperea studiilor copiilor și colapsul financiar al celor rămași în urmă.",
    whoItsFor: "Este esențială pentru părinți și tineri familiști cu persoane în întreținere, persoane cu credite ipotecare mari sau alte datorii majore, și oricine dorește să lase o moștenire garantată. De asemenea, este crucială pentru antreprenori care vor să protejeze afacerea și familia în același timp.",
    whyCare: "Fără această protecție, dispariția ta financiară poate distruge viața celor dragi. Statistic, 60% dintre familii românești nu pot susține cheltuielile curente mai mult de 3 luni după pierderea venitului principal. Asigurarea de viață transformă această tragedie într-o situație gestionabilă, permițând familiei să își continue viața fără presiune financiară.",
    benefits: [
      { title: "Securitate garantată", description: "Suma asigurată stabilită este garantată prin contract și ajunge rapid la beneficiari, de obicei în 5-10 zile lucrătoare." },
      { title: "Flexibilitate a primelor", description: "Plata se poate face lunar, trimestrial, semestrial sau anual, adaptată bugetului tău." },
      { title: "Independență de taxe", description: "Indemnizația de asigurare de viață nu este, în general, impozabilă, beneficiarii primesc suma integrală." },
      { title: "Stingerea automată a creditelor", description: "Poți configura polița să plătească direct băncii soldul creditului ipotecar în caz de deces." }
    ],
    timeMoneySaved: "O primă lunară de 30-80 EUR poate proteja un capital de 150.000-300.000 EUR. Raportul este de 1:3000 - cea mai eficientă formă de protecție financiară. Economisești timp prin evitarea procedurilor bancare complicate pentru moștenitori și economisești bani prin evitarea costurilor de avocat și litigii.",
    risksRemoved: [
      "Riscul ca familia să piardă casa din cauza neplății creditului ipotecar",
      "Riscul ca studiile copiilor să fie întrerupte din lipsă de fonduri",
      "Riscul ca partenerul să nu poată susține cheltuielile curente",
      "Riscul ca afacerea să fie distrusă de lipsa fondurilor de continuitate",
      "Riscul ca moștenirea să devină o povară fiscală în loc de un activ"
    ],
    urgency: "Acum. Cu fiecare an care trece, primele cresc cu 8-12%. Între 25-35 de ani este momentul optim pentru a obține cele mai mici rate. Așteptarea nu doar crește costul, ci și crește riscul medical de a nu mai fi eligibil pentru anumite clauze.",
    practicalExamples: [
      { title: "Protecția Familiei", description: "Un tată de familie de 35 de ani cu credit ipotecar de 120.000 EUR și 2 copii suferă un infarct fatal. Polița de viață de 200.000 EUR plătește familiei capitalul, care achită creditul casei și finanțează facultatea copiilor. Fără poliță, familia ar fi pierdut casa și ar fi intrat în faliment personal." },
      { title: "Protecția Afacerii", description: "Un antreprenor de 45 de ani cu o firmă de 500.000 EUR anual are o poliță de viață de 500.000 EUR. În caz de deces, banii permit familiei să vândă afacerea din poziție de forță, nu de disperare, și să mențină stilul de viață." }
    ],
    whyGenerali: [
      "Peste 190 de ani de experiență mondială în plata daunelor - garantat plătesc.",
      "Stabilitate financiară recunoscută la nivel global (rating A+ de la agențiile internaționale).",
      "Rețea de asistență rapidă și lichidități imense pentru plata rapidă a daunelor."
    ],
    faqs: [
      { q: "Când este momentul ideal pentru a o încheia?", a: "Cât mai devreme. Persoanele tinere și sănătoase primesc cote mult mai avantajoase. Între 25-35 de ani este momentul optim." },
      { q: "Banii se întorc dacă nu pățesc nimic?", a: "Polița standard este de risc, însă poți opta pentru o poliță de viață cu componentă de economisire (capitalizare), caz în care banii se întorc la maturitate cu randament." },
      { q: "Ce se întâmplă dacă schimb jobul sau venitul meu?", a: "Polița rămâne valabilă indiferent de schimbările de venit sau ocupație. Poți ajusta suma asigurată ulterior dacă dorești." }
    ],
    iconName: "Heart"
  },
  "health-insurance": {
    id: "health-insurance",
    slug: "health-insurance",
    title: "Asigurări de Sănătate",
    shortDescription: "Acces direct și rapid în clinicile și spitalele private de top.",
    longDescription: "Sănătatea nu este negociabilă. Pachetele noastre de asigurare de sănătate private decontează cheltuielile majore și minore, oferindu-ți acces instant la excelența medicală privată.",
    problemSolved: "Problema majoră pe care o rezolvă este timpul pierdut în sistemul public de sănătate - liste de așteptare de luni de zile, proceduri amânate și diagnosticare întârziată. Fără asigurare privată, o afecțiune care ar putea fi tratată rapid poate evolua într-o problemă gravă din cauza întârzierilor.",
    whoItsFor: "Este ideală pentru oricine își permite și își dorește servicii medicale la standarde occidentale, familii cu copii (pachetele familiale acoperă bolile copilăriei), și freelanceri sau antreprenori care nu au pachete de beneficii corporate.",
    whyCare: "Timpul înseamnă viață în caz de afecțiuni medicale. Listele de așteptare în sistemul public pot dura 6-12 luni pentru investigații complexe. Asigurarea privată îți permite să ocolești aceste bariere și să primești expertiză de la medici de elită exact când ai nevoie, crescând șansele de vindecare rapidă.",
    benefits: [
      { title: "Fără cozi", description: "Programare telefonică sau prin aplicație direct la specialist, de obicei în 24-48 de ore." },
      { title: "Spitalizare de lux", description: "Acoperirea costurilor pentru intervenții complexe și condiții de internare premium (rezervă single/double)." },
      { title: "Acoperire internațională", description: "Opțional, tratamente efectuate la clinici renumite din străinătate cu repatriere medicală inclusă." },
      { title: "A doua opinie medicală", description: "Acces la opinii de la clinici internaționale (SUA, Austria) pentru cazuri complexe." }
    ],
    timeMoneySaved: "O primă lunară de 50-150 EUR poate acoperi cheltuieli medicale de zeci de mii de euro. Economisești timp prin evitarea listelor de așteptare (luni de zile) și economisești bani prin decontarea directă - nu plătești nimic la momentul serviciului medical.",
    risksRemoved: [
      "Riscul ca o afecțiune să evolueze din cauza întârzierilor de diagnosticare",
      "Riscul costurilor uriașe pentru tratamente în regim privat",
      "Riscul de a nu putea accesa medici specialiști la timp",
      "Riscul de a fi nevoit să aștepți luni de zile pentru investigații",
      "Riscul de a nu avea acces la tratamente moderne în sistemul public"
    ],
    urgency: "Acum. Sănătatea nu așteaptă. Un diagnostic corect la timp poate face diferența între tratament simplu și intervenție complexă. De asemenea, primele cresc cu vârsta - cu cât te înscrii mai tânăr, cu atât costul este mai mic pe viață.",
    practicalExamples: [
      { title: "Intervenție la ligamente", description: "În urma unui accident, clientul are nevoie de operație la genunchi. În sistemul public ar fi așteptat 4 luni. Cu asigurarea privată, a fost operat în 3 zile. Spitalul privat facturează 4.000 EUR, cost preluat integral și direct de asigurător." },
      { title: "Diagnostic rapid", description: "O pacientă suspectată de o afecțiune cardiacă primește RMN și consult cardiologic în 48 de ore prin asigurarea privată, față de 6 luni în sistemul public. Diagnosticul precoce permite tratament medicamentos în loc de intervenție chirurgicală." }
    ],
    whyGenerali: [
      "Parteneriate cu TOATE rețelele medicale majore (Regina Maria, Medlife, Sanador, Ponderas, etc.).",
      "Sistem de pre-aprobare digital rapid și eficient - aprobare în 30 minute.",
      "Decontare directă la parteneri - tu nu plătești nimic la momentul serviciului."
    ],
    faqs: [
      { q: "Pot merge la o clinică care nu e în rețeaua voastră?", a: "Da, plătești tu și trimiți factura către noi pentru decontare conform limitelor din contract." },
      { q: "Sunt acoperite afecțiunile preexistente?", a: "De regulă nu, sau sunt acoperite doar după o perioadă de așteptare stabilită contractual." },
      { q: "Ce se întâmplă dacă mă îmbolnăvesc în străinătate?", a: "Polițele internaționale acoperă tratamentul în străinătate și includ repatriere medicală dacă este necesar." }
    ],
    iconName: "Activity"
  },
  "auto-insurance": {
    id: "auto-insurance",
    slug: "auto-insurance",
    title: "Asigurări Auto",
    shortDescription: "Garanția All-Risk pentru autoturismul tău premium. Pachete complete RCA și CASCO.",
    longDescription: "Un autoturism de lux necesită siguranță la nivel de reprezentanță. Fie că discutăm despre o banală zgârietură în parcare, sau de o daună majoră provocată unui terț, protecția auto este indispensabilă.",
    problemSolved: "Problema majoră pe care o rezolvă este riscul pierderii mobilității și a investiției în vehicul. Un accident, furt sau fenomen natural poate lăsa fără mașină și cu costuri de reparație de mii sau zeci de mii de euro. Fără CASCO, o singură daună poate destabiliza bugetul familii.",
    whoItsFor: "Este esențială pentru posesori de vehicule premium sau relativ noi (sub 10 ani vechime), persoane cu vehicule în regim de Leasing (unde CASCO este obligatoriu), și orice șofer care are nevoie de mobilitate continuă și Decontare Directă.",
    whyCare: "Un autoturism modern are reparații extrem de scumpe - senzori radar, faruri LED, parbrize cu senzori pot costa mii de euro fiecare. O daună minoră (grindină, vandalism) poate costa 5.000-15.000 EUR. Fără protecție, aceste costuri ies direct din buzunarul tău.",
    benefits: [
      { title: "All-Risk CASCO", description: "Acoperă inclusiv greșelile proprii de șofat, vandalismul și fenomenele naturale." },
      { title: "Mașină la schimb", description: "Nu rămâi niciodată pieton. Acoperim costul unei mașini închiriate în caz de reparație." },
      { title: "Decontare Directă la RCA", description: "Dacă ești lovit, îți repari mașina pe propriul tău RCA, fără să aștepți după vinovat." },
      { title: "Reparații în reprezentanțe", description: "Doar piese originale și service-uri autorizate pentru mașini premium." }
    ],
    timeMoneySaved: "O primă anuală de 200-500 EUR poate proteja o investiție de 20.000-50.000 EUR. Economisești timp prin evaluări foto de la distanță (nu trebuie să mergi la service pentru constatare) și economisești bani prin reparații în service-uri autorizate la prețuri negociate.",
    risksRemoved: [
      "Riscul de a rămâne fără mașină în perioada reparației",
      "Riscul costurilor uriașe pentru piese și manoperă premium",
      "Riscul de a plăti pentru daune provocate de alții (fără RCA valid)",
      "Riscul pierderii vehiculului prin furt sau distrugere totală",
      "Riscul de a folosi piese neoriginale în reparații"
    ],
    urgency: "Acum. Riscul de accident sau daună este constant. Fără CASCO, ești expus 24/7 la costuri neprevăzute. De asemenea, mașinile mai noi beneficiază de rate mai avantajoase - cu cât mai veche mașina, cu atât CASCO devine mai scump.",
    practicalExamples: [
      { title: "Furtună violentă", description: "O furtună de vară cu grindină distruge plafonul și farurile mașinii. Cost reparație: 8.000 EUR. Fără CASCO, clientul plătește tot. Cu CASCO, reparația este acoperită integral, cu franșiză minimă." },
      { title: "Accident cu autor necunoscut", description: "Un șofer fără RCA valid te lovește și fuge. Fără Decontare Directă, ai aștepta luni de zile recuperarea banilor. Cu RCA cu Decontare Directă, mașina ta intră în reparație imediat, pe polița ta." }
    ],
    whyGenerali: [
      "Evaluări foto de la distanță pentru despăgubiri rapide - în 24-48 de ore.",
      "Reparații exclusiv în reprezentanțe autorizate, folosind doar piese originale.",
      "Generali este partenerul preferat al marilor branduri auto de prestigiu (BMW, Mercedes, Audi)."
    ],
    faqs: [
      { q: "Ce este Franșiza la CASCO?", a: "Este partea din daună pe care o suporți tu (ex: 100 EUR pe eveniment). Optând pentru o franșiză, costul anual al asigurării CASCO scade considerabil." },
      { q: "Beneficiez de reduceri dacă iau RCA și CASCO la Generali?", a: "Da, pachetele combinate generează bonificații atractive pe componenta de CASCO." },
      { q: "Ce se întâmplă dacă mașina este furată?", a: "CASCO acoperă furtul total. Primești despăgubirea la valoarea de piață a vehiculului, minus franșiza dacă este caz." }
    ],
    iconName: "Car"
  },
  "travel-insurance": {
    id: "travel-insurance",
    slug: "travel-insurance",
    title: "Asigurări Travel",
    shortDescription: "Liniște deplină oriunde călătorești, cu protecție medicală și storno premium.",
    longDescription: "Călătoriile internaționale trebuie să fie despre experiențe. Elimină riscul falimentului personal din cauza unei spitalizări de urgență în străinătate (ex. SUA/Elveția) prin polițele noastre de travel.",
    problemSolved: "Problema majoră pe care o rezolvă este riscul costurilor medicale exorbitante în străinătate. O spitalizare de urgență în SUA poate costa 50.000-100.000 USD, în Elveția 20.000-40.000 EUR. Fără asigurare, o singură călătorie poate duce la faliment personal.",
    whoItsFor: "Este obligatorie pentru oricine iese din țară (Business sau Leisure), esențială pentru familii care pleacă în vacanțe cu copiii, și crucială pentru pasionați de sporturi de agreement (schi, scufundări, drumeții) care au risc crescut de accident.",
    whyCare: "Sistemul de sănătate românesc nu acoperă tratamentele în străinătate. Fără asigurare travel, suporti 100% din costuri. O simplă apendicită în SUA poate costa 30.000 USD. O fractură pe pârtie în Austria, cu elicopter de salvare, poate depăși 15.000 EUR.",
    benefits: [
      { title: "Call Center 24/7", description: "Asistență în limba ta la orice oră din zi, oferită prin Europ Assistance - cel mai puternic grup de intervenție globală." },
      { title: "Acoperire COVID", description: "Boli infecțioase și carantină incluse standard în poliță." },
      { title: "Multi-Trip Anual", description: "Opțiune pentru a plăti o singură dată și a fi acoperit la toate ieșirile din acel an - mult mai eficient financiar." },
      { title: "Repatriere medicală", description: "Dacă nu poți fi tratat local, asigurarea acoperă transportul medical înapoi în România." }
    ],
    timeMoneySaved: "O poliță travel costă 20-50 EUR per călătorie sau 150-300 EUR anual pentru multi-trip. Economisești timp prin asistență 24/7 (nu trebuie să cauți spitale sau să traduci documente) și economisești zeci de mii de euro în caz de urgență medicală.",
    risksRemoved: [
      "Riscul costurilor medicale exorbitante în străinătate",
      "Riscul de a nu avea acces la asistență medicală în limba română",
      "Riscul pierderii banilor pentru bilete și cazare în caz de anulare",
      "Riscul de a fi blocat în străinătate fără fonduri pentru tratament",
      "Riscul de a nu putea fi repatriat în caz de afecțiune gravă"
    ],
    urgency: "Înainte de fiecare călătorie. Riscul este imediat - o călătorie fără asigurare este un joc cu noroc cu sănătatea și finanțele tale. Pentru multi-trip anual, momentul optim este începutul anului calendaristic.",
    practicalExamples: [
      { title: "Fractură pe pârtie", description: "Un turist român suferă o fractură la schi în Austria. Elicopterul de salvare intervine (5.000 EUR) + spitalizare (8.000 EUR). Totul e decontat direct prin centrala de asistență Generali, fără avansuri din partea turistului. Fără asigurare, costul total de 13.000 EUR ar fi fost suportat integral de client." },
      { title: "Anulare de ultim moment", description: "O familie de 4 persoane cu bilete de 3.000 EUR trebuie să anuleze vacanța din cauza unei spitalizări a copilului cu 2 zile înainte. Clauza Storno decontează integral biletelele și cazarea, salvând familia de pierderea a 5.000 EUR." }
    ],
    whyGenerali: [
      "Generali operează asistența prin rețeaua Europ Assistance, cel mai puternic grup de intervenție globală, aparținând tot grupului Generali.",
      "Aprobări rapide pentru proceduri scumpe în afara țării - în 30-60 minute.",
      "Rețea globală de spitale și clinici partenere în peste 200 de țări."
    ],
    faqs: [
      { q: "Ce se întâmplă dacă pierd avionul din vina mea?", a: "Greșelile proprii nu sunt acoperite (ex: am întârziat la aeroport). Se acoperă anulările din cauze obiective, cum ar fi o spitalizare bruscă înainte de zbor." },
      { q: "Polița acoperă și sporturile extreme?", a: "Sporturile de iarnă sau sporturile extreme necesită activarea unei clauze suplimentare, cu o primă ușor majorată." },
      { q: "Este valabilă și în țările din UE?", a: "Da, polița este valabilă în toate țările, inclusiv UE. Deși cardul european de sănătate funcționează în UE, nu acoperă costurile integrale și nu include repatriere." }
    ],
    iconName: "Plane"
  },
  "imm-insurance": {
    id: "imm-insurance",
    slug: "imm-insurance",
    title: "Asigurări IMM",
    shortDescription: "Pachetul All-in-One ideal pentru protejarea întreprinderilor mici și mijlocii.",
    longDescription: "Un business IMM se bazează pe flux de numerar constant și pe o echipă mică, dar critică. Un incendiu, o eroare umană sau un furt nu reprezintă doar pagube materiale, ci un colaps operațional pe care asigurarea noastră îl previne.",
    problemSolved: "Problema majoră pe care o rezolvă este riscul falimentului IMM-ului în urma unei singure daune catastrofale. Majoritatea IMM-urilor care suferă un incendiu, un proces costisitor sau o avarie majoră și nu sunt asigurate, intră în faliment în mai puțin de 6 luni.",
    whoItsFor: "Este esențială pentru magazine de retail, restaurante, cafenele (HoReCa), service-uri auto, ateliere de producție mici și depozite, clinici stomatologice, saloane de înfrumusețare și birouri de IT/Consultanță.",
    whyCare: "Un IMM are resurse limitate. O daună majoră poate distruge ani de muncă într-o singură zi. Fără asigurare, pierzi activele, veniturile pe perioada nefuncționării și poți fi responsabil pentru daune către clienți. O singură decizie greșită poate costa afacerea totul.",
    benefits: [
      { title: "Modularitate Totală", description: "Cumperi și plătești doar acoperirile de care afacerea ta are cu adevărat nevoie - flexibilitate maximă." },
      { title: "Răspundere Inclusă", description: "Protecție completă dacă produsele tale sau activitatea ta rănesc accidental un client sau terț." },
      { title: "Cost Optimizat", description: "Pachetul cumulat (Property + Liability) este mult mai eficient financiar decât polițele cumpărate separat." },
      { title: "Business Interruption", description: "Acoperă veniturile nerealizate și cheltuielile fixe pe perioada întreruperii activității." }
    ],
    timeMoneySaved: "O primă anuală de 300-800 EUR poate proteja active de 50.000-200.000 EUR și venituri de sute de mii de euro. Economisești timp prin evaluări rapide și economisești bani prin evitarea costurilor de avocat și daunelor plătite din buzunar.",
    risksRemoved: [
      "Riscul falimentului în urma unei daune catastrofale",
      "Riscul pierderii veniturilor pe perioada întreruperii activității",
      "Riscul proceselor costisitoare cu clienți accidentați",
      "Riscul distrugerii echipamentelor vitale pentru afacere",
      "Riscul de a nu putea plăti salariile angajaților în perioada de criză"
    ],
    urgency: "Acum. Riscul este constant - incendii, inundații, furturi, procese se pot întâmpla oricând. Fără protecție, nu ai cum să supraviețuiești unei daune majore. De asemenea, primele sunt mai mici pentru afacerile nou-înființate.",
    practicalExamples: [
      { title: "Inundație la un centru medical", description: "O țeavă cedează noaptea și distruge aparatura medicală (ecograf de 15.000 EUR, mobilier 8.000 EUR). Cabinetul este închis 2 luni pentru reparații. Asigurarea despăgubește echipamentele și acoperă veniturile și salariile ratate în cele 2 luni de oprire (total 40.000 EUR). Fără asigurare, afacerea ar fi pierdut totul." },
      { title: "Accident în magazin", description: "Un client alunecă pe podeaua udă a cafenelei tale, suferă o fractură și te dă în judecată pentru 50.000 EUR. Polița de răspundere civilă plătește avocații și daunele cerute de client, salvând afacerea de faliment." }
    ],
    whyGenerali: [
      "Generali oferă servicii croite special pentru antreprenorii români.",
      "Plata primei se poate face în rate flexibile pentru a nu bloca cash-flow-ul firmei.",
      "Asistență tehnică de specialitate și evaluatori industriali capabili să rezolve daune complexe rapid."
    ],
    faqs: [
      { q: "Mă costă mult o astfel de asigurare?", a: "Nu, pentru un IMM tipic o poliță cuprinzătoare reprezintă o fracțiune minimală din costurile lunare operaționale, adesea costând mai puțin decât abonamentele de telecomunicații ale firmei." },
      { q: "Sunt acoperite bunurile și echipamentele angajaților?", a: "Da, polița poate fi extinsă pentru a acoperi laptopurile, telefoanele de serviciu și bunurile personale ale angajaților aflate în incinta asigurată." },
      { q: "Ce se întâmplă dacă nu îmi pot continua activitatea?", a: "Clauza Business Interruption acoperă veniturile nerealizate și cheltuielile fixe pe perioada întreruperii, permițând afacerii să supraviețuiască crizei." }
    ],
    iconName: "Briefcase"
  }
};
