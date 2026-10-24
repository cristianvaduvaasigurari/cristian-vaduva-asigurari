import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, Layers, ClipboardCheck, ArrowUpRight } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  action: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Inventariem bunurile și expunerile relevante",
    description: "Mapăm clar ce deții: reședințe, colecții de ceasuri și bijuterii, automobile de lux, afaceri active, operațiuni sau proprietăți în străinătate. Fără un inventar precis, riscul rămâne invizibil.",
    action: "Stabilim harta completă a patrimoniului tău"
  },
  {
    number: "02",
    title: "Analizăm polițele și documentele disponibile",
    description: "Trecem în revistă contractele actuale, anexele, condițiile generale și speciale. Verificăm formulările exacte, sumele asigurate, definițiile din textul poliței și nivelul franșizelor aplicate.",
    action: "Examinăm clauzele dincolo de pagina de sumar"
  },
  {
    number: "03",
    title: "Identificăm lacunele, limitele și excluderile",
    description: "Punctăm transparent zonele vulnerabile: subasigurare la costul de reconstrucție, plafoane pentru bunuri de valoare, excluderi de forță majoră, riscuri cyber neacoperite sau limite insuficiente de răspundere.",
    action: "Descoperim ce nu acoperă polițele tale actuale"
  },
  {
    number: "04",
    title: "Prezentăm constatările și opțiunile disponibile",
    description: "Primești un rezumat clar, structurat și confidențial. Știi exact unde ești protejat, unde există expuneri reale și ce soluții tehnice există pe piață pentru transferul sau mitigarea riscului.",
    action: "Decizii informate, fără presiune de cumpărare"
  }
];

export function RiskAnalysisProcess() {
  return (
    <section className="py-24 bg-zinc-50/70 border-b border-zinc-200/80" aria-labelledby="analysis-process-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider uppercase border border-emerald-200/80 mb-4">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
            Metodologie de Consultanță
          </div>
          <h2 id="analysis-process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-zinc-950 tracking-tight leading-tight mb-6">
            Analiză personalizată în patru pași
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Nu vindem polițe pe bandă rulantă și nu oferim diagnostice automate. Serviciul nostru este o analiză confidențială și minuțioasă, structurată pe baza documentelor tale reale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="text-4xl font-mono font-bold text-zinc-200 group-hover:text-zinc-900 transition-colors mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900 leading-snug mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <span className="text-[11px] font-semibold text-zinc-800 uppercase tracking-wider block">
                  {step.action}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200/90 text-xs text-zinc-500 leading-relaxed">
          <p>
            <strong className="text-zinc-700">Notă privind analiza:</strong> Constatările depind în totalitate de documentele, polițele și informațiile furnizate de client, precum și de condițiile contractuale aplicabile ale produselor disponibile pe piață. Nu toate riscurile pot fi transferate integral unui asigurător, iar anumite evenimente pot necesita măsuri interne de securitate și prevenție.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold text-sm shadow-md transition-all text-center inline-flex items-center justify-center gap-2"
          >
            <span>Solicită o analiză pentru proprietățile și bunurile mele</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/despre-mine"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 font-semibold text-sm shadow-xs transition-all text-center"
          >
            Cum lucrează Cristian Văduva
          </Link>
        </div>
      </div>
    </section>
  );
}
