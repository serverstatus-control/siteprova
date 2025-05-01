import React, { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import AdminPage from "@/pages/admin-page";
import AuthPage from "@/pages/auth-page";
import InfoPage from "@/pages/info-page";
import AccountDashboard from "@/pages/account-dashboard";
import { AuthProvider } from "@/hooks/use-auth";
import { SettingsProvider } from "@/hooks/use-settings";
import { ProtectedRoute } from "@/lib/protected-route";
import CustomCursor from "@/components/CustomCursor";

function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
      <div style={{
        height: 4,
        width: `${width}%`,
        background: "#facc15",
        transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
        borderRadius: 2
      }} />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <ProtectedRoute path="/admin" component={AdminPage} adminOnly={true} />
      <ProtectedRoute path="/account-dashboard" component={AccountDashboard} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/info" component={InfoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CustomCursor />
        <ScrollProgressBar />
        <Router />
        <Toaster />
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
