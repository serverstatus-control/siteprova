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
    <div className="fixed top-0 left-0 z-[9999] w-full h-1 bg-background/20 pointer-events-none">
      <div
        className="h-full origin-left transform transition-transform duration-300 ease-out bg-amber-400 shadow-sm pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})`, width: '100%', willChange: 'transform' }}
      />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reset-password" component={ResetRequest} />
      <Route path="/reset" component={ResetConfirm} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <ProtectedRoute path="/admin" component={AdminPage} adminOnly={true} />
      <ProtectedRoute path="/account-dashboard" component={AccountDashboard} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/info" component={InfoPage} />
      <Route path="/updates" component={UpdatesPage} />
      <Route path="/:rest*" component={NotFound} />
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
