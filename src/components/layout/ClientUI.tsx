"use client";

import { GlobalHomeButton } from "@/components/ui/global-home-button";
import { SmartPopup } from "@/components/ui/smart-popup";
import { AiChatbot } from "@/components/ui/ai-chatbot";
import { CookieBanner } from "@/components/ui/cookie-banner";

export default function ClientUI() {
  return (
    <>
      <GlobalHomeButton />
      <SmartPopup />
      <AiChatbot />
      <CookieBanner />
    </>
  );
}
