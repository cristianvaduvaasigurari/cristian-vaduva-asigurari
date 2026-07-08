import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Gem, MapPin, Building2, Key } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AiXLuxury | Cristian Văduva",
  description: "Agenție imobiliară premium și servicii concierge. Proprietăți exclusiviste off-market.",
};

export default function AiXLuxuryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <div className="inline-flex px-4 py-1.5 rounded-full glass text-amber-600 font-medium mb-8 uppercase tracking-widest text-sm border border-amber-500/20 bg-amber-500/10">
              Luxury Real Estate
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              AiX<span className="text-amber-500">Luxury</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              O abordare ultra-premium a pieței imobiliare internaționale și de lux. Oferim clienților discreți acces exclusiv la proprietăți off-market și oportunități de investiție unice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
            <div className="glass premium-card p-10 rounded-[3rem] border border-border text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading text-foreground">Portofoliu Premium</h3>
              <p className="text-muted-foreground">Vile pe malul lacului, penthouse-uri exclusiviste și clădiri istorice, atent selecționate.</p>
            </div>
            <div className="glass premium-card p-10 rounded-[3rem] border border-border text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <Key className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading text-foreground">Discreție Totală</h3>
              <p className="text-muted-foreground">Gestionăm tranzacții off-market pentru clienți și fonduri care preferă anonimatul garantat.</p>
            </div>
            <div className="glass premium-card p-10 rounded-[3rem] border border-border text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading text-foreground">Acoperire Globală</h3>
              <p className="text-muted-foreground">Acces la o rețea extinsă de proprietăți în capitalele financiare ale lumii și destinații premium.</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-24 p-12 glass rounded-[3rem] border border-amber-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none" />
            <Gem className="w-16 h-16 text-amber-500 mx-auto mb-6 relative z-10" />
            <h2 className="text-3xl font-heading font-bold mb-6 relative z-10 text-foreground">Standardul de Excelență în Imobiliare</h2>
            <p className="text-lg text-muted-foreground relative z-10">
              AiXLuxury nu este o simplă agenție. Este un Private Club pentru investitori imobiliari. 
              Vindem și achiziționăm capodopere arhitecturale cu aceeași dedicare și finețe cu care sunt construite.
            </p>
          </div>
        </div>
        <ContactForm customTitle="Cauți o proprietate de lux?" />
      </main>
      
      <Footer />
    </div>
  );
}
