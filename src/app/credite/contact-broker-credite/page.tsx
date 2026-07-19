import { Metadata } from 'next';
import { CreditLanding } from '@/components/sections/CreditLanding';
import { ContactForm } from '@/components/sections/contact-form';

export const metadata: Metadata = {
  title: 'Contactaţi Brokerul de Credite - Cristian Văduva Premium',
  description: 'Obţineţi consultanţă gratuită pentru credite ipotecare şi alte produse de credit. Vorbiţi cu brokerul Cristian Văduva pentru economisire de timp și bani.'
};

export default function ContactBrokerCreditePage() {
  const benefits = [
    { title: 'Comparăm ofertele mai multor bănci', icon: '🔎' },
    { title: 'Negociem condiții mai bune', icon: '🤝' },
    { title: 'Te ajutăm cu documentele', icon: '📄' },
    { title: 'Economisești timp', icon: '⏱️' },
    { title: 'Primești răspuns rapid', icon: '⚡' },
    { title: 'Sprijin până la semnarea contractului', icon: '🖋️' }
  ];
  const steps = [
    'Discuție inițială pentru a înțelege nevoile și obiectivele financiare',
    'Analiza situației financiare și a opțiunilor disponibile',
    'Selecția băncilor și a ofertelor potrivite',
    'Pregătirea dosarului și verificarea documentelor',
    'Negocierea condițiilor cu banca',
    'Aprobarea și semnarea contractului',
    'Monitorizarea execuției și suport post‑semnare'
  ];
  const faqLinks = [
    { href: '/credite/faq#intrebare1', text: 'Ce documente sunt necesare pentru a solicita un credit?' },
    { href: '/credite/faq#intrebare2', text: 'Cât timp durează procesul de aprobare?' },
    { href: '/credite/faq#intrebare3', text: 'Pot negocia rata dobânzii?' }
  ];

  return (
    <>
      <CreditLanding
        heroTitle="Contactaţi Brokerul de Credite"
        heroSubtitle="Obţineţi consultanţă gratuită și soluţii personalizate pentru creditul dumneavoastră, fără stres și pierderi de timp."
        benefits={benefits}
        steps={steps}
        ctaLink="#contact-form"
        ctaText="Solicită o consultație gratuită"
        faqLinks={faqLinks}
      />
      <section id="contact-form" className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Formular de contact</h2>
        <ContactForm target="credit" brokerName="Cristian Văduva" />
      </section>
    </>
  );
}
