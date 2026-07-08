import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const footerLinks = {
  ecosystem: [
    { name: "Generali România", href: "https://www.generali.ro" },
    { name: "Real Estate", href: "/real-estate" },
    { name: "AiXLuxury", href: "https://aixluxury.com" },
    { name: "AiX OS", href: "https://ai-x-os.vercel.app/" },
    { name: "Home Find", href: "https://real-estate-platform-brown.vercel.app/" },
  ],
  services: [
    { name: "Asigurări IMM", href: "/servicii/imm-insurance" },
    { name: "Asigurări Travel", href: "/servicii/travel-insurance" },
    { name: "Asigurări Sănătate", href: "/servicii/health-insurance" },
    { name: "Asigurări de Viață", href: "/servicii/life-insurance" },
    { name: "Asigurări Auto", href: "/servicii/auto-insurance" },
  ],
  company: [
    { name: "Despre Mine", href: "/despre-mine" },
    { name: "De Ce Asigurări?", href: "/de-ce-asigurari" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Termeni și Condiții", href: "/termeni-si-conditii" },
    { name: "Politică de Confidențialitate", href: "/politica-de-confidentialitate" },
    { name: "Politică Cookie", href: "/politica-cookie" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-2xl tracking-tight">
                Cristian Văduva<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Platformă premium dedicată excelenței în asigurări, real estate și inovație tehnologică. Soluții personalizate pentru un viitor sigur și prosper.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <a href="https://www.linkedin.com/in/cristianvăduva" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaLinkedin size={20} />
              </a>
              <a href="https://instagram.com/cristian_vaduva_cristianv" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.facebook.com/CristianVaduvaCV" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaFacebook size={20} />
              </a>
              <a href="https://youtube.com/@CristianVaduvaCV" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><a href="tel:+40767110439" className="hover:text-foreground transition-colors">📞 +40 767 110 439</a></p>
              <p><a href="https://wa.me/436509536345" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">💬 WhatsApp: +43 650 953 6345</a></p>
              <p><a href="mailto:contact@cristianvaduva.com" className="hover:text-foreground transition-colors">✉️ contact@cristianvaduva.com</a></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Ecosistem</h3>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Servicii</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Companie</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Cristian Văduva. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
