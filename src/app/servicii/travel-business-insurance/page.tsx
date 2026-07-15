import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Briefcase, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Travel Business | Cristian Văduva",
  description: "Protecția supremă dedicată oamenilor de afaceri. Siguranță medicală, recuperare pierderi pentru zboruri amânate și înlocuire de urgență a echipamentelor IT corporate.",
};

export default function TravelBusinessInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="travel-business-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-indigo-600 mb-8 border border-border bg-indigo-50">
              <Briefcase className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Travel Business (Corporate)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când călătorești cu interes de afaceri (conferințe, târguri internaționale, negocieri B2B), timpul și logistica sunt esențiale. Produsul Travel Business este un ecosistem care depășește sfera medicală, despăgubindu-ți anularea zborurilor vitale, pierderea bagajelor business sau echipamentului expozițional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Securizează Delegația</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact pentru Pachet B2B
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
                Un pachet configurat profesional
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de un Travel Individual clasic (axat doar pe febră sau o entorsă la plajă), Travel Business adaugă clauze extinse pentru expatriați și manageri de top. Limitele de despăgubire medicală sunt ridicate (pot atinge 100.000 EUR) pentru a suporta costurile spitalelor VIP internaționale.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea include protecția laptopurilor, a smartphone-urilor companiei și protejează împotriva erorilor transportatorilor care ar putea lăsa delegația fără standurile necesare expoziției din cauza întârzierilor de cursă.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Responsabilitatea Companiei față de Angajat
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Legea muncii din România precizează că angajatorul are datoria de a proteja sănătatea angajatului plecat în interes de serviciu ("delegație"). Dacă angajatul tău face infarct în Germania la un târg, costurile spitalicești colosale (care pot falimenta o firmă mică) intră complet în răspunderea angajatorului dacă nu a fost încheiată o poliță.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Achiziția acestui pachet transformă o cheltuială imprevizibilă astronomică într-o primă deductibilă controlabilă și ieftină de câteva zeci de lei.
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
              Instrumentul este absolut critic pentru anumite pături din sectorul corporativ:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Echipe Tehnice / Muncitori Detașați</h4>
                <p className="text-muted-foreground">Muncitori, ingineri sau constructori români trimiși temporar în Belgia, Germania sau Franța pentru lucrări pe termen limitat, unde riscul de accident de muncă e major.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Echipe de Vânzări și CEO</h4>
                <p className="text-muted-foreground">Manageri de top care fac deplasări intercontinentale regulate (USA, China, Dubai), expuși la diferențe de fus orar, stres enorm și zboruri cu multiple escale riscante.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Piloți, Însoțitori de zbor, Șoferi TIR</h4>
                <p className="text-muted-foreground">Esențial: persoanele a căror meserie DE BAZĂ implică riscul transportului extern beneficiază de variante dedicate (Travel Profesioniști) cu extinderi clare pentru profesia lor de risc.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Expresii Expoziționale</h4>
                <p className="text-muted-foreground">Echipe care transportă și montează echipamente la târguri de IT sau industrie, având cu ei mostre de valoare în bagaj.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Garanțiile Nivelului Business</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperirea Suplinitorului</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă delegatul a fost internat în spital de urgență la Munchen și prezența companiei la târg e vitală, polița premium acoperă biletul de avion de urgență (Business Class) pentru ca firma să trimită un alt angajat înlocuitor să țină prezentarea.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Repatriere Avansată</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Include nu doar salvarea aeriană standard pentru pacient, ci și costurile necesare returnării corpului neînsuflețit în caz de tragedie, salvând familia/firma de costuri birocratice inumane de 15-20 mii Euro.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensie "Business Bag"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă laptopul companiei sau documentele esențiale sunt furate printr-o tâlhărie documentată din camera de hotel, sau întârziate masiv la check-in, asigurarea compensează financiar angajatorul.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce cuprinde Grila Profesională?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Cheltuieli Medicale / Boli Profesionale</div>
                  <div className="text-sm text-muted-foreground">Plafoane majorate (ex. 50.000 - 100.000 EUR) pentru tratamente de urgență, analize complexe, intervenții chirurgicale și spitalizare în clinici occidentale.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspundere Civilă în Interes de Serviciu</div>
                  <div className="text-sm text-muted-foreground">Dacă delegatul provoacă din greșeală un incendiu în centrul expozițional sau distruge bunurile partenerului străin, polița sa individuală apără financiar firma românească angajatoare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pierderea Conexiunii (Zborurilor)</div>
                  <div className="text-sm text-muted-foreground">Cea mai frecventă daună de business: cursa low-cost întârzie 3 ore, cauzând pierderea conexiunii transatlantice majore spre New York. Polița acoperă cazarea și biletul nou.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Asistență Juridică (Cauțiune)</div>
                  <div className="text-sm text-muted-foreground">În țările non-UE (ex. Emiratele Arabe, SUA), un accident de mașină nevinovat te poate băga în arest până la eliberarea pe cauțiune. Generali garantează financiar depunerea cauțiunii (în limită fixă, ex: 10.000 EUR) pentru eliberare rapidă.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Protejarea Profitului Angajatorului
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Bagajul cu Mostre</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Directorul de vânzări ajunge la Las Vegas pentru conferința anuală. Compania aeriană îi rătăcește valiza mare în care se aflau toate costumele de business și eșantioanele pentru parteneri. Târgul începe a doua zi.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza de întârziere (peste 12-24h) îi virează instant de urgență un fond de 500 EUR de pe polița Business. Delegatul se duce în seara respectivă să își cumpere cămăși, costum de înlocuire și materiale minime pentru a face o impresie impecabilă a doua zi.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Accidentul Angajatului Detașat</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O companie trimite un inginer tehnic în Norvegia pentru 14 zile. Din cauza gheții, el alunecă pe stradă și își fracturează clavicula. Are nevoie de operație, spitalizare 5 zile, iar factura medicală a scandinavilor vine pe adresa SRL-ului românesc: 18.000 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deoarece compania a investit suma infimă de ~100 Lei într-o poliță Travel Business, a eliminat stresul ca Inspectoratul Muncii să considere lipsa de grijă patronală, iar Generali suportă toate cele 18.000 EUR, compania românească neplătind nimic.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">O Gestiune de Tip Flotă B2B</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              La nivel corporativ, departamentul de HR nu are timp să completeze hârtii și carduri pentru fiecare om care pleacă duminica în delegație.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Polița Master (Zile de Acoperire)</h4>
                <p className="text-muted-foreground leading-relaxed">Puteți încheia o poliță de tip "cont bancar de zile". Cumpărați "500 de zile de călătorie pe firmă". Când Popescu pleacă 3 zile, HR-ul trimite un mail rapid, iar din total se scad 3 zile. Este extrem de eficient pentru flote mari de angajați mobili.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Deductibilitate Netă 100%</h4>
                <p className="text-muted-foreground leading-relaxed">Aceste asigurări de delegație au suport legal perfect pentru a fi introduse pe cheltuielile contabile curente ale firmei cu deductibilitate de 100%, considerându-se protecția afacerii, nu beneficiu personal.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Acoperire "Riscuri Profesionale"</h4>
                <p className="text-muted-foreground leading-relaxed">Turistul standard este neacoperit dacă se accidentează "la muncă" afară. Produsul Business extinde aria de risc și acoperă explicit traumele survenite "în timpul îndeplinirii sarcinilor tehnice pe șantier sau în biroul clientului extern".</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (B2B)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Avem un contract de muncă temporar în Germania (muncă fizică / construcții). Se încadrează aici?</h3>
                <p className="text-muted-foreground leading-relaxed">Asigurările "Travel" clasice și Business se referă, de obicei, la "muncă de birou, meetinguri, consultanță non-manuală". Pentru muncitorii detașați în construcții, agricultura, rafinării (sarcini fizice periculoase), este necesară emiterea unei polițe cu o suprataxă clară de risc tip "Muncă Manuală". Necomunicarea clară a profesiei anulează polița în caz de accident cu flex-ul/macaraua.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Suntem expuși la zone de război (Irak, Libia) ca și constructori? Avem acoperire?</h3>
                <p className="text-muted-foreground leading-relaxed">În general, TOATE polițele globale exclud despăgubirile pentru "urgențe și traume rezultate dintr-un act direct de război declanșat sau terorism, revolte populare armate". Asistența medicală banală (apendicita) poate fi acoperită, dar rănile provocate de gloanțe/explozii tip război nu sunt decontate. Aceste zone impun soluții speciale extreme prin Lloyd's London.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Polița acoperă dacă angajatul e arestat în străinătate?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița poate deconta avansul cauțiunii, și poate trimite avocat sau translatori la audiere. Totuși, ea NU te acoperă și te lasă descoperit absolut total dacă fapta este săvârșită "cu intenție clară penală" (ex: contrabandă de droguri, furt din magazin intenționat). Te apără doar pentru răspunderi accidentale (ex: ai dărâmat raftul într-un magazin de bijuterii din greșeală cu rucsacul).</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Flota de Delegați</h2>
            <p className="text-xl text-muted-foreground">Pentru firmele cu volum mare, oferim sisteme logistice B2B de simplificare masivă a procedurilor.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil Corporate Travel" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Factura Pe CUI</h3>
              <p className="text-muted-foreground mb-8">
                Ne dai datele firmei și destinațiile uzuale (Europa, Mondial ex. SUA) și îți trimitem o propunere anuală pe număr de angajați călători (sau pachete la bucată).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie pe WhatsApp pt Firmă</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consilier Travel Corporate</div>
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
