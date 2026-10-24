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
  CheckCircle2, 
  PhoneCall, 
  Globe2,
  AlertTriangle,
  FileCheck2,
  Sparkles,
  Server
} from "lucide-react";
import { privateClientCategories, privateClientProcess } from "@/data/privateClientData";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Private Client — Analiză de Risc pentru Bunuri Excepționale | Cristian Văduva",
  description:
    "Consultanță confidențială în evaluarea riscurilor și optimizarea polițelor pentru proprietăți de lux, supercars, ceasuri de colecție, artă și companii cu expunere internațională.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client",
  },
  openGraph: {
    title: "Private Client — Protecția Patrimoniului de Mare Valoare | Cristian Văduva",
    description:
      "Analiză strategică a riscurilor, identificarea lacunelor din contractele existente și structurarea protecției financiare pentru active excepționale.",
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
        
        {/* 1. HERO EDITORIAL — CONSECVINȚE REALE ȘI RISCURI PATRIMONIALE */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02),transparent_60%)] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              DIVIZIA PRIVATE CLIENT &amp; PATRIMONIU
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Înțelege ce ai de pierdut <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                înainte să afli cât te costă o daună.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              O vilă de autor, o colecție de ceasuri, un automobil de performanță sau activele internaționale ale familiei nu pot fi protejate eficient prin polițe standardizate din catalog. Analizăm expunerea reală, identificăm clauzele restrictive și verificăm dacă ești cu adevărat protejat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#confidential-enquiry">
                  Solicită o Analiză Confidențială
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 text-sm font-semibold shadow-xs"
                asChild
              >
                <a href="#teme-editoriale">
                  Descoperă Teme Editoriale
                </a>
              </Button>
            </div>

            <div className="mt-14 pt-8 border-t border-zinc-200 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 uppercase tracking-widest font-mono">
              <span>Valoare Agreată</span>
              <span>•</span>
              <span>Audit de Clauze</span>
              <span>•</span>
              <span>Confidențialitate Totală</span>
              <span>•</span>
              <span>Acoperire Worldwide</span>
            </div>
          </div>
        </section>

        {/* 2. CELE 6 SUBIECTE EDITORIALE CHEIE PENTRU PATRIMONII DE MARE VALOARE */}
        <section id="teme-editoriale" className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                ANALIZE CRITICE DE RISC
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
                Șase întrebări pe care proprietarii de bunuri de valoare le amână până la prima daună
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Polițele de masă folosesc algoritmi generici și coeficienți de depreciere automată. În fața unei daune majore, aceste contracte lasă lacune financiare de proporții.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tema 1: Proprietăți Premium */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Building2 className="w-4 h-4 text-zinc-700" />
                    Proprietăți Premium &amp; Reședințe
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    Cât ar costa să reconstruiești vila, nu cât ai putea să o vinzi?
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Diferența critică:</strong> Valoarea de piață a unei proprietăți include terenul și poziționarea geografică, factori care nu ard și nu se degradează. În schimb, costul de reconstrucție reflectă materialele speciale (marmură, tâmplărie custom, vitraje panoramice, finisaje de autor), proiectarea tehnică și forța de muncă la prețurile actuale.
                    </p>
                    <p>
                      <strong>Riscul subasigurării:</strong> Dacă suma asigurată este plafonată la un cost istoric de achiziție, asigurătorul are dreptul legal de a aplica regula proporțională — despăgubind doar o fracțiune din valoarea reală a daunelor, chiar și în cazul unei pierderi parțiale.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Excluderile de demolare, cheltuielile de arhitectură, cazarea temporară și absența clauzei de proporționalitate.
                </div>
              </div>

              {/* Tema 2: Automobile de Lux & Colecție */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Car className="w-4 h-4 text-zinc-700" />
                    Automobile de Lux &amp; Colecție
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    Ce se întâmplă dacă automobilul nu mai poate fi reparat?
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Metoda de evaluare contează:</strong> În caz de daună totală sau furt, asigurătorii standard aplică grile generice de depreciere (Eurotax / DAT), ignorând pachetele opționale rare, starea impecabilă de conservare sau statutul de vehicul istoric/colecție.
                    </p>
                    <p>
                      <strong>Consecința directă:</strong> Poți pierde între 30% și 50% din capitalul real investit dacă vehiculul nu a fost asigurat pe baza unei <em>Valori Agreate</em> upfront, stabilite prin expertiză tehnică neutră și documentată.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Valoarea agreată, reparațiile exclusiv în ateliere oficiale cu piese de origine, franșizele și extinderea teritorială.
                </div>
              </div>

              {/* Tema 3: Ceasuri, Bijuterii & Colecții */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Watch className="w-4 h-4 text-zinc-700" />
                    Ceasuri, Bijuterii &amp; Colecții
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    Un obiect poate valora mult mai mult decât limita prevăzută în poliță.
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Plafoanele ascunse:</strong> Polițele standard de locuință menționează adesea o sumă generală pentru „conținut”, dar anexa ascunsă limitează bijuteriile și ceasurile la 1.000–2.500 EUR per piesă dacă nu au fost declarate individual pe o listă agreată.
                    </p>
                    <p>
                      <strong>Furtul în deplasare:</strong> Multe contracte cer obligativitatea păstrării obiectelor exclusiv într-un seif omologat ancorat în podea, refuzând despăgubirea dacă piesa a fost sustrasă din camera de hotel sau din bagaj în timpul unei deplasări.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Declararea nominală item-by-item, acoperirea all-risks la nivel mondial și condițiile de securitate fizică.
                </div>
              </div>

              {/* Tema 4: Cyber & Securitate Digitală */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Server className="w-4 h-4 text-zinc-700" />
                    Cyber &amp; Identitate Digitală
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    O fraudă online poate costa mult mai mult decât suma transferată.
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Efectele în lanț ale unui atac:</strong> Pierderea directă a fondurilor transferate printr-o schemă de inginerie socială (Business Email Compromise) reprezintă doar începutul. Urmează costurile de investigație forensică IT, restaurarea sistemelor, blocarea activității și potențiale litigii sau sancțiuni GDPR.
                    </p>
                    <p>
                      <strong>Realitatea asigurabilității:</strong> Nu orice fraudă este automat acoperită. Fără măsuri dovedite de autentificare în doi pași și protocoale clare de verificare a plăților, dosarele de daună sunt respinse conform condițiilor contractuale.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Clauzele de inginerie socială, echipele de intervenție de urgență IT și condițiile de securitate impuse asiguratului.
                </div>
              </div>

              {/* Tema 5: Proprietăți Internaționale */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Globe2 className="w-4 h-4 text-zinc-700" />
                    Patrimoniu Transfrontalier
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    Ai proprietăți în mai multe țări. Polițele tale țin pasul cu ele?
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Conflicte de jurisdicție:</strong> Deținerea unei reședințe de vacanță în sudul Europei, a unui apartament la munte în Austria sau a unei ambarcațiuni înmatriculate extern necesită coordonare atentă. O poliță românească nu acoperă automat cerințele legale locale din alte state.
                    </p>
                    <p>
                      <strong>Perioadele de neocupare:</strong> Majoritatea asigurătorilor exclud daunele provocate de îngheț sau efracție dacă o proprietate secundară rămâne nelocuită mai mult de 30 sau 60 de zile consecutive fără inspecții periodice documentate.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Limitele teritoriale, clauzele de neocupare temporară și coordonarea cu subscriitorii locali specializați.
                </div>
              </div>

              {/* Tema 6: Companii & Continuitate */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold mb-4">
                    <Scale className="w-4 h-4 text-zinc-700" />
                    Companii &amp; Răspundere Profesională
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3">
                    Ce se întâmplă dacă un incident îți oprește activitatea?
                  </h3>
                  <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      <strong>Pierderea de profit și cheltuielile fixe:</strong> O avarie într-o hală sau un incendiu de depozit distruge stocuri, dar cel mai mare pericol este oprirea livrărilor. Fără acoperirea <em>Business Interruption</em>, salariile, ratele și chiriile continuă să curgă chiar dacă încasările au scăzut la zero.
                    </p>
                    <p>
                      <strong>Răspunderea administratorilor (D&amp;O):</strong> Deciziile strategice pot fi atacate în instanță de asociați, creditori sau autorități, punând în pericol patrimoniul personal al conducerii dacă nu există o poliță adecvată de răspundere managerială.
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-800">Ce verificăm:</span> Perioada de indemnizare la întreruperea activității, limitele D&amp;O și acoperirea cheltuielilor de apărare în instanță.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DIVIZIILE SPECIALIZATE PRIVATE CLIENT (8 CATEGORII) */}
        <section id="divisions" className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                DIVIZII SPECIALIZATE
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Structuri dedicate pentru active de mare valoare
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Fiecare clasă de active este analizată după caracteristicile sale particulare de evaluare, riscuri fizice și regim de utilizare.
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
                        {cat.badgeRo || cat.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-zinc-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {cat.titleRo || cat.title}
                    </h3>

                    <p className="text-zinc-600 text-sm leading-relaxed mb-6">
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
                      <span>EXPLOREAZĂ DIVIZIA</span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. METODOLOGIA DE CONSULTANȚĂ ÎN PATRU PAȘI */}
        <section className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                PROCES METODIC
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Secvența de Consultanță Confidențială
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Relația cu fiecare client este structurată ca o analiză metodică: Inventariem, Analizăm, Identificăm și Prezentăm opțiunile disponibile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {privateClientProcess.map((step) => (
                <div 
                  key={step.step} 
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-xs relative"
                >
                  <div className="text-3xl font-mono font-bold text-zinc-300 mb-4">{step.step}</div>
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-2">
                    {step.nameRo || step.name}
                  </span>
                  <h3 className="text-base font-heading font-bold text-zinc-900 mb-2">
                    {step.titleRo || step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.descRo || step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FORMULAR CONFIDENȚIAL PENTRU PRIVATE CLIENT */}
        <section id="confidential-enquiry" className="py-24 bg-white border-b border-zinc-200/80 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-2">
                SOLICITARE CONFIDENȚIALĂ
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Solicită o Analiză Private Client
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
