import Link from "next/link";
import { HelpCircle, ArrowRight, ShieldQuestion, CheckCircle2, ChevronRight } from "lucide-react";

interface GapQuestion {
  id: string;
  question: string;
  context: string;
  whyItMatters: string;
}

const gapQuestions: GapQuestion[] = [
  {
    id: "reconstructie",
    question: "Suma asigurată ar acoperi costul realist al reconstrucției?",
    context: "Costul de reconstrucție nu este identic cu valoarea de piață a proprietății. Prețul materialelor, proiectarea și forța de muncă au crescut semnificativ.",
    whyItMatters: "Dacă suma declarată în poliță este subdimensionată, asigurătorul poate aplica regula proporțională, reducând despăgubirea chiar și pentru o daună parțială."
  },
  {
    id: "bunuri-valoare",
    question: "Ai declarat corect bunurile valoroase (ceasuri, bijuterii, artă)?",
    context: "Majoritatea polițelor de locuință includ plafoane restrictive (de exemplu 1.000–2.500 EUR per obiect) pentru bunurile nespecificate nominal.",
    whyItMatters: "Fără o evaluare agreată și o declarare explicită în contract, o colecție valoroasă poate fi despăgubită doar la o fracțiune infimă din valoarea ei reală."
  },
  {
    id: "excluderi-fransize",
    question: "Știi ce excluderi și ce nivel de franșiză conține polița ta?",
    context: "Fiecare contract conține o secțiune de evenimente neacoperite și franșize (suma suportată direct de tine la fiecare eveniment).",
    whyItMatters: "Descoperirea unei franșize de 10% sau a unei excluderi de infiltrație în momentul producerii daunei schimbă complet ecuația financiară."
  },
  {
    id: "in-afara-locuintei",
    question: "Sunt bunurile acoperite în afara locuinței sau în timpul transportului?",
    context: "Ceasurile de lux, gențile de patrimoniu, bijuteriile și laptopurile călătoresc zilnic cu tine în oraș sau peste hotare.",
    whyItMatters: "Polițele uzuale protejează bunurile doar între pereții adresei asigurate, lăsând nesoluționate furtul din mașină, hotel sau aeroport."
  },
  {
    id: "cyber-companie",
    question: "Știi ce se întâmplă dacă firma ta suferă un incident cibernetic?",
    context: "Un transfer autorizat eronat în urma unui email fals (phishing) sau blocarea serverelor operaționale opresc activitatea comercială.",
    whyItMatters: "Polițele tradiționale de patrimoniu sau răspundere nu acoperă daunele cibernetice fără o clauză sau o poliță dedicată de risc cyber."
  },
  {
    id: "international-proprietati",
    question: "Se aplică protecția în țările în care ai proprietăți sau călătorești frecvent?",
    context: "Deținerea de vile în Grecia, apartamente în Spania sau mașini utilizate transfrontalier implică cerințe de jurisdicție distincte.",
    whyItMatters: "O poliță emisă într-un singur stat poate fi complet inaplicabilă sau restrictivă din punct de vedere legal în altă jurisdicție."
  },
  {
    id: "limite-raspundere",
    question: "Ai verificat dacă limitele de răspundere sunt suficiente pentru expunerea ta?",
    context: "Daunele provocate involuntar terților (inundații de proporții, accidente sau decizii profesionale de conducere) pot genera pretenții uriașe.",
    whyItMatters: "O limită de 10.000 sau 50.000 EUR se poate epuiza rapid doar din onorariile de avocați și expertize tehnice."
  }
];

export function ProtectionGaps() {
  return (
    <section className="py-24 bg-white border-b border-zinc-200/80" aria-labelledby="gaps-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wider uppercase border border-blue-200/80 mb-4">
            <ShieldQuestion className="w-3.5 h-3.5 text-blue-600" />
            Autodiagnostic Preventiv
          </div>
          <h2 id="gaps-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-zinc-950 tracking-tight leading-tight mb-6">
            Ai putea avea o lacună de protecție?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Aceste întrebări nu reprezintă un diagnostic definitiv. Scopul lor este să te ajute să identifici punctele oarbe pe care merită să le verifici înainte ca un incident neprevăzut să scoată la iveală lipsurile din contracte.
          </p>
        </div>

        <div className="space-y-4">
          {gapQuestions.map((item, index) => (
            <div 
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-zinc-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed pl-10">
                    {item.context}
                  </p>

                  <div className="pl-10 pt-1">
                    <p className="text-xs text-amber-900 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-lg leading-relaxed">
                      <strong>De ce contează:</strong> {item.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="lg:pl-6 shrink-0 flex items-center">
                  <Link
                    href="/verifica-polita"
                    className="inline-flex items-center text-xs font-semibold px-4 py-2.5 rounded-full border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 transition-colors shadow-xs"
                  >
                    <span>Vreau să verific</span>
                    <ChevronRight className="w-4 h-4 ml-1 text-zinc-500" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500 max-w-2xl mx-auto mb-6">
            Constatarea exactă a acoperirilor depinde exclusiv de textul contractelor în vigoare, condițiile generale și speciale emise de asigurător și documentele de evaluare furnizate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Discută confidențial despre riscurile mele</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/verifica-polita"
              className="px-8 py-3.5 rounded-full border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 font-semibold text-sm shadow-xs transition-all"
            >
              Nu știu dacă sunt protejat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
