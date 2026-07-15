import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { CarFront, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare CASCO beneficiu | Cristian Văduva",
  description: "Scutul total pentru autoturismul tău. Protecție împotriva propriilor greșeli, furtului, vandalismului și fenomenelor meteo extreme.",
};

export default function CascoInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <CarFront className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea CASCO beneficiu
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              În timp ce RCA te acoperă atunci când îi lovești pe alții, CASCO acoperă greșelile tale. Elimină emoțiile zgârieturilor din parcare, gheții cazute pe parbriz sau a accidentelor din culpa ta exclusivă prin reparații la reprezentanțe autorizate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Evaluează Mașina pentru CASCO</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Cere Cotație Personalizată
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
                Diferența majoră față de RCA
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                CASCO (Casualty and Collision) este o asigurare facultativă care protejează EXCLUSIV autoturismul tău. Nu contează cine este vinovat de daună. Fie că ai intrat tu cu mașina într-un stâlp, fie că ai găsit-o vandalizată în parcare de un autor necunoscut, CASCO îți achită reparația.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este instrumentul suprem de păstrare a valorii mașinilor noi, preluând imediat costurile uriașe ale elementelor de caroserie moderne (faruri LED, radare distronic) care altfel ar costa mii de euro.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Garanția Păstrării Valorii
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Orice lovitură care afectează structura vehiculului, reparată în regie proprie ieftin, reduce dramatic valoarea de revânzare a autoturismului. Polița CASCO impune repararea în service-uri recunoscute și utilizarea exclusivă de piese de origine (OEM).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mai mult, în cazul riscului absolut: Furtul, compania de asigurări îți virează în cont întreaga sumă la care era evaluată mașina în acel an, permițându-ți să îți achiziționezi alta similară fără să ajungi falit.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cine are nevoie de CASCO?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deși optimă pentru mașinile noi, piața de CASCO s-a adaptat flexibil și pentru vehicule rulate:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Mașini în Leasing (Obligatoriu)</h4>
                <p className="text-muted-foreground">Firmele de leasing impun o poliță CASCO full pe toată durata contractului, pentru a-și proteja bunul până la ultima rată și trecerea în proprietatea ta.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Vehicule Noi și beneficiu</h4>
                <p className="text-muted-foreground">Proprietarii de SUV-uri și limuzine la care înlocuirea unei bare frontale cu senzori depășește frecvent 3000 de Euro, sumă nejustificat de suportat din propriul buzunar.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Mașini Electrice (EV)</h4>
                <p className="text-muted-foreground">Pachetele bateriilor sunt extrem de sensibile și scumpe (uneori 50% din valoarea mașinii). O avariere sub așasiu necesită acoperire specializată de risc.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Șoferi fără garaj propriu</h4>
                <p className="text-muted-foreground">Cei care parchează stradal și se expun zilnic la zgârieturi de cheie, oglinzi rupte noaptea de trecători sau grindină de vară.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Sistemul de Decontare și Reparație</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Aprobare Rapidă și Fără Boli de Cap</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lăsarea mașinii direct în reprezentanța auto. Servicul încarcă pozele cu dauna în platforma asigurătorului, care aprobă devizul în 24-48h, după care se lansează piesele în comandă.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Regimul Franșizei</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Poți opta pentru o poliță mult mai ieftină adăugând o "franșiză" (ex: tu plătești primii 100 EUR din orice daună minoră, iar compania plătește restul de 4900 EUR pentru restul reparației majore).
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperire Extracarosanieră</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu include doar tabla. Polițele beneficiu (cum e cea de la Generali) acoperă avarierea jantelor de aliaj în gropi (prin extinderi) și riscul scurtcircuitelor pe instalația electrică.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Gama Completă de Daune Despăgubite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Avarii accidentale (Coliziune)</div>
                  <div className="text-sm text-muted-foreground">Indiferent dacă lovești o mașină frontal, scapi controlul în șanț pe zăpadă sau zgârii masiv portierele pe un stâlp subteran.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt (Total sau Parțial)</div>
                  <div className="text-sm text-muted-foreground">Dispare mașina cu totul din fața casei sau găsești noaptea lipsă oglinzile electrice, farurile cu laser, sistemul de navigație smuls din bord sau roțile.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Fenomene Naturale</div>
                  <div className="text-sm text-muted-foreground">Grindină masivă care îndoaie tot plafonul, inundații pe stradă care pătrund la motor, sau un copac prăbușit pe mașină din cauza furtunii.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Vandalism (Autor Necunoscut)</div>
                  <div className="text-sm text-muted-foreground">Situația clasică urbană: cobori dimineața și găsești mașina zgâriată intenționat cu o cheie pe absolut toate cele 4 portiere. RCA-ul nu te ajută cu nimic. Casco vopsește integral.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Evitarea Falimentului
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Impactul la viteză</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cristian a pierdut controlul direcției pe ploaie și a intrat cu Audi-ul său (evaluat la 35.000 EUR) într-un parapet de pe autostradă, distrugând fața (radiatoare, radare, aripi, faruri). Deviz: 12.000 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Nefiind nicio altă mașină implicată, polița RCA este complet inutilă. Dacă nu ar fi avut CASCO, Cristian ar fi trebuit să scoată 12.000 EUR din buzunar sau să vândă mașina ca epavă. Cu polița CASCO Generali, el plătește doar franșiza setată de el (ex. 150 EUR), restul fiind suportat de Generali prin transfer direct către reprezentanța Audi.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Piatra în parbriz cu încălzire</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O pietricică sare din roata unui TIR din față, provocând o stea enormă în câmpul vizual al șoferului pe un parbriz cu încălzire, head-up display și camere de detecție. Cost parbriz nou original: 2.200 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza specială de "Elemente Vitrate" din CASCO acoperă direct înlocuirea parbrizului (uneori chiar și fără aplicarea franșizei contractuale), calibrarea camerelor și manopera, clientul plătind 0.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">O poliță CASCO beneficiu, fără chichițe ascunse</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Cel mai rău scenariu este să plătești mii de euro anual pe un Casco și asigurătorul să încerce să trimită mașina la "ateliere partenere de garaj" în loc de reprezentanță. Generali respectă standardul mașinii.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Piese 100% Originale</h4>
                <p className="text-muted-foreground leading-relaxed">Polița beneficiu Generali îți garantează că la mașinile cu o anumită vechime maximă înlocuirea se va face exclusiv cu piese noi cu sigla producătorului tău auto, păstrând garanția de fabrică.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Reprezentanțe Autorizate</h4>
                <p className="text-muted-foreground leading-relaxed">Ai libertatea (confirmată contractual) de a duce autoturismul direct în rețeaua oficială a producătorului tău, unde devizele ridicate nu sunt refuzate la plată.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Inspecție Digitală Video</h4>
                <p className="text-muted-foreground leading-relaxed">La emiterea poliței pentru o mașină rulată, nu mai trebuie să vii la sediu. Îți trimitem un link securizat prin care filmezi chiar tu mașina 360 de grade cu telefonul tău pentru a se nota zgârieturile existente.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă mașina se strică (se rupe motorul din mers)? Despăgubește CASCO?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. CASCO este strict o asigurare de "Avarii Accidentale" din cauze externe. Uzura internă a motorului, cedarea turbinei sau ruperea ambreiajului țin de "Garanția tehnică" a producătorului auto sau pur și simplu de bugetul propriu de întreținere. Exceptând situația în care motorul s-a distrus pentru că ai lovit frontal un copac (cauză externă violentă).</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pot să asigur CASCO o mașină veche de 15 ani?</h3>
                <p className="text-muted-foreground leading-relaxed">Companiile de top precum Generali limitează de regulă emiterea polițelor Full Casco pentru mașini mai vechi de 10-12 ani, deoarece riscul de daună totală (deviz reparație mai mare decât valoarea mașinii pe piață) devine aproape garantat la orice lovitură minoră. Pentru cele vechi există opțiuni Casco Mini (strict furt/totală).</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă beau alcool, fac accident cu mașina mea. Casco mă despăgubește?</h3>
                <p className="text-muted-foreground leading-relaxed">ABSOLUT NU. Conducerea sub influența alcoolului sau a stupefiantelor, conducerea fără permis valabil, folosirea mașinii la curse neautorizate, reprezintă excluderi generale drastice. Compania va refuza plata oricărei despăgubiri, contractul fiind anulat din vina ta exclusivă, penală.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Emite Cotația Casco</h2>
            <p className="text-xl text-muted-foreground">Calculează cât costă liniștea ta absolută în trafic și în parcare.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Trimite Detalii Mașină" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Pachetul de Protecție beneficiu</h3>
              <p className="text-muted-foreground mb-8">
                Te vom contacta cu oferta de preț, nivelul tranșelor și valoarea exactă la care este evaluată mașina ta astăzi în cataloagele de specialitate (Schwacke / Eurotax).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Talon pentru Calcul</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Specializată Auto</div>
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
