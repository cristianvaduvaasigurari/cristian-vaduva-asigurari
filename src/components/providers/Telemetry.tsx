"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/visitorTracker";

export default function Telemetry() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
