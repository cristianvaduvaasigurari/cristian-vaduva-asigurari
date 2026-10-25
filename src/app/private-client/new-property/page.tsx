import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  Key, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

export const metadata: Metadata = {
  title: "Ghid & Evaluare după Cumpărarea unei Proprietăți | Private Client Cristian Văduva",
  description:
    "Checklist esențial după achiziția unei vile sau a unui penthouse. Verificarea documentelor, auditul riscurilor de construcție și diferența dintre asigurarea obligatorie și cea facultativă.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/new-property",
  },
  openGraph: {
    title: "Evaluare pentru Noua Proprietate | Private Client Insurance Advisory",
    description:
      "Ce trebuie să verifici imediat după semnarea contractului de vânzare-cumpărare pentru o vilă sau un penthouse de autor.",
    url: "https://insurance.cristianvaduva.com/private-client/new-property",
    type: "website",
  },
};

const purchaseChecklist = [
  {
    step: "01",
    title: "Statusul polițelor anterioare ale vânzătorului",
    desc: "Verificăm dacă fostul proprietar avea o poliță în vigoare, dacă aceasta a fost cesionată băncii, dacă se reziliază la semnare sau dacă există riscul de întrerupere completă a acoperirii din prima zi de preluare a cheilor."
  },
  {
    step: "02",
    title: "Clarificarea cadrului legal: Obligatoriu (PAD) vs. Facultativ",
    desc: "În România, Legea nr. 260/2008 impune asigurarea obligatorie a locuințelor (PAD) exclusiv pentru trei riscuri de dezastru natural (cutremur, alunecare de teren, inundație ca fenomen natural), până la limita legală maximă (100.000 lei pentru locuințele de Tip A, respectiv 50.000 lei pentru Tip B). Pentru o reședință premium, PAD reprezintă exclusiv o cerință legală de bază; nu acoperă incendiul, explozia, furtuna, avariile accidentale ale instalațiilor, finisajele de autor sau bunurile de valoare, acestea necesitând o analiză facultativă dedicată în funcție de condițiile contractuale ale produsului."
  },
  {
    step: "03",
    title: "Inventarul finisajelor și instalațiilor de autor",
    desc: "Audităm dacă proprietatea include sisteme de climatizare VRF, panouri fotovoltaice, vitraje glisante de mari dimensiuni, automatizări KNX, lift interior sau marmură masivă ce cer clauze specifice de avarii accidentale."
  },
  {
    step: "04",
    title: "Planificarea lucrărilor de amenajare sau renovare",
    desc: "Dacă urmează modificări interioare, schimbări de pardoseli sau lucrări de extindere, polițele standard exclud adesea daunele produse în timpul șantierului dacă nu a fost activată o clauză de lucrări de reamenajare."
  },
  {
    step: "05",
    title: "Regimul de utilizare & perioadele de neocupare inițială",
    desc: "Dacă proprietatea rămâne temporar neocupată până la finalizarea mutării sau a mobilării, trebuie setate notificări clare către asigurător pentru a evita excluderea efracției sau a daunelor provocate de apă."
  }
];

export default function NewPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. HERO — PENTRU PERSOANELE CARE TOCMAI AU CUMPĂRAT */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-semibold tracking-wider uppercase mb-8 shadow-xs">
              <Key className="w-3.5 h-3.5 text-emerald-700" />
              PROPRIETATE NOU ACHIZIȚIONATĂ — CHECKLIST &amp; ADVISORY
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Ai semnat pentru proprietate. <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">
                Cum te asiguri că investiția este protejată corect din prima zi?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              Momentul achiziției unei vile sau al unui penthouse este cel mai vulnerabil: contractele vechi încetează, banca poate cere o poliță generică doar pe suma împrumutată, iar finisajele de lux rămân adesea complet neacoperite. Structurăm protecția adaptată noii tale proprietăți.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#evaluare-noua-proprietate">
                  Solicită o evaluare pentru noua proprietate
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 text-sm font-semibold shadow-xs"
                asChild
              >
                <Link href="/private-client/property-protection">
                  Vezi Protecția Proprietăților Premium
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. IMAGINE CINEMATICĂ VILĂ NOUĂ & CONTEXTUL TRANZACȚIEI */}
        <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100">
                <Image
                  src="/images/private-client/new-luxury-villa.jpg"
                  alt="Vilă contemporană de lux recent finalizată la amurg cu finisaje de autor și piscină iluminată"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold tracking-wider uppercase border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Audit Post-Achiziție
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 tracking-tight leading-snug">
                  Capcana polițelor impuse la credit sau preluate mecanic de la fostul proprietar
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <p>
                    Dacă achiziția a implicat o linie de finanțare bancară, instituția creditoare impune adesea o asigurare strict pe valoarea soldului creditului, cu cesionarea drepturilor de despăgubire. Aceasta protejează banca, dar lasă complet descoperite diferența de capital propriu investit și bunurile interioare.
                  </p>
                  <p>
                    De asemenea, preluarea formală a unei polițe vechi de la vânzător este riscantă: sumele asigurate pot fi calculate la prețurile de construcție din urmă cu 5–10 ani, generând o subasigurare gravă în cazul unui incident.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 text-xs text-zinc-700 space-y-1">
                  <span className="font-bold text-zinc-900 block">Principiul nostru de consiliere:</span>
                  Evaluăm imobilul independent, la costul actualizat de reconstrucție nou și stabilim acoperirea de la zero, conform planurilor tale de amenajare și utilizare.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CHECKLIST DUPĂ ACHIZIȚIE */}
        <section className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                ETAPE PRIORITARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Checklist post-cumpărare pentru vile și penthouse-uri
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Cinci verificări documentare și tehnice pe care le parcurgem împreună înainte de finalizarea configurării poliței:
              </p>
            </div>

            <div className="space-y-4">
              {purchaseChecklist.map((item) => (
                <div 
                  key={item.step}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors flex flex-col sm:flex-row items-start gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center font-mono font-bold text-zinc-900 shrink-0 text-lg shadow-2xs">
                    {item.step}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base sm:text-lg font-heading font-bold text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FORMULAR DEDICAT PENTRU NOUA PROPRIETATE */}
        <section id="evaluare-noua-proprietate" className="py-24 bg-zinc-950 text-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-2">
                DESCHIDERE EVALUARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                Solicită o evaluare pentru noua proprietate
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Transmite-ne câteva detalii preliminare despre imobilul achiziționat. Vom analiza cerințele tehnice și vom programa o discuție confidențială.
              </p>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-800">
              <PrivateClientEnquiryForm 
                defaultAssetCategory="Luxury Residence" 
                sourceContext="New Property Page" 
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
