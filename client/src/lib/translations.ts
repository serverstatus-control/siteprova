// Oggetto traduzioni per tutte le lingue supportate
export type Translation = {
  // Base translations
  settings: string;
  settingsDescription: string;
  updates: string;
  appName: string;
  version: string;
  theme: string;
  language: string;
  system: string;
  light: string;
  dark: string;
  favorites: string;
  noFavorites: string;
  addToFavorites: string;
  removeFromFavorites: string;
  
  // Languages
  english: string;
  italian: string;
  spanish: string;
  french: string;
  german: string;
  chinese: string;
  japanese: string;
  portuguese: string;
  russian: string;
  
  // Category translations
  games: string;
  streaming: string;
  banking: string;
  shopping: string;
  social: string;
  mail: string;
  various: string;
  connection: string;
  browserai: string;
  music: string;
  gaming: string;
  productivity: string;
  education: string;
  technology: string;
  entertainment: string;
  financial: string;
  orderBy: string;
  
  // UI Elements
  close: string;
  register: string;
  login: string;
  logout: string;
  admin: string;
  search: string;
  serverStatus: string;
  selectTheme: string;
  selectLanguage: string;
  operational: string;
  degraded: string;
  down: string;
  lastUpdated: string;
  dashboard: string;
  dashboardDescription: string;
  checkingNow: string;
  checkNow: string;
  unknown: string;
  error: string;
  lastCheck: string;
  responseTime: string;
  overview: string;
  viewDetails: string;
  backToDashboard: string;
  siteUpdates: string;
  footerText: string;
  currentStatus: string;
  categories: string;
  uptime30d: string;
  lastOutage: string;
  avgResponse: string;
  uptimeHistory: string;
  recentIncidents: string;
  noHistoryAvailable: string;
  noIncidentsReported: string;
  noRecentOutages: string;
  overall: string;
  partialOutage: string;
  searchServices: string;
  links: string;
  viewFullHistory: string;
  subscribeToUpdates: string;
  serviceDetails: string;
  success: string;
  loggingOut: string;
  loggingIn: string;
  creatingAccount: string;
  loginDescription: string;
  
  // Interface translations
  showAllCategory: string;
  showLessCategory: string;
  infoAndContacts: string;
  expand: string;
  collapse: string;
  
  // Terms and Privacy
  terms: string;
  privacy: string;
  termsTitle: string;
  privacyTitle: string;
  termsContent: {
    welcome: string;
    section1: {
      title: string;
      content: string;
    };
    section2: {
      title: string;
      content: string;
    };
    section3: {
      title: string;
      content: string;
    };
    section4: {
      title: string;
      content: string;
    };
  };
  privacyContent: {
    intro: string;
    section1: {
      title: string;
      content: string;
    };
    section2: {
      title: string;
      content: string;
    };
    section3: {
      title: string;
      content: string;
    };
    section4: {
      title: string;
      content: string;
    };
  };
};

export const translations: Record<string, Translation> = {
  en: {
    // Base translations
    settings: 'Settings',
    settingsDescription: 'Manage your preferences',
    updates: 'Updates',
    appName: 'Server Status',
    version: 'v:',
    theme: 'Theme',
    language: 'Language',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    favorites: 'Favorites',
    noFavorites: 'No favorites',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    
    // Languages
    english: 'English',
    italian: 'Italian',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    chinese: 'Chinese',
    japanese: 'Japanese',
    portuguese: 'Portuguese',
    russian: 'Russian',
    
    // Category translations
    games: 'Games',
    streaming: 'Streaming',
    banking: 'Banking',
    shopping: 'Shopping',
    social: 'Social',
    music: 'Music',
    mail: 'Mail',
    various: 'Various',
    connection: 'Connection',
    browserai: 'Browser AI',
    gaming: 'Gaming',
    productivity: 'Productivity',
    education: 'Education',
    technology: 'Technology',
    entertainment: 'Entertainment',
    financial: 'Financial',
    orderBy: 'Order by',
    
    // UI Elements
    close: 'Close',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin',
    search: 'Search',
    serverStatus: 'Server Status',
    selectTheme: 'Select theme',
    selectLanguage: 'Select language',
    operational: 'Operational',
    degraded: 'Degraded',
    down: 'Down',
    lastUpdated: 'Last updated',
    dashboard: 'Dashboard',
    dashboardDescription: 'Services overview',
    checkingNow: 'Checking...',
    checkNow: 'Check now',
    unknown: 'Unknown',
    error: 'Error',
    lastCheck: 'Last check',
    responseTime: 'Response time',
    overview: 'Overview',
    viewDetails: 'View details',
    backToDashboard: 'Back to Dashboard',
    siteUpdates: 'Site Updates',
    footerText: 'Made with ❤️',
    currentStatus: 'Current Status',
    categories: 'Categories',
    uptime30d: '30-day Uptime',
    lastOutage: 'Last Outage',
    avgResponse: 'Average Response',
    uptimeHistory: 'Uptime History',
    recentIncidents: 'Recent Incidents',
    noHistoryAvailable: 'No history available',
    noIncidentsReported: 'No incidents reported',
    noRecentOutages: 'No recent outages',
    overall: 'Overall',
    partialOutage: 'Partial Outage',
    searchServices: 'Search services',
    links: 'Links',
    viewFullHistory: 'View Full History',
    subscribeToUpdates: 'Subscribe to Updates',
    serviceDetails: 'Service Details',
    success: 'Success',
    loggingOut: 'Logging out...',
    loggingIn: 'Logging in...',
    creatingAccount: 'Creating account...',
    loginDescription: 'Login to manage services',
    
    // Interface translations
    showAllCategory: 'Show all {{category}} services ({{count}})',
    showLessCategory: 'Show less services',
    infoAndContacts: 'Info & Contacts',
    expand: 'Expand',
    collapse: 'Collapse',
    
    // Terms and Privacy
    terms: 'Terms',
    privacy: 'Privacy',
    termsTitle: 'Terms of Service',
    privacyTitle: 'Privacy Policy',
    termsContent: {
      welcome: 'Welcome to Server Status. By using this service, you agree to the following terms and conditions:',
      section1: {
        title: 'Acceptance of Terms',
        content: 'By using Server Status, you agree to be bound by these terms of service. If you do not accept these terms, please do not use the service.'
      },
      section2: {
        title: 'Service Description',
        content: 'Server Status provides real-time monitoring of service status. The service is provided "as is" and may be subject to changes or interruptions.'
      },
      section3: {
        title: 'User Responsibilities',
        content: 'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.'
      },
      section4: {
        title: 'Changes to Terms',
        content: 'We reserve the right to modify these terms at any time. Users will be notified of any changes.'
      }
    },
    privacyContent: {
      intro: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
      section1: {
        title: 'Information Collection',
        content: 'We collect information necessary for providing our service, including but not limited to email addresses and usage data.'
      },
      section2: {
        title: 'Use of Information',
        content: 'We use collected information to provide and improve our services, communicate with users, and ensure security.'
      },
      section3: {
        title: 'Data Protection',
        content: 'We implement appropriate security measures to protect your information from unauthorized access or disclosure.'
      },
      section4: {
        title: 'Your Rights',
        content: 'You have the right to access, correct, or delete your personal information at any time.'
      }
    }
  },
  it: {
    // Base translations
    settings: 'Impostazioni',
    settingsDescription: 'Gestisci le tue preferenze',
    updates: 'Aggiornamenti',
    appName: 'Stato Server',
    version: 'v:',
    theme: 'Tema',
    language: 'Lingua',
    system: 'Sistema',
    light: 'Chiaro',
    dark: 'Scuro',
    favorites: 'Preferiti',
    noFavorites: 'Nessun preferito',
    addToFavorites: 'Aggiungi ai preferiti',
    removeFromFavorites: 'Rimuovi dai preferiti',
    
    // Languages
    english: 'Inglese',
    italian: 'Italiano',
    spanish: 'Spagnolo',
    french: 'Francese',
    german: 'Tedesco',
    chinese: 'Cinese',
    japanese: 'Giapponese',
    portuguese: 'Portoghese',
    russian: 'Russo',
    
    // Category translations
    games: 'Giochi',
    streaming: 'Streaming',
    banking: 'Banca',
    shopping: 'Shopping',
    social: 'Social',
    music: 'Musica',
    mail: 'Posta',
    various: 'Vari',
    connection: 'Connessione',
    browserai: 'Browser AI',
    gaming: 'Giochi',
    productivity: 'Produttività',
    education: 'Educazione',
    technology: 'Tecnologia',
    entertainment: 'Intrattenimento',
    financial: 'Finanza',
    orderBy: 'Ordina per',
    
    // UI Elements
    close: 'Chiudi',
    register: 'Registrati',
    login: 'Accedi',
    logout: 'Esci',
    admin: 'Admin',
    search: 'Cerca',
    serverStatus: 'Stato Server',
    selectTheme: 'Seleziona tema',
    selectLanguage: 'Seleziona lingua',
    operational: 'Operativo',
    degraded: 'Degradato',
    down: 'Non disponibile',
    lastUpdated: 'Ultimo aggiornamento',
    dashboard: 'Dashboard',
    dashboardDescription: 'Panoramica servizi',
    checkingNow: 'Controllo in corso...',
    checkNow: 'Controlla ora',
    unknown: 'Sconosciuto',
    error: 'Errore',
    lastCheck: 'Ultimo controllo',
    responseTime: 'Tempo di risposta',
    overview: 'Panoramica',
    viewDetails: 'Vedi dettagli',
    backToDashboard: 'Torna alla Dashboard',
    siteUpdates: 'Aggiornamenti Sito',
    footerText: 'Fatto con ❤️',
    currentStatus: 'Stato Attuale',
    categories: 'Categorie',
    uptime30d: 'Uptime 30 giorni',
    lastOutage: 'Ultimo Disservizio',
    avgResponse: 'Risposta Media',
    uptimeHistory: 'Storico Uptime',
    recentIncidents: 'Incidenti Recenti',
    noHistoryAvailable: 'Nessuna cronologia disponibile',
    noIncidentsReported: 'Nessun incidente segnalato',
    noRecentOutages: 'Nessun disservizio recente',
    overall: 'Generale',
    partialOutage: 'Disservizio Parziale',
    searchServices: 'Cerca servizi',
    links: 'Collegamenti',
    viewFullHistory: 'Vedi Cronologia Completa',
    subscribeToUpdates: 'Iscriviti agli Aggiornamenti',
    serviceDetails: 'Dettagli Servizio',
    success: 'Successo',
    loggingOut: 'Disconnessione in corso...',
    loggingIn: 'Accesso in corso...',
    creatingAccount: 'Creazione account in corso...',
    loginDescription: 'Accedi per gestire i servizi',
    
    // Interface translations
    showAllCategory: 'Mostra tutti i servizi {{category}} ({{count}})',
    showLessCategory: 'Mostra meno servizi',
    infoAndContacts: 'Info & Contatti',
    expand: 'Espandi',
    collapse: 'Comprimi',
    
    // Terms and Privacy
    terms: 'Termini',
    privacy: 'Privacy',
    termsTitle: 'Termini di Servizio',
    privacyTitle: 'Informativa sulla Privacy',
    termsContent: {
      welcome: 'Benvenuto su Server Status. Utilizzando questo servizio, accetti i seguenti termini e condizioni:',
      section1: {
        title: 'Accettazione dei Termini',
        content: 'Utilizzando Server Status, accetti di essere vincolato da questi termini di servizio. Se non accetti questi termini, non utilizzare il servizio.'
      },
      section2: {
        title: 'Descrizione del Servizio',
        content: 'Server Status fornisce il monitoraggio in tempo reale dello stato dei servizi. Il servizio è fornito "così com\'è" e può essere soggetto a modifiche o interruzioni.'
      },
      section3: {
        title: 'Responsabilità degli Utenti',
        content: 'Gli utenti sono responsabili di mantenere la riservatezza delle informazioni del proprio account e di tutte le attività che si verificano sotto il loro account.'
      },
      section4: {
        title: 'Modifiche ai Termini',
        content: 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Gli utenti saranno informati di eventuali modifiche.'
      }
    },
    privacyContent: {
      intro: 'La tua privacy è importante per noi. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali.',
      section1: {
        title: 'Raccolta delle Informazioni',
        content: 'Raccogliamo le informazioni necessarie per fornire il nostro servizio, inclusi ma non limitati a indirizzi email e dati di utilizzo.'
      },
      section2: {
        title: 'Utilizzo delle Informazioni',
        content: 'Utilizziamo le informazioni raccolte per fornire e migliorare i nostri servizi, comunicare con gli utenti e garantire la sicurezza.'
      },
      section3: {
        title: 'Protezione dei Dati',
        content: 'Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni da accessi o divulgazioni non autorizzati.'
      },
      section4: {
        title: 'I Tuoi Diritti',
        content: 'Hai il diritto di accedere, correggere o eliminare le tue informazioni personali in qualsiasi momento.'
      }
    }
  }
  // ... Aggiungi altre traduzioni per es, fr, de, zh, ja, pt, ru
};
