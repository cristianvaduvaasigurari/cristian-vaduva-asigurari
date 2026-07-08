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
  personal: [
    { name: "Asigurări de Viață", href: "/servicii/life-insurance" },
    { name: "Viață cu Capitalizare", href: "/servicii/life-capitalization" },
    { name: "Sănătate", href: "/servicii/health-insurance" },
    { name: "Locuință (Facultativă)", href: "/servicii/home-insurance" },
    { name: "PAD (Obligatorie)", href: "/servicii/pad-insurance" },
    { name: "Travel / Călătorii", href: "/servicii/travel-insurance" },
    { name: "Accidente", href: "/servicii/accident-insurance" },
  ],
  auto: [
    { name: "RCA", href: "/servicii/rca" },
    { name: "CASCO", href: "/servicii/casco" },
    { name: "Auto Complexe", href: "/servicii/auto-insurance" },
    { name: "Flote Auto", href: "/servicii/fleet-insurance" },
  ],
  business: [
    { name: "IMM", href: "/servicii/imm-insurance" },
    { name: "Corporate & Cyber", href: "/servicii/business-insurance" },
    { name: "Clădiri Comerciale", href: "/servicii/commercial-property" },
    { name: "Mărfuri și Bunuri", href: "/servicii/goods-insurance" },
    { name: "Răspundere Profesională", href: "/servicii/professional-protection" },
    { name: "Răspundere Civilă", href: "/servicii/liability-insurance" },
    { name: "D&O (Directori)", href: "/servicii/d-and-o" },
    { name: "Asigurări Investitori", href: "/servicii/investor-insurance" },
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
    <footer className="bg-muted text-foreground border-t border-border pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12 mb-20">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-3xl tracking-tight text-foreground">
                Cristian Văduva<span className="text-blue-600">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm">
              Platformă premium dedicată excelenței în asigurări, real estate și inovație tehnologică. Soluții personalizate pentru un viitor sigur și prosper.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2.5 rounded-full border border-border bg-white shadow-sm">
                <FaLinkedin size={20} />
              </a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2.5 rounded-full border border-border bg-white shadow-sm">
                <FaInstagram size={20} />
              </a>
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2.5 rounded-full border border-border bg-white shadow-sm">
                <FaFacebook size={20} />
              </a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:bg-black/5 transition-colors p-2.5 rounded-full border border-border bg-white shadow-sm">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground font-medium">
              <p><a href={CONTACT.phone.href} className="hover:text-foreground transition-colors">📞 {CONTACT.phone.display}</a></p>
              <p><a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">💬 {CONTACT.whatsapp.label}: {CONTACT.whatsapp.display}</a></p>
              <p><a href={CONTACT.email.href} className="hover:text-foreground transition-colors">✉️ {CONTACT.email.display}</a></p>
            </div>
          </div>

          {/* Ecosistem & Companie */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground font-heading">Ecosistem</h3>
            <ul className="space-y-3 mb-10">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg mb-6 text-foreground font-heading">Companie</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicii Personal */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground font-heading border-b border-border/50 pb-3">Personal</h3>
            <ul className="space-y-3">
              {footerLinks.personal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicii Auto */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground font-heading border-b border-border/50 pb-3">Auto</h3>
            <ul className="space-y-3">
              {footerLinks.auto.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicii Business */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground font-heading border-b border-border/50 pb-3">Business</h3>
            <ul className="space-y-3">
              {footerLinks.business.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Cristian Văduva. Toate drepturile rezervate.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground font-medium">
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
