import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Plane, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Travel Individuală | Cristian Văduva",
  description: "Călătorește fără griji. Asigurarea medicală de călătorie premium te protejează împotriva costurilor medicale externe uriașe, anulării zborurilor și pierderii bagajelor.",
};

export default function TravelIndividualInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="travel-insurance-individual" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-lg glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Plane className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Medicală de Călătorie (Travel)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Fie că pleci într-un city-break la Roma sau într-o expediție de 30 de zile în Thailanda, o banală problemă de sănătate peste hotare poate atrage facturi de zeci de mii de euro. Cumpără-ți liniștea pentru o sumă infimă și bucură-te cu adevărat de vacanța ta.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Emite Polița Travel Acum</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Solicită Detalii pe WhatsApp
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
                Scutul tău medical internațional
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea de călătorie este o poliță pe termen scurt, a cărei valabilitate se suprapune exact pe zilele în care ești plecat din România (ex: 7 zile, 14 zile).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ea reprezintă o garanție asumată de compania de asigurări că va suporta orice cost medical de urgență generat de un accident sau o boală bruscă (apendicită, toxiinfecție, entorsă) survenită pe teritoriul statului străin unde te afli. Mai mult, polițele premium au fost extinse să acopere și riscuri turistice non-medicale (întârzieri bagaje).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Evitarea Colapsului Financiar
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                În Statele Unite sau Dubai, chemarea unei ambulanțe și o operație de urgență pentru o fractură sau un infarct depășesc frecvent suma de 50.000 EUR. Niciun turist obișnuit nu are acești bani disponibili instant pe card.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cardul European de Sănătate de la statul român acoperă doar parțial cheltuielile STRICT în spitalele de stat din Europa (care pot fi supra-aglomerate). Asigurarea privată Travel Generali îți asigură decontarea directă cu spitalele private de top de peste graniță, oriunde pe glob, inclusiv salvarea aeriană (elicopter) de pe pârtia de schi.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui îi este recomandată varianta Individuală?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Orice cetățean care iese din țară trebuie să fie asigurat, dar acest pachet este calibrat perfect pentru:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Backpackeri și Exploratori Solo</h4>
                <p className="text-muted-foreground">Tinerii care pleacă săptămâni întregi în Asia sau America de Sud unde sistemul medical este scump și imprevizibil, având nevoie de asistență 24/7 în limba lor.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Pasionați de City-Break-uri</h4>
                <p className="text-muted-foreground">Care folosesc intensiv liniile low-cost și sunt adesea victimele bagajelor pierdute sau a anulării zborurilor în ultimul moment.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Tineri studenți Erasmus (pachete extinse)</h4>
                <p className="text-muted-foreground">Care pleacă la studii timp de 6 luni într-o țară vestică și necesită acoperire medicală valabilă pe toată durata semestrului.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Practicanți de Sporturi de Iarnă</h4>
                <p className="text-muted-foreground">Schiorii și snowboarderii au nevoie de o extensie specială de risc, având în vedere incidența enormă a fracturilor grave pe pârtiile din Austria sau Italia.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">De ce este indispensabilă?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asistență Telefonică 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când ai o criză medicală la ora 3 dimineața în Turcia, nu trebuie să cauți pe Google. Suni la numărul de pe poliță, un operator român preia cazul și îți trimite o ambulanță sau îți dă adresa celui mai bun spital privat partener.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Decontare Directă (Fără Cash)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  În majoritatea cazurilor grave cu spitalizare, costul nu va fi plătit de tine și decontat ulterior acasă. Compania de asigurări va oferi o "Garanție de Plată" spitalului străin, acoperind integral zecile de mii de euro.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Repatriere Medicală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă ai piciorul fracturat multiplu și nu mai poți zbura pe un scaun normal de avion, Generali suportă aducerea ta în România cu avion medical special (Air Ambulance) sau zbor de linie cu targa instalată și medic însoțitor.
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
                  <div className="font-bold text-foreground mb-1">Boli Acute Neașteptate (inclusiv COVID)</div>
                  <div className="text-sm text-muted-foreground">Orice boală care lovește brusc (toxiinfecție alimentară severă, apendicită, criză biliară, infarct) necesită tratament de urgență. Costurile medicale sunt acoperite până la limita de zeci/sute de mii de Euro.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Accidente (Entorse, Fracturi, Arsuri)</div>
                  <div className="text-sm text-muted-foreground">Ai călcat strâmb pe scările unui muzeu în Roma? Cheltuielile cu camera de gardă, radiografiile, ortezele și tratamentul durerii sunt plătite din asigurare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Storno (Anularea Călătoriei)</div>
                  <div className="text-sm text-muted-foreground">Clauză extraordinară: Dacă îți rupi piciorul sau te îmbolnăvești sever cu 2 zile ÎNAINTE de a zbura, polița îți returnează banii pierduți pe biletele de avion ne-rambursabile și pe hotelul reținut de booking.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt Bagaje / Întârzieri Zbor</div>
                  <div className="text-sm text-muted-foreground">Dacă compania aeriană îți rătăcește bagajul și ajungi în Bali în tricou, polița îți oferă fonduri de urgență (ex: 200 EUR) să îți cumperi haine noi până se găsește geamantanul.</div>
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
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Salvarea Aeriană de la Schi</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alexandru (25 ani) schiază în Austria pe o pârtie neagră. Se dezechilibrează, suferă o fractură de tibie-peroneu și nu mai poate coborî. Salvamontul austriac intervine cu elicopterul. Îl duc la clinica privată din Innsbruck, fiind operat cu tije de titan.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Elicopterul (3.500 EUR), operația (12.000 EUR) și cazarea (2.000 EUR) i-ar fi distrus viața financiară. Datorită poliței care a costat 80 LEI (având bifată acoperirea pentru Sporturi de Iarnă), totul a fost decontat direct între asigurător și spital. Alexandru a revenit acasă doar cu ghips.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Dinți Peste Ocean</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ioana se află la New York într-o călătorie. O doare cumplit o măsea infectată, fiindu-i umflată jumătate de față. La cel mai ieftin dentist din Brooklyn costul de deschidere și tratare de urgență este de 900 USD.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza de "Urgențe Stomatologice" preia costul medicamentației și al intervenției care înlătură infecția și durerea (în general limitată la sume fixe de urgență), permițându-i Ioanei să se bucure de vacanță și să-și termine tratamentul definitiv în România la întoarcere.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Un partener cu greutate globală (Europ Assistance)</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Când ești vulnerabil pe un alt continent, nu ai nevoie de aplicații care nu merg, ci de un dispecerat operațional care preia imediat șocul în limba ta.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Soluționare prin Europ Assistance</h4>
                <p className="text-muted-foreground leading-relaxed">Generali utilizează rețeaua mondială Europ Assistance care are contracte directe cu zeci de mii de spitale. Ei negociază și avizează "Garanția de Plată" în câteva ore, astfel încât spitalul internațional să nu te preseze financiar.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Asigurare de Răspundere Civilă în Străinătate</h4>
                <p className="text-muted-foreground leading-relaxed">Polițele premium Generali includ și răspunderea ta civilă. Dacă mergi pe trotinetă închiriată în Paris și lovești grav un pieton care te dă în judecată pentru sute de mii de euro, polița suportă despăgubirea.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Emitere Electronică Instantanee</h4>
                <p className="text-muted-foreground leading-relaxed">Ai uitat complet să îți faci asigurare? O emitem rapid digital și o ai valabilă pe email chiar dacă tu aștepți deja la coadă la poarta de îmbarcare a aeroportului. (Doar să o emiți ÎNAINTE să decolezi din România).</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt deja plecat în vacanță (mă aflu în Spania), pot să-mi fac acum asigurarea pe telefon?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. Aproape toate companiile serioase interzic emiterea polițelor DACĂ ai părăsit deja teritoriul României, deoarece tentația fraudei este enormă (oamenii se rănesc grav fără asigurare, sună repede în țară, emit polița în 5 minute, și apoi merg la urgențe mințind că tocmai au căzut). Asigurarea trebuie încheiată cât timp tu încă ești geografic în România.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Polița îmi va acoperi tratamentul dacă îmi uit acasă pastilele pentru inimă?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. Polițele de călătorie acoperă BOLI ACUTE NEAȘTEPTATE (infecții, entorse). Agravarea unei "boli cronice" știute de tine anterior plecării (ex. ai astm cronic sau hipertensiune și nu ți-ai luat medicația la timp) reprezintă adesea excludere. Există excepții dacă puseul cronic îți pune direct viața în pericol de moarte (resuscitare primară).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cum funcționează clauza Storno la biletul de avion?</h3>
                <p className="text-muted-foreground leading-relaxed">Atenție! Pentru a activa opțiunea "Storno" (recuperarea banilor pe vacanță dacă se întâmplă o tragedie medicală ÎNAINTE să pleci), legea cere ca polița de asigurare să fie cumpărată cu maxim 2-3 zile lucrătoare de la momentul în care ai achitat prima tranșă a pachetului turistic (sau zborului). Nu poți cumpăra zborul în ianuarie și să faci asigurarea Storno abia în august când te-ai îmbolnăvit, încercând să recuperezi banii. Trebuie emisă din timp!</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Călătorește în Siguranță Deplină</h2>
            <p className="text-xl text-muted-foreground">Investește câțiva lei pe zi pentru a-ți proteja toți banii din bancă de costuri uriașe nedorite.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Obține Polița Travel Imediat" />
            </div>
            
            <div className="glass rounded-lg p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Simplu, pe WhatsApp</h3>
              <p className="text-muted-foreground mb-8">
                Ne trimiți doar poza buletinului, perioada deplasării, țara de destinație (Europa sau Mondial) și dacă vei practica sporturi de iarnă.
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
                    <div className="text-sm text-blue-700 font-medium">Asistență Emitere Imediată</div>
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
