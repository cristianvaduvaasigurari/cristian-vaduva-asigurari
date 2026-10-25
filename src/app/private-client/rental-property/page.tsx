import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  ArrowRight, 
  AlertTriangle 
} from "lucide-react";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

export const metadata: Metadata = {
  title: "Protecție Proprietăți Închiriate de Lux | Private Client Cristian Văduva",
  description:
    "Analiză de risc pentru proprietarii de vile și apartamente premium oferite spre închiriere. Clauze de răspundere față de terți, daune accidentale, diferența termen lung vs. termen scurt și perioade de neocupare.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/rental-property",
  },
  openGraph: {
    title: "Analiză Risc Proprietăți Închiriate | Private Client Insurance Advisory",
    description:
      "Protecția patrimonială a vilelor și apartamentelor de lux destinate închirierii. Declararea corectă a utilizării și auditul răspunderii civile.",
    url: "https://insurance.cristianvaduva.com/private-client/rental-property",
    type: "website",
  },
};

const rentalDimensions = [
  {
    title: "Clădirea, Mobilierul & Echipamentele Proprietarului",
    desc: "Finisajele de autor, electrocasnicele premium încorporate și mobilierul lăsat la dispoziția chiriașilor impun o delimitare clară între uzura normală și daunele accidentale grave (incendiu, avarie de apă, spargere vitraje)."
  },
  {
    title: "Răspunderea Civilă față de Terți & Vecini",
    desc: "Dacă o inundație produsă de o neglijență a chiriașului deteriorează apartamentele vecine sau finisajele clădirii, cererile de despăgubire se îndreaptă adesea către proprietar. Verificăm limitele de răspundere civilă legală."
  },
  {
    title: "Termen Lung vs. Termen Scurt (Regim Hotelier)",
    desc: "Asigurătorii diferențiază strict riscurile. Închirierea în regim hotelier (short-term / Airbnb) presupune o rotație ridicată a oaspeților, riscuri crescute de efracție și daune accidentale, necesitând clauze specifice declarate contractual."
  },
  {
    title: "Perioadele Fără Chiriași (Vacanță Imobil)",
    desc: "Între contractele de închiriere, proprietatea poate rămâne neocupată săptămâni sau luni. Fără respectarea clauzelor de inspecție periodică sau notificare a neocupării, anumite acoperiri (îngheț, furt) pot fi suspendate conform contractului."
  }
];

export default function RentalPropertyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. HERO — PROPRIETARI CARE ÎNCHIRIAZĂ */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono font-semibold tracking-wider uppercase mb-8 shadow-xs">
              <Building className="w-3.5 h-3.5 text-blue-700" />
              PROPRIETĂȚI DE LUX ÎNCHIRIATE — AUDIT DE RISC
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Închiriezi o proprietate de valoare. <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">
                Polița ta ține cont de modul efectiv de utilizare?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              O locuință închiriată presupune un profil de risc fundamental diferit de cel al reședinței personale. Nedeclararea regimului de închiriere sau omiterea clauzelor de răspundere civilă poate duce la respingerea integrală a despăgubirii în caz de daună majoră.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#analiza-inchiriata">
                  Solicită o analiză pentru proprietatea închiriată
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
                  Protecție Proprietăți Premium
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. VIZUAL CINEMATIC & CLARIFICAREA DECLARĂRII CORECTE */}
        <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100">
                <Image
                  src="/images/private-client/luxury-rental-damage.jpg"
                  alt="Penthouse de lux cu avarie accidentală la instalația de apă și parchet deteriorat în timpul închirierii"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold tracking-wider uppercase border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Risc de Neconcordanță Contractuală
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 tracking-tight leading-snug">
                  De ce contractele clasice de locuință refuză daunele din spații închiriate
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <p>
                    Cele mai multe contracte standard includ clauza expresă conform căreia imobilul este utilizat exclusiv de asigurat și familia sa. Când imobilul este cedat în folosință unui terț contra cost, natura riscului se modifică legal.
                  </p>
                  <p>
                    Dacă asiguratul nu a notificat și nu a negociat o extensie de clauză pentru activitatea de închiriere, asigurătorul poate invoca agravarea nedeclarată a riscului și poate refuza plata despăgubirii.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed">
                  <strong className="text-zinc-900 block mb-1">Principiul de conformitate Private Client:</strong>
                  Acceptarea riscului, acoperirile și eventualele restricții depind strict de condițiile fiecărui produs de asigurare și de declararea transparentă, corectă și la timp a modului de utilizare a proprietății.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PATRU PILONI DE ANALIZĂ PENTRU PROPRIETĂȚI ÎNCHIRIATE */}
        <section className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                PERSPECTIVA DE SUBSGRIERE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Ce analizăm în contractul tău pentru un imobil închiriat
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Examinăm fiecare dimensiune critică pentru a alinia contractul de asigurare cu realitatea din teren:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rentalDimensions.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center font-mono font-bold text-zinc-900 text-sm shadow-2xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-zinc-900 mb-2">
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

        {/* 4. FORMULAR PENTRU PROPRIETATE ÎNCHIRIATĂ */}
        <section id="analiza-inchiriata" className="py-24 bg-zinc-950 text-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-2">
                DESCHIDERE AUDIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                Solicită o analiză pentru proprietatea închiriată
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Transmite datele proprietății și tipul de închiriere practicat. Cristian Văduva va examina polița curentă sau opțiunile disponibile pentru a proteja capitalul investit.
              </p>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-800">
              <PrivateClientEnquiryForm 
                defaultAssetCategory="Luxury Residence" 
                sourceContext="Rental Property Page" 
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
