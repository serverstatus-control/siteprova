import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import AdminPage from "@/pages/admin-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/services/:slug" component={ServiceDetail}/>
      <Route path="/admin" component={AdminPage}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
