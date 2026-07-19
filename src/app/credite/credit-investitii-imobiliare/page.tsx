import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit pentru Investiții Imobiliare - Cristian Văduva Premium',
  description: 'Finanțare pentru achiziționarea sau dezvoltarea de imobile de investiție, cu rată de aprobare ridicată și consultanță gratuită.'
};

export default function CreditInvestitiiImobiliarePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit pentru Investiții Imobiliare</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Investitorii care doresc să achiziționeze sau să dezvolte proprietăți imobiliare pentru generarea de venituri.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Oferă capitalul necesar pentru achiziție, renovare sau dezvoltare, reducând necesitatea de fonduri proprii.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rate competitive, structuri flexibile de rambursare, acces la parteneri bancari specializați în imobiliare.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Completați formularul, furnizați documentele privind proiectul și veniturile anticipate, noi negociem cu banca pentru cele mai bune condiții.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, adeverință de venit, planul de investiție, evaluarea imobilului, documentație legală a proprietății.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Consult inițial 2. Analiză proiect 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 5‑10 zile lucrătoare, în funcție de complexitatea proiectului.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Îți ofer consultanță completă, analiza ofertei și suport pe tot parcursul procesului.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Colaborăm cu instituții financiare specializate în sectorul imobiliar pentru oferte avantajoase și adaptate.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md px-6 h-11" asChild>
          <Link href="/credite/contact-broker-credite">Solicită Consultanță Gratuită</Link>
        </Button>
        <Link href="/credite">
          <Button variant="ghost">Înapoi la lista credite</Button>
        </Link>
      </div>
    </section>
  );
}
