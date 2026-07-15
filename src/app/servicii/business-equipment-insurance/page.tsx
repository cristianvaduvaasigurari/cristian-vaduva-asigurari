import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Cog, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Echipamente și Utilaje (EEI / CPM) | Cristian Văduva",
  description: "Nu risca opriri critice. Asigurăm liniile de producție CNC, escavatoarele și echipamentele electronice (EEI) împotriva defectărilor mecanice și erorilor umane.",
};

export default function BusinessEquipmentInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="business-equipment-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Cog className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Utilajelor și Echipamentelor (M.B. / E.E.I.)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Garanția tehnică de la producător acoperă strict defectele de fabricație din primul an. DAR dacă un angajat scapă un ciocan în senzorul principal al presei de 2 milioane de euro, sau un șoc de curent arde placa de bază a RMN-ului tău abia ieșit din garanție? Pentru aceste defecțiuni operaționale catastrofale, singurul tău colac de salvare este polița M.B. (Machinery Breakdown).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Linia Tehnologică</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Inginer Brokeraj
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
                "Accidental" vs. "Incendiu/FLEXA"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița obișnuită de "Bunuri ale firmei" acoperă utilajele STRICT dacă arde hala cu totul, dacă dă cutremurul, sau sunt furate cu efracție din exterior (Cauze Externe - FLEXA).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dar 90% din distrugerile mașinăriilor provin de la "CAUZE INTERNE": un scut-circuit electric, forța centrifugă care rupe brațul utilajului, lipsa bruscă a ungerii mecanice, sau prostia operatorului care introduce coordonatele greșite. Aceste "avarii accidentale/tehnice" necesită explicit o poliță M.B. (Machinery Breakdown) sau E.E.I. (Electronic Equipment Insurance).
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Înlocuirea Garanției Producătorului
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                După 12-24 luni de la achiziția unei imprimante industriale sau unui ecograf 4D, producătorul german/japonez nu mai plătește gratuit nicio piesă. Facturile de reparații pot atinge rapid zeci de mii de euro, destabilizând cash-flow-ul firmei românești.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița de Avarii Acidentale preia ștafeta după terminarea garanției. Practic, transformi o amenințare financiară enormă (costul reparației viitoare incerte) într-o primă de asigurare fixă, deductibilă 100%, ținând aparatul funcțional pe banii asigurătorului ani de zile de acum înainte.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Clasificarea Echipamentelor
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Se asigură trei mari grupe de active, fiecare având produse (wording-uri) cu riscuri și tarifări specifice:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">1. Echipamente Electronice (E.E.I.)</h4>
                <p className="text-muted-foreground">Orice funcționează cu curenți slabi (IT, Servere, Aparatură Medicală RMN/CT, Echipamente de TV/Studio, Case de marcat). Cele mai expuse la variații de voltaj.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">2. Utilaje Staționare (Machinery Breakdown)</h4>
                <p className="text-muted-foreground">Montate fix în betonul halei. Freze CNC masive, tiparnițe rotative grele, prese hidraulice, turbine de la centrale energetice, linii de îmbuteliere Coca-Cola.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">3. Utilaje Mobile (C.P.M. / Contractor's Plant)</h4>
                <p className="text-muted-foreground">Echipamente galbene care se mișcă liber: Buldozere CAT, Excavatoare Volvo, Macarale mobile, Nacele, Utilaje agricole (Combine), utilaje de foraj.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Condiția de Funcționare</h4>
                <p className="text-muted-foreground">Important: Utilajele trebuie să fie în stare tehnică perfectă la intrarea în asigurare (ieșite din rodaj). Nu se asigură aparate deja defecte sau "piese de muzeu" foarte vechi fără piese de schimb.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției Tehnologice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Plata Manoperei și Experților Străini</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când un CNC complex se blochează, piesa în sine poate costa 10.000 EUR, dar zborul de urgență al expertului producător din Germania și manopera lui la fața locului te mai costă 8.000 EUR. Polița M.B. va deconta TOATĂ factura de reparație, inclusiv manopera și demontarea utilajului.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Preluarea "Erorii Umane"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cea mai cruntă cauză în România. Un angajat necalificat pune mâna pe bordul electronic, trage o manetă greșită în contratimp și dă peste cap toată cinematica utilajului. "Nesemânarea (clumsiness), lipsa de experiență, eroarea de operare" sunt acoperite explicit în poliță.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Avaria Extinsă: Supratensiunea</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mai ales în spitale sau ferme izolate, fluctuațiile din rețeaua națională electrică pot scurt-circuita un server sau un aparat de radiologie extrem de sensibil, deși aveai UPS montat. "Scurtcircuitul" este pilonul principal al polițelor EEI (Electronice).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce înseamnă tehnic "Machinery Breakdown"?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pătrunderea Corpurilor Străine</div>
                  <div className="text-sm text-muted-foreground">Un șurub de metal scapă dintr-un palet direct în angrenajele presei de carton de mare viteză, spărgând și strivind toți cilindrii hidraulici interiori (pagube masive mecanice).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Supratensiuni, Supraîncălziri, Lipsa Apei/Uleiului</div>
                  <div className="text-sm text-muted-foreground">Din cauza unui defect la un senzor de presiune, cazanul industrial funcționează fără ungere sau răcire, topindu-se fizic în interior ("Boiler Explosion / Melting").</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ruperea datorată Forței Centrifuge</div>
                  <div className="text-sm text-muted-foreground">Piesele aflate în rotație masivă (ex: paletele turbinelor din generatoare sau eoliene) cedează din oboseală ascunsă materială (ruptură de material nedetectabilă la inspecție), aruncând schije metalice în propriul aparat.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răsturnarea Utilajelor Mobile (CPM)</div>
                  <div className="text-sm text-muted-foreground">Excavatorul tău sapă un șanț. Pământul se surpă sub el și cele 20 de tone se duc de-a dura în râu. Utilajul este scos cu macaraua avariat daună totală. Polița "Contractors Plant" îl despăgubește.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Sustinerea Fluxului de Producție
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Linia de Îmbuteliere</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Într-o fabrică de bere modernă, operatorul noii linii de îmbuteliere germane (cost 4 milioane EUR) adorme parțial noaptea și nu oprește banda de oprire de urgență când vede sticle sparte cum se acumulează într-un senzor. Cioburile blochează complet banda transportoare principală provocând arderea a 4 motoare hidraulice în cascadă.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Producătorul utilajului a refuzat garanția, dovedind "vinovăția operatorului". Fabrica a deschis dosarul pe polița de Machinery Breakdown de la Generali. S-au decontat rapid 45.000 EUR pentru motoare noi venite din Germania, deducându-se doar o mică franșiză din contract (ex: 1500 EUR), păstrând firma pe linia de plutire.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Prăbușirea macaralei turn</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O macara turn fixată greșit de un subcontractor pe un șantier cedează la un vânt puternic (sau o sarcină ridicată peste limita computerului din cauză că a fost anulată siguranța intenționat de un muncitor grăbit). Brațul principal de oțel se rupe, strivind corpul macaralei. Valoare 400.000 EUR.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având extinderea CPM (Contractors Plant Machinery), s-a constatat dauna prin neglijență și suprasarcină. S-au obținut cotațiile pentru un braț nou. S-a achitat despăgubirea conform valorii de înlocuire declarate.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea Inginerească Complexă</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să asiguri fiare complexe care lucrează cu lasere și toleranțe de 0.01mm necesită inspectori de risc tehnici foarte experimentați.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Polițe de Tip "Valoare de Înlocuire NOU"</h4>
                <p className="text-muted-foreground leading-relaxed">În cazul Echipamentelor Electronice, un RMN de 1 milion vechi de 5 ani nu poate fi reparat cu piese de schimb "vechi de 5 ani" de la dezmembrări. Polițele EEI de la noi acoperă costul pieselor absolut NOI necesare din fabrică, fără a se deduce "Uzura" din factura piesei de schimb!</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Suportul Costurilor de Transport Aerian</h4>
                <p className="text-muted-foreground leading-relaxed">Când producția stă pe loc, ai nevoie de piesa din Coreea "Azi, nu peste o lună pe vapor". Putem extinde polița să achite "Transportul Express Aerian (Airfreight)" al pisei uriașe de schimb, ca tu să nu stai închis mai mult de 3 zile.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Acoperirea Purtătorilor de Date</h4>
                <p className="text-muted-foreground leading-relaxed">La aparatură electronică IT (servere), polița "EEI" nu îți cumpără doar un nou fier (Hardware) dacă se arde hard disk-ul. Prin clauza de Data Media, vom plăti zecile de mii de euro pentru echipa de programatori chemată noaptea să scrie la loc bazele de date și softurile pe acel hard-disk nou.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente Tehnice</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Aparatul meu stătea, nu l-a atins nimeni, a murit pur și simplu de bătrânețe (S-a terminat resursa de viață a pompei). Plătiți?</h3>
                <p className="text-muted-foreground leading-relaxed">Categoric NU. Asigurarea despăgubește "Evenimente Imprevizibile Accidentale". Nu despăgubește UZURA NORMALĂ (Wear & Tear), ruginirea treptată, sau piese consumabile gen burghie de freză, uleiuri, curele de transmisie care TREBUIAU oricum schimbate de tine la o anumită revizie conform Cărții Tehnice. Defecțiunea trebuie să fie O SURPRIZĂ, nu o certitudine matematică a uzurii.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Utilajul meu CNC are 25 de ani și l-am luat second-hand, abia mai merge. Îl asigurați ca și cum ar fi nou?</h3>
                <p className="text-muted-foreground leading-relaxed">Pentru ca polița M.B. să funcționeze pe principiul pieselor noi, noi impunem adesea limite de vârstă (ex: utilajele să nu depășească 10-15 ani vechime). Pentru relicve industriale anii '80, unde nici nu se mai fabrică piese de schimb, asigurătorul nu își va mai asuma riscul, sau dacă va accepta, va deduce o uzură uriașă la o eventuală daună parțială, produsul devenind oarecum inutil economic.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă eu aduc piesa pe firmă, pot s-o repar cu mecanicii mei din curte ca să fiu mai ieftin, și să îmi dați banii mei?</h3>
                <p className="text-muted-foreground leading-relaxed">Reparațiile asigurate (în deosebi la mașinării de sute de mii de euro) TREBUIE făcute obligatoriu doar cu "vendor-ul / producătorul agreat oficial" pe baza facturilor de service autorizat, altfel garanția lucrării e nulă și asigurarea va refuza să deconteze o reparație necalificată făcută "pe genunchi" care ar putea provoca o a doua daună și mai mare a doua zi.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Inima Fabricației Tale</h2>
            <p className="text-xl text-muted-foreground">Evaluează linia cu specialiștii noștri înainte ca o piesă minoră să paralizeze producția pe 3 luni.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Echipamente B2B (EEI/MB)" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Cerintele Minime</h3>
              <p className="text-muted-foreground mb-8">
                Pentru a genera o cotație MB/EEI valabilă ne trebuie lista voastră Excel din contabilitate conținând: Denumirea Echipamentului, Model / Producător, Anul Fabricației și Valoarea Inițială de Nou la raft (Replacement Value Nou).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Tabel Echipamente (WhatsApp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Inginer Subscriere Echipamente</div>
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
