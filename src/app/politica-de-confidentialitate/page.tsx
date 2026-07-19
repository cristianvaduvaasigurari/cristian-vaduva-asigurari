import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate",
  description: "Cum protejăm și procesăm datele tale personale.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Politica de Confidențialitate</h1>
          <p className="text-muted-foreground mb-12">Ultima actualizare: Iulie 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">1. Introducere</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Conform cerințelor Regulamentului (UE) 2016/679 (GDPR), platforma noastră administrează în condiții de siguranță
                și numai pentru scopurile specificate, datele personale pe care ni le furnizați despre dumneavoastră. Confidențialitatea datelor clienților noștri premium este prioritatea noastră absolută.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">2. Ce date colectăm</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                În cadrul platformei, prin intermediul formularelor de contact, al cererilor de ofertă și al programatorului de consultanțe, putem colecta:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Nume și prenume</li>
                <li>Număr de telefon</li>
                <li>Adresă de e-mail</li>
                <li>Detalii despre companie / CUI (pentru servicii B2B)</li>
                <li>Informații specifice privind interesele (Real Estate, Asigurări) pentru generarea ofertei</li>
                <li>Adresa IP și date de navigare generale (prin cookie-uri)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">3. Scopul Colectării</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Datele sunt colectate exclusiv pentru:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>A vă putea contacta în vederea stabilirii unei strategii sau consultanțe.</li>
                <li>A elabora oferte personalizate de asigurare sau planuri de investiții imobiliare.</li>
                <li>Trimiterea de notificări, noutăți sau oferte premium (doar cu acordul dumneavoastră explicit).</li>
                <li>Funcționarea optimă a platformei (Securitate și Analytics).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">4. Stocarea Datelor (Integrare our platform)</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Lead-urile și cererile completate prin website sunt transmise și stocate în mod securizat utilizând infrastructura 
                our platform, o platformă backend modernă care respectă standardele de securitate a datelor. Datele nu vor fi înstrăinate către terți 
                pentru marketing, cu excepția companiilor partenere necesare procesării serviciului cerut de dvs. (de ex. Generali România 
                pentru emiterea polițelor).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">5. Drepturile Dumneavoastră (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                În conformitate cu GDPR, beneficiați de următoarele drepturi:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Dreptul de acces la datele prelucrate.</li>
                <li>Dreptul la rectificarea datelor inexacte.</li>
                <li>Dreptul la ștergerea datelor (&quot;dreptul de a fi uitat&quot;).</li>
                <li>Dreptul la restricționarea prelucrării și dreptul la portabilitatea datelor.</li>
                <li>Dreptul de opoziție la prelucrarea datelor în scop de marketing direct.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">6. Contact Responsabil GDPR</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pentru a vă exercita drepturile sau pentru întrebări legate de protecția datelor, ne puteți scrie oricând la:<br/>
                <strong>Email:</strong> contact@cristianvaduva.com<br/>
                Vom răspunde solicitării dumneavoastră în termen de maxim 30 de zile.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
