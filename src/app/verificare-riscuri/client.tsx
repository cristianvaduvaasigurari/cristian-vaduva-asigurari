"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Home,
  Car,
  Users,
  Building2,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowRight,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";

// Tool components
import { SeismicRiskChecker } from "@/components/sections/seismic-risk-checker";
import { InsuranceNeedsCalculator } from "@/components/sections/insurance-needs-calculator";
import { HouseholdInventory } from "@/components/sections/household-inventory";
import { FloodRiskLookup } from "@/components/sections/flood-risk-lookup";
import { CascoDeductibleCalculator } from "@/components/sections/casco-deductible-calculator";
import { CascoQualityChecklist } from "@/components/sections/casco-quality-checklist";
import { EvInsuranceGuide } from "@/components/sections/ev-insurance-guide";
import { WeatherHotspotMap } from "@/components/sections/weather-hotspot-map";
import { MortgageProtectionCalculator } from "@/components/sections/mortgage-protection-calculator";
import { KeyPersonExposure } from "@/components/sections/key-person-exposure";
import { FamilyProtectionChecklist } from "@/components/sections/family-protection-checklist";
import { SmeRiskAudit } from "@/components/sections/sme-risk-audit";
import { BusinessInterruptionCalculator } from "@/components/sections/business-interruption-calculator";
import { Nis2Checklist } from "@/components/sections/nis2-checklist";
import { CmrCargoCalculator } from "@/components/sections/cmr-cargo-calculator";

type StatusType = "EXISTS" | "EXTEND" | "MERGE" | "NEW" | "BLOCKED BY DATA";

interface ToolDefinition {
  id: string;
  category: "casa" | "masina" | "familie" | "firma";
  title: string;
  status: StatusType;
  statusNote: string;
  summary: string;
  purpose: string;
  limitations: string;
  officialSources: string;
  primaryActionLabel: string;
  component: React.ReactNode;
  externalLink?: { href: string; label: string };
}

const TOOLS: ToolDefinition[] = [
  // --- CASĂ ---
  {
    id: "seismic-pad",
    category: "casa",
    title: "1. Verificator Risc Seismic & Comparație PAD vs Facultativ",
    status: "EXTEND",
    statusNote: "Extins din /harta-risc-seismic-bucuresti cu avertismente oficiale și ghid comparativ PAD",
    summary: "Verifică adresa imobilului în registrul AMCCRS București și înțelege diferența de acoperire între PAD și polița facultativă.",
    purpose: "Îți arată clasa de risc seismic înregistrată, anul construcției, regimul de înălțime și exact ce despăgubește PAD (maxim 20.000 € / 100.000 lei) față de o poliță facultativă extinsă.",
    limitations: "Registrul PMB/AMCCRS conține doar imobilele expertizate tehnic. Lipsa din listă NU înseamnă că o clădire este sigură sau că asigurătorul o va accepta automat.",
    officialSources: "Registrul Oficial AMCCRS / PMB București, Legea 260/2008 (PAD), Ghid Marius Comper & Expertizare.ro",
    primaryActionLabel: "Consultă Risc Seismic & Locuință",
    externalLink: { href: "/harta-risc-seismic-bucuresti", label: "Vezi Harta Seismică Detaliată" },
    component: <SeismicRiskChecker />,
  },
  {
    id: "reconstruction-value",
    category: "casa",
    title: "2. Calculator Valoare Reconstrucție Locuință",
    status: "MERGE",
    statusNote: "Unificat în motorul de calcul comun din /calculator-asigurare",
    summary: "Calculează costul real de reconstrucție (fără teren) pentru a preveni regula proporțională de subasigurare la daună parțială.",
    purpose: "Permite ajustarea transparentă a suprafeței, tipului de structură și finisajelor pentru a determina suma asigurată optimă și deficitul față de polița actuală.",
    limitations: "Calcul orientativ bazat pe medii de piață pentru materiale și manoperă. Nu constituie raport oficial de evaluare ANEVAR.",
    officialSources: "Standarde de cost orientative construcții rezidențiale România",
    primaryActionLabel: "Calculează Valoarea de Reconstrucție",
    externalLink: { href: "/calculator-asigurare", label: "Deschide Calculatorul Dedicat" },
    component: <InsuranceNeedsCalculator />,
  },
  {
    id: "household-inventory",
    category: "casa",
    title: "3. Inventar Bunuri Gospodărie & Export PDF",
    status: "NEW",
    statusNote: "Instrument nou de pregătire dosar de daună cu salvare locală 100% securizată",
    summary: "Înregistrează bunurile, electronicele, mobilierul și valorile din locuință și descarcă un inventar vectorial PDF.",
    purpose: "Creează evidența doveditoare a bunurilor înainte de producerea unui incendiu, furt sau inundație de la vecini, prevenind contestarea valorilor de către asigurător.",
    limitations: "Datele și fotografiile rămân exclusiv în memoria browserului tău și nu sunt transmise pe server. Inventarul nu garantează automat acceptarea integrală a despăgubirii fără facturi justificative.",
    officialSources: "Proceduri generale de lichidare daune conținut & răspundere civilă locuință",
    primaryActionLabel: "Generează Inventar PDF",
    component: <HouseholdInventory />,
  },
  {
    id: "flood-risk",
    category: "casa",
    title: "4. Verificare Risc Inundație (Status ANAR / IGSU)",
    status: "BLOCKED BY DATA",
    statusNote: "Datele oficiale ANAR sunt cartografice macro, nu la nivel de număr poștal",
    summary: "Analiză bazată pe Hărțile de Hazard și Risc la Inundații (ANAR) și distincția între inundația de râu și refularea de canalizare.",
    purpose: "Explică de ce căutarea punctuală pe adresă nu este responsabilă științific fără GIS ANAR și ce clauze de inundație trebuie verificate în polița facultativă.",
    limitations: "Directiva Inundații 2007/60/CE și Planurile PMRI Ciclu II publică benzi de inundabilitate la scara bazinelor hidrografice, nu cote de nivel pe parcelă cadastrală.",
    officialSources: "Administrația Națională Apele Române (ANAR), IGSU, Directiva 2007/60/CE",
    primaryActionLabel: "Discută Protecția la Inundații",
    component: <FloodRiskLookup />,
  },

  // --- MAȘINĂ ---
  {
    id: "casco-deductible",
    category: "masina",
    title: "1. Calculator Franșiză CASCO (Fixă vs Procentuală)",
    status: "EXTEND",
    statusNote: "Adăugat model matematic comparativ pentru scenarii de daună minoră, majoră și daună totală",
    summary: "Simulează impactul franșizei fixe (€100) vs procentuale (10%) la o daună de €20.000 și compară costul din buzunar cu prima economisită.",
    purpose: "Elimină surprizele la deschiderea dosarului de daună și evidențiază pragul de daună totală economică (uzual 75%-80% din valoarea de catalog).",
    limitations: "Rezultatul este o ilustrare matematică. Fiecare asigurător aplică franșiza raportată la suma asigurată sau la cuantumul daunei conform clauzelor specifice.",
    officialSources: "Condiții generale de asigurare CASCO piața din România (Generali, Omniasig, Allianz-Țiriac)",
    primaryActionLabel: "Calculează Franșiza CASCO",
    externalLink: { href: "/servicii/casco-insurance", label: "Vezi Pagina Serviciu CASCO" },
    component: <CascoDeductibleCalculator />,
  },
  {
    id: "casco-quality",
    category: "masina",
    title: "2. Checklist Calitate Poliță CASCO — 10 Clauze Cheie",
    status: "NEW",
    statusNote: "Audit interactiv în 10 puncte pentru detectarea capcanelor ascunse din contract",
    summary: "Evaluează 10 aspecte critice: piese de origine, valoare agreată, reparații grindină PDR, mașină la schimb și franșize pe elemente vitrate.",
    purpose: "Oferă un scor de transparență al poliței și identifică exact ce articole contractuale trebuie verificate înainte de semnare.",
    limitations: "Checklist orientativ de audit; nu constituie o confirmare formală de acoperire sau interpretare juridică a unui dosar respins.",
    officialSources: "Practici standard de subscriere auto CASCO România",
    primaryActionLabel: "Verifică Polița CASCO",
    component: <CascoQualityChecklist />,
  },
  {
    id: "ev-insurance",
    category: "masina",
    title: "3. Ghid Asigurare Vehicule Electrice & Hibride",
    status: "EXTEND",
    statusNote: "Integrat cu secțiunea de asigurări auto pentru riscuri specifice EV",
    summary: "Analiză a riscurilor bateriei de tracțiune (SOH vs accident), cablurilor de încărcare, wallbox-ului rezidențial și asistenței rutiere pe platformă.",
    purpose: "Clarifică ce asigurători acoperă bateria avariată sub caroserie și de ce remorcarea improvizată poate distruge invertoarele unui vehicul electric.",
    limitations: "Condițiile diferă între pachetele standard și clauzele dedicate EV ale fiecărui asigurător.",
    officialSources: "Ghiduri tehnice de reparare EV & clauze speciale CASCO",
    primaryActionLabel: "Consultă Asigurare EV",
    component: <EvInsuranceGuide />,
  },
  {
    id: "weather-hotspot",
    category: "masina",
    title: "4. Hartă Grindină, Furturi & Hotspoturi Accidente",
    status: "BLOCKED BY DATA",
    statusNote: "Datele IGPR / ANM nu sunt disponibile legal sub formă de API micro-granular public",
    summary: "Clarificare cu privire la datele de risc meteorologic și infracționalitate auto pe zone geografice.",
    purpose: "Explică de ce crearea unei hărți false cu incidente ar induce în eroare și cum folosesc asigurătorii baza de date AIDA și clasele Bonus-Malus.",
    limitations: "Statisticile IGPR sunt publicate agregat la nivel județean sau anual, iar radarul meteo ANM reprezintă măsurători de moment, nu scoring de risc.",
    officialSources: "Inspectoratul General al Poliției Române (IGPR), ANM, Baza de date AIDA (BAAR)",
    primaryActionLabel: "Discută Factorii de Risc Auto",
    component: <WeatherHotspotMap />,
  },

  // --- FAMILIE ---
  {
    id: "life-coverage-needs",
    category: "familie",
    title: "1. Calculator Necesar Acoperire Asigurare de Viață",
    status: "MERGE",
    statusNote: "Unificat cu algoritmul din Life Simulator și /calculator-asigurare",
    summary: "Evaluează capitalul necesar pentru înlocuirea veniturilor familiei pe 3-10 ani, stingerea creditelor și protecția copiilor.",
    purpose: "Oferă o formulă matematică transparentă pentru stabilirea sumei asigurate optime, scăzând economiile existente din totalul obligațiilor viitoare.",
    limitations: "Nu recomandă automat un produs sau o companie; reprezintă un model de calcul pentru stabilirea sumei asigurate recomandate.",
    officialSources: "Metodologia internațională Human Life Value & Ghiduri UNSAR",
    primaryActionLabel: "Calculează Nevoia de Protecție",
    externalLink: { href: "/simulator", label: "Deschide Life Simulator" },
    component: <InsuranceNeedsCalculator />,
  },
  {
    id: "mortgage-protection",
    category: "familie",
    title: "2. Protecție Titulari Credite Ipotecare",
    status: "NEW",
    statusNote: "Integrat cu divizia de Credite pentru a calcula rezerva necesară pe 12 sau 24 de rate",
    summary: "Analizează riscul creditului ipotecar în caz de incapacitate temporară de muncă, șomaj sau deces al susținătorului principal.",
    purpose: "Arată exact ce sumă este expusă în fața băncii și de ce o asigurare individuală de viață oferă condiții mult superioare poliței de grup cesionate băncii.",
    limitations: "Polița băncii despăgubește doar soldul datorat instituției de credit, lăsând familia fără sprijin financiar suplimentar dacă nu există o poliță de viață de sine stătătoare.",
    officialSources: "Banca Națională a României (BNR) & Norme de creditare ipotecară",
    primaryActionLabel: "Calculează Protecția Ipotecară",
    externalLink: { href: "/credite", label: "Vezi Secțiunea Credite" },
    component: <MortgageProtectionCalculator />,
  },
  {
    id: "key-person",
    category: "familie",
    title: "3. Expunere Asociați & Persoane Cheie (Key Person)",
    status: "NEW",
    statusNote: "Instrument financiar de protecție a continuității afacerii de familie și a asociaților",
    summary: "Simulează impactul pierderii unui asociat activ: răscumpărarea părților sociale de la moștenitori, garantarea creditelor și costul de succesiune.",
    purpose: "Protejează atât familia fondatorului (care primește lichiditate imediată), cât și asociații rămași (care pot continua activitatea fără blocaje bancare).",
    limitations: "Calcul orientativ de lichiditate; nu ține loc de acord de asociere redactat de avocat sau expertiză fiscală.",
    officialSources: "Legea societăților 31/1990 & Practici corporate succession planning",
    primaryActionLabel: "Calculează Expunerea Key Person",
    component: <KeyPersonExposure />,
  },
  {
    id: "family-checklist",
    category: "familie",
    title: "4. Checklist Protecție Familie & Dosar de Siguranță",
    status: "EXTEND",
    statusNote: "Extins din Family Planner cu dosar de urgență și desemnare beneficiari",
    summary: "5 piloni esențiali: beneficiari desemnați contractual, dosarul de urgență accesibil familiei, contacte cheie și plan de succesiune.",
    purpose: "Garantează că în caz de eveniment critic, cei apropiați știu ce polițe există, unde sunt salvate și cum se deschide procedura de despăgubire fără întârzieri.",
    limitations: "Checklistul funcționează 100% local în browser. Nu colectează date medicale sau documente confidențiale pe server.",
    officialSources: "Legislația civilă privind succesiunea & procedurile de despăgubire asigurări de viață",
    primaryActionLabel: "Completează Checklistul Familiei",
    component: <FamilyProtectionChecklist />,
  },

  // --- FIRMĂ ---
  {
    id: "sme-audit",
    category: "firma",
    title: "1. Audit Rapid Riscuri IMM (5 Minute) & Export PDF",
    status: "EXTEND",
    statusNote: "Upgradat cu 5 profile de industrie (HoReCa, Retail, Producție, IT, Transport) și raport vectorial PDF",
    summary: "Chestionar ghidat pe sector de activitate pentru identificarea riscurilor operaționale, de răspundere și de patrimoniu ale companiei.",
    purpose: "Generează o matrice de priorități și un raport PDF descărcabil cu riscurile critice, fără colectare abuzivă de date.",
    limitations: "Audit preliminar orientativ; nu constituie raport de certificare legală sau expertiză de inginerie a riscului la fața locului.",
    officialSources: "Ghiduri de subscriere property & casualty pentru IMM-uri",
    primaryActionLabel: "Generează Raport Audit IMM",
    externalLink: { href: "/servicii/imm-insurance", label: "Vezi Pagina Asigurări IMM" },
    component: <SmeRiskAudit />,
  },
  {
    id: "business-interruption",
    category: "firma",
    title: "2. Calculator Întreruperea Activității (Business Interruption)",
    status: "NEW",
    statusNote: "Instrument dedicat pierderilor financiare din profit brut nerealizat și cheltuieli fixe",
    summary: "Calculează expunerea financiară lunară dacă producția sau magazinul sunt oprite temporar din cauza unui incendiu sau a unei avarii majore.",
    purpose: "Distinge clar între profitul brut, cheltuielile fixe care continuă (chirii, salarii, rate) și cifra de afaceri, stabilind suma asigurată corectă.",
    limitations: "Indică un scenariu matematic simplificat; despăgubirea efectivă depinde de perioada de indemnizare și de bilanțul contabil certificat.",
    officialSources: "Clauze standard BI (Business Interruption / Pierdere de Profit) piața din România",
    primaryActionLabel: "Calculează Pierderea de Profit",
    externalLink: { href: "/servicii/business-interruption-insurance", label: "Vezi Serviciul Business Interruption" },
    component: <BusinessInterruptionCalculator />,
  },
  {
    id: "nis2-checklist",
    category: "firma",
    title: "3. Verificator Aplicabilitate Directiva NIS2 (DNSC)",
    status: "NEW",
    statusNote: "Conform OUG nr. 155/2024 aprobată cu modificări prin Legea nr. 124/2025 și normele DNSC",
    summary: "Evaluare preliminară orientativă privind incidența cerințelor NIS2 și rolul poliței Cyber Risk în reziliența companiei.",
    purpose: "Sprijină conștientizarea riscului cibernetic și a obligațiilor legale, fără a înlocui procedura oficială de evaluare DNSC.",
    limitations: "Evaluare preliminară orientativă; nu garantează încadrarea juridică a companiei și nu substituie procedura oficială a DNSC.",
    officialSources: "Directoratul Național de Securitate Cibernetică (DNSC), Directiva UE 2022/2555 (NIS2), OUG nr. 155/2024 aprobată prin Legea nr. 124/2025",
    primaryActionLabel: "Verifică Statutul NIS2",
    externalLink: { href: "/servicii/business-cyber-insurance", label: "Vezi Asigurarea Cyber Risk" },
    component: <Nis2Checklist />,
  },
  {
    id: "cmr-cargo",
    category: "firma",
    title: "4. Calculator Comparație Răspundere CMR vs Asigurare Cargo",
    status: "NEW",
    statusNote: "Limită legală de 8,33 DST/kg (Convenția CMR); echivalent Euro ilustrativ configurabil",
    summary: "Compară plafonul legal imperativ al transportatorului (8,33 DST/kg) cu valoarea reală a mărfii acoperită integral prin polița Cargo.",
    purpose: "Demonstrează matematic de ce polița CMR a transportatorului NU protejează proprietarul mărfii dacă aceasta este de valoare mare și greutate redusă.",
    limitations: "Plafonul legal CMR este stabilit strict în DST (8,33 DST/kg). Echivalentul în Euro depinde de cotația FMI la data plății; rata utilizată este o ipoteză ilustrativă configurabilă.",
    officialSources: "Convenția CMR internațională (Geneva 1956 & Protocolul 1978), Fondul Monetar Internațional (FMI)",
    primaryActionLabel: "Calculează Despăgubirea CMR vs Cargo",
    externalLink: { href: "/servicii/business-cargo-insurance", label: "Vezi Asigurarea Cargo de Marfă" },
    component: <CmrCargoCalculator />,
  },
  {
    id: "business-address",
    category: "firma",
    title: "5. Verificare Risc Imobil Sediu / Punct de Lucru",
    status: "MERGE",
    statusNote: "Reutilizează infrastructura tehnică a verificatorului seismic pentru sedii comerciale",
    summary: "Verifică sediul firmei, spațiul comercial sau depozitul în baza oficială AMCCRS pentru riscul seismic al clădirii.",
    purpose: "Previne refuzul asigurătorului de a emite polița pentru bunurile și echipamentele companiei din cauza clasei de risc a clădirii gazdă.",
    limitations: "Se aplică clădirilor de birouri și spațiilor expertizate din București. Nu acoperă hale industriale din afara evidențelor AMCCRS.",
    officialSources: "Registrul AMCCRS / PMB & Condiții de subscriere Bunuri și Clădiri Comerciale",
    primaryActionLabel: "Verifică Adresa Sediului",
    component: <SeismicRiskChecker />,
  },
];

const CATEGORIES = [
  { id: "toate", label: "Toate Categoriile", count: TOOLS.length, icon: Layers },
  { id: "casa", label: "1. Casă", count: 4, icon: Home },
  { id: "masina", label: "2. Mașină", count: 4, icon: Car },
  { id: "familie", label: "3. Familie", count: 4, icon: Users },
  { id: "firma", label: "4. Firmă", count: 5, icon: Building2 },
];

export function VerificareRiscuriClient() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("toate");
  const [openToolId, setOpenToolId] = React.useState<string | null>("seismic-pad");

  const filteredTools = React.useMemo(() => {
    if (selectedCategory === "toate") return TOOLS;
    return TOOLS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const toggleTool = (id: string) => {
    setOpenToolId((prev) => (prev === id ? null : id));
  };

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "EXISTS":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          label: "EXISTS (Activ)",
        };
      case "EXTEND":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          label: "EXTEND (Îmbunătățit)",
        };
      case "MERGE":
        return {
          bg: "bg-purple-50 text-purple-800 border-purple-200",
          label: "MERGE (Unificat)",
        };
      case "NEW":
        return {
          bg: "bg-amber-50 text-amber-900 border-amber-200",
          label: "NEW (Adăugat)",
        };
      case "BLOCKED BY DATA":
        return {
          bg: "bg-zinc-100 text-zinc-800 border-zinc-300",
          label: "BLOCKED BY DATA",
        };
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          Hub Centralizat de Audit & Verificare Riscuri
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
          Verificare Riscuri & Consultanță Asigurări
        </h1>
        <p className="text-base sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-3xl mx-auto">
          Instrumente matematice transparente, baze de date oficiale verificate și audit fără estimări fictive.
          Alege categoria pentru a descoperi expunerea ta reală și a primi consultanță dedicată pe WhatsApp.
        </p>

        {/* Global summary stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs text-center">
            <div className="text-2xl font-bold text-zinc-900">4</div>
            <div className="text-xs text-zinc-500 font-medium">Categorii Fundamentale</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs text-center">
            <div className="text-2xl font-bold text-blue-600">17</div>
            <div className="text-xs text-zinc-500 font-medium">Instrumente Integrate</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs text-center">
            <div className="text-2xl font-bold text-emerald-600">100%</div>
            <div className="text-xs text-zinc-500 font-medium">Confidențial Local</div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs text-center">
            <div className="text-2xl font-bold text-zinc-900">1 CTA</div>
            <div className="text-xs text-zinc-500 font-medium">Consultanță WhatsApp</div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-zinc-200">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs cursor-pointer",
                isActive
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                  : "bg-white text-zinc-700 border-zinc-200/90 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-blue-600")} />
              <span>{cat.label}</span>
              <span
                className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  isActive ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-600"
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tool List */}
      <div className="space-y-6">
        {filteredTools.map((tool) => {
          const isOpen = openToolId === tool.id;
          const badge = getStatusBadge(tool.status);

          return (
            <div
              key={tool.id}
              id={tool.id}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs",
                isOpen ? "border-blue-300 ring-1 ring-blue-100 shadow-md" : "border-zinc-200/90 hover:border-zinc-300"
              )}
            >
              {/* Card Header Summary */}
              <div className="p-5 sm:p-6 cursor-pointer" onClick={() => toggleTool(tool.id)}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border",
                          badge.bg
                        )}
                      >
                        {badge.label}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {tool.category.toUpperCase()} • ID: {tool.id}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-heading font-bold text-zinc-900 tracking-tight">
                      {tool.title}
                    </h2>

                    <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                      {tool.summary}
                    </p>
                  </div>

                  {/* Toggle & Action Pill */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <Button
                      variant={isOpen ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-full text-xs font-semibold gap-1.5 h-9",
                        isOpen
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-zinc-300 text-zinc-800 hover:bg-zinc-100"
                      )}
                    >
                      <span>{isOpen ? "Ascunde Instrumentul" : "Deschide & Calculează"}</span>
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </Button>
                  </div>
                </div>

                {/* Sub-details (Purpose & Limitations) */}
                <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-100">
                    <div className="font-semibold text-zinc-900 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Ce te ajută să înțelegi:
                    </div>
                    <p className="text-zinc-600 leading-relaxed">{tool.purpose}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100/70">
                    <div className="font-semibold text-amber-900 flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Limitări & Surse oficiale:
                    </div>
                    <p className="text-zinc-700 leading-relaxed">{tool.limitations}</p>
                    <div className="mt-1 text-[11px] text-zinc-500 font-mono">
                      Sursă: {tool.officialSources}
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Tool Content */}
              {isOpen && (
                <div className="border-t border-zinc-200 bg-zinc-50/40 p-4 sm:p-8">
                  {/* Embedded interactive tool */}
                  <div className="mb-8">{tool.component}</div>

                  {/* Primary WhatsApp Action Footer */}
                  <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Pasul Următor Recomandat
                      </div>
                      <div className="text-sm font-semibold text-zinc-900">
                        Vrei o verificare profesională a contractului tău pentru {tool.title.split(".")[1] || tool.title}?
                      </div>
                      <p className="text-xs text-zinc-500">
                        Trimite detaliile fără date sensibile. Consultanță personalizată direct cu Cristian Văduva.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {tool.externalLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full border-zinc-300 text-xs font-medium gap-1"
                          asChild
                        >
                          <Link href={tool.externalLink.href}>
                            <span>{tool.externalLink.label}</span>
                            <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </Link>
                        </Button>
                      )}
                      <WhatsAppCta
                        toolName={tool.title}
                        contextSummary={`Audit riscuri pentru ${tool.title}`}
                        label="Scrie-mi pe WhatsApp"
                        variant="primary"
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Advisory Disclaimer */}
      <div className="mt-16 p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 leading-relaxed space-y-2">
        <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          Notă privind Metodologia și Integritatea Datelor
        </div>
        <p>
          Toate instrumentele din secțiunea <strong>Verificare Riscuri</strong> au scop pur educativ și de asistență preliminară.
          Datele oficiale preluate (AMCCRS, PMB, ANAR, DNSC, Legea 260/2008, Convenția CMR, OUG 155/2024 cu Legea 124/2025) reflectă exclusiv registrele
          și cadrul legislativ în vigoare la data ultimei verificări.
        </p>
        <p>
          Simulările matematice nu constituie o ofertă contractuală fermă, o evaluare tehnică ANEVAR sau un angajament de despăgubire
          din partea unui asigurător. Decizia finală de subscriere și acordare a despăgubirii aparține exclusiv societății de asigurare
          în baza condițiilor contractuale individuale.
        </p>
      </div>
    </div>
  );
}
