import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import AdminPage from "@/pages/admin-page";
import AuthPage from "@/pages/auth-page";
import InfoPage from "@/pages/info-page"; 
import { AuthProvider } from "@/hooks/use-auth";
import { SettingsProvider } from "@/hooks/use-settings";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/services/:slug" component={ServiceDetail}/>
      <ProtectedRoute path="/admin" component={AdminPage} adminOnly={true}/>
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
        <Router />
        <Toaster />
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;