import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Stethoscope, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare de Accidente | Cristian Văduva",
  description: "Protecție financiară imediată în cazul evenimentelor traumatice neprevăzute, fracturilor și arsurilor.",
};

export default function AccidentInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="accident-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Stethoscope className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurare de Accidente Personale
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Accidentele nu trimit notificări în prealabil. O secundă de neatenție la schi, la volan sau chiar prin casă poate duce la fracturi complexe sau imobilizare. Asigurarea de accidente reprezintă un colac de salvare financiar ultra-accesibil care îți livrează lichidități imediate pentru recuperare.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Alege Pachetul de Protecție</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută pe WhatsApp
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
                Ce este protecția la accidente?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de o asigurare generală de viață (care acoperă inclusiv boli), polița de Accidente este un instrument modular, specializat și foarte ieftin, dedicat strict evenimentelor violente, fizice, produse de o cauză externă și independentă de voința asiguratului.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Plătește indemnizații fixe la diagnosticarea unei fracturi, arsuri sau altei traume, indiferent dacă te tratezi la stat sau privat. Banii îi primești direct pe cardul tău bancar pentru a acoperi zilele de concediu medical în care nu poți munci sau terapiile de recuperare costisitoare.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Vulnerabilitatea activităților zilnice
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Peste 70% din accidentele care duc la imobilizare temporară nu se întâmplă pe autostradă, ci în timpul activităților de weekend, pe pârtiile de schi, pe bicicletă, sau chiar prin alunecare în propria casă.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Recuperarea fizioterapeutică după o gleznă ruptă poate dura luni de zile, generând costuri suplimentare și un stres major dacă nu ai voie să calci. Polița de accidente îți cumpără liniștea de a-ți permite ghipsuri ușoare, orteze premium și transport specializat.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui i se potrivește cel mai bine?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Asigurarea de accidente este extrem de flexibilă, putând fi contractată atât pentru adulți cât și pentru copii:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane active și sportivi amatori</h4>
                <p className="text-muted-foreground">Cicliști urbani, pasionați de schi, snowboard, fotbal de weekend sau alte activități unde riscul de traumă fizică este crescut.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinți cu copii mici (sau la școală)</h4>
                <p className="text-muted-foreground">Copiii sunt extrem de expuși fracturilor la joacă. Polița le oferă părinților banii necesari pentru investigații rapide la o clinică privată de ortopedie pediatrică.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Angajați în domenii de teren</h4>
                <p className="text-muted-foreground">Șoferi, ingineri de șantier, agenți de vânzări pe teren, a căror prezență fizică pe drumuri îi expune la un risc mai mare decât munca statică de birou.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Meseriași independenți</h4>
                <p className="text-muted-foreground">Oameni al căror corp reprezintă unealta lor de muncă. O mână ruptă îi lasă fără nicio sursă de venit din prima zi.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Concrete</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Plata Nepondiționată</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Primești banii numerar în cont direct de la Generali pe baza unui simplu document medical radiologic, indiferent de faptul că la stat te-au tratat gratuit.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Accesibilitate Extremă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Este una dintre cele mai ieftine asigurări de pe piață. Pentru un preț echivalent cu un abonament de streaming pe lună, ești asigurat pe tot anul la accidente majore.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperire 24/7 Globală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polița te protejează atât la muncă, acasă, cât și în concediile tale din străinătate. Un accident pe scuter în Thailanda va genera o indemnizație care îți este plătită în România la întoarcere.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de incidente sunt despăgubite?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Fracturi și Arsuri de orice grad</div>
                  <div className="text-sm text-muted-foreground">Indemnizația depinde de complexitatea fracturii (ex: deget rupt vs. femur) și este un procent fix prestabilit din suma totală asigurată.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Spitalizare din Accident</div>
                  <div className="text-sm text-muted-foreground">Plata unei diurne (sumă fixă zilnică, ex. 100-200 Lei/zi) pentru fiecare zi petrecută de tine în spital pentru a te recupera după o traumă fizică.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Invaliditate Permanentă</div>
                  <div className="text-sm text-muted-foreground">Despăgubiri majore dacă accidentul te lasă cu sechele vizibile și pierderea mobilității definitive pe viață (ex: pierderea vederii unui ochi, amputații, paralizii).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Deces din Accident</div>
                  <div className="text-sm text-muted-foreground">Cea mai gravă clauză, asigură o plată imediată către beneficiarii legali dacă asiguratul își pierde viața strict în urma unui eveniment traumatic accidental.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Impactul în Viața Reală
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Volei de Duminică</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Andrei joacă volei la bază sportivă. Sare greșit, aterizează pe gleznă și suferă o fractură de tibie. Se duce la Spitalul Județean unde îi pun piciorul în ghips gratuit.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Andrei trimite la Generali radiografia sa și copia după biletul de ieșire. Chiar dacă la stat tratamentul a fost gratuit, polița lui avea protecție la fracturi. În câteva zile i se virează 4.000 de Lei, bani cu care Andrei își ia Uber zilnic spre munca de birou până se vindecă.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Accidentul Casnic al Copilului</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alex, 7 ani, cade de pe bicicletă în parcul de lângă casă și își fracturează un deget de la mână stângă.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Mama sa, care cumpărase un pachet de accidente Family, depune actele la Generali. Compania virează suma prevăzută în grila de fracturi pentru deget direct în contul mamei, care folosește banii pentru a-i cumpăra o bicicletă nouă mai sigură pentru copil.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Promptitudinea Despăgubirii</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              La un accident, nu ai nevoie de birocrație sau procese lente de aprobare. Ai nevoie de bani în cont.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Subscriere Digitală</h4>
                <p className="text-muted-foreground leading-relaxed">Încărcarea documentelor de la urgențe se face complet digital din portalul de client, fără a te deplasa cu piciorul în ghips la o agenție de brokeraj fizică.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Grilă Clară de Baremuri</h4>
                <p className="text-muted-foreground leading-relaxed">Generali are o grilă de despăgubiri publică și extrem de clară. Dacă îți rupi falanga, știi exact din start ce procentaj primești. Nu există "negocieri" absurde.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Fără Examinări Medicale</h4>
                <p className="text-muted-foreground leading-relaxed">La emiterea poliței de accidente nu ți se cere absolut niciun consult medical inițial, întrucât nu contează starea ta de sănătate anterioară, ci doar expunerea la accidente externe.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce diferență există între asigurarea de sănătate și cea de accidente?</h3>
                <p className="text-muted-foreground leading-relaxed">Asigurarea de Sănătate acoperă "boala" (ex. o viroză, analize uzuale de sânge, operație de apendicită). Asigurarea de Accidente acoperă STRICT "trauma externă" (te-a lovit mașina, ai căzut). Este excelent să le ai pe amândouă, iar cea de accidente costă semnificativ mai puțin tocmai pentru că elimină riscul bolilor.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Am deja asigurare la muncă. De ce îmi trebuie una privată?</h3>
                <p className="text-muted-foreground leading-relaxed">Unele companii asigură angajații "la accidente de muncă", adică ești protejat pe șantier sau în birou (între orele 09:00 - 18:00). Dar ce faci dacă îți rupi piciorul sâmbăta la grătar? Polița individuală Generali este activă 24/7/365.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sporturile extreme sunt acoperite?</h3>
                <p className="text-muted-foreground leading-relaxed">Depinde de setarea inițială. Dacă participi la competiții oficiale (legitimat) sau practici sporturi periculoase extrem de riscante (alpinism utilitar, curse moto), trebuie adăugată o supra-taxă specifică la poliță pentru ca aceste activități extra să fie validate.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Adaugă Siguranță Zilelor Tale</h2>
            <p className="text-xl text-muted-foreground">Un buget anual minor protejează buzunarul familiei tale de cheltuieli uriașe nedorite.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Obține Ofertă Poliță Accidente" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Rapid Polița</h3>
              <p className="text-muted-foreground mb-8">
                Asigurarea de accidente se poate configura și achiziționa în doar câteva minute, direct pe WhatsApp, fără drumuri la birou.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Cere Emisia pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Suport și Explicații</div>
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
