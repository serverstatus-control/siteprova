import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function AccountDashboard() {
  const { user, isLoading, logoutMutation } = useAuth();
  const { t } = useSettings();
  const [_, navigate] = useLocation();

  React.useEffect(() => {
    if (!isLoading && !user) {
  navigate("/siteprova/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background animate-fade-in">
      <Card className="w-full max-w-md shadow-xl transition-transform duration-500 animate-slide-up">
        <CardHeader>
          <CardTitle>{t.accountTitle || "Il tuo Account"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-semibold">{t.username || "Username"}:</span> {user.username}
          </div>
          <div>
            <span className="font-semibold">{t.email || "Email"}:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">{t.role || "Ruolo"}:</span> {user.role}
          </div>
          {user.createdAt && (
            <div>
              <span className="font-semibold">{t.registeredAt || "Registrato il"}:</span> {new Date(user.createdAt).toLocaleDateString()}
            </div>
          )}
          <div className="flex flex-col gap-2 mt-6">
            <Button 
              variant="secondary"
              className="w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToDashboard || "Torna indietro"}
            </Button>
            <Button 
              variant="destructive" 
              className="w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.loggingOut || "Logout..."}
                </>
              ) : (
                t.logout || "Logout"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
