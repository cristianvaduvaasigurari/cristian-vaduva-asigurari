"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminLoginFormProps {
  redirectTo?: string;
}

export function AdminLoginForm({ redirectTo = "/dashboard" }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage("Te rugăm să completezi atât adresa de e-mail, cât și parola.");
      return;
    }

    try {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setIsLoading(false);
        // Clean, user-friendly security message without leaking internal database errors
        if (error.message?.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage("Adresă de e-mail sau parolă incorectă.");
        } else if (error.message?.toLowerCase().includes("email not confirmed")) {
          setErrorMessage("Adresa de e-mail nu este confirmată. Verifică mesajul primit pe e-mail.");
        } else {
          setErrorMessage("Autentificarea a eșuat. Verifică datele introduse și încearcă din nou.");
        }
        return;
      }

      if (!data.session) {
        setIsLoading(false);
        setErrorMessage("Sesiunea nu a putut fi inițializată. Reîncearcă.");
        return;
      }

      // Hard navigation to ensure Next.js Server Components receive fresh session cookies
      window.location.href = redirectTo;
    } catch {
      setIsLoading(false);
      setErrorMessage("A intervenit o eroare de comunicare cu serverul de autentificare.");
    }
  };

  return (
    <div className="glass max-w-md w-full p-8 md:p-10 rounded-3xl border border-border/60 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Acces Restrâns
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Portal Administrare</h1>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Introdu credențialele de administrator pentru a accesa lead-urile și cererile clienților.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2.5 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Adresă de e-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cristianvaduva.com"
                className="pl-10 h-11 bg-background/50 border-border/80 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Parolă
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 bg-background/50 border-border/80 focus:border-blue-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Ascunde parola" : "Afișează parola"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Se verifică...
              </span>
            ) : (
              "Conectare în Portal"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-border/40 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Înapoi pe prima pagină
          </Link>
        </div>
      </div>
    </div>
  );
}
