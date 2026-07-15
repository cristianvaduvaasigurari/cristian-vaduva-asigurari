import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Wrench, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asistență Rutieră Premium | Cristian Văduva",
  description: "Nu lăsa o defecțiune tehnică să îți strice călătoria. Tractare, depanare la fața locului și mașină de înlocuire 24/7 oriunde în Europa.",
};

export default function RoadsideAssistancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="roadside-assistance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Wrench className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asistență Rutieră (Tractare Auto)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Fie că ai făcut o pană noaptea în munți, fie că motorul te-a lăsat pe o autostradă în Grecia, produsul de asistență rutieră acoperă pe loc costurile uriașe ale chemării unei platforme și te repune în mișcare.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Alege Pachetul de Asistență</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută pe WhatsApp
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
                Mai mult decât o simplă "platformă"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița de Asistență Rutieră este un serviciu operațional dedicat defecțiunilor tehnice sau evenimentelor rutiere imprevizibile. Este acel dispecerat pe care îl suni la 2 dimineața când mașina scoate fum și te oprește în câmp.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurătorul trimite imediat un partener de tractări locale, preia mașina ta gratuit (costurile fiind acoperite direct din poliță) și o duce la cel mai apropiat service, iar pentru tine oferă transport alternativ, cazare la hotel sau o mașină de schimb ca să nu îți pierzi zilele de concediu.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Bariera financiară a distanței
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mulți consideră că "pot chema singuri un băiat cu platforma de pe net". În oraș, da, costă 200 de Lei. Dar o cedare a pompei de apă pe autostrada spre Viena îți atrage o factură de tractare internațională de 1000 - 1500 de Euro cerută de intervențiile austriece.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița de asistență (care costă adesea echivalentul unui plin de combustibil pe an) preia aceste șocuri financiare internaționale complet, oferindu-ți rețele de parteneri serioși, nu prestatori necunoscuți care profită de disperarea ta.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Pentru cine este esențială?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Asistența rutieră funcționează independent de RCA/Casco (sau se poate atașa lor) și este vizată către șoferii practici:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familii care merg vara în străinătate</h4>
                <p className="text-muted-foreground">Turcia, Grecia, Bulgaria - călătoriile lungi la temperaturi ridicate pun stres maxim pe turbinele, alternatoarele și sistemele de răcire ale mașinilor uzate.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Posesorii de mașini ieșite din garanție</h4>
                <p className="text-muted-foreground">Mașinile noi (0-4 ani) beneficiază de Mobilitate de la producător. Dar după această perioadă, asistența Generali devine singurul tău colac de salvare.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Șoferii lipsiți de cunoștințe tehnice</h4>
                <p className="text-muted-foreground">Nu mai trebuie să schimbi roți pe marginea drumului ud. Aștepți tehnicianul în siguranță, el se ocupă de cric, prezoane greu de desfăcut sau baterii descărcate.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Mașinile rulate second-hand</h4>
                <p className="text-muted-foreground">La achiziția unui autovehicul la mâna a doua istoric tehnic incert, o poliță de asistență de câteva sute de lei este un „must-have” la primul drum lung.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Beneficiile unui produs Premium</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Depanare la Fața Locului</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Platforma care vine nu e doar un "cărăuș". De multe ori vine un tehnician cu tester și baterii robot. Dacă este vorba de o siguranță arsă sau o pană de baterie, mașina e pornită pe loc și îți continui drumul, fără să mai mergi la service.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Mașină la Schimb (Rent-a-car)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă mașina ta trebuie lăsată pe elevator la un service din Ungaria cu motorul dezasamblat 3 zile, polița premium achită închirierea unui alt vehicul (de clasă similară) ca tu să îți poți duce copiii la destinația de vacanță propusă.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cazare la Hotel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă e noapte, platforma duce mașina la poarta unui service închis, iar polița îți acoperă de regulă 2-3 nopți de cazare la un hotel de 3 sau 4 stele din localitate pentru toți pasagerii până dimineața când mașina e reparată.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Tipuri de Evenimente Decontate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Defecțiuni Electrice și Mecanice</div>
                  <div className="text-sm text-muted-foreground">Orice oprire tehnică involuntară care face deplasarea imposibilă. (Ambreiaj căzut, ruperea curelei de distribuție, calculator ars etc).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Greșeli personale de utilizare</div>
                  <div className="text-sm text-muted-foreground">Ai alimentat cu benzină în loc de motorină, ai uitat cheile încuiate în portbagaj pe dinăuntru sau ai rămas fără curent electric pe mașina EV.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pană Multiplă de Cauciuc</div>
                  <div className="text-sm text-muted-foreground">Ai tăiat ambele cauciucuri pe dreapta într-o groapă și roata de rezervă (dacă o ai) nu te mai ajută deloc. Tractarea este singura soluție spre vulcanizare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Tractare Post-Accident</div>
                  <div className="text-sm text-muted-foreground">Dacă ai lovit mașina puternic și radiatoarele curg, platforma o ridică de la locul tamponării, asigurând logistica curățării șoselei conform cerințelor poliției.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Liniștea Concediului Salvat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Eroarea de Combustibil</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mirela oprește la benzinărie. Din grabă, pune 40 litri de benzină în motorizarea Diesel, se urcă și pornește motorul. Motorul face zgomote puternice și se oprește iremediabil la marginea stației.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Sună asistența. O platformă sosește în 40 de minute, ridică mașina și o duce la cel mai apropiat service de reprezentanță capabil să facă o curățare de rezervor și conducte. Dacă nu ar fi avut polița, ar fi chemat o firmă de pe internet la supra-preț.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Coșmarul din Munții Pindului</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Familia Popescu traversează munții Greciei cu mașina burdușită de bagaje, la 40 de grade C. Turbina cedează, lăsând mașina fără putere.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Produsul Asistență Europa Generali asigură tractarea până la Salonic la un service partener, cazează familia la un hotel 2 zile, iar deoarece cutia auto necesita o piesă venită tocmai din Germania, Generali le pune la dispoziție o mașină de închiriat similară și bilete de feribot pentru a continua concediul fără mașina stricată.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">O rețea operațională vastă (Europ Assistance)</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să ai o hârtie de asistență pe care scrie "sunt acoperit" nu valorează nimic dacă dispeceratul nu-ți răspunde duminică la ora 3 noaptea.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Pionieri la nivel Global</h4>
                <p className="text-muted-foreground leading-relaxed">Generali integrează serviciile grupului Europ Assistance, inventatorii conceptului de "asistență rutieră" în 1963, garantând un număr uriaș de parteneri cu platforme în absolut fiecare stat din Europa.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Operatori Multi-lingviști</h4>
                <p className="text-muted-foreground leading-relaxed">Când ești blocat în Serbia sau Franța, dispeceratul va prelua problema ta în română, dar ei vor contacta mecanicii locali direct în limba lor, evitând problemele crunte de comunicare ce te pot costa bani grei.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Repatrierea Vehiculului</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă mașina ta implicată într-un accident masiv în Viena este considerată epavă sau nu poate fi reparată în 7 zile, polița acoperă "repatrierea" costisitoare a ei acasă pe platformă specială.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Plătește polița asistență rutieră piesa defectă de la motor?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu, rețineți diferența! Polița de asistență suportă LOGISTICA: venirea la fața locului, manopera de desfacere pe stradă (ex. te ajută să schimbi roata), tractarea către service, mașina la schimb, hotelul. Costul fizic al piesei (ex. cumperi o turbină nouă de 1500 EUR de la service) îl vei suporta tu (cu excepția în care ai și un Casco specializat care să le acopere).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă am nevoie de platformă și chem eu o rudă sau pe cineva cu mașina?</h3>
                <p className="text-muted-foreground leading-relaxed">Pentru a beneficia de costuri decontate, este OBLIGATORIU să suni în prealabil la numărul de pe polița Generali și ei să trimită firma parteneră. Dacă tu rezolvi tractarea "la negru" și aduci abia apoi factura la companie pentru rambursare, plata va fi de cele mai multe ori refuzată conform termenilor de asistență.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Este Asistența Rutieră valabilă pentru orice vechime de mașină?</h3>
                <p className="text-muted-foreground leading-relaxed">Produsele individuale de tip "Asistență" impun adesea limitări de vârstă la emitere (de exemplu mașina nu trebuie să fie mai veche de 10 sau 12 ani pentru pachetele full Europa). Evaluăm vechimea mașinii tale și îți propunem pachetul în care te încadrezi (doar România, sau doar recuperare de bază).</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Adaugă Mobilitate Totală</h2>
            <p className="text-xl text-muted-foreground">E cel mai mic și profitabil cost pe care îl poți face înainte de o vacanță cu mașina.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Asistență Rutieră" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite Înainte Să Pleci</h3>
              <p className="text-muted-foreground mb-8">
                Asistența poate fi emisă de sine stătătoare, nefiind obligatoriu să ai Casco la noi. Trimite un WhatsApp pentru activare imediată (de regulă intră în vigoare din a doua zi la ora 00:00).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Activează Produsul pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Pachete Asistență</div>
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
