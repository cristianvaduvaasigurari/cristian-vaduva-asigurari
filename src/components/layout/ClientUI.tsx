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

    let loaded = false;
    const loadIdleUI = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      import("./IdleUI")
        .then((mod) => {
          setIdleUIComponent(() => mod.default);
        })
        .catch(() => {});
    };

    const cleanup = () => {
      window.removeEventListener("scroll", loadIdleUI);
      window.removeEventListener("touchstart", loadIdleUI);
      window.removeEventListener("click", loadIdleUI);
      window.removeEventListener("keydown", loadIdleUI);
    };

    window.addEventListener("scroll", loadIdleUI, { passive: true, once: true });
    window.addEventListener("touchstart", loadIdleUI, { passive: true, once: true });
    window.addEventListener("click", loadIdleUI, { passive: true, once: true });
    window.addEventListener("keydown", loadIdleUI, { passive: true, once: true });

    const timer = setTimeout(loadIdleUI, 5000);
    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CookieBanner />
      {IdleUIComponent ? <IdleUIComponent /> : null}
    </>
  );
}

