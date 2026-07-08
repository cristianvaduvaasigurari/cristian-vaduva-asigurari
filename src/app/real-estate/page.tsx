import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Building2, TrendingUp, Key, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate | Cristian Văduva",
  description: "Servicii imobiliare premium, reprezentare cumpărători/vânzători și analiză de piață.",
};

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              Real Estate
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dincolo de tranzacții. Consultanță de top pentru investiții, proprietăți de lux și optimizarea portofoliilor imobiliare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
            {[
              { icon: Key, title: "Reprezentare Cumpărător / Vânzător", desc: "Expertiză dedicată pentru a asigura cele mai bune condiții, indiferent de care parte a tranzacției te afli." },
              { icon: Building2, title: "Proprietăți de Lux", desc: "Acces la un portofoliu exclusivist de reședințe premium, de multe ori off-market." },
              { icon: TrendingUp, title: "Investiții Imobiliare", desc: "Analiză de randament (ROI), identificarea oportunităților și strategii de exit." },
              { icon: Search, title: "Analiză de Piață", desc: "Rapoarte detaliate și studii de fezabilitate pentru proiecte mari și dezvoltări." }
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[3rem]">
                <item.icon className="w-10 h-10 text-blue-500 mb-6" />
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
