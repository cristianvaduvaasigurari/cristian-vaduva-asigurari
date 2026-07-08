import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Cpu, LineChart, Zap, Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AiX OS | AI Operating System",
  description: "Sistemul de operare al viitorului pentru management imobiliar și portofolii, bazat pe Inteligență Artificială.",
};

export default function AiXOSPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              AiX OS
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Următoarea generație de tehnologie în Private Wealth și Real Estate. Un sistem de operare inteligent care procesează date de piață, automatizează investițiile și te asistă în decizii.
            </p>
            <Button size="lg" className="rounded-full bg-purple-600 text-white hover:bg-purple-700" asChild>
              <Link href="https://aixos.com" target="_blank">
                Descoperă Platforma
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
            {[
              { icon: Cpu, title: "AI Analysis", desc: "Algoritmi predictivi care scanează mii de date pentru a identifica tendințele înainte ca ele să devină publice." },
              { icon: Search, title: "Property Intelligence", desc: "Evaluări automate de proprietăți, comparabile în timp real și scoruri de risc investițional." },
              { icon: LineChart, title: "Market Insights", desc: "Rapoarte dinamice, personalizate în funcție de profilul tău de investitor." },
              { icon: Zap, title: "Automation", desc: "Automatizarea procesului de ofertare, due-diligence și monitorizarea portofoliului." }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                <item.icon className="w-10 h-10 text-purple-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
