export interface GlossaryTerm {
  id: string;
  slug: string;
  termRo: string;
  termEn: string;
  category: 'general' | 'auto' | 'property' | 'health_life' | 'commercial_liability' | 'claims';
  letter: string;
  shortDefinitionRo: string;
  shortDefinitionEn: string;
  fullDefinitionRo: string;
  fullDefinitionEn: string;
  practicalExampleRo?: string;
  practicalExampleEn?: string;
  distinctionsRo?: string;
  distinctionsEn?: string;
  legalNoteRo?: string;
  legalNoteEn?: string;
  relatedToolLinks?: Array<{
    titleRo: string;
    titleEn: string;
    href: string;
  }>;
  relatedTermIds?: string[];
}

export const GLOSSARY_CATEGORIES = [
  { id: 'all', labelRo: 'Toate conceptele', labelEn: 'All concepts' },
  { id: 'general', labelRo: 'Termeni Generali & Contractuali', labelEn: 'General & Contractual Terms' },
  { id: 'auto', labelRo: 'Asigurări Auto (RCA & CASCO)', labelEn: 'Motor Insurance (TPL & CASCO)' },
  { id: 'property', labelRo: 'Bunuri, Clădiri & Locuințe (PAD)', labelEn: 'Property & Buildings (PAD)' },
  { id: 'health_life', labelRo: 'Sănătate, Beneficii & Viață', labelEn: 'Health, Benefits & Life' },
  { id: 'commercial_liability', labelRo: 'Companii & Răspunderi Speciale', labelEn: 'Commercial & Special Liabilities' },
  { id: 'claims', labelRo: 'Daune, Despăgubiri & Proceduri', labelEn: 'Claims, Settlements & Procedures' },
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'fransiza',
    slug: 'fransiza',
    termRo: 'Franșiză (Deductibilă)',
    termEn: 'Deductible / Policy Excess',
    category: 'general',
    letter: 'F',
    shortDefinitionRo: 'Partea din valoarea fiecărei daune pe care asiguratul o suportă din fonduri proprii conform contractului.',
    shortDefinitionEn: 'The portion of each covered claim amount that the policyholder pays out-of-pocket according to policy terms.',
    fullDefinitionRo: 'Franșiza este suma fixă sau procentuală prevăzută în poliță care rămâne în sarcina asiguratului la fiecare eveniment asigurat. Poate fi deductibilă (se scade din valoarea totală a daunei) sau atinsă/simplă (asigurătorul nu plătește nimic dacă dauna este sub prag, dar plătește integral dacă pragul este depășit). Rolul său principal este de a reduce prima de asigurare și de a responsabiliza asiguratul.',
    fullDefinitionEn: 'A deductible or excess is a fixed sum or percentage specified in the policy schedule that remains the policyholder\'s responsibility for each insured loss. It may be deducted directly from the claim settlement or act as a qualifying threshold. It lowers the insurance premium while encouraging risk prevention.',
    practicalExampleRo: 'La o poliță CASCO cu o franșiză deductibilă de 100 EUR pe eveniment, pentru o reparație de 800 EUR, asigurătorul despăgubește 700 EUR, iar asiguratul achită 100 EUR către unitatea reparatoare.',
    practicalExampleEn: 'On a comprehensive motor policy with a 100 EUR deductible per event, for an 800 EUR repair bill, the insurer settles 700 EUR and the policyholder pays 100 EUR to the repair shop.',
    distinctionsRo: 'Diferență critică: Franșiza deductibilă se scade întotdeauna din despăgubire; franșiza atinsă plătește integral odată ce dauna a depășit valoarea convenită.',
    distinctionsEn: 'Critical distinction: Deductible excess is always deducted from the payout; threshold excess pays 100% once the claim exceeds the agreed amount.',
    legalNoteRo: 'Reglementată de Codul Civil Român (Art. 2.209 și urm.) și normele specifice ale contractului de asigurare.',
    legalNoteEn: 'Governed by the Romanian Civil Code (Art. 2.209 et seq.) and specific contractual conditions.',
    relatedToolLinks: [
      { titleRo: 'Calculator Risc Financiar & Franșize', titleEn: 'Financial Risk & Deductible Tool', href: '/profil-risc' },
      { titleRo: 'Comparator Oferte de Asigurare', titleEn: 'Policy Comparison Tool', href: '/compara-polite' }
    ],
    relatedTermIds: ['despagubire', 'suma-asigurata', 'prima-de-asigurare']
  },
  {
    id: 'prima-de-asigurare',
    slug: 'prima-de-asigurare',
    termRo: 'Primă de asigurare',
    termEn: 'Insurance Premium',
    category: 'general',
    letter: 'P',
    shortDefinitionRo: 'Suma de bani pe care asiguratul o plătește asigurătorului în schimbul preluării riscurilor contractate.',
    shortDefinitionEn: 'The payment made by the policyholder to the insurer in exchange for contractual risk transfer.',
    fullDefinitionRo: 'Contravaloarea serviciului de protecție financiară oferit de asigurător. Poate fi achitată integral sau în rate eșalonate (semestriale, trimestriale, lunare). Neplata primei de asigurare la scadență sau în perioada de grație convenită poate atrage suspendarea sau rezilierea de drept a contractului de asigurare.',
    fullDefinitionEn: 'The financial consideration paid for insurance coverage, payable as a lump sum or in agreed installments. Failure to pay on schedule within grace periods may lead to policy suspension or cancellation.',
    practicalExampleRo: 'Plata a 4 rate trimestriale a câte 250 RON pentru o asigurare facultativă de locuință.',
    practicalExampleEn: 'Paying 4 quarterly installments of 250 RON for comprehensive home property cover.',
    distinctionsRo: 'A nu se confunda cu Suma Asigurată (valoarea maximă a despăgubirii primite de asigurat în caz de daună).',
    distinctionsEn: 'Do not confuse with the Sum Insured (the maximum claim payout received).',
    relatedToolLinks: [
      { titleRo: 'Calendar Scadențe & Rate', titleEn: 'Renewal & Premium Calendar', href: '/calendar-asigurari' }
    ],
    relatedTermIds: ['suma-asigurata', 'fransiza', 'reinnoire']
  },
  {
    id: 'suma-asigurata',
    slug: 'suma-asigurata',
    termRo: 'Sumă asigurată',
    termEn: 'Sum Insured / Insured Value',
    category: 'general',
    letter: 'S',
    shortDefinitionRo: 'Limita maximă a răspunderii asigurătorului pentru un bun sau interes asigurat pe durata contractului.',
    shortDefinitionEn: 'The maximum financial liability assumed by the insurer for an insured asset or interest.',
    fullDefinitionRo: 'Reprezintă valoarea declarată a bunului sau plafonul maxim convenit până la care asigurătorul acoperă prejudiciul suferit în urma producerii riscurilor asigurate. În asigurările de bunuri, suma asigurată nu poate depăși valoarea reală a bunului la data încheierii contractului (principiul indemnitar).',
    fullDefinitionEn: 'The declared value of an asset or maximum agreed ceiling up to which the insurer indemnifies damage. In indemnity insurance, the sum insured must not exceed the true insurable value of the asset at policy inception.',
    practicalExampleRo: 'O locuință cu valoare de reconstrucție de 150.000 EUR are suma asigurată stabilită la 150.000 EUR.',
    practicalExampleEn: 'A residential building with a reinstatement value of 150,000 EUR has its sum insured set at 150,000 EUR.',
    distinctionsRo: 'Suma asigurată este plafonul maxim; despăgubirea efectivă depinde de mărimea daunei reale constatate.',
    distinctionsEn: 'Sum insured is the ceiling; the actual payout equals the verified loss up to that limit.',
    relatedToolLinks: [
      { titleRo: 'Analizor Gaps & Acoperire', titleEn: 'Coverage Gap Analyzer', href: '/gaps' }
    ],
    relatedTermIds: ['subasigurare', 'supraasigurare', 'valoare-de-inlocuire']
  },
  {
    id: 'limita-de-raspundere',
    slug: 'limita-de-raspundere',
    termRo: 'Limită de răspundere',
    termEn: 'Limit of Liability',
    category: 'commercial_liability',
    letter: 'L',
    shortDefinitionRo: 'Plafonul valoric maxim pe care asigurătorul îl va plăti pentru vătămări corporale, decese sau daune materiale cauzate terților.',
    shortDefinitionEn: 'The maximum financial limit an insurer will pay for bodily injury, death or property damage caused to third parties.',
    fullDefinitionRo: 'În asigurările de răspundere civilă (RCA, Malpraxis, Răspundere Profesională, D&O), limita de răspundere definește despăgubirea maximă cumulată pe eveniment și/sau pe întreaga perioadă contractuală (limită agregată).',
    fullDefinitionEn: 'In liability policies (TPL, Professional Indemnity, D&O), the limit defines maximum exposure per occurrence and/or in the aggregate for the policy period.',
    practicalExampleRo: 'La RCA, limitele legale sunt stabilite în echivalentul a 6,07 milioane EUR pentru vătămări corporale și 1,22 milioane EUR pentru daune materiale per eveniment.',
    practicalExampleEn: 'In Romanian MTPL (RCA), statutory limits are set at 6.07M EUR for bodily injury and 1.22M EUR for material damage per occurrence.',
    legalNoteRo: 'Legea nr. 132/2017 privind asigurarea obligatorie de răspundere civilă auto (RCA).',
    legalNoteEn: 'Romanian Law 132/2017 on Mandatory Motor Third-Party Liability.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Companii & Răspunderi', titleEn: 'SME Commercial Risk Audit', href: '/audit-riscuri-companii' }
    ],
    relatedTermIds: ['raspundere-civila', 'rca', 'asigurare-do']
  },
  {
    id: 'subasigurare',
    slug: 'subasigurare',
    termRo: 'Subasigurare (Regula Proporțională)',
    termEn: 'Underinsurance (Average Clause)',
    category: 'property',
    letter: 'S',
    shortDefinitionRo: 'Situația în care suma asigurată declarată este inferioară valorii reale de reconstrucție sau înlocuire a bunului.',
    shortDefinitionEn: 'When the declared sum insured is lower than the actual reinstatement or replacement value of the asset.',
    fullDefinitionRo: 'Dacă un bun este asigurat pentru o sumă mai mică decât valoarea sa reală, în caz de daună parțială asigurătorul aplică de regulă regula proporțională: despăgubirea se reduce în același raport în care suma asigurată se află față de valoarea reală a bunului, cu excepția cazului în care s-a contractat clauza de prim risc.',
    fullDefinitionEn: 'If an asset is insured below its true value, in the event of partial damage insurers apply the average condition: settlement is reduced proportionally unless first-loss cover was specifically agreed.',
    practicalExampleRo: 'O hală cu valoare reală de 200.000 EUR asigurată doar pentru 100.000 EUR (50%). La o daună parțială de 40.000 EUR cauzată de furtună, asigurătorul va despăgubi doar 50%, adică 20.000 EUR.',
    practicalExampleEn: 'A commercial warehouse worth 200,000 EUR insured for only 100,000 EUR (50%). For a 40,000 EUR storm loss, the insurer pays only 50%, meaning 20,000 EUR.',
    distinctionsRo: 'Poate fi evitată prin reevaluări periodice sau prin contractarea acoperirii "la prim risc" (fără aplicarea proporționalității).',
    distinctionsEn: 'Can be avoided through periodic indexation or explicit "first loss" policy wording.',
    relatedToolLinks: [
      { titleRo: 'Analizor Gaps & Subasigurare', titleEn: 'Coverage Gap & Underinsurance Tool', href: '/gaps' }
    ],
    relatedTermIds: ['supraasigurare', 'suma-asigurata', 'valoare-de-inlocuire']
  },
  {
    id: 'supraasigurare',
    slug: 'supraasigurare',
    termRo: 'Supraasigurare',
    termEn: 'Overinsurance',
    category: 'property',
    letter: 'S',
    shortDefinitionRo: 'Declararea unei sume asigurate superioare valorii reale a bunului asigurat.',
    shortDefinitionEn: 'Declaring a sum insured that exceeds the true insurable value of the asset.',
    fullDefinitionRo: 'Conform principiului indemnitar din legislația românească, asiguratul nu se poate îmbogăți de pe urma unei daune. Chiar dacă se plătește o primă calculată la o sumă mai mare, despăgubirea maximă acordată nu va putea depăși niciodată valoarea reală a pagubei suferite.',
    fullDefinitionEn: 'Under Romanian insurance law and the indemnity principle, insurance cannot generate financial profit. Even if premium was paid on a higher figure, compensation is strictly capped at the actual verified loss.',
    practicalExampleRo: 'O mașină veche evaluată la 5.000 EUR asigurată din eroare la 10.000 EUR: în caz de daună totală, despăgubirea va fi limitată la valoarea de piață de 5.000 EUR.',
    practicalExampleEn: 'A used car worth 5,000 EUR insured incorrectly for 10,000 EUR: in a total loss, the payout is capped at the 5,000 EUR market value.',
    legalNoteRo: 'Art. 2.215 Codul Civil: contractul este nul pentru partea ce depășește valoarea reală a bunului dacă a existat intenție frauduloasă.',
    legalNoteEn: 'Art. 2.215 Romanian Civil Code.',
    relatedTermIds: ['subasigurare', 'suma-asigurata', 'valoare-de-piata']
  },
  {
    id: 'excludere',
    slug: 'excludere',
    termRo: 'Excludere contractuală',
    termEn: 'Policy Exclusion',
    category: 'general',
    letter: 'E',
    shortDefinitionRo: 'Eveniment, cauză, circumstanță sau tip de prejudiciu pentru care asigurătorul nu acordă despăgubiri conform contractului.',
    shortDefinitionEn: 'An event, cause, circumstance or loss type explicitly not covered under the insurance contract.',
    fullDefinitionRo: 'Excluderile sunt prevăzute explicit în condițiile de asigurare și delimitează sfera riscurilor acoperite. Ele pot fi generale (război, risc nuclear, uzură normală, culpă gravă/intenție) sau specifice fiecărui tip de produs (ex. infiltrații lente prin acoperiș la asigurarea de clădiri).',
    fullDefinitionEn: 'Exclusions define the boundaries of coverage in policy wording. They can be standard market exclusions (war, nuclear contamination, gradual wear and tear, gross negligence) or product-specific.',
    practicalExampleRo: 'La asigurarea facultativă de locuință, crăpăturile cosmetice cauzate de tasarea naturală a terenului sunt de regulă excluse.',
    practicalExampleEn: 'In home insurance, cosmetic settling cracks caused by gradual soil shifting are standard policy exclusions.',
    distinctionsRo: 'Trebuie întotdeauna verificate în Condițiile Generale înainte de producerea unui eveniment.',
    distinctionsEn: 'Must always be audited in policy wording prior to any loss event.',
    relatedToolLinks: [
      { titleRo: 'Registru Documentare & Clauze', titleEn: 'Policy Evidence & Wording Register', href: '/registru-documentare' }
    ],
    relatedTermIds: ['clauza', 'conditii-generale-si-speciale']
  },
  {
    id: 'clauza',
    slug: 'clauza',
    termRo: 'Clauză / Extindere de acoperire',
    termEn: 'Clause / Policy Endorsement / Rider',
    category: 'general',
    letter: 'C',
    shortDefinitionRo: 'Prevedere contractuală distinctă care extinde, limitează sau modifică termenii standard ai unei polițe.',
    shortDefinitionEn: 'A specific contractual term that extends, restricts or modifies standard policy wording.',
    fullDefinitionRo: 'Clauzele adăugate permit personalizarea poliței pentru nevoile exacte ale asiguratului. Exemple de clauze frecvente: clauza de vandalism, clauza de bunuri în aer liber, clauza de protecție juridică sau clauza de decontare directă la RCA.',
    fullDefinitionEn: 'Clauses customize a policy to policyholder requirements, adding covers such as vandalism, goods in the open, legal expenses, or direct compensation in MTPL.',
    practicalExampleRo: 'Adăugarea clauzei de "Fenomene atmosferice severe" la o asigurare de stocuri comerciale.',
    practicalExampleEn: 'Adding a "Severe Weather Endorsement" to a commercial inventory policy.',
    relatedTermIds: ['excludere', 'endorsement-act-aditional', 'conditii-generale-si-speciale']
  },
  {
    id: 'conditii-generale-si-speciale',
    slug: 'conditii-generale-si-speciale',
    termRo: 'Condiții generale și speciale',
    termEn: 'General & Special Policy Terms',
    category: 'general',
    letter: 'C',
    shortDefinitionRo: 'Documentele juridice detaliate care alcătuiesc contractul de asigurare alături de polița propriu-zisă.',
    shortDefinitionEn: 'The detailed contractual and technical terms constituting the complete insurance contract.',
    fullDefinitionRo: 'Condițiile generale stabilesc cadrul comun tuturor contractelor din acea clasă (definitii, mod de plată, obligații, excluderi generale), în timp ce condițiile speciale și specificația poliței prevăd termenii particulari negociați (sume, franșize, clauze specifice, derogări).',
    fullDefinitionEn: 'General conditions set the standard baseline terms for that product line, while special conditions and schedule details record negotiated items, limits, deductibles, and tailored endorsements.',
    distinctionsRo: 'În caz de divergență, condițiile speciale și clauzele negociate prevalează asupra condițiilor generale standard.',
    distinctionsEn: 'Special negotiated terms and endorsements take legal precedence over standard general clauses.',
    relatedTermIds: ['clauza', 'excludere', 'endorsement-act-aditional']
  },
  {
    id: 'perioada-de-asigurare',
    slug: 'perioada-de-asigurare',
    termRo: 'Perioadă de asigurare',
    termEn: 'Policy Period / Term',
    category: 'general',
    letter: 'P',
    shortDefinitionRo: 'Intervalul de timp cuprins între data și ora intrării în vigoare a poliței și data expirării valabilității acesteia.',
    shortDefinitionEn: 'The time window between the policy inception date/time and its expiry date.',
    fullDefinitionRo: 'Orice eveniment asigurat trebuie să se producă în interiorul acestei perioade pentru a fi eligibil pentru despăgubire (cu excepția polițelor pe bază de claims-made cu perioade retroactive convenite).',
    fullDefinitionEn: 'Covered events must occur during this period to trigger indemnity, subject to any agreed retroactive dates on claims-made policies.',
    relatedToolLinks: [
      { titleRo: 'Registru Termene & Scadențe', titleEn: 'Policy Deadlines & Expiry Tracker', href: '/termene-polite' }
    ],
    relatedTermIds: ['perioada-de-asteptare', 'reinnoire']
  },
  {
    id: 'perioada-de-asteptare',
    slug: 'perioada-de-asteptare',
    termRo: 'Perioadă de așteptare (Carență)',
    termEn: 'Waiting Period / Qualifying Period',
    category: 'health_life',
    letter: 'P',
    shortDefinitionRo: 'Intervalul inițial de timp de la intrarea în vigoare a poliței în care anumite riscuri sau afecțiuni nu sunt despăgubite.',
    shortDefinitionEn: 'The initial period following policy inception during which certain claims or conditions are not yet covered.',
    fullDefinitionRo: 'Utilizată frecvent în asigurările voluntare de sănătate, de viață sau de protecție a veniturilor pentru a preveni selecția adversă (încheierea poliței după apariția simptomelor). Spre exemplu, o perioadă de așteptare de 9 luni pentru spitalizare legată de naștere sau 30 de zile pentru boli cronice nou diagnosticate.',
    fullDefinitionEn: 'Frequently used in voluntary health and life policies to mitigate adverse selection. For example, a 9-month waiting period for maternity hospitalization or 30 days for illness benefits.',
    practicalExampleRo: 'Dacă o poliță de sănătate are o carență de 30 de zile pentru intervenții chirurgicale planificate, o operație efectuată în ziua 15 nu va fi decontată de asigurător.',
    practicalExampleEn: 'If a policy features a 30-day waiting period for elective surgery, an operation on day 15 will not be reimbursed.',
    relatedToolLinks: [
      { titleRo: 'Ghid Asigurări Sănătate Angajați', titleEn: 'Corporate Health Benefits Guide', href: '/asigurare-sanatate-angajati' }
    ],
    relatedTermIds: ['asigurare-voluntara-de-sanatate', 'asigurare-de-viata']
  },
  {
    id: 'dauna',
    slug: 'dauna',
    termRo: 'Daună / Sinistru',
    termEn: 'Loss / Claim / Damage',
    category: 'claims',
    letter: 'D',
    shortDefinitionRo: 'Prejudiciul material, vătămarea sau pierderea financiară cauzată de producerea unui risc asigurat.',
    shortDefinitionEn: 'Physical damage, bodily injury or financial loss caused by an insured peril.',
    fullDefinitionRo: 'Evenimentul vătămător generator de prejudicii care activează obligația de analiză și despăgubire a asigurătorului. Poate fi daună parțială (bunul poate fi reparat economic) sau daună totală (bunul este distrus complet sau costul reparației depășește valoarea sa de piață/reală).',
    fullDefinitionEn: 'The loss-causing occurrence activating the insurer\'s claims assessment and indemnification duties. Can be partial loss or total loss (economic write-off).',
    relatedToolLinks: [
      { titleRo: 'Urmărire & Dosar de Daună', titleEn: 'Claims Tracking & File Generator', href: '/urmarire-dauna' }
    ],
    relatedTermIds: ['despagubire', 'constatarea-daunei', 'perioada-de-notificare']
  },
  {
    id: 'despagubire',
    slug: 'despagubire',
    termRo: 'Despăgubire (Indemnizație de asigurare)',
    termEn: 'Claim Settlement / Indemnity Payment',
    category: 'claims',
    letter: 'D',
    shortDefinitionRo: 'Suma de bani plătită de asigurător pentru acoperirea prejudiciului suferit conform contractului.',
    shortDefinitionEn: 'The monetary payment disbursed by the insurer to indemnify covered losses under the contract.',
    fullDefinitionRo: 'Calculată după aplicarea franșizelor, limitelor contractuale, deprecierii (dacă e stipulată) și eventualei reguli de proporționalitate. Nu poate depăși cuantumul pagubei reale și nici suma asigurată.',
    fullDefinitionEn: 'Calculated after applying policy deductibles, limits, depreciation (if applicable) and average clauses. Capped strictly at verified actual loss and sum insured.',
    relatedToolLinks: [
      { titleRo: 'Analiză Ofertă Despăgubire', titleEn: 'Claim Settlement Offer Analyzer', href: '/analiza-despagubire' }
    ],
    relatedTermIds: ['dauna', 'fransiza', 'suma-asigurata']
  },
  {
    id: 'constatarea-daunei',
    slug: 'constatarea-daunei',
    termRo: 'Constatarea daunei (Inspectare sinistru)',
    termEn: 'Loss Assessment / Claim Inspection',
    category: 'claims',
    letter: 'C',
    shortDefinitionRo: 'Procedura tehnică de examinare, descriere și evaluare a avariilor produse în urma unui eveniment asigurat.',
    shortDefinitionEn: 'The technical inspection, documentation and quantification of physical damage caused by an insured peril.',
    fullDefinitionRo: 'Efectuată de inspectorul de daune al asigurătorului sau de un expert tehnic mandatat. Se consemnează într-un proces-verbal de constatare ce detaliază elementele avariate, soluțiile tehnologice de remediere (înlocuire / reparație) și cauzalitatea directă.',
    fullDefinitionEn: 'Conducted by the insurer\'s loss adjuster or independent surveyor, culminating in an official inspection report listing damaged parts, recommended repairs, and causal link verification.',
    relatedToolLinks: [
      { titleRo: 'Generator Dosar Daună', titleEn: 'Claim File Generator', href: '/generator-dosar-dauna' }
    ],
    relatedTermIds: ['dauna', 'despagubire', 'perioada-de-notificare']
  },
  {
    id: 'raspundere-civila',
    slug: 'raspundere-civila',
    termRo: 'Răspundere civilă delictuală / contractuală',
    termEn: 'Third-Party Civil Liability',
    category: 'commercial_liability',
    letter: 'R',
    shortDefinitionRo: 'Obligația legală de a repara prejudiciul cauzat altei persoane prin faptă proprie, a bunurilor sau a prepușilor.',
    shortDefinitionEn: 'The legal duty to compensate harm caused to third parties by one\'s acts, omissions, property or employees.',
    fullDefinitionRo: 'În dreptul civil român (Art. 1357 Cod Civil), oricine cauzează altuia un prejudiciu printr-o faptă ilicită este obligat să îl repare. Asigurarea de răspundere civilă preia această obligație bănească în limitele prevăzute în contract.',
    fullDefinitionEn: 'Under Romanian tort law (Art. 1357 Civil Code), any party causing wrongful harm must rectify the loss. Liability insurance protects against these financial claims within policy limits.',
    legalNoteRo: 'Art. 1357 - 1386 Codul Civil Român.',
    legalNoteEn: 'Art. 1357 - 1386 Romanian Civil Code.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Companii & Răspunderi', titleEn: 'SME Commercial Risk Audit', href: '/audit-riscuri-companii' }
    ],
    relatedTermIds: ['limita-de-raspundere', 'rca', 'asigurare-de-raspundere-profesionala']
  },
  {
    id: 'rca',
    slug: 'rca',
    termRo: 'RCA (Asigurare obligatorie auto)',
    termEn: 'Mandatory Motor Third-Party Liability (MTPL)',
    category: 'auto',
    letter: 'R',
    shortDefinitionRo: 'Polița obligatorie prin lege care despăgubește daunele provocate terților în urma accidentelor rutiere.',
    shortDefinitionEn: 'Compulsory statutory insurance covering bodily injury and property damage inflicted upon third parties in traffic accidents.',
    fullDefinitionRo: 'Obligatorie pentru toate vehiculele înmatriculate în România. Asigură despăgubirea victimelor nevinovate pentru daune materiale, vătămări corporale, deces și cheltuieli de judecată în limitele stabilite prin directiva europeană și Legea 132/2017.',
    fullDefinitionEn: 'Mandatory for all registered vehicles in Romania under Law 132/2017, indemnifying innocent third-party victims for vehicle repairs, bodily injuries, loss of life and medical care.',
    practicalExampleRo: 'Șoferul A lovește din spate mașina șoferului B. Polița RCA a șoferului A achită reparația mașinii lui B și cheltuielile medicale aferente.',
    practicalExampleEn: 'Driver A rear-ends Driver B. Driver A\'s MTPL policy pays for the repair of B\'s vehicle and associated medical costs.',
    legalNoteRo: 'Legea nr. 132/2017 și Norma ASF nr. 20/2017.',
    legalNoteEn: 'Romanian Law 132/2017 and ASF Rule 20/2017.',
    relatedToolLinks: [
      { titleRo: 'Servicii & Consultanță RCA', titleEn: 'MTPL Advisory Services', href: '/servicii/rca-insurance' },
      { titleRo: 'Raport Piața Asigurărilor România', titleEn: 'Romania Insurance Market Report', href: '/raport-piata-asigurarilor' }
    ],
    relatedTermIds: ['casco', 'raspundere-civila', 'regres']
  },
  {
    id: 'casco',
    slug: 'casco',
    termRo: 'CASCO (Asigurare facultativă auto)',
    termEn: 'Comprehensive Motor Own Damage Cover',
    category: 'auto',
    letter: 'C',
    shortDefinitionRo: 'Polița facultativă care acoperă daunele propriului autovehicul produse de accidente, furt, vandalism sau fenomene meteo.',
    shortDefinitionEn: 'Voluntary insurance protecting the policyholder\'s own vehicle against collision, theft, vandalism and natural perils.',
    fullDefinitionRo: 'Spre deosebire de RCA (care plătește exclusiv terților păgubiți), CASCO despăgubește proprietarul vehiculului asigurat chiar dacă acesta este vinovat de producerea coliziunii, dacă autorul este necunoscut, sau în caz de furt, grindină, inundație sau incendiu.',
    fullDefinitionEn: 'Unlike MTPL (which compensates third parties only), CASCO protects the owner\'s own car even in at-fault accidents, hit-and-run incidents, hail, flood, fire or vehicle theft.',
    practicalExampleRo: 'Parbriz spart de o piatră pe autostradă sau caroserie avariată de grindină: reparațiile sunt achitate prin polița CASCO.',
    practicalExampleEn: 'A windshield cracked by a highway stone or bodywork dented by hail: repairs are covered by the CASCO policy.',
    distinctionsRo: 'RCA acoperă daunele cauzate altora; CASCO acoperă daunele propriului vehicul.',
    distinctionsEn: 'MTPL covers damage to others; CASCO covers damage to your own vehicle.',
    relatedToolLinks: [
      { titleRo: 'Servicii CASCO Premium', titleEn: 'CASCO Motor Insurance Advisory', href: '/servicii/casco-insurance' }
    ],
    relatedTermIds: ['rca', 'fransiza', 'valoare-de-piata']
  },
  {
    id: 'pad',
    slug: 'pad',
    termRo: 'PAD (Asigurare obligatorie a locuințelor)',
    termEn: 'PAD (Mandatory Natural Disaster Home Cover)',
    category: 'property',
    letter: 'P',
    shortDefinitionRo: 'Polița obligatorie de stat administrată de PAID România care acoperă exclusiv 3 riscuri de dezastre naturale: cutremur, inundații și alunecări de teren.',
    shortDefinitionEn: 'Statutory home policy managed by PAID Romania covering strictly 3 natural catastrophe perils: earthquake, flood, and landslides.',
    fullDefinitionRo: 'Obligatorie pentru toți proprietarii de locuințe din România conform Legii 260/2008. Oferă două plafoane de acoperire: Tip A (20.000 EUR sumă asigurată, primă 130 RON/an pentru construcții cu structură de rezistență) și Tip B (10.000 EUR sumă asigurată, primă 50 RON/an pentru chirpici/materiale netratate). Nu acoperă incendiu, furt, țevi sparte sau alte riscuri comune.',
    fullDefinitionEn: 'Mandatory for all Romanian residential property owners under Law 260/2008. Provides two fixed cover tiers: Type A (20,000 EUR sum insured, 130 RON/yr) and Type B (10,000 EUR sum insured, 50 RON/yr). Covers only earthquake, surface flooding and landslides.',
    legalNoteRo: 'Legea nr. 260/2008 republicată, modificată prin Legea nr. 115/2023.',
    legalNoteEn: 'Romanian Law 260/2008 as amended by Law 115/2023.',
    relatedToolLinks: [
      { titleRo: 'Ghid Asigurare PAD & Locuință', titleEn: 'PAD & Home Insurance Guide', href: '/servicii/property-insurance' },
      { titleRo: 'Statistici PAD în Raportul Anual', titleEn: 'PAD Disaster Stats in Market Report', href: '/raport-piata-asigurarilor' }
    ],
    relatedTermIds: ['asigurare-facultativa-a-locuintei', 'suma-asigurata']
  },
  {
    id: 'asigurare-facultativa-a-locuintei',
    slug: 'asigurare-facultativa-a-locuintei',
    termRo: 'Asigurare facultativă a locuinței',
    termEn: 'Comprehensive Home & Property Insurance',
    category: 'property',
    letter: 'A',
    shortDefinitionRo: 'Polița completă care protejează locuința și bunurile din interior peste plafonul PAD pentru riscuri extinse precum incendiu, explozie, inundație de la vecini și furt.',
    shortDefinitionEn: 'Comprehensive policy protecting residential buildings and contents beyond PAD for fire, explosion, pipe leakage, vandalism and theft.',
    fullDefinitionRo: 'Se poate încheia numai dacă locuința deține deja o poliță PAD valabilă. Acoperă clădirea la valoarea reală de reconstrucție, bunurile/conținutul, răspunderea civilă față de vecini (ex. inundație accidentală), avarii la instalații și fenomene meteo extreme.',
    fullDefinitionEn: 'Can be legally issued only if a valid PAD policy is in force. Covers building at full rebuilding cost, contents, neighbor liability (water leaks) and extreme weather perils.',
    practicalExampleRo: 'Un incendiu provocat de un scurtcircuit provoacă daune de 60.000 EUR: PAD nu plătește (nefiind dezastru natural), dar asigurarea facultativă achită integral reparația.',
    practicalExampleEn: 'An electrical fire causes 60,000 EUR in damage: PAD pays nothing (not a natural catastrophe), but voluntary home insurance settles the full reconstruction cost.',
    relatedToolLinks: [
      { titleRo: 'Servicii Asigurare Locuință & Bunuri', titleEn: 'Home Insurance Advisory', href: '/servicii/property-insurance' }
    ],
    relatedTermIds: ['pad', 'subasigurare', 'valoare-de-inlocuire']
  },
  {
    id: 'asigurare-de-viata',
    slug: 'asigurare-de-viata',
    termRo: 'Asigurare de viață',
    termEn: 'Life Insurance',
    category: 'health_life',
    letter: 'A',
    shortDefinitionRo: 'Contract de protecție financiară care garantează plata unei sume asigurate beneficiarilor desemnați în caz de deces sau invaliditate a persoanei asigurate.',
    shortDefinitionEn: 'A financial contract guaranteeing a lump-sum payout to designated beneficiaries upon the insured person\'s death or permanent disability.',
    fullDefinitionRo: 'Poate fi de tip protecție pură (termen determinat), mixtă (protecție + economisire cu sumă garantată la maturitate) sau unit-linked (legată de fonduri de investiții). Oferă stabilitate financiară familiei și poate fi cesionată în favoarea băncilor pentru credite ipotecare.',
    fullDefinitionEn: 'Can be term life (pure risk), whole life / endowment (protection plus guaranteed savings), or unit-linked. Secures family financial stability and can be assigned as mortgage collateral.',
    relatedToolLinks: [
      { titleRo: 'Servicii Asigurări de Viață', titleEn: 'Life Insurance Advisory', href: '/servicii/life-insurance' }
    ],
    relatedTermIds: ['beneficiar', 'asigurare-voluntara-de-sanatate']
  },
  {
    id: 'asigurare-voluntara-de-sanatate',
    slug: 'asigurare-voluntara-de-sanatate',
    termRo: 'Asigurare voluntară de sănătate',
    termEn: 'Private / Voluntary Health Insurance (VHI)',
    category: 'health_life',
    letter: 'A',
    shortDefinitionRo: 'Poliță care preia costurile consultațiilor, investigațiilor avansate, spitalizării și intervențiilor chirurgicale în rețele medicale private sau de stat.',
    shortDefinitionEn: 'Policy reimbursing costs for medical consultations, advanced diagnostics, hospitalization and surgeries across private and public clinics.',
    fullDefinitionRo: 'Spre deosebire de un abonament medical (care oferă servicii primare prestabilite într-o singură rețea de clinici), asigurarea de sănătate funcționează pe principiul transferului de risc financiar, decontând spitalizări complexe, intervenții chirurgicale costisitoare și tratamente în orice clinică autorizată, inclusiv la nivel internațional.',
    fullDefinitionEn: 'Unlike medical clinic subscriptions (which grant discounts within one proprietary network), health insurance provides true financial risk transfer, covering major hospitalizations, surgeries and treatments across any accredited facility.',
    practicalExampleRo: 'O intervenție chirurgicală de 4.500 EUR într-un spital privat este achitată direct de asigurător prin decontare directă.',
    practicalExampleEn: 'A 4,500 EUR surgery in a private hospital is settled directly by the insurer with the hospital.',
    legalNoteRo: 'Legea 95/2006 privind reforma în domeniul sănătății și Codul Fiscal (Art. 76 și 142).',
    legalNoteEn: 'Romanian Health Law 95/2006 and Fiscal Code (Art. 76 and 142).',
    relatedToolLinks: [
      { titleRo: 'Ghid Asigurări Sănătate Angajați & Fiscalitate', titleEn: 'Corporate Health Benefits Guide', href: '/asigurare-sanatate-angajati' },
      { titleRo: 'Servicii Sănătate Corporate', titleEn: 'Corporate Health Services', href: '/servicii/health-insurance-corporate' }
    ],
    relatedTermIds: ['perioada-de-asteptare', 'asigurare-de-viata']
  },
  {
    id: 'asigurare-de-raspundere-profesionala',
    slug: 'asigurare-de-raspundere-profesionala',
    termRo: 'Asigurare de răspundere profesională (Malpraxis / E&O)',
    termEn: 'Professional Indemnity (Errors & Omissions)',
    category: 'commercial_liability',
    letter: 'A',
    shortDefinitionRo: 'Protecție financiară împotriva pretențiilor de despăgubire formulate de clienți pentru erori, omisiuni sau neglijențe în exercitarea unei profesii reglementate.',
    shortDefinitionEn: 'Coverage against third-party financial claims resulting from negligence, errors or omissions in professional advisory services.',
    fullDefinitionRo: 'Obligatorie sau recomandată pentru medici, avocați, contabili, arhitecți, ingineri proiectanți, brokeri și consultanți IT. Acoperă atât prejudiciul cauzat clientului, cât și cheltuielile de apărare în instanță și expertizele tehnice.',
    fullDefinitionEn: 'Mandatory or standard for medical doctors, lawyers, accountants, architects, engineers, brokers and IT consultants. Covers compensation claims and legal defense costs.',
    practicalExampleRo: 'Un contabil omite o declarație fiscală, generând o penalitate de 15.000 RON clientului: asigurarea de răspundere profesională acoperă prejudiciul.',
    practicalExampleEn: 'An accountant errs on a statutory filing causing a 15,000 RON tax penalty: professional indemnity indemnifies the client for the loss.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Companii', titleEn: 'SME Commercial Risk Audit', href: '/audit-riscuri-companii' },
      { titleRo: 'Servicii Malpraxis & Răspundere Profesională', titleEn: 'Professional Indemnity Services', href: '/servicii/malpractice-insurance' }
    ],
    relatedTermIds: ['limita-de-raspundere', 'asigurare-do', 'raspundere-civila']
  },
  {
    id: 'asigurare-do',
    slug: 'asigurare-do',
    termRo: 'Asigurare D&O (Răspunderea Directorilor și Administratorilor)',
    termEn: 'Directors and Officers Liability (D&O)',
    category: 'commercial_liability',
    letter: 'A',
    shortDefinitionRo: 'Poliță care protejează patrimoniul personal al membrilor conducerii executive împotriva cererilor de despăgubire pentru decizii de management pretins greșite.',
    shortDefinitionEn: 'Insurance shielding the personal assets of board members and managers against claims alleging wrongful management acts.',
    fullDefinitionRo: 'Acoperă costurile de reprezentare juridică, investigațiile autorităților de reglementare și eventualele daune stabilite prin hotărâri judecătorești formulate de acționari, angajați, clienți, furnizori sau creditori în insolvență.',
    fullDefinitionEn: 'Covers legal defense costs, regulatory investigation expenses and civil damages awarded in claims brought by shareholders, employees, suppliers or insolvency creditors.',
    distinctionsRo: 'Nu acoperă faptele săvârșite cu intenție dovedită sau obținerea de profituri personale ilicite.',
    distinctionsEn: 'Excludes proven intentional fraud or illegal personal enrichment.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Companii & Management', titleEn: 'SME Commercial Risk Audit', href: '/audit-riscuri-companii' }
    ],
    relatedTermIds: ['asigurare-de-raspundere-profesionala', 'limita-de-raspundere']
  },
  {
    id: 'asigurare-cyber',
    slug: 'asigurare-cyber',
    termRo: 'Asigurare Cyber (Riscuri Cibernetice)',
    termEn: 'Cyber Risk & Data Breach Insurance',
    category: 'commercial_liability',
    letter: 'A',
    shortDefinitionRo: 'Poliță pentru companii care acoperă pierderile financiare, costurile de răspuns la incidente cibernetice și răspunderea GDPR în urma unui atac informatic.',
    shortDefinitionEn: 'Commercial policy covering financial losses, forensic response costs, extortion and GDPR liability following cyber incidents.',
    fullDefinitionRo: 'Acoperă costurile primei părți (investigație forensic IT, recuperare baze de date, negociere ransomware, întreruperea activității din cauza blocajului IT, relații publice de criză) și costurile terților (notificarea persoanelor vizate de breșă, despăgubiri GDPR, cheltuieli de apărare legală).',
    fullDefinitionEn: 'Covers first-party losses (IT forensics, data restoration, cyber extortion, business interruption) and third-party liabilities (GDPR breach notifications, third-party damages, regulatory defense).',
    practicalExampleRo: 'Un atac ransomware criptează serverele unei firme de logistică timp de 5 zile: asigurarea cyber achită costurile echipei de recuperare IT și pierderea de profit din întreruperea activității.',
    practicalExampleEn: 'A ransomware attack locks logistics servers for 5 days: cyber insurance settles the specialist IT forensics and net business interruption loss.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Digitale & Companii', titleEn: 'SME Cyber & Risk Audit', href: '/audit-riscuri-companii' }
    ],
    relatedTermIds: ['pierdere-din-intreruperea-activitatii', 'limita-de-raspundere']
  },
  {
    id: 'pierdere-din-intreruperea-activitatii',
    slug: 'pierdere-din-intreruperea-activitatii',
    termRo: 'Pierdere din întreruperea activității (Business Interruption / BI)',
    termEn: 'Business Interruption (BI)',
    category: 'commercial_liability',
    letter: 'P',
    shortDefinitionRo: 'Acoperire care compensează profitul net nerealizat și cheltuielile fixe curente (salarii, chirii) pe perioada în care afacerea este oprită din cauza unei daune materiale acoperite.',
    shortDefinitionEn: 'Coverage compensating lost net profit and ongoing fixed costs (wages, rent) while business operations are halted due to covered property damage.',
    fullDefinitionRo: 'Este condiționată de producerea prealabilă a unei daune materiale la sediul sau utilajele asigurate (ex. incendiu, inundație). Durata de despăgubire este limitată la perioada maximă de indemnizare convenită (ex. 6, 12 sau 24 de luni).',
    fullDefinitionEn: 'Triggered by preceding physical damage to insured premises or equipment. Indemnity is capped at the agreed maximum indemnity period (e.g., 6, 12, or 24 months).',
    practicalExampleRo: 'Un incendiu distruge bucătăria unui restaurant: asigurarea de proprietate reconstruiește spațiul, iar clauza de BI plătește salariile personalului și profitul nerealizat pe cele 3 luni de reconstrucție.',
    practicalExampleEn: 'A kitchen fire closes a restaurant for 3 months: property insurance covers rebuilding, while BI covers staff payroll and lost operating profit.',
    relatedToolLinks: [
      { titleRo: 'Audit Riscuri Companii & Continuitate', titleEn: 'SME Continuity & Risk Audit', href: '/audit-riscuri-companii' }
    ],
    relatedTermIds: ['asigurare-cyber', 'suma-asigurata']
  },
  {
    id: 'subrogare',
    slug: 'subrogare',
    termRo: 'Subrogare în drepturi',
    termEn: 'Subrogation',
    category: 'claims',
    letter: 'S',
    shortDefinitionRo: 'Trecerea legală a drepturilor asiguratului de a cere despăgubiri de la vinovat către asigurător, după ce acesta a plătit dauna.',
    shortDefinitionEn: 'The legal substitution of the insurer into the policyholder\'s rights against a responsible third party after claim payment.',
    fullDefinitionRo: 'După achitarea indemnizației de asigurare, asigurătorul preia automat toate drepturile asiguratului împotriva persoanei responsabile de producerea daunei, în limita sumei plătite. Asiguratul este obligat să conserve probele și să nu renunțe la drepturile sale în detrimentul asigurătorului.',
    fullDefinitionEn: 'Upon paying indemnity, the insurer legally assumes all rights of action against the liable third party up to the amount disbursed. The policyholder must not waive recovery rights.',
    legalNoteRo: 'Art. 2.210 Codul Civil Român.',
    legalNoteEn: 'Art. 2.210 Romanian Civil Code.',
    relatedTermIds: ['regres', 'despagubire', 'dauna']
  },
  {
    id: 'regres',
    slug: 'regres',
    termRo: 'Acțiune în regres',
    termEn: 'Recourse / Recovery Action',
    category: 'claims',
    letter: 'R',
    shortDefinitionRo: 'Demersul juridic prin care asigurătorul își recuperează banii plătiți ca despăgubire de la cel vinovat de producerea daunei.',
    shortDefinitionEn: 'The formal legal claim brought by an insurer to recover disbursed claim funds from the legally liable party.',
    fullDefinitionRo: 'Frecvent utilizat la RCA și CASCO: asigurătorul CASCO care a reparat mașina clientului nevinovat se întoarce în regres împotriva asigurătorului RCA al șoferului vinovat. De asemenea, asigurătorul RCA poate exercita regres împotriva propriului asigurat dacă accidentul a fost produs cu intenție, sub influența alcoolului sau fără permis de conducere valabil.',
    fullDefinitionEn: 'Common in motor claims: a CASCO insurer repairing an innocent client\'s car recovers costs from the at-fault driver\'s MTPL insurer. Also exercised by MTPL insurers against their own drivers in DUI, unlicenced driving or fraud cases.',
    legalNoteRo: 'Art. 25 din Legea nr. 132/2017.',
    legalNoteEn: 'Art. 25, Romanian Law 132/2017.',
    relatedTermIds: ['subrogare', 'rca', 'casco']
  },
  {
    id: 'reinnoire',
    slug: 'reinnoire',
    termRo: 'Reînnoire poliță',
    termEn: 'Policy Renewal',
    category: 'general',
    letter: 'R',
    shortDefinitionRo: 'Prelungirea protecției de asigurare pentru o nouă perioadă contractuală, pe baza reevaluării riscului și a noilor condiții de primă.',
    shortDefinitionEn: 'The extension of insurance cover for a subsequent term based on updated risk profile and current pricing.',
    fullDefinitionRo: 'Momentul cheie de revizuire a termenilor: se actualizează sumele asigurate conform inflației, se declară noile active sau modificări operaționale și se renegociază primele și franșizele.',
    fullDefinitionEn: 'The critical policy review milestone: sums insured are adjusted for inflation, new business activities are declared, and premiums/deductibles are renegotiated.',
    relatedToolLinks: [
      { titleRo: 'Analiză & Decizie Reînnoire', titleEn: 'Renewal Decision Brief', href: '/decizie-reinnoire' },
      { titleRo: 'Calendar Asigurări & Notificări', titleEn: 'Policy Timeline & Deadlines', href: '/termene-polite' }
    ],
    relatedTermIds: ['prima-de-asigurare', 'perioada-de-asigurare']
  },
  {
    id: 'endorsement-act-aditional',
    slug: 'endorsement-act-aditional',
    termRo: 'Endorsement / Act adițional (Anexă)',
    termEn: 'Policy Endorsement / Addendum',
    category: 'general',
    letter: 'E',
    shortDefinitionRo: 'Document oficial semnat de ambele părți care modifică prevederile, limitele, bunurile sau beneficiarii unei polițe existente în timpul valabilității acesteia.',
    shortDefinitionEn: 'A formal written agreement amending the terms, limits, covered assets or beneficiaries of an active policy.',
    fullDefinitionRo: 'Se emite la solicitarea asiguratului ori de câte ori intervin schimbări în riscul asigurat: schimbarea adresei sediului, adăugarea unui nou utilaj, modificarea persoanelor asigurate sau ajustarea sumei asigurate.',
    fullDefinitionEn: 'Issued during the policy term when changes occur: relocation of premises, acquisition of new machinery, changes to staff roster, or limits adjustment.',
    relatedToolLinks: [
      { titleRo: 'Tracker Modificări & Endorsement-uri', titleEn: 'Policy Endorsement Tracker', href: '/modificari-polite' }
    ],
    relatedTermIds: ['clauza', 'conditii-generale-si-speciale']
  },
  {
    id: 'perioada-de-notificare',
    slug: 'perioada-de-notificare',
    termRo: 'Perioadă de notificare a daunei',
    termEn: 'Notice of Loss Window / Claim Notification Period',
    category: 'claims',
    letter: 'P',
    shortDefinitionRo: 'Termenul contractual sau legal în care asiguratul are obligația să anunțe asigurătorul despre producerea unui eveniment asigurat.',
    shortDefinitionEn: 'The statutory or contractual deadline within which the policyholder must report a loss event to the insurer.',
    fullDefinitionRo: 'Nerespectarea termenului de notificare (stabilit de regulă între 24 de ore și 5 zile lucrătoare) poate permite asigurătorului să refuze plata despăgubirii dacă întârzierea a făcut imposibilă determinarea cauzelor sau întinderii daunei.',
    fullDefinitionEn: 'Failure to report a loss within policy deadlines (typically 24h to 5 business days) may jeopardize claims if the delay prevents the insurer from verifying loss causality or damage scale.',
    practicalExampleRo: 'La furtul auto, este obligatorie anunțarea poliției în maxim 24 de ore și notificarea asigurătorului CASCO în termenul prevăzut în poliță.',
    practicalExampleEn: 'In car theft, immediate police reporting and insurer notification within policy limits are mandatory conditions.',
    relatedToolLinks: [
      { titleRo: 'Ghid Notificare & Dosar Daună', titleEn: 'Claim Notification Guide', href: '/generator-dosar-dauna' }
    ],
    relatedTermIds: ['dauna', 'constatarea-daunei']
  },
  {
    id: 'valoare-de-inlocuire',
    slug: 'valoare-de-inlocuire',
    termRo: 'Valoare de înlocuire (Valoare de nou / Reconstrucție)',
    termEn: 'Reinstatement Value / Replacement Cost',
    category: 'property',
    letter: 'V',
    shortDefinitionRo: 'Costul necesar pentru a reconstrui, repara sau înlocui un bun distrus cu unul nou de aceeași natură, fără deducerea uzurii.',
    shortDefinitionEn: 'The cost required to rebuild, repair or replace damaged property with brand-new equivalent materials, without deducting wear and tear.',
    fullDefinitionRo: 'Clauza de "valoare de nou" garantează că asiguratul va primi fondurile necesare refacerii complete a clădirii sau utilajului conform prețurilor actuale de piață pentru materiale și manoperă.',
    fullDefinitionEn: 'Replacement cost wording ensures that settlement is calculated at current market prices for labor and new materials without deduction for age depreciation.',
    distinctionsRo: 'Diferă de Valoarea de Piață (care include și valoarea terenului sau amplasamentul comercial) și de Valoarea Reală (care scade uzura fizică).',
    distinctionsEn: 'Differs from Market Value (which includes land and commercial location factors) and Actual Cash Value (which deducts age depreciation).',
    relatedToolLinks: [
      { titleRo: 'Analizor Gaps & Evaluare', titleEn: 'Coverage Gap & Valuation Analyzer', href: '/gaps' }
    ],
    relatedTermIds: ['valoare-de-piata', 'valoare-agreata', 'subasigurare']
  },
  {
    id: 'valoare-de-piata',
    slug: 'valoare-de-piata',
    termRo: 'Valoare de piață',
    termEn: 'Market Value / Actual Cash Value',
    category: 'property',
    letter: 'V',
    shortDefinitionRo: 'Prețul estimat la care un bun ar putea fi vândut între un cumpărător și un vânzător independenți la data evaluării.',
    shortDefinitionEn: 'The estimated price at which an asset would change hands between a willing buyer and seller on the open market.',
    fullDefinitionRo: 'În asigurările auto CASCO, despăgubirea pentru daună totală se raportează la valoarea de piață a vehiculului la momentul accidentului (stabilită prin cataloage specializate precum Eurotax sau DAT), luând în calcul vechimea și rulajul.',
    fullDefinitionEn: 'In CASCO motor insurance, total loss payouts are benchmarked to the vehicle\'s current market value at the accident date (derived from Eurotax or DAT pricing guides).',
    relatedTermIds: ['valoare-de-inlocuire', 'valoare-agreata', 'casco']
  },
  {
    id: 'valoare-agreata',
    slug: 'valoare-agreata',
    termRo: 'Valoare agreată',
    termEn: 'Agreed Value',
    category: 'property',
    letter: 'V',
    shortDefinitionRo: 'Suma fixă acceptată contractual de ambele părți la începutul poliței ca bază definitivă de despăgubire în caz de daună totală, fără recalcularea valorii de piață.',
    shortDefinitionEn: 'A fixed monetary amount contractually agreed at inception as the definitive total-loss payout baseline, without market depreciation disputes.',
    fullDefinitionRo: 'Utilizată la asigurarea operelor de artă, a vehiculelor istorice/de colecție sau a echipamentelor industriale specializate. Necesită un raport de expertiză tehnică/evaluare independentă la încheierea poliței.',
    fullDefinitionEn: 'Used for fine art, classic vehicles, or specialized machinery. Requires an independent certified appraisal at inception.',
    relatedTermIds: ['valoare-de-inlocuire', 'valoare-de-piata']
  },
  {
    id: 'beneficiar',
    slug: 'beneficiar',
    termRo: 'Beneficiar al asigurării',
    termEn: 'Beneficiary / Loss Payee',
    category: 'general',
    letter: 'B',
    shortDefinitionRo: 'Persoana fizică sau juridică desemnată în contract să primească despăgubirea sau indemnizația de asigurare la producerea evenimentului.',
    shortDefinitionEn: 'The individual or legal entity designated in the contract to receive policy proceeds upon loss occurrence.',
    fullDefinitionRo: 'Poate fi asiguratul însuși, moștenitorii legali/testamentari (la asigurările de viață) sau un terț creditor (banca finanțatoare sau compania de leasing la care a fost cesionată polița).',
    fullDefinitionEn: 'Can be the insured person, nominated heirs, or third-party creditors (banks or leasing companies holding formal policy assignment).',
    practicalExampleRo: 'Banca comercială este înscrisă ca beneficiar cesionar pe polița CASCO a unui utilaj achiziționat în leasing financiar.',
    practicalExampleEn: 'A commercial bank is listed as loss payee on the CASCO policy of leased machinery until the facility is fully settled.',
    relatedTermIds: ['asigurare-de-viata', 'prima-de-asigurare']
  },
  {
    id: 'coasigurare-si-reasigurare',
    slug: 'coasigurare-si-reasigurare',
    termRo: 'Coasigurare și Reasigurare',
    termEn: 'Coinsurance & Reinsurance',
    category: 'commercial_liability',
    letter: 'C',
    shortDefinitionRo: 'Mecanisme financiare prin care riscurile de mari dimensiuni sunt împărțite între mai mulți asigurători sau transferate către companii de reasigurare.',
    shortDefinitionEn: 'Financial risk-sharing mechanisms where large risks are split among multiple insurers or transferred to reinsurance institutions.',
    fullDefinitionRo: 'Coasigurarea reprezintă asigurarea aceluiași bun de către doi sau mai mulți asigurători direcți în cote procentuale stabilite, printr-un lider de coasigurare. Reasigurarea este "asigurarea asigurătorilor", prin care o companie de asigurări cedează o parte din riscurile asumate către reasigurători internaționali (ex. Munich Re, Swiss Re) pentru a-și proteja solvabilitatea.',
    fullDefinitionEn: 'Coinsurance is direct risk sharing among several insurers with a leading insurer. Reinsurance is the transfer of underwriting risk from primary insurers to international reinsurers (e.g. Munich Re, Swiss Re) to safeguard solvency.',
    relatedTermIds: ['limita-de-raspundere', 'suma-asigurata']
  }
];
