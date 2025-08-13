"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      const onReady = () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .catch((err) => console.error("SW registration failed", err));
      };

      if (document.readyState === "complete") onReady();
      else window.addEventListener("load", onReady);

      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  return null;
}
