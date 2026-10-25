"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  FileText, 
  Compass, 
  PhoneCall, 
  Sparkles, 
  Layers,
  HelpCircle,
  AlertTriangle,
  FolderCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { PrivateClientCategory, privateClientCategories, privateClientProcess } from "@/data/privateClientData";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

interface CategoryRiskDetail {
  image: string;
  alt: string;
  badgeRo: string;
  badgeEn: string;
  headlineRo: string;
  headlineEn: string;
  impactRo: string;
  impactEn: string;
  checkPointsRo: string[];
  checkPointsEn: string[];
}

const CATEGORY_RISK_DETAILS: Record<string, CategoryRiskDetail> = {
  supercars: {
    image: "/images/risks/supercar-crash-cinematic.jpg",
    alt: "Supercar exotic avariat sever în urma unui impact rutier pe carosabil umed, cu panouri din carbon zdrobite și airbaguri declanșate",
    badgeRo: "Automobile de Colecție & Supercars",
    badgeEn: "Supercars & Rare Vehicles",
    headlineRo: "O avariere severă sau o daună totală pe un vehicul de performanță",
    headlineEn: "Severe collision damage or constructive total loss on high-value vehicles",
    impactRo: "La un automobil exotic, o coliziune aparent minoră poate costa peste 60.000–100.000 EUR din cauza elementelor din fibră de carbon, vopselei multistrat și senzorilor aerodinamici. Polițele de masă aplică depreciere forfetară sau refuză decontarea directă la reprezentanța oficială a mărcii.",
    impactEn: "On an exotic supercar, a minor accident can generate repairs exceeding €60,000–€100,000 due to bespoke carbon components, multi-stage paint, and aerodynamic calibrations. Mass-market policies apply generic depreciation tables and refuse factory-authorized repairers.",
    checkPointsRo: [
      "Clauză strictă de Valoare Agreată (Agreed Value) fără aplicarea deprecierii forfetare de catalog.",
      "Reparații garantate exclusiv în rețeaua oficială a constructorului (Ferrari, Lamborghini, McLaren, Porsche).",
      "Acoperire pentru evenimente private de circuit, transport pe platformă închisă și parcare securizată."
    ],
    checkPointsEn: [
      "Strict Agreed Value wording with zero depreciation schedules applied.",
      "Guaranteed repairs exclusively via factory-authorized manufacturer facilities.",
      "Bespoke coverage for track days, private enclosed transit, and secure storage."
    ]
  },
  "luxury-homes": {
    image: "/images/risks/villa-fire-cinematic.jpg",
    alt: "Vilă rezidențială de lux afectată grav de un incendiu violent în timpul nopții, evidențiind costurile imense de demolare și reconstrucție structurală",
    badgeRo: "Proprietăți Rezidențiale de Lux",
    badgeEn: "Prime Residential Estates",
    headlineRo: "Cât ar costa să reconstruiești proprietatea, nu cât ai putea să o vinzi?",
    headlineEn: "The true cost to rebuild bespoke architectural estates versus market value",
    impactRo: "Costul reconstrucției unei vile de autor depășește adesea cu 30–50% valoarea de piață. Materialele importate, marmura masivă, instalațiile smart home îngropate, autorizațiile complexe și demolarea structurii compromise pot genera pierderi de milioane de euro dacă polița a fost încheiată pe o sumă standard.",
    impactEn: "Rebuilding a bespoke architectural home often exceeds market valuation by 30–50%. Imported materials, continuous stone slabs, custom millwork, smart systems, and debris removal can create millions in shortfall under generic policies.",
    checkPointsRo: [
      "Evaluare bazată pe costul real actualizat de reconstrucție (nu valoarea de achiziție sau impozabilă).",
      "Acoperire nelimitată sau extinsă pentru cheltuieli de demolare, evacuare moloz și proiectare de arhitectură.",
      "Cazare temporară pe durata reconstrucției (12–24 luni) la un standard echivalent vilei tale."
    ],
    checkPointsEn: [
      "Valuation calibrated strictly to modern replacement reconstruction cost.",
      "Extended coverage for debris removal, demolition, and architectural re-engineering.",
      "Alternative luxury accommodation for 12–24 months matching your lifestyle."
    ]
  },
  "jewellery-watches": {
    image: "/images/risks/burglary-jeweler.jpg",
    alt: "Vitrină de magazin de ceasuri și bijuterii cu geam securizat spart și urme vizibile de efracție și furt",
    badgeRo: "Ceasuri & Bijuterii de Valoare",
    badgeEn: "Haute Horlogerie & High Jewellery",
    headlineRo: "Vitrină spartă, efracție și furtul pieselor de colecție",
    headlineEn: "Burglary, shattered display vitrines, and transit theft of timepieces",
    impactRo: "Contractele standard de locuință conțin de regulă o sub-limită severă pentru obiecte valoroase (1.000–2.500 EUR per obiect), complet inutilă pentru o piesă Patek Philippe, Audemars Piguet sau bijuterii unicat. Furtul dintr-o cameră de hotel în vacanță sau din locuință lasă o gaură financiară masivă.",
    impactEn: "Standard home policies contain severe sub-limits for valuables (€1,000–€2,500 per item), entirely useless for a Patek Philippe, Audemars Piguet, or bespoke diamond jewelry. A hotel room break-in or home burglary leaves a massive uncovered loss.",
    checkPointsRo: [
      "Declarare nominativă pe bază de certificate de autenticitate, numere de serie și evaluări recente.",
      "Acoperire All-Risks la nivel mondial (Worldwide), inclusiv în timpul deplasărilor și călătoriilor de afaceri.",
      "Condiții clare privind manipularea: fără clauze restrictive ascunse privind purtarea pieselor în public."
    ],
    checkPointsEn: [
      "Scheduled asset registry backed by authenticity certificates and current appraisals.",
      "Worldwide all-risks coverage including transit, international holidays, and business travel.",
      "Clear warranty wording without oppressive wearable warranties or travel traps."
    ]
  },
  "fine-art-collectibles": {
    image: "/images/risks/art-damage.jpg",
    alt: "Pânză de pictură rară cu ruptură structurală severă examinată pentru conservare și restaurare critică",
    badgeRo: "Artă & Piese de Patrimoniu",
    badgeEn: "Fine Art & Heritage Assets",
    headlineRo: "Opere de artă afectate de apă, fum sau deteriorare fizică",
    headlineEn: "Artworks damaged by environmental leakage, smoke, or physical impact",
    impactRo: "O pânză rară sau o sculptură avariată nu poate fi pur și simplu cumpărată din nou. Despăgubirea reală include costul restaurării de către un expert acreditat internațional și, esențial, compensarea deprecierii valorii de piață a operei post-restaurare.",
    impactEn: "A rare canvas or sculpture cannot simply be replaced. Comprehensive recovery requires specialist museum-grade conservation plus compensation for residual market value loss after restoration.",
    checkPointsRo: [
      "Clauză de Depreciere Valorară (Depreciation Coverage) inclusă explicit în contract.",
      "Protecție în tranzit internațional între reședințe, case de licitație, galerii și depozite securizate.",
      "Libertatea asiguratului de a alege restauratorul acreditat independent."
    ],
    checkPointsEn: [
      "Explicit Depreciation Clause compensating residual loss of provenance value.",
      "Transit coverage between private residences, auction houses, and art storage vaults.",
      "Policyholder right to appoint certified independent master conservators."
    ]
  },
  "private-aviation": {
    image: "/images/risks/aviation-storm.jpg",
    alt: "Aeronave private avariate grav pe aerodrom în urma unei furtuni violente cu vânt extrem",
    badgeRo: "Aviație Privată & Corporate",
    badgeEn: "Private Aviation & Jets",
    headlineRo: "Avarie la sol, incident pe pistă sau furtună extremă pe aerodrom",
    headlineEn: "Ground operational damage, runway incidents, or severe storm exposure",
    impactRo: "Orice incident la o aeronavă privată impune piese de schimb certificate EASA/FAA, timpi lungi de imobilizare în hangar și costuri operaționale fixe ce continuă să se acumuleze, pe lângă răspunderea civilă față de pasageri și terți.",
    impactEn: "Any aviation incident demands certified aeronautical components, extended ground downtime, and continuous fixed operational costs alongside third-party and passenger legal liability.",
    checkPointsRo: [
      "Poliță Hull All-Risks cu Valoare Agreată la sol și în zbor.",
      "Răspundere civilă combinată (Combined Single Limit) calibrată conform cerințelor internaționale.",
      "Clauză pentru acoperirea echipajului și a costurilor de închiriere alternativă de aeronavă."
    ],
    checkPointsEn: [
      "Comprehensive Hull All-Risks under Agreed Value on ground and in flight.",
      "Combined Single Limit (CSL) liability exceeding international regulatory minimums.",
      "Crew personal accident coverage and emergency aircraft charter replacement."
    ]
  },
  yachts: {
    image: "/images/risks/ocean-tempest-yacht.jpg",
    alt: "Ambarcațiune marină surprinsă în furtună extremă cu valuri gigantice și vânt violent pe mare deschisă",
    badgeRo: "Iahturi & Ambarcațiuni Marine",
    badgeEn: "Yachts & Marine Vessels",
    headlineRo: "Furtună pe mare, avarie la carenă sau eșuare pe stânci",
    headlineEn: "Severe sea storms, hull breach, grounding, and marine salvage liabilities",
    impactRo: "Operațiunile de salvare pe mare (salvage & towage), avariile la motoarele marine de mare putere și poluarea accidentală pot produce cereri financiare uriașe din primele ore după un incident maritim.",
    impactEn: "Marine salvage operations, high-output engine failures, and environmental clean-up liabilities can trigger devastating financial exposures within hours of an incident.",
    checkPointsRo: [
      "Acoperire completă Hull & Machinery pe baza Valorii Agreate contractuale.",
      "Răspundere P&I (Protection & Indemnity) pentru echipaj, oaspeți și daune ecologice.",
      "Limite de navigație și garanții de andocare în sezonul de iarnă sau furtuni fără capcane contractuale."
    ],
    checkPointsEn: [
      "Full Hull & Machinery coverage structured on Agreed Value terms.",
      "Comprehensive P&I (Protection & Indemnity) for crew, guests, and environmental liabilities.",
      "Navigation limits and winter lay-up warranties tailored realistically to cruising habits."
    ]
  },
  collections: {
    image: "/images/risks/art-restoration.jpg",
    alt: "Lucrare de colecție istorică degradată de fum și umiditate înainte și după procesul de restaurare",
    badgeRo: "Colecții Private & Valori",
    badgeEn: "Private Collections & Rare Assets",
    headlineRo: "Colecții compromise prin defectarea climatizării, efracție sau avarii fizice",
    headlineEn: "Collections compromised by climate system failures, burglary, or transit accidents",
    impactRo: "O pivniță de vinuri rare ale cărei unități de răcire cedează pe caniculă, sau o colecție de monede unicat afectată de un incendiu lasă proprietarul fără acoperire dacă polița a fost concepută ca una generică de locuință.",
    impactEn: "A fine wine cellar whose cooling system fails in summer heat or rare numismatics damaged in a home incident leave owners stranded if insured via generic household forms.",
    checkPointsRo: [
      "Clauză specifică de alterare a vinurilor din cauza căderii alimentării sistemului de climatizare.",
      "Clauză de Pereche și Set (Pair & Set): despăgubire integrală dacă pierderea unei piese anulează valoarea ansamblului.",
      "Protocol de inventariere agreat cu actualizare automată la noi achiziții."
    ],
    checkPointsEn: [
      "Specific wine spoilage wording covering climate control electrical/mechanical failure.",
      "Pair & Set clause paying full set value if an essential component is lost or broken.",
      "Continuous inventory protocol with automatic acquisition floater limits."
    ]
  },
  "private-client-liability": {
    image: "/images/risks/legal-litigation.jpg",
    alt: "Statuia Justiției cu balanța dreptății și dosare de litigiu pentru cereri de daune financiare masive",
    badgeRo: "Răspundere Civilă & Management",
    badgeEn: "Private Client & Executive Liability",
    headlineRo: "Litigiu civil transfrontalier sau cerere masivă de despăgubire",
    headlineEn: "Cross-border civil claims, catastrophic liability, and personal defense costs",
    impactRo: "Familiile cu patrimoniu extins devin frecvent ținta unor cereri agresive de daune în instanță: incidente pe proprietate, vătămări produse de personalul casnic sau decizii în consilii de administrație. Cheltuielile cu echipele de avocați pot depăși rapid sute de mii de euro.",
    impactEn: "High-profile families frequently face disproportionate litigation: estate injuries, domestic staff disputes, or board decisions. Defense legal retainers alone can drain hundreds of thousands of euros.",
    checkPointsRo: [
      "Poliță de răspundere Umbrella de 5.000.000–20.000.000 EUR peste polițele primare.",
      "Cheltuieli de judecată și apărare suportate în afara și peste limita principală de răspundere.",
      "Acoperire extinsă pentru reședințe deținute prin vehicule juridice (SPV, trusturi, fundații)."
    ],
    checkPointsEn: [
      "Umbrella liability limits of €5,000,000–€20,000,000 excess of primary covers.",
      "Legal defense and litigation expenses paid in addition to policy indemnity limits.",
      "Extended cover for properties held via trusts, family offices, and holding structures."
    ]
  }
};

interface PrivateClientCategoryViewProps {
  category: PrivateClientCategory;
}

export function PrivateClientCategoryView({ category }: PrivateClientCategoryViewProps) {
  const [lang, setLang] = useState<"ro" | "en">("ro");

  const otherCategories = Object.values(privateClientCategories).filter(
    (c) => c.slug !== category.slug
  );

  const title = lang === "ro" ? category.titleRo || category.title : category.title;
  const badge = lang === "ro" ? category.badgeRo || category.badge : category.badge;
  const tagline = lang === "ro" ? category.taglineRo || category.tagline : category.tagline;
  const heroIntro = lang === "ro" ? category.heroIntroRo || category.heroIntro : category.heroIntro;
  const longDescription = lang === "ro" ? category.longDescriptionRo || category.longDescription : category.longDescription;
  const coverageCategories = lang === "ro" ? category.coverageCategoriesRo || category.coverageCategories : category.coverageCategories;
  const keyConsiderations = lang === "ro" ? category.keyConsiderationsRo || category.keyConsiderations : category.keyConsiderations;
  const requestedDocs = lang === "ro" ? category.requestedDocumentationRo || category.requestedDocumentation : category.requestedDocumentation;
  const commonExclusions = lang === "ro" ? category.commonExclusionsRo || category.commonExclusions : category.commonExclusions;
  const assetOptions = lang === "ro" ? category.assetOptionsRo || category.assetOptions : category.assetOptions;

  return (
    <div className="bg-white text-zinc-900 min-h-screen">
      {/* 1. EDITORIAL BREADCRUMB & HERO */}
      <section className="relative pt-36 pb-20 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
        {/* Subtle background ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02),transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          {/* Breadcrumbs & Language Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
              <Link href="/" className="hover:text-zinc-900 transition-colors">Insurance</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link href="/private-client" className="hover:text-zinc-900 transition-colors">Private Client</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-900 font-semibold">{title}</span>
            </nav>

            <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs w-fit">
              <button
                type="button"
                onClick={() => setLang("ro")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  lang === "ro" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Română
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  lang === "en" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold tracking-widest uppercase mb-6">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                {badge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
                {title}
              </h1>

              <p className="text-xl sm:text-2xl text-zinc-700 font-light tracking-tight mb-6">
                {tagline}
              </p>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl mb-10">
                {heroIntro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-semibold px-8 h-14 text-sm tracking-wide shadow-lg"
                  asChild
                >
                  <a href="#confidential-enquiry">
                    {lang === "ro" ? "SOLICITĂ CONSULTANȚĂ PRIVATĂ" : "REQUEST A PRIVATE CLIENT REVIEW"}
                  </a>
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 px-8 h-14 text-sm font-semibold shadow-sm"
                  asChild
                >
                  <a href={CONTACT.phone.href}>
                    <PhoneCall className="w-4 h-4 mr-2 text-zinc-600" />
                    {lang === "ro" ? `APEL DISCRET: ${CONTACT.phone.display}` : `DISCREET CALL: ${CONTACT.phone.display}`}
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Scope Panel */}
            <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest text-zinc-700 font-bold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                {lang === "ro" ? "Spectru de Acoperire" : "Coverage Spectrum"}
              </h3>
              <ul className="space-y-2.5">
                {coverageCategories.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-zinc-200 text-[11px] text-zinc-500 leading-normal">
                {lang === "ro"
                  ? "Sub rezerva analizei tehnice de risc, limitelor teritoriale și condițiilor specifice de poliță."
                  : "Subject to specialist underwriting, territorial scope, and individual policy wording."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL RISK CONSEQUENCE & DAMAGE IMPACT VISUAL */}
      {(() => {
        const riskDetail = CATEGORY_RISK_DETAILS[category.slug];
        if (!riskDetail) return null;

        const badgeText = lang === "ro" ? riskDetail.badgeRo : riskDetail.badgeEn;
        const headline = lang === "ro" ? riskDetail.headlineRo : riskDetail.headlineEn;
        const impactText = lang === "ro" ? riskDetail.impactRo : riskDetail.impactEn;
        const checkPoints = lang === "ro" ? riskDetail.checkPointsRo : riskDetail.checkPointsEn;

        return (
          <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-zinc-800" aria-label="Risk Consequence Detail">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
              <div className="max-w-3xl mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 text-xs font-semibold tracking-wider uppercase border border-red-800/80 mb-4">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  {lang === "ro" ? "Consecințele Reale Ale Riscurilor" : "Real Risk Consequences"}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight mb-4">
                  Înțelege ce ai de pierdut{" "}
                  <span className="text-zinc-400 font-light block sm:inline">înainte să afli cât te costă o daună.</span>
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg">
                  {lang === "ro" 
                    ? "Activele de mare valoare impun o evaluare chirurgicală a daunelor posibile. Află ce se întâmplă când o daună nu este acoperită corespunzător:"
                    : "High-value assets require rigorous underwriting analysis of potential losses. Here is what happens when damage is not properly insured:"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-900/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-800/80 shadow-2xl">
                <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-700/60 shadow-lg">
                  <Image
                    src={riskDetail.image}
                    alt={riskDetail.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-zinc-950/85 backdrop-blur-xs text-white text-xs font-semibold tracking-wide border border-zinc-700/60">
                      {badgeText}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight mb-4">
                      {headline}
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                      {impactText}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {lang === "ro" ? "Ce trebuie să verifici în contractul tău:" : "Critical points to audit in your policy:"}
                    </p>
                    <ul className="space-y-2.5">
                      {checkPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-6 h-12 text-xs tracking-wider uppercase shadow-md"
                      asChild
                    >
                      <a href="#confidential-enquiry">
                        {lang === "ro" ? "Solicită o analiză confidențială" : "Request a confidential audit"}
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-800/80">
                    {lang === "ro" 
                      ? "* Valorile și costurile de remediere menționate sunt exemple ilustrative orientative bazate pe cazuri din piața de profil, fără valoare contractuală obligatorie." 
                      : "* Quoted repair values and costs are illustrative estimates based on specialist market benchmarks, with no contractual guarantee implied."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 3. IN-DEPTH NARRATIVE */}
      <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
              {lang === "ro" ? "PERSPECTIVA DE RISC & SUBSGRIERE" : "THE UNDERWRITING PERSPECTIVE"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 mb-6">
              {lang === "ro" 
                ? "De ce activele de mare valoare necesită o arhitectură de asigurare dedicată."
                : "Why high-value assets require specialized insurance architecture."}
            </h2>
            <p className="text-zinc-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {longDescription}
            </p>
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 text-zinc-700 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>
                {lang === "ro"
                  ? "Polițele de masă folosesc grile rigide de depreciere și excluderi stricte. Divizia Private Client structurează clauze personalizate, protocoale de valoare agreată și protecție adaptată patrimoniilor complexe."
                  : "Standard consumer policies operate on depreciated schedules and rigid exclusions. Our Private Client advisory structures bespoke wordings, agreed valuation protocols, and risk protection tailored to high-value holdings."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL ASSESSMENT CRITERIA */}
      <section className="py-24 border-b border-zinc-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-3">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              {lang === "ro" ? "CRITERII DE EVALUARE TEHNICĂ" : "TECHNICAL ASSESSMENT CRITERIA"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
              {lang === "ro" ? "Factori de Risc & Structurare" : "What Can Be Assessed"}
            </h2>
            <p className="text-zinc-600 text-base max-w-2xl">
              {lang === "ro"
                ? "Factori tehnici relevanți în procesul de calibrare și negociere a poliței:"
                : "Factors that may be relevant to underwriting and risk placement include:"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.underwritingFactors.map((factor, i) => {
              const factorTitle = lang === "ro" ? factor.titleRo || factor.title : factor.title;
              const factorDesc = lang === "ro" ? factor.descriptionRo || factor.description : factor.description;
              return (
                <div 
                  key={i} 
                  className="p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700 text-sm font-mono font-bold mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-zinc-900 mb-3 tracking-tight">
                    {factorTitle}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {factorDesc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              {lang === "ro"
                ? "* Criteriile de mai sus ilustrează punctele de evaluare uzuale. Nu toate se aplică fiecărui profil de risc."
                : "* The factors above illustrate typical underwriter review points. Not all factors apply to every risk profile."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. ADVISOR QUESTIONS & CLARIFICATIONS */}
      {category.advisorQuestions && category.advisorQuestions.length > 0 && (
        <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                {lang === "ro" ? "CLAUZE DE CLARIFICAT" : "KEY QUESTIONS TO CLARIFY"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900">
                {lang === "ro" 
                  ? "Întrebări esențiale înainte de semnarea contractului"
                  : "Critical points to clarify with your advisor or underwriter"}
              </h2>
            </div>

            <div className="space-y-4">
              {category.advisorQuestions.map((q, idx) => {
                const qText = lang === "ro" ? q.questionRo || q.question : q.question;
                const qContext = lang === "ro" ? q.contextRo || q.context : q.context;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-2 shadow-sm">
                    <h3 className="text-base font-semibold text-zinc-900 flex items-start gap-2.5">
                      <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{qText}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 pl-7 leading-relaxed">
                      {qContext}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. PROCESS & METHODOLOGY */}
      <section className="py-24 border-b border-zinc-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                {lang === "ro" ? "METODOLOGIE DE LUCRU" : "ADVISORY METHODOLOGY"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-6">
                {lang === "ro" ? "Abordarea Private Client" : "The Private Client Approach"}
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                {lang === "ro"
                  ? "Activele complexe necesită o analiză individuală discretă. Acționăm ca partener consultativ, negociind clauze speciale direct cu asiguratori specializați."
                  : "High-value assets require individual evaluation rather than standardized online quoting. We act as your private advisor, negotiating terms directly with specialist syndicates."}
              </p>

              <div className="space-y-4">
                {category.approachPoints.map((pt, i) => {
                  const ptTitle = lang === "ro" ? pt.titleRo || pt.title : pt.title;
                  const ptDesc = lang === "ro" ? pt.descriptionRo || pt.description : pt.description;
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-zinc-900 text-sm font-semibold mb-1">{ptTitle}</h4>
                        <p className="text-zinc-600 text-xs leading-relaxed">{ptDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 lg:p-10 shadow-sm">
              <h3 className="text-lg font-heading font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-zinc-600" />
                {lang === "ro" ? "Etapele de Consultanță & Plasare" : "Advisory & Placement Sequence"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {privateClientProcess.map((step, idx) => {
                  const stepName = lang === "ro" ? step.nameRo || step.name : step.name;
                  const stepTitle = lang === "ro" ? step.titleRo || step.title : step.title;
                  const stepDesc = lang === "ro" ? step.descRo || step.desc : step.desc;
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
                      <div className="text-xs font-mono text-zinc-400 font-bold mb-1">
                        {lang === "ro" ? `ETAPA ${step.step}` : `STAGE ${step.step}`}
                      </div>
                      <div className="text-xs font-bold tracking-wider text-zinc-900 uppercase mb-2">
                        {stepName} — {stepTitle}
                      </div>
                      <div className="text-xs text-zinc-600 leading-relaxed">{stepDesc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOCUMENTATION & COMMON EXCLUSIONS */}
      <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Documentation */}
            <div className="p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <h3 className="text-lg font-heading font-bold text-zinc-900 flex items-center gap-2">
                <FolderCheck className="w-5 h-5 text-blue-600" />
                {lang === "ro" ? "Documente Uzuale Solicitate" : "Documents Typically Requested"}
              </h3>
              <p className="text-xs text-zinc-600">
                {lang === "ro"
                  ? "În funcție de activ și compania de asigurare, pot fi solicitate următoarele documente suport:"
                  : "Depending on the asset and underwriter, the following documentation may be requested:"}
              </p>
              <ul className="space-y-2.5 pt-2">
                {requestedDocs.map((doc, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions to check */}
            <div className="p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm space-y-4">
              <h3 className="text-lg font-heading font-bold text-zinc-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                {lang === "ro" ? "Excluderi Comune de Verificat în Poliță" : "Common Policy Exclusions to Check"}
              </h3>
              <p className="text-xs text-zinc-600">
                {lang === "ro"
                  ? "Clauze frecvente care necesită verificare atentă în formularea exactă a contractului:"
                  : "Standard conditions that should be verified in the actual policy wording:"}
              </p>
              <ul className="space-y-2.5 pt-2">
                {commonExclusions.map((ex, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KEY STRUCTURAL CONSIDERATIONS */}
      <section className="py-20 border-b border-zinc-200/80 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              {lang === "ro" ? "Considerente Structurale Cheie" : "Key Structural Considerations"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyConsiderations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONFIDENTIAL ENQUIRY SECTION */}
      <section id="confidential-enquiry" className="py-24 bg-zinc-50/70 border-b border-zinc-200/80 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-2">
              {lang === "ro" ? "EVALUARE DE RISC CONFIDENȚIALĂ" : "CONFIDENTIAL RISK REVIEW"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
              {lang === "ro" ? "Solicită o Evaluare Private Client" : "Request a Private Client Review"}
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {lang === "ro"
                ? `Consultanță directă și discretă pentru ${title.toLowerCase()}. Completează detaliile pentru inițierea evaluării.`
                : `Discreet, direct advisory consultation for ${title.toLowerCase()}. Provide details below to initiate assessment.`}
            </p>
          </div>

          <PrivateClientEnquiryForm
            defaultAssetCategory={assetOptions[0]}
            sourceContext={`Category: ${title}`}
          />
        </div>
      </section>

      {/* 9. OTHER DIVISIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                {lang === "ro" ? "ECOSISTEMUL PRIVATE CLIENT" : "PRIVATE CLIENT ECOSYSTEM"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight">
                {lang === "ro" ? "Explorează Celelalte Divizii" : "Explore Additional Divisions"}
              </h2>
            </div>
            <Link 
              href="/private-client" 
              className="mt-4 sm:mt-0 text-xs font-semibold text-zinc-700 hover:text-blue-600 uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              {lang === "ro" ? "Toate Diviziile" : "All Divisions"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCategories.slice(0, 4).map((c) => {
              const cTitle = lang === "ro" ? c.titleRo || c.title : c.title;
              const cBadge = lang === "ro" ? c.badgeRo || c.badge : c.badge;
              const cIntro = lang === "ro" ? c.heroIntroRo || c.heroIntro : c.heroIntro;
              return (
                <Link
                  key={c.slug}
                  href={`/private-client/${c.slug}`}
                  className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-2">
                      {cBadge}
                    </span>
                    <h3 className="text-base font-heading font-bold text-zinc-900 group-hover:text-blue-600 transition-colors mb-2">
                      {cTitle}
                    </h3>
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {cIntro}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600 group-hover:text-blue-600 transition-colors">
                    <span>{lang === "ro" ? "Vezi divizia" : "Explore division"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. LEGAL & COMPLIANCE FOOTNOTE */}
      <div className="py-8 bg-zinc-100 border-t border-zinc-200 text-center text-[11px] text-zinc-500 px-4">
        <div className="max-w-4xl mx-auto leading-relaxed">
          {lang === "ro"
            ? "Acoperirea, eligibilitatea, limitele, excluderile și disponibilitatea fac obiectul analizei tehnice de subscriere, termenilor de poliță și cerințelor aplicabile. Private Client este o divizie consultativă a Cristian Văduva Asigurări (insurance.cristianvaduva.com). Cotațiile finale și acceptarea riscurilor sunt supuse aprobării asiguratorilor autorizați parteneri."
            : "Coverage, eligibility, limits, exclusions, and availability are subject to underwriting, policy terms, and applicable requirements. Private Client is an advisory division of Cristian Văduva Insurance Advisory (insurance.cristianvaduva.com). Final quotations and risk acceptances are subject to authorized underwriting market review."}
        </div>
      </div>
    </div>
  );
}
