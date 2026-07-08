import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CONTACT } from "@/config/contact";

const footerLinks = {
  ecosystem: [
    { name: "Generali România", href: "/generali" },
    { name: "Real Estate", href: "/real-estate" },
    { name: "AiXLuxury", href: "/aixluxury" },
    { name: "AiX OS", href: "/aixos" },
    { name: "Home Find", href: "/home-find" },
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
    <footer className="bg-muted text-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-2xl tracking-tight text-foreground">
                Cristian Văduva<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Platformă premium dedicată excelenței în asigurări, real estate și inovație tehnologică. Soluții personalizate pentru un viitor sigur și prosper.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2 rounded-full border border-border bg-white">
                <FaLinkedin size={20} />
              </a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2 rounded-full border border-border bg-white">
                <FaInstagram size={20} />
              </a>
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2 rounded-full border border-border bg-white">
                <FaFacebook size={20} />
              </a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2 rounded-full border border-border bg-white">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground font-medium">
              <p><a href={CONTACT.phone.href} className="hover:text-foreground transition-colors">📞 {CONTACT.phone.display}</a></p>
              <p><a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">💬 {CONTACT.whatsapp.label}: {CONTACT.whatsapp.display}</a></p>
              <p><a href={CONTACT.email.href} className="hover:text-foreground transition-colors">✉️ {CONTACT.email.display}</a></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Ecosistem</h3>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Servicii</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Companie</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Cristian Văduva. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
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
