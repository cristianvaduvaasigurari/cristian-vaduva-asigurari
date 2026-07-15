import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShieldAlert, Target, ShieldCheck, AlertTriangle, Building, Briefcase, Heart, Flame } from "lucide-react";
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
          
          {/* Hero Section */}
          <div className="mb-24 text-center max-w-5xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-heading text-sm font-bold tracking-widest uppercase mb-6 border border-red-500/20">
              Risk Management
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight">
              Your assets deserve <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">protection</span>, not assumptions.
            </h1>
            <p className="text-2xl font-light text-muted-foreground mb-10">
              Un singur eveniment neprevăzut poate șterge zeci de ani de muncă. Ce construiești astăzi, trebuie protejat mâine.
            </p>
          </div>

          {/* Marketing Philosophy: Fear, Ego, Utility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
            <div className="glass beneficiu-card p-10 rounded-[3rem] relative overflow-hidden border border-red-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-red-500/20 transition-all" />
              <ShieldAlert className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Frica Reală</h3>
              <p className="text-muted-foreground leading-relaxed">
                Piața, economia și accidentele nu țin cont de efortul tău. O secundă de neatenție sau un factor extern pot distruge un business profitabil sau o casă de vis. De ce oamenii pierd bani fără protecție? Pentru că se bazează pe noroc.
              </p>
            </div>
            
            <div className="glass beneficiu-card p-10 rounded-[3rem] relative overflow-hidden border border-purple-500/10 md:-translate-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-blue-500/20 transition-all" />
              <Target className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Ego-ul Justificat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ai muncit enorm pentru standardul tău de viață. Nu lăsa hazardul să dicteze dacă familia ta își va menține sau nu același nivel de confort financiar. Asigurarea validează statutul tău de om prevăzător.
              </p>
            </div>
            
            <div className="glass beneficiu-card p-10 rounded-[3rem] relative overflow-hidden border border-emerald-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -z-10 group-hover:bg-emerald-500/20 transition-all" />
              <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-heading">Utilitatea Supremă</h3>
              <p className="text-muted-foreground leading-relaxed">
                Asigurarea nu este o cheltuială, este strategie financiară. Este un contract prin care transferi un risc financiar masiv către o corporație cu miliarde în spate, pentru o fracțiune din cost. 
              </p>
            </div>
          </div>

          {/* Deep Dive Sections */}
          <div className="max-w-4xl mx-auto mb-32 space-y-24">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-4">
                <AlertTriangle className="text-amber-500 w-8 h-8" />
                Diferența dintre o poliță ieftină și protecție reală
              </h2>
              <div className="glass p-8 rounded-3xl border border-border space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  O greșeală frecventă este achiziția celei mai ieftine polițe (ex: PAD sau RCA simplu). Acestea bifează doar o obligație legală, dar te lasă descoperit în cazul unor daune majore.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10">
                    <h4 className="font-bold text-red-400 mb-2">Greșeli frecvente</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Subasigurarea (declararea unei valori mai mici a clădirii pentru o primă redusă).</li>
                      <li>• Ignorarea excluderilor contractuale.</li>
                      <li>• Neasigurarea răspunderii civile față de terți.</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                    <h4 className="font-bold text-emerald-400 mb-2">Exemple Reale</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Un scurtcircuit distruge un depozit de 500.000€ (acoperit de polița business All-Risk).</li>
                      <li>• O inundație de la etaj distruge un penthouse (acoperit de asigurarea facultativă de locuință + bunuri).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-4">
                <Building className="text-blue-500 w-8 h-8" />
                Protecție pe toate planurile
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-3xl border border-border">
                  <Heart className="w-8 h-8 text-pink-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-foreground">Familie</h4>
                  <p className="text-sm text-muted-foreground">Asigurările de viață și sănătate garantează că, indiferent ce se întâmplă cu tine, familia ta nu își va pierde stilul de viață și nu va vinde active în pierdere pentru a plăti tratamente.</p>
                </div>
                <div className="glass p-8 rounded-3xl border border-border">
                  <Briefcase className="w-8 h-8 text-purple-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-foreground">Business</h4>
                  <p className="text-sm text-muted-foreground">Asigurările IMM și Răspunderile Profesionale te protejează de procese, faliment sau întreruperea activității din cauze neprevăzute.</p>
                </div>
                <div className="glass p-8 rounded-3xl border border-border">
                  <Flame className="w-8 h-8 text-orange-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-foreground">Investiții</h4>
                  <p className="text-sm text-muted-foreground">Eficiența capitalului: bogații nu țin sute de mii blocate ca &quot;fond de rezervă&quot;, ci plătesc o primă mică anuală pentru a asigura acele active, investind restul banilor.</p>
                </div>
              </div>
            </section>

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
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/contact">Cere o strategie personalizată</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-background border-border hover:bg-muted text-foreground" asChild>
                  <Link href="/calculatoare">Simulează riscurile tale</Link>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
