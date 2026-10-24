import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  Globe2,
  Building2,
  FileCheck2,
  Scale,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Layers,
  HeartHandshake,
  Compass,
  Award,
  Eye,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Despre Cristian Văduva | Consultant Asigurări & Protecție Patrimonială",
  description: "Profilul profesional, educația, galeria foto și filosofia de lucru a lui Cristian Văduva. Analiză financiară, evaluarea riscurilor și protecția patrimoniului privat și de afaceri.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/despre-mine",
  },
  openGraph: {
    title: "Despre Cristian Văduva | Consultant Asigurări & Protecție Patrimonială",
    description: "Profil profesional, educație și consultanță strategică în protecția patrimoniului, real estate și evaluarea riscurilor.",
    url: "https://insurance.cristianvaduva.com/despre-mine",
    locale: "ro_RO",
    type: "profile",
    images: [
      {
        url: "https://insurance.cristianvaduva.com/images/cristian-vaduva/cristian-vaduva-portrait-1.jpg",
        width: 1200,
        height: 1200,
        alt: "Cristian Văduva - Consultant Asigurări & Protecție Patrimonială",
      },
    ],
  },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cristian Văduva",
    jobTitle: "Consultant Asigurări & Advisor Protecție Patrimonială",
    url: "https://insurance.cristianvaduva.com/despre-mine",
    image: "https://insurance.cristianvaduva.com/images/cristian-vaduva/cristian-vaduva-portrait-1.jpg",
    sameAs: [
      "https://cristianvaduva.com",
      "https://aixluxury.com",
      "https://homefind.cristianvaduva.com"
    ],
    knowsAbout: [
      "Risk Assessment",
      "Insurance Advisory",
      "Wealth Protection",
      "Financial Management",
      "Real Estate Advisory"
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        {/* 1. HERO SECTION & PORTRETUL PRINCIPAL DE AUTORITATE */}
        <section className="container mx-auto px-4 max-w-6xl mb-20 md:mb-28" aria-labelledby="about-hero-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wider uppercase border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Profil Profesional &amp; Viziune
              </div>

              <h1 id="about-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-zinc-900 leading-tight">
                Cristian <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Văduva
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
                Consultanță strategică în evaluarea riscurilor, identificarea lacunelor din polițe și structurarea protecției financiare pentru patrimonii private și companii.
              </p>

              <p className="text-sm md:text-base text-zinc-600 leading-relaxed">
                Rolul meu nu este să vând agresiv polițe standardizate, ci să te ajut să înțelegi ce ai de pierdut înainte să afli cât te costă o daună. Verific documentele și condițiile contractuale disponibile, identific întrebările esențiale și lacunele care merită investigate, și îți prezint opțiunile clare — fără promisiuni nerealiste că orice risc poate fi transferat automat unui asigurător.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-black font-semibold shadow-md" asChild>
                  <Link href="/contact" prefetch={false}>
                    Solicită o analiză confidențială
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-zinc-300 text-zinc-800 hover:bg-zinc-100" asChild>
                  <Link href="/verifica-polita" prefetch={false}>
                    Nu știu dacă sunt protejat
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-zinc-100">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-1.jpg"
                    alt="Portret Cristian Văduva — Consultant Asigurări Generali și Management de Risc"
                    fill
                    priority
                    quality={72}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 448px, (max-width: 1280px) 480px, 520px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-1">
                      Consultanță &amp; Management de Risc
                    </p>
                    <p className="text-lg font-bold font-heading">
                      Cristian Văduva
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. NOU: GALERIE EDITORIALĂ ASIMETRICĂ — „PREZENȚĂ, VIZIUNE & PERSPECTIVĂ” */}
        <section className="bg-zinc-50 border-y border-zinc-200/80 py-20 mb-20 md:mb-28" aria-labelledby="editorial-gallery-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">
                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                Galerie Editorială &amp; Prezență
              </div>
              <h2 id="editorial-gallery-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                O abordare modernă, dinamică și conectată la realitate
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Dincolo de tabele și cifre, consultanța patrimonială este o activitate eminamente umană. Fiecare decizie strategică reflectă stilul de viață, obiectivele și siguranța pe termen lung a celor cu care colaborez.
              </p>
            </div>

            {/* Mozaic de 3 fotografii distincte */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Foto 5: Lounge interior de lux */}
              <div className="md:col-span-5 relative group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-zinc-200 bg-white">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-5.jpg"
                    alt="Cristian Văduva — Consultanță în spații rezidențiale premium și analiză de patrimoniu"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={70}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 420px, 460px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 block mb-0.5">
                      Private Residence
                    </span>
                    <p className="text-sm font-semibold font-heading">
                      Consultanță personalizată în spații private
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto 6: Viena / Viziune Europeană */}
              <div className="md:col-span-4 relative group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-zinc-200 bg-white">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-6.jpg"
                    alt="Cristian Văduva — Perspective europene și colaborări transfrontaliere"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={70}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 360px, 400px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 block mb-0.5">
                      Perspectivă Europeană
                    </span>
                    <p className="text-sm font-semibold font-heading">
                      Standarde internaționale de underwriting
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto 2: Panoramic Rooftop București */}
              <div className="md:col-span-3 relative group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-zinc-200 bg-white">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-2.jpg"
                    alt="Cristian Văduva pe terasa panoramică — Viziune de ansamblu asupra pieței din București"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={70}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 300px, 320px"
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 block mb-0.5">
                      Rooftop Perspective
                    </span>
                    <p className="text-sm font-semibold font-heading">
                      Viziune de ansamblu asupra pieței
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FILOSOFIE DE LUCRU */}
        <section className="container mx-auto px-4 max-w-6xl mb-20 md:mb-28" aria-labelledby="philosophy-heading">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block mb-2">
              Filosofie &amp; Rol Consultativ
            </span>
            <h2 id="philosophy-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
              Înțelege ce ai de pierdut înainte să afli cât te costă
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Pe o piață dominată de formulare automate și vânzări tranzacționale, diferențiatorul esențial este consultanța de fond. Nu ofer soluții predefinite din catalog, ci investighez riscurile reale pentru ca decizia ta să fie fundamentată pe fapte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Scale className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Înțelegerea Expunerilor Reale
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Mapăm activele tangibile și intangibile — de la reședințe și bunuri de colecție până la continuitatea operațională a companiei. Analiza pornește de la consecințele financiare ale unei daune posibile, nu de la costul primei de asigurare.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Audit Riguros al Contractelor
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Citim dincolo de pagina de sumar. Verificăm clauzele de subasigurare, franșizele aplicabile per eveniment, plafoanele pentru bunuri de valoare și excluderile care pot invalida o cerere legitimă de despăgubire.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Identificarea Lacunelor &amp; Opțiuni Clare
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Prezentăm un diagnostic obiectiv al punctelor vulnerabile și soluțiile tehnice disponibile pe piață. Explicăm deschis ce riscuri pot fi transferate eficient și ce măsuri interne de securitate sunt necesare.
              </p>
            </div>
          </div>
        </section>

        {/* 4. EDUCAȚIE, STUDII INTERNAȚIONALE & SCHÖNBRUNN PALACE */}
        <section className="bg-zinc-50 border-y border-zinc-200/80 py-20 mb-20 md:mb-28" aria-labelledby="education-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Foto 7: Schönbrunn Palace Viena */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 bg-white group">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-7.jpg"
                    alt="Cristian Văduva la Palatul Schönbrunn — Formare academică și experiență internațională europeană"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={70}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 450px, 480px"
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 block mb-0.5">
                      Parcurs Academic European
                    </span>
                    <p className="text-base font-bold font-heading">
                      Educație interdisciplinară: Finanțe, Drept &amp; Mediu
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block mb-2">
                    Formare Academică &amp; Stagii Europene
                  </span>
                  <h2 id="education-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                    O perspectivă interdisciplinară: Rigoare, Drept și Finanțe
                  </h2>
                  <p className="text-zinc-600 leading-relaxed">
                    Capacitatea de a evalua riscuri complexe derivă dintr-un parcurs educațional solid și diversificat, completat de experiențe internaționale de studiu și stagiu practic în Europa.
                  </p>
                </div>

                {/* Verified Degrees */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <GraduationCap className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm md:text-base">
                        Trei Diplome Universitare
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-600 mt-1">
                        Absolvent al trei facultăți în domeniile <strong>Economie</strong>, <strong>Ecologie</strong> și <strong>Drept</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <Layers className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm md:text-base">
                        Trei Programe de Masterat
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-600 mt-1">
                        Specializări aprofundate în <strong>Management Financiar</strong>, <strong>Evaluarea Impactului asupra Mediului</strong> și <strong>Securitatea Informației</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <Globe2 className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm md:text-base">
                        Experiență Internațională în Europa
                      </h3>
                      <ul className="text-xs md:text-sm text-zinc-600 mt-1 space-y-1 list-disc list-inside">
                        <li><strong>1 an</strong> de studii universitare în Management Financiar la <strong>Madrid, Spania</strong></li>
                        <li><strong>6 luni</strong> de studii universitare la <strong>Amiens, Franța</strong></li>
                        <li><strong>3 luni</strong> de stagiu practic de mediu în <strong>Malta</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SINERGIE PATRIMONIALĂ & EXPERTIZĂ ÎN ARHITECTURĂ / TEREN */}
        <section className="container mx-auto px-4 max-w-6xl mb-20 md:mb-28" aria-labelledby="synergy-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block">
                Sinergie Patrimonială
              </span>
              <h2 id="synergy-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
                Conexiunea între Real Estate Premium și Protecția Activelor
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Experiența acumulată în sectorul imobiliar de lux prin inițiative precum <em>Home Find</em> și <em>AiXLuxury.com</em> m-a pus în contact direct cu proprietari de reședințe exclusiviste, colecții private și clădiri comerciale.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Am constatat frecvent discrepanțe majore între valoarea reală de piață ori de reconstrucție a unei proprietăți și acoperirea din polița de asigurare. În caz de daună majoră (incendiu, cutremur, răspundere civilă extinsă), aceste diferențe pot genera pierderi financiare greu de recuperat.
              </p>
              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Evaluarea corectă a costului de reconstrucție fără sub-asigurare</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Protecție dedicată bunurilor de valoare ridicată și finisajelor speciale</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Clauze adaptate pentru chiriași, proprietari și răspundere civilă</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Soluții personalizate pentru flote auto și vehicule speciale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Foto 3: În fața vilelor cu arhitectură modernă */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 bg-white group">
                <Image
                  src="/images/cristian-vaduva/cristian-vaduva-portrait-3.jpg"
                  alt="Cristian Văduva în fața unor proprietăți moderne — Expertiză în asigurarea proprietăților imobiliare premium"
                  fill
                  loading="lazy"
                  decoding="async"
                  quality={70}
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 450px, 480px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 block mb-0.5">
                    Arhitectură &amp; Active
                  </span>
                  <p className="text-base font-bold font-heading">
                    Inspecție tehnică și evaluare directă pe teren
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PRIVATE ADVISORY & LUXURY LOUNGE */}
        <section className="bg-zinc-900 text-white py-20 mb-20 md:mb-28" aria-labelledby="private-advisory-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Foto 4: Lounge de birou panoramic */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-800 group">
                  <Image
                    src="/images/cristian-vaduva/cristian-vaduva-portrait-4.jpg"
                    alt="Cristian Văduva — Private Client Advisory & Consultanță în spații exclusiviste"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={70}
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 450px, 480px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 block mb-0.5">
                      Private Client
                    </span>
                    <p className="text-base font-bold font-heading">
                      Consultanță discretă pentru patrimonii complexe
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <span className="text-xs font-bold tracking-widest uppercase text-blue-400 block">
                  Exclusivitate &amp; Confidențialitate
                </span>
                <h2 id="private-advisory-heading" className="text-3xl md:text-4xl font-heading font-bold tracking-tight leading-tight">
                  Private Advisory: Managementul integrat al riscului patrimonial
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  Clienții cu active substanțiale se confruntă cu riscuri atipice: răspundere civilă extinsă pentru administratori, colecții de artă și bijuterii, iahturi, proprietăți transfrontaliere și continuitate succesorală.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  În parteneriat cu Generali România și diviziile specializate de underwriting, construiesc soluții croite pe măsură, în care fiecare clauză este calibrată pentru protecție maximă și confidențialitate absolută.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-md" asChild>
                    <Link href="/private-client" prefetch={false}>
                      Explorează Private Client
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. NOU: SECȚIUNE EDITORIALĂ FINALĂ — „PERSPECTIVĂ STRATEGICĂ & PARTENERIAT” (FOTO 8 & 9) */}
        <section className="container mx-auto px-4 max-w-6xl mb-20 md:mb-28" aria-labelledby="strategic-vision-heading">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block mb-2">
              Viziune Strategică &amp; Relații pe Termen Lung
            </span>
            <h2 id="strategic-vision-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
              Încrederea se construiește prin stabilitate și dialog deschis
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Consultanța de succes nu înseamnă o singură tranzacție, ci o relație de încredere cultivată de-a lungul anilor. Analizăm riscurile la rece și planificăm fiecare etapă cu claritate deplină.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Foto 8: Dunărea la apus */}
            <div className="relative group rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-lg">
              <div className="relative aspect-[4/5] sm:aspect-[16/11]">
                <Image
                  src="/images/cristian-vaduva/cristian-vaduva-portrait-8.jpg"
                  alt="Cristian Văduva la apus cu vedere panoramică — Viziune strategică și perspectivă clară de viitor"
                  fill
                  loading="lazy"
                  decoding="async"
                  quality={70}
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 500px, 560px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Claritate &amp; Direcție
                  </span>
                  <h3 className="text-lg font-bold font-heading">
                    Planificare pe termen lung pentru patrimonii durabile
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Privim dincolo de conjuncturi temporare pentru a proteja stabilitatea financiară a generațiilor viitoare.
                  </p>
                </div>
              </div>
            </div>

            {/* Foto 9: Sky Lounge Sunset */}
            <div className="relative group rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-lg">
              <div className="relative aspect-[4/5] sm:aspect-[16/11]">
                <Image
                  src="/images/cristian-vaduva/cristian-vaduva-portrait-9.jpg"
                  alt="Cristian Văduva în Sky Lounge — Dialog relaxat, confidențialitate și parteneriat veritabil"
                  fill
                  loading="lazy"
                  decoding="async"
                  quality={70}
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 500px, 560px"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Parteneriat de Încredere
                  </span>
                  <h3 className="text-lg font-bold font-heading">
                    Dialog relaxat, confidențialitate și decizii informate
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Fiecare colaborare începe printr-o conversație onestă, fără presiuni comerciale și cu respect deplin pentru prioritățile tale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. STANDARDE ȘI PRINCIPII */}
        <section className="bg-zinc-50 border-y border-zinc-200/80 py-20 mb-20 md:mb-28" aria-labelledby="principles-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block mb-2">
                Standarde Profesionale
              </span>
              <h2 id="principles-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
                Principiile care ghidează fiecare colaborare
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Consultanța în asigurări implică încredere directă și responsabilitate. Iată valorile aplicate în fiecare etapă a dialogului nostru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-xs">
                <span className="text-3xl font-heading font-extrabold text-blue-600 mb-3 block">01</span>
                <h3 className="font-heading font-bold text-lg text-zinc-900 mb-2">Claritate Contractuală</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Explic în termeni accesibili fiecare clauză importantă, excluderile prevăzute și condițiile exacte în care se acordă despăgubirea.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-xs">
                <span className="text-3xl font-heading font-extrabold text-blue-600 mb-3 block">02</span>
                <h3 className="font-heading font-bold text-lg text-zinc-900 mb-2">Transparență Totală</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Fără costuri neprevăzute sau condiții ambigue. Analizăm franșizele și opțiunile astfel încât să iei o decizie asumată și documentată.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-xs">
                <span className="text-3xl font-heading font-extrabold text-blue-600 mb-3 block">03</span>
                <h3 className="font-heading font-bold text-lg text-zinc-900 mb-2">Evaluarea Riguroasă</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Punem accent pe prevenție și identificarea scenariilor reale de risc înainte de producerea oricărui eveniment nedorit.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-xs">
                <span className="text-3xl font-heading font-extrabold text-blue-600 mb-3 block">04</span>
                <h3 className="font-heading font-bold text-lg text-zinc-900 mb-2">Soluții Adaptate</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                  Fiecare structură de asigurare este personalizată după profilul tău de risc, volumul activelor și prioritățile de siguranță.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PENTRU CINE ESTE POTRIVITĂ COLABORAREA */}
        <section className="container mx-auto px-4 max-w-6xl mb-20 md:mb-28" aria-labelledby="audience-heading">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 block mb-2">
              Parteneriate de Încredere
            </span>
            <h2 id="audience-heading" className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 tracking-tight mb-4">
              Pentru cine este potrivită colaborarea
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Serviciile de consultanță sunt orientate către persoane și companii care apreciază rigoarea, confidențialitatea și soluțiile construite strategic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <Building2 className="w-8 h-8 text-blue-600" aria-hidden="true" />
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Antreprenori &amp; Administratori de IMM
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Companii care necesită asigurări de clădiri comerciale, echipamente, stocuri de marfă, răspundere profesională sau protecția managerilor (D&amp;O) și continuitatea afacerii.
              </p>
              <div className="pt-2">
                <Link href="/servicii/imm-insurance" prefetch={false} className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  Vezi soluții business <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <FileCheck2 className="w-8 h-8 text-indigo-600" aria-hidden="true" />
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Proprietari de Locuințe &amp; Familii
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Familii care vor să securizeze locuința principală, proprietățile de vacanță, planurile de economisire sau sănătatea membrilor familiei printr-un portofoliu coerent de protecție.
              </p>
              <div className="pt-2">
                <Link href="/servicii/home-insurance" prefetch={false} className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  Vezi asigurare locuință <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <ShieldCheck className="w-8 h-8 text-purple-600" aria-hidden="true" />
              <h3 className="text-xl font-heading font-bold text-zinc-900">
                Deținători de Active Speciale
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Clienți cu vehicule premium sau de colecție, proprietăți imobiliare de valoare mare ori portofolii complexe ce solicită underwriting dedicat și confidențialitate absolută.
              </p>
              <div className="pt-2">
                <Link href="/private-client" prefetch={false} className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  Explorează Private Client <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. CALL TO ACTION & CONTACT DIRECT */}
        <section className="container mx-auto px-4 max-w-4xl" aria-labelledby="cta-heading">
          <div className="p-10 md:p-14 rounded-3xl bg-zinc-900 text-white text-center relative overflow-hidden shadow-2xl border border-zinc-800">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400 block">
                Inițiază Dialogul
              </span>
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                Hai să evaluăm riscurile și să structurăm protecția potrivită
              </h2>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                Fie că dorești un audit gratuit al contractelor actuale, o a doua opinie profesională înainte de reînnoire sau o soluție dedicată pentru patrimoniul tău, sunt la dispoziția ta.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-6 shadow-md" asChild>
                  <Link href="/contact" prefetch={false}>
                    Solicită o analiză gratuită
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 font-semibold px-6" asChild>
                  <Link href="/verifica-polita" prefetch={false}>
                    Cere o a doua opinie
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-emerald-600 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 font-semibold px-6 flex items-center gap-2" asChild>
                  <Link href="https://wa.me/436509536345" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    WhatsApp Direct
                  </Link>
                </Button>
              </div>

              <p className="text-[11px] text-zinc-400 pt-2">
                Discuțiile preliminare și auditul documentelor sunt confidențiale și nu implică nicio obligație contractuală.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
