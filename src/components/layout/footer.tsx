import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CONTACT } from "@/config/contact";

const footerLinks = {
  ecosystem: [
    { name: "Generali România", href: "/generali" },
    { name: "Real Estate", href: "/real-estate" },
    { name: "AiX", href: "/aixbeneficiu" },
    { name: "AiX OS", href: "/aixos" },
    { name: "Home Find", href: "/home-find" },
    { name: "Ecosistem AiX", href: "/ecosistem" },
  ],
  servicesPersonal: [
    { name: "Asigurare de Viață", href: "/servicii/life-insurance" },
    { name: "Sănătate Individuală", href: "/servicii/health-insurance-individual" },
    { name: "Asigurare Locuință", href: "/servicii/home-insurance" },
    { name: "Travel Individual", href: "/servicii/travel-insurance-individual" },
    { name: "Asigurare CASCO", href: "/servicii/casco-insurance" },
    { name: "Asigurare RCA", href: "/servicii/rca-insurance" },
  ],
  servicesBusiness: [
    { name: "Asigurări IMM", href: "/servicii/imm-insurance" },
    { name: "Răspundere Generală", href: "/servicii/business-general-liability" },
    { name: "Cyber Risk", href: "/servicii/business-cyber-insurance" },
    { name: "D&O (Răsp. Manageri)", href: "/servicii/business-directors-liability" },
    { name: "Cargo & Marfă", href: "/servicii/business-cargo-insurance" },
    { name: "Asigurare Șantiere", href: "/servicii/business-construction-insurance" },
  ],
  tools: [
    { name: "Risk Simulator", href: "/risk-simulator" },
    { name: "Command Wall", href: "/personal-dashboard" },
    { name: "Second Opinion", href: "/second-opinion" },
    { name: "Garaj cu acces rapid și securizat pentru vehicule de lux", href: "/serviciu avansat pentru tine-garage" },
    { name: "Client Journey", href: "/client-journey" },
    { name: "Trust Center", href: "/trust-center" },
    { name: "Smart Forms", href: "/smart-forms" },
    { name: "AiX Mission Control", href: "/mission-control" },
    { name: "Wealth Galaxy", href: "/wealth-galaxy" },
    { name: "Digital Property City", href: "/property-city" },
    { name: "Satellite View", href: "/satellite-view" },
    { name: "AI Video Concierge", href: "/avatar" },
    { name: "Live Market Radar", href: "/market-radar" },
    { name: "Voice AI Assistant", href: "/voice-assistant" },
    { name: "Wealth Passport", href: "/wealth-passport" },
    { name: "AiX Life Simulator", href: "/simulator" },
    { name: "AiX Financial Twin", href: "/financial-twin" },
    { name: "Family Planner", href: "/family-planner" },
    { name: "RE Analyzer", href: "/investitii-imobiliare/analyzer" },
    { name: "acces rapid pentru tine Assets", href: "/serviciu avansat pentru tine-assets" },
    { name: "Centru Urgențe", href: "/urgente" },
    { name: "Claim Assistant", href: "/claim-assistant" },
    { name: "Raport Strategic", href: "/raport-strategic" },
  ],
  company: [
    { name: "AiX Academy", href: "/academy" },
    { name: "AiX Advisor", href: "/advisor" },
    { name: "Coverage Gap", href: "/gap-analyzer" },
    { name: "Harta Protecției", href: "/harta-protectiei" },
    { name: "Ofertă Rapidă", href: "/oferta-rapida" },
    { name: "AiX Insights", href: "/insights" },
    { name: "Resurse beneficiu", href: "/resurse" },
    { name: "Despre Mine", href: "/despre-mine" },
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
    <footer className="bg-[#0a0a0a] text-white border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                Cristian Văduva<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              Ajutăm clienții să economisească timp și să evite riscuri financiare prin asigurări adaptate nevoilor și acces la proprietăți verificate, pentru un viitor sigur și prosper.
            </p>
            <div className="flex items-center gap-4 text-white/60 mb-8">
              <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaLinkedin size={20} />
              </a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaInstagram size={20} />
              </a>
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaFacebook size={20} />
              </a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="space-y-3 text-sm text-white/80 font-medium bg-white/5 p-6 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">📞</div>
                <a href={CONTACT.phone.href} className="hover:text-white transition-colors">{CONTACT.phone.display}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">💬</div>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{CONTACT.whatsapp.display}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">✉️</div>
                <a href={CONTACT.email.href} className="hover:text-white transition-colors">{CONTACT.email.display}</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Ecosistem</h3>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Persoane</h3>
            <ul className="space-y-4">
              {footerLinks.servicesPersonal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Companii</h3>
            <ul className="space-y-4">
              {footerLinks.servicesBusiness.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Unelte Noi</h3>
            <ul className="space-y-4">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Informații</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Cristian Văduva. Toate drepturile rezervate. Powered by cristianvaduva.com
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-medium">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
