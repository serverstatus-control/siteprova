import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema, loginUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import React from "react";

export default function AuthPage() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const tabParam = urlParams.get('tab');
  const [activeTab, setActiveTab] = useState<"login" | "register">(
    tabParam === "register" ? "register" : "login"
  );
  const { user, loginMutation, registerMutation } = useAuth();
  const { t } = useSettings();
  const [_, navigate] = useLocation();

  // Assicura che il tab venga aggiornato quando cambia l'URL
  useEffect(() => {
    if (tabParam === "register") {
      setActiveTab("register");
    } else if (tabParam === "login") {
      setActiveTab("login");
    }
  }, [tabParam]);

  // Effettua il redirect automatico dopo la registrazione
  React.useEffect(() => {
    if (registerMutation.isSuccess && user) {
      navigate("/");
    }
  }, [registerMutation.isSuccess, user, navigate]);

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-background">
      {/* Pulsante per tornare indietro */}
      <Button
        variant="ghost"
        className="fixed z-20 flex items-center px-3 py-2 text-sm top-2 left-2 md:absolute md:top-4 md:left-4 md:z-0 md:text-base"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="hidden xs:inline">{t.backToDashboard || "Torna alla Dashboard"}</span>
      </Button>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center bg-primary/10 p-6 sm:p-10 text-center min-h-[260px] md:min-h-0">
        <div className="w-full max-w-md mx-auto">
          <h1 className="mb-4 text-3xl font-bold leading-tight break-words sm:text-4xl">
            {t.serverStatus || "Service Status Dashboard"}
          </h1>
          <p className="mb-6 text-base sm:text-lg text-muted-foreground">
            {t.heroDescription || "Monitora lo stato operativo dei vari servizi e piattaforme in tempo reale. Rimani informato su interruzioni e problemi di prestazione."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>{t.operational || "Operativo"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>{t.degraded || "Degradato"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>{t.down || "Non Operativo"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm mx-auto sm:max-w-md">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">{t.login || "Accedi"}</TabsTrigger>
              <TabsTrigger value="register">{t.register || "Registrati"}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm 
                isLoading={loginMutation.isPending} 
                onSubmit={loginMutation.mutate} 
                t={t}
              />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm 
                isLoading={registerMutation.isPending} 
                onSubmit={registerMutation.mutate} 
                t={t}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Login Form Component
function LoginForm({ 
  isLoading, 
  onSubmit, 
  t 
}: { 
  isLoading: boolean; 
  onSubmit: (data: z.infer<typeof loginUserSchema>) => void;
  t: Record<string, string>;
}) {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.login || "Accedi"}</CardTitle>
        <CardDescription>{t.loginDescription || "Inserisci le tue credenziali per accedere all'account"}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.email || "Email"}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t.emailPlaceholder || "Inserisci la tua email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.password || "Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t.passwordPlaceholder || "Inserisci la tua password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.loggingIn || "Accesso in corso..."}
                </>
              ) : (
                t.login || "Accedi"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

// Register Form Component
function RegisterForm({ 
  isLoading, 
  onSubmit, 
  t 
}: { 
  isLoading: boolean; 
  onSubmit: (data: z.infer<typeof insertUserSchema>) => void;
  t: Record<string, string>;
}) {
  // Schema esteso con conferma password ed email
  const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t.passwordMismatch || "Le password non corrispondono",
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    // Rimuovi confirmPassword prima di inviare all'API
    const { confirmPassword, ...userData } = data;
    onSubmit(userData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.register || "Registrati"}</CardTitle>
        <CardDescription>{t.registerDescription || "Crea un nuovo account per accedere alla dashboard"}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.username || "Username"}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.usernamePlaceholder || "Scegli un username"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.email || "Email"}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t.emailPlaceholder || "Inserisci la tua email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.password || "Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t.passwordPlaceholder || "Scegli una password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.confirmPassword || "Conferma Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t.confirmPasswordPlaceholder || "Conferma la tua password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.creatingAccount || "Creazione account in corso..."}
                </>
              ) : (
                t.register || "Registrati"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}