import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  FileCheck2, 
  ArrowRight, 
  Search 
} from "lucide-react";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

export const metadata: Metadata = {
  title: "Revizuire & Audit Poliță de Asigurare | Private Client Cristian Văduva",
  description:
    "Serviciu independent și confidențial de revizuire a polițelor existente pentru proprietăți și bunuri de valoare. Identificarea lacunelor, excluderilor ascunse, sub-limitelor și riscului de subasigurare.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/policy-review",
  },
  openGraph: {
    title: "Revizuire & Audit Poliță | Private Client Insurance Advisory",
    description:
      "Examinare confidențială a contractelor de asigurare existente. Află ce acoperă cu adevărat polița ta înainte de a apărea o daună.",
    url: "https://insurance.cristianvaduva.com/private-client/policy-review",
    type: "website",
  },
};

const auditPillars = [
  {
    step: "01",
    title: "Sumele Asigurate & Riscul de Subasigurare",
    desc: "Verificăm dacă valorile înscrise în contract mai corespund realității actuale din piața construcțiilor sau dacă inflația și creșterea prețurilor la materiale expun patrimoniul la aplicarea regulii proporționale."
  },
  {
    step: "02",
    title: "Riscurile Acoperite vs. Excluderile Ascunse",
    desc: "Examinăm cu atenție condițiile generale și speciale: clauzele de avarii accidentale la instalații, infiltrațiile provocate de ploaie torențială, fenomenele atmosferice violente și excluderile formulate ambiguu."
  },
  {
    step: "03",
    title: "Franșize, Limite & Sub-limite pe Categorii",
    desc: "Multe contracte ascund sub-limite derizorii: plafoane mici pentru conținut, bijuterii, ceasuri de colecție sau obiecte de artă, alături de franșize mari aplicabile tocmai la riscurile cu probabilitate ridicată."
  },
  {
    step: "04",
    title: "Schimbări Recente în Utilizarea Proprietății",
    desc: "Renovările de amploare, instalarea de panouri solare, perioadele prelungite de neocupare sau oferirea imobilului spre închiriere pot invalida clauzele inițiale dacă nu au fost reflectate prin acte adiționale conforme."
  }
];

export default function PolicyReviewPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. HERO — REVIZUIRE & AUDIT POLIȚĂ */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-semibold tracking-wider uppercase mb-8 shadow-xs">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-700" />
              AUDIT INDEPENDENT DE CONTRACT &amp; POLIȚĂ
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Ai deja o poliță de asigurare. <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">
                Știi exact ce refuză să despăgubească?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              Cele mai neplăcute surprize apar abia în momentul deschiderii dosarului de daună: excluderi nesemnalate, franșize ascunse sau sub-limite de despăgubire. Analizăm contractul tău existent, identificăm lacunele și îți prezentăm opțiunile reale de optimizare.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#solicita-revizuire">
                  Solicită o revizuire a poliței
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 text-sm font-semibold shadow-xs"
                asChild
              >
                <Link href="/private-client">
                  Vezi Divizia Private Client
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. VIZUAL CINEMATIC & CLARITATE METODICĂ */}
        <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100">
                <Image
                  src="/images/private-client/policy-audit-documents.jpg"
                  alt="Birou executiv de consultanță cu dosare de polițe de asigurare și audit metodic al clauzelor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-wider uppercase border border-zinc-200">
                  <Search className="w-3.5 h-3.5 text-zinc-700" />
                  Examinare Confidențială
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 tracking-tight leading-snug">
                  Un audit de claritate, fără promisiuni false sau presiuni de vânzare
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <p>
                    Scopul revizuirii nu este schimbarea forțată a asigurătorului, ci înțelegerea fără echivoc a termenilor semnați. Dacă polița actuală este bine structurată și sumele sunt adecvate, îți vom confirma acest lucru.
                  </p>
                  <p>
                    Dacă identificăm riscuri de subasigurare sau clauze restrictive care contravin modului tău de viață, îți vom explica opțiunile concrete de ajustare, fără a face promisiuni nefondate privind rezultatul unui eventual dosar de daună.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed">
                  <strong className="text-zinc-900 block mb-1">Protecția intimității tale:</strong>
                  Nu este necesar să transmiți documente financiare sensibile prin canale nesecurizate. Pentru demararea analizei, sunt suficiente detaliile de bază despre tipul proprietății și acoperirile pe care dorești să le verificăm.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PATRU DIRECTII DE AUDIT */}
        <section className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                ANATOMIA AUDITULUI
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Ce căutăm în documentele tale de asigurare
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Parcurgem metodic patru zone sensibile unde apar cele mai costisitoare neconcordanțe:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {auditPillars.map((pillar) => (
                <div 
                  key={pillar.step}
                  className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center font-mono font-bold text-zinc-900 text-sm shadow-2xs">
                    {pillar.step}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-zinc-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FORMULAR PENTRU REVIZUIRE POLIȚĂ */}
        <section id="solicita-revizuire" className="py-24 bg-zinc-950 text-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-2">
                DESCHIDERE REVISTUIRE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                Solicită o revizuire a poliței
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Completează formularul cu datele de contact și câteva informații generale despre contractele actuale. Cristian Văduva va reveni pentru o discuție preliminară confidențială.
              </p>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-800">
              <PrivateClientEnquiryForm 
                defaultAssetCategory="Luxury Residence" 
                sourceContext="Policy Review Page" 
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
