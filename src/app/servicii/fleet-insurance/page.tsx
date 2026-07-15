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
  title: "Asigurare Flote Auto | Cristian Văduva",
  description: "Management integrat al riscului pentru întregul parc auto al companiei tale. Tarife preferențiale și decontări corporate.",
};

export default function FleetInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="fleet-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Truck className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Flotelor Auto
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Când afacerea ta depinde de mașini, imobilizarea lor înseamnă bani pierduți. Centralizează absolut toate vehiculele (turisme, utilitare, camioane) sub un singur contract tip "Flotă", obținând discounturi volumetrice masive, un singur scadențar și un management premium al daunelor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Cere Ofertă pentru Parc Auto</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contactează Specialist B2B
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
                Conceptul de Poliță "Grup / Flotă"
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                În mod standard, fiecare mașină are propriul său RCA și Casco, emis cu tarife individuale bazate pe bonus-malus-ul ei istoric. Sistemul de Flotă (accesibil de regulă de la 5, 10 sau 20 de vehicule în sus, în funcție de specificul contractului) tratează tot parcul auto ca un "singur client".
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Riscul este distribuit (o mașină lovește, celelalte nouă aduc profit), așadar compania de asigurări poate oferi cotații speciale agregate cu 15-30% mai mici decât suma asigurărilor individuale emise la bucată, plus alte facilități logistice de gestiune dedicate.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Optimizarea timpului și a bugetului
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Pentru un Fleet Manager sau patron de firmă care gestionează 15 autoutilitare, a urmări lunar expirări de polițe individuale este un coșmar administrativ.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contractul de flotă uniformizează administrativ situația: toate polițele se aliniază sub o poliță "Master" cu o singură factură agregată lunară sau trimestrială, vehiculele nou achiziționate se adaugă pe loc printr-un simplu act adițional pre-negociat, economisind zeci de ore de muncă pentru departamentul contabil.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Ce companii au nevoie de contract Fleet?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Soluția este construită exclusiv pentru domeniul B2B (Business-to-Business) și cuprinde companii cu expunere rutieră extinsă:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Companii de Distribuție & Curierat</h4>
                <p className="text-muted-foreground">Flote mari de autoutilitare (sub și peste 3.5T) cu rulaj zilnic masiv în oraș unde micile tamponări tipice flotelor "fleet" generează costuri mari nereparate.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Transportatori Internaționali (TIR)</h4>
                <p className="text-muted-foreground">Flote de capete tractor și semiremorci unde primele de RCA individuale sunt uriașe, iar un program master scade dramatic povara financiară lunară de pe firmă.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Echipe de Vânzări Corporate</h4>
                <p className="text-muted-foreground">Companii din pharma, FMCG sau IT care oferă reprezentanților mașini de serviciu, necesitând o unificare a reparațiilor în rețeaua națională pentru a readuce rapid agenții pe teren.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Companii de Construcții / Agricultură</h4>
                <p className="text-muted-foreground">Pentru flote mixte ce conțin turisme, bene și utilaje speciale ce lucrează în regim greu pe șantiere.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele B2B Unice Ale Flotei</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Discount de Volum Pre-setat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cumperi a 12-a mașină a firmei în decembrie. Nu negociezi din nou cu noi de la zero prețul de asigurare la ea. Îi va fi aplicat din prima secundă tariful redus stabilit pentru toată clasa respectivă de vehicule (ex. "Skoda Octavia Vânzări").
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Franșize Flexibile Agregate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polițele de flotă Casco permit ajustări specifice. Firma poate prelua reparația zgârieturilor minore pe cost intern (franșiză), activând Casco doar pentru avarii majore de mii de euro, scăzând puternic prima anuală per mașină.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asistență Rutieră Master</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă se defectează o dubă plină cu marfă, un telefon la dispeceratul dedicat B2B declanșează tractarea atât a dubei la service, cât și preluarea mărfii pentru a fi dusă la destinație, limitând pierderea comercială.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Mixul de Protecție (RCA + CASCO B2B)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Obligativitățile Civilie (RCA)</div>
                  <div className="text-sm text-muted-foreground">Toate mașinile firmei au asigurată emiterea continuă și plata legală a daunelor cauzate altor companii/persoane de către șoferii proprii.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Avarierea Patrimoniului Propriu (CASCO)</div>
                  <div className="text-sm text-muted-foreground">Agenții care lovesc mașinile primite de la firmă nu trebuie să scoată ei din buzunar valoarea reparației. Mașina e reparată din Casco Fleet la reprezentanță, firma nu pierde asset-ul.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt Extins Echipamente</div>
                  <div className="text-sm text-muted-foreground">Dubele care livrează echipament specializat pot avea clauze care protejează parțial utilajele fixate pe sau în mașină (ex. sisteme de prindere, macarale mici) contra furtului sau accidentelor.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Vandalism Multiplu la Sediu</div>
                  <div className="text-sm text-muted-foreground">Dacă parcul auto este atacat noaptea la sediul firmei (cauciucuri tăiate, graffiti, lunete sparte pe toate dubele), o poliță Casco protejează fluxul comercial al doua zi.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Scenarii și Salvarea Afacerilor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Grindina de Weekend</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O companie de distribuție își parchează toate cele 25 de dube în curte vineri seara. O furtună localizată masivă de grindină distruge sâmbătă parbrizele și caroseriile a 20 de mașini. Pagubă estimată: 40.000 EUR reparații.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având contract de flotă Casco, brokerul contactează asigurătorul care trimite un inspector în curtea firmei. Întregul lot este acceptat spre reparație fără dezbateri pe rând pentru fiecare mașină individual, iar activitatea firmei se poate relua rapid cu geamuri noi montate rapid în serie.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Adăugarea rapidă a noilor mașini</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Directorul achiziționează 5 mașini noi pentru divizia de vânzări de pe o zi pe alta.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> În sistemul tradițional, ar trebui să solicite 5 cotații noi, să le negocieze cu 5 agenți. În sistem flotă Generali, Fleet Managerul trimite un simplu e-mail, iar mașinile intră instant sub umbrela poliței cu acoperire automată garantată imediat de la scoaterea din reprezentanță, documentele legale urmând a fi redactate zilele următoare.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Forța unui parteneriat corporate cu Generali</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Pentru a gestiona parcuri auto ai nevoie de un sistem intern puternic, nu de agenții lente cu dosare în format fizic.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Raportare Istorică (Loss Ratio)</h4>
                <p className="text-muted-foreground leading-relaxed">Generali îți oferă transparent la final de an o hartă exactă a daunelor flotei tale, permițându-ți să vezi ce departamente produc cel mai frecvent accidente și să decizi cursuri de conducere defensivă pentru ei.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Key Account Manager</h4>
                <p className="text-muted-foreground leading-relaxed">Flotele corporate nu sună la call-centerul general. Vei avea alocat un specialist dedicat (KAM) care are numărul tău în agendă și care coordonează prioritizarea dosarelor tale de daună personal.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Decontare Accelerată cu Service-uri</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemele de aprobare a devizelor sunt pre-aprobate pentru flotele mari la reprezentanțe, astfel încât o dubă lovită e dezasamblată și reparată din prima zi, fără staționări în curtea vopsitoriei luni de zile.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">De la câte autovehicule se consideră "Flotă"?</h3>
                <p className="text-muted-foreground leading-relaxed">La Generali și majoritatea marilor jucători de top, analiza dosarului ca "Flotă" distinctă (cu discounturi negociate manual, nu pe algoritm) începe de obicei de la minim 5 - 10 vehicule motorizate aflate în proprietatea aceluiași CUI, însă optimizările majore apar la peste 20-30 de vehicule.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă vând o mașină din Flotă la jumătatea anului?</h3>
                <p className="text-muted-foreground leading-relaxed">Se trimite contractul de vânzare-cumpărare. Mașina este scoasă de pe polița Master în ziua respectivă, iar primele neconsumate (pe restul de luni rămase) sunt fie returnate în contul companiei, fie sunt folosite ca avans (credit) pentru adăugarea viitoarelor mașini pe poliță.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Un șofer pe mașina firmei face accident cu alcoolemie. Ce se întâmplă?</h3>
                <p className="text-muted-foreground leading-relaxed">Regulile de bază rămân inflexibile chiar și la Flotă. Generali (pe RCA) va despăgubi victima terță lovită pentru a nu o lăsa pe drumuri, însă va face "Regres" - adică firma de asigurări va da în judecată direct ȘOFERUL angajat al firmei tale vinovat de consum de alcool, recuperând banii de la el.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Eficientizează Costurile Companiei</h2>
            <p className="text-xl text-muted-foreground">Începe auditul asigurărilor rutiere alături de departamentul Corporate.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Solicită Ofertă Pentru Parc Auto" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Analiză B2B Gratuită</h3>
              <p className="text-muted-foreground mb-8">
                Trimite-ne centralizatorul actual al vehiculelor în Excel pe WhatsApp. Vom face o paralelă directă de cost și beneficii între ce plătești acum vs. noul sistem Flotă propus de noi.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Tabel Flotă / CUI</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Contact Divizia Corporate</div>
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
