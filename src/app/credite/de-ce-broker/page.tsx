import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'De ce să lucrezi cu un Broker de Credite - Cristian Văduva Premium',
  description: 'Descoperă avantajele colaborării cu un broker de credite: economii, rată de aprobare ridicată și suport personalizat.'
};

export default function DeCeBrokerPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">De ce să lucrezi cu un Broker de Credite</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Alegerea unui broker de credite oferă claritate, economie de timp și acces la oferte negociate, mult dincolo de ceea ce găseşti direct la bancă.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Beneficii principale</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
        <li><strong>Rată de aprobare crescută</strong> – brokerul are relații cu multiple bănci și poate găsi soluția potrivită profilului tău.</li>
        <li><strong>Economii semnificative</strong> – negociem dobânda, comisioanele și alte costuri ascunse.</li>
        <li><strong>Proces simplificat</strong> – un singur punct de contact pentru toate documentele și comunicațiile cu banca.</li>
        <li><strong>Consultanță gratuită</strong> – analiză a nevoilor, calcul de cost total și recomandări personalizate.</li>
        <li><strong>Acces la oferte exclusive</strong> – parteneriatele noastre cu instituții de credit ne permit să oferim condiții speciale.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Cum colaborăm</h2>
      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
        <li>Programăm o discuție inițială pentru a înțelege scopul și bugetul tău.</li>
        <li>Colectăm documentația necesară și evaluăm profilul financiar.</li>
        <li>Pregătim și trimitem dosarul către băncile partenere.</li>
        <li>Negociem condițiile (dobândă, comisioane, termeni).</li>
        <li>Prezentăm ofertele și te asistăm în alegerea celei mai avantajoase.</li>
        <li>Suportăm semnarea contractului și monitorizăm rambursarea.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Întrebări frecvente</h2>
      <details className="mb-4 border-b border-border/30 pb-2">
        <summary className="font-medium cursor-pointer">Cât costă serviciul de brokeraj?</summary>
        <p className="mt-2 text-muted-foreground">Serviciul este gratuit pentru client – venitul nostru provine din comisioanele acordate de bănci atunci când creditul este aprobat.</p>
      </details>
      <details className="mb-4 border-b border-border/30 pb-2">
        <summary className="font-medium cursor-pointer">Pot să aleg banca după ce brokerul mi-a oferit propuneri?</summary>
        <p className="mt-2 text-muted-foreground">Desigur, prezentăm toate opțiunile și tu decizi ce ofertă semnezi. Suntem aici să te ghidăm, nu să impunem.</p>
      </details>

      <div className="mt-8 flex flex-col items-center">
        <Link href="/credite/contact" className="inline-block">
          <Button variant="default" size="lg">Contactează-ne acum</Button>
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          Vrei să afli mai multe? <Link href="/credite" className="underline">Înapoi la lista de credite</Link>
        </p>
      </div>
    </section>
  );
}
