import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { insertUserSchema, loginUserSchema } from "@shared/schema";
import type { User as SharedUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from '@/components/ui/toast';
import { useLocation } from 'wouter';
import { z } from "zod";

// Use the User type inferred from the shared schema (includes createdAt)
type User = SharedUser;

// Define types for login and registration data
type LoginData = z.infer<typeof loginUserSchema>;
type RegisterData = z.infer<typeof insertUserSchema>;

// Define the Auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

// Create the Auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  // Query to fetch the current user
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Function to migrate favorites from localStorage
  const migrateFavorites = async () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (!savedFavorites) return;

    const favorites = JSON.parse(savedFavorites);
    if (!Array.isArray(favorites) || favorites.length === 0) return;

    // Add favorites through the API
    for (const serviceId of favorites) {
      try {
        await apiRequest("POST", `/api/favorites/${serviceId}`);
      } catch (error) {
        console.error("Error migrating favorite:", error);
      }
    }

    // Remove favorites from localStorage after migration
    localStorage.removeItem("favorites");
  };

  // Login mutation
  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: async (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      // Migrate favorites after login
      await migrateFavorites();
  // Invalidate the favorites query to force a refresh
  queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.username}!`,
      });
    },
  onError: (error: unknown) => {
      // Normalize error message: apiRequest throws Error like "401: {\"message\":\"...\"}"
      let userMessage = "Login failed. Please check your credentials and try again.";
      let devDetails: string | null = null;

      if (error instanceof Error) {
        // Try to extract JSON payload after the status code, if present
        const parts = error.message.split(/:\s*(\{[\s\S]*$)/);
        if (parts.length >= 2) {
          const maybeJson = parts[1];
          try {
            const parsed = JSON.parse(maybeJson);
            if (parsed && parsed.message) {
              // If API returned a clear message, surface a friendly version
              userMessage = parsed.message === 'Password non valida' ? 'Email o password non corretti.' : String(parsed.message);
            } else {
              devDetails = String(parsed);
            }
          } catch {
            // Fallback: keep full error.message for dev details
            devDetails = error.message;
          }
        } else {
          // Non-JSON message, show it in dev details
          devDetails = error.message;
        }
      } else if (typeof error === 'string') {
        userMessage = error;
      }

      toast({
        title: "Accesso non riuscito",
        description: userMessage || 'Email o password non corretti. Riprova oppure recupera la password.',
        // Usa lo stile coerente con la pagina login (scuro con accenti arancioni)
        variant: "default",
        className: "bg-gray-900 text-white border-orange-600/60 shadow-orange-500/30",
        action: (
          <ToastAction asChild altText="Recupera password">
            <button
              onClick={() => navigate('/forgot-password')}
              className="border-orange-600 text-orange-300 hover:bg-orange-600/20"
            >
              Recupera password
            </button>
          </ToastAction>
        ),
        duration: 9000,
        // show technical details only in development for debugging (appended to description)
        ...(process.env.NODE_ENV === 'development' && devDetails
          ? { description: `${userMessage}\n\n[DEBUG] ${devDetails}` }
          : {}),
      });
    },
  });

  // Registration mutation
  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const safeUser = user ?? null;

  return (
    <AuthContext.Provider
      value={{
        user: safeUser,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}