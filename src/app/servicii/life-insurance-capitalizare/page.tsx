import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Wallet, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare de Viață cu Capitalizare | Cristian Văduva",
  description: "Combină protecția financiară absolută a familiei tale cu un instrument performant de economisire și investiție pe termen lung.",
};

export default function LifeCapitalizarePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Wallet className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurare de Viață cu Capitalizare
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Protecție totală și acumulare de capital într-un singur instrument premium. Îți asiguri viața pentru liniștea familiei tale, dar în același timp economisești disciplinat pentru a-ți finanța propriile vise la maturitatea contractului.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Simulează un Plan de Acumulare</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Consultanță Financiară
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-blue-500 w-8 h-8" />
                Ce este Asigurarea cu Capitalizare?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de o poliță de viață tradițională care acoperă exclusiv un risc (decesul), polița mixtă cu capitalizare are o dublă funcționalitate. O parte din prima pe care o plătești merge către protecția vieții, iar cealaltă parte este direcționată către un fond de investiții administrat de Generali.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asta înseamnă că la expirarea contractului (maturitate), dacă ești în viață, vei primi garantat suma economisită, plus randamentul generat în toți acești ani. Este practic un "cont de pensie privată" cuplat cu un "scut de viață".
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                De ce este fundamentală?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Una dintre cele mai mari provocări financiare este lipsa disciplinei pe termen lung. Banii ținuți pe contul curent sunt adesea cheltuiți pe dorințe de moment. Această poliță te forțează pozitiv să pui bani deoparte regulat, protejându-i de tentații.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mai mult, inflația erodează economiile neinvestite. Prin programele de capitalizare Generali, banii tăi sunt plasați în fonduri investiționale solide care protejează puterea de cumpărare a capitalului pe parcursul a 10, 15 sau 20 de ani.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui îi este recomandată?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul perfect pentru persoanele pragmatice care își doresc să elimine incertitudinea din viitorul lor financiar:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinți prudenți (Planul Academic)</h4>
                <p className="text-muted-foreground">Care încep să pună bani deoparte de când copilul are 1 an, pentru a-i finanța facultatea în străinătate la vârsta de 18 ani.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane ce vizează pensia</h4>
                <p className="text-muted-foreground">Antreprenori sau angajați care înțeleg că pensia de stat nu le va menține standardul de viață și vor un capital masiv la retragere.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Cei care doresc siguranță</h4>
                <p className="text-muted-foreground">Spre deosebire de investițiile pe bursa de valori pe cont propriu, produsele de viață garantate îți asigură conservarea principalului investit.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Tineri familiști</h4>
                <p className="text-muted-foreground">Care doresc să acumuleze capital pentru un avans imobiliar consistent pe termen mediu.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Beneficiile Acumulării</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Scutire de Impozit la Maturitate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conform legislației fiscale actuale, sumele plătite ca indemnizații din asigurările de viață (inclusiv capitalul acumulat) nu se impozitează, spre deosebire de dobânzile bancare sau câștigurile bursiere.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Suma Garantată</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contractul specifică o sumă finală "garantată", care reprezintă certitudinea ta matematică. Peste aceasta se adaugă un bonus de performanță investițională generat de Generali de-a lungul anilor.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Protecție Imediată Totală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă un eveniment tragic survine chiar și în luna a 3-a de la semnare, beneficiarii tăi primesc TOATĂ suma pe care tu voiai să o acumulezi în 20 de ani, nu doar cele 3 rate plătite.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Modulul de Risc Inclus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Supraviețuire (Maturitate)</div>
                  <div className="text-sm text-muted-foreground">Cel mai fericit risc. Dacă ești în viață la finalul celor 15-20 de ani, primești toți banii economisiți plus randamentul.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Deces din orice cauză</div>
                  <div className="text-sm text-muted-foreground">Dacă intervine decesul în perioada contractuală, beneficiarii primesc suma totală garantată imediat, fără să mai aștepte zeci de ani.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Invaliditate (Scutire de la plată)</div>
                  <div className="text-sm text-muted-foreground">Opțional. Dacă îți pierzi capacitatea de muncă, Generali va prelua el plata ratelor tale lunare, iar la final vei primi toți banii contractați.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Boli Grave</div>
                  <div className="text-sm text-muted-foreground">Opțional. Diagnosticarea cu un cancer sau suferirea unui AVC declanșează plata unei sume de urgență pentru a finanța vindecarea, fără a afecta acumularea principală.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Cifre și Scenarii
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Cazul "Maturitate Fericită"</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bogdan la 30 de ani începe să pună deoparte 150 EUR pe lună într-un program pe 25 de ani pentru a-și securiza pensionarea la 55 de ani.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezultat:</span> La 55 de ani, Bogdan ridică capitalul acumulat, plus randamentul din dividendele investiționale Generali. Tot acest capital este netaxabil și poate fi ridicat integral sau transformat într-o pensie lunară pe viață plătită de Generali.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Cazul "Planul Educațional Interupt"</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Laura (32 ani) face o poliță cu capitalizare țintind 40.000 EUR pentru facultatea fetiței ei peste 18 ani. După 4 ani, Laura suferă un accident auto fatal. Ea apucase să plătească doar câțiva ani.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezultat:</span> Familia nu pierde banii, iar planul fetiței nu moare. Generali virează imediat familiei întreaga sumă de 40.000 EUR, bani garantați prin componenta de protecție a poliței mixte.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Expertiza Investițională Generali</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să lași banii cuiva pe o perioadă de zeci de ani necesită o garanție a existenței acelei companii peste zeci de ani.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Solvabilitate Neclintită</h4>
                <p className="text-muted-foreground leading-relaxed">Generali administrează active globale de peste 500 miliarde de Euro, protejând fondurile asiguraților prin diversificare instituțională masivă, superioară oricărui depozit bancar.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Investiții Sustenabile</h4>
                <p className="text-muted-foreground leading-relaxed">Fondurile sunt investite prudent pe piețele financiare (obligațiuni de stat sigure și acțiuni blue-chip), scopul fiind protecția principalului și bătaia inflației, nu specula periculoasă.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Transparență Totală</h4>
                <p className="text-muted-foreground leading-relaxed">Clientul primește anual un raport detaliat privind evoluția contului său și are acces digital oricând pentru a urmări cum lucrează banii săi în platforma Generali.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă vreau să mă retrag înainte de finalul contractului?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița poate fi reziliată anticipat (răscumpărare), însă vei primi "valoarea de răscumpărare" care, în primii ani ai contractului, este mai mică decât sumele plătite de tine. Asta deoarece în primii ani o parte din bani merg către costurile de preluare a riscului masiv de deces și a comisioanelor de setare a contului de investiții. Recomandăm acest produs doar pentru acumulare reală pe termen lung.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pot să scot bani parțial dacă am o urgență?</h3>
                <p className="text-muted-foreground leading-relaxed">Da. După o anumită perioadă inițială (de obicei primii 2-3 ani), polițele permit retrageri parțiale din fondul investit, menținând în continuare contractul și asigurarea activă, dar acest lucru va ajusta suma finală estimată.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Prima se ajustează la inflație?</h3>
                <p className="text-muted-foreground leading-relaxed">Contractele prevăd de regulă "indexarea", un mecanism prin care suma plătită și capitalul garantat cresc anual cu un procent din inflație, pentru a te asigura că cei 50.000 EUR vor valora la fel de mult și peste 20 de ani.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Proiectează-ți Averea Viitoare</h2>
            <p className="text-xl text-muted-foreground">Alege suma finală pe care o dorești, iar noi îți creăm planul de zbor pentru a ajunge la ea.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Solicită Simulare Capitalizare" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Expertiză 1 la 1</h3>
              <p className="text-muted-foreground mb-8">
                Produsele financiare complexe se configurează cel mai bine printr-o analiză de nevoi personală alături de un consultant experimentat.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie-ne pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Sună pentru Consultanță</div>
                    <div className="font-bold text-foreground">{CONTACT.phone.display}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
