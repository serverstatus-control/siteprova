import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SettingsProvider } from "./hooks/use-settings";
import { AuthProvider } from "./hooks/use-auth";
import { Router } from "wouter";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SettingsProvider>
        <Router base="/siteprova">
          <App />
        </Router>
      </SettingsProvider>
    </AuthProvider>
  </QueryClientProvider>
);
