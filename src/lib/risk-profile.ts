import jsPDF from "jspdf";

export type UserProfileType =
  | "individual"
  | "homeowner"
  | "vehicle"
  | "professional"
  | "business"
  | "private_client";

export type ProtectionStatus =
  | "missing_info"
  | "exposure_identified"
  | "existing_reported"
  | "needs_review"
  | "specialist_clarification"
  | "not_applicable";

export interface QuestionnaireAnswers {
  // Individual / Family
  hasDependants?: boolean;
  dependantsCount?: number;
  hasExistingLifePolicy?: "yes" | "no" | "unclear";
  hasPrivateHealth?: "yes" | "no" | "unclear";
  travelsInternationally?: "frequent" | "occasional" | "rare";
  hasTravelPolicy?: "annual" | "per_trip" | "none";

  // Homeowner / Landlord
  ownsProperty?: "primary_home" | "rental_landlord" | "tenant" | "none";
  knowsReconstructionValue?: "yes" | "no" | "pad_only";
  hasPadPolicy?: boolean;
  hasOptionalHomePolicy?: "yes" | "no" | "unclear";
  rentsToTenants?: boolean;
  hasTenantLiabilityClause?: "yes" | "no" | "unclear";

  // Vehicle
  hasVehicles?: boolean;
  vehicleCount?: number;
  hasCasco?: "all_risk" | "basic" | "rca_only" | "none";
  hasDirectSettlement?: boolean;

  // Professional / Freelancer
  isSelfEmployed?: boolean;
  professionType?: string;
  hasProfessionalIndemnity?: "yes" | "no" | "unclear";
  handlesClientData?: boolean;
  hasCyberPolicy?: "yes" | "no" | "unclear";

  // Business / SME
  hasCommercialPremises?: boolean;
  hasEquipmentStock?: boolean;
  hasBusinessInterruptionCoverage?: "yes" | "no" | "unclear";
  hasEmployerLiability?: "yes" | "no" | "unclear";
  hasDirectorsLiability?: "yes" | "no" | "unclear";

  // Private Client / Luxury
  hasHighValueAssets?: boolean;
  assetTypes?: string[]; // e.g. "supercars", "watches", "fine_art", "yachts", "aviation"
  hasAgreedValueClause?: "yes" | "no" | "unclear";
}

export interface FinancialWorksheetData {
  // Property
  estimatedReconstructionCost?: number;
  currentHomeSumInsured?: number;

  // Contents
  estimatedContentsValue?: number;
  currentContentsSumInsured?: number;

  // Income / Life
  annualNetIncome?: number;
  replacementYears?: number; // e.g. 5 or 10 years
  currentLifeSumInsured?: number;

  // Business
  annualBusinessExpenses?: number;
  currentBiLimit?: number;

  currency: "RON" | "EUR";
}

export interface RiskDomainAssessment {
  id: string;
  category: UserProfileType;
  titleRo: string;
  titleEn: string;
  status: ProtectionStatus;
  statusLabelRo: string;
  statusLabelEn: string;
  triggerReasonRo: string;
  triggerReasonEn: string;
  suggestedQuestionRo: string;
  suggestedQuestionEn: string;
  relatedLink?: {
    labelRo: string;
    labelEn: string;
    url: string;
  };
}

export const PROFILE_OPTIONS = [
  {
    id: "individual" as UserProfileType,
    titleRo: "Persoană Fizică / Familie",
    titleEn: "Individual / Household",
    descRo: "Protecția veniturilor, sănătate, familie și călătorii",
    descEn: "Family income protection, health, and travel",
  },
  {
    id: "homeowner" as UserProfileType,
    titleRo: "Proprietar Imobil / Locator",
    titleEn: "Homeowner / Landlord",
    descRo: "Clădiri, locuințe închiriate, bunuri și răspundere",
    descEn: "Buildings, rental units, contents, and liability",
  },
  {
    id: "vehicle" as UserProfileType,
    titleRo: "Proprietar Auto / Flotă",
    titleEn: "Vehicle Owner",
    descRo: "Mobilitate, CASCO All-Risk și decontare directă",
    descEn: "Mobility, CASCO All-Risk, and direct settlement",
  },
  {
    id: "professional" as UserProfileType,
    titleRo: "Liber Profesionist / Consultant",
    titleEn: "Self-Employed Professional",
    descRo: "Răspundere profesională (E&O), malpraxis, cyber",
    descEn: "Professional indemnity (E&O), malpractice, cyber",
  },
  {
    id: "business" as UserProfileType,
    titleRo: "Companie / IMM",
    titleEn: "SME / Business",
    descRo: "Active comerciale, continuitatea afacerii, D&O, angajați",
    descEn: "Commercial assets, business interruption, D&O, liability",
  },
  {
    id: "private_client" as UserProfileType,
    titleRo: "Private Client / Bunuri de Lux",
    titleEn: "Private Client / Luxury Assets",
    descRo: "Vile de lux, supercars, artă, ceasuri, ambarcațiuni",
    descEn: "Luxury homes, supercars, art, watches, yachts",
  },
];

/**
 * Deterministic assessment evaluator based on answers and selected profiles.
 */
export function evaluateRiskProfile(
  profiles: UserProfileType[],
  answers: QuestionnaireAnswers
): RiskDomainAssessment[] {
  const assessments: RiskDomainAssessment[] = [];

  // 1. INDIVIDUAL DOMAINS
  if (profiles.includes("individual")) {
    // Life & Dependants
    if (answers.hasDependants) {
      if (answers.hasExistingLifePolicy === "yes") {
        assessments.push({
          id: "life_dependants",
          category: "individual",
          titleRo: "Protecția Veniturilor Familiei (Asigurare de Viață)",
          titleEn: "Family Income Protection (Life Insurance)",
          status: "needs_review",
          statusLabelRo: "Necesită Verificare Sumă Asigurată",
          statusLabelEn: "Sum Insured Review Recommended",
          triggerReasonRo: "Ai raportat persoane în întreținere și o poliță de viață existentă. Este recomandat să verifici dacă suma asigurată acoperă cel puțin 3-5 ani de cheltuieli familiale sau soldul creditelor.",
          triggerReasonEn: "You reported dependants and an existing policy. Verify if the sum insured covers at least 3-5 years of living expenses or outstanding loans.",
          suggestedQuestionRo: "Suma asigurată la deces sau invaliditate acoperă integral soldul creditului și cheltuielile familiei?",
          suggestedQuestionEn: "Does the life/disability limit fully cover outstanding loans and family living expenses?",
          relatedLink: {
            labelRo: "Calculator Asigurare Viață",
            labelEn: "Life Insurance Calculator",
            url: "/calculator-asigurare",
          },
        });
      } else if (answers.hasExistingLifePolicy === "no") {
        assessments.push({
          id: "life_dependants",
          category: "individual",
          titleRo: "Protecția Veniturilor Familiei (Asigurare de Viață)",
          titleEn: "Family Income Protection (Life Insurance)",
          status: "exposure_identified",
          statusLabelRo: "Expunere Identificată (Fără Poliță)",
          statusLabelEn: "Exposure Identified (No Policy)",
          triggerReasonRo: "Ai raportat persoane în întreținere fără o poliță de viață care să compenseze venitul în caz de invaliditate sau deces.",
          triggerReasonEn: "You reported dependants without a life insurance policy to replace income upon disability or loss of life.",
          suggestedQuestionRo: "Care sunt opțiunile de asigurare de viață cu componentă de protecție sau economisire adaptate veniturilor mele?",
          suggestedQuestionEn: "What term life or capitalisation options best fit my current family income structure?",
          relatedLink: {
            labelRo: "Ghid Asigurări de Viață",
            labelEn: "Life Insurance Guide",
            url: "/servicii/life-insurance",
          },
        });
      } else {
        assessments.push({
          id: "life_dependants",
          category: "individual",
          titleRo: "Protecția Veniturilor Familiei (Asigurare de Viață)",
          titleEn: "Family Income Protection (Life Insurance)",
          status: "missing_info",
          statusLabelRo: "Informație Neclară",
          statusLabelEn: "Information Unclear",
          triggerReasonRo: "Nu ai specificat dacă deții o asigurare de viață pentru protejarea persoanelor în întreținere.",
          triggerReasonEn: "Life insurance protection status was not confirmed.",
          suggestedQuestionRo: "Cum pot evalua corect capitalul de protecție necesar familiei mele?",
          suggestedQuestionEn: "How can I accurately calculate my family's required protection capital?",
          relatedLink: {
            labelRo: "Calculator Nevoi Financiare",
            labelEn: "Financial Needs Calculator",
            url: "/calculator-asigurare",
          },
        });
      }
    }

    // Health
    if (answers.hasPrivateHealth === "no") {
      assessments.push({
        id: "health_exposure",
        category: "individual",
        titleRo: "Acces Spitalizare și Tratament Privat (Sănătate)",
        titleEn: "Private Healthcare & Hospitalization",
        status: "exposure_identified",
        statusLabelRo: "Expunere la Costuri Medicale Neacoperite",
        statusLabelEn: "Exposure to Out-of-Pocket Medical Costs",
        triggerReasonRo: "Fără o asigurare privată de sănătate, intervențiile chirurgicale complexe sau a doua opinie medicală în clinici de top pot genera costuri personale semnificative.",
        triggerReasonEn: "Without private health insurance, complex surgeries or second medical opinions require direct out-of-pocket funding.",
        suggestedQuestionRo: "Ce rețele private de spitale (Sanador, Medlife, Regina Maria) sunt acoperite cu decontare directă?",
        suggestedQuestionEn: "Which private hospital networks are covered with direct cashless settlement?",
        relatedLink: {
          labelRo: "Asigurări Sănătate Individuale",
          labelEn: "Individual Health Insurance",
          url: "/servicii/health-insurance-individual",
        },
      });
    } else if (answers.hasPrivateHealth === "yes") {
      assessments.push({
        id: "health_exposure",
        category: "individual",
        titleRo: "Acces Spitalizare și Tratament Privat (Sănătate)",
        titleEn: "Private Healthcare & Hospitalization",
        status: "existing_reported",
        statusLabelRo: "Protecție Raportată (Verifică Spitalizarea)",
        statusLabelEn: "Protection Reported (Check Inpatient Caps)",
        triggerReasonRo: "Deții o poliță privată de sănătate. Este recomandat să verifici dacă include spitalizare și intervenții chirurgicale majore sau doar consultații în ambulatoriu.",
        triggerReasonEn: "You reported health insurance. Check if inpatient hospital care and surgical limits are included.",
        suggestedQuestionRo: "Polița acoperă intervențiile chirurgicale majore și a doua opinie medicală internațională?",
        suggestedQuestionEn: "Does the policy cover major surgery and international second opinions?",
        relatedLink: {
          labelRo: "Verificare Poliță Sănătate",
          labelEn: "Health Policy Review",
          url: "/verifica-polita",
        },
      });
    }

    // Travel
    if (answers.travelsInternationally === "frequent" && answers.hasTravelPolicy === "none") {
      assessments.push({
        id: "travel_exposure",
        category: "individual",
        titleRo: "Asistență Medicală și Urgențe Externe (Travel)",
        titleEn: "Travel Medical Emergency Assistance",
        status: "exposure_identified",
        statusLabelRo: "Risc Medical în Călătorii Frecvente",
        statusLabelEn: "Frequent Travel Medical Risk",
        triggerReasonRo: "Călătorești frecvent în străinătate fără un abonament Multi-Trip Anual sau poliță dedicată.",
        triggerReasonEn: "You travel frequently abroad without an Annual Multi-Trip policy or travel medical coverage.",
        suggestedQuestionRo: "Ce limită medicală externă include polița (recomandat min. 50.000 EUR) și dacă acoperă sporturile de sezon?",
        suggestedQuestionEn: "What medical limit is included (min 50k EUR recommended) and are seasonal sports covered?",
        relatedLink: {
          labelRo: "Asigurări Travel Anuale",
          labelEn: "Annual Travel Insurance",
          url: "/servicii/travel-insurance-annual",
        },
      });
    }
  }

  // 2. HOMEOWNER / LANDLORD DOMAINS
  if (profiles.includes("homeowner")) {
    if (answers.knowsReconstructionValue === "pad_only") {
      assessments.push({
        id: "home_underinsurance",
        category: "homeowner",
        titleRo: "Subasigurare Locuință (Doar PAD Obligatoriu)",
        titleEn: "Property Underinsurance (PAD Mandatory Only)",
        status: "exposure_identified",
        statusLabelRo: "Acoperire Insuficientă (Limita Maximă PAD 20.000 EUR)",
        statusLabelEn: "Insufficient Coverage (PAD 20k EUR Cap)",
        triggerReasonRo: "Polița PAD obligatorie acoperă doar dezastre naturale (cutremur, inundații, alunecări) până la max. 20.000 EUR, fără incendiu, conducte sparte sau răspundere civilă față de vecini.",
        triggerReasonEn: "PAD covers only natural perils up to 20k EUR, excluding fire, water leaks, and third-party neighbor liability.",
        suggestedQuestionRo: "Cum pot încheia o asigurare facultativă completă care să acopere valoarea reală de reconstrucție de nou?",
        suggestedQuestionEn: "How can I obtain a comprehensive home policy based on full new replacement value?",
        relatedLink: {
          labelRo: "Calculator Cost Reconstrucție",
          labelEn: "Reconstruction Cost Calculator",
          url: "/calculator-asigurare",
        },
      });
    } else if (answers.hasOptionalHomePolicy === "yes") {
      assessments.push({
        id: "home_wording_review",
        category: "homeowner",
        titleRo: "Poliță Locuință Facultativă — Verificare Clauze",
        titleEn: "Comprehensive Home Insurance — Terms Review",
        status: "needs_review",
        statusLabelRo: "Verificare Recomandată (Franșize & Valoare de Nou)",
        statusLabelEn: "Terms Review Recommended",
        triggerReasonRo: "Ai raportat o asigurare facultativă. Verifică dacă despăgubirea se calculează la valoarea de reconstrucție 'de nou' sau dacă asiguratorul scade uzura.",
        triggerReasonEn: "You reported a comprehensive policy. Verify whether settlement is on a 'new replacement' basis or depreciated cash value.",
        suggestedQuestionRo: "Clauza de avarie accidentală a conductelor interioare include și căutarea/repararea țevii (trace & access)?",
        suggestedQuestionEn: "Does the water damage clause include trace & access exploration costs?",
        relatedLink: {
          labelRo: "Protecție Achiziție Locuință",
          labelEn: "Home Purchase Protection",
          url: "/cumpar-casa",
        },
      });
    }

    if (answers.rentsToTenants && answers.hasTenantLiabilityClause !== "yes") {
      assessments.push({
        id: "landlord_liability",
        category: "homeowner",
        titleRo: "Răspundere Proprietar & Risc Chiriași (Landlord Protection)",
        titleEn: "Landlord Liability & Tenant Risks",
        status: "specialist_clarification",
        statusLabelRo: "Necesită Clauză Specială pentru Închiriere",
        statusLabelEn: "Requires Specific Landlord Endorsement",
        triggerReasonRo: "Imobilele închiriate necesită declararea expresă a destinației de închiriere și extinderea răspunderii civile față de terți/vecini în caz de neglijență a chiriașului.",
        triggerReasonEn: "Rented properties require explicit tenant occupancy endorsement and tenant-caused third-party liability extension.",
        suggestedQuestionRo: "Polița acoperă daunele produse de chiriaș către vecini (inundație) și pierderea chiriei în caz de sinistru?",
        suggestedQuestionEn: "Does the policy cover tenant-caused leaks to neighbors and loss of rent following an insured event?",
        relatedLink: {
          labelRo: "Ghid Proprietari & Închirieri",
          labelEn: "Landlord Protection Guide",
          url: "/proprietari-inchirieri",
        },
      });
    }
  }

  // 3. VEHICLE DOMAINS
  if (profiles.includes("vehicle")) {
    if (answers.hasCasco === "rca_only" || answers.hasCasco === "none") {
      assessments.push({
        id: "vehicle_casco",
        category: "vehicle",
        titleRo: "Protecție CASCO All-Risk & Fenomene Naturale",
        titleEn: "CASCO All-Risk & Weather Protection",
        status: "exposure_identified",
        statusLabelRo: "Risc Propriu Neacoperit (Furt, Vandalism, Grindină)",
        statusLabelEn: "Uninsured Own-Damage Risk (Theft, Hail, Hit & Run)",
        triggerReasonRo: "Deții doar RCA obligatoriu. Avariile proprii din parcare, grindina, furtul sau coliziunea cu autori necunoscuți nu sunt despăgubite.",
        triggerReasonEn: "You only hold mandatory RCA. Own damages from parking, hail, vandalism, or hit-and-run are not indemnified.",
        suggestedQuestionRo: "Ce cotație CASCO pot obține cu franșiză optimizată și asistență rutieră extinsă?",
        suggestedQuestionEn: "What CASCO terms are available with optimized deductible and expanded towing assistance?",
        relatedLink: {
          labelRo: "Ghid Asigurări Auto CASCO",
          labelEn: "CASCO Auto Guide",
          url: "/servicii/casco-insurance",
        },
      });
    } else if (answers.hasCasco === "all_risk") {
      assessments.push({
        id: "vehicle_casco",
        category: "vehicle",
        titleRo: "Protecție CASCO All-Risk & Decontare Directă",
        titleEn: "CASCO All-Risk & Direct Settlement",
        status: "existing_reported",
        statusLabelRo: "Protecție Activă (Verifică Mașina la Schimb)",
        statusLabelEn: "Active Protection (Check Replacement Car)",
        triggerReasonRo: "Deții o poliță CASCO All-Risk. Asigură-te că include mașină la schimb pe durata reparațiilor și decontare directă pe RCA.",
        triggerReasonEn: "You have a CASCO All-Risk policy. Ensure replacement vehicle and direct settlement are active.",
        suggestedQuestionRo: "Ce franșiză se aplică în caz de furt total vs. avarii parțiale în România și străinătate?",
        suggestedQuestionEn: "What excess applies to total theft vs partial damages in Romania and abroad?",
        relatedLink: {
          labelRo: "Comparație Polițe Auto",
          labelEn: "Compare Auto Policies",
          url: "/compara-polite",
        },
      });
    }
  }

  // 4. PROFESSIONAL DOMAINS
  if (profiles.includes("professional")) {
    if (answers.hasProfessionalIndemnity !== "yes") {
      assessments.push({
        id: "prof_indemnity",
        category: "professional",
        titleRo: "Răspundere Profesională (E&O / Malpraxis)",
        titleEn: "Professional Indemnity (E&O / Malpractice)",
        status: "exposure_identified",
        statusLabelRo: "Risc de Malpraxis sau Eroare Profesională",
        statusLabelEn: "Professional Error & Omission Exposure",
        triggerReasonRo: "Prestarea de servicii intelectuale, medicale sau de consultanță fără asigurare de răspundere profesională expune patrimoniul personal la cereri de despăgubire din partea clienților.",
        triggerReasonEn: "Providing consulting, IT, or medical services without professional indemnity exposes personal assets to client litigation.",
        suggestedQuestionRo: "Limita de răspundere profesională include și costurile de apărare juridică și avocați?",
        suggestedQuestionEn: "Does the professional indemnity limit include legal defence costs and barrister fees?",
        relatedLink: {
          labelRo: "Răspundere Profesională B2B",
          labelEn: "Professional Liability B2B",
          url: "/servicii/business-professional-liability",
        },
      });
    }

    if (answers.handlesClientData && answers.hasCyberPolicy !== "yes") {
      assessments.push({
        id: "prof_cyber",
        category: "professional",
        titleRo: "Risc Cyber, Ransomware & Scurgeri de Date (GDPR)",
        titleEn: "Cyber Risk, Ransomware & Data Breach (GDPR)",
        status: "specialist_clarification",
        statusLabelRo: "Risc Cibernetic de Evaluat",
        statusLabelEn: "Cyber Risk Assessment Needed",
        triggerReasonRo: "Gestionezi date confidențiale ale clienților. Un atac ransomware sau o scurgere de date poate atrage amenzi GDPR și costuri mari de recuperare a sistemelor.",
        triggerReasonEn: "You process client data. A ransomware attack or breach may trigger GDPR liabilities and system recovery costs.",
        suggestedQuestionRo: "Ce acoperă o poliță Cyber (notificare clienți, restaurare date, investigație criminalistică IT)?",
        suggestedQuestionEn: "What does Cyber cover (customer notifications, data restoration, IT forensics)?",
        relatedLink: {
          labelRo: "Ghid Asigurări Cyber",
          labelEn: "Cyber Insurance Guide",
          url: "/servicii/business-cyber-insurance",
        },
      });
    }
  }

  // 5. BUSINESS DOMAINS
  if (profiles.includes("business")) {
    if (answers.hasBusinessInterruptionCoverage !== "yes") {
      assessments.push({
        id: "biz_interruption",
        category: "business",
        titleRo: "Întreruperea Activității Comerciale (Business Interruption)",
        titleEn: "Business Interruption & Fixed Costs Protection",
        status: "exposure_identified",
        statusLabelRo: "Risc de Pierdere a Veniturilor Operaționale",
        statusLabelEn: "Operational Revenue Loss Exposure",
        triggerReasonRo: "În caz de incendiu sau avarie majoră la sediu, asigurarea de clădiri plătește reconstrucția, dar NU și salariile, chiria sau profitul nerealizat pe perioada închiderii fără clauza de Business Interruption.",
        triggerReasonEn: "Property insurance covers reconstruction, but NOT payroll, fixed rent, or lost profit during shutdown without Business Interruption.",
        suggestedQuestionRo: "Care este perioada de indemnizare (12, 24 luni) și cum se calculează profitul brut asigurat?",
        suggestedQuestionEn: "What is the indemnity period (12, 24 months) and how is insured gross profit calculated?",
        relatedLink: {
          labelRo: "Asigurări IMM & Business",
          labelEn: "SME & Business Insurance",
          url: "/servicii/imm-insurance",
        },
      });
    }

    if (answers.hasDirectorsLiability !== "yes") {
      assessments.push({
        id: "biz_dno",
        category: "business",
        titleRo: "Răspunderea Administratorilor și Directorilor (D&O)",
        titleEn: "Directors & Officers Liability (D&O)",
        status: "needs_review",
        statusLabelRo: "Patrimoniul Administratorilor Expus",
        statusLabelEn: "Executive Personal Assets Exposed",
        triggerReasonRo: "Deciziile de management pot fi contestate de asociați, creditori sau autorități. Asigurarea D&O protejează averile personale ale administratorilor.",
        triggerReasonEn: "Management decisions can be challenged by shareholders or regulators. D&O shields personal executive assets.",
        suggestedQuestionRo: "Polița D&O acoperă investigațiile preliminare ale autorităților de reglementare?",
        suggestedQuestionEn: "Does the D&O wording cover regulatory formal investigations?",
        relatedLink: {
          labelRo: "Ghid Răspundere D&O",
          labelEn: "D&O Liability Guide",
          url: "/servicii/business-directors-liability",
        },
      });
    }
  }

  // 6. PRIVATE CLIENT DOMAINS
  if (profiles.includes("private_client")) {
    assessments.push({
      id: "luxury_agreed_value",
      category: "private_client",
      titleRo: "Valoare Agreată & Patrimoniu de Lux (Agreed Value Clause)",
      titleEn: "Agreed Value & Luxury Asset Protection",
      status: answers.hasAgreedValueClause === "yes" ? "existing_reported" : "specialist_clarification",
      statusLabelRo: answers.hasAgreedValueClause === "yes" ? "Clauză Agreată Activă" : "Necesită Clauză Valoare Agreată",
      statusLabelEn: answers.hasAgreedValueClause === "yes" ? "Agreed Value Active" : "Requires Agreed Value Clause",
      triggerReasonRo: "Pentru ceasuri de colecție, artă, supercars sau imobile exclusiviste, asigurările standard aplică deprecierea de piață. Este esențială o clauză de Valoare Agreată pe baza unui raport de evaluare autorizat.",
      triggerReasonEn: "For collectible watches, art, supercars or luxury homes, standard policies apply market depreciation. An Agreed Value clause is essential.",
      suggestedQuestionRo: "Cum sunt agreate valorile asigurate pentru a exclude aplicarea regulii proporționale sau deprecierii?",
      suggestedQuestionEn: "How are insured values agreed to eliminate average clause adjustments and market depreciation?",
      relatedLink: {
        labelRo: "Servicii Private Client",
        labelEn: "Private Client Services",
        url: "/private-client",
      },
    });
  }

  return assessments;
}

/**
 * Calculates protection gap worksheet results deterministically.
 */
export function calculateFinancialGaps(data: FinancialWorksheetData): {
  homeGap?: { difference: number; status: "underinsured" | "adequate" | "overinsured"; formula: string };
  contentsGap?: { difference: number; status: "underinsured" | "adequate" | "overinsured"; formula: string };
  lifeGap?: { difference: number; target: number; status: "gap" | "adequate"; formula: string };
  biGap?: { difference: number; status: "gap" | "adequate"; formula: string };
} {
  const result: {
    homeGap?: { difference: number; status: "underinsured" | "adequate" | "overinsured"; formula: string };
    contentsGap?: { difference: number; status: "underinsured" | "adequate" | "overinsured"; formula: string };
    lifeGap?: { difference: number; target: number; status: "gap" | "adequate"; formula: string };
    biGap?: { difference: number; status: "gap" | "adequate"; formula: string };
  } = {};

  // 1. Home reconstruction gap
  if (data.estimatedReconstructionCost !== undefined && data.currentHomeSumInsured !== undefined) {
    const diff = data.currentHomeSumInsured - data.estimatedReconstructionCost;
    result.homeGap = {
      difference: diff,
      status: diff < -5000 ? "underinsured" : diff > 10000 ? "overinsured" : "adequate",
      formula: `Sumă Asigurată Clădire (${data.currentHomeSumInsured} ${data.currency}) - Cost Estimat Reconstrucție (${data.estimatedReconstructionCost} ${data.currency}) = ${diff} ${data.currency}`,
    };
  }

  // 2. Contents gap
  if (data.estimatedContentsValue !== undefined && data.currentContentsSumInsured !== undefined) {
    const diff = data.currentContentsSumInsured - data.estimatedContentsValue;
    result.contentsGap = {
      difference: diff,
      status: diff < -2000 ? "underinsured" : diff > 5000 ? "overinsured" : "adequate",
      formula: `Sumă Asigurată Bunuri (${data.currentContentsSumInsured} ${data.currency}) - Valoare Estimată Bunuri (${data.estimatedContentsValue} ${data.currency}) = ${diff} ${data.currency}`,
    };
  }

  // 3. Life / Income replacement gap
  if (data.annualNetIncome !== undefined && data.replacementYears !== undefined) {
    const target = data.annualNetIncome * data.replacementYears;
    const current = data.currentLifeSumInsured || 0;
    const diff = current - target;
    result.lifeGap = {
      difference: diff,
      target,
      status: diff < 0 ? "gap" : "adequate",
      formula: `Venit Anual (${data.annualNetIncome} ${data.currency}) × ${data.replacementYears} Ani = Țintă Protecție (${target} ${data.currency}) vs. Asigurare Curentă (${current} ${data.currency})`,
    };
  }

  // 4. Business interruption gap
  if (data.annualBusinessExpenses !== undefined && data.currentBiLimit !== undefined) {
    const diff = data.currentBiLimit - data.annualBusinessExpenses;
    result.biGap = {
      difference: diff,
      status: diff < 0 ? "gap" : "adequate",
      formula: `Limită Asigurare Pierderi (${data.currentBiLimit} ${data.currency}) - Cheltuieli Fixe Anuale (${data.annualBusinessExpenses} ${data.currency}) = ${diff} ${data.currency}`,
    };
  }

  return result;
}

/**
 * Client-side PDF Report Generator for Risk Profile.
 */
export function generateRiskProfilePdf(
  selectedProfiles: UserProfileType[],
  assessments: RiskDomainAssessment[],
  worksheet: FinancialWorksheetData,
  gaps: ReturnType<typeof calculateFinancialGaps>,
  lang: "ro" | "en" = "ro"
): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isRo = lang === "ro";
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CRISTIAN VADUVA — ASIGURARI PREMIUM", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("Raport Inventar Riscuri & Protection Gap | Insurance.CristianVaduva.com", margin, 18);

  const dateStr = new Date().toLocaleDateString(isRo ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${isRo ? "Data analizei" : "Generated on"}: ${dateStr}`, pageWidth - margin, 18, { align: "right" });

  y = 36;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(
    isRo ? "PROFIL DE RISC & GAP DE PROTECTIE FINANCIARA" : "RISK PROFILE & PROTECTION GAP REVIEW",
    margin,
    y
  );

  y += 7;

  // Profile Badges Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 14, "FD");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  const profileLabels = selectedProfiles
    .map((p) => {
      const found = PROFILE_OPTIONS.find((opt) => opt.id === p);
      return isRo ? found?.titleRo : found?.titleEn;
    })
    .join(" • ");

  doc.text(`${isRo ? "Profile Analizate" : "Profiles Reviewed"}: ${profileLabels}`, margin + 4, y + 9);

  y += 20;

  // Section 1: Risk Assessment Inventory
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "1. DOMENII DE RISC & EXPUNERI IDENTIFICATE" : "1. RISK DOMAINS & EXPOSURE INVENTORY", margin, y);

  y += 6;

  assessments.slice(0, 5).forEach((item) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 18, "FD");

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(isRo ? item.titleRo : item.titleEn, margin + 3, y + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(59, 130, 246); // blue-500
    doc.text(isRo ? item.statusLabelRo : item.statusLabelEn, pageWidth - margin - 3, y + 5.5, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const splitReason = doc.splitTextToSize(isRo ? item.triggerReasonRo : item.triggerReasonEn, contentWidth - 6);
    doc.text(splitReason, margin + 3, y + 10);

    y += 21;
  });

  y += 3;

  // Section 2: Financial Gaps (if any)
  if (gaps.homeGap || gaps.lifeGap || gaps.biGap) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(isRo ? "2. ESTIMATOR DEFICIT FINANCIAR (WORKSHEET)" : "2. FINANCIAL GAP ESTIMATOR (WORKSHEET)", margin, y);

    y += 6;

    if (gaps.homeGap) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(`• Clădire: ${gaps.homeGap.formula}`, margin + 3, y);
      y += 5;
    }

    if (gaps.lifeGap) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(`• Viață: ${gaps.lifeGap.formula}`, margin + 3, y);
      y += 5;
    }

    y += 2;
  }

  // Section 3: Recommended Questions for Advisor
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(isRo ? "3. INTREBARI RECOMANDATE PENTRU CONSULTANTUL DE ASIGURARI" : "3. RECOMMENDED QUESTIONS FOR INSURANCE ADVISOR", margin, y);

  y += 6;

  assessments.slice(0, 3).forEach((item) => {
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin, y, 3, 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const qText = isRo ? item.suggestedQuestionRo : item.suggestedQuestionEn;
    const splitQ = doc.splitTextToSize(qText, contentWidth - 6);
    doc.text(splitQ, margin + 6, y + 2.5);

    y += 4 + splitQ.length * 3.5;
  });

  y += 4;

  // Footer Disclaimers & Contact
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 22, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(isRo ? "CONSULTANTA SI AUDIT INDEPENDENT:" : "INDEPENDENT INSURANCE ADVISORY:", margin + 3, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    isRo
      ? "Telefon: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nAcest raport are caracter pur educational si de organizare. Nu reprezinta o evaluare actuariala, o cotatie obligatorie sau o opinie juridica."
      : "Phone: 0767 110 439 | Website: https://insurance.cristianvaduva.com/verifica-polita\nThis report is an educational organization tool. It is not an actuarial assessment, binding quotation, or legal opinion.",
    margin + 3,
    y + 9.5
  );

  return doc;
}
