import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"

import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// ✅ Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[BoxFit] ✅ Service Worker registered:", registration);
      })
      .catch((registrationError) => {
        console.error("[BoxFit] ❌ Service Worker registration failed:", registrationError);
      });
  });
}

// ✅ Handle PWA install prompt
let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("[BoxFit] 📱 beforeinstallprompt triggered");
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("installBoxFit");
  if (installBtn) {
    installBtn.style.display = "block";

    installBtn.addEventListener("click", async () => {
      console.log("[BoxFit] 📲 Install button clicked");
      installBtn.style.display = "none";
      deferredPrompt.prompt();

      const choiceResult = await deferredPrompt.userChoice;
      console.log("[BoxFit] 🛠️ User install result:", choiceResult.outcome);

      deferredPrompt = null;
    });
  }
});
