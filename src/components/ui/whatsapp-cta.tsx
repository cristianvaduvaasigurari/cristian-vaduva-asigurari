"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/config/contact";
import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
  toolName?: string;
  contextSummary?: string;
  className?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function WhatsAppCta({
  toolName,
  contextSummary,
  className,
  label = "Scrie-mi pe WhatsApp",
  variant = "primary",
  size = "md",
}: WhatsAppCtaProps) {
  const href = React.useMemo(() => {
    const base = CONTACT.whatsapp.href;
    const parts: string[] = ["Salut, Cristian!"];

    if (toolName) {
      parts.push(`Am utilizat instrumentul „${toolName}” de pe site.`);
    }

    if (contextSummary) {
      parts.push(`Subiect: ${contextSummary}.`);
    }

    parts.push("Aș dori o discuție consultativă despre opțiunile de asigurare potrivite.");

    const text = encodeURIComponent(parts.join(" "));
    return `${base}?text=${text}`;
  }, [toolName, contextSummary]);

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm hover:shadow transition-all",
    secondary:
      "bg-zinc-900 hover:bg-black text-white font-semibold shadow-sm hover:shadow transition-all",
    outline:
      "bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold transition-all",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      <MessageCircle className="w-4 h-4 shrink-0 text-white fill-white/10" />
      <span>{label}</span>
    </a>
  );
}
