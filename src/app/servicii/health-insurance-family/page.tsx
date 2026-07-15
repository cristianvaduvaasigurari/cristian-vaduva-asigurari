import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Baby, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Sănătate Familie | Cristian Văduva",
  description: "Tratamente fără compromisuri la privat pentru toată familia ta, de la pediatrie premium pentru cei mici, la expertiză complexă pentru adulți.",
};

export default function HealthFamilyInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="health-insurance-family" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-rose-600 mb-8 border border-border bg-rose-50">
              <Baby className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurare Medicală pentru Familie
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când copilul face febră mare în miez de noapte, vrei să ajungi direct la o clinică de pediatrie premium, civilizată, curată și rapidă. Protecția de sănătate agregată "Family" îți garantează acces gratuit în elita clinicilor private pentru toți membrii gospodăriei sub același contract.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Proiectează Protecția Familiei</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Consultare Pediatrică / Adulți
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
                Umbrela Comună de Asigurare
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița Family este practic o extensie strategică a unei polițe individuale, care include pe același contract soțul/soția/partenerul și, cel mai important, copiii minori, la un tarif consolidat care aplică reduceri semnificative de volum față de cumpărarea de polițe individuale.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este structurată pentru a absorbi cele mai dese motive de consum medical în familiile tinere: consultațiile frecvente la medicul pediatru, testele rapide pentru infecții respiratorii de sezon, vaccinările, dar și analizele amănunțite de fertilitate și prevenție pentru părinți.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Coșmarul Saloanelor Comune
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Milioane de părinți sunt nevoiți anual să treacă prin sistemul spitalicesc de stat alături de copiii lor în saloane supraaglomerate, cu riscul infecțiilor nosocomiale încrucișate. Polița privată anihilează acest scenariu sumbru.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea Generali îți finanțează decontarea integrală a internării copiilor la cele mai bune spitale private de pediatrie din țară. Veți avea rezervă single (mama și copilul), curățenie impecabilă, meniuri personalizate și vizitele medicilor exact la ora programată, fără umilințe.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Profilurile ideale ale asiguraților Family
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul acoperă multiplele stadii de dezvoltare ale unei familii moderne și responsabile:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Cupluri tinere la început de drum</h4>
                <p className="text-muted-foreground">Care au nevoie de susținere medicală masivă pentru planificarea sarcinii, analize hormonale genetice, ecografii de sarcină de înaltă rezoluție, incluse în pachetele extinse.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinți cu preșcolari</h4>
                <p className="text-muted-foreground">Copiii de grădiniță racesc de 6-8 ori pe an. Analizele exsudatului și vizitele pediatrice repetate secătuiesc cardurile de credit dacă sunt plătite constant la privat.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Adolescenți activi</h4>
                <p className="text-muted-foreground">Sunt predispuși la mici accidentări sportive (ortopedie), probleme dermatologice hormonale (acnee) și care necesită consultații oftalmologice și stomatologice periodice.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Părinții "Sandwich Generation"</h4>
                <p className="text-muted-foreground">Adulții (35-50 ani) care muncesc din greu și sunt supuși stresului cronic, având un necesar critic de analize cardiologice anuale și scanări preventistice pentru cancer.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Unificarea Standardului de Viață</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Discounturi Agregate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generali oferă de obicei un preț mult mai bun (reducere per capita) pentru includerea copiilor minori în contract față de situația în care fiecare adult ar cumpăra o poliță individuală complet separată.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cazare pentru Însoțitor (Părinte)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când copilul trebuie să petreacă noaptea în spital la privat (ex. pentru o enterocolită gravă care necesită perfuzii), patul și mesele părintelui sunt decontate integral în aceeași rezervă.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Vaccinări Extinse</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pachetele premium de sănătate Generali acoperă vaccinurile opționale moderne, vitale (precum Rotavirus, Meningococ), care în mod normal la pediatru depășesc suta de euro pentru fiecare doză.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Acoperirile Majore Ale Bazei Medicale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Maternitate Premium (clauză opțională)</div>
                  <div className="text-sm text-muted-foreground">Preluarea dosarului pre-natal masiv și achitarea integrală a pachetului de naștere (Cezariană/Naturală) de 15.000 LEI de la maternitățile de lux, condiționată strict de o perioadă de așteptare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Chirurgia Polipilor și Amigdalelor (Sfera ORL)</div>
                  <div className="text-sm text-muted-foreground">Una din cele mai frecvente intervenții medicale infantile. Polița decontează anestezia ușoară de tip privat și lucrul chirurgilor renumiți ORL.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ortopedia post-accident</div>
                  <div className="text-sm text-muted-foreground">Radiografii complexe la brațele sau genunchii copiilor vătămați la joacă, urmate de aplicarea feșelor sau aparatelor gipsate de ultimă generație din fibră ușoară.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ecografii 3D și Investigatii de performanță</div>
                  <div className="text-sm text-muted-foreground">Medicina avansează, Generali decontează. Investigarea complexă prin analize care nu sunt trecute pe micile și prăfuitele tabele CNAS.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Economia Familiei, Protejată
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Enterocolita Virală</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alex, 4 ani, face viroză și se deshidratează periculos vineri seară. Părinții nu vor să meargă la stat. Îl duc la un spital privat exclusiv pentru copii. Cost: triaj 400 RON + perfuzii și internare 2 zile: 3.500 RON.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având polița Generali cu decontare directă, tatăl predă doar buletinul la recepție. Generali plătește factura de 3.900 RON în timp ce părinții își țin băiețelul curat și stabilizat într-o rezervă superioară.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Pachetul Anual al Părinților</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A venit toamna și ambii soți, Radu (40 ani) și Diana (38 ani) decid să facă controlul tehnic anual al sănătății (Check-up). Teste Papanicolau, mamografii, teste efort EKG, analize de tiroidă și ecografie completă de abdomen. Preț cumulat la liber în privat: 3.200 LEI.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Prin contractul Family Generali au dreptul anual necondiționat la reevaluarea totală ambulatorie. Banii pe care i-ar fi dat din buzunar depășesc deja jumătate din prețul anual al poliței. Acum au analizele la zi gratuit.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Accesul direct către experții în Pediatrie</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Sănătatea copiilor este delicată. Ai nevoie de acces în clicile private de elită din marile reședințe județene care atrag marii specialiști de profil din România.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Peste 700 de Parteneri</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemul Generali are contractare masivă și prezență extinsă. Poți ajunge la medicul care te tratează demult, fiind foarte mare șansa ca el să lucreze cu casa noastră de asigurări private.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Sistemul Hibrid Liber</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă doctorul chirurg pediatru ultra-specialist acceptă cazuri doar la clinica sa independentă fără contracte cu asiguratori, asiguratul va plăti suma respectivă (ex. 6.000 Lei operația), Generali transferându-i banii înapoi pe cardul bancar ulterior pe baza chitanței fiscale.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Consultanță Medicală Video</h4>
                <p className="text-muted-foreground leading-relaxed">Când copilului îi apar bubițe, nu vrei să mergi fizic în sala de așteptare plină cu alți copii, riscând agravări virale. Generali îți finanțează direct consultația prin Video-Call în platformele de Telemedicină (ex. Medicentrum).</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (Părinți)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pot să fac asigurarea DOAR pentru copilul mic? Adulții sunt sănătoși.</h3>
                <p className="text-muted-foreground leading-relaxed">Asigurătorii internaționali interzic sau descurajează acest procedeu de selecție strictă a riscului. Copiii pot fi asigurați cu ușurință pe o poliță doar împreună cu minim unul dintre părinți ca "asigurat principal". Scopul protecției este siguranța familială agregată.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt însărcinată în 3 luni, aflu despre voi. Pot face asigurarea să îmi plătească nașterea?</h3>
                <p className="text-muted-foreground leading-relaxed">Din păcate, NU. Riscul maternității prezintă o excludere dură de "Perioadă de Așteptare" (waiting period) de regulă de minim 9-10 luni de la emiterea poliței, tocmai pentru a evita achiziționarea produsului strict de către persoanele deja gestante care "cumpara" un profit instantaneu. Polița se contractează PREVENTIV.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Băiețelul meu poartă ochelari, reînnoirea lentilelor e acoperită?</h3>
                <p className="text-muted-foreground leading-relaxed">Consultul oftalmologic pentru diagnostic (dioptrie etc.) este integral decontat la privat. Achiziția materială (ramele, sticla propriu-zisă) nu sunt plătite de niciun pachet medical majoritar, ținând de comercial, similar achiziției de medicamente prescrise care se face din bani personali la farmacie.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Bugetul Tău de Sănătate</h2>
            <p className="text-xl text-muted-foreground">Un abonament lunar accesibil la siguranța întregii tale case.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil Familial de Preț" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Simplu de Introdus</h3>
              <p className="text-muted-foreground mb-8">
                Ne trimiți numărul de membri (vârstele adulților și copiilor) și vom veni cu variantele constructive de limită și acoperire, de la Basic la VIP International.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Număr Membri pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Pediatrie & Oferte</div>
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
