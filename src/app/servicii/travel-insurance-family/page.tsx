import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Palmtree, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Travel Familie | Cristian Văduva",
  description: "Protecție completă pentru vacanțele cu copiii. Pachete integrate care acoperă medical toată familia la un tarif optimizat, inclusiv clauză Storno.",
};

export default function TravelFamilyInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-orange-600 mb-8 border border-border bg-orange-50">
              <Palmtree className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurare de Călătorie (Pachetul Family)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când călătorești alături de copii, gradul de risc și imprevizibil crește exponențial. De la viroze luate în resort la enterocolite acute apărute noaptea, Pachetul Travel Family pune imediat un medic străin la dispoziția copilului tău, protejând integral bugetul vacanței familiei.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Asigură-ți Toată Familia</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează Consultantul Tău
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
                Un singur contract, protecție unificată
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Pachetul Travel Family nu înseamnă emiterea a 4 polițe separate pentru mama, tata și doi copii, ci este un pachet agregat, un singur număr de dosar, gândit special pentru a acorda discounturi de volum familiilor care pleacă împreună la drum.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este structurată pentru a absorbi cele mai frecvente incidente pediatrice în afara granițelor: otite de la piscina hotelului din Antalya, insolații, viroze respiratorii, toxiinfecții alimentare, suportând chemarea medicului direct în camera de hotel sau internarea copilului.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Riscul Financiar al Anulării (Storno)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Principala spaimă a părinților este "Ce mă fac dacă copilul face febră 40 cu o noapte înainte să zburăm?". Pachetele Family achiziționate din timp au inclusă clauza Storno.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dacă un medic pediatru român recomandă interdicția călătoriei din cauza unei infecții acute la copil, Generali vă rambursează costul uriaș al pachetului turistic (biletele de avion, resortul din Egipt All-Inclusive) pe care agenția de turism refuza să vi le mai returneze pe motiv de "no-show".
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
              Profilul clienților care apelează la acest pachet este clar conturat:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familii cu Preșcolari (0 - 6 ani)</h4>
                <p className="text-muted-foreground">Vârsta la care expunerea virală este maximă, iar riscul ca cel mic să contacteze un virus la locul de joacă din hotel este imens.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Iubitorii de "Egipt, Turcia, Tunisia"</h4>
                <p className="text-muted-foreground">Țări din afara Uniunii Europene unde Cardul Național de Sănătate de Stat (EHIC) este complet ZERO (nu este recunoscut). Asigurarea privată fiind singura opțiune reală.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinții precauți cu bugete de vacanță</h4>
                <p className="text-muted-foreground">Care plătesc în februarie pachete "Early Booking" ieftine pentru august, și au nevoie neapărată de protecție Storno în caz de neprevăzut apărut în cele 6 luni de așteptare.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familiile mari (2-3+ copii)</h4>
                <p className="text-muted-foreground">Unde discounturile de emitere grupată familială scutesc zeci de Euro din bugetul general de asigurare față de cumpărarea individuală.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției în Familie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Medic la Hotel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când copilul vomită, nu te poți plimba cu el în taxi prin căldura din Antalya căutând spitale. Suni la Generali/Europ Assistance, iar aceștia trimit în scurt timp un medic rezident partener direct în camera ta de resort pentru evaluare și rețetă.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensie COVID/Boli Infecțioase</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă destinația dictează auto-izolare, iar unul din membri familiei a contractat o boală infecțioasă, polițele beneficiu pot suporta inclusiv prelungirea forțată a cazării la hotel și bilete de avion noi pentru reîntoarcere peste câteva zile.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Costul Medicamentelor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tratamentul (antibiotice, loțiuni speciale) prescris de medicul curant străin pentru rezolvarea afecțiunii de urgență poate fi cumpărat de tine de la farmacia locală, iar Generali îți returnează banii pe baza bonului fiscal.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de incidente protejează?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Afecțiuni Uzuare de Vacanță</div>
                  <div className="text-sm text-muted-foreground">Inclusiv otitele medii provocate de apa piscinelor, arsurile solare extrem de severe care necesită intervenție, toxiinfecțiile cu diaree acută generatoare de deshidratare și spitalizare infantilă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Accidentele Familiale</div>
                  <div className="text-sm text-muted-foreground">Copilul care alunecă pe faianța din baie și are nevoie de cusături, tatăl care își luxează glezna la un meci de volei pe plajă. Totul acoperit în limită maximă (ex: 50.000 EUR).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Evacuare sau Repatriere</div>
                  <div className="text-sm text-muted-foreground">Dacă tatăl este operat de apendicită în Dubai, va sta imobilizat 7 zile. Compania acoperă returnarea celorlalți membri ai familiei în țară mai devreme (dacă au pierdut zborul original) sau repatrierea tatălui alături de restul familiei cu medic.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pierderea sau Deteriorarea Cărucioarelor / Bagajelor</div>
                  <div className="text-sm text-muted-foreground">Polițele complexe Family acoperă întârzierea valizelor pline cu lapte praf sau haine esențiale pentru copil, virând bani de urgență pentru achiziția lor din primele 24 de ore de la aterizare.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Valoarea Reală a Liniștii
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Enterocolita din Turcia</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Familia se bucură de regimul Ultra-All-Inclusive în Antalya. Fetița de 3 ani face enterocolită severă vineri noaptea. Cabinetul medicului din hotel (fără contracte) cere o sumă imensă doar pentru a o consulta superficial.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Tatăl sună la numărul internațional Generali. Aceștia trimit o ambulanță privată (inclusă în poliță) care o transferă pe fetiță și mamă la Spitalul Anadolu (unul din cele mai moderne din lume). Este ținută pe perfuzii 2 zile. Cost total spitalizare 2500 EUR, acoperit de Generali printr-o garanție de plată directă la externare. Copilul e stabilizat, vacanța e salvată de faliment.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Vărsatul de Vânt Pre-Vacanță</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mai sunt 4 zile până la zborul spre Spania care a costat familia 3000 EUR cumpărat încă din iarnă. Băiatul cel mare se umple de vărsat de vânt (varicelă), fiind foarte contagios. Doctorul interzice zborul. Pachetul devine nefolosibil.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Întrucât tatăl a cumpărat asigurarea Family cu Opțiunea STORNO bifată la timp, compania de asigurări îi despăgubește cei 3000 EUR (mai puțin o mică franșiză) blocați la agenție. Odată copilul vindecat, familia poate cumpăra altă vacanță.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Un partener ideal pentru siguranța copiilor</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Pediatria și asistența familiilor sunt domenii unde expertiza Generali prin rețeaua Europ Assistance excelează prin empatie și viteză de acțiune.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Asistență Exclusivă în Română</h4>
                <p className="text-muted-foreground leading-relaxed">Nu ești obligat să explici simptomele copilului cuiva în engleză la 4 dimineața. Operatorul central de la asistență vorbește limba română și te îndrumă calm.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Acoperire Mondială Extinsă</h4>
                <p className="text-muted-foreground leading-relaxed">Putem bifa emisii pentru destinații exotice "Risky" precum Zanzibar, Maldive, America Centrală unde costurile transportului aerian sanitar privat pe alte continente sunt colosale.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Preț Corect (Discount Familie)</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemele de emitere aplică discounturi de volum care pot atinge și 20-30% din total, făcând ca o protecție de 10 zile în Europa pentru 2 adulți și 2 copii să coste derizoriu raportat la bugetul general al vacanței.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Părinți</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Asigurarea plătește consultația preventivă dacă cel mic tușește puțin, dar nu are febră?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. Polița de călătorie este strict destinată "Urgențelor Medicale Severe și Imprevizibile" (ex. otite violente, vărsături, accidente). Ea nu este concepută pentru a substitui medicul de familie cu analize de rutină la banală tuse. Medicul străin care evaluează cazul declară dacă afecțiunea reprezenta o urgență ce necesita tratament imediat.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă mergem pe cont propriu la cel mai apropiat spital (din grabă), fără să sunăm la asistență înainte?</h3>
                <p className="text-muted-foreground leading-relaxed">Dacă viața e în pericol iminent (șoc, accident rutier sever) este normal să furați prima ambulanță, legea permite asta. Dar la spitalizarea simplă, dacă nu anunți compania ÎN TERMEN DE 24 DE ORE ca aceștia să preia comunicarea, ai putea plăti tu toată factura masivă din banii tăi, iar compania din România ar putea reduce considerabil sau refuza suma rambursată ulterior din cauza depășirii grilelor standard.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pachetul acoperă sporturile acvatice (Banana boat, Scuba, Paragliding pe plajă)?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița standard de Travel acoperă relaxarea (înot în piscină sau în mare). Sporturile extreme practicate în vacanță necesită activarea explicită (prin bifare la cumpărare și plata unei suprataxe de risc) a opțiunii de "Sporturi Agrement". Altfel, un accident grav cu ski-jet-ul nu va fi despăgubit!</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Finalizează Dosarul Vacanței</h2>
            <p className="text-xl text-muted-foreground">În 5 minute primești polițele tuturor membrilor direct în format electronic (PDF).</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Tarif Travel Familial" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite înainte cu cel puțin o zi</h3>
              <p className="text-muted-foreground mb-8">
                Cea mai sigură procedură (mai ales pentru varianta cu Storno) este emiterea imediat după plata primului avans la Agenția de Turism. Trimite pozele cu buletinele / certificatele de naștere direct pe WhatsApp.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Documentele pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Vacanță (Consultanță)</div>
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
