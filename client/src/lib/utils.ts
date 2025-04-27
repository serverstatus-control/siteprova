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
  const formatted = formatDistanceToNow(dateObj, { 
    addSuffix: true,
    locale 
  });

  if (language === 'it') {
    // Migliora la formattazione italiana
    return formatted
      .replace('circa', '')
      .replace('meno di un minuto fa', 'poco fa')
      .replace('un minuto fa', '1 minuto fa')
      .replace('un giorno fa', '1 giorno fa')
      .replace('un mese fa', '1 mese fa')
      .replace('un anno fa', '1 anno fa')
      .trim();
  }
  return formatted;
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
