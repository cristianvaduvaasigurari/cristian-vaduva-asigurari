import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { ShieldAlert, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare D&O (Răspunderea Managerilor) | Cristian Văduva",
  description: "Protejează averea personală a directorilor și administratorilor firmei. Scutul legal împotriva proceselor intentate de acționari, angajați sau stat pentru decizii manageriale greșite.",
};

export default function BusinessDirectorsLiabilityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="business-directors-liability" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-rose-600 mb-8 border border-border bg-rose-50">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Răspunderea Directorilor și Administratorilor (D&O)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când conduci o companie, fiecare decizie strategică poartă un risc. Dacă o mutare de management aduce pierderi companiei, acționarii, statul sau angajații te pot da în judecată direct pe tine. Polița D&O este singura care apără averea TA personală (casa ta, conturile tale) de sechestrul civil rezultat din greșelile de administrare a firmei.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Riscul de Management</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută Confidențial cu un Broker
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-rose-500 w-8 h-8" />
                Vălul Corporativ Nu Te Mai Protejează
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mitul clasic spune: "Firma este un SRL (Răspundere Limitată), deci eu ca director sau administrator nu răspund cu banii mei". Realitatea juridică actuală este alta. Dacă se dovedește că firma a intrat în insolvență din cauza unei decizii grosolane sau neglijente a managementului, creditorii cer instanței "Atragerea Răspunderii Administratorului".
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Din acea secundă, SRL-ul nu te mai apără. Datoriile firmei devin datoriile tale personale. Polița Directors & Officers (D&O) acționează ca un zid de oțel în fața acestor acțiuni legale îndreptate direct către persoana ta fizică.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Bază de Atracție pentru Top Management
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Dacă vrei să aduci un CFO sau un CEO extrem de competent din piață, primul lucru pe care un profesionist de top îl va cere la angajare este: "Vreau Poliță D&O de minimum 1 milion de Euro".
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nimeni nu vrea să semneze bilanțuri financiare de zeci de milioane de euro sau să restructureze o companie, știind că dacă greșește un calcul, statul (ANAF) sau board-ul îi va lua casa și mașina soției. Este un beneficiu standard de retenție a executivilor la nivel global.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cine sunt Persoanele Asigurate?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Spre deosebire de alte polițe care asigură "Firma XYZ", polița D&O apără <strong>oamenii</strong> din Firmă (averea lor privată):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Administratorii Statutari (C-Level)</h4>
                <p className="text-muted-foreground">Oamenii cu semnătură în Registrul Comerțului (CEO, CFO, COO). Cei care au răspunderea supremă pe cifrele și contractele firmei în fața legii române.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Membrii Consiliului de Administrație (Board)</h4>
                <p className="text-muted-foreground">Fie ei executivi sau non-executivi. Ei validează direcția strategică. Dacă validează prost și bursa/acționarii pierd bani, board-ul este vizat imediat de procese masive.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Managerii de Departament (Middle Management)</h4>
                <p className="text-muted-foreground">De la HR Manageri (dați în judecată pentru concedieri abuzive sau hărțuire nesancționată), până la IT Manageri sau Compliance Officers.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Soții / Moștenitorii Legali</h4>
                <p className="text-muted-foreground">Foarte important: Polița protejează și bunurile comune ale familiei directorului, ca acestea să nu poată fi executate silit pentru greșelile lui manageriale.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">De Ce Nu Poți Dormi Liniștit Fără D&O?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Avansarea Costurilor de Apărare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când o corporație dă în judecată un fost director, îl va sufoca financiar. Avocații buni costă sute de euro pe oră. Polița D&O plătește ea "în avans" avocații tăi, ca să nu intri tu în faliment personal înainte să ajungi măcar să te aperi.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Atragerea Solidară a Statului (ANAF)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă firma intră în insolvență cu datorii la bugetul de stat, Fiscul este cel mai agresiv creditor, cerând judecătorului să spargă peretele SRL-ului pentru a confisca casele administratorului. Polița oferă fonduri de reprezentare direct împotriva organelor de control de stat.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-rose-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Costurile de Reputație Externe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă apare o știre falsă că ai delapidat fonduri ca director, cariera ta viitoare e distrusă. Polițele D&O premium acoperă costul unei firme de PR specializate (Public Relations Costs) pentru a restabili reputația executivului afectat de un proces mediatic.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de litigii atrag daune din D&O?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Litigii de la Acționari / Investitori</div>
                  <div className="text-sm text-muted-foreground">Cel mai frecvent caz. Investitorii te acuză de management defectuos ("Ai făcut achiziția acelui teren fără studiu de risc clar și ai pierdut banii noștri!"). Sau M&A (Fuziuni și Achiziții) care au eșuat dezastruos.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">EPL (Employment Practices Liability)</div>
                  <div className="text-sm text-muted-foreground">Ești dat în judecată direct de către (foștii) angajați pentru: discriminare, concediere abuzivă nelegală, hărțuire sexuală neinvestigată la muncă, sau crearea unui "mediu de lucru toxic".</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Insolvența și Falimentul Acuzator</div>
                  <div className="text-sm text-muted-foreground">Lichidatorul judiciar, numit de Tribunal, studiază trecutul firmei și decide că TU, administratorul, ai agravat situația nefăcând la timp declarația de insolvență. Îți cere ție milioanele lipsă. Polița D&O te reprezintă în această bătălie cruntă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pretenții de la Concurenți</div>
                  <div className="text-sm text-muted-foreground">Un concurent te dă în judecată personal spunând că ai furat secrete comerciale sau ai orchestrat o campanie de denigrare monopolistică a companiei lui pe piață.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Linia Subțire între Eroare și Faliment Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Atacul Fostului Partener</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Doi parteneri se ceartă și unul iese din firmă. Ulterior, acesta îl dă în judecată pe administratorul rămas (Directorul General), acuzându-l că în ultimii 2 ani a luat "Decizii Manageriale Fără Fundament Comercial" vizând favorizarea altor furnizori, devalorizându-i lui acțiunile. Îi cere 300.000 EUR despăgubiri din averea personală.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Directorul a depus cererea de Daună (Claim) către asigurător. Generali a angajat instant o casă de avocatură comercială premium care a demonstrat că deciziile luate au fost în limitele legale ale "Business Judgment Rule". Polița D&O a plătit 45.000 EUR onorarii avocațiale masive, oprind pierderea casei directorului.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Concedierea Abuzivă</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Noul HR Manager concediază 10 oameni fără să respecte 100% pașii riguroși ai Codului Muncii. Cei 10 oameni se asociază și dau în judecată, în solidar, și Compania dar și pe HR Manager și Directorul General în persoană.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Extensia de "Employment Practices" (EPL) din cadrul poliței D&O a susținut plățile despăgubirilor salariale retroactive cerute de instanță, plus daunele morale de câte 5.000 EUR per cap de angajat nemulțumit.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">O Subscriere Financiara Corectă</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Produsul D&O nu se vinde oricui. Este o poliță extrem de complexă, în care Asigurătorul devine practic partenerul secret la masă în CA-ul firmei tale.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Suport în Fața Regulatoarelor</h4>
                <p className="text-muted-foreground leading-relaxed">Oferim acoperire nu doar pentru judecățile de la tribunal, ci și dacă ești chemat la interogatorii sau investigații formale de către Consiliul Concurenței, DNA, ASF sau OLAF.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Fără Franșiză pe Side A</h4>
                <p className="text-muted-foreground leading-relaxed">În jargonul D&O, "Side A" reprezintă protecția directă a buzunarului tău personal când firma e falită și nu te mai poate apăra. La Generali, adesea acoperirea Side A are franșiză ZERO. Te apărăm direct cu primul Euro, din secunda unu.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Confidențialitate Absolută</h4>
                <p className="text-muted-foreground leading-relaxed">Discuțiile despre bilanțul tău negativ sau riscurile decizionale din board sunt tratate cu un nivel de secretizare strict în subscriere, asigurând etica față de piața pe care operezi.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (D&O)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă delapidez un milion de euro intenționat din firmă și plec cu ei în Caraibe, mă apără polița?</h3>
                <p className="text-muted-foreground leading-relaxed">Evident NU. Nicio asigurare din lume nu acoperă "Fapta Penală Săvârșită cu Intenție", Frauda dovedită de către un Tribunal și Obținerea necinstită de Avantaje Financiare. D&O apără "Erorile de Judecată Managerială" – adică prostia, naivitatea de business sau curajul investițional exagerat care s-a dovedit a fi un eșec (Neglijența).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu sunt fondatorul și dețin 100% din acțiuni, dar sunt și directorul general. Pot să mă dau singur în judecată ca să iau bani de la asigurare?</h3>
                <p className="text-muted-foreground leading-relaxed">Polițele D&O au o clauză standard denumită "Insured vs Insured" (sau "Major Shareholder Exclusion"). Aceasta interzice despăgubirea dacă acționarii majoritari (tu) dau în judecată administratorul (tot tu). Polița servește pentru a te apăra de procesele inițiate de stat, de angajați, clienți, lichidatori judiciari sau acționari MINORITARI reali.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu plec din firmă anul acesta. Cine mă apără dacă un control ANAF vine peste 3 ani și găsește nereguli de pe vremea mandatului meu?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița D&O trebuie menținută activă de către companie. Dar chiar și dacă polița firmei s-a oprit, contractele premium D&O au o clauză de "Run-Off" sau "Discovery Period" pentru directorii pensionați / demiși. Aceasta înseamnă că polița îți mai oferă un scut retroactiv pentru o perioadă de 3-6 ani ("termenul de prescripție") pentru greșelile făcute când erai activ.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Deciziile Board-ului Tău</h2>
            <p className="text-xl text-muted-foreground">Fără D&O, conduci compania punând la bătaie siguranța financiară a propriei tale familii.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Confidențială D&O" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Pașii de Subscriere</h3>
              <p className="text-muted-foreground mb-8">
                Cotarea unei polițe D&O este o analiză de audit. Vom avea nevoie de la dvs. de Ultimul Bilanț Contabil aprobat (pentru analiza solvabilității firmei) și completarea Chestionarului oficial privind componența acționariatului.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Inițiază Discuția B2B (Whatsapp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Linie Executivă</div>
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
