import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Building, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Clădiri Comerciale | Cristian Văduva",
  description: "Protejează integritatea structurală a investițiilor tale imobiliare corporate. Acoperire completă pentru hale industriale, spații de birouri și centre logistice.",
};

export default function BusinessBuildingInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Building className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Protecție completă pentru clădirile tale de afaceri
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Fie că deții o hală de producție de 10.000 mp sau un spațiu de birouri beneficiu clasa A, clădirea în sine este probabil cel mai scump "asset" al companiei tale. Protejează structural zecile de milioane de euro investite împotriva incendiilor devastatoare sau cutremurelor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Riscul Imobiliar</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută cu Brokerul Corporate
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
                Diferența față de Proprietatea Rezidențială
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                O clădire de afaceri nu se asigură ca o casă pe persoană fizică. Asigurarea comercială este calibrată pentru riscurile induse de tehnologia de producție (risc ridicat de incendiu din cauza utilajelor/chimicalelor), de prezența chiriașilor multipli și de valoarea uriașă de reconstrucție (uneori evaluată prin proceduri specifice, nefiind doar un tarif standard pe metru pătrat).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița are clauze specifice B2B: clauza de renunțare la regres, clauza de recunoaștere a interesului terților (băncile finanțatoare) și standarde drastice de auditare a normelor PSI (Prevenirea și Stingerea Incendiilor).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Cerința Bancară Inflexibilă
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Aproape nicio extindere majoră a unei fabrici nu se face strict din capital propriu. Orice linie de credit bancară de milioane de euro pentru achiziția / construcția unei clădiri noi va avea atașată clauza OBLIGATORIE de cesiune a poliței de asigurare în favoarea băncii.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dacă hala arde și firma nu o mai poate folosi pentru a produce bani, banca nu va pierde creditul: compania de asigurări va prelua datoria, achitând creditul către bancă, eliberând compania de faliment total.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Categorii de Business-uri Vizate
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul acoperă toată paleta de spații non-rezidențiale din economia românească:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Centre Logistice (Warehouses)</h4>
                <p className="text-muted-foreground">Structuri ușoare pe cadre metalice și panouri sandwich de mii de metri pătrați, unde focul se poate propaga rapid din cauza izolațiilor.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Clădiri de Birouri (Office Buildings)</h4>
                <p className="text-muted-foreground">Dezvoltatori imobiliari care închiriază spații mari de etaje corporatiste și au nevoie de o "Master Policy" care să apere toată fundația și structura de rezistență.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Sisteme de Producție / Fabrici</h4>
                <p className="text-muted-foreground">Cel mai complex grad de risc. Necesită inspecții termografice și evaluarea distanțelor de protecție față de vecini, având riscuri uriașe de scurtcircuite industriale.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">HoReCa (Hoteluri și Restaurante)</h4>
                <p className="text-muted-foreground">Unde rețelele complexe de bucătării industriale (hote/grătare) reprezintă un risc inerent și recunoscut statistic de incendiu frecvent.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Atuurile unei Polițe Customizate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Evaluarea "La Valoarea de Înlocuire Nouă"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu te interesează cât valora contabil hala ta construită acum 15 ani. Te interesează "cât ar costa astăzi fierul, cimentul și manopera să o reconstruiesc perfect dacă arde?". Generali oferă clauze de despăgubire ce permit reconstrucția fără a scădea drastic uzura materialelor vechi.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperirea Costurilor de Demolare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când o fabrică arde complet, structurile metalice contorsionate care rămân în picioare sunt extrem de periculoase. Curățarea lor și transportul deșeurilor pot costa sute de mii de euro. Polița beneficiu preia explicit și aceste "costuri post-daună".
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asistența Inspectorilor de Risc</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Înainte de preluarea în asigurare, experții Generali vor veni gratuit să auditeze clădirea și îți pot atrage atenția asupra unor probleme (ex. sprinklere blocate) pe care nici tu nu le știai, prevenind un viitor dezastru.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Riscurile Standard ("FLEXA") & Catastrofice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Incendiu (Fire)</div>
                  <div className="text-sm text-muted-foreground">Riscul suprem. De la mucuri de țigară aruncate greșit în paleți, la scurtcircuite sau auto-aprinderea substanțelor depozitate (inclusiv incendiile transferate de la o clădire vecină).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Trăsnet, Explozie și Căderea Aparatelor de Zbor</div>
                  <div className="text-sm text-muted-foreground">Daune structurale masive, chiar dacă explozia buteliilor / cazanelor nu a generat foc cu flacără ci doar a dărâmat pereții structurii.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Cutremur de Pământ</div>
                  <div className="text-sm text-muted-foreground">Esential în România (zona Vrancea). Dacă magnitudinea depășește anumite limite și clădirea de birouri capătă fisuri masive în stâlpii de rezistență fiind declarată in-utilizabilă (bulină roșie).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Fenomene Atmosferice Extreme</div>
                  <div className="text-sm text-muted-foreground">Furtuni/Vijelii care smulg efectiv hidroizolația și tablele de pe zeci de mii de metri pătrați de hală, permițând ploii să intre liberă și să distrugă panourile electrice din interior.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Reconstrucția după Dezastru
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Hala transformată în scrum</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O fabrică de mase plastice estimată la 3.5 milioane de euro a luat foc din cauza unui aparat electric lăsat în priză peste noapte în birourile administrative. Focul a pătruns în hală. Timp de 8 ore, pompierii s-au luptat cu flăcările. Hala s-a topit complet.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> După ancheta IGSU (Pompieri), Generali a activat plata daunei totale. 3.5 milioane au fost virate eșalonat direct către constructorul autorizat ales de client pentru a turna o fundație nouă și a ridica o hală identică, reluând producția în mai puțin de 8 luni de la tragedie.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Paguba "Minoră" Ascunsă</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un hypermarket a suferit pagube de la o ninsoare masivă. Acoperișul plat tip terasă, nesusținând zăpada imensă din acel weekend, a cedat parțial, producând "o burtă" vizibilă a planșeului, fără să cadă cu totul.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Riscul "Greutatea Stratului de Zăpadă" din pachet a preluat facturile costisitoare ale experților structuraliști și intervenția macaralelor uriașe venite să suplinească grinzi noi, evitând închiderea definitivă a hypermarketului cerută altfel de ISC (Inspectoratul de Stat în Construcții).
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea de a suporta Daune Colosale</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să asiguri o hală de 20 milioane de Euro nu este același lucru cu a asigura un Tico. Ai nevoie de un asigurător care chiar are acei 20 de milioane cash în cont pentru a ți-i plăti mâine dacă arzi complet.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Reasigurarea Globală</h4>
                <p className="text-muted-foreground leading-relaxed">Generali România cedează fracțiuni din marile clădiri asigurate către piața mondială de "Re-asigurare" (ex: Munich Re, Swiss Re). Așadar, dacă un cutremur în București distruge sute de clădiri asigurate, plata despăgubirii tale e garantată prin transfer internațional de capital garantat.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Departament Dedicat de Ingineri</h4>
                <p className="text-muted-foreground leading-relaxed">Evaluarea se face de către "Risk Engineers" interni, nu de către agenți vânzători. Ei vor înțelege sistemul tău anti-efracție, pompele de incendiu, tipul de panou (PIR vs PUR) și vor seta un tarif perfect ancorat în realitatea clădirii tale.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Pachete All-Risk Disponibile</h4>
                <p className="text-muted-foreground leading-relaxed">Pentru clienții VIP, putem emite polițe "Toate Riscurile" în care abordarea se inversează: compania va plăti absolut ORICE cauză fizică externă a distrus clădirea, exceptând strict o listă mică și specifică de cauze excluse clar (război, rugină lentă).</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (Imobiliare B2B)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt chiriaș în clădirea altcuiva. Trebuie să fac EU asigurarea clădirii?</h3>
                <p className="text-muted-foreground leading-relaxed">În mod uzual, proprietarul clădirii (Landlord) își asigură pereții lui. TU (chiriașul) trebuie să asiguri DOAR bunurile tale aduse acolo (calculatoare, mărfuri) ȘI să cumperi o poliță de "Răspundere Civilă a Chiriașului față de Proprietar" - astfel încât dacă focul pornește de la laptopul tău lăsat în priză, asigurarea ta să îi repare pereții arși proprietarului, fără să fi dat în judecată de el.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Avem hala în construcție (șantier în lucru). Se poate asigura?</h3>
                <p className="text-muted-foreground leading-relaxed">Da, dar nu prin acest produs standard. Va trebui să emitem o poliță dedicată "CAR/EAR" (Contractors All Risks), o poliță specializată de Montaj/Construcții, unde se asigură șantierul etapizat, pe măsură ce avansează valoarea, protejând căderile macaralelor sau furtul materialelor lăsate nesupravegheate noaptea.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Nu am autorizație ISU de Securitate la Incendiu încă. Mă acceptați?</h3>
                <p className="text-muted-foreground leading-relaxed">Acesta este un subiect extrem de sensibil. Fără Autorizație / Aviz ISU sau fără a fi în curs serios de obținere, sau operând clădiri cu "interdicție formală de operare", majoritatea asigurătorilor vor refuza preluarea riscului, sau în cazul unui foc, vor invoca încălcarea legii statului, refuzând despăgubirea. Siguranța legală este baza oricărui contract solid de asigurare.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Pregătește Inspecția de Risc</h2>
            <p className="text-xl text-muted-foreground">Un audit imobiliar complex durează, așadar nu lăsa asigurarea pentru ultima zi de dinainte de deschiderea creditului bancar.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Asigurare Clădire / Hală" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Demarează Ofertarea</h3>
              <p className="text-muted-foreground mb-8">
                Pentru o cotare preliminară corectă vom avea nevoie de 4 lucruri: Adresa clădirii, Anul finalizării, Domeniul de activitate (ex. Depozit piese auto / Fabrică mobila) și Valoarea estimată de Reconstrucție (sau contabilă) dorită.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Detalii Clădire pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Broker Departament Property</div>
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
