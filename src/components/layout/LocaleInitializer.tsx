// src/components/layout/LocaleInitializer.tsx
"use client";

import { useEffect } from "react";

/**
 * LocaleInitializer sets the default cookie "NEXT_LOCALE" on the client side if missing.
 * It does not render any UI elements.
 */
export default function LocaleInitializer() {
  // Ensure the cookie is set on first render if missing
  useEffect(() => {
    if (!document.cookie.includes("NEXT_LOCALE")) {
      document.cookie = "NEXT_LOCALE=ro; path=/; max-age=2592000"; // 30 days
    }
  }, []);

  return null;
}
