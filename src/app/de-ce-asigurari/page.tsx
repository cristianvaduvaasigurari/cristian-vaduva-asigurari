import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { ShieldAlert, Target, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Insurance | De ce Asigurări? | Cristian Văduva",
  description: "Asigurarea potrivită nu este o cheltuială. Este strategie financiară. Află de ce oamenii bogați folosesc asigurări pentru protecția patrimoniului.",
};

export default function WhyInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight">
              Un singur eveniment poate șterge <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ani de muncă.</span>
            </h1>
            <p className="text-2xl font-light text-muted-foreground mb-10">
              Protejează ceea ce ai construit.
            </p>
          </div>

          {/* Core Philosophy Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
            <div className="glass p-10 rounded-[3rem] relative overflow-hidden group border border-red-500/10 hover:border-red-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-red-500/20 transition-all" />
              <ShieldAlert className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Frica Reală</h3>
              <p className="text-muted-foreground leading-relaxed">
                Piața, economia și accidentele nu țin cont de efortul tău. O secundă de neatenție sau un factor extern pot distruge un business profitabil sau o casă de vis.
              </p>
            </div>
            
            <div className="glass p-10 rounded-[3rem] relative overflow-hidden group border border-blue-500/10 hover:border-blue-500/30 transition-colors md:-translate-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-blue-500/20 transition-all" />
              <Target className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Ego-ul Justificat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ai muncit enorm pentru standardul tău de viață. Nu lăsa hazardul să dicteze dacă familia ta își va menține sau nu același nivel de confort financiar.
              </p>
            </div>
            
            <div className="glass p-10 rounded-[3rem] relative overflow-hidden group border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-emerald-500/20 transition-all" />
              <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Utilitatea Supremă</h3>
              <p className="text-muted-foreground leading-relaxed">
                Asigurarea potrivită nu este o cheltuială. Este un contract prin care transferi un risc financiar masiv către o corporație cu miliarde în spate, pentru o fracțiune din cost.
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div className="max-w-4xl mx-auto mb-32">
            <h2 className="text-4xl font-heading font-bold mb-12 text-center">De ce oamenii bogați folosesc asigurări?</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Eficiența Capitalului</h4>
                  <p className="text-muted-foreground">În loc să blocheze sute de mii de euro într-un fond de urgență pentru un dezastru improbabil, ei folosesc asigurări de viață și proprietate. Astfel, își păstrează capitalul liber pentru a produce noi investiții cu ROI mare.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Poliță Ieftină vs Protecție Reală</h4>
                  <p className="text-muted-foreground">O greșeală frecventă este achiziția celei mai ieftine polițe (ex: PAD sau RCA simplu). Oamenii de succes cumpără <strong>Răspunderi Civile extinse</strong> și <strong>CASCO All-Risk</strong>, știind că diferența de câțiva euro salvează reputația și zeci de mii de euro la daună.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass p-16 rounded-[4rem] border border-blue-500/20 text-center max-w-5xl mx-auto mb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-heading font-bold mb-6">Pregătit să-ți securizezi patrimoniul?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Nu lăsa siguranța afacerii și a familiei tale pe mâna norocului. Programează o discuție și hai să creăm o strategie de risk management de lux.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/contact?type=consultanta">Cere o strategie personalizată</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/5" asChild>
                  <Link href="/calculatoare">Analizează riscurile tale</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
        
        <ContactForm customTitle="Vrei să discutăm direct?" />
      </main>
      
      <Footer />
    </div>
  );
}
