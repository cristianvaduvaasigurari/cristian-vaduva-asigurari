// Server Component
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight, ShieldCheck, Award, Building } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[118px] md:pt-[128px] pb-20 bg-white" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center md:mt-3 md:mb-5 mb-8 max-w-full">

            <div 
              className="flex items-center gap-2 overflow-x-auto scroll-smooth max-w-full px-3 py-2 rounded-full glass no-scrollbar shadow-sm"
            >
              <a
                href="https://cristianvaduva.com"
                title="Cristian Văduva"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Cristian Văduva
              </a>
              <a
                href="https://homefind.cristianvaduva.com"
                title="Home Find"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Home Find
              </a>
              <a
                href="https://insurance.cristianvaduva.com"
                title="Insurance"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Insurance
              </a>
              <a
                href="https://os.cristianvaduva.com"
                title="AiX OS"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                AiX OS
              </a>
              <a
                href="https://aixluxury.com"
                title="AiXLuxury"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                AiXLuxury
              </a>
              <a
                href="https://cristianvaduva.com/market-pulse"
                title="Market Pulse"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Market Pulse
              </a>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            Înțelege ce ai de pierdut înainte să afli cât te costă
          </div>

          <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-8 leading-[1.12] text-zinc-950">
            Ce ai construit în ani de zile se poate pierde într-un{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
              singur eveniment.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-3xl mx-auto font-normal leading-relaxed">
            O vilă, o colecție de ceasuri, o mașină de valoare sau o companie pot ascunde riscuri pe care nu le observi până când apare o daună. Analizăm ce deții, ce te-ar putea afecta și unde merită verificată protecția existentă.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <CTAButton size="lg" conversionEvent="hero_primary_consultation" className="w-full sm:w-auto text-base sm:text-lg px-8 group bg-zinc-900 text-white hover:bg-black font-semibold shadow-lg" asChild>
              <Link href="/contact">
                Solicită o analiză confidențială
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </CTAButton>
            <CTAButton size="lg" variant="glass" conversionEvent="hero_secondary_gap_check" className="w-full sm:w-auto text-base sm:text-lg px-8 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 font-semibold shadow-sm" asChild>
              <Link href="/verifica-polita">Nu știu dacă sunt protejat</Link>
            </CTAButton>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-zinc-200/80 max-w-4xl mx-auto text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50/80 border border-zinc-100">
              <ShieldCheck className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-zinc-900">Audit Fără Presupuneri</p>
                <p className="text-xs text-zinc-600">Verificăm excluderi, franșize ascunse și limite reale din contractele tale.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50/80 border border-zinc-100">
              <Award className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-zinc-900">Consultanță Specializată</p>
                <p className="text-xs text-zinc-600">Partener Generali România și expertiză în patrimonii private și corporate.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50/80 border border-zinc-100">
              <Building className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-zinc-900">Evaluare Imobiliară &amp; Bunuri</p>
                <p className="text-xs text-zinc-600">Diferența dintre costul de reconstrucție și valoarea de piață.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
