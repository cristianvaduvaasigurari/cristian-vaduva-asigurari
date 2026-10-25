import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  PhoneCall, 
  Sparkles, 
  Key, 
  Building, 
  Search 
} from "lucide-react";
import { privateClientCategories } from "@/data/privateClientData";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Private Client — Insurance Advisory & Property Protection | Cristian Văduva",
  description:
    "Serviciu exclusiv de consultanță pentru identificarea riscurilor asociate proprietăților premium, bunurilor valoroase, familiei și activităților profesionale. Protect what you have built. Plan for what comes next.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client",
  },
  openGraph: {
    title: "Private Client — Insurance Advisory | Cristian Văduva",
    description:
      "Protect what you have built. Plan for what comes next. O abordare personalizată pentru protecția patrimoniului și a proprietăților de autor.",
    url: "https://insurance.cristianvaduva.com/private-client",
    siteName: "Cristian Văduva — Private Client",
    locale: "ro_RO",
    type: "website",
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  supercars: <Car className="w-5 h-5 text-zinc-700" />,
  yachts: <Ship className="w-5 h-5 text-zinc-700" />,
  "private-aviation": <Plane className="w-5 h-5 text-zinc-700" />,
  "jewellery-watches": <Watch className="w-5 h-5 text-zinc-700" />,
  "fine-art-collectibles": <Palette className="w-5 h-5 text-zinc-700" />,
  "luxury-homes": <Building2 className="w-5 h-5 text-zinc-700" />,
  collections: <Archive className="w-5 h-5 text-zinc-700" />,
  "private-client-liability": <Scale className="w-5 h-5 text-zinc-700" />
};

const advisorySpecializations = [
  {
    title: "Protecție Proprietăți Premium",
    subtitle: "Vile Arhitecturale & Penthouse-uri",
    href: "/private-client/property-protection",
    icon: <Building2 className="w-6 h-6 text-zinc-800" />,
    image: "/images/risks/villa-fire-cinematic.jpg",
    alt: "Vilă modernă de lux cu finisaje de autor",
    desc: "Analiza aprofundată a riscurilor pentru reședințe de mare valoare: diferența critică dintre valoarea de piață și costul real de reconstrucție, excluderi de demolare și finisaje de autor.",
    cta: "Explorează Protecția Proprietăților"
  },
  {
    title: "Proprietate Nou Achiziționată",
    subtitle: "Checklist & Audit Post-Cumpărare",
    href: "/private-client/new-property",
    icon: <Key className="w-6 h-6 text-zinc-800" />,
    image: "/images/private-client/new-luxury-villa.jpg",
    alt: "Vilă contemporană recent finalizată",
    desc: "Verificarea documentelor după semnarea tranzacției, riscurile instalațiilor și finisajelor, renovări planificate și distincția clară între protecția legală minimă (PAD) și cea facultativă.",
    cta: "Vezi Ghidul După Achiziție"
  },
  {
    title: "Proprietăți Închiriate de Lux",
    subtitle: "Vile & Apartamente cedate în Folosință",
    href: "/private-client/rental-property",
    icon: <Building className="w-6 h-6 text-zinc-800" />,
    image: "/images/private-client/luxury-rental-damage.jpg",
    alt: "Penthouse de lux cu risc de daune accidentale",
    desc: "Analiza modului de utilizare (termen lung vs. termen scurt), răspunderea civilă față de terți și vecini, daune produse de locatari și perioadele de neocupare dintre contracte.",
    cta: "Analiză Proprietate Închiriată"
  },
  {
    title: "Revizuire & Audit Poliță Existentă",
    subtitle: "Examinare Independentă a Clauzelor",
    href: "/private-client/policy-review",
    icon: <Search className="w-6 h-6 text-zinc-800" />,
    image: "/images/private-client/policy-audit-documents.jpg",
    alt: "Dosare de audit de asigurare și contracte",
    desc: "Examinarea contractelor actuale: sume asigurate perimate, sub-limite de conținut sau bijuterii, excluderi necomunicate și riscuri de subasigurare, fără promisiuni false.",
    cta: "Solicită o Revizuire a Poliței"
  }
];

const advisoryProcessSteps = [
  {
    number: "01",
    title: "Discuție confidențială",
    desc: "Înțelegerea detaliată a patrimoniului, priorităților, modului de utilizare a bunurilor și obiectivelor specifice ale clientului sau familiei."
  },
  {
    number: "02",
    title: "Inventarul riscurilor",
    desc: "Analizarea metodică a proprietăților, autovehiculelor, pieselor de colecție, răspunderilor profesionale și a polițelor existente."
  },
  {
    number: "03",
    title: "Identificarea lacunelor",
    desc: "Examinarea riguroasă a limitelor contractuale, excluderilor ascunse, condițiilor de despăgubire și eventualelor suprapuneri sau breșe de acoperire."
  },
  {
    number: "04",
    title: "Propuneri personalizate",
    desc: "Identificarea soluțiilor optime disponibile prin asigurător și, când este necesar, prin parteneri specializați, în funcție de eligibilitate și condițiile contractuale."
  }
];

export default function PrivateClientHubPage() {
  const categoriesList = Object.values(privateClientCategories);

  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. HERO — REPOZIȚIONARE ADVISORY & PROTECȚIA PATRIMONIULUI */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02),transparent_60%)] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono font-semibold tracking-wider uppercase mb-6 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-zinc-700" />
              PRIVATE CLIENT — CRISTIAN VĂDUVA INSURANCE ADVISORY
            </div>

            <div className="mb-4">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-zinc-500 uppercase block">
                Cristian Văduva — Insurance Advisory
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Protect what you have built. <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">
                Plan for what comes next.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              O abordare personalizată pentru identificarea riscurilor asociate proprietăților, bunurilor valoroase, familiei și activităților profesionale. Consultanță discretă, audit de clauze și coordonarea structurilor de protecție fără promisiuni garantate fără fundament.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#confidential-enquiry">
                  Solicită o evaluare Private Client
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 text-sm font-semibold shadow-xs"
                asChild
              >
                <a href="#advisory-services">
                  Servicii Specializate de Analiză
                </a>
              </Button>
            </div>

            <div className="mt-14 pt-8 border-t border-zinc-200 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 uppercase tracking-widest font-mono">
              <span>Analiză Individuală</span>
              <span>•</span>
              <span>Valoare Agreată</span>
              <span>•</span>
              <span>Audit de Clauze</span>
              <span>•</span>
              <span>Confidențialitate Totală</span>
            </div>
          </div>
        </section>

        {/* 2. CELE PATRU DIRECȚII SPECIALIZATE DE CONSULTANȚĂ (ADVISORY SERVICES) */}
        <section id="advisory-services" className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                SERVICII DEDICATE DE ANALIZĂ
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
                Consultanță structurată pe nevoile exacte ale patrimoniului tău
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Fie că deții reședințe de autor, tocmai ai finalizat o achiziție, închiriezi active premium sau vrei un audit independent al polițelor în vigoare, abordăm fiecare situație metodic:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advisorySpecializations.map((item, idx) => (
                <article 
                  key={idx}
                  className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-xs hover:border-zinc-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/9] w-full bg-zinc-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 border border-zinc-800">
                      {item.icon}
                      <span>{item.subtitle}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-950 mb-3 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-900 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-600" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PROCESUL PROPUS ÎN PATRU PAȘI */}
        <section className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                PROCES METODIC
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Secvența de Consultanță Confidențială
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Relația cu fiecare client este fundamentată pe discreție, rigoare tehnică și examinarea transparentă a eligibilității contractuale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisoryProcessSteps.map((step) => (
                <div 
                  key={step.number} 
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl font-mono font-bold text-zinc-300 mb-4">{step.number}</div>
                    <h3 className="text-base font-heading font-bold text-zinc-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 rounded-2xl bg-zinc-100 border border-zinc-200/80 text-center max-w-3xl mx-auto text-xs text-zinc-600 leading-relaxed">
              * Notă de conformitate: În cadrul procesului de consultanță nu promitem acoperire garantată și nu sugerăm că fiecare risc poate fi asigurat. Orice propunere depinde de analiza tehnică de risc a asigurătorului, de eligibilitatea activelor și de termenii contractuali agreați.
            </div>
          </div>
        </section>

        {/* 4. DIVIZIILE DE ACTIVE DE VALOARE (SOLUȚII REZULTATE DIN CONSULTANȚĂ) */}
        <section id="divisions" className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                CATEGORII DE ACTIVE ANALIZATE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Soluții rezultate pentru active de mare valoare
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Produsele de asigurare apar ca soluții derivate din consultanță, calibrate pe caracteristicile fiecărei clase de active:
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
                        {categoryIcons[cat.slug] || <Sparkles className="w-5 h-5 text-zinc-700" />}
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-700 uppercase px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200">
                        {cat.badgeRo || cat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {cat.titleRo || cat.title}
                    </h3>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {cat.heroIntroRo || cat.heroIntro}
                    </p>

                    <div className="space-y-1.5 mb-8">
                      {(cat.coverageCategoriesRo || cat.coverageCategories).slice(0, 3).map((item, idx) => (
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
                      <span>DETALII DIVIZIE</span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FORMULAR REAL PENTRU EVALUARE PRIVATE CLIENT */}
        <section id="confidential-enquiry" className="py-24 bg-white border-b border-zinc-200/80 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-2">
                SOLICITARE CONFIDENȚIALĂ
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Solicită o evaluare Private Client
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Completează datele de bază pentru deschiderea dosarului de analiză. Cristian Văduva va examina profilul activelor și va programa o discuție confidențială.
              </p>
            </div>

            <PrivateClientEnquiryForm sourceContext="Private Client Landing Page" />
          </div>
        </section>

        {/* 6. PROFILUL CONSULTANTULUI — CRISTIAN VĂDUVA */}
        <section className="py-20 bg-zinc-50/70 border-b border-zinc-200/80">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 md:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-zinc-100">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-4.jpg"
                    alt="Portret Cristian Văduva — Consultant Asigurări Private Client și Management de Risc"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-300 font-semibold mb-0.5">
                      Consultant Autorizat &amp; Partener Generali
                    </p>
                    <p className="text-base font-bold font-heading">
                      Cristian Văduva
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Consultanță Confidențială
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight leading-snug">
                  Preferi o discuție directă, confidențială?
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                  Poți lua legătura direct cu Cristian Văduva pentru o analiză discretă privind proprietăți de mare valoare, colecții sau expuneri patrimoniale complexe.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button 
                    variant="outline"
                    className="rounded-full border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 px-6 h-12 text-xs font-semibold shadow-xs"
                    asChild
                  >
                    <a href={CONTACT.phone.href}>
                      <PhoneCall className="w-3.5 h-3.5 mr-2 text-zinc-600" />
                      Direct: {CONTACT.phone.display}
                    </a>
                  </Button>

                  <Button 
                    variant="outline"
                    className="rounded-full border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-6 h-12 text-xs font-semibold shadow-xs"
                    asChild
                  >
                    <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                      Linie Prioritară WhatsApp
                    </a>
                  </Button>

                  <Button
                    variant="ghost"
                    className="rounded-full text-zinc-600 hover:text-zinc-900 text-xs font-semibold"
                    asChild
                  >
                    <Link href="/despre-mine">
                      Despre Consultant &rarr;
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRECIZARE LEGALĂ & CONDIȚII DE SUBSCRIERE */}
        <div className="py-8 bg-zinc-100 text-center text-[11px] text-zinc-500 px-4">
          <div className="max-w-4xl mx-auto leading-relaxed">
            Acoperirile, eligibilitatea, sumele asigurate, excluderile și disponibilitatea depind de termenii polițelor, documentele puse la dispoziție și condițiile de subscriere ale asigurătorilor autorizați. Divizia Private Client reprezintă un serviciu de consultanță și plasament oferit de Cristian Văduva (insurance.cristianvaduva.com). Nu afirmăm că un anumit eveniment este acoperit fără verificarea prealabilă a condițiilor contractuale concrete.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
