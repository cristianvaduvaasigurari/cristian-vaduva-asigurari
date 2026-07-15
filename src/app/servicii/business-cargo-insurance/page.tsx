import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Truck, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Cargo Marfă în Tranzit | Cristian Văduva",
  description: "Securizează lanțul de supply chain. Asigurarea Cargo protejează valoarea mărfurilor tale transportate rutier, maritim sau aerian împotriva distrugerii, pierderii sau furtului pe traseu.",
};

export default function BusinessCargoInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="business-cargo-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-emerald-600 mb-8 border border-border bg-emerald-50">
              <Truck className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Cargo (Marfă în Tranzit)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când un TIR încărcat cu marfa ta de 250.000 EUR se răstoarnă într-un șanț în Germania, CMR-ul transportatorului nu te va despăgubi la valoarea reală a bunurilor pierdute! Polița CARGO este singurul "contract de prim rang" prin care tu (proprietarul mărfii) te asiguri 100% că îți vei recupera integral investiția, indiferent cine este de vină.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Securizează Lanțul Logistic</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Cargo Broker
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-emerald-500 w-8 h-8" />
                Diferența fatală: CARGO vs. CMR
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Piața comite o confuzie crasă: "Nu fac asigurare pe marfa mea, pentru că transportatorul are deja asigurare CMR!". Adevărul crud este că polița CMR a transportatorului te despăgubește PE KILOGRAM (un calcul internațional bazat pe greutatea tehnică), în limite de aprox 10-12 EUR pe Kg.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Așadar, dacă tu trimiți microcipuri (foarte ușoare, dar de o valoare uriașă de 100.000 EUR, cântărind doar 100 Kg), prin polița CMR a șoferului de TIR vei primi o despăgubire ridicolă de doar vreo 1.200 EUR! Doar o poliță CARGO (încheiată de tine ca proprietar) acoperă pe baza <strong>Valorii Facturii Mărfii (Valoarea Comercială Reală)</strong>.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                "Act of God" & Exonerările Carrier-ului
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița CMR a transportatorului plătește DOAR dacă transportatorul este GĂSIT VINOVAT de accident. Dacă TIR-ul ia foc spontan din cauza unui fulger ("Forță Majoră" / Act of God), sau dacă un container cade de pe vapor în mare din cauza uraganului, Transportatorul se prevalează de excluderea legii și NU este obligat să te despăgubească deloc!
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița CARGO "All Risks" protejează marfa ta independent de cine a greșit. Ea te despăgubește direct pe tine ca deținător, lăsând apoi în seama juriștilor noștri să se lupte cu vinovații prin Tribunal ("acțiune în regres"), ținându-ți ție fluxul de bani în siguranță.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Profilul de Business Afectat
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Se adresează strict Proprietarilor de Marfă, nu firmelor de transport. Ești expus masiv dacă te afli în aceste categorii:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Importatori și Exportatori (General)</h4>
                <p className="text-muted-foreground">Firme românești care importă containere de bunuri de larg consum din China, Turcia sau Europa de Vest, cu o frecvență ridicată a transbordărilor.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Comercianți de Electronice (High-Value / Low Weight)</h4>
                <p className="text-muted-foreground">Telefoane mobile, laptopuri, componente de IT. Deoarece ele au valoare uriașă în volum extrem de mic/ușor, polița CMR a transportatorului va fi efectiv inutilă la daună (se va plăti pe kg).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Comercianți de Mărfuri Frigotehnice / Perisabile</h4>
                <p className="text-muted-foreground">Carne, pește congelat, fructe, vaccinuri medicale. Dacă agregatul frigorific al TIR-ului cedează, marfa se strică. Asigurarea specifică e salvatoare.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Producători Industriali și Utilaje Premium</h4>
                <p className="text-muted-foreground">Transportul unei turbine gigantice sau unui CNC scump de 2 milioane de euro din Germania către fabrica din România, pe o platformă agabaritică deschisă ("Project Cargo").</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Garanțiile Nivelului Comercial "Institute Cargo Clauses"</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Formula "Condiția A" (All Risks)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cele mai complexe acoperiri globale (Institute Cargo Clauses "A") acoperă marfa "Toate Riscurile", de la orice cauză fizică externă (lovire, răsturnare, furt, udare), având doar câteva excluderi punctuale (război, întârziere pur comercială, viciu ascuns al mărfii).
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Arie de Acoperire Multi-Modală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă marfa ta pleacă de la fabrica din Shanghai pe camion, urcă pe un Vapor Cargo până în Constanța, și apoi se transferă pe tren până în București, polița CARGO te acoperă de tipul "Door-to-Door", continuu, pe toate cele 3 moduri de transport (maritim + rutier + feroviar).
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Protecția Profitului Imaginar (Imaginat)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Poți asigura nu doar costul strict de fabricație, ci Valoarea Mărfii la care se poate adăuga, legal, un procent "P" (de obicei 10% sau 20%) reprezentând adaosul/profitul tău sperat la revânzare. Dacă marfa pică în mare, primești valoarea + profitul previzionat.
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
                  <div className="font-bold text-foreground mb-1">Riscuri de Transport majore (Crash)</div>
                  <div className="text-sm text-muted-foreground">Răsturnarea, coliziunea TIR-ului, deraierea trenului, scufundarea, eșuarea vasului maritim sau prăbușirea avionului cargo. Distrugerea instantanee a mărfii în evenimentul catastrofic de trafic.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Avariile Parțiale ("Loviri în container")</div>
                  <div className="text-sm text-muted-foreground">Marfa ajunge fizic, nu se răstoarnă tirul, dar marfa din interiorul paletului s-a deplasat prost (fără a fi greșeală de ambalare a expeditorului) și zeci de televizoare au ecranele sparte din cauza forțelor gravitaționale de frânare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furtul Integral / Parțial și Tâlhăria</div>
                  <div className="text-sm text-muted-foreground">Sute de paleți dispar din TIR-ul parcat noaptea în parcările din Franța, lacătele fiind tăiate cu flexul (Extensia de furt de marfă nesupravegheată trebuie negociată și agreată atent!).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Umezirea, Condensul, Căderea peste Bord</div>
                  <div className="text-sm text-muted-foreground">Pe căi maritime, căderea containerelor peste bord din cauza vântului puternic, spălarea de valuri a containerelor de la punte sau avarierea ambalajului din ploaie puternică la transbordare în porturi.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Impactul poliței proprii
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Eroarea Poliței CMR</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Trimiți din București un utilaj laser de precizie în Spania de 300.000 EUR. Cântărește 500 Kg. Camionul polonez care îl transportă se răstoarnă în Alpii Austriei. Daună totală la laser.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Sperând la polița șoferului (CMR), ai avea o imensă surpriză: el îți va plăti legal ~10 EUR per kilogram! Adică 500 Kg * 10 EUR = 5.000 EUR! Vei avea o pagubă neacoperită de 295.000 EUR. Dacă aveai Polița CARGO, noi îți viram direct valoarea de factură asumată de 300.000 EUR și închideam speța elegant, ferindu-te de faliment!
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Avaria Frigorifică</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Importi un transport de pește somon proaspăt din Norvegia. Sistemul frigorific (Thermoking-ul) al camionului se defectează subit timp de 8 ore, temperatura scade, marfa este respinsă la controlul vamal și declarată alterată 100%. Valoare factură 40.000 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza CARGO-Frigo, negociată corespunzător la subscriere, te despăgubește la valoarea facturii pentru pierderea întregii încărcături de somon (condiționată de faptul că defectarea echipamentului a fost bruscă accidentală, minim X ore conform termografiei, nefiind doar o "reglare greșită de temperatură inițială").
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Proceduri Rapide pentru Volume B2B</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Nu vrei să ne suni în fiecare zi la ora 16:00 ca să ne spui: "S-a mai încărcat un camion cu pantofi". Pentru comercianții frecvenți, procesul trebuie să fie ultra-automatizat și lipsit de birocrație inutilă.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Polița CARGO Anuală (Abonament)</h4>
                <p className="text-muted-foreground leading-relaxed">Emitem o singură poliță de bază ("Poliță Flotantă / Open Cover") pe un an. Tu transporți toată marfa zilnic asigurat și raportezi la final de lună EX-POST valoarea mărfurilor pe care deja le-ai mișcat (Sistem de Bordereau).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Rețea Globală de Comisari de Avarie</h4>
                <p className="text-muted-foreground leading-relaxed">Nava eșuează în portul din Singapore? Prin rețeaua mondială a grupului de reasigurare, Generali trimite "Surveyori / Comisari de avarie" certificați internațional direct în porturile asiatice, pentru evaluarea daunei acolo unde s-a produs, la fața locului.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Clauze "Avaria Generală" (Maritim)</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă nava tinde să se scufunde și Căpitanul decide aruncarea containerului tău în apă pentru salvarea restului navei (Avarie Comună). Polița ta Cargo preia direct aceste garanții complexe de drept maritim global și îți restituie valoarea.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (Cargo)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu vând EXW (Ex-Works). Marfa mea pleacă de la poarta fabricii pe riscul clientului meu (cumpărătorului străin). Mai am nevoie de Cargo?</h3>
                <p className="text-muted-foreground leading-relaxed">Tehnic și teoretic, pe Inconterms (EXW, FCA, FOB), răspunderea pierderii pică instant pe cumpărătorul străin după ce a ridicat-o de la poarta ta. ÎN PRACTICĂ, dacă marfa lui arde pe drum, mulți clienți străini blochează abuziv plata facturii tale (refuză să îți dea banii). Ca producător, recomandăm "Seller's Interest Insurance" – o clauză de protecție ca să nu rămâi cu banii neîncasați la un capriciu.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce facem dacă doar s-a întârziat marfa, dar ea a ajuns intactă? Plătiți penalitățile mele comerciale?</h3>
                <p className="text-muted-foreground leading-relaxed">NU. Ca regulă generală în toate "Institute Cargo Clauses", pagubele de "Întârziere comercială în livrare" și implicit pierderile de contract / penalitățile / pierderea de profit din cauza sosirii cu 5 zile mai târziu a transportului SUNT EXCLUSE complet. Polița asigură exclusiv "deteriorarea sau distrugerea FIZICĂ" a bunurilor.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cine este vinovat dacă marfa a fost împachetată prost de oamenii mei și ajunge spartă de la denivelările asfaltului?</h3>
                <p className="text-muted-foreground leading-relaxed">Aceasta este principala cauză de refuz a daunelor! "Inadecvarea ambalajului". Dacă la destinație se constată de către comisarii de avarie independenți că produsele din ceramică au fost puse în TIR fără folie cu bule, doar cu hârtie și ne-ancorate de paleți, cauza nu e "Accident", ci ambalarea neglijentă, deci asigurarea nu plătește absolut nimic.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Importurile și Exporturile</h2>
            <p className="text-xl text-muted-foreground">Opoliță CARGO poate costa fracțiuni minime din procentul facturii dvs., oferind liniște totală.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil de Cost Poliță CARGO" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Parametrii Ofertării</h3>
              <p className="text-muted-foreground mb-8">
                Pentru un cost fix/cursă sau poliță deschisă anuală, avem nevoie să știm tipul de marfă (ex. oțel, fructe, microcipuri), traseele cel mai des utilizate (ex. Turcia - RO) și limitele maxime dorite per mijloc de transport (ex. max 200.000 EUR pe un TIR).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Specificații Rulaje (WhatsApp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Departament Cargo / Marin</div>
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
