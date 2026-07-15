import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { ShieldCheck, Target, TrendingUp, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre Mine | Cristian Văduva",
  description: "Senior Sales, valoare mare pentru tine-Ticket Closer, Real Estate & Investment Advisor. Protecția patrimoniului și strategii de creștere financiară.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 max-w-6xl mb-24">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-heading text-sm font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
                acces rapid pentru tine Advisor & valoare mare pentru tine-Ticket Closer
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight tracking-tight">
                Cristian <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Văduva.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Peste o decadă de experiență în securizarea și scalarea patrimoniului clienților beneficiu. 
                De la Real Estate de lux la planificare financiară și protecție prin instrumente de top (Generali).
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90" asChild>
                  <Link href="/contact">Programează o consultanță</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative glass border border-border">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                {/* Fallback pattern / gradient if no image */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-background to-background" />
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <Gem className="w-64 h-64 text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Expertise */}
        <div className="bg-muted/50 border-y border-border py-24 mb-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Experiență & Expertiză</h2>
              <p className="text-muted-foreground">O abordare holistică asupra ecosistemului tău financiar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Gem,
                  title: "Real Estate",
                  desc: "Reprezentare exclusivă pentru proprietăți beneficiu și off-market prin Home Find & AiXbeneficiu.",
                  color: "text-amber-400"
                },
                {
                  icon: ShieldCheck,
                  title: "Insurance",
                  desc: "Protecția patrimoniului și a afacerilor (B2B/B2C) ca partener certificat Generali.",
                  color: "text-blue-400"
                },
                {
                  icon: TrendingUp,
                  title: "Investments",
                  desc: "Planificare pe termen lung și eficiență a capitalului pentru randament maxim.",
                  color: "text-emerald-400"
                },
                {
                  icon: Target,
                  title: "Sales Strategy",
                  desc: "valoare mare pentru tine-Ticket closing și consultanță pentru optimizarea conversiilor B2B.",
                  color: "text-purple-400"
                }
              ].map((item, i) => (
                <div key={i} className="glass beneficiu-card p-8 rounded-3xl border border-border">
                  <item.icon className={`w-10 h-10 mb-6 ${item.color}`} />
                  <h3 className="font-heading font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Philosophy */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">Misiune & Abordare Consultativă</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8 text-center">
              Diferențiatorul principal față de agenții clasici din piață este <strong>abordarea de Private Banking</strong>.
              Nu vând polițe de asigurare sau case. Construiesc strategii de risc și de creștere.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-xl font-bold mb-4 font-heading text-foreground">Ce mă definește?</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-blue-600">◆</span> Transparență totală în auditarea riscului.</li>
                  <li className="flex gap-3"><span className="text-blue-600">◆</span> Acces la rețele private (Off-market properties).</li>
                  <li className="flex gap-3"><span className="text-blue-600">◆</span> Eficiența capitalului (blocarea riscurilor prin polițe, nu prin cash).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 font-heading text-foreground">Pentru cine sunt?</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-emerald-600">◆</span> Antreprenori și proprietari de IMM-uri.</li>
                  <li className="flex gap-3"><span className="text-emerald-600">◆</span> Investitori imobiliari.</li>
                  <li className="flex gap-3"><span className="text-emerald-600">◆</span> Familii care doresc securizarea patrimoniului.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="glass p-12 md:p-16 rounded-[3rem] border border-blue-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Hai să construim împreună</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Fie că vrei să-ți protejezi patrimoniul, să investești în Real Estate sau să îți optimizezi portofoliul de asigurări — sunt aici să te ajut.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 font-semibold" asChild>
                  <Link href="/contact">Programează o discuție</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-border bg-white text-foreground hover:bg-muted px-8" asChild>
                  <Link href="https://wa.me/436509536345" target="_blank">WhatsApp</Link>
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
