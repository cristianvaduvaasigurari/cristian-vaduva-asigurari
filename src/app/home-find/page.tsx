import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Home, Search, Target, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Find | Cristian Văduva",
  description: "Platforma inteligentă pentru căutarea și gestionarea proprietăților imobiliare.",
};

export default function HomeFindPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-1.5 rounded-full glass text-emerald-600 font-medium mb-8 uppercase tracking-widest text-sm border border-emerald-500/20 bg-emerald-500/10">
              Smart Real Estate Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              Home <span className="text-emerald-500">Find</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Soluția digitală completă pentru găsirea proprietății perfecte. Combinăm inteligența artificială AiX OS cu expertiza umană premium pentru a-ți livra exact locuința sau investiția pe care o cauți, fără zgomot de fond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            <div className="glass premium-card p-10 rounded-[3rem] border border-border">
              <Search className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading text-foreground">Matching Inteligent</h3>
              <p className="text-muted-foreground">
                Nu îți irosim timpul cu oferte irelevante. Platforma noastră utilizează algoritmi avansați pentru a-ți potrivi dorințele stricte (locație, buget, randament) cu proprietățile reale din piață.
              </p>
            </div>
            <div className="glass premium-card p-10 rounded-[3rem] border border-border">
              <ShieldCheck className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading text-foreground">Verificare Juridică</h3>
              <p className="text-muted-foreground">
                Orice proprietate listată sau propusă prin Home Find trece printr-un proces riguros de verificare documentară, pentru ca tu să tranzacționezi în siguranță absolută.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-24 p-12 glass rounded-[3rem] border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-cyan-500/5 pointer-events-none" />
            <Home className="w-16 h-16 text-emerald-500 mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl font-heading font-bold mb-6 relative z-10 text-foreground">De la căutare la semnare</h2>
            <p className="text-lg text-muted-foreground relative z-10">
              Home Find este mai mult decât un motor de căutare. Este asistentul tău imobiliar dedicat. Împreună cu rețeaua AiXLuxury, transformăm un proces obositor într-o experiență premium.
            </p>
          </div>
        </div>
        <ContactForm customTitle="Spune-ne ce proprietate cauți" />
      </main>
      
      <Footer />
    </div>
  );
}
