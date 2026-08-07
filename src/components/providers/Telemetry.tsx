"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendVisitorEvent } from "@/lib/visitorTracker";

/**
 * Telemetry component runs once per page load on the client.
 * It can be extended to fire high‑intent visitor events.
 * Currently it hooks into route changes and notifies the
 * server‑side visitor tracking endpoint.
 */
export default function Telemetry() {
  const router = useRouter();

  useEffect(() => {
    // Initial page view (already handled by layout, but kept for safety)
    sendVisitorEvent({ type: "page_view" });

    const handleRouteChange = (url: string) => {
      sendVisitorEvent({ type: "page_view", url });
    };

    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null;
}
