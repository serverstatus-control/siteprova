import React, { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import AdminPage from "@/pages/admin-page";
import AuthPage from "@/pages/auth-page";
import InfoPage from "@/pages/info-page";
import UpdatesPage from "@/pages/updates-page";
import AccountDashboard from "@/pages/account-dashboard";
import { ProtectedRoute } from "@/lib/protected-route";
import CustomCursor from "@/components/CustomCursor";

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollPx ? (scrollPx / winHeightPx) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-background/20">
      <div
        className="h-full transition-all duration-150 bg-primary/50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/siteprova/" component={Home} />
      <Route path="/siteprova/services/:slug" component={ServiceDetail} />
      <ProtectedRoute path="/siteprova/admin" component={AdminPage} adminOnly={true} />
      <ProtectedRoute path="/siteprova/account-dashboard" component={AccountDashboard} />
      <Route path="/siteprova/auth" component={AuthPage} />
      <Route path="/siteprova/info" component={InfoPage} />
      <Route path="/siteprova/:rest*" component={NotFound} />
      <Route path="/siteprova/updates" component={UpdatesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
      <Router />
      <Toaster />
    </>
  );
}

export default App;
