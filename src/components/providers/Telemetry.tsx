"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/visitorTracker";

export default function Telemetry() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => trackPageView());
        } else {
          trackPageView();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  return null;
}
