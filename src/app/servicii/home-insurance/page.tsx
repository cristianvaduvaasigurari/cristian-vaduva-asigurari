import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Home, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Facultativă a Locuinței | Cristian Văduva",
  description: "Scutul complet de protecție pentru casa ta. Acoperă tot, de la incendii masive la spargeri și inundații provocate vecinilor.",
};

export default function HomeInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="home-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Home className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Facultativă a Locuinței
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Cea mai scumpă investiție a familiei tale nu ar trebui să fie vulnerabilă în fața hazardului. Protejează valoarea imobilului, amenajările de lux, sistemele smart home și răspunderea ta față de vecini, cu pachetul facultativ premium All-Risk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Evaluează-ți Locuința</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează Specialistul
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
                Ce este polița Facultativă?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de polița obligatorie de stat (PAD) care despăgubește doar dezastre majore (cutremur, inundații, alunecări) până în pragul infim de 20.000 EUR, Asigurarea Facultativă este instrumentul care garantează adevărata valoare de piață a casei tale.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița Facultativă acoperă apartamente, vile și dependințele acestora la valoarea lor reală de reconstrucție (de ex: 200.000, 500.000 EUR). Extinde umbrela de siguranță peste riscurile cotidiene frecvente: incendiu de la priză, explozii de gaz, furt din apartament, trăsnet sau conducte sparte.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Diferența la capitolul "Amenajări"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Astăzi, designul interior, instalațiile de climatizare, podelele din lemn masiv și tehnologiile smart integrate într-un apartament pot costa la fel de mult cât a costat structura betonului. Toate aceste amenajări costisitoare sunt invizibile pentru asigurarea de bază.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fără o asigurare facultativă adaptată corect, în eventualitatea unui incendiu minor care distruge parchetul și bucătăria personalizată, va trebui să refaci întreaga investiție exclusiv din economiile personale.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui îi este destinată?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Această poliță nu este un lux, ci o responsabilitate a dreptului de proprietate, potrivindu-se oricui deține sau interacționează cu piața imobiliară:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Proprietarii Imobilelor Achiziționate cu Credit</h4>
                <p className="text-muted-foreground">Pentru toți cei care au credite ipotecare, polița facultativă este obligatorie, cesionată în favoarea Băncii pentru a proteja garantat suma împrumutată.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Proprietarii de Vile și Case Inteligente</h4>
                <p className="text-muted-foreground">Reședințe de valoare mare cu garduri masive, panouri solare, garaje inteligente și porți automate care pot fi avariate de furtuni sau vandali.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Investitori în Chirii</h4>
                <p className="text-muted-foreground">Persoanele care dau apartamentele în chirie își protejează investiția împotriva distrugerilor accidentale comise de chiriași sau de neglijența acestora (ex: uitarea robinetului deschis).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Locatari în ansambluri rezidențiale noi</h4>
                <p className="text-muted-foreground">Acolo unde proximitatea vecinilor mărește riscul de inundații interioare, polița protejează relațiile vecinești acoperind nota de plată.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Trei Extensii Valoroase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Răspundere Civilă Față de Vecini</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă se sparge mașina de spălat noaptea și inunzi două etaje inferioare ale blocului, Asigurătorul preia și despăgubește reparațiile în apartamentele vecinilor tăi, salvându-te de zeci de mii de lei.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asistență Tehnică la Domiciliu</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ai pierdut cheile sau ți s-a defectat centrala termică în toiul iernii? Prin clauza de asistență Generali trimite un lăcătuș sau instalator autorizat pentru a remedia de urgență situația.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Bunuri Generale din Casă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polița poate integra protecția obiectelor de valoare, a mobilierului masiv, electrocasnicelor de top și echipamentelor IT împotriva hoților sau fluctuatiilor de curent.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Aria Completă de Daune Despăgubite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Incendiu, Trăsnet și Explozie</div>
                  <div className="text-sm text-muted-foreground">Baza oricărei polițe: despăgubește daunele complete dacă locuința ia foc de la un scurtcircuit, se distruge de o explozie de gaz sau e lovită de un fulger.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Avarii accidentale la Instalații (Apa de conductă)</div>
                  <div className="text-sm text-muted-foreground">Inundațiile produse din interior de spargerea accidentală a conductelor sanitare de bloc sau de fisurarea țevilor de încălzire de la centrală.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furtună, Grindină și Greutatea Zăpezii</div>
                  <div className="text-sm text-muted-foreground">Dacă acoperișul cedează sub o zăpadă istorică sau vântul puternic ia țigla de pe casă, reparațiile sunt finanțate 100%.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt prin efracție sau tâlhărie</div>
                  <div className="text-sm text-muted-foreground">Forțarea încuietorilor și distrugerea elementelor ușii de către spărgători, precum și contravaloarea bunurilor subtilizate.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Scenarii Reale Evitate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Coșmarul la Bloc</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Dan este plecat în vacanță. Acasă, furtunul de presiune de la vasul de toaletă cedează noaptea. Apa inundă puternic apartamentul lui, dar se infiltrează și distruge parchetul complet la vecinul de dedesubt.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Generali trimite inspectorul care evaluează dauna. Modulul de "Apă de Conductă" plătește pentru refacerea podelelor și usșilor la Dan (2.000 EUR), iar modulul de "Răspundere Civilă Față de Terți" virează bani direct vecinului (1.500 EUR) pentru ca acesta să-și schimbe parchetul. Dan a fost ferit de proces.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Creșterea Tensiunii</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O fluctuatie uriașă de energie electrică a rețelei pe strada în care locuiește Elena "prăjește" panoul electric al casei, televizorul QLED nou cumpărat și centrala termică abia pusă în funcțiune.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având clauza specială pentru "Fenomene electrice" și asigurarea bunurilor electronice, Generali rambursează costul electrocasnicelor la valoarea lor de piață și despăgubește reparația panoului electric, salvând-o pe Elena de la a relua procesul în instanță cu furnizorul de curent.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitate Financiară Superioară</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Când vine vorba de investiții imobiliare masive, polițele trebuie emise de coloși care au rezerve suficiente să despăgubească re-construcția de la zero a unui imobil evaluat la sute de mii de euro.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Solvabilitate Gigant</h4>
                <p className="text-muted-foreground leading-relaxed">Generali are experiența protecției clădirilor monumentale din Europa, fiind perfect capabilă să susțină plata unor daune locale imense apărute la nivel rezidențial.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Subscriere Personalizată</h4>
                <p className="text-muted-foreground leading-relaxed">Aici nu vindem pachete "tip". Evaluăm structura casei, vechimea instalațiilor, sistemul de pază și creăm contractul cu sumele adecvate realității apartamentului tău.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Autoconstatare Video</h4>
                <p className="text-muted-foreground leading-relaxed">În caz de daune minore cum ar fi fisuri provocate de vecin sau pereți udați, poți face tu o constatare video cu un expert prin apel telefonic, aprobând plata aproape instantaneu.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (FAQ)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pot să fac doar Asigurarea Facultativă fără PAD (Asigurarea Obligatorie)?</h3>
                <p className="text-muted-foreground leading-relaxed">Din punct de vedere legal în România, pentru a încheia o asigurare facultativă completă, ești obligat să prezinți o poliță de stat PAD valabilă. Dacă nu o ai, noi vom emite simultan și polița PAD alături de cea Generali, unificându-le convenabil sub un singur dosar.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cum se stabilește suma pentru care îmi asigur apartamentul?</h3>
                <p className="text-muted-foreground leading-relaxed">Suma de protecție trebuie să reflecte "Valoarea de reconstrucție de nou" și nu prețul zonei imobiliare. Vom stabili acest buget împreună pe baza grilelor oficiale raportate la suprafața utilă, materialele de finisaj (standard, superior, de lux) și anul de construcție al blocului/vilei.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă chiriașul dă foc la apartament din greșeală, sunt acoperit?</h3>
                <p className="text-muted-foreground leading-relaxed">Da, asigurarea funcționează perfect dacă a fost declarată clauza de "spațiu închiriat" la emiterea ofertei. Generali va despăgubi proprietarul pentru distrugerile imobiliare produse, asigurând stabilitatea investiției.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Emite Polița Casei Tale</h2>
            <p className="text-xl text-muted-foreground">Completează datele esențiale despre imobil și vei primi oferta pentru protecția sa imediat.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Asigurare Locuință" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Rapid din Câteva Clicuri</h3>
              <p className="text-muted-foreground mb-8">
                Nu trebuie decât să cunoști suprafața casei și anul construcției. Ne ocupăm noi de optimizarea calculului.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Detaliile pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Formular</div>
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
