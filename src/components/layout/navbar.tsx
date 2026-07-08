"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Acasă", href: "/" },
  { name: "De ce asigurări?", href: "/de-ce-asigurari" },
  { name: "Servicii", href: "/#servicii" },
  { name: "Calculatoare", href: "/calculatoare" },
  { name: "Ecosistem", href: "/#ecosistem" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "glass border-border/50 shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start justify-center gap-0.5">
            <span className="font-heading font-bold text-xl tracking-tight leading-none text-foreground">
              cristianvaduva.com
            </span>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1">
              <a href="https://aixluxury.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">AiXLuxury.com</a>
              <span className="w-1 h-1 rounded-full bg-border" />
              <a href="https://ai-x-os.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">AiX OS</a>
              <span className="w-1 h-1 rounded-full bg-border" />
              <a href="https://real-estate-platform-brown.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">Home Find</a>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90" asChild>
              <Link href="/dashboard">Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-border p-4 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium p-2 hover:bg-accent rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </Button>
              <Button className="w-full justify-center bg-foreground text-background" asChild>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Portal</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
