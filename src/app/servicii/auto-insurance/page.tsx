import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Car, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurări Auto Complexe: RCA & CASCO | Cristian Văduva",
  description: "Management auto all-risk. Protejează-ți investiția auto prin pachete integrate RCA și CASCO la nivel de reprezentanță.",
};

export default function AutoInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="auto-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Car className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Pachete Auto Integrate: RCA și CASCO All-Risk
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Un autoturism de lux necesită o siguranță la nivel de reprezentanță oficială. Eliminăm stresul birocrației rutiere combinând asigurarea obligatorie cu cel mai puternic scut facultativ de pe piață. Protejăm atât pe cei din jurul tău, cât mai ales valoarea investiției tale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Calculează Tarif Auto</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Trimite Talonul pe WhatsApp
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
                Despre Polițele Auto
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Există două componente majore ale siguranței rutiere. **RCA-ul (Obligatoriu)** prin lege, acoperă pagubele pe care mașina ta le-ar putea provoca material și fizic altor persoane implicate într-un incident rutier din vina ta.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                **CASCO-ul (Facultativ)** este completarea supremă: acoperă strict daunele suferite de mașina TA proprie. Fie că e vorba de un parbriz spart de o piatră, o zgârietură în parcare, o inundație care afectează motorul, sau un accident grav din propria ta greșeală.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                De ce ai nevoie de CASCO?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Autoturismele actuale au costuri de reparație colosale. Farurile cu tehnologie LED/Laser sau senzorii radar integrați în spoilere pot costa de la 3.000 la 10.000 EUR pentru o simplă înlocuire a barei frontale.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fără poliță CASCO, chiar și o banală greșeală de manevră proprie îți poate destabiliza puternic bugetul. Mai mult, lipsa de acoperire RCA de calitate (cu decontare directă) te face vulnerabil la a te certa luni de zile cu asigurătorii problemă ai vinovatului care te-a lovit.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui îi este recomandat acest pachet?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mobilitatea fluentă și fără stres este cheia unei vieți eficiente. Pachetele noastre sunt extrem de utile pentru:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Vehicule Finanțate prin Leasing</h4>
                <p className="text-muted-foreground">Pentru care legea impune existența permanentă a unei polițe CASCO validate, pentru protejarea bunului companiei finanțatoare.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Posesori de Vehicule Premium</h4>
                <p className="text-muted-foreground">Mercedes, BMW, Audi, Porsche. Orice mașină la care ora de manoperă în reprezentanță este costisitoare necesită un instrument capabil să preia costurile fără comentarii.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familii active</h4>
                <p className="text-muted-foreground">Care folosesc constant mașinile pentru concedii în țară și Europa și se bazează pe siguranța asistenței rutiere disponibile 24/7 pe tot continentul.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Șoferi Pragmatici</h4>
                <p className="text-muted-foreground">Cei care optează mereu pentru "Decontare Directă", dorind să își rezolve problemele pe cont propriu rapid, refuzând să fie victimele birocrației rutiere.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Integrării</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Mașină la Schimb Permanentă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu rămâi niciodată pieton. Opțiunile avansate de asigurare acoperă costurile închirierii unui autovehicul similar pe toată perioada în care mașina ta se află în reparații.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Decontare Directă (RCA VIP)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ai fost lovit? Nu mai trebuie să umbli pe la societatea șoferului vinovat. Generali îți plătește reparația rapid din propria ta poliță RCA, ocupându-se ulterior să recupereze banii în tribunal de la firma celuilalt.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Alerte VIP de Scadențe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Centralizarea polițelor prin echipa noastră garantează că nu vei mai circula niciodată cu ITP-ul, Rovinieta sau RCA-ul expirat, fiind notificat anticipat și proactiv.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce riscuri preia CASCO de la tine?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Coliziuni din vina proprie</div>
                  <div className="text-sm text-muted-foreground">Orice accident produs pentru că ai derapat, nu ai acordat prioritate sau te-ai izbit de un perete în parcare. Mașina ta este refăcută de noi.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt Total sau Parțial</div>
                  <div className="text-sm text-muted-foreground">Plata valorii de piață a mașinii dacă a dispărut cu totul, sau acoperirea pagubelor dacă hoții au spart geamul să fure navigația internă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Fenomene Naturale Complete</div>
                  <div className="text-sm text-muted-foreground">Inundații, furtuni devastatoare care rup copaci, grindină care îți distruge plafonul mașinii - totul intră în aria de protecție standard a CASCO.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Vandalism (Autor Necunoscut)</div>
                  <div className="text-sm text-muted-foreground">Ai lăsat mașina în parcarea publică și ai găsit-o cu ușa înfundată sau cu oglinda ruptă? CASCO o repară fără să ceară găsirea vinovatului.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              De ce face diferența? Explicat.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Calvarul vinovatului falimentar</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bogdan este lovit violent într-o intersecție de o dubiță de marfă asigurată RCA la o companie extrem de ieftină, aflată în dificultate financiară.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având **Decontare Directă** achiziționată pe RCA-ul său Generali, Bogdan refuză să trateze cu asigurătorul slab. Generali preia devizul de 6.000 EUR al reprezentanței Audi a lui Bogdan, aprobă imediat reparația, iar Bogdan își ia mașina rezolvată în câteva zile. Generali se judecă intern cu firma cealaltă. Bogdan este neafectat.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Furtuna de Grindină</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O furtună puternică de vară trece pe deasupra orașului, iar grindina de mari dimensiuni distruge plafonul, capota și sparge luneta unei mașini parcate afară.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deoarece RCA-ul nu acoperă catastrofe naturale pe mașina proprie, intervine polița CASCO. Asigurătorul direcționează clientul către un atelier de elită specializat în "Paintless Dent Repair" (PDR), iar caroseria este adusă la perfecțiune tehnică pe cheltuiala companiei.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce Auto prin Generali România?</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Pentru că vrem să-ți menținem autoturismul în stadiu de garanție de fabrică. Iar asta presupune calitatea serviciilor post-daună la un nivel imposibil de atins de piața asigurărilor low-cost.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Doar Reprezentanțe Autorizate</h4>
                <p className="text-muted-foreground leading-relaxed">Generali are protocoale extinse de decontare directă cu dealerii oficiali ai tuturor mărcilor premium din România (Țiriac Auto, Automobile Bavaria, Autoklass etc.).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Piese de Origine 100%</h4>
                <p className="text-muted-foreground leading-relaxed">O reparație sub umbrela CASCO Generali înseamnă că nu se folosesc repere after-market ieftine care strică performanța la impact viitor, ci doar repere Original Equipment Manufacturer (OEM).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Bonus-Malus Transparent</h4>
                <p className="text-muted-foreground leading-relaxed">Combinând ambele protecții (RCA+CASCO) ești recunoscut ca un client loial și profilat ca fiind de risc scăzut, atrăgând reduceri considerabile de preț la reînnoire.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce reprezintă Franșiza la o poliță CASCO?</h3>
                <p className="text-muted-foreground leading-relaxed">Este acea sumă mică (ex: 100 Euro sau 1% din suma asigurată) pe care asiguratul acceptă să o suporte singur la FIECARE eveniment rutier de care este vinovat. Restul facturii, indiferent de cât de mare este (ex. 8000 Euro), este achitat de asigurător. Existența franșizei este un instrument prin care prețul poliței anuale scade extrem de mult, eliminând birocrația de a deschide dosare de daună pentru zgârieturi milimetrice pe care le poți polisha singur ieftin.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Se fac poze mașinii la emiterea asigurării CASCO?</h3>
                <p className="text-muted-foreground leading-relaxed">Absolut da. Este obligatorie inspecția de risc prealabilă. Vestea bună este că aceasta este digitalizată: brokerul sau aplicația de mobil îți dă posibilitatea să realizezi fotografiile cu telefonul tău în 2 minute și ele sunt aprobate în timp real în sistemul Generali.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperă polița asistența rutieră în afara țării?</h3>
                <p className="text-muted-foreground leading-relaxed">Da, pachetele superioare de CASCO includ clauze complete de asistență rutieră europeană. Mașina îți este tractată de pe autostrada din Viena la fel de eficient cum ar fi tractată de la Brașov.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Protejează-ți Mașina, Fără Compromisuri</h2>
            <p className="text-xl text-muted-foreground">Un dosar curat de RCA și CASCO se construiește pe alinierea datelor din talon și profilul personal de condus.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere o Cotație Completă Auto" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Cea Mai Rapidă Metodă</h3>
              <p className="text-muted-foreground mb-8">
                Pentru o emitere rapidă RCA sau o ofertare corectă CASCO, cel mai simplu mod este să ne trimiți o poză clară a Talonului pe WhatsApp.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Talonul pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Auto (Daune)</div>
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
