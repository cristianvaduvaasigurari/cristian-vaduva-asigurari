"use client";

import * as React from "react";
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
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { PrivateClientCategory, privateClientCategories, privateClientProcess } from "@/data/privateClientData";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

interface PrivateClientCategoryViewProps {
  category: PrivateClientCategory;
}

export function PrivateClientCategoryView({ category }: PrivateClientCategoryViewProps) {
  const otherCategories = Object.values(privateClientCategories).filter(
    (c) => c.slug !== category.slug
  );

  return (
    <div className="bg-[#0b0d10] text-zinc-100 min-h-screen">
      {/* 1. EDITORIAL BREADCRUMB & HERO */}
      <section className="relative pt-36 pb-20 border-b border-zinc-800/60 overflow-hidden">
        {/* Subtle architectural background grid & radial light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f242d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f242d0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Insurance</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/private-client" className="hover:text-zinc-300 transition-colors">Private Client</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300 font-semibold">{category.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-widest uppercase mb-6">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                {category.badge}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
                {category.title}
              </h1>

              <p className="text-xl sm:text-2xl text-zinc-300 font-light tracking-tight mb-6">
                {category.tagline}
              </p>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mb-10">
                {category.heroIntro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-8 h-14 text-sm tracking-wide shadow-xl"
                  asChild
                >
                  <a href="#confidential-enquiry">
                    REQUEST A PRIVATE CLIENT REVIEW
                  </a>
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 h-14 text-sm"
                  asChild
                >
                  <a href={CONTACT.phone.href}>
                    <PhoneCall className="w-4 h-4 mr-2 text-zinc-400" />
                    DISCREET CALL: {CONTACT.phone.display}
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Scope Panel */}
            <div className="lg:col-span-4 bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-400" />
                Coverage Spectrum
              </h3>
              <ul className="space-y-2.5">
                {category.coverageCategories.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-zinc-800/80 text-[11px] text-zinc-500 leading-normal">
                Subject to specialist underwriting, territorial scope and policy terms.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH NARRATIVE */}
      <section className="py-20 border-b border-zinc-800/60 bg-[#0e1014]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
              THE UNDERWRITING PERSPECTIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-6">
              Why high-value assets require specialized insurance architecture.
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
              {category.longDescription}
            </p>
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
              <span>
                Standard consumer policies operate on standardized depreciated schedules and rigid exclusions. Our Private Client advisory structures bespoke wordings, agreed valuation protocols, and worldwide risk protection tailored to high-profile individual and corporate holdings.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT CAN BE ASSESSED / UNDERWRITING FACTORS */}
      <section className="py-24 border-b border-zinc-800/60 bg-[#0b0d10]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <FileText className="w-3.5 h-3.5" />
              TECHNICAL ASSESSMENT CRITERIA
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              What Can Be Assessed
            </h2>
            <p className="text-zinc-400 text-base max-w-2xl">
              Factors that may be relevant to underwriting and placement include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.underwritingFactors.map((factor, i) => (
              <div 
                key={i} 
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
              >
                <div className="w-10 h-10 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-300 text-sm font-mono font-bold mb-6 group-hover:bg-zinc-700/60 transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-3 tracking-tight">
                  {factor.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              * The factors above illustrate typical underwriter review points. Not all factors apply to every risk profile.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRIVATE CLIENT APPROACH & METHODOLOGY */}
      <section className="py-24 border-b border-zinc-800/60 bg-[#0e1014]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                ADVISORY METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-6">
                The Private Client Approach
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                High-value assets often require an individual assessment rather than a standard online quote. We act as your private client advisor, assessing complex multi-jurisdictional risks and placing them directly with specialist syndicates.
              </p>

              <div className="space-y-4">
                {category.approachPoints.map((pt, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">{pt.title}</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">{pt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 lg:p-10">
              <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-zinc-400" />
                Advisory & Placement Sequence
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {privateClientProcess.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-xs font-mono text-zinc-500 font-bold mb-1">STAGE {step.step}</div>
                    <div className="text-xs font-bold tracking-wider text-zinc-200 uppercase mb-2">{step.name} — {step.title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEY CONSIDERATIONS */}
      <section className="py-20 border-b border-zinc-800/60 bg-[#0b0d10]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-300" />
              Key Structural Considerations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.keyConsiderations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONFIDENTIAL ENQUIRY SECTION */}
      <section id="confidential-enquiry" className="py-24 bg-[#08090b] border-b border-zinc-800/60 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold block mb-2">
              CONFIDENTIAL RISK REVIEW
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Request a Private Client Review
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Discreet, direct advisory consultation for {category.title.toLowerCase()}. Provide details below to initiate assessment.
            </p>
          </div>

          <PrivateClientEnquiryForm
            defaultAssetCategory={category.assetOptions[0]}
            sourceContext={`Category: ${category.title}`}
          />
        </div>
      </section>

      {/* 7. OTHER PRIVATE CLIENT DIVISIONS */}
      <section className="py-24 bg-[#0b0d10]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                PRIVATE CLIENT ECOSYSTEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                Explore Additional Divisions
              </h2>
            </div>
            <Link 
              href="/private-client" 
              className="mt-4 sm:mt-0 text-xs font-semibold text-zinc-300 hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              All Divisions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCategories.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/private-client/${c.slug}`}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold block mb-2">
                    {c.badge}
                  </span>
                  <h3 className="text-base font-heading font-bold text-white group-hover:text-zinc-200 transition-colors mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {c.heroIntro}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span>Explore division</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LEGAL & COMPLIANCE FOOTNOTE */}
      <div className="py-8 bg-black border-t border-zinc-900 text-center text-[11px] text-zinc-600 px-4">
        <div className="max-w-4xl mx-auto leading-relaxed">
          Coverage, eligibility, limits, exclusions and availability are subject to underwriting, policy terms and applicable requirements. Private Client is an advisory and placement division of Cristian Văduva Insurance Advisory (insurance.cristianvaduva.com). We do not provide self-underwritten binding authority; all quotations and risk acceptances are subject to authorized underwriting market review.
        </div>
      </div>
    </div>
  );
}
