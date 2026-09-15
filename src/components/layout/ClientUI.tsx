"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const GlobalHomeButton = dynamic(
  () => import("@/components/ui/global-home-button").then((m) => m.GlobalHomeButton),
  { ssr: false }
);

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

const emptySubscribe = () => () => {};

export default function ClientUI() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <>
      <GlobalHomeButton />
      <SmartPopup />
      <AiChatbot />
      <CookieBanner />
      <QuickOfferModal />
    </>
  );
}
