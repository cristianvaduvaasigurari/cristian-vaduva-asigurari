import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { CalendarDays, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Travel Multi-Trip Anuală | Cristian Văduva",
  description: "Cumperi o singură dată și călătorești protejat tot anul. Ideală pentru nomazii digitali și turiștii cu zboruri frecvente de weekend.",
};

export default function TravelAnnualInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-cyan-600 mb-8 border border-border bg-cyan-50">
              <CalendarDays className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Multi-Trip (Anuală)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Călătorești des? Să introduci datele cardului și să cumperi online o poliță individuală înainte de fiecare zbor devine frustrant. Varianta "Annual Multi-Trip" este abonamentul tău tăcut: o cumperi în ianuarie și te protejează automat la TOATE zborurile pe care le faci anul acela.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Abonament Travel Anual</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Solicită Detalii pe WhatsApp
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
                Cum funcționează formatul Anual?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Spre deosebire de produsul individual (unde declari că zbori pe 10 mai și te întorci pe 17 mai), polița Multi-Trip se emite generic de la 1 Ianuarie la 31 Decembrie (sau un an fix).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Din momentul emiterii ei, poți ieși și re-intra în România de zeci de ori (nelimitat). Condiția principală a acestor pachete (pentru a le menține ieftine) este ca nicio călătorie izolată, la liber, să nu depășească de regulă 30, 45 sau 60 de zile calendaristice neîntrerupte de stat afară.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Economia Financiară Radicală
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Matematica este simplă: dacă faci 5-6 city-break-uri și concedii pe an (ex: Roma de Valentine's Day, Paște în Grecia, vară în Antalya, Revelion în Viena), achiziția a 6 polițe individuale separate devine costisitoare.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița anuală "bate" prețul a trei călătorii. Dacă știi că ieși de cel puțin 3-4 ori pe an din țară, acest produs devine varianta mult mai rentabilă, cu garanții și plafoane la fel de sigure ca la produsele individuale.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Cui îi este recomandată?
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instrumentul reprezintă un "must-have" în portofoliul oamenilor conectați global, reducând riscul expunerii prin comoditate:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Turistul de "Weekend"</h4>
                <p className="text-muted-foreground">Care vânează zboruri Wizz/Ryanair și pleacă adesea vineri seara după muncă spre o nouă capitală europeană, fără timp de planificare acte.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Persoane cu parteneri în străinătate</h4>
                <p className="text-muted-foreground">Români care călătoresc lunar în Germania sau Anglia cu o frecvență ridicată pentru a-și vizita familiile sau iubiții/iubitele stabiliți acolo.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Freelancerii și Nomazii Digitali</h4>
                <p className="text-muted-foreground">Cei care lucrează de pe laptop din cafenele din Bali sau Lisabona. (Atenție la limita maximă de ~30/60 zile consecutive – uneori va trebui extins cu clauze speciale).</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Ce uităși mereu să te asiguri</h4>
                <p className="text-muted-foreground">Cel mai grav risc e să fii deja în avion și să-ți amintești că nu ai Travel. Multi-tripul e pasiv. Stă în telefon și acoperă tot anul by default.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Avantajele Protecției Automate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Activare Tăcută (Automată)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu mai trebuie să anunți asigurătorul prin email când zbori și unde. Dacă te hotărăști azi să pleci cu mașina până în Sofia (Bulgaria), pur și simplu pleci. Ești asigurat din momentul în care ai trecut granița la vamă.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Preț Imbatabil la Frecvență Mare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Spre deosebire de o poliță cumpărată zilnic cu 5-10 Lei/zi, abonamentul anual Multi-Trip te poate costa 300-400 Lei o singură dată. Dacă faci adunat 40 de zile pe drumuri într-un an, costul per zi este infim.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperiri VIP Incluse</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fiind concepută pentru high-flyeri, polița include deja componente scumpe pe produsele de bază: asistență la întârzierea zborului, bagaj furat (1.000 EUR limită), răspundere civilă pe pârtie, fără să mai tot plătești adosuri la fiecare călătorie.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de incidente preia pachetul?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Bolile Acute / Intervenții Chirurgicale</div>
                  <div className="text-sm text-muted-foreground">Plafoane medicale uriașe (pot fi 50.000 EUR sau 100.000 EUR) ce se resetează la FIECARE călătorie. Tratamentul pneumoniilor și accidentelor.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Evacuare Sanitară Aeriană</div>
                  <div className="text-sm text-muted-foreground">Aducerea pacientului acasă din Turcia cu Jet-Ambulance în valoare de zeci de mii de euro, dacă spitalul local raportează o îngrijire defectuoasă imposibil de susținut.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Pierderea Zborurilor de Conexiune</div>
                  <div className="text-sm text-muted-foreground">Ai zbor din București - Londra, și de acolo iei Norwegian Airlines spre Islanda. Zborul din RO întârzie. Polița acoperă biletul nou (separat) pe care trebuie să îl cumperi ca să mai ajungi în Islanda.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Echipamente Pierdute</div>
                  <div className="text-sm text-muted-foreground">Rătăcirea definitivă a bagajului de cală atrage după sine o sumă despăgubită (de ex. 500-1000 EUR) pentru a te reface la întoarcerea acasă.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Liniștea celui care zboară des
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Plecarea Neprevăzută</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alex s-a hotărât miercuri seara că vineri dimineață merge cu niște prieteni pe motocicleta până la Varna, în Bulgaria. Sâmbătă cade ușor pe asfalt și își fracturează clavicula.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Nefiind asigurat individual, Alex ar fi plătit mii de euro. Din fericire, își cumpărase în ianuarie "Anuala Multi-Trip". Ea stătea tăcută în sertar. Odată ajuns la spitalul din Varna cu targa, dă polița din email-ul vechi, iar aceasta preia instant cazul 100%, pentru că el trecuse granița României.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Furtul bagajului vital</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Polița e valabilă și pentru mici ciupeli turistice. Pe o plajă din Barcelona, Dianei i se fură poșeta cu ochelarii de soare Gucci și ceva cash (raportează la poliție).
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza de asistență a bagajelor îi permite recuperarea parțială a prejudiciului (în baza declarației oficiale a poliției străine, "Police Report") a sumelor acoperite de pachetul ei Travel Multi-Trip.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">O Gestiune de Tip Flotă Personală</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Tehnologia modernă de emitere a polițelor de tip abonament salvează stresul repetitiv de la ghișeu.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Plafoane Regenerabile</h4>
                <p className="text-muted-foreground leading-relaxed">Un mit spune că "Dacă ai poliță anuală de 50.000 EUR și cheltui 30.000 EUR la un accident în februarie, mai ai doar 20.000 tot restul anului". FALS. La polițele bune, plafonul de zeci de mii se REFAC integral pentru absolut fiecare nouă ieșire din țară!</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Suport Global Real</h4>
                <p className="text-muted-foreground leading-relaxed">Prin cardul tău digital Generali ai acces la Europ Assistance, rețea uriașă care poate direcționa plăți direct către clinici private din SUA sau Tailanda, unde sistemele mici din România nu au nicio pârghie de negociere.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Fără birocrație la "Ieșire"</h4>
                <p className="text-muted-foreground leading-relaxed">Sistemul este pe încredere + verificare oficială doar la Daune. Când cazi la schi și se deschide dosarul, compania îți va cere biletul de avion (Boarding pass) sau factura de benzinărie de la ieșirea din țară pentru a dovedi că ești plecat de sub X zile.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Ce înseamnă exact acea "limită de X zile per călătorie"?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița este valabilă UN AN calendaristic, dar fiecare "ieșire din țară și stat continuu afară" nu trebuie să depășească de regulă 30, 45 sau uneori 60 de zile. De ce? Dacă stai 9 luni neîntrerupt în Germania, înseamnă că trăiești practic acolo și trebuie să-ți faci asigurare statală la AOK germană, nu să fraudezi sistemul românesc low-cost turistic.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Pot să fac doar pentru anumite continente (Europa)?</h3>
                <p className="text-muted-foreground leading-relaxed">Da! Când cumperi polița Anuală, bifezi aria teritorială. Dacă bifezi "Europa", polița va costa mult mai puțin și te va acoperi automat la toate zborurile din spațiul European. Dacă vrei SUA și Japonia, prețul crește semnificativ, adăugând acoperirea "Mondial" la baza anuală.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Am poliță anuală. Acoperă și vacanțele mele la schi din Austria?</h3>
                <p className="text-muted-foreground leading-relaxed">Depinde cum o configurezi! Polița "standard" acoperă strict relaxarea, plimbarea și vara. Dacă dorești să o folosești PENTRU TOT ANUL inclusiv la schi, trebuie să cumperi suplimentul (rider-ul) de "Sporturi de Iarnă" odată cu ea, ridicându-i puțin prețul, dar securizându-te definitiv.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Setează Abonamentul Tău de Vacanțe</h2>
            <p className="text-xl text-muted-foreground">Scapi de o bătaie de cap administrativă întreg anul și ai garanția spitalelor de top.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Abonament Multi-Trip" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Emite o dată, zbori oricând</h3>
              <p className="text-muted-foreground mb-8">
                Ne trimiți poza de buletin, stabilim dacă ai nevoie de zona Europa sau Mondială și nivelul sumei asigurate. Primești instant un PDF cu polița activă 365 de zile.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Scrie-ne pentru Tarifare</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Asistență Produse Anuale</div>
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
