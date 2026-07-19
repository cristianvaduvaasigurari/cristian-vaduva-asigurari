"use client";

import * as React from "react"; import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShieldCheck, User, Home, Car, Briefcase, Plane, HeartPulse, TrendingUp, CheckCircle2, Award, Compass, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Question {
  id: string;
  title: string;
  description: string;
  type: "input" | "options" | "input-multi";
  inputType?: string;
  placeholder?: string;
  options?: string[];
  icon?: React.ReactNode;
  consultantInsight: string;
  fields?: Array<{ id: string; label: string; type: string; placeholder: string }>;
  followUp?: {
    condition: (answers: Record<string, string>) => boolean;
    question: string;
  };
  skipIf?: (answers: Record<string, string>) => boolean;
}

const questions: Question[] = [
  {
    id: "name",
    title: "Cum te numești?",
    description: "Să începem prin a ne cunoaște. O abordare personalizată pornește întotdeauna de la un nume.",
    type: "input",
    inputType: "text",
    placeholder: "Numele tău complet",
    icon: <User className="w-8 h-8 text-blue-600 mb-4" />,
    consultantInsight: "Vom personaliza toate estimările ulterioare și structura de risc în funcție de răspunsurile tale."
  },
  {
    id: "age",
    title: "Ce vârstă ai?",
    description: "Vârsta este un factor cheie în evaluarea medicală, speranța de viață financiară și costul primelor de asigurare.",
    type: "options",
    options: ["18-25 ani", "26-35 ani", "36-45 ani", "46-55 ani", "56-65 ani", "Peste 65 ani"],
    icon: <HeartPulse className="w-8 h-8 text-rose-500 mb-4" />,
    consultantInsight: "Statistic, persoanele de peste 35 de ani înregistrează o creștere a deficitului de asigurare (Coverage Gap) pe măsură ce datoriile sau obligațiile familiale cresc. Primele sunt mai avantajoase la vârste tinere.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.age === "Peste 65 ani",
      question: "La vârsta ta, asigurările de sănătate privată și cu componentă de economisire devin prioritare. Ești interesat de planuri de pensie privată?"
    }
  },
  {
    id: "family",
    title: "Care este statutul tău familial?",
    description: "Protecția ta financiară nu te vizează doar pe tine, ci și pe cei care depind direct de tine.",
    type: "options",
    options: ["Singur(ă)", "În cuplu", "Căsătorit(ă)", "Divorțat(ă)", "Văduv(ă)"],
    icon: <User className="w-8 h-8 text-purple-500 mb-4" />,
    consultantInsight: "Pentru familii, o asigurare de viață nu reprezintă o cheltuială, ci singura modalitate prin care copiii sau partenerul sunt scutiți de plata datoriilor în caz de accident grav.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.family === "În cuplu" || answers.family === "Căsătorit(ă)",
      question: "În cazul unui cuplu, recomandăm asigurări de viață cu beneficiar desemnat. Dorești să protejezi veniturile ambilor parteneri?"
    }
  },
  {
    id: "children",
    title: "Ai copii în întreținere?",
    description: "Educația și viitorul lor pot fi securizate prin planuri dedicate cu acumulare garantată.",
    type: "options",
    options: ["Nu", "1 copil", "2 copii", "3 copii", "4+ copii"],
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />,
    consultantInsight: "Copiii sunt cel mai puternic motiv pentru a alege un contract unit-linked cu capitalizare, asigurându-le bugetul de studii la maturitate. Costul crește odată cu numărul de copii.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.children !== "Nu",
      question: "Pentru copii, asigurările de sănătate private sunt esențiale pentru evitarea listelor de așteptare. Dorești și o ofertă pentru ei?"
    }
  },
  {
    id: "home",
    title: "Locuința ta actuală",
    description: "Clădirea fizică și bunurile din ea reprezintă cea mai tangibilă parte a averii tale.",
    type: "options",
    options: ["Proprietar (Fără credit)", "Proprietar (Cu credit)", "Chiriaș", "Locuiesc cu părinții"],
    icon: <Home className="w-8 h-8 text-amber-500 mb-4" />,
    consultantInsight: "Atenție: polițele emise obligatoriu de bănci protejează doar soldul băncii, NU și finisajele tale interioare, bunurile electronice sau răspunderea față de vecini.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.home === "Proprietar (Cu credit)",
      question: "Pentru credite ipotecare, recomandăm asigurarea de viață cu suma asigurată egală cu soldul creditului. Dorești să calculăm exact suma necesară?"
    }
  },
  {
    id: "homeValue",
    title: "Care este valoarea aproximativă a locuinței?",
    description: "Valoarea proprietății determină nivelul de protecție necesar pentru bunuri și răspundere civilă.",
    type: "options",
    options: ["Sub 50.000 EUR", "50.000 - 100.000 EUR", "100.000 - 200.000 EUR", "200.000 - 400.000 EUR", "Peste 400.000 EUR"],
    icon: <TrendingUp className="w-8 h-8 text-green-600 mb-4" />,
    consultantInsight: "Valoarea locuinței influențează direct prima de asigurare. Pentru proprietăți premium, recomandăm clauze extinse care acoperă și bunuri de lux.",
    skipIf: (answers: Record<string, string>) => answers.home === "Chiriaș" || answers.home === "Locuiesc cu părinții"
  },
  {
    id: "car",
    title: "Deții un autoturism?",
    description: "Riscul rutier este cel mai frecvent incident raportat în România. CASCO este esențial pentru mașini de valoare.",
    type: "options",
    options: ["Nu", "Da, unul sub 5 ani", "Da, unul peste 5 ani", "Da, mai multe (flotă)"],
    icon: <Car className="w-8 h-8 text-slate-700 mb-4" />,
    consultantInsight: "Generali CASCO oferă clauza exclusivă de decontare directă și asistență rutieră extinsă oriunde în Europa, crucială pentru mobilitate neîntreruptă.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.car === "Da, unul sub 5 ani" || answers.car === "Da, unul peste 5 ani",
      question: "Pentru mașini sub 5 ani, CASCO este aproape obligatoriu. Dorești să incluzi și clauza de mașină la schimb?"
    }
  },
  {
    id: "profession",
    title: "Care este statutul tău profesional?",
    description: "Domeniul de activitate definește nivelul răspunderii profesionale sau antreprenoriale.",
    type: "options",
    options: ["Angajat", "Antreprenor / Administrator", "Freelancer / PFA", "Pensionar", "Student"],
    icon: <Briefcase className="w-8 h-8 text-indigo-500 mb-4" />,
    consultantInsight: "Antreprenorii se confruntă cu riscul răspunderii directorilor (D&O) și cu cel cibernetic. Un atac ransom blochează complet activitatea IMM-urilor.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.profession === "Antreprenor / Administrator",
      question: "Pentru antreprenori, riscul cyber este critic. Ai implementat deja măsuri de securitate cibernetică?"
    }
  },
  {
    id: "income",
    title: "Care este venitul tău lunar net?",
    description: "Venitul determină capacitatea de a susține primele de asigurare și nivelul de protecție adecvat.",
    type: "options",
    options: ["Sub 2.000 RON", "2.000 - 4.000 RON", "4.000 - 8.000 RON", "8.000 - 15.000 RON", "Peste 15.000 RON"],
    icon: <TrendingUp className="w-8 h-8 text-green-600 mb-4" />,
    consultantInsight: "Regula generală este să aloci 5-10% din venit pentru protecție. La venituri mai mari, recomandăm structuri complexe de optimizare fiscală.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.income === "Peste 15.000 RON",
      question: "La acest nivel de venit, poți beneficia de planuri premium cu componentă de investiții. Ești interesat de optimizare fiscală?"
    }
  },
  {
    id: "travel",
    title: "Cât de des călătorești în străinătate?",
    description: "Asistența medicală internațională prin Europ Assistance elimină costurile uriașe din clinici.",
    type: "options",
    options: ["Nu călătoresc", "Foarte rar (o dată/an)", "Ocazional (2-3 ori/an)", "Frecvent (business)", "Foarte frecvent (lunar)"],
    icon: <Plane className="w-8 h-8 text-sky-500 mb-4" />,
    consultantInsight: "Dacă zbori frecvent, o asigurare Multi-Trip pe un an întreg este mult mai ieftină și acoperă inclusiv pierderea bagajelor sau anularea zborurilor.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.travel === "Frecvent (business)" || answers.travel === "Foarte frecvent (lunar)",
      question: "Pentru călătorii frecvente, recomandăm asigurare anuală multi-trip. Dorești să incluzi și asigurarea de anulare a zborurilor?"
    }
  },
  {
    id: "health",
    title: "Cum evaluezi starea ta de sănătate?",
    description: "Starea de sănătate influențează costul asigurărilor de viață și accesul la anumite clauze.",
    type: "options",
    options: ["Excelentă (fără probleme)", "Bună (probleme minore)", "Medie (tratament cronic)", "Ridicată (probleme serioase)"],
    icon: <HeartPulse className="w-8 h-8 text-rose-500 mb-4" />,
    consultantInsight: "Declarația onestă a stării de sănătate este crucială. Ascunderea unor afecțiuni poate duce la anularea poliței la momentul daunei.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.health === "Medie (tratament cronic)" || answers.health === "Ridicată (probleme serioase)",
      question: "În caz de afecțiuni preexistente, unele clauze pot fi excluse sau supuse unor termeni speciali. Ești de acord cu o evaluare medicală detaliată?"
    }
  },
  {
    id: "investment",
    title: "Care este principalul tău obiectiv financiar?",
    description: "Alege pilonul pe care dorești să îl optimizezi cu prioritate în acest moment.",
    type: "options",
    options: ["Protecția familiei", "Protecția veniturilor", "Economisire pentru copii", "Pensie privată", "Investiții premium"],
    icon: <TrendingUp className="w-8 h-8 text-green-600 mb-4" />,
    consultantInsight: "Optimizarea fiscală prin polițe de asigurare cu componentă de economisire aduce avantaje unice conform legislației din România.",
    followUp: {
      condition: (answers: Record<string, string>) => answers.investment === "Investiții premium",
      question: "Pentru investiții premium, recomandăm fonduri internaționale diversificate. Care este orizontul tău de investiție preferat (3, 5 sau 10 ani)?"
    }
  },
  {
    id: "contact",
    title: "Unde îți trimitem analiza strategică?",
    description: "Vei primi recomandările pe email, iar un expert autorizat te va contacta pentru clarificare.",
    type: "input-multi",
    fields: [
      { id: "email", label: "Email", type: "email", placeholder: "adresa@email.com" },
      { id: "phone", label: "Telefon", type: "tel", placeholder: "07XX XXX XXX" }
    ],
    icon: <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />,
    consultantInsight: "Nu vindem și nu transmitem datele tale. Toate discuțiile sunt protejate conform standardelor noastre de confidențialitate de elită."
  }
];

export function AdvisorWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<Array<{
    title: string;
    desc: string;
    tag: string;
    benefits: string[];
    exclusions: string[];
    riskExposed: string;
    costRange: string;
  }>>([]);

  const handleOptionSelect = (option: string) => {
    const updatedAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(updatedAnswers);
    handleNext(updatedAnswers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId?: string) => {
    if (fieldId) {
      setAnswers({ ...answers, [fieldId]: e.target.value });
    } else {
      setAnswers({ ...answers, [questions[step].id]: e.target.value });
    }
  };

  const handleNext = (currentAnswers = answers) => {
    if (step < questions.length - 1) {
      let nextStep = step + 1;
      // Skip questions that should be skipped based on current answers
      while (nextStep < questions.length && questions[nextStep].skipIf && questions[nextStep].skipIf!(currentAnswers)) {
        nextStep++;
      }
      setStep(nextStep);
    } else {
      analyzeData(currentAnswers);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const generateRecommendations = (data: Record<string, string>) => {
    const recs = [];

    // Locuinta & Patrimoniu - Enhanced with value-based recommendations
    if (data.home && data.home.includes("Proprietar")) {
      let homeTitle = "Asigurare Facultativă de Locuință (Generali Premium)";
      let homeDesc = "Protecție completă ce depășește polița standard. Asigură structura, finisajele noi, bunurile și răspunderea civilă față de vecini.";
      let homeCost = "~120 - 250 € / an";
      
      if (data.homeValue && data.homeValue.includes("Peste 400.000")) {
        homeTitle = "Asigurare Locuință Premium Elite (Clauze Extinse)";
        homeDesc = "Pentru proprietăți de valoare, include protecție pentru bunuri de lux, artă și electronice premium, cu asistență dedicată 24/7.";
        homeCost = "~350 - 600 € / an";
      } else if (data.homeValue && data.homeValue.includes("200.000 - 400.000")) {
        homeTitle = "Asigurare Locuință Premium (Clauze Extinse)";
        homeDesc = "Protecție completă pentru proprietăți medii, cu acoperire extinsă pentru bunuri electronice și răspundere civilă mărită.";
        homeCost = "~200 - 350 € / an";
      }

      recs.push({
        title: homeTitle,
        desc: homeDesc,
        tag: "Patrimoniu",
        benefits: [
          "Acoperire la valoare de înlocuire nouă (nu uzată)",
          "Protecție pentru infiltrații de la vecini și inundații accidentale",
          "Include asistență tehnică de urgență 24/7 (lăcătuș, instalații)",
          "Despăgubire rapidă pentru scurtcircuit aparate electrice",
          data.homeValue && data.homeValue.includes("Peste 200.000") ? "Clauze speciale pentru bunuri de lux și artă" : "Acoperire standard pentru bunuri electronice"
        ].filter(Boolean),
        exclusions: [
          "Clădiri construite fără autorizație legală",
          "Proprietăți degradate structural anterior emiterii",
          "Obiecte de artă neevaluate oficial (necesită clauză specială)",
          "Daune cauzate de neglijență evidentă a proprietarului"
        ],
        riskExposed: `Pierderea totală a valorii imobilului în caz de incendiu sau răspundere civilă ${data.homeValue && data.homeValue.includes("Peste 200.000") ? "de sute de mii" : "de zeci de mii"} de euro pentru daune cauzate vecinilor.`,
        costRange: homeCost
      });
    }

    // Viata & Protectie Familie - Enhanced with age and income considerations
    if (data.family === "Căsătorit(ă)" || data.children !== "Nu" || data.home === "Proprietar (Cu credit)") {
      let lifeTitle = "Asigurare de Viață de Risc Pur (Generali Protekt)";
      let lifeDesc = "Creată special pentru a proteja nivelul de trai al familiei tale sau pentru a stinge automat creditele bancare în caz de deces sau invaliditate.";
      let lifeCost = "~30 - 80 € / lună";
      
      // Age-based adjustments
      if (data.age && data.age.includes("Peste 65")) {
        lifeTitle = "Asigurare de Viață Senior (Generali Silver)";
        lifeDesc = "Pentru persoane peste 65 ani, cu focus pe acoperirea cheltuielilor funerare și lăsarea unui moștenire financiară.";
        lifeCost = "~50 - 120 € / lună";
      } else if (data.age && data.age.includes("56-65")) {
        lifeTitle = "Asigurare de Viață Pre-Pensionare";
        lifeDesc = "Optimizată pentru perioada de tranziție la pensie, cu protecție pentru partener și acoperirea datoriilor rămase.";
        lifeCost = "~40 - 90 € / lună";
      }

      // Income-based adjustments
      if (data.income && data.income.includes("Peste 15.000")) {
        lifeTitle = "Asigurare de Viață High Net Worth";
        lifeDesc = "Pentru venituri premium, cu sume asigurate de sute de mii de euro și clauze de investiții integrate.";
        lifeCost = "~150 - 400 € / lună";
      }

      recs.push({
        title: lifeTitle,
        desc: lifeDesc,
        tag: "Viață & Familie",
        benefits: [
          "Sumă asigurată garantată plătită rapid beneficiarilor",
          "Scutire de la plata primelor în caz de invaliditate permanentă",
          "Clauze adiționale pentru boli grave (cancer, infarct) cu plată imediată",
          "Tarife optime corelate cu profilul tău de vârstă și sănătate",
          data.income && data.income.includes("Peste 8.000") ? "Opțiune de componentă de investiții internaționale" : "Protecție pură de risc optimizată cost"
        ].filter(Boolean),
        exclusions: [
          "Boli preexistente nedeclarate la completarea chestionarului medical",
          "Participarea la sporturi extreme fără declarare prealabilă",
          "Evenimente produse sub influența substanțelor interzise",
          data.age && data.age.includes("Peste 55") ? "Unele clauze pot avea limite de vârstă" : "Suicide clause valabilă în primii 2 ani de contract"
        ].filter(Boolean),
        riskExposed: `Moștenirea datoriilor bancare de către copii sau partener și scăderea abruptă a veniturilor familiei ${data.income && data.income.includes("Peste 8.000") ? "cu impact major asupra stilului de viață" : ""}.`,
        costRange: lifeCost
      });
    }

    // Auto & CASCO - Enhanced with vehicle age considerations
    if (data.car && data.car.includes("Da")) {
      let autoTitle = "Pachet Auto Complet (RCA + CASCO Premium)";
      let autoDesc = "Protecție all-risk pentru autoturismul tău, cu decontare directă și asistență rutieră extinsă în Europa.";
      let autoCost = "~200 - 400 € / an";
      
      if (data.car.includes("sub 5 ani")) {
        autoTitle = "Pachet Auto Nou (CASCO Full + RCA Premium)";
        autoDesc = "Pentru mașini sub 5 ani, include clauze de mașină la schimb, piese originale și protecție vandalism.";
        autoCost = "~300 - 500 € / an";
      } else if (data.car.includes("mai multe")) {
        autoTitle = "Pachet Flotă Auto (RCA + CASCO Fleet)";
        autoDesc = "Soluție optimizată pentru multiple vehicule, cu reduceri volum și administrare centralizată.";
        autoCost = "~500 - 1200 € / an (în funcție de flotă)";
      }

      recs.push({
        title: autoTitle,
        desc: autoDesc,
        tag: "Auto & Mobilitate",
        benefits: [
          "Decontare directă RCA (nu depinzi de asigurătorul vinovatului)",
          "CASCO all-risk cu acoperire vandalism și fenomene naturale",
          "Asistență rutieră 24/7 în România și Europa",
          data.car.includes("sub 5 ani") ? "Mașină la schimb pe perioada reparației" : "Reparații în service-uri autorizate",
          data.car.includes("mai multe") ? "Administrare centralizată și reduceri volum" : "Procesare rapidă a daunelor"
        ].filter(Boolean),
        exclusions: [
          "Conducerea sub influența alcoolului sau drogurilor",
          "Daune produse în competiții sportive neautorizate",
          "Utilizarea vehiculului în scopuri neautorizate (taxi, curse)",
          "Modificări neautorizate ale vehiculului care afectează siguranța"
        ],
        riskExposed: `Costuri de reparație de ${data.car.includes("sub 5 ani") ? "zeci de mii" : "mii"} de euro în caz de accident, plus pierderea mobilității pe perioada reparației.`,
        costRange: autoCost
      });
    }

    // Sanatate - Enhanced with health status and travel frequency
    if (data.health || data.travel) {
      let healthTitle = "Asigurare de Sănătate Privată (Generali Global Health)";
      let healthDesc = "Acces direct și necondiționat la rețeaua premium de clinici și spitale private din România și din întreaga lume.";
      let healthCost = "~50 - 150 € / lună";
      
      // Health status adjustments
      if (data.health && (data.health.includes("Medie") || data.health.includes("Ridicată"))) {
        healthTitle = "Asigurare de Sănătate cu Management Afectiuni";
        healthDesc = "Pentru persoane cu afecțiuni cronice, include acoperire extinsă și monitorizare medicală dedicată.";
        healthCost = "~80 - 200 € / lună";
      }

      // Travel frequency adjustments
      if (data.travel && data.travel.includes("Frecvent")) {
        healthTitle = "Asigurare de Sănătate Internațională Premium";
        healthDesc = "Include acoperire extinsă în străinătate, repatriere medicală și asistență travel multi-trip.";
        healthCost = "~100 - 250 € / lună";
      }

      recs.push({
        title: healthTitle,
        desc: healthDesc,
        tag: "Sănătate Premium",
        benefits: [
          "Spitalizare și intervenții chirurgicale acoperite 100% în privat",
          "A doua opinie medicală (Second Opinion) de la clinici internaționale",
          "Telemedicină 24/7 prin portalul dedicat de pacienți",
          "Acoperire completă pentru analize, tratamente și medicamente",
          data.travel && data.travel.includes("Frecvent") ? "Asistență medicală internațională și repatriere" : "Rețea extinsă în România",
          data.children !== "Nu" ? "Abonamente familiale cu reduceri pentru copii" : "Protecție individuală optimizată"
        ].filter(Boolean),
        exclusions: [
          "Tratamente estetice sau de înfrumusețare",
          "Medicamente experimentale neaprobate de autoritățile medicale",
          "Spitalizări cauzate de automutilare",
          data.health && data.health.includes("Ridicată") ? "Unele afecțiuni preexistente pot fi excluse" : "Afecțiuni preexistente nedeclarate"
        ].filter(Boolean),
        riskExposed: `Tratamente medicale costisitoare efectuate în regim privat în caz de diagnostic grav, ce pot duce la faliment personal ${data.travel && data.travel.includes("Frecvent") ? " sau costuri uriașe în străinătate" : ""}.`,
        costRange: healthCost
      });
    }

    // Business & Corporate - Enhanced with profession and income
    if (data.profession === "Antreprenor / Administrator" || data.profession === "Freelancer / PFA") {
      let businessTitle = "Pachet Business Complete (D&O + Cyber Risk + Property)";
      let businessDesc = "Pachet dual conceput pentru liderii moderni. Protejează averea personală de deciziile greșite de business și business-ul de atacurile cibernetice.";
      let businessCost = "~300 - 800 € / an";
      
      if (data.income && data.income.includes("Peste 15.000")) {
        businessTitle = "Pachet Business Premium (D&O Extins + Cyber Advanced)";
        businessDesc = "Pentru companii cu venituri ridicate, include acoperire extinsă pentru răspunderea managerilor și protecție cyber avansată.";
        businessCost = "~800 - 2000 € / an";
      }

      recs.push({
        title: businessTitle,
        desc: businessDesc,
        tag: "Business & Security",
        benefits: [
          "Acoperire cheltuieli de judecată și daune stabilite prin instanță pentru manageri",
          "Echipă de investigație forensic cyber pusă la dispoziție în max 2 ore de la incident",
          "Acoperire pierderi financiare din întreruperea activității din cauza ransomware",
          "Protecție împotriva amenzilor GDPR acolo unde legea permite",
          data.income && data.income.includes("Peste 8.000") ? "Acoperire extinsă pentru litigii comerciale" : "Protecție standard pentru riscuri de bază"
        ].filter(Boolean),
        exclusions: [
          "Fapte de fraudă intenționată dovedite penal",
          "Sisteme IT complet neactualizate sau lipsite de firewall de bază",
          "Litigii demarate înaintea perioadei de retroactivitate a poliței",
          "Daune cauzate de nerespectarea deliberată a legilor și reglementărilor"
        ],
        riskExposed: `Sechestru pe bunurile personale ale administratorului în caz de procese cu acționarii, sau blocaj operațional total din cauza atacurilor cibernetice ${data.income && data.income.includes("Peste 8.000") ? "cu pierderi de sute de mii de euro" : ""}.`,
        costRange: businessCost
      });
    }

    // Pensie & Investitii Premium - Enhanced with investment objectives
    if (data.investment === "Pensie privată" || data.investment === "Investiții premium" || data.investment === "Economisire pentru copii") {
      let investTitle = "Poliță cu Acumulare de Capital & Fonduri Internaționale";
      let investDesc = "Combinația optimă între protecția clasică și accesul direct la piețele de capital internaționale, cu administrare profesională.";
      let investCost = "~100 - 500 € / lună";
      
      if (data.investment === "Investiții premium") {
        investTitle = "Portofoliu Investiții Internațional (Unit-Linked Premium)";
        investDesc = "Pentru investitori cu experiență, acces la fonduri diversificate global și strategii de investiții avansate.";
        investCost = "~200 - 1000 € / lună";
      } else if (data.investment === "Economisire pentru copii") {
        investTitle = "Plan de Economisire Educațional (Generali Junior)";
        investDesc = "Structurat special pentru acumulare în vederea educației copiilor, cu protecție integrată și flexibilitate la retragere.";
        investCost = "~50 - 200 € / lună";
      }

      recs.push({
        title: investTitle,
        desc: investDesc,
        tag: "Investiții",
        benefits: [
          "Acces la portofolii diversificate gestionate de Generali Investments",
          "Componentă de protecție pentru accident inclusă automat",
          "Flexibilitate maximă în depuneri suplimentare (top-up) și retrageri",
          "Avantaje fiscale unice și scutire de impozit pe profitul asigurat la scadență",
          data.investment === "Investiții premium" ? "Strategii de investiții avansate și fonduri globale" : "Gestionare conservativă optimizată pentru siguranță"
        ].filter(Boolean),
        exclusions: [
          "Retrageri anticipate în primii 3 ani fără penalizări",
          "Fluctuațiile pieței de capital (randamentul trecut nu garantează profitul viitor)",
          "Suicide clause valabilă în primii 2 ani de contract",
          data.investment === "Investiții premium" ? "Risc de piață mai ridicat pentru fonduri internaționale" : "Randamente limitate pentru strategii conservatoare"
        ].filter(Boolean),
        riskExposed: "Devalorizarea banilor prin inflație și lipsa unei plase de siguranță financiară pentru perioada de retragere din activitate.",
        costRange: investCost
      });
    }

    // Default Fallback - Sanatate Premium if no other recommendations
    if (recs.length === 0) {
      recs.push({
        title: "Asigurare de Sănătate Internațională (Generali Global Health)",
        desc: "Acces direct și necondiționat la rețeaua premium de clinici și spitale private din România și din întreaga lume.",
        tag: "Sănătate Premium",
        benefits: [
          "Spitalizare și intervenții chirurgicale acoperite 100% în privat",
          "A doua opinie medicală (Second Opinion) de la clinici din SUA/Austria",
          "Telemedicină 24/7 prin portalul dedicat de pacienți",
          "Acoperire completă pentru analize, tratamente și medicamente prescrise"
        ],
        exclusions: [
          "Tratamente estetice sau de înfrumusețare",
          "Medicamente experimentale neaprobate de autoritățile medicale",
          "Spitalizări cauzate de automutilare"
        ],
        riskExposed: "Tratamente medicale costisitoare efectuate în regim privat în caz de diagnostic grav, ce pot duce la faliment personal.",
        costRange: "~50 - 150 € / lună"
      });
    }

    return recs;
  };

  const analyzeData = async (currentAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    // Real-feeling analysis duration
    await new Promise(resolve => setTimeout(resolve, 2500));

    const recs = generateRecommendations(currentAnswers);
    setRecommendations(recs);
    setIsAnalyzing(false);
    setIsComplete(true);

    // Save Lead to local API
    try {
      const formData = new FormData();
      formData.append("name", currentAnswers.name || "Anonim");
      formData.append("email", currentAnswers.email || "");
      formData.append("phone", currentAnswers.phone || "");
      formData.append("service", "Recomandă-mi Asigurarea Potrivită Assessment");
      formData.append("source", "Recomandă-mi Asigurarea Potrivită");
      formData.append("metadata", JSON.stringify(currentAnswers));

      await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const currentQuestion = questions[step];
  const progress = ((step) / questions.length) * 100;
  const activeFollowUp = currentQuestion.followUp?.condition(answers)
    ? currentQuestion.followUp.question
    : null;

  if (isAnalyzing) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-8"
        >
          <div className="w-16 h-16 border-4 border-amber-600/30 border-t-amber-600 rounded-full" />
        </motion.div>
        <h2 className="text-2xl font-bold font-heading mb-4 text-slate-800">Se analizează profilul tău...</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Algoritmii noștri corelează răspunsurile cu portofoliul de asistență Generali România, calculând coeficienții de risc, beneficiile specifice și excluderile cheie pentru tine.
        </p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-heading font-bold mb-4 text-slate-900">Raport Strategic de Protecție</h2>
          <p className="text-lg text-slate-600">
            {answers.name}, iată recomandările personalizate conform analizei tale de risc. Click pe oricare soluție pentru a vedea beneficiile și excluderile detaliate.
          </p>
        </div>

        {/* Dynamic Solutions Tab/Grid with Exclusions & Benefits */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Solutions List */}
          <div className="lg:col-span-5 space-y-4">
            {recommendations.map((rec, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSolution(idx)}
                className={`w-full p-6 text-left rounded-lg border transition-all duration-300 flex flex-col ${
                  selectedSolution === idx || (selectedSolution === null && idx === 0)
                    ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02]"
                    : "bg-white border-slate-200/60 hover:bg-slate-50 text-slate-800 hover:border-slate-300"
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2.5 py-0.5 rounded-full w-max ${
                  selectedSolution === idx || (selectedSolution === null && idx === 0)
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-blue-50 text-blue-600"
                }`}>
                  {rec.tag}
                </div>
                <h3 className="text-lg font-bold mb-2">{rec.title}</h3>
                <p className={`text-xs line-clamp-2 ${
                  selectedSolution === idx || (selectedSolution === null && idx === 0)
                    ? "text-slate-300"
                    : "text-slate-500"
                }`}>
                  {rec.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Active Solution Details (Consultant explanations) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl">
            {(() => {
              const active = recommendations[selectedSolution ?? 0];
              if (!active) return null;
              return (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-2xl font-bold font-heading text-slate-900">{active.title}</h3>
                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{active.costRange}</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Beneficii Exclusive Client
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {active.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2.5 flex items-center gap-1.5">
                      <EyeOff className="w-4 h-4 text-rose-500" /> Excluderi Importante (Ce nu acoperă)
                    </h4>
                    <ul className="space-y-2 text-xs text-rose-700/80">
                      {active.exclusions.map((e, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> Expunerea de Risc Analizată
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {active.riskExposed}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Lead Capture Feedback */}
        <div className="glass premium-card p-10 rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50/30 to-white text-center mt-8">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 text-slate-800">Planul tău a fost preluat de Cristian Văduva</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
            Am înregistrat preferințele tale. Te vom contacta telefonic pe <strong>{answers.phone}</strong> în maxim 24 de ore pentru a-ți pune la dispoziție cotațiile oficiale emise de subscriitorii noștri.
          </p>
          <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold" onClick={() => window.location.href = '/'}>
            Înapoi la Pagina Principală
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          <span>Pasul {step + 1} din {questions.length}</span>
          <span>{Math.round(progress)}% Complet</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-slate-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Main Wizard Card */}
        <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-grow flex flex-col justify-center"
            >
              {currentQuestion.icon}
              <h2 className="text-2xl font-bold font-heading mb-3 text-slate-800">{currentQuestion.title}</h2>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">{currentQuestion.description}</p>

              {currentQuestion.type === "options" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentQuestion.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect(opt)}
                      className={`p-4 rounded-xl border text-left font-semibold text-sm transition-all duration-200 ${
                        answers[currentQuestion.id] === opt
                          ? "bg-slate-900 border-slate-900 text-white shadow-md"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "input" && (
                <div className="max-w-md w-full">
                  <Input
                    type={currentQuestion.inputType}
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e)}
                    className="h-12 text-base rounded-xl border-slate-200 focus:border-slate-950 bg-slate-50 font-semibold"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && answers[currentQuestion.id]) handleNext();
                    }}
                  />
                </div>
              )}

              {currentQuestion.type === "input-multi" && (
                <div className="max-w-md w-full space-y-4">
                  {currentQuestion.fields?.map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{f.label}</label>
                      <Input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={answers[f.id] || ""}
                        onChange={(e) => handleInputChange(e, f.id)}
                        className="h-12 text-base rounded-xl border-slate-200 focus:border-slate-950 bg-slate-50 font-semibold"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={step === 0}
              className="text-slate-400 hover:text-slate-800 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" />
              Înapoi
            </Button>

            {(currentQuestion.type === "input" || currentQuestion.type === "input-multi") && (
              <Button
                onClick={() => handleNext()}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 text-sm font-semibold"
                disabled={
                  (currentQuestion.type === "input" && !answers[currentQuestion.id]) ||
                  (currentQuestion.type === "input-multi" && currentQuestion.fields?.some(f => !answers[f.id]))
                }
              >
                Următorul Pas
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Live Consultant Insight Sidebox */}
        <div className="md:col-span-4 bg-[#FAF9F6] p-6 rounded-[2rem] border border-slate-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-200/60">
              <Compass className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Analiză Consultant</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 italic">
              &quot;{currentQuestion.consultantInsight}&quot;
            </p>
            {activeFollowUp && (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-800">Întrebare de clarificare</h4>
                <p className="text-xs leading-relaxed text-amber-900">{activeFollowUp}</p>
              </div>
            )}
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200/40">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Broker Generali România</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              Cristian Văduva structurează riscurile de peste 10 ani folosind exclusiv clauze subscrise ferm pentru eliminarea neînțelegerilor la daune.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
