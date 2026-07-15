import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicePageIntro } from "@/components/sections/service-page-intro";
import { ContactForm } from "@/components/sections/contact-form";
import { Activity, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurări de Sănătate Private | Cristian Văduva",
  description: "Acces prioritar în clinicile și spitalele private de top, pentru siguranța ta medicală deplină.",
};

export default function HealthInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ServicePageIntro slug="health-insurance" />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-blue-600 mb-8 border border-border bg-blue-50">
              <Activity className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurări Private de Sănătate Premium
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Timpul înseamnă viață, iar sănătatea ta nu suportă liste de așteptare. Acces direct și nelimitat la excelența medicală din spitalele și clinicile private de top din România și Europa. Pentru că deciziile medicale vitale nu trebuie să depindă de bugetul tău de moment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Configurează Pachetul Medical</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Discută cu Cristian Văduva
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
                Ce este această asigurare?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea Privată de Sănătate este un sistem de decontare directă și acces prioritar la rețelele de clinici și spitale private, funcționând complet independent de sistemul de stat de sănătate. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Asigurătorul tău devine practic susținătorul tău financiar în fața spitalelor particulare. Tu beneficiezi de analize, RMN-uri complexe sau intervenții chirurgicale într-o rezervă VIP, iar la finalul internării factura uriașă a spitalului este trimisă direct către compania de asigurări pentru achitare integrală.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                De ce este o necesitate absolută?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Din păcate, sistemul public de sănătate poate fi adesea supraaglomerat. Timpul de așteptare pentru un simplu RMN poate fi de luni de zile. În cazul diagnosticelor severe, orice săptămână pierdută scade drastic șansele de vindecare.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pe de altă parte, tratamentele private neasigurate au prețuri colosale. O intervenție chirurgicală la coloană într-un spital privat românesc depășește frecvent 10.000 EUR. Polița de sănătate elimină acest stres financiar, transferând toată presiunea facturilor pe un buget corporativ nelimitat.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Pentru cine este creat acest pachet?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Asigurarea privată se potrivește perfect stilului de viață modern, fiind o plasă de siguranță esențială pentru cei care prioritizează timpul și calitatea absolută:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Familiile cu copii mici</h4>
                <p className="text-muted-foreground">Pachetele Family acoperă consultațiile frecvente, bolile copilăriei și oferă liniștea de a suna un pediatru privat la orice oră din noapte, fără vizite traumatizante la camerele de gardă de stat.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Liber Profesioniști / Antreprenori</h4>
                <p className="text-muted-foreground">Cei care nu beneficiază de un pachet de beneficii medicale dintr-o corporație și sunt nevoiți să își finanțeze singuri sănătatea, dorind cel mai bun scut medical posibil.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane extrem de ocupate</h4>
                <p className="text-muted-foreground">Care nu își permit luxul de a petrece zile întregi așteptând la cozi. Prin polița noastră programările se fac rapid, onorând importanța timpului tău.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane vizând expertiza globală</h4>
                <p className="text-muted-foreground">Persoanele care achiziționează extensii teritoriale, permițându-le operații extrem de delicate la clinici celebre din Viena sau Paris, pe cheltuiala asigurării.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției Private</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Fără Cozi și Stres</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Programările se realizează fie telefonic prin linia dedicată de asistență Generali, fie direct în aplicația rețelei medicale, cu acces extrem de rapid la specialiști excelenți.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Condiții de Lux</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spitalizarea se face în rezerve single cu confort hotelier, adesea alături de un aparținător (în cazul copiilor), unde igiena și standardul serviciilor sunt desăvârșite.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">A doua opinie medicală</h3>
                <p className="text-muted-foreground leading-relaxed">
                  În caz de diagnostice crunte, ai acoperit dreptul și costul de a trimite dosarul tău medical unor echipe de experți din clinici internaționale, pentru o confirmare independentă.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce proceduri și riscuri acoperim exact?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Ambulatoriu și Investigații</div>
                  <div className="text-sm text-muted-foreground">Consultații la medici generaliști și specialiști. Analize de sânge decontate complet. RMN, CT, Ecografii, Endoscopii și alte servicii imagistice majore.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Spitalizare și Chirurgie</div>
                  <div className="text-sm text-muted-foreground">Zile de internare și proceduri chirurgicale complexe, fie prin metode clasice, fie minim invaziv, inclusiv anestezia și materialele sanitare specifice spitalului privat.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Sarcină și Naștere (Maternitate)</div>
                  <div className="text-sm text-muted-foreground">O clauză ce decontează strict costurile asociate vizitelor ginecologice din perioada sarcinii și, vital, o parte sau costul total al nașterii (naturală/cezariană) într-o maternitate privată de lux.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Stomatologie</div>
                  <div className="text-sm text-muted-foreground">Opțional. Acoperă tratamentele dentare de urgență sau reparațiile dentare curente în limita unui plafon anual de câteva sute de euro, conform pachetului.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Asigurarea în Viața Reală
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Trauma Sportivă</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Andrei joacă fotbal duminica cu prietenii și suferă o ruptură de ligamente încrucișate (LIA). La stat, operația ar fi fost programată peste câteva luni. În schimb, el merge a doua zi la o clinică privată renumită.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Intervenția complexă artroscopică de 4.500 EUR este aprobată de compania de asigurări instant. Andrei se operează miercuri și nu plătește absolut nimic din buzunar la recepția spitalului.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Pachetul Family și Copiii</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fiica de 4 ani a Elenei face brusc febră 40 grade în timpul nopții. Elena apelează linia de urgență a rețelei private partenere Generali, în loc să riște contactul cu zeci de alte viroze la stat.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Medicul o primește în rezerva VIP imediat, pune diagnosticul de bronșiolită și o internează pentru rehidratare și oxigen timp de 2 zile. Factura de internare pediatrică (aprox. 800 EUR) e ștearsă automat prin poliță. Elena doar a prezentat telefonul la recepție.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce Pachetul Medical de la Generali?</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Spre deosebire de un abonament simplu vândut direct de o singură clinică, asigurarea de sănătate îți oferă de fapt mult mai multă putere: libertatea de a alege.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Rețea Deschisă Universală</h4>
                <p className="text-muted-foreground leading-relaxed">Un abonament simplu te limitează să mergi la o singură clinică. Polița Generali îți permite să mergi azi la Regina Maria, mâine la Medlife, și la intervenție la Sanador sau Ponderas. Tu alegi cel mai bun medic din România, nu clinica.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Plafoane Reale pentru Spitalizare</h4>
                <p className="text-muted-foreground leading-relaxed">Abonamentele acoperă "discount-uri" la spitalizare. Asigurarea noastră de sănătate are limite masive (de exemplu 50.000, 100.000 sau 1 milion de EUR anual) care absorb efectiv costurile spitalelor, nu doar îți dau reducere 10%.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Aplicație Digitală Rapidă</h4>
                <p className="text-muted-foreground leading-relaxed">Decontările se aprobă extrem de facil. Ești conectat în permanență prin aplicația Generali la istoricul tău medical și limitele disponibile de consum.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (FAQ)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Sunt acoperite bolile pe care le am deja? (Afecțiuni preexistente)</h3>
                <p className="text-muted-foreground leading-relaxed">Aici intervine diferența de la caz la caz. Compania de asigurări preia "riscuri", nu certitudini. Daca suferi deja de o hernie de disc înainte de semnarea poliței, asigurătorul nu va plăti imediat operația acesteia (excludere sau perioadă lungă de așteptare). Totuși, bolile care apar nou după ce polița este în vigoare, sunt acoperite 100% conform pachetului.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă merg la o clinică care nu lucrează direct cu Generali?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița este flexibilă! Te poți trata la orice clinică dorești (inclusiv una non-parteneră). Va trebui doar să plătești tu factura pe loc cu cardul, și apoi să ne trimiți dovada plății și raportul medical pentru a-ți vira banii înapoi pe card în sistem de rambursare.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Este posibil să asigurați persoane trecute de 65 de ani?</h3>
                <p className="text-muted-foreground leading-relaxed">Există pachete special adaptate seniorilor, însă ele sunt supuse unor limitări și grile de subscriere mai riguroase din pricina riscurilor medicale ridicate. Solicită o ofertă pentru a evalua eligibilitatea exactă.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Investește în Sănătatea Ta Astăzi</h2>
            <p className="text-xl text-muted-foreground">O discuție de 10 minute îți poate scuti familia de facturi medicale de zeci de mii de euro. Solicită o ofertă gratuită.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Obține Oferta Premium pentru Sănătate" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Asistență Rapidă</h3>
              <p className="text-muted-foreground mb-8">
                Configurează pachetul perfect (Consultații, Spitalizare, Maternitate) direct pe WhatsApp alături de un expert.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie-ne pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Sună pentru Consultanță</div>
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
