"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/config/contact";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/despre-mine" },
  { name: "Insurance", href: "/#servicii" },
  { name: "Why Insurance", href: "/de-ce-asigurari" },
  { name: "Real Estate", href: "/real-estate" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start justify-center gap-0.5">
            <span className="font-heading font-bold text-xl tracking-tight leading-none text-foreground">
              cristianvaduva.com
            </span>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1">
              <Link href="/aixluxury" className="hover:text-foreground transition-colors">AiXLuxury.com</Link>
              <span className="w-1 h-1 rounded-full bg-border" />
              <Link href="/aixos" className="hover:text-foreground transition-colors">AiX OS</Link>
              <span className="w-1 h-1 rounded-full bg-border" />
              <Link href="/home-find" className="hover:text-foreground transition-colors">Home Find</Link>
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

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="rounded-full border-border hover:bg-muted" asChild>
              <Link href="/calculatoare">Calculatoare</Link>
            </Button>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold" asChild>
              <Link href="/contact">Contact</Link>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-border p-4 md:hidden flex flex-col gap-2 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium p-3 hover:bg-muted rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full justify-center rounded-full" asChild>
                <Link href="/calculatoare" onClick={() => setIsMobileMenuOpen(false)}>Calculatoare</Link>
              </Button>
              <Button className="w-full justify-center rounded-full bg-foreground text-background" asChild>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
