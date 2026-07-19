import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Compară Bănci - Credite - Cristian Văduva Premium',
  description: 'Comparație detaliată a ofertelor bancare pentru credite: rate, comisioane, condiții și avantaje pentru a alege cea mai bună opţiune.'
};

export default function ComparaBanciPage() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Compară Bănci</h1>

      <p className="mb-8 text-lg text-muted-foreground">
        Alegerea băncii potrivite pentru creditare poate face diferența între o rată avantajoasă și costuri ascunse. În această pagină găseşti o comparație clară a celor mai populare instituții bancare din România.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Cum funcționează comparația</h2>
      <p className="mb-4 text-muted-foreground">
        Am analizat criterii cheie: <strong>rata dobânzii</strong>, <strong>comision de administrare</strong>, <strong>durata maximă a creditului</strong>, <strong>cerințe de documentație</strong> și <strong>beneficii suplimentare</strong> (ex. reduceri la alte produse).
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Tabel comparativ</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-border/30">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">Banca</th>
              <th className="p-2 text-left">Rată medie (APR)</th>
              <th className="p-2 text-left">Comision administrare</th>
              <th className="p-2 text-left">Durată max.</th>
              <th className="p-2 text-left">Avantaje</th>
            </tr>
          </thead>
          <tbody className="bg-background">
            <tr className="border-t border-border/20">
              <td className="p-2">Banca Comercială Română (BCR)</td>
              <td className="p-2">5,2%</td>
              <td className="p-2">0,5% pe an</td>
              <td className="p-2">30 ani</td>
              <td className="p-2">Reducere la credite auto</td>
            </tr>
            <tr className="border-t border-border/20">
              <td className="p-2">Banca Transilvania (BT)</td>
              <td className="p-2">5,0%</td>
              <td className="p-2">0,4% pe an</td>
              <td className="p-2">30 ani</td>
              <td className="p-2">Puncte loialitate</td>
            </tr>
            <tr className="border-t border-border/20">
              <td className="p-2">Alpha Bank</td>
              <td className="p-2">4,9%</td>
              <td className="p-2">0,3% pe an</td>
              <td className="p-2">25 ani</td>
              <td className="p-2">Reducere la carduri premium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Ce trebuie să iei în considerare</h2>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
        <li>Ratele pot varia în funcție de profilul solicitantului (venit, istoric credit).</li>
        <li>Comisioanele ascunse se aplică de obicei la rambursarea anticipată.</li>
        <li>Beneficiile suplimentare (de ex. reducere la alte produse) pot aduce economii semnificative.</li>
        <li>Durata creditului influențează costul total – o durată mai lungă crește suma totală plătită.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Pași pentru a alege banca potrivită</h2>
      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
        <li>Definește clar scopul și suma necesară.</li>
        <li>Folosește tabelul de mai sus pentru a filtra bănci cu rate avantajoase.</li>
        <li>Contactează un broker de credite – putem negocia condiții mai bune în numele tău.</li>
        <li>Pregătește documentația solicitată de bancă (listă detaliată în pagina „Documente Necesare”).</li>
        <li>Semnează contractul și monitorizează eventualele variații ale ratei.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4 text-foreground">Întrebări frecvente</h2>
      <details className="mb-4 border-b border-border/30 pb-2">
        <summary className="font-medium cursor-pointer">Care este diferența dintre APR și rata dobânzii?</summary>
        <p className="mt-2 text-muted-foreground">APR (Annual Percentage Rate) include toate costurile creditului – dobânda, comisioanele și alte taxe – oferind o imagine completă a costului total.</p>
      </details>
      <details className="mb-4 border-b border-border/30 pb-2">
        <summary className="font-medium cursor-pointer">Pot renegocia condițiile cu banca după aprobarea creditului?</summary>
        <p className="mt-2 text-muted-foreground">Da, în anumite condiții – de obicei dacă ai un istoric de plată impecabil sau dacă ratele de piață scad. Brokerul te poate ajuta să inițiezi renegocierea.</p>
      </details>

      <div className="mt-8 flex flex-col items-center">
        <Link href="/credite" className="inline-block">
          <Button variant="default" size="lg">Înapoi la credite</Button>
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          Ai nevoie de asistență? <Link href="/credite/contact" className="underline">Contactează brokerul de credite</Link>
        </p>
      </div>
    </section>
  );
}
