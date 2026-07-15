import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description: "Termenii și condițiile de utilizare pentru platforma Cristian Văduva - Asigurări, Real Estate și Investiții.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Termeni și Condiții</h1>
          <p className="text-muted-foreground mb-12">Ultima actualizare: Iulie 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">1. Scopul Website-ului</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Platforma cristianvaduva.com reprezintă un portal beneficiu de prezentare a serviciilor integrate de 
                consultanță în domeniul asigurărilor (partener Generali România), investițiilor imobiliare (Real Estate) și al managementului 
                patrimonial. Informațiile prezentate au scop informativ și nu constituie o ofertă angajantă din punct de vedere juridic până la semnarea unui contract comercial sau a unei polițe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">2. Utilizarea Informațiilor</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Utilizatorul este de acord să folosească platforma exclusiv în scopuri legale și într-un mod care nu încalcă drepturile, 
                nu restricționează și nu împiedică utilizarea platformei de către alte persoane. Ne rezervăm dreptul de a modifica 
                structura, conținutul și serviciile descrise fără notificare prealabilă.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">3. Responsabilități și Limitări</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Deși depunem toate eforturile pentru a asigura acuratețea simulărilor (inclusiv a celor din secțiunea Calculatoare), 
                acestea sunt strict estimative. Calculul final al primei de asigurare sau al randamentului investițional va fi 
                furnizat în urma unei analize de risc personalizate și este supus politicilor oficiale ale companiilor partenere (ex: Generali).
                Nu ne asumăm răspunderea pentru deciziile financiare luate exclusiv pe baza informațiilor generale de pe website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">4. Proprietate Intelectuală</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Întregul conținut al site-ului (texte, imagini, logo-uri, concepte, design Apple-style, structura Ecosistemului AiX) 
                este proprietatea exclusivă a Cristian Văduva / AiXbeneficiu. Reproducerea, distribuirea sau utilizarea neautorizată 
                a acestor materiale este strict interzisă și se pedepsește conform legilor în vigoare.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">5. Servicii de Consultanță</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Programarea unei consultanțe prin formularele noastre nu garantează acceptarea dumneavoastră în portofoliul nostru 
                de clienți privați. Ne rezervăm dreptul de a selecta proiectele și clienții în funcție de compatibilitatea cu profilul nostru 
                de business și de nivelul de expertiză necesar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-foreground">6. Contact</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pentru orice clarificări privind acești termeni, ne puteți contacta la:<br/>
                <strong>Email:</strong> contact@cristianvaduva.com<br/>
                <strong>Telefon:</strong> +40 767 110 439 / +43 650 953 6345
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
