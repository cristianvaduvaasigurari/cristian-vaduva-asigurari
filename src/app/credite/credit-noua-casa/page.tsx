import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit Nouă Casă - Cristian Văduva Premium',
  description: 'Credit pentru achiziționarea unei noi locuințe, cu aprobare rapidă și consultanță gratuită.'
};

export default function CreditNouaCasaPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit Nouă Casă</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Persoane fizice care doresc să cumpere prima locuință sau să achiziționeze o casă nouă.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Oferă finanțare completă pentru achiziția locuinței, simplificând procesul de creditare.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rată de aprobare ridicată, proces rapid, condiții flexibile, consultanță gratuită.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Completați formularul, trimiteți documentele, analizăm profilul și negociem cu banca.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, adeverință de venit, contract de vânzare-cumpărare, extras de carte funciară.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Contact inițial 2. Evaluare necesar 3. Colectare documente 4. Negociere bancă 5. Aprobare și semnare.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> 3‑5 zile lucrătoare, în funcție de complexitate.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Consultanță gratuită, suport pe tot parcursul procesului, negociere cu banca.
      </p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Parteneriate extinse cu băncile, rată de aprobare superioară și soluții adaptate nevoilor tale.
      </p>
      <Link href="/credite" className="mt-6 inline-block">
        <Button variant="ghost">Înapoi la lista credite</Button>
      </Link>
    </section>
  );
}
