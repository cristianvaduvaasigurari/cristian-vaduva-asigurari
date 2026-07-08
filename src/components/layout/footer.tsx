import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerLinks = {
  ecosystem: [
    { name: "Generali România", href: "#servicii" },
    { name: "Real Estate", href: "https://real-estate.cristianvaduva.com" },
    { name: "AiXLuxury", href: "https://aixluxury.com" },
    { name: "AiX OS", href: "https://aixos.com" },
    { name: "Home Finder", href: "https://homefinder.com" },
  ],
  services: [
    { name: "Asigurări IMM", href: "#servicii" },
    { name: "Asigurări Travel", href: "#servicii" },
    { name: "Asigurări Health", href: "#servicii" },
    { name: "Asigurări Life", href: "#servicii" },
    { name: "Asigurări Auto & Home", href: "#servicii" },
  ],
  company: [
    { name: "Despre Mine", href: "#despre" },
    { name: "Testimoniale", href: "#testimoniale" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Termeni și Condiții", href: "/termeni" },
    { name: "Politică de Confidențialitate", href: "/confidentialitate" },
    { name: "Cookie-uri", href: "/cookies" },
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-foreground transition-colors p-2 glass rounded-full">
                <FaTwitter size={20} />
              </a>
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
