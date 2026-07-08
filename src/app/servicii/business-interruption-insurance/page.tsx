import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { ActivitySquare, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Întrerupere Activitate (B.I.) | Cristian Văduva",
  description: "Cum supraviețuiește compania când fabrica arde? Polița de Business Interruption îți plătește profitul pierdut și salariile angajaților cât timp tu reconstruiești afacerea.",
};

export default function BusinessInterruptionInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-indigo-600 mb-8 border border-border bg-indigo-50">
              <ActivitySquare className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Întreruperea Activității (Business Interruption)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Focul îți distruge clădirea, iar polița de "Bunuri" îți dă milioanele de euro să o reconstruiești. Dar reconstrucția va dura 12 luni! În aceste 12 luni tu nu produci, nu vinzi absolut nimic. Cine îți va plăti ratele la bancă, chiriile obligatorii și salariile inginerilor tăi ca să nu plece la concurență? Această poliță o face.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Auditează Fluxul de Profit</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact Consultant Financiar
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-indigo-500 w-8 h-8" />
                Asigurarea Bilanțului (Nu a Pereților)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Polița de Pierderi Financiare (B.I.) nu are nicio legătură cu "cărămizile fizice". Ea se atașează obligatoriu doar LÂNGĂ o poliță Materială de Clădire/Echipamente.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Logica ei este: "Dacă un foc mi-a ars utilajele fizice din polița principală, declanșând în mod consecvent oprirea producției mele cu X luni, polița secundară (B.I.) îmi va plăti în numerar Profitul Brut nerealizat din aceste X luni pe care eu l-aș fi obținut matematic dacă aș fi funcționat normal". Acesta este adevăratul scut anti-faliment.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Costurile Fixe (Rata Mortă)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Statistica arată crud: 75% din firmele care suferă un incendiu devastator dau FALIMENT în primele 36 de luni de la tragedie CHIAR DACĂ aveau asigurare pe clădire! De ce?
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pentru că degeaba clădirea a fost reconstruită după un an, dacă în acel an firma nu a putut plăti datoria uriașă la Banca Finanțatoare (Ratele). Nefiind susținută financiar din spate, banca îi declară insolvența și execută fix "noua clădire". Polița B.I. plătește exact aceste costuri fixe, pompând oxigen (cash) lunar în conturile firmei nefuncționale.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Sectoare Dependente de Fluxul Continuu
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Este o poliță complexă, de elită, destinată sectoarelor unde timpul înseamnă literalmente bani:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Fabrici și Unități de Producție</h4>
                <p className="text-muted-foreground">Care depind de o "gâtuire tehnică" (Bottleneck). O fabrică are 10 mașini care lucrează simultan, dar TOATĂ producția trece printr-un singur cuptor de uscare la final. Dacă arde DOAR cuptorul, toată fabrica este blocată luni de zile.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Hoteluri și HoReCa (Resort-uri)</h4>
                <p className="text-muted-foreground">Dacă acoperișul Hotelului zboară în iunie din cauza furtunii, hotelul ratează ABSOLUT TOT sezonul estival. B.I.-ul plătește profitul verii direct în contul patronului.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Retail / Supermarket-uri / Centre Comerciale</h4>
                <p className="text-muted-foreground">Un hypermarket afectat de o inundație uriașă va sta închis 3 săptămâni. Zilnic, ei făceau vânzări de sute de mii de lei. Acel rulaj este pierdut, dar chiriile pe pământul mall-ului merg mai departe.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Proprietari Imobiliari (Landlorzii)</h4>
                <p className="text-muted-foreground">Dezvoltatorul are un complex de birouri închiriat. Blocul arde, chiriașii pleacă toți la alte firme în a doua zi. Landlordul va rămâne 2 ani fără "Pierderea de Chirie" (Loss of Rent), clauză care îi despăgubește fix ratele chiriilor fugitive.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Structura Matematică a Despăgubirii</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Plata Profitului Net Previzionat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contabilii calculează cât ai făcut "anul trecut în luna August". Se consideră că dacă nu era focul, ai fi făcut MĂCAR aceeași sumă Netă și în augustul acesta. Această "Cifră Purtătoare" îți va fi virată ție în cont.
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Salariile "Angajaților Cheie"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă fabrica e închisă 1 an, muncitorii tăi experți (ex: sudori specializați) vor pleca în Germania. Prin B.I. tu îți permiți să le plătești salarii ÎNTREGI timp de 12 luni stând acasă, doar ca ei să fie acolo când deschizi porțile halei noi reconstruite!
                </p>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Costurile de Creștere (Increased Costs of Working)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ca să nu îți pierzi clienții la concurență (pentru că nu poți livra), tu închiriezi temporar foarte scump o fabrică la marginea orașului sau lucrezi "în 3 schimburi cu noapte" ca să scoți comenzile, plătind ore suplimentare uriașe. Aceste eforturi financiare de salvare sunt returnate de poliță (ICOW).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce declanșează clauza financiară B.I.?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Polița "Mamă" (Declanșatorul Material)</div>
                  <div className="text-sm text-muted-foreground">Polița B.I. nu "stă în aer". Ea se activează DOAR DACĂ motivul fizic pentru care te-ai oprit din muncă este acoperit de Polița Mamă de Clădiri (Ex. a fost cutremur sau incendiu). Dacă te-ai oprit pentru că "nu ai mai avut vânzări/comenzi în piață", B.I.-ul nu funcționează.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Dependența de Furnizori (Extensie Contingent B.I.)</div>
                  <div className="text-sm text-muted-foreground">Foarte avansat: Fabrica TĂ are nevoie de o singură piesă mică de la UNICUL furnizor din Italia. Fabrica din Italia ia foc și se distruge. Din cauza lor, tu trebuie să te oprești 2 luni, deși fabrica ta e intactă. Polița ta poate plăti această oprire (Suppliers Extension).</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Refuzul Accesului (Denial of Access)</div>
                  <div className="text-sm text-muted-foreground">Magazinul tău din stradă e neatins. Dar blocul de deasupra lui are risc iminent de prăbușire de la un incendiu, iar autoritățile interzic accesul pe stradă timp de 2 săptămâni (pompierii blochează zona). Pierzi vânzări fără daună directă, B.I.-ul acoperă excepțional.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Termenul Maxim de Despăgubire (Indemnity Period)</div>
                  <div className="text-sm text-muted-foreground">Clientul alege la începutul anului: "Vreau ca B.I.-ul să mă plătească maxim 12 luni, 18 luni sau 24 de luni". Este timpul estimat de arhitecți ca fiind durata realistă în care tu poți rezidi o hală gigant în România, luând și avizele de la ISU.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Ingineria Finaciară Post-Daună
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Hotelul "Paralizat" în Sezon</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un Resort la Marea Neagră suferă un incendiu mediu pe 20 Mai. A ars doar recepția și sala de mese (300k EUR pagubă), nu camerele. DAR fără recepție și restaurant avizate ISU, niciun turist nu poate fi primit toată vara.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deși dauna fizică a fost de "doar" 300.000 EUR (plătită de polița de clădire), hotelierul ar fi pierdut cele 2 milioane de euro generate în cele 3 luni de vară. Polița "Business Interruption" a analizat situația rezervărilor istorice din verile trecute și a virat hotelului cele 2 milioane de EUR profit nerealizat direct în bancă, permițând hotelului să rămână viabil financiar.
                </div>
              </div>
              <div className="glass premium-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Fabrica de Piese Auto și Lanțul de Supply</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Firma ta face o piesă metalică pentru mașinile Volkswagen din Germania. Fabrica voastră arde. Dacă tu nu livrezi piesa în 4 zile în Germania, linia Volkswagen se oprește. Te vor da în judecată și vei pierde contractul vieții.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza "Costuri Suplimentare" din B.I. va suporta costul tău de a subcontracta o altă hală vecină din România MÂINE, la orice preț dictat de urgență (dublu / triplu preț), și costul curselor aeriene de urgență spre Germania cu acele piese doar ca să respecți termenele și să reții clienții vitali în portofoliu.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea de Analiză a Bilanțului</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Majoritatea brokerilor știu să vândă polița de clădire, dar habar n-au să calculeze "Profitul Brut Asigurabil" conform standardelor internaționale de asigurare (care e diferit de cel contabil!).
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Expertiză Contabilă Forensică</h4>
                <p className="text-muted-foreground leading-relaxed">Când vine dauna, trimitem Loss Adjusters cu expertiză contabilă. Ei extrag exact formula legală pentru a-ți asigura injecțiile de lichiditate în flux rapid, ca tu să nu atingi incapacitatea de plată nici măcar în prima lună.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Acoperiri Avansate de Lanț (Supply Chain)</h4>
                <p className="text-muted-foreground leading-relaxed">Generali are spatele marilor reasigurători globali. Dacă ești un colos, îți putem scrie polițe care despăgubesc opririle tale generate chiar și de prăbușirea rețelelor publice statale din România de gaze/curent (Public Utilities Extention).</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Preluarea Ratelor la Credite</h4>
                <p className="text-muted-foreground leading-relaxed">La structurarea poliței inițiale, noi îți punem explicit "Costurile Fixe Fixe" în formula de asigurare. Adică ratele de Leasing și de Credit pentru Banca Comercială vor fi asigurate și onorate lună de lună din despăgubirea transferată.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (B.I.)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">A apărut o nouă criză ca "Pandemia", m-a închis statul forțat (carantină), dar clădirea mea este intactă. Mă despăgubește Business Interruption?</h3>
                <p className="text-muted-foreground leading-relaxed">NU. Acesta este mitul și litigiul anului 2020 global. Polițele B.I. standard cer, fundamental, existența unei "Daune Materiale Directe Fizice" (ex: Focul). Virusul COVID și ordinele guvernamentale de a închide restaurantul au reprezentat un eveniment pur legislativ / biologic FĂRĂ nicio zgârietură fizică pe peretele restaurantului, deci polița B.I. materială nu a fost declanșată și s-au creat mari dezbateri (doar extensiile foarte rare de Boli Infecțioase ar funcționa limitat aici).</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cum dovedesc câți bani aș fi făcut, dacă tocmai afacerea e închisă de 3 luni și nu se vede viitorul?</h3>
                <p className="text-muted-foreground leading-relaxed">Matematica de Daună este reglementată. Se ia indicatorul "Standard Turnover" (Cifra de afaceri fix din aceeași perioadă a anului trecut). Se aplică trendurile (poate anul acesta veneai cu un plus de 10% creștere constantă dovedită în primele luni). Formula extrage apoi materialele variabile nefolosite (ex: că nu ai mai consumat făină sau benzină stând pe bară) și îți achită net restul sumei.</p>
              </div>
              <div className="glass premium-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu raportez contabil Profitul la 0 ca să nu dau Impozit statului. Cum mă asigurați?</h3>
                <p className="text-muted-foreground leading-relaxed">Asigurarea acționează DOAR pe cifrele oficiale. Dacă ai declarat la stat (FISC) 0 profit net în bilanțuri mulți ani, asigurătorul consideră și el că tu ai Pierdut 0 Net. Așadar, îți vom despăgubi strict Costurile Fixe Continui asigurate (Chirie/Salarii dovedite legal/Leasing), dar la capitolul "Profit", nu putem subvenționa ceea ce nu declari fiscal.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Securizează Bilanțul Contabil</h2>
            <p className="text-xl text-muted-foreground">Fără "Business Interruption", polița ta de incendiu este doar o soluție parțială, incapabilă să-ți salveze SRL-ul.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Audit B.I. (Business Interruption)" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Parametrii Ofertării</h3>
              <p className="text-muted-foreground mb-8">
                Această poliță presupune o ședință tehnică cu CFO-ul / Contabilul Șef al companiei. Va trebui să calculăm împreună Suma Asigurată plecând de la Contul de Profit și Pierdere (P&L) din cel mai recent Bilanț (Profit Net + Cheltuieli Fixe Permanente).
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Inițiază Auditul (WhatsApp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Financiara B2B</div>
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
