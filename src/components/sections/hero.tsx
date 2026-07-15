"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 bg-background">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide uppercase">Cristian Văduva <span className="text-blue-500 mx-1">|</span> Real Estate <span className="text-blue-500 mx-1">|</span> Insurance <span className="text-blue-500 mx-1">|</span> Investments</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-8 leading-tight">
            Obține protecție completă pentru casa și investițiile tale, fără birocrație și cu asistență rapidă.

Platforma îți pune la dispoziție asigurări personalizate și acces la proprietăți verificate, pentru a-ți proteja bugetul și a-ți economisi timp.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            O platformă completă dedicată viitorului tău financiar. De la protecția afacerii tale (Generali), până la oportunități unice de investiții imobiliare prin AiX OS.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 group bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-lg" asChild>
              <Link href="/#servicii">
                Descoperă Serviciile
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="w-full sm:w-auto text-lg px-8 border-border bg-white text-foreground hover:bg-muted" asChild>
              <Link href="/contact">Contactează-mă</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </motion.div>
    </section>
  );
}
