import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Credit de Nevoi Personale - Cristian Văduva Premium',
  description: 'Credit pentru nevoi personale, cu aprobare rapidă și condiții flexibile, ideal pentru proiecte personale sau imprevizibile.'
};

export default function CreditNevoiPersonalePage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Credit de Nevoi Personale</h1>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Pentru cine este?</strong> Persoane fizice care au nevoie de finanțare pentru diverse scopuri personale – cum ar fi renovări, achiziții, educație, medicale etc.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce problemă rezolvă?</strong> Oferă acces rapid la fonduri fără a avea nevoie de garanții complexe, simplificând procesul de creditare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care sunt avantajele?</strong> Rată de aprobare ridicată, perioadă de rambursare flexibilă, fără garanții imobiliare, consultanță gratuită.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum funcționează?</strong> Completați formularul, furnizați documentele necesare, noi analizăm profilul și negociem cu banca pentru cea mai bună ofertă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Ce acte sunt necesare?</strong> Act de identitate, adeverință de venit, detalii despre scopul creditului și eventual alte documente solicitate de bancă.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Care este procesul?</strong> 1. Contact inițial 2. Evaluare necesar 3. Colectare documente 4. Negociere cu banca 5. Aprobare și semnare.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>În cât timp primești răspuns?</strong> În 2‑4 zile lucrătoare, în funcție de complexitatea dosarului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>Cum te ajut personal?</strong> Ofer sprijin complet pe parcursul întregului proces, de la depunere la încheierea contractului.</p>
      <p className="mb-4 text-lg text-muted-foreground"><strong>De ce este mai bine?</strong> Colaborăm cu multiple bănci pentru a găsi cea mai avantajoasă ofertă adaptată situației tale.</p>
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
