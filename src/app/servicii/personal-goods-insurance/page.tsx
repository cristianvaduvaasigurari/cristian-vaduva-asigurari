import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { MonitorSmartphone, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Bunuri Personale | Cristian Văduva",
  description: "Protecție completă pentru echipamentele IT, electrocasnicele premium și mobilierul de valoare din interiorul locuinței tale.",
};

export default function PersonalGoodsInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <MonitorSmartphone className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Bunurilor și Valorilor Personale
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              De multe ori, laptopurile Apple, televizoarele OLED de ultimă generație, aparatura foto profesională, sistemele de smart home sau mobilierul de designer din interior valorează mai mult decât finisajele fizice ale apartamentului. Asigură-le împotriva sustragerii din efracție, inundațiilor provocate de vecini sau arderea din scurtcircuit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Evaluează Protecția Bunurilor</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează Specialistul
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
                Un scut de protecție a lifestyle-ului
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița Bunurilor Personale este o clauză complementară extrem de puternică (adăugată de regulă la polița facultativă a imobilului). Ea vizează în mod strict "conținutul" casei, adică absolut orice lucru care ar cădea dacă ai putea întoarce casa cu susul în jos.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Din momentul în care ușa de la intrare a fost spartă de hoți și ți-au fost sustrase ceasurile de valoare sau stațiile grafice, Generali intervine acoperind valoarea de piață a echipamentelor pierdute.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Vulnerabilitatea invizibilă
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mulți oameni trăiesc sub falsa impresie că o poliță de stat sau una generică pe casă le asigură totul. Realitatea dură vine în momentul în care țeava unui vecin cedează și îți plouă cu apă pe televizorul de mii de euro și laptopul deschis în sufragerie, distrugându-le complet.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dacă aparatele nu sunt declarate într-un pachet clar de "Bunuri Electronice" cu acoperire pe "Fenomene Electrice și Avarii", va trebui să cumperi altele noi din economiile personale.
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
              Această poliță completează perfect viața celor care au investit constant în confortul lor digital și casnic:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Freelanceri și Profesioniști IT</h4>
                <p className="text-muted-foreground">Care folosesc echipamente extrem de scumpe (workstation-uri, servere locale NAS) expuse fluctuațiilor curenților de bloc.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Pasionați de Cinematografie / Audio</h4>
                <p className="text-muted-foreground">Deținători de setup-uri Home-Cinema, televizoare masive OLED, sisteme audio high-fidelity, ușor vizate de spargeri sau fulgere.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Chiriașii din apartamente goale</h4>
                <p className="text-muted-foreground">Persoanele care au închiriat apartamente nemobilate, așadar toate electronicele și paturile scumpe din apartament le aparțin 100% și trebuie asigurate strict de ei, nu de proprietarul blocului.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Colecționari (Opțional specific)</h4>
                <p className="text-muted-foreground">Prin extinderi și evaluări clare, se pot prelua spre asigurare și picturi de autor, obiecte rare sau colecții limitate care necesită un standard separat de pază.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției Digitale și Casnice</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Avarii accidentale Electrice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu mai stai la mâna furnizorilor ineficienți de electricitate. Dacă se dă un șoc electric pe rețea și ți se arde combina frigorifică și televizorul, Generali le plătește imediat din poliță.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Extensie la Vandalism și Furt</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spre deosebire de garanția clasică eMag care acoperă doar un defect de fabrică, polița de bunuri te despăgubește la valoarea reală dacă televizorul este furat de către spărgători sau dacă este inundat de un calorifer spart.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cost Total Ieftin</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Asigurarea unui capital "Conținut Bunuri" de 15.000 EUR în casa ta costă de obicei câteva zeci de lei în plus pe an la pachetul asigurării facultative. O sumă absolut marginală raportat la securitate.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de evenimente te pot lăsa fără ele?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Inundație de sus (Apă de Conductă)</div>
                  <div className="text-sm text-muted-foreground">Vecinul lasă cada să curgă și pleacă din oraș. Apa distruge tot gips cartonul, dar scurtcircuitează și aparatele aflate în prizele afectate din dormitorul tău.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt prin efracție din interior</div>
                  <div className="text-sm text-muted-foreground">Poliția documentează distrugerea broaștei. Laptopurile, ceasurile scumpe, banii cash (până într-o anumită limită strictă) și aparatura de dimensiuni mici dispar. Despăgubire instantă.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Supra-tensiune și Fulger direct</div>
                  <div className="text-sm text-muted-foreground">Zilele de furtună extremă provoacă inducții magnetice masive pe rețea. Toate plăcile de bază din electrocasnice ard simultan. Garanția comercială refuză produsul. Noi plătim reparația sau înlocuirea.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Incendiu Distructiv</div>
                  <div className="text-sm text-muted-foreground">O țigară lăsată pe canapea de un invitat inițiază un foc deschis care consumă aerul și topește complet interiorul sufrageriei. Conținutul este despăgubit 100%.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Impactul în Viața Reală
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Prădătorii de apartamente</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bogdan s-a întors din vacanța sa la Roma de 7 zile, aflând că butucul ușii rezidențiale este forțat. Tot apartamentul e întors pe dos. Consola de gaming, laptopul Macbook de serviciu și camera DSLR personală lipsesc.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> După obținerea procesului-verbal întocmit de Poliție (dovada efracției), Generali analizează devizul bunurilor sustrase conform limitelor setate în poliță și virează 4.000 EUR lui Bogdan. El pleacă vineri la mall să își cumpere din nou electronicele vitale de muncă, chiar dacă poliția nu va prinde hoții niciodată.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Scurtcircuitul neprevenit</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O zi normală în zona rurală metropolitană. Un transformator masiv de pe uliță cedează subțire emițând 380V. Toată aparatura în priză din casa Ninei explodează.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având "Fenomene Electrice" atașat poliței de locuință, inspectorul de daune constată distrugerile la centrală, mașina de spălat vase, TV. Garanția de magazin o respinge automat (acesta e act extern, nu viciu de fabrică). Polița acoperă cele 3 echipamente.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Claritate și Corectitudine Generali</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Suntem una dintre puținele companii capabile să subscrie riscuri complexe de IT și electronice prin diviziile tehnice interne.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Subscriere Fără Bătăi de Cap</h4>
                <p className="text-muted-foreground leading-relaxed">Nu îți cerem lista absolut fiecărui tricou din dulap la încheierea poliței. Se stabilesc limite valorice globale (ex: Bunuri în valoare de 20.000 EUR), care acoperă liniștitor 90% din echipamentul unei case medii.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Valoarea Nouă vs Uzură</h4>
                <p className="text-muted-foreground leading-relaxed">Anumite echipamente și mobilier beneficiază de calcul prietenos la despăgubire. Întotdeauna polița protejează valoarea obiectelor curente conform grilelor de deprecieri corecte din piață.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Integrare Într-un Singur Pachet</h4>
                <p className="text-muted-foreground leading-relaxed">Nu e nevoie de zece contracte. Când facem o "Facultativă All-Risk", ai clădirea, reparația la vecini și telefoanele sparte de furtună pe o singură factură de plată, la un cost cumulativ foarte rentabil.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă îmi scap eu telefonul din mână și se sparge, acoperă polița?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. Polița de bunuri generale protejează împotriva riscurilor fixe din contract (incendiu, apă de la vecin, furt din efracție documentat, etc). Spargerea din neatenție a propriului telefon mobil intră la asigurări separate tip "Garanție extinsă / Casco Telefoane" de la operatorul telecom, nu la conținut locuință.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce fac dacă am uitat ușa deschisă la plecare și au furat tot?</h3>
                <p className="text-muted-foreground leading-relaxed">Clauza se aplică la furtul PRIN EFRAȚIE. Asta înseamnă că hoții trebuie să fi distrus yala, să fi tăiat ușa sau geamul. Neglijența crasă proprie (uitarea ușii descuiate de tot) constituie o excludere din orice asigurare standard.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Trebuie să păstrez facturile la absolut toate hainele și electronicele?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu chiar, este nerealist. Însă pentru electronicele scumpe și bijuteriile menționate ca fiind deosebite (unde vorbim de piese de 5.000, 10.000 Lei bucata) trebuie să poți dovedi prezența lor (fie cu factură, fie fotografii de context clare pe care le ai prin telefon). În caz de efracție totală, poliția întocmește un raport riguros care devine document de bază.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Pune-ți Valoarea în Siguranță</h2>
            <p className="text-xl text-muted-foreground">Ai muncit ani de zile pentru a obține confortul de acasă. Protejează-l cu câteva sute de lei pe an.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Obține Ofertă Poliță Extinsă" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Securizează Simplu</h3>
              <p className="text-muted-foreground mb-8">
                Este de ajuns să menționezi dorința protejării electronice pe WhatsApp, iar noi o includem automat în pachetul locuinței tale.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie pentru Pachet Complet</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Imobiliară</div>
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
