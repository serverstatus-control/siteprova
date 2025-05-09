import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';
import { it, enUS, es, fr, de, pt, ru, zhCN, ja, Locale } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mappa delle lingue ai locali di date-fns
export const localeMap: Record<string, Locale> = {
  it,
  en: enUS,
  es,
  fr,
  de,
  pt,
  ru,
  zh: zhCN,
  ja
};

// Formatta una data nel formato "tempo fa" con il locale corretto
export function formatTimeAgo(date: Date | string | number, language: string = 'it'): string {
  const locale = localeMap[language] || localeMap.it;
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Gestione speciale per l'italiano
  if (language === 'it') {
    if (diffInSeconds < 5) return 'proprio ora';
    if (diffInSeconds < 60) return `${diffInSeconds} secondi fa`;
    if (diffInSeconds < 120) return 'un minuto fa';
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minuti fa`;
    }
    if (diffInSeconds < 7200) return 'un\'ora fa';
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ore fa`;
    }

    // Per periodi più lunghi, usa il formato giornaliero
    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale
    })
    .replace('circa', '')
    .replace('meno di un minuto fa', 'poco fa')
    .replace('un giorno fa', '1 giorno fa')
    .replace('un mese fa', '1 mese fa')
    .replace('un anno fa', '1 anno fa')
    .trim();
  }

  // Per altre lingue usa il comportamento predefinito
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale
  });
}

// Traduzioni base (italiano)
const translations: Record<string, string> = {
  'showAllCategory': 'Mostra tutti i servizi {{category}} ({{count}})',
  'showLessCategory': 'Mostra meno servizi',
  'infoAndContacts': 'Info & Contatti',
  'expand': 'Espandi',
  'collapse': 'Comprimi',
};

// Funzione di traduzione semplice
export function t(key: string, vars?: Record<string, string | number>) {
  let str = translations[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{{${k}}}`, String(v));
    });
  }
  return str;
}
