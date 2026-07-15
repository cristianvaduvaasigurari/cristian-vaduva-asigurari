import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Building2, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Sănătate Corporate | Cristian Văduva",
  description: "Transformă retenția angajaților tăi cu cel mai dorit beneficiu extra-salarial din România: polița privată de sănătate cu acoperire spitalicească premium.",
};

export default function HealthCorporateInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="health-insurance-corporate" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Building2 className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea de Sănătate B2B (Corporate)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Într-o piață muncii hiper-competitivă, bonurile de masă sau masa de ping-pong au devenit insuficiente. Oferind echipei tale o asigurare completă de sănătate arăți o responsabilitate enormă ca angajator și obții o deducere fiscală maximă. Alege beneficiul numărul unu, votat de toți specialiștii români.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Beneficiile Echipei</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută cu Expertul HR / Corporate
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
                Mai puternic decât abonamentul clasic
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Multe companii din România le oferă angajaților un simplu "abonament medical" la un singur furnizor de servicii medicale. Acel abonament este util doar pentru boli minore (răceli) și câteva reduceri comerciale de 20%.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea Generali B2B schimbă radical paradigma. Oferă echipelor acces nelimitat la TOATE marile rețele (Regina Maria, MedLife, Sanador) sub același contract. În plus, când angajatul are o problemă cruntă de zeci de mii de euro (operații), asigurarea achită integral. Abonamentul l-ar lăsa pe angajat singur cu factura.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Optimizarea Fiscală Excelentă
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Statul Român încurajează firmele să asigure sănătatea cetățenilor oferind scutiri fiscale gigantice. Spre deosebire de o mărire salarială la care statul îți ia încă jumătate din bani sub formă de taxe (CAS/CASS), asigurarea este 100% deductibilă.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea este DEDUCTIBILĂ în limita a 400 Euro / an / angajat. Firma oferă o valoare netă imensă resurselor umane fără să încarce statul de plată a taxelor pe acel beneficiu extra-salarial.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Profilul Companiei care Cumpără B2B
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul este valid indiferent dacă ești un startup antreprenorial sau o multinațională:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Firmele IT și Software Development</h4>
                <p className="text-muted-foreground">Unde bătălia pentru atragerea programatorilor talentați este sângeroasă, o asigurare VIP "Full Options" devine un argument crucial de acceptare a ofertei de muncă.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Echipele Medicale (Farmacii, Distribuție)</h4>
                <p className="text-muted-foreground">Companii care înțeleg cel mai bine sistemul și preferă să-și respecte oamenii punându-i dincolo de limitările statului român.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">IMM-urile (de la minim 5-10 angajați)</h4>
                <p className="text-muted-foreground">Spre deosebire de trecut, asigurătorii permit acum generarea de "Pool-uri Corporate" chiar și pentru firme mai mici de apartament, cu tarife extrem de competitive ce o mărire de salariu de doar 100 Lei.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Multinaționalele (Producție & Retail)</h4>
                <p className="text-muted-foreground">Prin sistemele flexibile, asigurările oferă planuri diferențiate (Ex. Pachet Gold pentru Directori, Pachet Silver pentru specialiști), administrând bugetul HR optim.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">ROI-ul Angajatorului</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Retenție și Loializare HR</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Studiile eJobs confirmă anual: sănătatea privată este "must-have" în beneficiile cerute la interviuri. Dacă le oferi o poliță care le extinde acoperirea și soției/copilului angajatului (cu preluare de pe cardul de salariu la un preț B2B negociat), plecarea lui la competiție e foarte scumpă emoțional.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Scăderea absenteismului ("Zile Medicale")</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când un angajat are o problemă, dacă stă după RMN-ul gratuit la stat va lipsi de la birou 3 luni (fizic și mental, fiind stresat). Prin asigurare, face RMN a doua zi, se tratează, și vine la birou relaxat, valid, restabilind rapid productivitatea.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Fără Chestionare Medicale Severe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spre deosebire de omul de rând care aplică la o poliță și îi sunt excluse afecțiunile, într-un pachet Corporate MARE (ex: 50+ angajați), asigurătorul ignoră total istoricul medical al oamenilor. Boli cronice pre-existente din echipa ta sunt acoperite 100% direct!
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Treptele de Protecție B2B (Modulare)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Modul Baza: Ambulatoriu nelimitat</div>
                  <div className="text-sm text-muted-foreground">Oamenii tăi pot merge la orice control ORL, pot face orice investigații de sânge necesare conform ghidurilor clinice complet gratuit. Fără costuri suplimentare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Modul Gold: Spitalizare + Chirurgie</div>
                  <div className="text-sm text-muted-foreground">Transformarea adevărată. Operațiile minim invazive, cele deschise, protezările, care depășesc lejer 15-20 mii de Lei, sunt suportate integral sau până la anumite plafoane înalte dictate de voi.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Medicina Muncii (Integrată gratuit)</div>
                  <div className="text-sm text-muted-foreground">Suntem flexibili. Generali vă poate include controlul anual obligatoriu al statului (Control Medicina Muncii) fix în factura poliței, pentru a elimina un alt furnizor de care HR-ul trebuie să se ocupe separat anual.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Stomatologie / Prevenție</div>
                  <div className="text-sm text-muted-foreground">Se pot stabili bugete anuale decontate (ex: 500-1000 LEI per angajat) pentru tratamente stomatologice scumpe pe care mulți tineri le evită.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Cost versus Beneficiu Emoțional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Salvarea unui Key-Account Manager</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cristian este cel mai bun om de vânzări IT din firma ta. La ecografia generală anuală gratuită de pe poliță, doctorii Generali depistează devreme un nodul oncologic perfect tratabil. 
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Generali acoperă chirurgia imediat, chimioterapia în rețeaua Amethyst / MedLife. Cristian se recuperează rapid și supraviețuiește. Cristian va fi loial firmei tale care i-a oferit această asigurare probabil pentru toată viața sa activă. Nicio mărire de salariu nu cumpără această loialitate.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Alternativa Măririi Salariale</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Decizi să îi mărești salariul unui angajat cu 250 RON Brut pe lună (îți costă firma vreo 255 Lei din fondul de salarii). Angajatul primește "în mână" vreo 130 de Lei (2 pizza). Când angajatul respectiv se va opera la Sanador, cei 130 de lei în plus lunar din ultimul an îl vor ajuta prea puțin la factura de 15.000 Lei.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Calcul Fiscal:</span> Investind aceiași 255 LEI într-o poliță B2B, scapi total de taxe. Generali îi emite pachetul chirurgical extins, iar angajatul beneficiază de plafon uriaș neîngrădit în fața tragediilor.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Avantajul B2B Integrat Generali</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Departamentul HR nu are timp să deconteze facturi sau să dea telefoane medicilor. Odată negociat contractul Master, angajații comunică direct cu platformele Generali.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Aplicație Mobilă Integrată</h4>
                <p className="text-muted-foreground leading-relaxed">Fiecare din cei 50 sau 500 de angajați are contul lui, dosarul său medical în cloud, cardul de asigurat pe telefon și sistemul prin care cere singur rambursările dacă alege doctori non-parteneri. HR-ul doarme liniștit.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Independența Clinică (Libertatea Absolută)</h4>
                <p className="text-muted-foreground leading-relaxed">Nu ești captiv unei singure mari clini. Dacă angajații tăi din Cluj preferă rețeaua Regina Maria, iar cei din București vor MedLife, contractul Generali acomodează ambele preferințe, deoarece noi suntem "Asiguratorul Financiar", nu proprietarii clădirii.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Deductibilitate Fiscală Premium</h4>
                <p className="text-muted-foreground leading-relaxed">Încurajată fiscal. Toate facturile emise de Generali merg pe contul firmei. Profitul scade contabil, iar compania nu reține CAS/CASS/Impozit din ele, cât timp pachetul nu depășește limita anuală echivalentă a 400 EUR per cap.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente de la CEO / HR</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce facem dacă un angajat își dă demisia? Pierd banii plătiți pe an?</h3>
                <p className="text-muted-foreground leading-relaxed">Nicidecum. Flotele B2B funcționează exact ca leasing-ul. Ne trimiteți o simplă notificare în Excel, polița omului plecat se anihilează și se va refactura pe "storno" în următoarea lună (dacă s-a plătit în avans), iar contul lui este preluat instantaneu de noul tău angajat la semnarea actelor de muncă.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Angajații vor să își includă și soțiile/copiii în contractul VIP. Plătește firma?</h3>
                <p className="text-muted-foreground leading-relaxed">Puteți decide politica. Dacă bugetul firmei nu acoperă rudele, sistemul permite o extindere extraordinară: Angajatul bifează includerea copilului în pachet, iar tariful este pur și simplu reținut lunar direct din statul lui de plată (payroll deduction) de către HR la prețuri uriaș de avantajoase datorită apartenenței la grupul de companie.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu ca patron (administrator) pot să îmi fac doar eu asigurare pe firmă?</h3>
                <p className="text-muted-foreground leading-relaxed">Din punct de vedere legal, facilitățile fiscale pentru "asigurări voluntare" vizează protecția "angajaților". Însă, pentru pachete IMM dedicate asociaților (și minimului de angajați), vom construi structura potrivită contabilă. Da, te poți proteja la superlativ pe CUI-ul afacerii tale.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Investește În Capitalul Tău Uman</h2>
            <p className="text-xl text-muted-foreground">Contactează experții diviziei B2B pentru o ofertă detaliată a grilelor medicale.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Sănătate (Flotă Corporate)" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Discuția Strategică de HR</h3>
              <p className="text-muted-foreground mb-8">
                Nu există oferte standard B2B. Costul per angajat derivă din numărul mediu de salariați, demografia lor (media de vârstă) și limitele pachetului chirurgical selectat.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Numărul de Angajați</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Divizia Corporate Health</div>
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
