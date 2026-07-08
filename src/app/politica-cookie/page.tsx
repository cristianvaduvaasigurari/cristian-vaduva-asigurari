import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de utilizare Cookie-uri",
  description: "Cum folosim cookie-urile pentru a-ți oferi o experiență premium.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Politica de Cookie-uri</h1>
          <p className="text-muted-foreground mb-12">Ultima actualizare: Iulie 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-heading text-white">1. Ce sunt Cookie-urile?</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Un cookie este un fișier text de mici dimensiuni pe care un site web îl salvează pe calculatorul 
                sau dispozitivul dumneavoastră mobil atunci când îl vizitați. Datorită cookie-urilor, site-ul reține, 
                pe o perioadă de timp, acțiunile și preferințele dumneavoastră, astfel încât nu mai trebuie să le introduceți 
                ori de câte ori reveniți la site sau navigați de pe o pagină pe alta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">2. Ce fel de Cookie-uri folosim?</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pe platforma cristianvaduva.com utilizăm următoarele tipuri de cookie-uri:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li><strong>Strict Necesare:</strong> Aceste cookie-uri sunt esențiale pentru ca site-ul nostru să funcționeze corect. Nu stochează informații personale și sunt setate implicit. (De ex. pentru a ține minte starea banner-ului de cookies).</li>
                <li><strong>Performanță și Analytics:</strong> Ne ajută să măsurăm traficul și să analizăm modul în care vizitatorii utilizează platforma (ex: pagini vizitate, timpul petrecut pe site). Folosim soluții standard (precum Google Analytics) care colectează datele anonimizat.</li>
                <li><strong>Marketing (opțional):</strong> Sunt utilizate pentru a vă oferi reclame relevante atunci când navigați pe alte site-uri, pe baza intereselor (ex: dacă ați analizat pagina de Real Estate).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">3. Cum puteți controla cookie-urile?</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile care 
                sunt deja pe calculatorul dumneavoastră și puteți seta majoritatea browserelor să împiedice plasarea acestora. 
                Dacă faceți acest lucru, este posibil să fiți nevoit să ajustați manual unele preferințe de fiecare dată 
                când vizitați un site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-white">4. Actualizări</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Ne rezervăm dreptul de a face orice completări sau modificări la această politică. Vă rugăm să vizitați frecvent 
                această pagină pentru a fi la curent cu setările cookie-urilor.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
