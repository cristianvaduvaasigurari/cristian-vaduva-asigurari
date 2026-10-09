"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  Car, 
  Flame, 
  HeartPulse, 
  Waves, 
  Plane, 
  Building2, 
  PhoneCall, 
  ChevronRight, 
  X, 
  FileText, 
  Camera, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  CheckCircle2,
  Info,
  LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import Link from "next/link";

interface EmergencyScenario {
  id: string;
  titleRo: string;
  titleEn: string;
  badgeRo: string;
  badgeEn: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  firstActionRo: string;
  firstActionEn: string;
  safetyWarningRo: string;
  safetyWarningEn: string;
  stepsRo: { title: string; desc: string }[];
  stepsEn: { title: string; desc: string }[];
  docsRo: string[];
  docsEn: string[];
  criticalRulesRo: string[];
  criticalRulesEn: string[];
}

const emergencyScenarios: EmergencyScenario[] = [
  {
    id: "accident",
    titleRo: "Accident Auto / Tamponare",
    titleEn: "Road Accident / Collision",
    badgeRo: "Circulație Rutieră",
    badgeEn: "Road Traffic",
    icon: <Car className="w-7 h-7" />,
    color: "text-rose-500 border-rose-500/30 bg-rose-500/10",
    bgLight: "bg-rose-500/5",
    firstActionRo: "Dacă sunt persoane rănite sau pericol de incendiu: Sună imediat la 112!",
    firstActionEn: "If anyone is injured or there is fire/hazard: Call 112 immediately!",
    safetyWarningRo: "Nu vă poziționați între vehicule avariate pe carosabil. Îmbrăcați vesta reflectorizantă și amplasați triunghiurile de presemnalizare la distanță de siguranță (min. 30m / 50m pe autostradă).",
    safetyWarningEn: "Do not stand between damaged vehicles in active traffic. Put on a high-visibility vest and place warning triangles at a safe distance (min 30m / 50m on motorways).",
    stepsRo: [
      {
        title: "1. Prioritizează Siguranța Personală",
        desc: "Opriți motorul, aprindeți luminile de avarie, asigurați pasagerii și deplasați-vă în afara carosabilului sau în spatele glisierei de protecție."
      },
      {
        title: "2. Verifică Starea Pasagerilor & Victime",
        desc: "Dacă există chiar și o singură persoană rănită (chiar ușor) $\\rightarrow$ APELAȚI 112. Nu mișcați vehiculele din poziția de impact dacă sunt victime sau dacă suspectați consum de alcool."
      },
      {
        title: "3. Documentare Foto (Doar când zona e 100% sigură)",
        desc: "Fotografiați poziția mașinilor, numerele de înmatriculare, semnalizarea rutieră și detaliile avariilor înainte de degajarea carosabilului."
      },
      {
        title: "4. Stabilirea Procedurii (Amiabilă vs. Poliție)",
        desc: "Dacă sunt implicate doar 2 vehicule, fără victime și ambii șoferi sunt de acord cu vinovăția $\\rightarrow$ se poate completa formularul de Constatare Amiabilă (fizic sau digital prin aplicația Amiabila). În orice alt caz (3+ mașini, bunuri publice avariate, dezacord) $\\rightarrow$ declarați accidentul la Poliția Rutieră în termen de maximum 24 de ore."
      },
      {
        title: "5. Asistență Rutieră & Notificare Asigurator",
        desc: "Apelați numărul de asistență rutieră înscris pe polița dumneavoastră RCA / CASCO pentru tractare autorizată către service."
      }
    ],
    stepsEn: [
      {
        title: "1. Prioritize Personal Safety",
        desc: "Turn off the engine, switch on hazard lights, ensure passengers are safe, and move behind the crash barrier or onto the sidewalk."
      },
      {
        title: "2. Check for Injuries & Danger",
        desc: "If anyone is injured (even slightly) $\\rightarrow$ CALL 112 IMMEDIATELY. Do not move the vehicles if there are injuries or suspected alcohol impairment."
      },
      {
        title: "3. Photograph the Scene (Only when completely safe)",
        desc: "Capture vehicle positions, registration plates, road markings, and damage from multiple angles before clearing the road."
      },
      {
        title: "4. Determine the Legal Procedure",
        desc: "If only 2 vehicles are involved with no injuries and mutual agreement $\\rightarrow$ complete the Amicable Accident Settlement form (Constatare Amiabilă). In all other cases (3+ vehicles, public property damage, disputed fault) $\\rightarrow$ report to the Traffic Police (Biroul Tamponări) within 24 hours."
      },
      {
        title: "5. Towing & Insurer Notification",
        desc: "Call the roadside assistance number listed on your RCA or CASCO policy schedule for authorized vehicle recovery."
      }
    ],
    docsRo: [
      "Permis de conducere & Carte de identitate",
      "Certificat de înmatriculare (Talon) cu ITP valabil",
      "Polița de asigurare RCA valabilă a ambilor conducători",
      "Formularul de Constatare Amiabilă completat sau Procesul Verbal eliberat de Poliție",
      "Fotografii clare de la locul accidentului"
    ],
    docsEn: [
      "Driver's license & Passport / ID card",
      "Vehicle registration document with valid technical inspection",
      "Valid third-party liability (RCA) policies of both drivers",
      "Signed Amicable Settlement form or official Police Report (Proces Verbal)",
      "Clear accident scene photographs"
    ],
    criticalRulesRo: [
      "Nu semnați niciodată o Constatare Amiabilă dacă celălalt șofer nu recunoaște circumstanțele sau dacă datele sale par neverosimile.",
      "Nu reparați vehiculul înainte de efectuarea constatării de daună de către inspectorul asiguratorului."
    ],
    criticalRulesEn: [
      "Never sign an Amicable Settlement form if the other driver disputes the facts or if their documents appear invalid.",
      "Do not begin vehicle repairs before the formal damage inspection by the insurance surveyor."
    ]
  },

  {
    id: "medical",
    titleRo: "Urgență Medicală Acută",
    titleEn: "Acute Medical Emergency",
    badgeRo: "Sănătate & Viață",
    badgeEn: "Health & Life",
    icon: <HeartPulse className="w-7 h-7" />,
    color: "text-red-500 border-red-500/30 bg-red-500/10",
    bgLight: "bg-red-500/5",
    firstActionRo: "Pericol vital sau vătămare gravă: Apelează imediat 112 (Ambulanță / SMURD)!",
    firstActionEn: "Immediate life threat or severe injury: Call 112 (Ambulance / Emergency) immediately!",
    safetyWarningRo: "Nu întârziați apelul la serviciile de urgență 112 pentru a căuta documente de asigurare sau pentru a verifica acoperirea poliței private.",
    safetyWarningEn: "Do not delay calling emergency services (112) to search for policy papers or verify private coverage details.",
    stepsRo: [
      {
        title: "1. Apel 112 pentru Urgențe Majore",
        desc: "Pentru durere toracică acută, dificultăți severe de respirație, hemoragii masive, pierdere de conștiență sau traumatisme majore $\\rightarrow$ apelați 112 și urmați instrucțiunile dispecerului medical."
      },
      {
        title: "2. Urgențe Non-Vitale (Rețele Private)",
        desc: "Dacă este o problemă medicală acută dar non-vitală și dețineți o poliță privată de sănătate $\\rightarrow$ apelați numărul de call-center al rețelei medicale (indicat pe cardul dumneavoastră) pentru direcționare la camera de gardă parteneră."
      },
      {
        title: "3. Solicitarea Documentelor Medicale",
        desc: "La externare sau finalizarea consultului, asigurați-vă că primiți: Bilet de ieșire / Fișă UPU, Scrisoare medicală cu diagnostic clar, Rețete medicale și Decontul de cheltuieli (dacă ați achitat servicii din fonduri proprii)."
      },
      {
        title: "4. Notificarea Asiguratorului",
        desc: "Transmiteți documentele către asigurator în termenele specificate în contract (uzual 3–30 de zile) pentru decontare sau plată forfetară de spitalizare."
      }
    ],
    stepsEn: [
      {
        title: "1. Call 112 for Major Life Threats",
        desc: "For chest pain, severe respiratory distress, acute bleeding, loss of consciousness, or severe trauma $\\rightarrow$ call 112 and follow operator instructions."
      },
      {
        title: "2. Non-Vital Emergencies (Private Healthcare)",
        desc: "For urgent but non-life-threatening conditions under a private health policy $\\rightarrow$ call the 24/7 private clinic assistance number on your membership card for immediate triage."
      },
      {
        title: "3. Collect Medical Documentation",
        desc: "Always obtain the emergency room discharge summary (Fișă UPU / Bilet de ieșire), formal diagnosis letter, medical prescriptions, and payment invoices."
      },
      {
        title: "4. Submit Claim to Insurer",
        desc: "Provide medical files and receipts to the insurer within the policy deadline (typically 3–30 days) for direct settlement or reimbursement."
      }
    ],
    docsRo: [
      "Act de identitate / Pașaport",
      "Cardul de asigurat / Numărul poliței private de sănătate",
      "Bilet de ieșire din spital / Fișa UPU cu parafa medicului",
      "Facturi fiscale și chitanțe defalcate pentru medicamente și tratamente achitate"
    ],
    docsEn: [
      "Passport / Identity card",
      "Private health insurance membership card / policy number",
      "Hospital discharge summary / Medical report signed by the attending physician",
      "Itemized medical invoices and payment receipts"
    ],
    criticalRulesRo: [
      "Nu întreprindeți manevre medicale complexe fără instruire calificată dacă nu sunteți ghidat telefonic de dispecerul 112.",
      "Păstrați toate chitanțele originale pentru decontarea ulterioară a cheltuielilor de transport medical sau medicație prescrisă."
    ],
    criticalRulesEn: [
      "Do not attempt complex first-aid interventions without guidance from the emergency telephone dispatcher.",
      "Retain all original receipts for subsequent reimbursement of prescribed medications and emergency transport."
    ]
  },

  {
    id: "fire",
    titleRo: "Incendiu Clădire / Locuință",
    titleEn: "Building / Property Fire",
    badgeRo: "Incendiu & Salvări",
    badgeEn: "Fire & Rescue",
    icon: <Flame className="w-7 h-7" />,
    color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
    bgLight: "bg-orange-500/5",
    firstActionRo: "Evacuează imediat clădirea și sună la 112 (Pompieri / ISU)!",
    firstActionEn: "Evacuate the building immediately and call 112 (Fire Department)!",
    safetyWarningRo: "NU reintrați niciodată într-o clădire incendiată pentru a recupera acte, bani sau bunuri. Viața este prioritatea absolută. Nu folosiți liftul!",
    safetyWarningEn: "NEVER re-enter a burning building to retrieve documents, money, or belongings. Life is the absolute priority. Do not use elevators!",
    stepsRo: [
      {
        title: "1. Evacuare Imediată & Alertare 112",
        desc: "Părăsiți clădirea pe scările de evacuare. Alertați vecinii dacă este posibil fără a vă pune în pericol. Sunați la 112 de la o distanță sigură."
      },
      {
        title: "2. Așteptați Intervenția Pompierilor",
        desc: "Nu încercați să stingeți un incendiu extins sau unul de natură electrică cu apă. Lăsați intervenția exclusiv pe seama echipajelor ISU."
      },
      {
        title: "3. Solicitarea Procesului Verbal de Intervenție",
        desc: "După lichidarea incendiului, solicitați de la comandantul intervenției Procesul Verbal de Intervenție (document obligatoriu care atestă cauza probabilă și amploarea daunei)."
      },
      {
        title: "4. Notificare Asigurator & Conservarea Locului",
        desc: "Anunțați asiguratorul în termenul prevăzut în poliță (uzual 24–48 de ore). Nu aruncați bunurile arse și nu începeți renovarea înainte de vizita inspectorului de daune."
      }
    ],
    stepsEn: [
      {
        title: "1. Immediate Evacuation & Call 112",
        desc: "Leave the building via emergency stairs. Alert neighbors if possible without risking your safety. Call 112 once outside in a safe location."
      },
      {
        title: "2. Await Professional Firefighters",
        desc: "Do not attempt to extinguish advanced fires or electrical blazes with water. Leave firefighting entirely to professional emergency crews."
      },
      {
        title: "3. Obtain Fire Intervention Report",
        desc: "After the fire is extinguished, obtain the official Fire Intervention Report (Proces Verbal ISU), which certifies the probable cause and scope of damage."
      },
      {
        title: "4. Notify Insurer & Preserve Site",
        desc: "Notify your insurer within the contractual timeframe (typically 24–48 hours). Do not discard damaged items or start cleaning before the insurance survey."
      }
    ],
    docsRo: [
      "Procesul Verbal de Intervenție eliberat de Pompieri (ISU)",
      "Polița de Asigurare a Locuinței (PAD + Polița Facultativă)",
      "Actul de proprietate / Extrasul de Carte Funciară",
      "Fotografii și înregistrări video detaliate ale distrugerilor"
    ],
    docsEn: [
      "Official Fire Department Intervention Report (Proces Verbal ISU)",
      "Property Insurance Policy (Mandatory PAD + Comprehensive Policy)",
      "Property ownership deed / Land Registry extract",
      "Detailed photographs and video recordings of the damage"
    ],
    criticalRulesRo: [
      "Nu aruncați resturile carbonizate înainte de inspecția constatatorului de daune.",
      "Dacă locuința este nelocuibilă, păstrați facturile de cazare temporară dacă polița dumneavoastră include clauza de locuință alternativă."
    ],
    criticalRulesEn: [
      "Do not clear or discard charred debris prior to the official insurance damage assessment.",
      "If the home is uninhabitable, keep all temporary accommodation receipts if your policy covers alternative living expenses."
    ]
  },

  {
    id: "flood",
    titleRo: "Inundație Apartament / Casă",
    titleEn: "Apartment / Property Flooding",
    badgeRo: "Avarii Instalații & Apă",
    badgeEn: "Water Ingress & Leaks",
    icon: <Waves className="w-7 h-7" />,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    bgLight: "bg-blue-500/5",
    firstActionRo: "Oprește apa de la robinetul principal și evită electrocutarea!",
    firstActionEn: "Shut off the main water valve and avoid electrical contact hazards!",
    safetyWarningRo: "Dacă apa a atins prizele electrice sau tabloul de siguranțe, NU călcați în apă! Opriți curentul de la tabloul general numai dacă aveți acces uscat și sigur.",
    safetyWarningEn: "If water has reached electrical outlets or the fuse box, DO NOT step into standing water! Cut off main power only if you have dry, safe access.",
    stepsRo: [
      {
        title: "1. Oprirea Alimentării cu Apă",
        desc: "Închideți imediat robinetul general de alimentare al locuinței. Dacă apa provine de la un etaj superior sau coloană comună, solicitați oprirea apei de pe scară de către administrator."
      },
      {
        title: "2. Prevenirea Extinderii Daunei",
        desc: "Mutați aparatele electronice, documentele și mobilierul de valoare în zone uscate, doar dacă nu există risc de electrocutare."
      },
      {
        title: "3. Anunțarea Administratorului & Vecinilor",
        desc: "Contactați administratorul de bloc pentru constatarea avariei și încheierea unui proces-verbal de constatare a inundației."
      },
      {
        title: "4. Documentare Video & Foto",
        desc: "Înregistrați video și fotografiați tavanul, pereții, parchetul, covoarele și bunurile afectate înainte de curățarea apei."
      },
      {
        title: "5. Notificare Asigurator",
        desc: "Deschideți dosarul de daună la asiguratorul propriu (pentru despăgubire directă și regres împotriva vinovatului) sau la asiguratorul de răspundere civilă al vecinului."
      }
    ],
    stepsEn: [
      {
        title: "1. Shut Off Main Water Supply",
        desc: "Immediately close the main shut-off valve. If water comes from an upper floor or common pipe, contact building management to shut the building column."
      },
      {
        title: "2. Mitigate Secondary Damage",
        desc: "Elevate electronics, valuable furniture, and carpets away from standing water, ensuring there is zero electrical risk."
      },
      {
        title: "3. Notify Building Administration",
        desc: "Request the building administrator to inspect the leak and draft a formal incident report (Proces Verbal)."
      },
      {
        title: "4. Photograph & Record Damage",
        desc: "Take clear photos and video of ceilings, flooring, soaked drywall, and damaged contents prior to water extraction."
      },
      {
        title: "5. Open Claim with Insurer",
        desc: "Register the claim with your home insurer (for direct indemnification and insurer subrogation) or with the responsible party's liability insurer."
      }
    ],
    docsRo: [
      "Polița de asigurare facultativă a locuinței",
      "Proces-verbal de constatare întocmit de Asociația de Proprietari",
      "Polița de răspundere civilă a vecinului (dacă inundația provine de la etajul superior)",
      "Fotografii și înregistrări video detaliate"
    ],
    docsEn: [
      "Comprehensive homeowner insurance policy schedule",
      "Building Administrator Incident Report (Proces Verbal de Constatare)",
      "Neighbor's personal liability policy details (if water originated from an upper unit)",
      "Detailed photographic and video evidence"
    ],
    criticalRulesRo: [
      "Nu aruncați parchetul sau mobilierul umflat înainte de vizita inspectorului de daune.",
      "Dacă polița dumneavoastră include clauza 'Trace & Access', asigurați-vă că păstrați facturile instalatorului autorizat pentru spargerea și refacerea peretelui."
    ],
    criticalRulesEn: [
      "Do not discard warped flooring or damaged furniture before the surveyor's inspection.",
      "If your policy covers Trace & Access, retain all licensed plumber invoices for pipe investigation and wall repair."
    ]
  },

  {
    id: "travel",
    titleRo: "Urgență Medicală / Incident în Călătorie",
    titleEn: "Travel Medical Emergency / Incident",
    badgeRo: "Călătorii & Străinătate",
    badgeEn: "Travel & Abroad",
    icon: <Plane className="w-7 h-7" />,
    color: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    bgLight: "bg-emerald-500/5",
    firstActionRo: "Urgență vitală: Apelează numărul local de urgență (ex: 112 în UE, 911 în SUA/Canada)!",
    firstActionEn: "Immediate emergency: Call the local emergency service (e.g. 112 in EU, 911 in US/Canada)!",
    safetyWarningRo: "Pentru asistență medicală în străinătate, SUNAȚI la numărul de asistență de urgență 24/7 menționat pe polița Travel ÎNAINTE de a merge la un spital privat nesupravegheat.",
    safetyWarningEn: "For international medical assistance, CALL the 24/7 emergency assistance number on your policy schedule BEFORE visiting an unreferred private hospital.",
    stepsRo: [
      {
        title: "1. Tratarea Urgenței Vitale",
        desc: "În caz de accident grav sau pericol vital, apelați imediat serviciul local de ambulanță al țării în care vă aflați."
      },
      {
        title: "2. Apel la Numărul de Asistență 24/7 de pe Poliță",
        desc: "Sunați la dispeceratul de asistență menționat pe polița de călătorie. Dispecerul vă va direcționa către cel mai apropiat spital partener cu decontare directă (fără plată din buzunar)."
      },
      {
        title: "3. Păstrarea Tuturor Chitanțelor & Actelor",
        desc: "Dacă achitați medicamente, transport medical sau consultații minore din fonduri proprii, păstrați toate facturile medicale și chitanțele originale."
      },
      {
        title: "4. Bagaje Pierdute sau Zboruri Anulate",
        desc: "Dacă bagajul a fost pierdut la aeroport $\\rightarrow$ solicitați raportul oficial PIR (Property Irregularity Report) de la ghișeul Lost & Found înainte de a părăsi zona vamală."
      }
    ],
    stepsEn: [
      {
        title: "1. Address Critical Medical Threat",
        desc: "In serious accidents or life threats, immediately call the local national emergency service of the host country."
      },
      {
        title: "2. Contact 24/7 Policy Assistance Desk",
        desc: "Call the emergency assistance number on your travel insurance certificate. They will coordinate direct billing with an authorized local clinic."
      },
      {
        title: "3. Retain All Receipts & Medical Reports",
        desc: "If you pay out-of-pocket for consultations or prescription medications, retain all itemized medical bills and pharmacy invoices."
      },
      {
        title: "4. Lost Luggage / Flight Disruption",
        desc: "If luggage is delayed or lost $\\rightarrow$ obtain the official Property Irregularity Report (P.I.R.) at the airport baggage desk before exiting customs."
      }
    ],
    docsRo: [
      "Polița de asigurare de călătorie (PDF pe telefon sau printată)",
      "Pașaport sau Carte de Identitate",
      "Raportul medical de diagnostic și rețetele eliberate în străinătate",
      "Raportul PIR de la compania aeriană (pentru bagaje) sau adeverința de întârziere a zborului"
    ],
    docsEn: [
      "Travel insurance policy certificate (PDF on phone or printout)",
      "Passport / National Identity Card",
      "Medical diagnosis report and prescriptions issued by the treating physician",
      "Airline PIR report (for lost baggage) or flight cancellation certificate"
    ],
    criticalRulesRo: [
      "Nu acceptați intervenții chirurgicale elective fără autorizarea prealabilă a dispeceratului de asistență al asiguratorului.",
      "Păstrați tichetele de îmbarcare (Boarding Pass) ca dovadă a deplasării."
    ],
    criticalRulesEn: [
      "Do not undergo non-emergency elective procedures without prior authorization from the insurer's assistance desk.",
      "Retain your boarding passes as legal proof of travel dates."
    ]
  },

  {
    id: "business",
    titleRo: "Daună Majoră Sediu / Depozit Business",
    titleEn: "Major Commercial / Facility Loss",
    badgeRo: "Proprietăți Comerciale",
    badgeEn: "Commercial Property",
    icon: <Building2 className="w-7 h-7" />,
    color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    bgLight: "bg-purple-500/5",
    firstActionRo: "Evacuați angajații în siguranță și apelați 112 dacă există pericol!",
    firstActionEn: "Evacuate personnel safely and call 112 if hazard or fire exists!",
    safetyWarningRo: "Nu permiteți accesul angajaților în zone cu structură de rezistență compromisă, risc electric sau scurgeri de gaze.",
    safetyWarningEn: "Do not permit staff into areas with compromised structural integrity, electrical hazards, or gas leaks.",
    stepsRo: [
      {
        title: "1. Securitatea Personalului",
        desc: "Asigurați evacuarea completă a sediului, depozitului sau fabricii și acordarea primului ajutor."
      },
      {
        title: "2. Limitarea Pagubelor (Dacă e 100% sigur)",
        desc: "Opriți alimentarea cu energie, gaze și utilități pentru a preveni explozii sau incendii secundare."
      },
      {
        title: "3. Alertarea Autorităților Competente",
        desc: "Chemați Pompierii, Poliția sau ITM (în funcție de natura avariei sau a accidentului de muncă) pentru întocmirea proceselor-verbale oficiale."
      },
      {
        title: "4. Conservarea Probelor & Registru de Inventar",
        desc: "Fotografiați stocurile distruse, utilajele afectate și clădirea. Nu alterați locul faptei înainte de vizita echipei de lichidare daune."
      },
      {
        title: "5. Contactarea Brokerului / Asiguratorului",
        desc: "Deschideți dosarul de daună și activați, dacă este cazul, clauza de Întrerupere a Afacerii (Business Interruption)."
      }
    ],
    stepsEn: [
      {
        title: "1. Ensure Staff Safety",
        desc: "Complete the evacuation of the office, warehouse, or facility and provide immediate first aid if required."
      },
      {
        title: "2. Mitigate Secondary Hazards (When safe)",
        desc: "Shut off power, gas, and utilities to prevent explosions or secondary electrical fires."
      },
      {
        title: "3. Alert Competent Authorities",
        desc: "Summon Fire services, Police, or Labor Inspectorates to prepare formal official intervention reports."
      },
      {
        title: "4. Preserve Evidence & Inventory",
        desc: "Photograph damaged stock, production machinery, and structure. Do not clear debris before the insurance surveyor's visit."
      },
      {
        title: "5. Contact Broker & Insurer",
        desc: "Notify your broker and insurer to activate property damage and Business Interruption claims."
      }
    ],
    docsRo: [
      "Polița de asigurare a clădirilor și bunurilor comerciale",
      "Procesul Verbal întocmit de Pompieri / Poliție / ITM",
      "Extrase din registrul de inventar contabil și balanța stocurilor afectate",
      "Fotografii și înregistrări video complete ale utilajelor și spațiilor"
    ],
    docsEn: [
      "Commercial property and business interruption policy schedule",
      "Official Police / Fire / Labor Authority Incident Report",
      "Accounting inventory records and stock valuation ledgers",
      "Comprehensive photographs and video of damaged machinery and premises"
    ],
    criticalRulesRo: [
      "Nu reparați utilajele și nu aruncați stocurile compromise înainte de inspecția oficială a asiguratorului.",
      "Documentați zilnic pierderile financiare operaționale pentru calcularea corectă a despăgubirii din întreruperea afacerii."
    ],
    criticalRulesEn: [
      "Do not repair equipment or discard compromised inventory prior to the formal surveyor inspection.",
      "Log operational financial losses daily for accurate calculation of Business Interruption indemnity."
    ]
  }
];

export function EmergencyCenter() {
  const [lang, setLang] = useState<"ro" | "en">("ro");
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {/* 1. TOP EMERGENCY HIERARCHY NOTICE (112 SAFETY-FIRST BANNER) */}
      <div className="mb-10 p-6 sm:p-8 rounded-[2rem] bg-rose-50 border-2 border-rose-300 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-widest animate-pulse shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              {lang === "ro" ? "PERICOL IMINENT / URGENȚĂ VITALĂ" : "IMMEDIATE DANGER / LIFE THREAT"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight">
              {lang === "ro" ? "Apelați Numărul Național de Urgență: 112" : "Call National Emergency Dispatch: 112"}
            </h2>
            <p className="text-sm text-zinc-700 leading-relaxed">
              {lang === "ro"
                ? "Dacă există persoane rănite, pericol de incendiu, prăbușiri sau amenințare la adresa vieții, prioritatea absolută este punerea în siguranță și apelarea imediată a numărului 112. Nu faceți fotografii și nu căutați documente înainte de a vă asigura că sunteți în afara oricărui pericol."
                : "If there are injuries, active fire, structural hazard, or immediate life threat, prioritize personal safety and call 112 immediately. Do not take photos or search for insurance papers before reaching safety."}
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
            <a
              href="tel:112"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-heading font-black text-2xl sm:text-3xl tracking-wider shadow-md transition-transform hover:scale-105"
            >
              <PhoneCall className="w-7 h-7" />
              112
            </a>
            <span className="text-[11px] text-zinc-500 font-medium text-center">
              {lang === "ro" ? "Dispecerat Național • Gratuit 24/7" : "National Dispatch • Toll-Free 24/7"}
            </span>
          </div>
        </div>

        {/* Language selector inside banner header */}
        <div className="mt-6 pt-4 border-t border-rose-200 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-2">
          <span>
            {lang === "ro" 
              ? "Acest ghid este informativ și NU înlocuiește dispeceratul serviciilor de urgență."
              : "This guide is informative and DOES NOT replace national emergency services."}
          </span>
          <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-rose-200 text-xs shadow-xs">
            <button
              type="button"
              onClick={() => setLang("ro")}
              className={`px-3 py-0.5 rounded-full font-medium transition-all ${
                lang === "ro" ? "bg-rose-600 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Română
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-0.5 rounded-full font-medium transition-all ${
                lang === "en" ? "bg-rose-600 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR OR DETAILED SCENARIO */}
      {!selectedScenario ? (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
              {lang === "ro" ? "ETAPA POST-PERICOL: GHID DE CONDUITĂ" : "POST-HAZARD STEP-BY-STEP GUIDANCE"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900">
              {lang === "ro" ? "Selectează Tipul Incidentului" : "Select Incident Type"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              {lang === "ro"
                ? "Ghid structurat pentru protejarea dreptului la despăgubire și evitarea erorilor procedurale."
                : "Structured guidance to preserve your insurance claim rights and avoid procedural mistakes."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {emergencyScenarios.map((em) => {
              const title = lang === "ro" ? em.titleRo : em.titleEn;
              const badge = lang === "ro" ? em.badgeRo : em.badgeEn;
              return (
                <button
                  key={em.id}
                  type="button"
                  onClick={() => setSelectedScenario(em)}
                  className="p-6 rounded-3xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-md transition-all text-left flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${em.color}`}>
                        {em.icon}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-zinc-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {title}
                    </h4>
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {lang === "ro" ? em.firstActionRo : em.firstActionEn}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-900 transition-colors">
                    <span>{lang === "ro" ? "Vezi pașii obligatorii" : "View mandatory steps"}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* DETAILED SCENARIO VIEW */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-10 rounded-[2.5rem] border border-zinc-200/80 bg-white shadow-lg relative"
        >
          <button 
            type="button"
            onClick={() => setSelectedScenario(null)}
            className="absolute top-6 right-6 p-2.5 text-zinc-500 hover:text-zinc-900 transition-colors bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full"
            title="Închide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-8 pb-6 border-b border-zinc-200 pr-12">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${selectedScenario.color}`}>
              {selectedScenario.icon}
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                {lang === "ro" ? selectedScenario.badgeRo : selectedScenario.badgeEn}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 mb-2">
                {lang === "ro" ? selectedScenario.titleRo : selectedScenario.titleEn}
              </h3>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>{lang === "ro" ? selectedScenario.firstActionRo : selectedScenario.firstActionEn}</span>
              </div>
            </div>
          </div>

          {/* Critical Safety Warning */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-700" />
            <div>
              <span className="font-bold block mb-0.5">
                {lang === "ro" ? "Măsură Critică de Siguranță:" : "Critical Safety Precaution:"}
              </span>
              <span>{lang === "ro" ? selectedScenario.safetyWarningRo : selectedScenario.safetyWarningEn}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Steps (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl font-heading font-bold text-zinc-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                {lang === "ro" ? "Pași Recomandați (Secvență Cronologică)" : "Recommended Step-by-Step Sequence"}
              </h4>

              <div className="space-y-4">
                {(lang === "ro" ? selectedScenario.stepsRo : selectedScenario.stepsEn).map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                    <h5 className="font-semibold text-zinc-900 text-sm sm:text-base">
                      {step.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents & Rules (Right Column) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Docs */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h5 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {lang === "ro" ? "Documente Necesare la Dosar" : "Required Claim Documents"}
                </h5>
                <ul className="space-y-2">
                  {(lang === "ro" ? selectedScenario.docsRo : selectedScenario.docsEn).map((doc, idx) => (
                    <li key={idx} className="text-xs text-zinc-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical rules */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <h5 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  {lang === "ro" ? "Ce să NU faci niciodată" : "Critical Pitfalls to Avoid"}
                </h5>
                <ul className="space-y-2">
                  {(lang === "ro" ? selectedScenario.criticalRulesRo : selectedScenario.criticalRulesEn).map((rule, idx) => (
                    <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedScenario(null)}
                className="w-full rounded-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 text-xs h-11 font-medium shadow-xs"
              >
                {lang === "ro" ? "← Înapoi la toate scenariile" : "← Back to all scenarios"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. INSURANCE ADVISORY & BROKER ASSISTANCE DISTINCTION */}
      <div className="mt-14 p-8 rounded-[2rem] bg-zinc-50 border border-zinc-200/80 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-heading font-bold text-zinc-900">
              {lang === "ro" ? "Consultanță Broker & Asistență la Dosarul de Daună" : "Insurance Broker & Claims Advisory Contact"}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {lang === "ro"
                ? "Pentru deschiderea dosarului de daună, interpretarea clauzelor contractuale sau asistență în raport cu asiguratorul, contactați consultantul Cristian Văduva. Acest număr este dedicat exclusiv consultanței de asigurare (nu este un serviciu de dispecerat de urgență)."
                : "For claims advocacy, clause interpretation, and guidance with insurance companies, contact advisor Cristian Văduva. This contact is strictly for insurance advisory and is not an emergency dispatch service."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.phone.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {lang === "ro" ? `Consultanță: ${CONTACT.phone.display}` : `Advisory: ${CONTACT.phone.display}`}
              </a>
              <a
                href={CONTACT.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                WhatsApp Advisory
              </a>
              <Link
                href="/verifica-polita"
                className="text-xs text-zinc-600 hover:text-blue-600 underline underline-offset-4"
              >
                {lang === "ro" ? "Verifică acoperirea unei polițe existente &rarr;" : "Review an existing policy &rarr;"}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
