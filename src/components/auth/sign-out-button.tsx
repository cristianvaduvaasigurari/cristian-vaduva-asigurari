"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/lib/../components/ui/button";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  className?: string;
  redirectTo?: string;
}

export function SignOutButton({ className, redirectTo = "/dashboard" }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = redirectTo;
    } catch {
      window.location.href = redirectTo;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={isLoading}
      className={className}
      aria-label="Deconectare din contul de administrator"
    >
      <LogOut className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
      {isLoading ? "Deconectare..." : "Deconectare"}
    </Button>
  );
}
