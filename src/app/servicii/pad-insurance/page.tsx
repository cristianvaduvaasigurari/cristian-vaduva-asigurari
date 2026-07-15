import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { ShieldAlert, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAD - Asigurarea Obligatorie a Locuinței | Cristian Văduva",
  description: "Baza legislativă a protecției casei tale. O poliță de stat menită să despăgubească efectele dezastrelor naturale majore din România.",
};

export default function PADInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-amber-600 mb-8 border border-border bg-amber-50">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              PAD: Asigurarea Obligatorie a Locuinței
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Prin lege, fiecare proprietar de locuință din România trebuie să dețină o poliță de stat împotriva dezastrelor naturale (cutremur, inundații masive, alunecări de teren). Este primul și cel mai elementar pas în responsabilitatea față de propriul cămin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Emite Polița PAD Online</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Rapid
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
                Ce este sistemul PAID / PAD?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița de Asigurare Împotriva Dezastrelor (PAD) este un produs financiar tipizat, creat de statul român prin intermediul asocierii mai multor societăți de asigurări într-o entitate numită PAID (Pool-ul de Asigurare Împotriva Dezastrelor).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Scopul ei nu este să acopere daune specifice provocate de tine sau hoți, ci să formeze un fond masiv de rezervă la nivel național care să poată asigura sprijin minim la reconstrucția caselor în eventualitatea unei catastrofe naționale (precum un seism major similar cu cel din 1977).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Legalitate și Amenzi
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Pe lângă valența ei protectoare minimală, deținerea acestei asigurări este o obligație legală dictată de Legea 260/2008. Lipsa ei atrage după sine amenzi contravenționale aplicate de administrația publică locală care pot atinge praguri destul de mari (până la 500 LEI).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                De asemenea, PAD este "fundația" pe care se construiesc restul asigurărilor de locuință (Facultative). Absolut nicio companie de top din România nu are voie prin lege să emită o poliță extinsă All-Risk pentru casa ta, dacă sistemul lor nu detectează întâi prezența poliței de stat PAD.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui i se adresează?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obligativitatea PAD se aplică nediscriminatoriu tuturor construcțiilor intabulate care servesc drept adăpost pentru oameni:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Apartamente de Bloc</h4>
                <p className="text-muted-foreground">Fie că locuiesc în construcții din era comunistă care pot fi mai vulnerabile la mișcări telurice, fie în rezidențe noi.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Case și Vile</h4>
                <p className="text-muted-foreground">Mai ales în regiunile peri-urbane unde riscurile de viituri (inundații naturale) sunt o problemă istorică documentată.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Case Tradiționale la Țară</h4>
                <p className="text-muted-foreground">Inclusiv clădirile construite din chirpici/pământ, valoarea poliței și despăgubirea fiind proporțional diminuate (100 Lei / an pentru 10.000 EUR acoperire).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Cei ce vând sau închiriază</h4>
                <p className="text-muted-foreground">Majoritatea avocaților și notarilor solicită existența unui PAD valabil înainte de a perfecta acte imobiliare.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Caracteristicile Standardizate ale Poliței</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Preț Fix Național</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polița pentru casele din cărămidă, beton și structuri dure moderne costă exact 130 LEI pe an. Indiferent prin ce agenție de asigurări alegi să o emiți.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Suma Maximă Garantată</h3>
                <p className="text-muted-foreground leading-relaxed">
                  În caz de daună totală a casei din pricina cutremurului, PAD-ul îți va livra contravaloarea a maxim 20.000 de Euro (pentru locuințele de tip A), sau 10.000 Euro (Tip B - chirpici).
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Simplu și Rapid</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fiind standardizată de stat, se emite fără poze, fără evaluare a finisajelor și fără vizite. Avem nevoie doar de datele din buletin pentru a o genera digital în 3 minute.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Cele 3 Riscuri acces exclusiv pentru tine din Lege
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Cutremur de Pământ</div>
                  <div className="text-sm text-muted-foreground">Distrugeri parțiale (crăparea masivă a pereților de rezistență) sau colapsul total al clădirii rezultat strict în urma unui seism.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Inundații din Cauze Naturale</div>
                  <div className="text-sm text-muted-foreground">Ruperea de nori severă, revărsarea râurilor, topirea brutală a zăpezilor din zonele montane. Atenție, NU acoperă inundațiile produse de la țevile de apă sparte de vecin!</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Alunecări de Teren</div>
                  <div className="text-sm text-muted-foreground">Mișcările terenului generate de excese de umiditate pluvială sau instabilitate geomorfologică care duc la dizlocarea și distrugerea structurală a vilelor construite pe dealuri.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center flex-shrink-0 font-bold">?</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ce lipsește din ea? Incendiul.</div>
                  <div className="text-sm text-muted-foreground">Cea mai mare confuzie generală: o casă care ia foc de la un scurtcircuit NU primește niciun ban de la stat pe PAD. Incendiul se face doar prin asigurare Facultativă!</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Diferența critică de protecție
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Seism cu distrugeri de fațadă</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un seism mediu de 6 pe Richter fisurează balcoanele și dărâmă tencuiala masivă de pe o casă construită conform normelor din beton armat. Cost evaluat reparații: 3.500 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Întrucât dauna a fost exclusiv un rezultat seismic natural, iar valoarea este inferioară pragului maxim de 20.000 EUR prevăzut de stat, PAD-ul va acoperi reparațiile acestor ziduri integral.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Dauna Totală - Cutremur Major</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un apartament nou dintr-o rezidență, achiziționat cu 150.000 EUR, este prăbușit integral în cazul unui cutremur catastrofic tip '77.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Atenționare:</span> Asigurarea obligatorie PAID va despăgubi clientul fix cu plafonul legal de stat: **100.000 de lei (20.000 EUR)**. Restul de 130.000 EUR sunt pierduți total, dacă respectivul client nu deținea în acel moment și o Asigurare Facultativă peste ea!
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce să emiți PAD-ul la Generali?</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Chiar dacă produsul și prețul sunt identice în toată țara (130 Lei), platforma prin care îl cumperi contează atunci când vine vorba de gestionarea dosarelor.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Punct Unic de Acces</h4>
                <p className="text-muted-foreground leading-relaxed">Emitem împreună atât PAD-ul de stat cât și Facultativa Generali. Ai un singur consultant, un singur plic, un singur telefon de dat la daune.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Suport la Daune (PAID)</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă ai un dosar PAID în caz de cutremur, echipa Generali este autorizată să preia dosarul tău pentru a se ocupa intern de trimiterea lui spre stat, facilitând documentația.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Reînnoire Automată (Alertă)</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemele noastre te vor notifica automat înainte de scadența de 12 luni, asigurându-ne că ești permanent în legalitate cu cerințele statului, fără să ții minte calendare.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce înseamnă clădire de Tip A și Tip B?</h3>
                <p className="text-muted-foreground leading-relaxed">Locuința de **Tip A** este construită cu o structură de rezistență solidă, cum ar fi beton armat, oțel, zidărie de cărămidă tratată termic, și atrage prețul de 130 Lei (pentru garantarea a 100.000 RON). Locuința de **Tip B** are structură de rezistență inferioară (ex: chirpici sau pământ nears) și atrage prețul de 50 Lei (pentru garantarea a doar 50.000 RON).</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Banca mea îmi reînnoiește automat PAD-ul oprit din cont, este ok?</h3>
                <p className="text-muted-foreground leading-relaxed">Da, este legal, dar este dezavantajos administrativ. Când ai PAD-ul tăiat separat de bancă și Facultativa la un broker sau alt asigurător, vei avea de adunat de două ori hârțogărie de la sedii diferite la crearea unui dosar. Ideal este portarea PAD-ului din bancă sub umbrela generală a asigurătorului tău de facultativă.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperă PAD bunurile interioare, frigiderul sau laptopul dacă le lovește cutremurul?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu, în mod categoric! Legea definește clar că se decontează DOAR "structura fizică constructivă" a casei tale, nu mobilierul, electronicele sau bunurile personale aflate înăuntru. Pentru acelea, se cumpără separat clauza "Bunuri" pe polița Facultativă All-Risk.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Emite PAD-ul Rapid</h2>
            <p className="text-xl text-muted-foreground">Este cel mai accesibil instrument legal. Fii în siguranță cu minimul de efort.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Trimite Datele pentru PAD" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite cu Buletinul</h3>
              <p className="text-muted-foreground mb-8">
                Ne trimiți o copie a actului de identitate, adresa clară a casei și anul construcției. Și restul facem noi.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Buletin pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Call Center Emiteri Rapide</div>
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
