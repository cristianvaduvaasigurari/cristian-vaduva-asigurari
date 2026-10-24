"use client";

import { useState, useEffect, useSyncExternalStore, type ComponentType } from "react";
import { CookieBanner } from "@/components/ui/cookie-banner";

const emptySubscribe = () => () => {};

export default function ClientUI() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [IdleUIComponent, setIdleUIComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadIdleUI = () => {
      import("./IdleUI")
        .then((mod) => {
          setIdleUIComponent(() => mod.default);
        })
        .catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(loadIdleUI, { timeout: 3500 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    } else {
      const timer = setTimeout(loadIdleUI, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CookieBanner />
      {IdleUIComponent ? <IdleUIComponent /> : null}
    </>
  );
}

