"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
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

      {/* 2. IN-DEPTH NARRATIVE */}
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
