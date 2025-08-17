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
import ResetRequest from "@/pages/reset-password";
import ResetConfirm from "@/pages/reset-confirm";
import { ProtectedRoute } from "@/lib/protected-route";
import CustomCursor from "@/components/CustomCursor";

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      // Use pageYOffset for cross-browser consistency, fallback to documentElement/body
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      // Compute document height using the larger of body and documentElement
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      const scrollable = Math.max(0, docHeight - winHeight);
      const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      setScrollProgress(progress);
    };

    const onScroll = () => {
      // throttle updates to animation frames
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // initial calc
    updateScrollProgress();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
  <Route path="/siteprova/reset-password" component={ResetRequest} />
  <Route path="/siteprova/reset" component={ResetConfirm} />
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
