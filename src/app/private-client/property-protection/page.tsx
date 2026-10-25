import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  AlertTriangle, 
  ArrowRight, 
  HelpCircle, 
  Flame, 
  Waves, 
  Wind, 
  Scale 
} from "lucide-react";
import { PrivateClientEnquiryForm } from "@/components/private-client/PrivateClientEnquiryForm";

export const metadata: Metadata = {
  title: "Protecție Proprietăți Premium & Reședințe de Lux | Private Client Cristian Văduva",
  description:
    "Serviciu confidențial de analiză a riscurilor pentru proprietarii de vile arhitecturale și penthouse-uri. Evaluarea riscurilor structurale, a costului de reconstrucție și a clauzelor de răspundere.",
  alternates: {
    canonical: "https://insurance.cristianvaduva.com/private-client/property-protection",
  },
  openGraph: {
    title: "Protecție Proprietăți Premium | Private Client Insurance Advisory",
    description:
      "Analiza riscurilor patrimoniale pentru vile și penthouse-uri de autor. Diferența critică dintre valoarea de piață și costul real de reconstrucție.",
    url: "https://insurance.cristianvaduva.com/private-client/property-protection",
    type: "website",
  },
};

const propertyRisks = [
  {
    title: "Incendiu Structural & Daune Termice",
    icon: <Flame className="w-5 h-5 text-red-600" />,
    image: "/images/risks/villa-fire-cinematic.jpg",
    alt: "Vilă modernă de lux afectată de incendiu violent în timpul nopții",
    description:
      "Scurtcircuite la instalațiile fotovoltaice, defecțiuni smart home sau incendii de vegetație. Temperaturile extreme distrug tâmplăria de aluminiu, vitrajele supradimensionate și structura portantă.",
    auditPoint: "Verificăm dacă evaluarea este la cost de reconstrucție nou și dacă acoperă demolarea și curățarea sitului."
  },
  {
    title: "Infiltrații & Refulări Majore de Apă",
    icon: <Waves className="w-5 h-5 text-blue-600" />,
    image: "/images/risks/flooded-luxury-living.jpg",
    alt: "Living de lux inundat cu mobilier de designer și parchet deteriorat",
    description:
      "Cedarea unui racord flexibil sau a unui modul HVAC în timpul unei deplasări. Apa distruge parchetul din lemn nobil, tencuielile de autor, instalațiile electrice îngropate și mobilierul realizat la comandă.",
    auditPoint: "Verificăm limitele dedicate avariilor accidentale ale instalațiilor de apă și răspunderea civilă față de vecini."
  },
  {
    title: "Fenomene Meteo Extreme & Acoperișuri",
    icon: <Wind className="w-5 h-5 text-amber-600" />,
    image: "/images/risks/storm-roof-destroyed.jpg",
    alt: "Acoperiș rezidențial avariat sever de vijelie și grindină",
    description:
      "Vânt violent de peste 100 km/h, grindină de mari dimensiuni și precipitații abundente. Odată compromisă membrana sau țigla acoperișului, apa penetrează toate planșeele inferioare.",
    auditPoint: "Verificăm absența franșizelor proporționale ascunse pentru fenomene atmosferice și acoperirea teraselor hidroizolate."
  },
  {
    title: "Trăsnet Direct & Supratensiuni Electronice",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    image: "/images/risks/lightning-structural-strike.jpg",
    alt: "Trăsnet și descărcare atmosferică asupra unei clădiri rezidențiale",
    description:
      "Descărcările electrice atmosferice pot provoca incendii imediate și arderea completă a panourilor de automatizare casnică, serverelor rezidențiale, pompelor de căldură și sistemelor audio de înaltă fidelitate.",
    auditPoint: "Verificăm acoperirea daunelor electrice indirecte provocate de inducție sau supratensiune tranzitorie."
  }
];

const faqs = [
  {
    q: "De ce costul de reconstrucție diferă atât de mult de valoarea de piață?",
    a: "Valoarea de piață a unei proprietăți reflectă în mare parte terenul și poziționarea geografică, elemente care nu pot fi distruse prin incendiu sau inundație. În schimb, costul de reconstrucție măsoară materialele specifice (marmură masivă, tâmplărie Schuco, vitraje termoizolante triple), proiectarea de arhitectură, autorizațiile noi și manopera specializată la prețurile curente din piața construcțiilor."
  },
  {
    q: "Cum influențează perioadele de neocupare valabilitatea acoperirii?",
    a: "Multe contracte standard conțin clauze de neocupare (unoccupancy clause) care suspendă sau limitează acoperirea pentru riscuri precum efracția, înghețul instalațiilor sau avariile de apă dacă proprietatea este nelocuită mai mult de 30 sau 60 de zile consecutive. În cadrul consultanței, analizăm regimul efectiv de utilizare pentru a structura clauze conforme cu deplasările tale."
  },
  {
    q: "Ce este regula proporțională și de ce reprezintă un pericol major?",
    a: "Dacă suma asigurată stabilită în contract este inferioară costului real de reconstrucție (de exemplu, o vilă evaluată la 1.500.000 € este asigurată pentru doar 900.000 €), asigurătorul aplică regula proporțională la orice daună. În caz de pagubă de 100.000 €, vei primi despăgubire doar în proporție de 60% (adică 60.000 €), restul fiind suportat din buzunar."
  },
  {
    q: "Sunt incluse automat anexele, garajele subterane, piscinele și grădinile?",
    a: "În polițele de masă, amenajările peisagistice, piscinele exterioare, sistemele de irigații și dependințele sunt fie complet excluse, fie plafonate la sub-limite insignifiante (de exemplu, 2.500 €). În consultanța Private Client identificăm fiecare element perimetral pentru includere explicită."
  }
];

export default function PropertyProtectionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-zinc-900 min-h-screen">
        
        {/* 1. HERO — PREZENTAREA SERVICIULUI PENTRU VILE & PENTHOUSE-URI */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono font-semibold tracking-wider uppercase mb-8 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-zinc-700" />
              PRIVATE CLIENT — PROTECȚIA PROPRIETĂȚILOR PREMIUM
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-zinc-950 tracking-tight leading-[1.12] mb-8">
              Arhitectura de autor merită <br className="hidden sm:block" />
              <span className="text-zinc-500 font-normal">
                o evaluare chirurgicală a riscurilor.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              O vilă contemporană sau un penthouse exclusivist nu pot fi tratate cu formulare tipizate. Analizăm expunerea clădirii, a finisajelor speciale, a instalațiilor complexe și a bunurilor din interior pentru a elimina riscurile de subasigurare și excluderile ascunse.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm tracking-wide shadow-lg"
                asChild
              >
                <a href="#evaluare-proprietate">
                  Solicită o Evaluare Private Client
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
                  Înapoi la Divizia Private Client
                </Link>
              </Button>
            </div>

            <div className="mt-14 pt-8 border-t border-zinc-200 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 uppercase tracking-widest font-mono">
              <span>Cost Reconstrucție Nou</span>
              <span>•</span>
              <span>Fără Regulă Proporțională</span>
              <span>•</span>
              <span>Finisaje de Autor</span>
              <span>•</span>
              <span>Confidențialitate Totală</span>
            </div>
          </div>
        </section>

        {/* 2. COMPARAȚIE VITALĂ: VALOARE DE PIAȚĂ VS. COST DE RECONSTRUIRE */}
        <section className="py-20 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 md:p-12 shadow-xs">
              <div className="max-w-3xl mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                  DISTINCȚIE FUNDAMENTALĂ
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                  De ce valoarea de tranzacție a proprietății te poate induce în eroare
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Cea mai frecventă greșeală în asigurarea proprietăților premium este preluarea automată a valorii din contractul de vânzare-cumpărare sau a prețului pe metru pătrat din zona rezidențială.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-base">
                    <Scale className="w-5 h-5 text-zinc-600" />
                    Valoarea de Piață (Comercială)
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 space-y-2 leading-relaxed">
                    <li>• Include valoarea terenului, care reprezintă frecvent 30–60% din prețul total și nu arde niciodată.</li>
                    <li>• Depinde de cererea și oferta imobiliară la un moment dat și de prestigiu cartierului.</li>
                    <li>• Dacă asiguri proprietatea la această sumă globală fără defalcare, plătești primă inutilă pe teren, dar rămâi expus la finisajele interioare.</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    Costul Real de Reconstrucție
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-300 space-y-2 leading-relaxed">
                    <li>• Măsoară costul demolării structurii arse sau compromise și al evacuării molozului.</li>
                    <li>• Reflectă prețurile actualizate pentru materiale importate, piatră naturală și manoperă calificată.</li>
                    <li>• Include proiectarea de arhitectură, avizele noi și cheltuielile de relocare a familiei pe durata șantierului (12–24 luni).</li>
                  </ul>
                </div>
              </div>

              <p className="mt-8 text-xs text-zinc-500 text-center leading-relaxed">
                * Notă metodologică: Necesarul de protecție depinde de particularitățile imobilului, evaluarea tehnică efectuată, condițiile specifice ale poliței și produsele disponibile la momentul subscrierii.
              </p>
            </div>
          </div>
        </section>

        {/* 3. RISCURI CRITICE PENTRU CLĂDIRE, INSTALAȚII & BUNURI */}
        <section className="py-24 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="max-w-2xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                ANATOMIA DAUNELOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Patru categorii de riscuri care amenință reședințele de autor
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                În proprietățile exclusiviste, o defecțiune minoră la o instalație poate declanșa daune în lanț cu costuri de remediere de ordinul sutelor de mii de euro.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {propertyRisks.map((risk, idx) => (
                <article 
                  key={idx}
                  className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
                    <Image
                      src={risk.image}
                      alt={risk.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-xs text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-2">
                      {risk.icon}
                      <span>Risc Analizat</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-zinc-950 mb-3">
                        {risk.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                        {risk.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700">
                      <strong className="block text-zinc-900 mb-1">Ce audităm în contract:</strong>
                      {risk.auditPoint}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROCESUL DE CONSULTANȚĂ PRIVATE CLIENT */}
        <section className="py-24 border-b border-zinc-200/80 bg-zinc-50/70">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-3">
                METODOLOGIE RIGUROASĂ
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-zinc-950 tracking-tight mb-4">
                Cum decurge analiza proprietății tale
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Consultanța se desfășoară discret, pe baza documentelor tehnice și a particularităților imobilului, fără promisiuni garantate fără fundament.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                <div className="text-2xl font-mono font-bold text-zinc-300 mb-3">01</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Discuție Confidențială</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Clarificăm regimul de ocupare, destinația (locuință principală, de vacanță sau închiriere) și obiectivele de protecție.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                <div className="text-2xl font-mono font-bold text-zinc-300 mb-3">02</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Inventarul Riscurilor</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Identificăm finisajele speciale, suprafețele vitrate, instalațiile smart home, piscina și operele de artă sau colecțiile asociate.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                <div className="text-2xl font-mono font-bold text-zinc-300 mb-3">03</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Audit de Clauze</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Examinăm polițele existente: sub-limite de conținut, excluderi de neocupare, franșize ascunse și regula proporțională.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                <div className="text-2xl font-mono font-bold text-zinc-300 mb-3">04</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Propuneri Personalizate</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Structurăm soluții All-Risks la Valoare Agreată prin asigurători specializați, în funcție de eligibilitate și condiții contractuale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ÎNTREBĂRI FRECVENTE */}
        <section className="py-20 border-b border-zinc-200/80 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-2">
                CLARITATE &amp; TRANSPARENȚĂ
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 tracking-tight">
                Întrebări frecvente despre asigurarea proprietăților premium
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                  <h3 className="text-base font-bold text-zinc-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FORMULAR REAL & FUNCȚIONAL DE EVALUARE */}
        <section id="evaluare-proprietate" className="py-24 bg-zinc-950 text-white relative">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-2">
                INITIAZĂ AUDITUL
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-4">
                Solicită o evaluare Private Client
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Completează datele de contact și detalii sumare despre proprietate. Cristian Văduva va analiza cerințele și va reveni pentru o discuție confidențială.
              </p>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-800">
              <PrivateClientEnquiryForm 
                defaultAssetCategory="Luxury Residence" 
                sourceContext="Property Protection Page" 
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
