import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { apiRequest } from "../lib/api";
import { useToast } from "./use-toast";
import { toast } from "./use-toast";
import { translations, type Translation } from "@/lib/translations";

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "it" | "es" | "fr" | "de" | "zh" | "ja" | "pt" | "ru";

// Re-export Translation type for components
export { type Translation };

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
  favorites: string[];
  addToFavorites: (serviceId: string | number) => void;
  removeFromFavorites: (serviceId: string | number) => void;
  addFavorite: (serviceId: string | number) => void;
  removeFavorite: (serviceId: string | number) => void;
  isFavorite: (serviceId: string | number) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [language, setLanguage] = useState<Language>("en");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Get translations for current language with safe fallback to English
  const t = translations[language] ?? translations.en;

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedFavorites = localStorage.getItem('favorites');

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }

    if (savedLanguage && ['en', 'it', 'es', 'fr', 'de', 'zh', 'ja', 'pt', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  // Query user settings from server
  const { data: userSettings } = useQuery({
    queryKey: ['userSettings'],
    queryFn: async () => {
      if (!user) return null;
      return apiRequest('GET', '/api/user/settings');
    },
    enabled: !!user,
  });

  // Update theme mutation
  const updateThemeMutation = useMutation({
    mutationFn: async (newTheme: Theme) => {
      localStorage.setItem('theme', newTheme);
      if (user) {
        return apiRequest('PATCH', '/api/user/settings', { theme: newTheme });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
    }
  });

  // Update language mutation
  const updateLanguageMutation = useMutation({
    mutationFn: async (newLanguage: Language) => {
      localStorage.setItem('language', newLanguage);
      if (user) {
        return apiRequest('PATCH', '/api/user/settings', { language: newLanguage });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
    }
  });

  // Update favorites mutation
  const updateFavoritesMutation = useMutation({
    mutationFn: async (newFavorites: string[]) => {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      if (user) {
        return apiRequest('PATCH', '/api/user/settings', { favorites: newFavorites });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
    }
  });

  // Handle theme changes
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    updateThemeMutation.mutate(newTheme);
  };

  // Handle language changes
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    updateLanguageMutation.mutate(newLanguage);
  };

  // Add to favorites
  const addToFavorites = (serviceId: string | number) => {
    const idStr = String(serviceId);
    if (!favorites.includes(idStr)) {
      const newFavorites = [...favorites, idStr];
      setFavorites(newFavorites);
      updateFavoritesMutation.mutate(newFavorites);
      
      toast({
        title: t.success,
        description: t.addToFavorites,
      });
    }
  };

  // Remove from favorites
  const removeFromFavorites = (serviceId: string | number) => {
    const idStr = String(serviceId);
    const newFavorites = favorites.filter(id => id !== idStr);
    setFavorites(newFavorites);
    updateFavoritesMutation.mutate(newFavorites);
    
    toast({
      title: t.success,
      description: t.removeFromFavorites,
    });
  };
  
  // Aliases for backwards compatibility
  const addFavorite = addToFavorites;
  const removeFavorite = removeFromFavorites;

  // Check if service is favorite
  const isFavorite = (serviceId: string | number) => {
    return favorites.includes(String(serviceId));
  };

  // Apply user settings from server when available - disabled due to type issues
  // Settings are handled via localStorage for now

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        language,
        setLanguage: handleSetLanguage,
        t,
        favorites,
        addToFavorites,
        removeFromFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}