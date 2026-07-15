import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Shield, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RCA - Asigurarea Auto Obligatorie | Cristian Văduva",
  description: "Răspunderea Civilă Auto: protecția legală indispensabilă pentru orice vehicul care circulă pe drumurile publice din România.",
};

export default function RcaInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-emerald-600 mb-8 border border-border bg-emerald-50">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea RCA
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Răspunderea Civilă Auto nu este doar o taxă legală, ci scutul care protejează bugetul familiei tale de despăgubirile financiare uriașe pe care ar trebui să le plătești dacă accidentezi din greșeală vehiculul sau chiar persoana unui terț participant la trafic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Calculează Tarif RCA</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Emite Rapid pe WhatsApp
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
                Principiul RCA-ului
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurarea RCA se încheie pentru a despăgubi persoana pe care o accidentezi TU, nu pentru a-ți repara propria mașină.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Legea din România stabilește praguri foarte ridicate (milioane de euro) pentru daunele pe care polița RCA este obligată să le achite în locul tău (vătămări corporale grave, daune materiale pe autostradă). Fără acest sistem global de compensare, orice tamponare ar rezulta în litigii civile în instanță ce ar falimenta un șofer de rând.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Legalitate și Decontare Directă
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Absența RCA-ului la controlul rutier se sancționează aspru: reținerea certificatului de înmatriculare, retragerea plăcuțelor cu numărul de înmatriculare și o amendă de până la 2000 RON.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dincolo de legalitate, introducerea clauzei opționale de <strong>Decontare Directă</strong> face ca RCA-ul să te despăgubească pe tine atunci când tu ești victima, scutindu-te să interacționezi cu compania (poate rău-platnică) a celui vinovat.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cine are nevoie de RCA?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obligativitatea acoperă o gamă largă de vehicule, indiferent de frecvența utilizării:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoanele fizice care dețin autoturisme</h4>
                <p className="text-muted-foreground">Orice mașină care stă parcată pe domeniul public (chiar dacă nu circulă) are nevoie legal de RCA valabil.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Trotinete Electrice și Biciclete cu motor</h4>
                <p className="text-muted-foreground">Conform noilor reglementări legislative rutiere, vehiculele ușoare propulsate electric ce depășesc o anumită viteză necesită asigurare RCA.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Motocicliști și Scuteriști</h4>
                <p className="text-muted-foreground">Riscul de a avaria mașini la treceri printre benzi este major, iar RCA-ul pentru moto este de obicei foarte accesibil financiar.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Comercianții de mașini (Numere roșii)</h4>
                <p className="text-muted-foreground">Polița pe o lună de zile necesară doar pentru procesul de testare și înmatriculare auto.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Sistemului Modern RCA</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Sistemul Bonus-Malus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conducerea prudentă te răsplătește. Șoferii fără accidente pe parcursul anilor (clasa B8) beneficiază de o reducere de până la 50% din tariful standard de bază.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cartea Verde Inclusă</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Polița RCA românească vine din oficiu cu protecție valabilă în toate statele din Spațiul Economic European. Ești asigurat automat dacă lovești un vehicul în Austria.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Format 100% Digital</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu mai e nevoie să o ai printată la torpedou. Polița este trimisă pe email și poate fi prezentată Poliției direct de pe ecranul telefonului mobil (fiind verificată în baza centralizată AIDA).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce Plătește RCA-ul pentru Tine?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Daune Materiale Directe</div>
                  <div className="text-sm text-muted-foreground">Achită facturile service-urilor care repară mașina lovită de tine (tablă, vopsitorie, mecanică), sau despăgubește gardul vecinului în care ai intrat cu mașina.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Vătămări Corporale și Deces</div>
                  <div className="text-sm text-muted-foreground">Cel mai grav risc: acoperă costurile spitalizării victimelor și daunele morale/materiale dictate de instanță familiilor acestora (limita legală fiind de peste 6 milioane de euro).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Cheltuieli de Judecată</div>
                  <div className="text-sm text-muted-foreground">Dacă ești dat în judecată de către victima accidentului, compania de asigurări suportă inclusiv plata cheltuielilor pe care ești obligat să le plătești conform legii civile.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Mașină la Schimb pentru Victimă</div>
                  <div className="text-sm text-muted-foreground">Polița RCA va deconta și mașina de închiriat de care celălalt șofer are nevoie pe perioada în care autoturismul său lovit de tine se află în reparație la service.</div>
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
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Tamponarea Ușoară și Decontarea Directă</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ești oprit la semafor. Cineva nu frânează la timp și te lovește ușor din spate, stricând bara. Faceți constatare amiabilă. Cel vinovat are o poliță la un asigurător recunoscut pentru întârzieri de plată și refuzuri la service.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deoarece tu ți-ai cumpărat propriul RCA la Generali cu clauza de "Decontare Directă", deschizi dosarul direct la Generali (firma ta excelentă). Generali îți repară mașina fără stres la o reprezentanță de top, urmând ca ei să își recupereze banii mai târziu de la firma vinovatului. Ești ferit total de coșmar.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Paguba de proporții</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Neacordare de prioritate la viraj. Lovești un Mercedes Maybach nou, dauna fiind de peste 40.000 EUR la componente.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Având un RCA valabil, factura colosală este absorbită 100% de către asigurător. Tu ești penalizat doar cu scăderea cu 2 clase de Bonus-Malus pentru anul următor (vei plăti polița viitoare puțin mai scump), evitând poprirea conturilor pe viață pentru plata daunelor civile.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">De ce e vital să faci RCA la companii serioase (precum Generali)</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Să cumperi cel mai ieftin RCA posibil este periculos, mai ales dacă dorești să îți adaugi decontare directă pentru a beneficia tu de acele servicii.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Respect în Piață</h4>
                <p className="text-muted-foreground leading-relaxed">Polițele emise de companii solide tip Generali sunt acceptate la plată imediată de orice reprezentanță auto beneficiu (BMW, Mercedes) din România, fără cereri de plată suplimentară din partea victimei.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Decontare Directă Reală</h4>
                <p className="text-muted-foreground leading-relaxed">Când îți repari mașina pe decontarea ta directă, vrei un service excepțional care acceptă decontarea rapidă pe baza reputației companiei care plătește dauna.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Call Center beneficiu</h4>
                <p className="text-muted-foreground leading-relaxed">Accidentele generează panică. Să poți suna la orice oră din noapte și să îți răspundă un agent uman care îți explică cum să completezi amiabila e un serviciu de lux neprețuit.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce se întâmplă dacă fac accident și am RCA pe 1 lună care a expirat de 2 zile?</h3>
                <p className="text-muted-foreground leading-relaxed">Consecințele sunt dezastruoase. Poliția îți reține certificatul, plătești o amendă uriașă, iar reparația mașinii celuilalt va trebui achitată integral, numerar, de către tine. Nu există nicio zi de grație la RCA.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">De ce este polița mea mai scumpă decât a prietenului meu pentru aceeași mașină?</h3>
                <p className="text-muted-foreground leading-relaxed">RCA-ul ia în calcul vârsta proprietarului (șoferii sub 30 de ani au tarife semnificativ mai mari din cauza statisticii incidentelor), localitatea în care este înregistrată mașina (orașele mari au risc major) și mai ales istoricul de daune (Bonus-Malus).</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cine completează Amiabila? O pot face pe telefon?</h3>
                <p className="text-muted-foreground leading-relaxed">Da! Acum se folosește intens aplicația "Amiabila" aprobată oficial, cu care ambii șoferi (dacă sunt de acord asupra vinovăției și sunt doar 2 mașini implicate) completează digital totul pe un singur ecran, inclusiv schema desenată. Aplicația trimite direct dosarul către asigurători.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Emite RCA-ul Acum</h2>
            <p className="text-xl text-muted-foreground">Primești polița pe WhatsApp și pe email în mai puțin de 5 minute.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Tarif RCA" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emisia Digitală 100%</h3>
              <p className="text-muted-foreground mb-8">
                Doar ne fotografiezi buletinul și talonul pe WhatsApp. Calculăm exact clasa ta de bonus-malus și îți trimitem cotația cu și fără Decontare Directă.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Talonul pe WhatsApp</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Emitere</div>
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
