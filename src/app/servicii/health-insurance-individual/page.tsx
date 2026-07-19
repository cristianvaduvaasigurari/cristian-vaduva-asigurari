import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { HeartPulse, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Sănătate Individuală | Cristian Văduva",
  description: "Acces privat nelimitat în cele mai bune clinici din România. Sari peste listele de așteptare din sistemul de stat și obține diagnosticări rapide.",
};

export default function HealthIndividualInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="health-insurance-individual" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-lg glass text-emerald-600 mb-8 border border-border bg-emerald-50">
              <HeartPulse className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea de Sănătate Individuală
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Timpul este critic atunci când ești bolnav. O asigurare privată de sănătate îți deschide imediat ușile clinicilor și spitalelor private de top din România, fără liste de așteptare interminabile, garantându-ți acces la consultații de specialitate, RMN/CT și intervenții chirurgicale complexe la standarde europene.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Configurează Pachetul Medical</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Cere Detalii pe WhatsApp
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
                Diferența Asigurare vs. Abonament
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Există o confuzie frecventă în piață între "Abonamentul la o clinică" și "Asigurarea de Sănătate". Un abonament te leagă de O SINGURĂ rețea de clinici și îți oferă discounturi mici (ex: 20%) la operații. Dacă te îmbolnăvești grav, tot va trebui să scoți mii de euro din buzunar.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea Privată de Sănătate este un instrument financiar real. Cu ea poți merge la ORICE clinică de top dorești (MedLife, Regina Maria, Sanador, Ponderas etc). Când apare o problemă chirurgicală majoră, polița decontează 100% din facturile de zeci de mii de lei.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Viteza de Diagnosticare
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Sistemul de stat CNAS oferă fonduri limitate. Pentru a face un RMN gratuit trebuie să aștepți 3-4 luni. Dar anumite afecțiuni, cum sunt suspiciunile oncologice sau neurologice, nu pot aștepta 4 luni fără ca boala să avanseze ireversibil.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurarea Generali îți finanțează direct imagistica avansată la privat. Faci RMN-ul mâine, îți afli diagnosticul rapid și începi tratamentul imediat. Îți cumperi efectiv "timp" în cursa cu boala.
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
              Această poliță este soluția supremă pentru oricine prioritizează calitatea vieții și refuză să depindă exclusiv de spitalele de stat:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Profesioniștilor Independenți (PFA, Freelanceri)</h4>
                <p className="text-muted-foreground">Care își gestionează propriul buget medical și știu că o săptămână pierdută în cozi la policlinici înseamnă bani pierduți din propria afacere.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Adulților Proactivi (25-45 ani)</h4>
                <p className="text-muted-foreground">Oameni care fac preventiv ecografii și analize anuale, prețuind luxul de a alege doctori cu renume din piața privată fără constrângeri de cost.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoanelor cu afecțiuni în stadii incipiente</h4>
                <p className="text-muted-foreground">Deși afecțiunile cronice severe pre-existente pot avea timpi de așteptare, o poliță activată la timp preia toate investigațiile necesare descoperirii bolii și menținerii stării de sănătate.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Viitoarelor Mămici (planificare naștere)</h4>
                <p className="text-muted-foreground">Atenție: trebuie încheiată cu ~10 luni ÎNAINTE de momentul nașterii pentru a acoperi costurile uriașe ale maternității private și celulelor stem.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Standarde de Excelență Medicală</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Decontare Directă Fără Banii Tăi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  În marea majoritate a rețelelor uriașe partenere, mergi, faci analizele și pleci acasă. Nu trebuie să plătești tu și să ceri apoi banii companiei. Generali decontează automat factura direct cu spitalul privat.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Libertatea Alegerii Clinicii</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă ești asigurat Generali, luni poți face consultația la o clinică MedLife din nordul capitalei, iar marți poți merge la o ecografie în rețeaua Regina Maria. Polița este universală în sistemul privat.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">A Doua Opinie Medicală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pachetele premium asigură trimiterea dosarului tău medical complex către experți internaționali (ex: Viena, Germania) pentru a confirma corectitudinea diagnosticului dat în România, oferindu-ți certitudine absolută.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Arhitectura acoperirilor medicale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ambulatoriu (Baza)</div>
                  <div className="text-sm text-muted-foreground">Medicină de familie, consultații la medici specialiști (cardiolog, dermatolog), recoltări analize de laborator, radiografii și ecografii curente, necesare zi de zi.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Spitalizare și Chirurgie (Major)</div>
                  <div className="text-sm text-muted-foreground">Miezul asigurării. Acoperă cazarea în rezerva privată single, costul consumabilelor, anesteziei și tariful chirurgilor pentru intervenții extrem de scumpe (ex. laparoscopie de apendicită 8000 Lei).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Stomatologie Preventivă și Reparatorie</div>
                  <div className="text-sm text-muted-foreground">Module adiționale care pot fi activate pentru detartraje anuale, carii simple, extracții sau radiografii dentare panoramice.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Tratamentul Cancerului</div>
                  <div className="text-sm text-muted-foreground">Unele pachete excepționale Generali au preluat chiar și plata radioterapiei și chimioterapiei în sistem privat, care altfel sunt extrem de costisitoare de suportat din bani proprii.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Soluții Salvatoare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Cazul 1: Hernia de Disc Dureros</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Marian resimte dureri lombare violente și îi amorțește piciorul. Medicul de familie îi dă trimitere la RMN, dar la stat nu există fonduri până în septembrie. Marian are dureri azi.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având polița Generali activă, Marian sună la un spital privat și se programează la RMN-ul care confirmă hernia a doua zi. Neurologul privat recomandă operație cu laser minim invaziv. Intervenția costă 12.000 LEI. Generali decontează integral 100% spitalizarea și operația, Marian ieșind sănătos din spital vineri.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Cazul 2: Ipohondrul Prudent</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Elena e stresată mereu de sănătatea ei. Prin abonamentul corporate avea doar 3 consultații incluse. Plătind separat un set complet de analize la privat a costat-o 800 de lei.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Trecând pe Asigurare Individuală de Sănătate completă, Elena poate merge lunar la endocrinolog, ginecolog, alergolog și poate face pachetele anuale complexe de bio-chimie sanguin complet gratuit, costul anual al poliței fiind deja amortizat din primele două seturi de investigații folosite preventiv.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Un Gigant în Asigurările de Sănătate</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Pe piața locală, Generali deține una dintre cele mai performante rețele proprii și de parteneri medicali.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Peste 700 de clinici în rețea</h4>
                <p className="text-muted-foreground leading-relaxed">Avem acoperire medicală în toate județele din România, contractând spitale universitare, policlinici locale bune și giganți naționali (ex: Regina Maria, MedLife, Sanador, Medicover).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Decontare la Sistemul Liber</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă doctorul tău de încredere lucrează la un cabinet privat mic care NU are contract cu Generali, tu plătești chitanța la el, o încarci în aplicație și noi îți rambursăm banii în contul tău bancar.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Asistență Telefonică Medicală</h4>
                <p className="text-muted-foreground leading-relaxed">Ai un simptom acut duminică? Suni la dispecerat, iar un medic cu aviz de practică răspunde, te triază și te direcționează exact spre Camera de Gardă privată care poate deconta cazul tău.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt bolnav de diabet de 5 ani. Mă primește asigurarea?</h3>
                <p className="text-muted-foreground leading-relaxed">Înainte de semnarea contractului vei completa un "Chestionar Medical". De regulă, asigurătorul te acceptă, însă bolile preexistente cronice severe pot atrage fie o "suprataxă" (primă mărită), fie o perioadă de așteptare de un an, fie excluderea strictă a bolii respective (vei fi asigurat pentru restul bolilor din lume, mai puțin pentru tratamentele diabetului vechi).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Dacă renunț peste un an la asigurare, primesc bani înapoi?</h3>
                <p className="text-muted-foreground leading-relaxed">Nu. Asigurarea de Sănătate privată funcționează ca CASCO la mașină. Cumperi "protecție" pe durata acelui an. Dacă nu ai folosit-o deloc, te bucuri că ai fost perfect sănătos! Banii au fost folosiți de companie pentru a susține riscul comun al asiguraților bolnavi din acel an.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Trebuie să renunț la plata CNAS la stat dacă îmi iau poliță privată?</h3>
                <p className="text-muted-foreground leading-relaxed">Plata contribuției la sănătate la stat (CASS din salariu) rămâne o obligație fiscală absolută în România, nu poți alege să nu o plătești. Asigurarea Generali este un scut "Facultativ Suplimentar", o plasă de siguranță premium care se suprapune sistemului obosit de stat.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Investește în Starea Ta de Bine</h2>
            <p className="text-xl text-muted-foreground">Configurează pachetul ideal împreună cu un specialist în Sănătate, adaptat istoricului tău clinic.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Profil Medical Individual" />
            </div>
            
            <div className="glass rounded-lg p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Pachete Modulare</h3>
              <p className="text-muted-foreground mb-8">
                Asigurările de sănătate au multiple "etaje". Vrei doar ambulatoriu? Sau vrei și protecție totală pentru un transplant internațional? Construim oferta după dorința ta.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Inițiază Consultanța</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Expertizare Costuri Medicale</div>
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
