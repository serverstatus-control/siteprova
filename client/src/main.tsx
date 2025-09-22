import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SettingsProvider } from "./hooks/use-settings";
import { AuthProvider } from "./hooks/use-auth";
import { Router } from "wouter";

// Configurazione base path per GitHub Pages
const basePath = import.meta.env.MODE === 'production' && 
                 window.location.hostname === 'serverstatus-control.github.io' 
                 ? '/siteprova' : '';

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
