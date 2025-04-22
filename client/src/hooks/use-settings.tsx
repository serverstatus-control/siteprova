import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type Language = "en" | "it" | "es" | "fr" | "de" | "zh" | "ja" | "pt" | "ru";

// Oggetto che contiene le traduzioni per ogni lingua
export const translations = {
  en: {
    settings: "Settings",
    settingsDescription: "Customize your experience by changing theme and language",
    theme: "Theme",
    language: "Language",
    system: "System",
    light: "Light",
    dark: "Dark",
    favorites: "Favorites",
    noFavorites: "No favorites added",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    english: "English",
    italian: "Italian",
    spanish: "Spanish",
    french: "French",
    german: "German",
    chinese: "Chinese",
    japanese: "Japanese",
    portuguese: "Portuguese",
    russian: "Russian",
    close: "Close",
    login: "Login",
    logout: "Logout",
    admin: "Admin",
    search: "Search services...",
    serverStatus: "SERVER STATUS",
    selectTheme: "Select theme",
    selectLanguage: "Select language",
    operational: "Operational",
    degraded: "Degraded performance",
    down: "Down",
    lastUpdated: "Last updated",
    dashboard: "Dashboard",
    dashboardDescription: "Check the status of services in real time and get instant updates.",
    checkingNow: "Checking...",
    checkNow: "Check Now",
  },
  it: {
    settings: "Impostazioni",
    settingsDescription: "Personalizza la tua esperienza cambiando tema e lingua",
    theme: "Tema",
    language: "Lingua",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",
    favorites: "Preferiti",
    noFavorites: "Nessun preferito aggiunto",
    addToFavorites: "Aggiungi ai preferiti",
    removeFromFavorites: "Rimuovi dai preferiti",
    english: "Inglese",
    italian: "Italiano",
    spanish: "Spagnolo",
    french: "Francese",
    german: "Tedesco",
    chinese: "Cinese",
    japanese: "Giapponese",
    portuguese: "Portoghese",
    russian: "Russo",
    close: "Chiudi",
    login: "Accedi",
    logout: "Esci",
    admin: "Amministratore",
    search: "Cerca servizi...",
    serverStatus: "STATO DEI SERVER",
    selectTheme: "Seleziona tema",
    selectLanguage: "Seleziona lingua",
    operational: "Operativo",
    degraded: "Prestazioni degradate",
    down: "Non disponibile",
    lastUpdated: "Ultimo aggiornamento",
    dashboard: "Dashboard",
    dashboardDescription: "Controlla lo stato dei servizi in tempo reale e ricevi aggiornamenti immediati.",
    checkingNow: "Controllo in corso...",
    checkNow: "Controlla ora",
  },
  es: {
    settings: "Configuración",
    theme: "Tema",
    language: "Idioma",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    favorites: "Favoritos",
    noFavorites: "No hay favoritos añadidos",
    addToFavorites: "Añadir a favoritos",
    removeFromFavorites: "Eliminar de favoritos",
    english: "Inglés",
    italian: "Italiano",
    spanish: "Español",
    french: "Francés",
    german: "Alemán",
    chinese: "Chino",
    japanese: "Japonés",
    portuguese: "Portugués",
    russian: "Ruso",
    close: "Cerrar",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    admin: "Administrador",
    search: "Buscar servicios...",
    serverStatus: "ESTADO DEL SERVIDOR",
  },
  fr: {
    settings: "Paramètres",
    settingsDescription: "Personnalisez votre expérience en changeant de thème et de langue",
    theme: "Thème",
    language: "Langue",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
    favorites: "Favoris",
    noFavorites: "Aucun favori ajouté",
    addToFavorites: "Ajouter aux favoris",
    removeFromFavorites: "Retirer des favoris",
    english: "Anglais",
    italian: "Italien",
    spanish: "Espagnol",
    french: "Français",
    german: "Allemand",
    chinese: "Chinois",
    japanese: "Japonais",
    portuguese: "Portugais",
    russian: "Russe",
    close: "Fermer",
    login: "Connexion",
    logout: "Déconnexion",
    admin: "Admin",
    search: "Rechercher des services...",
    serverStatus: "ÉTAT DU SERVEUR",
    selectTheme: "Sélectionner un thème",
    selectLanguage: "Sélectionner une langue",
    operational: "Opérationnel",
    degraded: "Performances dégradées",
    down: "Indisponible",
    lastUpdated: "Dernière mise à jour",
  },
  de: {
    settings: "Einstellungen",
    theme: "Thema",
    language: "Sprache",
    system: "System",
    light: "Hell",
    dark: "Dunkel",
    favorites: "Favoriten",
    noFavorites: "Keine Favoriten hinzugefügt",
    addToFavorites: "Zu Favoriten hinzufügen",
    removeFromFavorites: "Aus Favoriten entfernen",
    english: "Englisch",
    italian: "Italienisch",
    spanish: "Spanisch",
    french: "Französisch",
    german: "Deutsch",
    chinese: "Chinesisch",
    japanese: "Japanisch",
    portuguese: "Portugiesisch",
    russian: "Russisch",
    close: "Schließen",
    login: "Anmelden",
    logout: "Abmelden",
    admin: "Administrator",
    search: "Dienste suchen...",
    serverStatus: "SERVER-STATUS",
  },
  zh: {
    settings: "设置",
    theme: "主题",
    language: "语言",
    system: "系统",
    light: "明亮",
    dark: "暗黑",
    favorites: "收藏夹",
    noFavorites: "未添加收藏",
    addToFavorites: "添加到收藏夹",
    removeFromFavorites: "从收藏夹中移除",
    english: "英语",
    italian: "意大利语",
    spanish: "西班牙语",
    french: "法语",
    german: "德语",
    chinese: "中文",
    japanese: "日语",
    portuguese: "葡萄牙语",
    russian: "俄语",
    close: "关闭",
    login: "登录",
    logout: "登出",
    admin: "管理员",
    search: "搜索服务...",
    serverStatus: "服务器状态",
  },
  ja: {
    settings: "設定",
    theme: "テーマ",
    language: "言語",
    system: "システム",
    light: "ライト",
    dark: "ダーク",
    favorites: "お気に入り",
    noFavorites: "お気に入りがありません",
    addToFavorites: "お気に入りに追加",
    removeFromFavorites: "お気に入りから削除",
    english: "英語",
    italian: "イタリア語",
    spanish: "スペイン語",
    french: "フランス語",
    german: "ドイツ語",
    chinese: "中国語",
    japanese: "日本語",
    portuguese: "ポルトガル語",
    russian: "ロシア語",
    close: "閉じる",
    login: "ログイン",
    logout: "ログアウト",
    admin: "管理者",
    search: "サービスを検索...",
    serverStatus: "サーバーステータス",
  },
  pt: {
    settings: "Configurações",
    theme: "Tema",
    language: "Idioma",
    system: "Sistema",
    light: "Claro",
    dark: "Escuro",
    favorites: "Favoritos",
    noFavorites: "Nenhum favorito adicionado",
    addToFavorites: "Adicionar aos favoritos",
    removeFromFavorites: "Remover dos favoritos",
    english: "Inglês",
    italian: "Italiano",
    spanish: "Espanhol",
    french: "Francês",
    german: "Alemão",
    chinese: "Chinês",
    japanese: "Japonês",
    portuguese: "Português",
    russian: "Russo",
    close: "Fechar",
    login: "Entrar",
    logout: "Sair",
    admin: "Administrador",
    search: "Buscar serviços...",
    serverStatus: "STATUS DO SERVIDOR",
  },
  ru: {
    settings: "Настройки",
    theme: "Тема",
    language: "Язык",
    system: "Система",
    light: "Светлая",
    dark: "Темная",
    favorites: "Избранное",
    noFavorites: "Нет добавленных в избранное",
    addFavorite: "Добавить в избранное",
    removeFavorite: "Удалить из избранного",
    english: "Английский",
    italian: "Итальянский",
    spanish: "Испанский",
    french: "Французский",
    german: "Немецкий",
    chinese: "Китайский",
    japanese: "Японский",
    portuguese: "Португальский",
    russian: "Русский",
    close: "Закрыть",
    login: "Войти",
    logout: "Выйти",
    admin: "Администратор",
    search: "Поиск сервисов...",
    serverStatus: "СТАТУС СЕРВЕРА",
  }
};

// Tipo per la traduzione
export type Translation = typeof translations.en;

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  favorites: number[];
  addFavorite: (serviceId: number) => void;
  removeFavorite: (serviceId: number) => void;
  isFavorite: (serviceId: number) => boolean;
  t: Translation;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Carica i valori salvati da localStorage o usa i default
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "system";
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "en";
  });
  
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Gestisce il cambiamento del tema
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    // Applica il tema al documento
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      
      // Aggiungi listener per cambiamenti di tema del sistema
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Gestisce il cambiamento della lingua
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Gestisce il cambiamento dei preferiti
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funzioni per gestire l'impostazione del tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Funzione per impostare la lingua
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Funzioni per gestire i servizi preferiti
  const addFavorite = (serviceId: number) => {
    if (!favorites.includes(serviceId)) {
      setFavorites([...favorites, serviceId]);
    }
  };

  const removeFavorite = (serviceId: number) => {
    setFavorites(favorites.filter(id => id !== serviceId));
  };

  const isFavorite = (serviceId: number): boolean => {
    return favorites.includes(serviceId);
  };

  // Ottiene le traduzioni correnti
  const t = translations[language];

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        t
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}