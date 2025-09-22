import React, { useEffect, useState, Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home"; // Manteniamo Home caricato subito per il First Paint
import { ProtectedRoute } from "@/lib/protected-route";
import CustomCursor from "@/components/CustomCursor";

// Lazy loading per le pagine non critiche
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const AdminPage = lazy(() => import("@/pages/admin-page"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const InfoPage = lazy(() => import("@/pages/info-page"));
const UpdatesPage = lazy(() => import("@/pages/updates-page"));
const AccountDashboard = lazy(() => import("@/pages/account-dashboard"));
const ResetRequest = lazy(() => import("@/pages/reset-password"));
const ResetConfirm = lazy(() => import("@/pages/reset-confirm"));
const ForgotPassword = lazy(() => import("@/pages/forgot-password"));
const ResetSuccess = lazy(() => import("@/pages/reset-success"));

// Componente di loading riutilizzabile
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
      <Route path="/reset-password">
        <Suspense fallback={<PageLoader />}>
          <ResetRequest />
        </Suspense>
      </Route>
      <Route path="/reset">
        <Suspense fallback={<PageLoader />}>
          <ResetConfirm />
        </Suspense>
      </Route>
      <Route path="/forgot-password">
        <Suspense fallback={<PageLoader />}>
          <ForgotPassword />
        </Suspense>
      </Route>
      <Route path="/reset-success">
        <Suspense fallback={<PageLoader />}>
          <ResetSuccess />
        </Suspense>
      </Route>
      <Route path="/services/:slug">
        <Suspense fallback={<PageLoader />}>
          <ServiceDetail />
        </Suspense>
      </Route>
      <Route path="/admin">
        <ProtectedRoute adminOnly={true}>
          <Suspense fallback={<PageLoader />}>
            <AdminPage />
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/account-dashboard">
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <AccountDashboard />
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/auth">
        <Suspense fallback={<PageLoader />}>
          <AuthPage />
        </Suspense>
      </Route>
      <Route path="/info">
        <Suspense fallback={<PageLoader />}>
          <InfoPage />
        </Suspense>
      </Route>
      <Route path="/updates">
        <Suspense fallback={<PageLoader />}>
          <UpdatesPage />
        </Suspense>
      </Route>
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
