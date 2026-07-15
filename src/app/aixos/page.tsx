import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { MonitorSmartphone, Cpu, Globe, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiX OS | Cristian Văduva",
  description: "Sistemul integrat de inteligență artificială și ecosistemul digital AiX OS.",
};

export default function AiXOSPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-1.5 rounded-full glass text-blue-600 font-medium mb-8 uppercase tracking-widest text-sm border border-blue-500/20 bg-blue-500/10">
              Artificial Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              AiX <span className="text-blue-600">OS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Viitorul productivității și al asistenței digitale este aici. Un ecosistem inteligent care îți optimizează timpul, îți preia sarcinile repetitive și te conectează la servicii avansate, de la Real Estate la asigurări.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 max-w-7xl mx-auto">
            {[
              { icon: Cpu, title: "Procesare Inteligentă", desc: "Sistem de calcul avansat pentru predicții și analize de piață." },
              { icon: MonitorSmartphone, title: "Cross-Platform", desc: "Accesibil de pe orice dispozitiv, complet sincronizat." },
              { icon: Zap, title: "Automatizări", desc: "Elimină birocrația și fluxurile de lucru ineficiente." },
              { icon: Globe, title: "Ecosistem Global", desc: "Integrat direct cu platformele AiXbeneficiu și Home Find." }
            ].map((feature, i) => (
              <div key={i} className="glass beneficiu-card p-8 rounded-[2.5rem] border border-border text-center group hover:border-blue-500/30 transition-colors">
                <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center mb-24 p-12 glass rounded-[3rem] border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <h2 className="text-3xl font-heading font-bold mb-6 relative z-10 text-foreground">Inovația se află în ADN-ul nostru</h2>
            <p className="text-lg text-muted-foreground relative z-10 mb-8">
              Dezvoltăm constant capabilitățile AiX OS pentru a rămâne în avangarda tehnologică. Fie că ești un investitor, un antreprenor sau pur și simplu vrei să-ți eficientizezi viața digitală, AiX OS este coloana vertebrală a succesului tău.
            </p>
          </div>
        </div>
        <ContactForm customTitle="Vrei să afli mai multe despre AiX OS?" />
      </main>
      
      <Footer />
    </div>
  );
}
