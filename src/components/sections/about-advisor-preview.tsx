import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Globe2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutAdvisorPreview() {
  return (
    <section className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-200/80" aria-labelledby="advisor-preview-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-100">
                <Image
                  src="/images/cristian-vaduva/cristian-vaduva-portrait-1.jpg"
                  alt="Cristian Văduva - Consultant Asigurări & Analiză Financiară"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 460px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-zinc-300 font-semibold block mb-1">
                    Consultanță Strategică
                  </span>
                  <h3 className="text-xl font-bold font-heading">
                    Cristian Văduva
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Evaluarea riscurilor &amp; protecția patrimoniului
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wider uppercase border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Omul din spatele consultanței
            </div>

            <h2 id="advisor-preview-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-zinc-900 leading-tight">
              O abordare personală, fundamentată pe rigoare și analiză financiară
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-light">
              Protecția patrimoniului nu este o simplă tranzacție comercială. În calitate de consultant, analizez expunerea reală la risc a familiei sau a companiei dumneavoastră, eliminând clauzele ambigue și franșizele ascunse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  <span>Pregătire Academică</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  3 diplome în Economie, Ecologie și Drept; 3 masterate în Management Financiar, Mediu și Securitatea Informației.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                  <Globe2 className="w-4 h-4" aria-hidden="true" />
                  <span>Studiu Internațional</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Studii universitare în Madrid (1 an) și Amiens (6 luni), completate de un stagiu practic de mediu în Malta.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Audit independent al polițelor curente pentru identificarea lacunelor de acoperire.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Legătură integrată între asigurări, investiții imobiliare și protecția activelor premium.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Button size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-black font-semibold shadow-md" asChild>
                <Link href="/despre-mine">
                  Despre mine &amp; parcursul complet
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-zinc-300 text-zinc-800 hover:bg-zinc-100" asChild>
                <Link href="/contact">
                  Solicită o discuție
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
