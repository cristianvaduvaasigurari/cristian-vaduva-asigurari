"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const SmartPopup = dynamic(
  () => import("@/components/ui/smart-popup").then((m) => m.SmartPopup),
  { ssr: false }
);

const AiChatbot = dynamic(
  () => import("@/components/ui/ai-chatbot").then((m) => m.AiChatbot),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import("@/components/ui/cookie-banner").then((m) => m.CookieBanner),
  { ssr: false }
);

const QuickOfferModal = dynamic(
  () => import("@/components/ui/quick-offer-modal").then((m) => m.QuickOfferModal),
  { ssr: false }
);

const InsuranceNeedModal = dynamic(
  () => import("@/components/ui/insurance-need-modal").then((m) => m.InsuranceNeedModal),
  { ssr: false }
);

const emptySubscribe = () => () => {};

export default function ClientUI() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [idleReady, setIdleReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(() => setIdleReady(true), { timeout: 2500 });
        return () => {
          if ("cancelIdleCallback" in window) {
            (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
          }
        };
      } else {
        const timer = setTimeout(() => setIdleReady(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CookieBanner />
      {idleReady && (
        <>
          <SmartPopup />
          <AiChatbot />
          <QuickOfferModal />
          <InsuranceNeedModal />
        </>
      )}
    </>
  );
}
