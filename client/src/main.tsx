import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SettingsProvider } from "./hooks/use-settings";
import { AuthProvider } from "./hooks/use-auth";
import { Router } from "wouter";

// Configurazione base path per GitHub Pages e Render
const isProd = import.meta.env.MODE === 'production';
const host = typeof window !== 'undefined' ? window.location.hostname : '';
const basePath = isProd && (host === 'serverstatus-control.github.io' || host.endsWith('.onrender.com'))
  ? '/siteprova'
  : '';

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SettingsProvider>
        <Router base={basePath}>
          <App />
        </Router>
      </SettingsProvider>
    </AuthProvider>
  </QueryClientProvider>
);
