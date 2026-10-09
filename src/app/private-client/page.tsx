import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Car, 
  Ship, 
  Plane, 
  Watch, 
  Palette, 
  Building2, 
  Archive, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  Compass,
  Sparkles
} from "lucide-react";
import { privateClientCategories, privateClientProcess } from "@/data/privateClientData";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Private Client Insurance | Cristian Văduva",
  description:
    "Private client insurance advisory for exceptional assets including supercars, yachts, private aviation, jewellery, watches, fine art, luxury residences and collections.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client",
  },
  openGraph: {
    title: "Private Client Insurance | Cristian Văduva",
    description:
      "Specialist insurance advisory for extraordinary assets, complex personal risks and high-net-worth patrimony.",
    url: "https://insurance.cristianvaduva.com/private-client",
    siteName: "Cristian Văduva — Private Client",
    locale: "ro_RO",
    type: "website",
  },
};


const categoryIcons: Record<string, React.ReactNode> = {
  supercars: <Car className="w-6 h-6 text-zinc-700" />,
  yachts: <Ship className="w-6 h-6 text-zinc-700" />,
  "private-aviation": <Plane className="w-6 h-6 text-zinc-700" />,
  "jewellery-watches": <Watch className="w-6 h-6 text-zinc-700" />,
  "fine-art-collectibles": <Palette className="w-6 h-6 text-zinc-700" />,
  "luxury-homes": <Building2 className="w-6 h-6 text-zinc-700" />,
  collections: <Archive className="w-6 h-6 text-zinc-700" />,
  "private-client-liability": <Scale className="w-6 h-6 text-zinc-700" />
};

export default function PrivateClientHubPage() {
  const categoriesList = Object.values(privateClientCategories);

  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. EDITORIAL HERO */}
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          {/* Subtle architectural atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02),transparent_60%)] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            {/* Division Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold tracking-[0.25em] uppercase mb-8 shadow-sm">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              PRIVATE CLIENT DIVISION
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-zinc-900 tracking-tight leading-[1.08] mb-8">
              Insurance for <br className="hidden sm:block" />
              <span className="text-zinc-900 font-extrabold">Extraordinary Assets</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-12">
              Specialist insurance solutions for high-value assets, complex personal risks and the things that cannot simply be replaced.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#confidential-enquiry">
                  REQUEST A PRIVATE CLIENT REVIEW
                </a>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 text-sm font-semibold shadow-sm"
                asChild
              >
                <a href="#divisions">
                  EXPLORE COVERAGE
                </a>
              </Button>
            </div>

            {/* Core Premise Tag */}
            <div className="mt-16 pt-8 border-t border-zinc-200 max-w-xl mx-auto flex items-center justify-center gap-6 text-xs text-zinc-500 uppercase tracking-widest font-mono">
              <span>Agreed Valuation</span>
              <span>•</span>
              <span>Discreet Advisory</span>
              <span>•</span>
              <span>Bespoke Wording</span>
            </div>
          </div>
        </section>

        {/* 2. POSITIONING NARRATIVE */}
        <section className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                  PRIMARY POSITIONING
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight leading-tight mb-6">
                  Some assets require more than standard insurance.
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Mass-market insurance relies on automated algorithmic pricing, rigid depreciation curves, and restrictive off-the-shelf clauses. When assets carry significant monetary or historical value, standard policies leave dangerous exposure gaps.
                </p>
              </div>

              <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 text-base font-semibold mb-1">Agreed Value Protection</h4>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        Values are established and legally binding upfront with accredited appraisals, removing subjective insurer depreciation at the time of claim.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-0.5">
                      <Lock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 text-base font-semibold mb-1">Confidential Placement</h4>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        Asset schedules, security locations, and private client identities are held under bank-grade confidentiality and negotiated directly with specialized underwriters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 mt-0.5">
                      <Compass className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 text-base font-semibold mb-1">Worldwide Exposure & Mobility</h4>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        Seamless cover across international borders, transit corridors, seasonal estate relocations, and global marine navigation routes where available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. EDITORIAL SERVICE GRID (8 DIVISIONS) */}
        <section id="divisions" className="py-28 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                SPECIALIST DIVISIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                Curated Divisions for Exceptional Assets
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Each category is structured around the unique physical, operational, and valuation characteristics of the asset class.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {categoriesList.map((cat) => (
                <div 
                  key={cat.slug} 
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {categoryIcons[cat.slug] || <Sparkles className="w-6 h-6 text-zinc-700" />}
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-700 uppercase px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                      {cat.heroIntro}
                    </p>

                    <div className="space-y-1.5 mb-8">
                      {cat.coverageCategories.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="text-xs text-zinc-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 flex items-center justify-between relative z-10">
                    <Link
                      href={`/private-client/${cat.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-zinc-900 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      <span>EXPLORE {cat.navTitle.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ADVISORY SEQUENCE (DISCOVER → ASSESS → ADVISE → QUOTE) */}
        <section className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                STRUCTURED WORKFLOW
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                The Advisory Sequence
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                The visitor journey is structured as a discreet consultation: Discover, Assess, Advise, and Quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {privateClientProcess.map((step) => (
                <div 
                  key={step.step} 
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-sm relative"
                >
                  <div className="text-3xl font-mono font-bold text-zinc-300 mb-4">{step.step}</div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-2">
                    {step.name}
                  </span>
                  <h3 className="text-base font-heading font-bold text-zinc-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CONFIDENTIAL ENQUIRY FORM */}
        <section id="confidential-enquiry" className="py-28 bg-white border-b border-zinc-200/80 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-2">
                DISCREET INGESTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                Request a Private Client Review
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Complete the confidential enquiry below. Cristian Văduva will review the asset profile and structure the appropriate advisory and underwriting placement strategy.
              </p>
            </div>

            <PrivateClientEnquiryForm sourceContext="Private Client Landing Page" />
          </div>
        </section>

        {/* 6. DIRECT CONTACT PANEL */}
        <section className="py-20 bg-zinc-50/70 border-b border-zinc-200/80">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h3 className="text-2xl font-heading font-bold text-zinc-900 mb-4">
              Prefer a direct consultation?
            </h3>
            <p className="text-zinc-600 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              You can connect directly with Cristian Văduva for confidential discussions regarding single high-value assets or multi-category collections.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                variant="outline"
                className="rounded-full border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 px-6 h-12 text-xs font-semibold shadow-sm"
                asChild
              >
                <a href={CONTACT.phone.href}>
                  <PhoneCall className="w-3.5 h-3.5 mr-2 text-zinc-600" />
                  Direct: {CONTACT.phone.display}
                </a>
              </Button>

              <Button 
                variant="outline"
                className="rounded-full border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-6 h-12 text-xs font-semibold shadow-sm"
                asChild
              >
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  WhatsApp Priority Line
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. COMPLIANCE FOOTNOTE */}
        <div className="py-8 bg-zinc-100 text-center text-[11px] text-zinc-500 px-4">
          <div className="max-w-4xl mx-auto leading-relaxed">
            Coverage, eligibility, limits, exclusions and availability are subject to underwriting, policy terms and applicable requirements. Private Client is an advisory and placement division of Cristian Văduva Insurance Advisory (insurance.cristianvaduva.com). We do not provide self-underwritten binding authority; all quotations and risk acceptances are subject to authorized underwriting market review.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
