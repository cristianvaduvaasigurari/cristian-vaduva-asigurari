import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { PackageSearch, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Bunuri și Stocuri | Cristian Văduva",
  description: "Asigură mașinile tale de producție, roboti industriali, stocurile de marfă din depozit și mobilierul de birou împotriva furtului sau avarierii.",
};

export default function BusinessGoodsInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-violet-600 mb-8 border border-border bg-violet-50">
              <PackageSearch className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Conținutului (Stocuri și Utilaje)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              În cele mai multe cazuri B2B, clădirea este doar o carcasă de beton. Adevărata valoare financiară a afacerii (echipamente CNC de milioane de euro, servere critice, sau un depozit farmaceutic ticsit cu marfă) se află pe interior. Această poliță apără strict "conținutul" mobil și lichiditatea investiției tale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Securizează Capitalul Mobil</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Trimite Balanța Contabilă (Fixe)
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
                Separarea de Polița Clădirii
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mulți antreprenori trăiesc cu impresia falsă că dacă proprietarul (Landlord) de la care au închiriat hala are o poliță a clădirii, marfa lor de un milion de euro va fi și ea despăgubită la foc. Total Fals!
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița de Clădire despăgubește STRICT "pereții". Asigurarea Stocurilor și a Utilajelor ("Content Insurance") este un document separat. Ea ia în calcul ce aduci TU în firmă. Fiind elemente mobile, gradul de risc de Furt și Distrugere din neglijență este mult mai mare la marfă decât la un stâlp de ciment.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Salvarea Fluxului de Cash (Lichiditate)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Imaginează-ți un magazin Altex a cărui țeavă de apă a cedat noaptea. Clădirea e de beton, s-a uscat, a costat vopseaua 5000 Lei. Dar cele 200 de televizoare 4K lăsate pe podea sunt "daună totală" la contactul cu apa, un minus în gestiune de 150.000 EUR.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fără un instrument de asigurare de Stocuri/Inventar, compania nu mai poate relua ciclul de vânzare. Banii sunt blocați în utilaje/marfă moartă, atrăgând insolvența imediată.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Categorii de active asigurate
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ce anume se asigură fizic prin acest pachet în interiorul companiilor:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Stocuri și Mărfuri finite</h4>
                <p className="text-muted-foreground">Marfa pe raft, pe paleți, pregătită de livrare, sau materie primă brută (bumbac, cherestea). Valoarea lor e dinamică și se evaluează la prețul de achiziție/producție.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Utilaje de Producție (Machinery)</h4>
                <p className="text-muted-foreground">Linii tehnologice masive, brațe robotice, mașini de ștanțat, tiparnițe imense, aparatură medicală scumpă (RMN) ancorate la sol.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Echipamente Electronice (IT)</h4>
                <p className="text-muted-foreground">Servere rack-mounted, sute de calculatoare ale angajaților dintr-o corporație, monitoare, rețele telecom, deosebit de sensibile la apă și scurtcircuite.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Mobilier B2B / Amenajări (Fit-out)</h4>
                <p className="text-muted-foreground">Ai închiriat o clădire de birouri goală (shell) și ai investit 200k EUR în partiții de sticlă, tavan fals și mobilier beneficiu Herman Miller. Acestea se asigură ca "bunurile tale ca și chiriaș".</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Modularitatea Acoperirilor beneficiu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-violet-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Clauza de Fluctuație a Stocurilor</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Depozitul tău azi are marfă de 1 mil. EUR, dar de Black Friday ai marfă de 2 mil. EUR. Pentru a nu lăsa descoperit vârful, polița poate include un mecanism de raportare lunară a valorii mărfii, adaptând plata daunei automat la încărcătura maximă raportată.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-violet-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Asigurarea Electronisticii Avansate (EEI)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nu este o simplă poliță de incendiu. Echipamentele IT se asigură separat (Electronic Equipment Insurance), ele având riscuri interne speciale: supratensiuni, erori de operare de către utilizator, sau stricăciuni din neglijență.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-violet-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Acoperirea Marfurilor în Frigidere (Deteriorare)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă ai un depozit de carne congelată și compresorul principal pică în weekend, carnea se alterează fără să existe foc. Clauza specială de "Deteriorare Bunuri din instalații frigorifice" preia pierderea mărfii (strict cauzată de pana electrică sau avaria echipamentului).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Dușmanii invizibili ai mărfurilor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Furt prin Efracție și Tâlhărie</div>
                  <div className="text-sm text-muted-foreground">Grupurile organizate care pătrund noaptea (spărgând lacăte, gratii, ocolind sistemul de efracție omologat) și sustrag paleți întregi de medicamente sau telefoane din depozitul tău.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Avarii Accidentale la Utilaje (Machinery Breakdown)</div>
                  <div className="text-sm text-muted-foreground">Un șurub cade în angrenajul principal al unei rotative tipografice de un milion de euro și îi strivește toți cilindrii interni în câteva secunde. Nu a fost foc, dar mașina e "moartă". Clauza de "Avarii accidentale / erori de operare" o repune pe roate.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Inundația din conducte ("Apa de Conductă")</div>
                  <div className="text-sm text-muted-foreground">Cel mai frecvent incident în clădirile moderne de birouri. O țeavă cedează la etajul 3 în weekend, inundând sute de stații de lucru (PC, scaune) pe parcursul celor 3 etaje inferioare.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Riscurile Catastrofice Asumate</div>
                  <div className="text-sm text-muted-foreground">Dacă la un cutremur masiv cade tavanul fals peste noile RMN-uri ale clinicii tale private distrugându-le definitiv. Tot ce e bun mobil se va despăgubi de Generali.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Salvarea din Faliment Comercial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Furtuna de Vară care a ruinat marfa</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O companie de echipamente electrice își depozitase invertoarele solare și cablurile de 300.000 EUR într-o hală modernă. O vijelie masivă a smuls un luminator (geam) din tavan, iar ploaia torențială a inundat exact paleții cu electronice scumpe, deteriorându-le complet cutiile și circuitele interne.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Produsul de Asigurare a Conținutului a clasat evenimentul ca daună prin risc de "Furtună/Ploaie pătrunsă prin acoperiș avariat", achitând companiei prețul ei de achiziție al invertoarelor distruse (doar pe baza facturilor contabile doveditoare), permițând refacerea stocului în 2 luni fără a băga firma în incapacitate de plată către stat.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Avaria pe CNC</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Într-o fabrică de piese auto, un frezor CNC de 1.2 mil. EUR tocmai a ieșit din Garanția tehnică de la producătorul german. Muncitorul român introduce greșit coordonatele în program. Axul mașinii lovește în plin la viteză enormă menghina de fier, distrugând tot brațul cinematic intern.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Clauza specială "Machinery Breakdown" (Eroare umană) preia exact astfel de greșeli. Asigurarea a plătit manopera experților din Germania veniți de urgență cu avionul și piesa de schimb uriașă de 80.000 EUR, compania achitând doar o simplă franșiză contractuală (ex: 1000 EUR).
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Capacitatea de a audita corect riscul</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Când asigurăm inventare gigantice, e nevoie de o înțelegere inginerească a liniilor de producție și a vulnerabilităților lanțului tău de supply. Generali România are specialiștii potriviți.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Inspecție Anti-Efracție</h4>
                <p className="text-muted-foreground leading-relaxed">Nu asigurăm "în orb" un depozit de parfumuri scumpe cu un lacăt ruginit. Departamentul de risc al Generali vă va consilia legal câte camere de luat vederi și ce sistem cu monitorizare BGS aveți nevoie ca polița de Furt să fie viabilă la daună.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Asigurare tip "All Risks" (Conținut)</h4>
                <p className="text-muted-foreground leading-relaxed">Formatul beneficiu european prin care tot ce este mobil și are o valoare contabilă în firmă este protejat împotriva oricărui risc extern accidental violent, permițându-vă vouă ca proprietari să nu alergați după clauze absconse.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Celeritate în Evaluarea Daunelor</h4>
                <p className="text-muted-foreground leading-relaxed">Știm că un magazin inundat nu poate fi ținut închis o lună pentru inspecții. Investigatorii Generali ajung uneori și în 24 de ore la locație pentru a izola dovezile și a da "verde" pentru operațiunile de igienizare/salvare marfă neafectată.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Îmi dispar periodic mici cutii cu marfă din gestiune (probabil furate de unii angajați depozitari). Mă despăgubește polița?</h3>
                <p className="text-muted-foreground leading-relaxed">Ferm NU. Lipsurile din inventar misterioase, disparițiile inexplicabile sau frauda generată direct și demonstrat de către proprii TĂI angajați care te fură din interior, reprezintă excluderi absolute la categoria "Furt" clasic. Polița despăgubește tâlhăria sau "Efracția" (spargerea perimetrului lăsând urme de violență asupra încuietorilor) de către terți externi.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Cum dovedesc exact ce aveam în hală când a ars tot?</h3>
                <p className="text-muted-foreground leading-relaxed">Plata la business se face pe acte, nu pe "povești". Ca antreprenor, asumi să ai Balanța Contabilă la zi (Mijloace Fixe, Cont 213, Stocuri Marfă 371). Ideal, back-up-urile informatice ale facturilor trebuie ținute în cloud / la contabil pe alt server. Dacă hala arde, vei prezenta registrul de inventar asumat la Fisc în luna anterioară pentru a debloca plățile milioanelor de lei.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Am marfă pe perioada transportului (în camion). Polița asta o acoperă acolo?</h3>
                <p className="text-muted-foreground leading-relaxed">În mod standard NU. Asigurarea de Conținut și Stocuri este "Location Based" (legată de adresa fizică de pe poliță, fixată în hală). În momentul în care marfa ta părăsește poarta cu TIR-ul, intră în protecția altui produs complet diferit (Asigurarea Cargo Marfă în Tranzit), pe care de asemenea vi-l putem oferta.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Evaluează Bunurile Firmei Tale</h2>
            <p className="text-xl text-muted-foreground">Fără un contract corect setat, riști sub-asigurarea (să primești la daună mai puțin decât crezi).</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Ofertă Bunuri B2B" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Declanșează Ofertarea</h3>
              <p className="text-muted-foreground mb-8">
                Cere departamentului contabil un fișier cu "Lista Mijloacelor Fixe". Dacă sunteți comercianți de mărfuri en-gros / en-detail, trimiteți valoarea medie (rulajul lunar) a stocului de marfă estimat.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Trimite Liste Contabile Inițiale</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Consultanță Valori Stocuri</div>
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
