import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { Shield, Info, Star, Users2, CheckCircle2, AlertTriangle, Lightbulb, MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asigurare Cyber Risk B2B | Cristian Văduva",
  description: "Ești pregătit pentru un atac Ransomware? Scutul Cyber Risk preia pierderile financiare din atacuri informatice, șantaj crypto, breșe GDPR și întreruperea afacerii.",
};

export default function BusinessCyberInsurancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* 1. Hero Section */}
          <div className="mb-24 flex flex-col items-center text-center mx-auto">
            <div className="inline-flex p-5 rounded-3xl glass text-cyan-600 mb-8 border border-border bg-cyan-50">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Asigurarea Cibernetică (Cyber Risk)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
              Cea mai mare amenințare la adresa afacerii tale nu mai este focul fizic, ci focul digital. Un atac Ransomware îți criptează facturile, baze de date, CRM-ul și site-ul, oprind operațiunile în zero secunde și cerând șantaj masiv. Asigurarea Cyber este răspunsul direct, achitând daunele de extorsiune și reparând rețeaua grav avariată.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl" asChild>
                <Link href="#oferta">Evaluează Vulnerabilitatea Cyber</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-muted" asChild>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  Contact IT Insurance
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* 2. Ce este această asigurare */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Info className="text-cyan-500 w-8 h-8" />
                Un Nou Tip de Risc Sistemic
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Asigurările tradiționale de bunuri ("FLEXA") exclud clar pierderile de intangibile: "focul nu afectează biții". Dacă un hacker paralizează sistemul tău ERP prin Phishing (un angajat a dat click unde nu trebuia), polița ta de incendiu nu îți va plăti milioanele pierdute în zilele de nefuncționare.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița Cyber Risk este creata chirurgical pentru era digitală. Ea reacționează exclusiv când vectorul de distrugere este "Codul Rău-Intenționat" (Malware) sau furtul de date personale sensibile ale clienților voștri.
              </p>
            </div>

            {/* 3. De ce este importantă */}
            <div className="glass rounded-[3rem] p-10 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -z-10" />
              <h2 className="text-3xl font-heading font-bold mb-6 flex items-center gap-3">
                <Star className="text-amber-500 w-8 h-8 fill-amber-500/20" />
                Tsunami-ul Legal: GDPR & Sancțiuni
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Cel mai mare șoc nu vine de la faptul că ai pierdut propriul sistem, ci de la faptul că ai pierdut datele CLIENȚILOR. Dacă hackerii fură mii de CNP-uri, adrese sau carduri bancare din serverul tău slab securizat, vei intra sub incidența GDPR (amenzi de până la 4% din Cifra de Afaceri globală).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polița Cyber îți pune imediat la dispoziție o celulă de criză formata din experți în Securitate (Forensics) pentru a izola atacul, și avocați specializați în drept digital care să raporteze incidentul la ANSPDCP (Autoritatea de Date), minimizând șocul legal la maximum.
              </p>
            </div>
          </div>

          {/* 4. Cui i se adresează */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-emerald-500/10 relative overflow-hidden text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <Users2 className="text-emerald-500 w-8 h-8" />
              Zonele de Expunere Critică
            </h2>
            <div className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Orice firmă care are calculatoare și angajați este vulnerabilă, dar există industrii grav atacate:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Magazinele e-Commerce (Retail Online)</h4>
                <p className="text-muted-foreground">Atacurile DDoS pe site-ul tău în plin Black Friday. Nu ești funcțional o zi? Pierzi mii de comenzi. Polița Cyber (Business Interruption) acoperă acel profit nerealizat în ziua blocajului.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Clinicile Medicale (Healthcare)</h4>
                <p className="text-muted-foreground">Ținta numărul 1. Baza de date medicale (fișe, istoric boli) are cea mai mare valoare pe piața neagră (Darkweb). Securizarea și despăgubirea breșelor medicale e vitală.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Firme de Contabilitate și Avocatură</h4>
                <p className="text-muted-foreground">Dețin arhivele secrete, bilanțurile, extrasele bancare și litigiile private a zeci/sute de alte firme. Criptarea serverului contabil duce la blocarea generală a clienților agenției.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Producție Automatizată (Fabricația IoT)</h4>
                <p className="text-muted-foreground">Fabricile moderne cu roboți CNC conectați la internet pot fi oprite. Hackerul blochează brațul robotic, oprind linia de asamblare auto și generând sute de mii de euro pagubă pe oră.</p>
              </div>
            </div>
          </div>

          {/* 5. Beneficii */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Intervenția de Urgență (Response Team)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Forensic IT (Criminalistică)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Când are loc atacul, nu mai știi ce să oprești din priză. Suni la Hotline-ul Generali, iar noi trimitem remot/fizic o companie de IT Forensics de top care va investiga pe ce port a intrat atacatorul, curățând rețeaua și izolând infecția. Pe banii Generali.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Plata Extorcării (Ransomware)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sub rezerva legalității (dacă nu încalcă embargouri de stat/teroriste), și strict dacă experții de securitate decid că decriptarea e complet imposibilă tehnic altfel, polițele cyber de vârf POT acoperi plata propriu-zisă a șantajului (Bitcoinii) cerut pentru recăpătarea cheii bazei tale de date de clienți.
                </p>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border border-border">
                <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Restaurarea Bazei de Date</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Datele tale au fost corupte și șterse definitiv? Polița va suporta costul enorm (forță de muncă suplimentară de zeci de mii de euro - Data Recovery Costs) pentru refacerea manuală și din back-up-uri fragmentate a evidențelor voastre operaționale, pixel cu pixel.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Ce riscuri acoperă */}
          <div className="mb-24 glass p-10 md:p-16 rounded-[3rem] border border-red-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -z-10" />
            <h2 className="text-3xl font-heading font-bold mb-10 flex items-center justify-center gap-3">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              Ce categorii de daune Cyber există?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Daune Proprii (First Party)</div>
                  <div className="text-sm text-muted-foreground">Ce pierzi TU: Pierderile tale de profit brut cât timp stai pe bară din cauza virusului (Business Interruption), costul angajării experților IT și recuperarea bazei de date.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Răspunderea față de Terți (Third Party)</div>
                  <div className="text-sm text-muted-foreground">Dacă virusul a plecat din calculatoarele tale spre sistemele clienților tăi infectându-i și pe ei. Aceștia te vor da în judecată masiv pentru neglijență în securitatea ta. Generali te apără în fața lor.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Costuri de PR (Crisis Management)</div>
                  <div className="text-sm text-muted-foreground">Când se află în presă că ai pierdut sute de conturi bancare de la proprii utilizatori, brandul tău e mort. Asigurarea plătește agenții de Public Relations globale care să lanseze campanii de re-câștigare a încrederii.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-red-100 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 font-bold">✕</span>
                <div>
                  <div className="font-bold text-foreground mb-1">Cyber-Extorsionarea (Ransomware)</div>
                  <div className="text-sm text-muted-foreground">Afișajul roșu cu craniu de pe monitoare: "Plătește 2 BTC în 48h sau îți ștergem toate serverele contabile". Tratarea, negocierea (prin experți autorizați K&R) și plata acestui șantaj.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Exemple practice */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center flex items-center justify-center gap-3">
              <Lightbulb className="text-amber-500 w-8 h-8" />
              Un coșmar de un singur click
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 1: Phishing-ul de la Resurse Umane</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O angajată HR deschide dimineața un atașament numit "CV-Candidat-PDF.exe". Imediat, virusul de tip Cryptolocker se răspândește silențios pe toată rețeaua firmei de distribuție și pe serverul principal, criptând absolut toate PDF-urile de marfă și contracte.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Deoarece Backup-ul era pe un hard-disk legat în aceeași rețea și s-a criptat și el, s-a activat dosarul de daună Cyber. Asigurătorul a trimis echipa specială de decriptare din Israel (plătindu-le onorariul de 30.000 EUR) care au recuperat 90% din date forțând cheia matematică, plătind concomitent clientului român 40.000 EUR pentru "Oprirea Afacerii" pe durata celor 5 zile fără livrări.
                </div>
              </div>
              <div className="glass beneficiu-card p-8 rounded-[2rem] border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold mb-4 text-foreground">Scenariul 2: Breach-ul GDPR la Magazinul Online</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un magazin online ce vinde cosmetice beneficiu are baza de date MySQL atacată (SQL Injection). Hackerii copiază baza cu nume, numere de telefon, email-uri și istoric de achiziții a 45.000 de femei din România, expunându-le public pe forumuri rusești.
                </p>
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-700">Rezolvarea poliței:</span> Conform legii, firma trebuia să notifice toți cei 45.000 de clienți. Polița a suportat costul uriaș poștal / electronic al notificării mass-media cerut de lege, onorariul avocatului specializat în GDPR (pentru negocierea amenzii cu statul) și a acoperit primele de consultanță PR pentru salvarea reputației site-ului.
                </div>
              </div>
            </div>
          </div>

          {/* 8. De ce să alegi Generali România */}
          <div className="mb-24 glass rounded-[3rem] p-10 md:p-16 border border-border bg-[#c8102e]/5 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 text-[#c8102e]">Servicii pre-atașate (Nu doar despăgubiri)</h2>
            <div className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              La polița de foc, asiguratorul îți dă bani DUPĂ ce a ars hala. La polița Cyber, scopul nostru e să-ți dăm specialiști (vendor management) ÎN TIMPUL crizei ca să oprima "focul digital".
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Hotline 24/7 Cybersecurity</h4>
                <p className="text-muted-foreground leading-relaxed">Cumperi practic un serviciu de gardă tehnică pe noapte. Ai descoperit atacul la ora 3 AM? Nu ai la cine apela din IT-ul tău. Suni la numărul de asistență incident din poliță, o echipă specializată din afară preia controlul de urgență remote.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Fără Excluderi Absurde</h4>
                <p className="text-muted-foreground leading-relaxed">Dacă angajatul a dat din greșeală click (eroare umană) pe un link virusat (Phishing), acesta este chiar baza poliței. Nu refuzăm dauna spunând că "a fost vina voastră". Acel nivel de neglijență primară este acoperit.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#c8102e]/10 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-[#c8102e] mb-3 text-lg">Acoperire "Social Engineering"</h4>
                <p className="text-muted-foreground leading-relaxed">Extensie vitală ("Frauda Falsului Președinte"). Angajata de la contabilitate primește un mail ce pare fix de la șeful ei, cerându-i să transfere urgent 50k EUR într-un cont extern "pentru o achiziție secretă". Ea face plata, hackerii iau banii. Polițele avansate pot despăgubi această fraudă de inginerie socială.</p>
              </div>
            </div>
          </div>

          {/* 9. FAQ */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold mb-10 text-center">Întrebări Frecvente (Cyber)</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Eu țin deja totul în "Cloud" la Microsoft, Azure sau AWS. Mai am nevoie de Cyber?</h3>
                <p className="text-muted-foreground leading-relaxed">Categoric DA. Contractele Cloudurilor de top (Microsoft, Amazon) stipulează explicit limitarea masivă a răspunderii lor dacă securitatea ta este spartă "la capătul tău" (ex: un angajat pierde parola sau se infectează laptopul lui local de pe care accesează Cloudul). De asemenea, răspunderea față de Terți (GDPR) cade mereu tot în seama TA, nu a Microsoftului.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Plătiți voi amenzile GDPR de la Stat (ANSPDCP)?</h3>
                <p className="text-muted-foreground leading-relaxed">Polița acoperă cheltuielile de apărare în fața autorității și eventualele despăgubiri cerute civil de cetățenii afectați. Însă, atenție: în foarte multe jurisdicții, plata AMENZILOR penale / contravenționale dictată direct de Stat ca "pedeapsă directă" este neasigurabilă din punct de vedere legal (amenda pedepsește autorul, ea nu poate fi "transferată" altuia moralmente). Analizăm fiecare speță cu echipa juridică.</p>
              </div>
              <div className="glass beneficiu-card p-6 md:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-3 text-foreground">Orice firmă e primită în asigurare?</h3>
                <p className="text-muted-foreground leading-relaxed">NU. Chestionarul IT de risc este strict. Dacă nu aveți antivirus de bază cu licență, dacă nu folosiți firewall-uri, dacă parola de admin e "1234" și nu aveți absolut nicio politică de backup off-site, asigurătorul va refuza emiterea poliței, considerând expunerea dvs. sinucigașă și ne-asigurabilă. Minimul de igienă cibernetică este obligatoriu.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 11. Formular & 12. Contact Rapid */}
        <div id="oferta" className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Evaluează Gradul de Expunere Cyber</h2>
            <p className="text-xl text-muted-foreground">O singură oră de consultanță cu noi poate asigura viitorul companiei în mediul digital.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm customTitle="Cere Evaluare Risc Cibernetic" />
            </div>
            
            <div className="glass rounded-3xl p-8 border border-border h-fit sticky top-32 shadow-lg">
              <h3 className="text-2xl font-bold font-heading mb-6">Aprobarea IT-ului</h3>
              <p className="text-muted-foreground mb-8">
                Cotația pe riscurile Cyber necesită implicarea departamentului tău IT (sau a firmei externalizate de suport), deoarece ei trebuie să certifice arhitectura de securitate curentă (Firewall / Backup Frequency) pe Chestionar.
              </p>
              
              <div className="space-y-6">
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-green-700 font-medium">Solicită Chestionarul Cyber (WhatsApp)</div>
                    <div className="font-bold text-foreground">{CONTACT.whatsapp.display}</div>
                  </div>
                </a>

                <a href={CONTACT.phone.href} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-700 font-medium">Specialist Brokeraj Cyber</div>
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
