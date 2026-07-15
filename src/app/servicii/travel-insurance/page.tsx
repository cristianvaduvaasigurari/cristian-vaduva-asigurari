import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Plane, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurări Travel beneficiu | Cristian Văduva",
  description: "Liniște deplină oriunde călătorești, cu protecție medicală la nivel internațional și clauză storno beneficiu.",
};

export default function TravelInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Plane className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurări Travel Internaționale
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Călătoriile tale de afaceri sau vacanțele de lux trebuie să fie strict despre relaxare și experiențe. Elimină complet riscul unui faliment personal generat de o spitalizare de urgență în străinătate sau de un zbor intercontinental anulat. O asigurare travel beneficiu îți decontează absolut orice grijă financiară în altă țară.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Cere Ofertă Asigurare Travel</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează-ne Rapid
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
                Ce acoperă acest pachet?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea Travel este un contract scut temporar (pe durata strictă a unei călătorii) sau valabil un an întreg (Multi-Trip) care decontează costurile actului medical de urgență efectuat în afara României.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mai mult decât atât, prin opțiunile Storno, compensează pierderile logistice uriașe: recuperarea banilor pe bilete de avion sau cazări plătite în avans pe care nu le mai poți onora, refacerea documentelor pierdute sau acoperirea bagajului furat la destinație.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Sănătatea dincolo de granițe
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Tratamentele medicale de urgență în afara României sunt exorbitante. Dacă sistemul medical privat de aici ți se pare scump, în țări precum SUA, Elveția sau Canada, costurile sunt devastatoare.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                O simplă operație de apendicită cu o zi de spitalizare în Statele Unite poate depăși cu ușurință suma de 40.000 - 50.000 USD. Lipsa unei polițe travel care costă doar zeci de euro te va obliga să achiți din buzunar aceste sume sau chiar să nu fii tratat la nivelul cuvenit fără avans financiar.
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
              Absolut niciun bilet de avion nu ar trebui validat fără a avea și o poliță travel atașată. Pachetul servește impecabil pentru:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familii și Turiști (Leisure)</h4>
                <p className="text-muted-foreground">O enterocolită agresivă luată de la resort, o otită a copilului la plajă sau o fractură într-un oraș străin strică toată vacanța. Asigurarea preia instant costul spitalului străin.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Profesioniști pe drumuri (Business)</h4>
                <p className="text-muted-foreground">Opțiunea Multi-Trip permite plata unei singure polițe la început de an care te protejează 12 luni, de fiecare dată când ieși din țară la o conferință internațională.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Pasionați de Sporturi de Iarnă/Extreme</h4>
                <p className="text-muted-foreground">Accidentările la schi sau la scufundări necesită adesea asistență salvamont/elicopter. Costul acestor intervenții ajunge la sume foarte ridicate, care sunt acoperite 100%.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Femei Însărcinate</h4>
                <p className="text-muted-foreground">Generali acoperă complicațiile neprevăzute ale sarcinii ce apar în străinătate până în săptămâna a 26-a inclusiv.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">De Ce Oferim Confort Suprem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asistență Permanentă 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu ești lăsat de izbeliște. Suni la centrala telefonică din România și operatorul tău va lua direct legătura cu spitalul din destinația ta, traducând și garantând plata.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Anulare Storno Simplă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă ai plătit 4.000 Euro pe o vacanță în Maldive și faci o toxiinfecție alimentară cu 2 zile înainte de zbor, nu pierzi banii. Asigurătorul îți rambursează costurile.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Decontare Directă vs Rambursare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pentru sume ce depășesc nivelul unor simple pastile, compania transferă direct banii către spitalul tău internațional. Nu trebuie să lași garanție din propriul portofel.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce riscuri te lasă fără bani în străinătate?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Spitalizare și Tratamente de Urgență</div>
                  <div className="text-sm text-muted-foreground">Accidente fizice grave, crize acute organice (ex: colecist), afecțiuni respiratorii severe (inclusiv COVID-19 luat în vacanță).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Repatriere Medicală de Lux</div>
                  <div className="text-sm text-muted-foreground">Dacă tratamentul optim nu este disponibil în acea țară, ești urcat într-un zbor comercial medicalizat sau elicopter privat pentru a fi adus în siguranță înapoi acasă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Anulare și Întârziere Zbor</div>
                  <div className="text-sm text-muted-foreground">Dacă se anulează vacanța (Storno din motive de boală, deces rudă) sau zborul tău e întârziat peste 12 ore și ratezi o noapte de cazare pre-plătită.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt de Bagaje / Documente</div>
                  <div className="text-sm text-muted-foreground">Ești despăgubit cu sume fixe pentru a-ți reface garderoba pierdută de compania aeriană și a achita noile taxe consulare pentru pașaportul furat.</div>
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
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Accidentul pe Pârtia din Austria</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Dan are un accident sever pe pârtia din Ischgl și își fracturează grav femurul. Patrula montană îl preia cu snowmobilul, iar spitalul local impune o intervenție chirurgicală care costă 12.000 EUR plus costurile de recuperare.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având sporturile de iarnă bifate pe poliță, familia sună la numărul de pe contract. Generali trimite "scrisoarea de garanție de plată" către spitalul austriac. Dan este operat excelent iar 12.000 EUR sunt transferați curat din Italia către Austria. Costul poliței lui Dan fusese sub 30 Euro.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Vărsatul de Vânt strică Caraibele</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Soții Enache plătesc 6.000 EUR pentru o destinație de lux în Republica Dominicană alături de copilul lor de 5 ani. Cu 3 zile înainte de zbor, copilul face febră mare fiind diagnosticat cu o boală infecțioasă contagioasă (varicelă). Ei nu pot urca în avion sub nicio formă.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deși agenția de turism nu le dăduse niciun ban înapoi (fiind bilete no-refund la doar 3 zile distanță), ei au apelat la opțiunea Storno de la Generali. Au depus actele medicale doveditoare, iar contul lor a fost creditat cu cei 6.000 EUR în scurt timp.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Puterea Grupului Generali la Nivel Global</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Atunci când ești în altă țară, nu contează doar valoarea asigurării pe hârtie, ci și dacă spitalul din acea țară a auzit vreodată de compania ta de asigurări.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Europ Assistance 24/7</h4>
                <p className="text-muted-foreground leading-relaxed">Europ Assistance face parte din grupul Generali și este pionierul asistenței internaționale. Rețeaua lor globală le permite să vorbească direct cu mii de spitale din absolut orice țară de pe planetă.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Limitele Majore</h4>
                <p className="text-muted-foreground leading-relaxed">Asigurările noastre permit configurarea unor limite formidabile de sute de mii de euro, fiind capabile să acopere intervenții neurochirurgicale de extremă necesitate în cele mai exclusiviste spitale străine.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Fără Plăți din Buzunar</h4>
                <p className="text-muted-foreground leading-relaxed">Spitalele din afară acceptă imediat confirmarea de plată directă a Generali datorită standing-ului financiar corporativ (A++). Tu ești considerat un pacient asigurat prioritar, nu doar un turist în tranzit.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (FAQ)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă am un card bancar Gold cu Travel inclus, de ce să mai iau asigurare?</h3>
                <p className="text-muted-foreground leading-relaxed">Cardurile beneficiu bancare au limite foarte stricte și predefinite de despăgubire (uneori doar de 15.000 EUR sau 30.000 EUR) pe care foarte puțini citesc să le înțeleagă. Dacă spitalizarea în Dubai te va costa 50.000 EUR, banca plătește 30K iar tu diferența. O poliță de travel dedicată Generali se poate face cu limite de la 50.000 la sute de mii de euro, și include extra beneficii Storno.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce trebuie să fac imediat cum mă îmbolnăvesc în vacanță?</h3>
                <p className="text-muted-foreground leading-relaxed">Trebuie să suni OBLIGATORIU la numărul de urgență (Call Center Europ Assistance) scris mare pe polița pe care ai primit-o pe email. Ei îți vor crea dosarul de daună pe loc, te vor îndruma spre cel mai apropiat spital din contractele lor și vor da semnalul de acceptare la plată direct la casieria lor.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Când se poate cumpăra clauza de anulare (Storno)?</h3>
                <p className="text-muted-foreground leading-relaxed">Clauza Storno funcționează doar dacă ai cumpărat polița Generali fie ODATĂ cu cumpărarea primei fracții din pachetul turistic (biletul de avion sau avansul la cazare), fie cu maxim 3 zile distanță de la achiziția pachetului, conform limitelor contractuale.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Pregătit Pentru Zbor?</h2>
            <p className="text-xl text-muted-foreground">O poliță beneficiu emisă electronic direct pe telefonul tău în câteva minute.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Oferta Online pentru Travel" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Instant</h3>
              <p className="text-muted-foreground mb-8">
                Ne scrii unde zbori și când zbori. Vom returna prețul poliței garantate și documentul gata activat.
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
                    <div className="text-sm text-blue-700 font-medium">Asistență Permanentă</div>
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
