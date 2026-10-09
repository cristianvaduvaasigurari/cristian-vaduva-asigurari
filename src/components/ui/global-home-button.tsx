"use client";

import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import Link from "next/link";

export function GlobalHomeButton() {
  const pathname = usePathname();
  
  // Ascundem butonul pe prima pagină
  if (pathname === "/") return null;

  return (
    <Link 
      href="/" 
      aria-label="Mergi la pagina principală"
      className="hidden md:flex fixed top-28 right-6 z-40 items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-md rounded-full text-zinc-800 hover:text-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-xs"
      title="Back to Home"
    >
      <Home className="w-4 h-4 text-zinc-700 hover:text-blue-600 transition-colors" />
      <span>Home</span>
    </Link>

  );
}
