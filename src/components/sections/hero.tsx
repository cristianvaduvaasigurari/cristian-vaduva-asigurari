"use client";

import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowRight, ShieldCheck, Award, Building } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-labelledby="hero-heading">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 bg-background" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8 max-w-full">
            <div 
              className="flex items-center gap-2 overflow-x-auto scroll-smooth max-w-full px-3 py-2 rounded-full glass no-scrollbar shadow-sm"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              <a
                href="https://cristianvaduva.com"
                aria-label="Vizitează site-ul oficial Cristian Văduva"
                title="Cristian Văduva"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Cristian Văduva
              </a>
              <a
                href="https://homefind.cristianvaduva.com"
                aria-label="Accesează platforma Home Find imobiliară"
                title="Home Find"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Home Find
              </a>
              <a
                href="https://insurance.cristianvaduva.com"
                aria-label="Accesează secțiunea de asigurări premium"
                title="Insurance"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Insurance
              </a>
              <a
                href="https://os.cristianvaduva.com"
                aria-label="Deschide sistemul de operare AiX OS"
                title="AiX OS"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                AiX OS
              </a>
              <a
                href="https://aixluxury.com"
                aria-label="Vizitează AiXLuxury - imobiliare și bunuri de lux"
                title="AiXLuxury"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                AiXLuxury
              </a>
              <a
                href="https://cristianvaduva.com/market-pulse"
                aria-label="Vezi analizele financiare Market Pulse"
                title="Market Pulse"
                className="px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-muted-foreground bg-white/40 hover:bg-white/80 hover:text-foreground border border-border/40 hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Market Pulse
              </a>
            </div>
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8 leading-tight">
            Excelență în <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Asigurări</span> și <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Real Estate</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Protejează-ți patrimoniul, optimizează-ți riscurile financiare și accesează investiții imobiliare de lux. Soluții personalizate și parteneriate de încredere prin Generali și ecosistemul premium AiX.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <CTAButton size="lg" conversionEvent="hero_primary_consultation" className="w-full sm:w-auto text-lg px-8 group bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-lg" asChild>
              <Link href="/contact">
                Solicită Consultanță Gratuită
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </CTAButton>
            <CTAButton size="lg" variant="glass" conversionEvent="hero_secondary_services" className="w-full sm:w-auto text-lg px-8 border-border bg-white text-foreground hover:bg-muted font-medium" asChild>
              <Link href="/#servicii">Descoperă Serviciile</Link>
            </CTAButton>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/40 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">Partener Generali</h4>
                <p className="text-xs text-muted-foreground">Polițe de asigurare de top emise direct și securizat.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">10+ Ani Experiență</h4>
                <p className="text-xs text-muted-foreground">Consultanță financiară premium bazată pe rezultate dovedite.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-foreground">Real Estate Premium</h4>
                <p className="text-xs text-muted-foreground">Acces exclusiv la portofolii off-market prin AiX OS.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
