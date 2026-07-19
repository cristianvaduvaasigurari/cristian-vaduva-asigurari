import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { HardHat, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Șantier (CAR / EAR) | Cristian Văduva",
  description: "Securizează dezvoltarea imobiliară. Polița Constructorului acoperă șantierele în desfășurare, daunele echipamentelor și preia răspunderea civilă față de vecini.",
};

export default function BusinessConstructionInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="business-construction-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-lg glass text-orange-600 mb-8 border border-border bg-orange-50">
              <HardHat className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Construcțiilor & Montajului (CAR / EAR)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Mediul de construcții (șantierul) este definiția haosului controlat. Acolo unde fierul, macaralele grele și echipele umane interacționează cu excavații masive lângă clădirile învecinate, accidentele majore nu sunt doar posibile, ci previzibile statistic. Polița Constructorului transformă acest risc colosal într-o primă clară, fixată în bugetul de dezvoltare alocat investiției.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Riscurile Șantierului</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Broker Șantiere
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-orange-500 w-8 h-8" />
                "Toate Riscurile Constructorului" (C.A.R.)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                CAR (Contractors All Risks) este regele suprem al asigurărilor din piața imobiliară. Nu se referă la clădirea "gata terminată", ci la clădirea "în creștere", de la turnarea primei cupe de beton până la Recepția finală.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Este o poliță tehnică completă cu două mari secțiuni (Secțiunea I: "Daune Materiale" ale obiectivului în sine, și Secțiunea II: "Răspunderea Civilă Față de Terți" (Cross-Liability), formând un scut care apără și viitoarea clădire de foc/ploaie/căderi, și buzunarul dezvoltatorului față de pretențiile vecinilor de parcelă afectați de praful și vibrațiile excavațiilor.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Deblocarea Finanțării Bancare
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Nicio Bancă Comercială din România (și din lume) nu va elibera "Tragerile" (tranche-urile) din creditul de investiții de câteva milioane de Euro necesare construirii unui nou bloc sau hală comercială, dacă dezvoltatorul sau Antreprenorul General nu prezintă Polița C.A.R. emisă, cu clauză de cesiune în favoarea băncii finanțatoare.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dacă vine o furtună puternică și dărâmă 4 etaje nou-construite la roșu, iar constructorul trebuie să le reconstruiască pe banii lui, riscă insolvența blocând toți banii băncii. Banca se apără forțându-te să te asiguri.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Participanții la ecosistemul unui șantier
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pe o poliță pot fi asigurate mai multe entități interesate din șantier simultan ("Multiple Insureds"):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Dezvoltatorul (Beneficiarul / Investitorul)</h4>
                <p className="text-muted-foreground">Persoana sau fondul care pompează capitalul și deține terenul. El are interesul suprem de a nu pierde finanțarea în fața unui dezastru natural pe șantier.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Antreprenorul General (General Contractor)</h4>
                <p className="text-muted-foreground">Firma responsabilă de implementarea și paza șantierului. Majoritatea contractelor de antrepriză (FIDIC) îl OBLIGĂ pe antreprenor să încheie polița la semnare pe costul lui.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Subcontractorii Specializați</h4>
                <p className="text-muted-foreground">Electricienii, firmele de ventilație (HVAC), echipele de piloni forati. De obicei se acoperă "sub umbrela" poliței magistrale luate de Antreprenorul General.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Băncile și Finanțatorii</h4>
                <p className="text-muted-foreground">Care își securizează injecția de lichiditate cerând calitatea de co-asigurat/cesionar pe despăgubirile posibile de pe poliță în caz de colaps structural al scheletului.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Protecție Tehnică la 360 de Grade</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-orange-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensia "Daune la Echipamente și Utilaje" (C.P.M.)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Excavatoarele, buldozerele, și turnurile macaralelor se pot prăbuși în gropi (șanțuri), dând peste cap șenilele. Asigurarea Constructorului preia ca secțiune opțională și avariile catastrofice ale utilajelor de șantier care lucrează greu pe teren instabil.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-orange-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Materialele Aflate în Depozitare pe Șantier</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mii de plăci rigips, cărămizi, armături și kilometri de cabluri electrice sunt lăsate pe teren în perimetru înainte să fie montate în ziduri. Furtul acestora noaptea, chiar de sub paza BGS-ului din perimetru, sau alterarea lor de o ploaie surpriză este acoperită.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-orange-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Perioada de Garanție (Mentenanță)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ai terminat blocul, s-a făcut recepția. Dar în următoarele 12-24 de luni, în "perioada de mentenanță / remedieri defecte", o țeavă montată prost bubuie și inundă blocul nou predat. Clauzele "Extended Maintenance" acoperă defecțiunile manifestate abia ulterior, din faza de execuție, protejând garanția de bună-execuție.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Categorii Centrale Acoperite (Sect I + Sect II)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Erorile Umane de Execuție (Neglijența Constructorului)</div>
                  <div className="text-sm text-muted-foreground">Turnarea greșită a unei plăci de beton, prăbușirea unei structuri intermediare a halelor metalice cauzată de o rafală de vânt (când încă nu era rigidizată), eșuarea prinderilor. Tot ce distruge lucrările permanente și temporare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Forțele Majore Naturale (FLEXA extins)</div>
                  <div className="text-sm text-muted-foreground">Inundațiile pe șantier care umplu groapa de fundație și distrug hidroizolația și sub-solurile. Incendiul provocat de o sudură deschisă pe izolația de polistiren a pereților.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspunderea Față de Terți (Vecini, Pietoni)</div>
                  <div className="text-sm text-muted-foreground">Macaraua ta se de-echilibrează, cade peste acoperișul spitalului de alături. Ești dat în judecată de spital pentru "distrugerea patrimoniului și daune pacienți". Secțiunea 2 a poliței apără buzunarul companiei preluând procesul cu spitalul.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Riscul de Montaj (EAR - Erection All Risks)</div>
                  <div className="text-sm text-muted-foreground">Ești firmă specializată doar în Montare Linii Robotice într-o hală gata construită (Nu lucrezi cu ciment, ci șuruburi, calibrări, teste la rece și la cald pe utilaje scumpe). Rotești greșit linia la teste și spargi motorașele interne: ești asigurat.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Ingineria Daunelor de pe Șantier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Vibrațiile care fisurează vecinii</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Construiești un ansamblu modern de apartamente cu fundație adâncă cu parcare -2 etaje la subsol. Introducerea pilonilor prin metoda "vibroînfigere" trepidează pământul. Clădirile foarte vechi de pe perimetru acuză crăpături groase în ziduri provocate de șantierul tău.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Ești dat în judecată masiv de vecinii organizați pentru sute de mii de euro daune materiale de "sub-zidire și consolidare". Cu extensia corectă pe poliță (Clauza de Vibrații și Îndepărtare a Suportului, clauza 120 / 119), Generali preia procesele cu toți asociații și plătește consolidarea vecinilor, salvând dezvoltatorul din instanță.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Ploaia Neașteptată de pe Acoperiș</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Muncitorii aplică ultimul strat de hidroizolație la o hală logistică. Vinerea după amiază este prea târziu, se opresc la jumătate lăsând hala neizolată sus (fără acoperiș complet), învelind superficial cu celofan. Duminică, vine o furtună și o rupere de nori. Hala devine un bazin cu apă care inundă toate podelele tehnologice deja montate jos.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Greșeala (neglijența de organizare a antreprenorului) atrage re-demontarea șapelor umflate, igrasiei și re-pomparea apei din subsol cu utilaje, cheltuieli imprevizibile acoperite de compania de asigurare.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea Inginerească Complexă</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Proiectele mari (infrastructură, autostrăzi, poduri) sau zgârie-norii nu suportă improvizații. Ai nevoie de liderii în "Engineering Insurance".
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Inspecții Tehnice Gratuite</h4>
                <p className="text-muted-foreground leading-relaxed">Risk-Surveyor-ii Generali sunt ingineri civili în fond. Ei vor vizita șantierul lunar (la proiectele majore) pentru a monitoriza stadiul avansului și vor da sfaturi valoroase pe dirigenția de șantier pentru a diminua riscul de accidente majore.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-emerald-800 mb-2">Asigurarea Profitului Viitor (ALOP)</h4>
                <p className="text-muted-foreground leading-relaxed">Advance Loss of Profit (ALOP) / DSU. Dacă un incendiu pe șantier întârzie predarea mall-ului cu 6 luni, dezvoltatorul pierde CHIRIILE viitoare de la magazine. Clauza extrem de specială ALOP poate deconta profitul brut nerealizat al dezvoltatorului din pricina întârzierii cauzate de o daună pe șantier.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Cross-Liability Simplificată</h4>
                <p className="text-muted-foreground leading-relaxed">Ai 10 subcontractori diferiți pe șantier. Ce se întâmplă dacă un sudor de la Subcontractorul A dă foc întâmplător schelei montate de Subcontractorul B? Cu clauza Cross Liability, deși toți sunt co-asigurați, asigurarea intervine fără ca firmele de pe același perimetru să se dea în judecată între ele.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Constructor</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt arhitect. Dacă proiectez greșit structura și blocul cade la roșu, mă apără polița de Șantier (C.A.R)?</h3>
                <p className="text-muted-foreground leading-relaxed">NU! Aici intervine diferența masivă de legislație. Asigurarea C.A.R. apără Constructorul (cine leagă fierul fizic), pe un accident (eroare umană de organizare/turnare). Dar exclude "Erorile de Proiectare Ale Arhitectului (Design Error)". Arhitectul trebuie dat în judecată pe propria sa poliță separată de Malpraxis (PI - Răspundere Profesională), dacă el este vinovat tehnic de unghiurile proaste din desene.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce facem dacă proiectul, estimat pentru a dura 12 luni, durează 18 luni? Acoperirea expiră la 12 luni și rămânem neasigurați?</h3>
                <p className="text-muted-foreground leading-relaxed">Procedura este simplă: Polița C.A.R. este flexibilă și bazată pe Valoarea Totală a Lucrării conform Deviz. Dacă termenul se întârzie (frecvent în imobiliare), Brokerul înaintează, înainte cu 2-3 săptămâni de expirare, un "Act Adițional de Prelungire a Termenului de Execuție", pentru care se va mai achita o mică primă de risc suplimentară, acoperirea fiind continuă.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Muncitorul nostru necalificat cade de pe schelă și paralizează. Primește despăgubiri colosale din Secțiunea 2 (Răspundere Terți) a poliței de șantier?</h3>
                <p className="text-muted-foreground leading-relaxed">Atenție! Muncitorii tăi (proprii) de pe schelă NU SUNT "Terți" din punct de vedere legal pe Șantier. Răspunderea față de proprii angajați se exculde în mod standard în Răspunderea Secțiunii II CAR. Pentru ca firma constructoare să fie protejată de cererile de despăgubire ale familiilor muncitorilor proprii, trebuie activată Extensia specifică de "Răspundere a Angajatorului față de Angajați" (Employers Liability / Worker's Comp).</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Pune Fundația Juridică a Dezvoltării Tale</h2>
            <p className="text-xl text-muted-foreground">Analizăm Devizul General și contractul FIDIC pentru a oferi cea mai etanșă soluție pe toată durata șantierului.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Șantier C.A.R." />
            </div>
            
            <div className="glass rounded-lg p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Cerintele Minime</h3>
              <p className="text-muted-foreground mb-8">
                Pentru emiterea ofertei ferme vom solicita: Contractul de Antrepriză asumat, Devizul (Valoarea Contabilă Totală a Investiției), Perioada Exprimată în Luni, un Memoriu Tehnic (Studiul Geotehnic din arhitectură) și CUI-ul Dezvoltatorului/Antreprenorului.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimiteți Autorizația / Deviz (WhatsApp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Departament Inginerești (Engineering)</div>
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
