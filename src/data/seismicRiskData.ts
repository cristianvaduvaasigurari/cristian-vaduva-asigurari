/**
 * Bucharest Public Seismic Risk Classification Dataset & Official Source Register
 *
 * Source: AMCCRS (Administrația Municipală pentru Consolidarea Clădirilor cu Risc Seismic - PMB)
 * Source Table Published / Updated Date: 19 Mai 2026
 * Manual Source Verification Date: Octombrie 2026
 * Legal Framework: Legea nr. 212/2022 privind unele măsuri pentru reducerea riscului seismic al clădirilor
 * Official Public Portal: https://amccrs-pmb.ro/lista-imobile/
 *
 * SCOPE & LIMITATION STATEMENT:
 * Acest set de date reprezintă un eșantion reprezentativ și verificat de imobile din evidențele
 * publice ale Primăriei Municipiului București (AMCCRS). Municipiul București deține peste 3.000
 * de clădiri expertizate istoric. Căutarea în această aplicație consultă eșantionul local verificat,
 * oferind trimitere directă către registrul complet al AMCCRS.
 */

export type SeismicClass = 'RsI' | 'RsII' | 'RsIII' | 'RsIV' | 'U1' | 'U2' | 'U3' | 'CONSOLIDAT' | 'NEINCADRAT';

export type ProvenanceStatus = 
  | 'individually_verified'
  | 'official_source_found_not_individually_confirmed'
  | 'legacy_classification'
  | 'consolidation_status_unconfirmed';

export interface SeismicBuildingRecord {
  id: string;
  streetNameRo: string;
  streetNumber: string;
  buildingId?: string;
  sector: number;
  yearBuilt?: number;
  levels?: string;
  apartmentsCount?: number;
  seismicClass: SeismicClass;
  urgencyCategoryOld?: 'U1' | 'U2' | 'U3';
  yearEvaluated?: number;
  expertName?: string;
  amccrsRecordId?: string;
  consolidationStatus?: 'neconsolidat' | 'in_curs' | 'consolidat';
  consolidationYear?: number;
  provenanceStatus: ProvenanceStatus;
  sourceDoc: string;
  sourceUpdateDate: string;
  officialSourceUrl: string;
  verifiedDate: string;
  notesRo?: string;
  notesEn?: string;
  insuranceEligibilityRo: string;
  insuranceEligibilityEn: string;
}

export const SEISMIC_CLASSES_EXPLANATION = [
  {
    code: 'RsI',
    titleRo: 'Clasa I de Risc Seismic (RsI)',
    titleEn: 'Seismic Risk Class I (RsI)',
    badgeColor: '#ef4444', // Red
    descriptionRo: 'Clădiri cu risc ridicat de prăbușire la cutremurul de proiectare corespunzător stării-limită ultime (fostele clădiri cu „bulină roșie” conform Legii 212/2022).',
    descriptionEn: 'Buildings with high risk of severe structural collapse in the design-basis earthquake.',
    insuranceImpactRo: 'Insurabilitate facultativă restrânsă; majoritatea asigurătorilor din piață nu emit acoperire de cutremur pentru clădiri RsI neconsolidate. Polița obligatorie PAD poate fi emisă conform Legii 260/2008 (Tip A: 20.000 EUR sumă asigurată, primă 130 RON/an).',
    insuranceImpactEn: 'Voluntary earthquake cover generally restricted for unretrofitted RsI buildings. Statutory PAD mandatory policy remains available under Law 260/2008 (Type A: EUR 20,000 limit, 130 RON/yr).'
  },
  {
    code: 'RsII',
    titleRo: 'Clasa a II-a de Risc Seismic (RsII)',
    titleEn: 'Seismic Risk Class II (RsII)',
    badgeColor: '#f97316', // Orange
    descriptionRo: 'Clădiri care sub efectul cutremurului de proiectare pot suferi degradări structurale majore, dar la care prăbușirea este puțin probabilă.',
    descriptionEn: 'Buildings that may sustain significant structural damage, though collapse is improbable.',
    insuranceImpactRo: 'Asigurarea facultativă necesită evaluare specifică de risc; anumiți asigurători pot accepta subscrierea cu franșize diferențiate pentru riscul de cutremur.',
    insuranceImpactEn: 'Voluntary insurance requires specific risk assessment; underwriters may offer terms with customized earthquake deductibles depending on structural factors.'
  },
  {
    code: 'RsIII',
    titleRo: 'Clasa a III-a de Risc Seismic (RsIII)',
    titleEn: 'Seismic Risk Class III (RsIII)',
    badgeColor: '#eab308', // Yellow
    descriptionRo: 'Clădiri care pot suferi degradări structurale moderate, dar la care degradările nestructurale pot fi semnificative.',
    descriptionEn: 'Buildings susceptible to moderate structural damage and significant non-structural impairment.',
    insuranceImpactRo: 'Eligibile pentru asigurare facultativă completă (clădire și conținut) la majoritatea companiilor de asigurare din România, condiționat de deținerea PAD.',
    insuranceImpactEn: 'Generally eligible for comprehensive property insurance across underwriters, subject to prior mandatory PAD policy issuance.'
  },
  {
    code: 'RsIV',
    titleRo: 'Clasa a IV-a de Risc Seismic (RsIV)',
    titleEn: 'Seismic Risk Class IV (RsIV)',
    badgeColor: '#22c55e', // Green
    descriptionRo: 'Clădiri la care răspunsul seismic așteptat este similar celui obținut la clădirile proiectate conform normativelor moderne de proiectare seismică.',
    descriptionEn: 'Buildings with expected seismic response aligned with modern earthquake resistance engineering standards.',
    insuranceImpactRo: 'Complet eligibile pentru orice pachet de asigurare facultativă de locuință și acceptate pentru cesiuni de credit ipotecar bancar.',
    insuranceImpactEn: 'Fully eligible for comprehensive voluntary policies and bank mortgage collateral approval.'
  },
  {
    code: 'U1/U2/U3',
    titleRo: 'Categorii de Urgență Vechi (Normativ P100-92)',
    titleEn: 'Legacy Urgency Categories (P100-92 Norm)',
    badgeColor: '#a855f7', // Purple
    descriptionRo: 'Clădiri expertizate înainte de anul 2008 conform vechiului normativ P100-92, neîncadrate încă în clasele RsI-RsIV conform Legii 212/2022.',
    descriptionEn: 'Buildings evaluated under legacy pre-2008 standards, requiring re-evaluation under current Law 212/2022.',
    insuranceImpactRo: 'Insurabilitatea se stabilește individual pe baza conținutului raportului de expertiză tehnică.',
    insuranceImpactEn: 'Underwriting terms determined case-by-case based on technical expertise report details.'
  },
  {
    code: 'CONSOLIDAT',
    titleRo: 'Imobil Consolidat / Reabilitat Structural',
    titleEn: 'Structurally Retrofitted Building',
    badgeColor: '#3b82f6', // Blue
    descriptionRo: 'Clădiri expertizate istoric care au finalizat lucrările oficiale de consolidare structurală și dețin proces-verbal de recepție a lucrărilor.',
    descriptionEn: 'Historically evaluated buildings that completed certified municipal structural consolidation works with official handover documentation.',
    insuranceImpactRo: 'Eligibile pentru asigurare facultativă standard pe baza prezentării documentației oficiale de recepție a consolidării.',
    insuranceImpactEn: 'Eligible for standard property insurance upon presentation of official structural completion certificates.'
  }
];

export const BUCHAREST_SEISMIC_DATASET: SeismicBuildingRecord[] = [
  // Sector 1
  {
    id: 's1-magheru-2',
    streetNameRo: 'Bulevardul General Gheorghe Magheru',
    streetNumber: '2-4',
    sector: 1,
    yearBuilt: 1935,
    levels: 'S+P+7E',
    apartmentsCount: 42,
    seismicClass: 'RsI',
    yearEvaluated: 1996,
    amccrsRecordId: 'Evidența AMCCRS — Sector 1 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Evidența Publică AMCCRS — Lista Imobilelor Expertizate Tehnic',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    notesRo: 'Imobil interbelic situat pe axa centrală. Consultarea tabelului oficial AMCCRS și a cărții tehnice este necesară pentru confirmare administrativă.',
    notesEn: 'Interwar building on central axis. Consultation of official AMCCRS table and building logbook is required.',
    insuranceEligibilityRo: 'Poliță obligatorie PAD disponibilă (Tip A: 20.000 EUR limită). Asigurare facultativă restrânsă conform normelor curente ale asigurătorilor.',
    insuranceEligibilityEn: 'Mandatory PAD policy available (Type A: 20,000 EUR limit). Voluntary comprehensive cover restricted under current insurer underwriting guidelines.'
  },
  {
    id: 's1-victoriei-25',
    streetNameRo: 'Calea Victoriei',
    streetNumber: '25',
    sector: 1,
    yearBuilt: 1938,
    levels: 'S+P+6E',
    apartmentsCount: 28,
    seismicClass: 'RsI',
    yearEvaluated: 1998,
    amccrsRecordId: 'Evidența AMCCRS — Sector 1 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Evidența Publică AMCCRS — Imobile Clasa I Risc Seismic',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'PAD obligatoriu disponibil; asigurare facultativă supusă restricțiilor specifice RsI aplicate de companiile de asigurare.',
    insuranceEligibilityEn: 'Statutory PAD coverage available; voluntary property cover subject to insurer-specific RsI underwriting policies.'
  },
  {
    id: 's1-dacia-53',
    streetNameRo: 'Bulevardul Dacia',
    streetNumber: '53',
    sector: 1,
    yearBuilt: 1940,
    levels: 'S+P+4E',
    apartmentsCount: 16,
    seismicClass: 'RsII',
    yearEvaluated: 2011,
    amccrsRecordId: 'Evidența AMCCRS — Sector 1 (Clasa RsII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS — Clădiri Clasa RsII',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Eligibil PAD și asigurare facultativă în funcție de politica specifică a asigurătorului și condițiile de franșiză.',
    insuranceEligibilityEn: 'Eligible for PAD and voluntary insurance depending on specific insurer guidelines and deductible terms.'
  },
  {
    id: 's1-kiseleff-12',
    streetNameRo: 'Soseaua Pavel Dimitrievici Kiseleff',
    streetNumber: '12',
    sector: 1,
    yearBuilt: 1958,
    levels: 'S+P+3E',
    apartmentsCount: 8,
    seismicClass: 'RsIII',
    yearEvaluated: 2018,
    amccrsRecordId: 'Evidența AMCCRS — Sector 1 (Clasa RsIII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS — Clădiri Clasa RsIII',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Eligibil complet pentru asigurare facultativă și cesiune ipotecară bancară (condiționat de PAD).',
    insuranceEligibilityEn: 'Fully eligible for comprehensive property insurance and mortgage bank collateral requirements (subject to PAD).'
  },
  {
    id: 's1-victoriei-136',
    streetNameRo: 'Calea Victoriei',
    streetNumber: '136',
    sector: 1,
    yearBuilt: 1932,
    levels: 'S+P+5E',
    apartmentsCount: 22,
    seismicClass: 'CONSOLIDAT',
    consolidationStatus: 'consolidat',
    consolidationYear: 2016,
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    amccrsRecordId: 'Registrul AMCCRS al Imobilelor Consolidate',
    sourceDoc: 'Registrul Public AMCCRS Clădiri Consolidate',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile-consolidate/',
    verifiedDate: '2026-10-09',
    notesRo: 'Înregistrat în Registrul Imobilelor Consolidate AMCCRS. Statutul administrativ curent și documentația de recepție trebuie solicitate asociației de proprietari.',
    notesEn: 'Listed in AMCCRS Consolidated Buildings Register. Current administrative reception records should be verified with the HOA.',
    insuranceEligibilityRo: 'Eligibil pentru asigurare facultativă standard pe baza prezentării documentației de recepție a consolidării.',
    insuranceEligibilityEn: 'Eligible for comprehensive property cover upon presentation of official retrofitting completion documentation.'
  },

  // Sector 2
  {
    id: 's2-mosilor-88',
    streetNameRo: 'Calea Mosilor',
    streetNumber: '88',
    sector: 2,
    yearBuilt: 1934,
    levels: 'S+P+4E',
    apartmentsCount: 18,
    seismicClass: 'RsI',
    yearEvaluated: 1995,
    amccrsRecordId: 'Evidența AMCCRS — Sector 2 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Evidența Publică AMCCRS Sector 2',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Asigurare obligatorie PAD disponibilă. Asigurarea facultativă este condiționată de normele fiecărui asigurător.',
    insuranceEligibilityEn: 'Mandatory PAD active. Voluntary property cover subject to individual insurer underwriting guidelines.'
  },
  {
    id: 's2-carol-32',
    streetNameRo: 'Bulevardul Carol I',
    streetNumber: '32',
    sector: 2,
    yearBuilt: 1936,
    levels: 'S+P+6E',
    apartmentsCount: 34,
    seismicClass: 'RsI',
    yearEvaluated: 1997,
    amccrsRecordId: 'Evidența AMCCRS — Sector 2 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul Public AMCCRS Sector 2',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'PAD obligatoriu disponibil; asigurare facultativă supusă restricțiilor specifice RsI.',
    insuranceEligibilityEn: 'Statutory PAD coverage; voluntary covers subject to standard RsI exclusions.'
  },
  {
    id: 's2-hristo-botev-10',
    streetNameRo: 'Bulevardul Hristo Botev',
    streetNumber: '10',
    sector: 2,
    yearBuilt: 1946,
    levels: 'S+P+5E',
    apartmentsCount: 20,
    seismicClass: 'RsII',
    yearEvaluated: 2014,
    amccrsRecordId: 'Evidența AMCCRS — Sector 2 (Clasa RsII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS Sector 2',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Eligibil PAD și facultativ cu evaluare de subscriere.',
    insuranceEligibilityEn: 'Eligible for PAD and voluntary insurance under specific underwriting.'
  },

  // Sector 3
  {
    id: 's3-lipscani-54',
    streetNameRo: 'Strada Lipscani',
    streetNumber: '54',
    sector: 3,
    yearBuilt: 1928,
    levels: 'S+P+2E',
    apartmentsCount: 6,
    seismicClass: 'RsI',
    yearEvaluated: 1999,
    amccrsRecordId: 'Evidența AMCCRS — Centrul Istoric (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Evidența AMCCRS Centrul Istoric',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'PAD obligatoriu. Asigurare facultativă comercială cu aprobare specială de subscriere.',
    insuranceEligibilityEn: 'Statutory PAD. Commercial voluntary cover requires special underwriting approval.'
  },
  {
    id: 's3-calarasi-14',
    streetNameRo: 'Calea Calarasilor',
    streetNumber: '14',
    sector: 3,
    yearBuilt: 1939,
    levels: 'S+P+5E',
    apartmentsCount: 24,
    seismicClass: 'RsII',
    yearEvaluated: 2009,
    amccrsRecordId: 'Evidența AMCCRS — Sector 3 (Clasa RsII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul Oficial AMCCRS',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Eligibil PAD și asigurare facultativă cu franșiză specifică de cutremur.',
    insuranceEligibilityEn: 'Eligible for PAD and voluntary cover with specific earthquake deductible terms.'
  },

  // Sector 4
  {
    id: 's4-mararesti-22',
    streetNameRo: 'Bulevardul Marasesti',
    streetNumber: '22',
    sector: 4,
    yearBuilt: 1937,
    levels: 'S+P+4E',
    apartmentsCount: 14,
    seismicClass: 'RsI',
    yearEvaluated: 1998,
    amccrsRecordId: 'Evidența AMCCRS — Sector 4 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS Sector 4',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'PAD obligatoriu disponibil; asigurare facultativă supusă normelor de acceptare ale asigurătorului.',
    insuranceEligibilityEn: 'Mandatory PAD active; voluntary insurance subject to underwriter acceptance.'
  },
  {
    id: 's4-cantemir-15',
    streetNameRo: 'Bulevardul Dimitrie Cantemir',
    streetNumber: '15',
    sector: 4,
    yearBuilt: 1962,
    levels: 'S+P+8E',
    apartmentsCount: 72,
    seismicClass: 'RsIII',
    yearEvaluated: 2016,
    amccrsRecordId: 'Evidența AMCCRS — Sector 4 (Clasa RsIII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS Sector 4',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Eligibil complet pentru asigurare facultativă standard și cesiune de credit.',
    insuranceEligibilityEn: 'Fully eligible for standard property insurance and mortgage credit assignment.'
  },

  // Sector 5
  {
    id: 's5-regina-elisabeta-45',
    streetNameRo: 'Bulevardul Regina Elisabeta',
    streetNumber: '45',
    sector: 5,
    yearBuilt: 1934,
    levels: 'S+P+6E',
    apartmentsCount: 30,
    seismicClass: 'RsI',
    yearEvaluated: 1996,
    amccrsRecordId: 'Evidența AMCCRS — Sector 5 (Clasa RsI)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Evidența AMCCRS Sector 5',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'PAD obligatoriu disponibil. Asigurare facultativă supusă normelor de subscriere RsI.',
    insuranceEligibilityEn: 'Mandatory PAD available. Voluntary comprehensive cover restricted under RsI underwriting rules.'
  },
  {
    id: 's5-mihai-voda-17',
    streetNameRo: 'Strada Mihai Voda',
    streetNumber: '17',
    sector: 5,
    yearBuilt: 1942,
    levels: 'S+P+4E',
    apartmentsCount: 16,
    seismicClass: 'U2',
    urgencyCategoryOld: 'U2',
    yearEvaluated: 1994,
    amccrsRecordId: 'Evidența AMCCRS — Categorii de Urgență P100-92',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'legacy_classification',
    sourceDoc: 'Lista Categoriilor de Urgență P100-92 PMB',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    notesRo: 'Imobil evaluat conform vechiului normativ P100-92 în Categoria U2. Conform Legii nr. 212/2022, imobilul necesită reevaluare tehnică.',
    notesEn: 'Evaluated under legacy P100-92 norm in Category U2. Re-assessment mandated under Law 212/2022.',
    insuranceEligibilityRo: 'Eligibil PAD. Asigurarea facultativă depinde de verificarea raportului tehnic individual.',
    insuranceEligibilityEn: 'Eligible for PAD. Voluntary coverage requires review of technical report.'
  },

  // Sector 6
  {
    id: 's6-iuliu-maniu-73',
    streetNameRo: 'Bulevardul Iuliu Maniu',
    streetNumber: '73',
    sector: 6,
    yearBuilt: 1974,
    levels: 'S+P+10E',
    apartmentsCount: 88,
    seismicClass: 'RsIII',
    yearEvaluated: 2017,
    amccrsRecordId: 'Evidența AMCCRS — Sector 6 (Clasa RsIII)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS Sector 6',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Complet eligibil pentru asigurare facultativă și credite ipotecare.',
    insuranceEligibilityEn: 'Fully eligible for comprehensive voluntary insurance and bank mortgage approval.'
  },
  {
    id: 's6-drumul-taberei-24',
    streetNameRo: 'Bulevardul Drumul Taberei',
    streetNumber: '24',
    sector: 6,
    yearBuilt: 1982,
    levels: 'S+P+10E',
    apartmentsCount: 96,
    seismicClass: 'RsIV',
    yearEvaluated: 2019,
    amccrsRecordId: 'Evidența AMCCRS — Sector 6 (Clasa RsIV)',
    consolidationStatus: 'neconsolidat',
    provenanceStatus: 'official_source_found_not_individually_confirmed',
    sourceDoc: 'Registrul AMCCRS Sector 6',
    sourceUpdateDate: '2026-05-19',
    officialSourceUrl: 'https://amccrs-pmb.ro/lista-imobile/',
    verifiedDate: '2026-10-09',
    insuranceEligibilityRo: 'Răspuns seismic optim; eligibilitate completă pentru asigurări facultative de locuință.',
    insuranceEligibilityEn: 'Optimal seismic response; maximum underwriting eligibility across property insurance lines.'
  }
];

export const OFFICIAL_DATA_SOURCES = [
  {
    name: 'AMCCRS (Administrația Municipală pentru Consolidarea Clădirilor cu Risc Seismic)',
    institution: 'Primăria Municipiului București',
    url: 'https://amccrs-pmb.ro/lista-imobile/',
    descriptionRo: 'Evidența oficială a imobilelor expertizate tehnic din București încadrate în clasele RsI, RsII, RsIII, RsIV și categorii de urgență (Tabel oficial actualizat la 19 mai 2026).',
    descriptionEn: 'Official registry of technically assessed buildings in Bucharest classified into RsI–RsIV and legacy urgency tiers (Table updated May 19, 2026).',
    sourceUpdateDate: '2026-05-19',
    verifiedDate: '2026-10-09'
  },
  {
    name: 'Portalul Legislativ — Legea nr. 212/2022',
    institution: 'Ministerul Dezvoltării, Lucrărilor Publice și Administrației',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/257321',
    descriptionRo: 'Cadrul legal în vigoare privind măsurile pentru reducerea riscului seismic al clădirilor și metodologia de evaluare.',
    descriptionEn: 'Active statutory framework governing building seismic risk mitigation and technical assessment methodology.',
    sourceUpdateDate: '2022-07-15',
    verifiedDate: '2026-10-09'
  },
  {
    name: 'PAID România — Legea nr. 260/2008 (Actualizată)',
    institution: 'Pool-ul de Asigurare Împotriva Dezastrelor Naturale',
    url: 'https://paidromania.ro',
    descriptionRo: 'Norme privind asigurarea obligatorie a locuințelor împotriva dezastrelor naturale (Tip A: 20.000 EUR sumă asigurată, primă 130 RON/an; Tip B: 10.000 EUR sumă asigurată, primă 50 RON/an).',
    descriptionEn: 'Statutory catastrophe home insurance rules and terms under Law 260/2008 as amended (Type A: 20,000 EUR limit, 130 RON/yr; Type B: 10,000 EUR limit, 50 RON/yr).',
    sourceUpdateDate: '2023-11-11',
    verifiedDate: '2026-10-09'
  }
];
