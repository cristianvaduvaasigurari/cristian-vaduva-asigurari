import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { 
  Globe2, 
  Building, 
  Car, 
  HeartPulse, 
  Briefcase, 
  Crown, 
  ShieldCheck, 
  ArrowRight, 
  FileSearch, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  PhoneCall,
  Scale,
  FileText,
  Lock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Insurance for Expats & International Clients in Romania | Cristian Văduva",
  description:
    "Independent insurance advisory for expatriates, foreign residents, international investors, and cross-border companies with assets or operations in Romania. Property, CASCO, Healthcare, D&O, and Private Client coverage.",
  keywords: [
    "expat insurance romania",
    "international client insurance bucharest",
    "property insurance romania foreign owners",
    "casco insurance romania expats",
    "health insurance expats romania",
    "business insurance romania international",
  ],
  openGraph: {
    title: "Insurance Advisory for International Clients & Expats in Romania",
    description:
      "Independent guidance on Romanian insurance policies, cross-border asset protection, and local underwriting requirements.",
    url: "https://insurance.cristianvaduva.com/international-clients",
    type: "website",
  },
};

export default function InternationalClientsPage() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 relative overflow-hidden">
        {/* Subtle background ambient light */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          
          {/* 1. HERO SECTION */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              Cross-Border & Expat Advisory
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Insurance Advisory for International Clients in Romania
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Navigating insurance regulations, policy clauses, and local market terms in a foreign country can be complex. We provide independent, English-speaking advisory for expatriates, international property owners, and multinational businesses with assets in Romania.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <a href="#contact">Request Advisory Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-sm rounded-full border-zinc-800 hover:bg-zinc-900 text-zinc-300" asChild>
                <Link href="/verifica-polita">
                  <FileSearch className="w-4 h-4 mr-2 text-blue-400" />
                  Review Existing Policy
                </Link>
              </Button>
            </div>
          </div>

          {/* 2. WHO THIS IS FOR */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                CLIENT PROFILES
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                Who We Advise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg">Expatriates & Foreign Residents</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  International executives, diplomatic personnel, and foreign professionals living and working in Romania who require private healthcare, residential protection, and vehicle coverage.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg">Overseas Property Investors</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Foreign individuals and investment funds holding residential or commercial real estate portfolios across Bucharest, Cluj-Napoca, or regional Romanian hubs.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg">Multinational Operations</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  International enterprises establishing or operating Romanian subsidiaries, requiring compliant D&O, Cyber Risk, Professional Indemnity, and employee benefits structures.
                </p>
              </div>
            </div>
          </div>

          {/* 3. CORE INSURANCE AREAS (WITH INTERNAL LINKS) */}
          <div className="mb-24 glass rounded-[2.5rem] p-8 sm:p-12 border border-zinc-800/80 bg-zinc-950/70">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                COVERAGE SECTORS
              </span>
              <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
                Comprehensive Insurance Solutions in Romania
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                We benchmark terms across authorized Romanian and international underwriters:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Home & Property */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Residential & Commercial Property</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Mandatory disaster insurance (PAD) alongside comprehensive facultative homeowner policies covering true rebuilding costs, contents, and landlord liability.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/servicii/home-insurance" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    Standard Property &rarr;
                  </Link>
                  <Link href="/private-client/luxury-homes" className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1">
                    Luxury Estates &rarr;
                  </Link>
                </div>
              </div>

              {/* Vehicles & CASCO */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3">
                    <Car className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Vehicle Insurance (RCA & CASCO)</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Compulsory Third-Party Liability (RCA) and comprehensive CASCO for Romanian-registered and eligible foreign-transit vehicles, including agreed value terms for exotics.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/servicii/casco-insurance" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    CASCO Cover &rarr;
                  </Link>
                  <Link href="/private-client/supercars" className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1">
                    Supercar Advisory &rarr;
                  </Link>
                </div>
              </div>

              {/* Private Healthcare */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-3">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">International & Private Health</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Access to premier private hospital networks in Romania and worldwide international inpatient policies, including emergency medical evacuation and repatriation.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/servicii/health-insurance" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    Health Insurance &rarr;
                  </Link>
                  <Link href="/servicii/travel-insurance-annual" className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1">
                    Annual Multi-Trip &rarr;
                  </Link>
                </div>
              </div>

              {/* Executive & Corporate */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Corporate & Management Risks</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Directors & Officers (D&O) liability for corporate managers, Professional Indemnity for IT/consulting firms, and commercial property schedules.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/servicii/business-directors-liability" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    D&O Liability &rarr;
                  </Link>
                  <Link href="/servicii/business-professional-liability" className="text-zinc-400 hover:text-white font-medium inline-flex items-center gap-1">
                    Professional Indemnity &rarr;
                  </Link>
                </div>
              </div>

              {/* Cyber Risk */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Cyber Risk & Incident Response</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Comprehensive digital asset protection against ransomware, data breaches under GDPR, and business interruption, structured alongside NIS2 compliance duties.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/servicii/business-cyber-insurance" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    Cyber Risk Cover &rarr;
                  </Link>
                </div>
              </div>

              {/* Private Client */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 w-fit mb-3">
                    <Crown className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">Private Client Portfolio</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Tailored solutions for fine art, horology collections, yachts, private aviation, and high-limit personal umbrella liability across Europe.
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-3 text-xs">
                  <Link href="/private-client" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                    Private Client Hub &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 4. CROSS-BORDER & ELIGIBILITY CONSIDERATIONS */}
          <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-blue-400" />
                Cross-Border & Eligibility Factors
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Underwriting eligibility in Romania depends on legal jurisdiction, residency status, and asset ownership:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Residency Status:</strong> Certain personal lines require a Romanian fiscal identification number (NIF/CNP) or registered address (permis de ședere).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Vehicle Registration:</strong> Romanian CASCO policies primarily cover Romanian-registered vehicles; foreign plates require specialized cross-border placement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Territorial Scope:</strong> Policies distinguish local Romanian territory from Schengen/EU extensions and worldwide coverage.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
              <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-400" />
                Documentation Typically Required
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                To prepare an accurate underwriting submission, international clients typically provide:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>Passport / EU National Identity Card and Romanian residence permit (where applicable).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>Cadastral land registry extract (Extras de Carte Funciară) for real estate assets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>Vehicle registration documents (Talon / CIV) and security telemetry confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>Corporate trade registry certificate (Certificat Constatator ONRC) for commercial entities.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. HOW THE ADVISORY PROCESS WORKS */}
          <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-zinc-900/30 border border-zinc-800/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                STRUCTURED WORKFLOW
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                How Our Advisory Process Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-mono text-blue-400 font-bold">STEP 01</div>
                <h4 className="font-bold text-white text-base">Asset & Risk Assessment</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Share the asset specifications, location, and the specific coverage scope required in Romania.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-mono text-blue-400 font-bold">STEP 02</div>
                <h4 className="font-bold text-white text-base">Eligibility Check</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We clarify residency, registration, and cross-border factors with authorized underwriters.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-mono text-blue-400 font-bold">STEP 03</div>
                <h4 className="font-bold text-white text-base">Independent Comparison</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Receive an objective summary of terms, deductibles, and exclusions translated and explained in English.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
                <div className="text-xs font-mono text-blue-400 font-bold">STEP 04</div>
                <h4 className="font-bold text-white text-base">Placement & Claims Support</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Policy finalization upon formal issuance, followed by dedicated English-speaking claims assistance.
                </p>
              </div>
            </div>
          </div>

          {/* 6. PRIMARY CONTACT & ENQUIRY FORM */}
          <div id="contact" className="scroll-mt-24 mb-16">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                DIRECT ADVISORY
              </span>
              <h2 className="text-3xl font-heading font-bold text-white mb-3">
                Request an International Consultation
              </h2>
              <p className="text-zinc-400 text-sm">
                Provide details of your assets or requirements in Romania. Cristian Văduva will respond directly with guidance.
              </p>
            </div>
            <ContactForm target="International Clients / Expats" customTitle="International Client Enquiry" />
          </div>

          {/* 7. LEGAL & COMPLIANCE FOOTNOTE */}
          <div className="p-6 rounded-2xl bg-black border border-zinc-900 text-center text-[11px] text-zinc-600 leading-relaxed">
            Advisory services are provided by Cristian Văduva Insurance Advisory (insurance.cristianvaduva.com). We operate as an independent authorized insurance broker and advisor in Romania. This page is for general informative purposes and does not constitute an automated guarantee of insurance coverage. Final policy terms, limits, deductibles, and eligibility are determined exclusively by the authorized insurance underwriting companies and the issued policy schedule.
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
