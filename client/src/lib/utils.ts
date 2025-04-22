import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
