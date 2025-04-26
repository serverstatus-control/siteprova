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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/services/:slug" component={ServiceDetail}/>
      <ProtectedRoute path="/admin" component={AdminPage} adminOnly={true}/>
      <ProtectedRoute path="/account-dashboard" component={AccountDashboard}/>
      <Route path="/auth" component={AuthPage}/>
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
        <Router />
        <Toaster />
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;