"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/visitorTracker";

export default function Telemetry() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => trackPageView());
      } else {
        setTimeout(() => trackPageView(), 100);
      }
    }
  }, [pathname, searchParams]);

  return null;
}
