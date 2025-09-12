// Oggetto traduzioni per tutte le lingue supportate
export type Translation = {
  // Base translations
  settings: string;
  settingsDescription: string;
  theme: string;
  language: string;
  system: string;
  light: string;
  dark: string;
  favorites: string;
  noFavorites: string;
  addToFavorites: string;
  removeFromFavorites: string;
  english: string;
  italian: string;
  spanish: string;
  french: string;
  german: string;
  chinese: string;
  japanese: string;
  portuguese: string;
  russian: string;
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
  viewDetails: string;
  backToDashboard: string;
  
  // Category translations
  music: string;

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
    theme: 'Theme',
    language: 'Language',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    favorites: 'Favorites',
    noFavorites: 'No favorites',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    english: 'English',
    italian: 'Italian',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    chinese: 'Chinese',
    japanese: 'Japanese',
    portuguese: 'Portuguese',
    russian: 'Russian',
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
    viewDetails: 'View details',
    backToDashboard: 'Back to Dashboard',

    // Category translations
    music: 'Music',
    
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
        title: 'Liability',
        content: 'We are not liable for any direct or indirect damages arising from the use or inability to use the service.'
      },
      section4: {
        title: 'Changes to Terms',
        content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the site.'
      }
    },
    privacyContent: {
      intro: 'Your privacy is important to us. This policy explains how we collect and use your data:',
      section1: {
        title: 'Data Collection',
        content: 'We only collect essential data necessary for service operation, such as login information and user preferences.'
      },
      section2: {
        title: 'Data Usage',
        content: 'Collected data is used exclusively to provide and improve the service. We do not sell or share your data with third parties.'
      },
      section3: {
        title: 'Cookies',
        content: 'We use essential cookies to maintain your login and preferences. You can manage cookies through your browser settings.'
      },
      section4: {
        title: 'Security',
        content: 'We employ industry-standard security measures to protect your data from unauthorized access.'
      }
    }
  },
  it: {
    // Base translations
    settings: 'Impostazioni',
    settingsDescription: 'Gestisci le tue preferenze',
    theme: 'Tema',
    language: 'Lingua',
    system: 'Sistema',
    light: 'Chiaro',
    dark: 'Scuro',
    favorites: 'Preferiti',
    noFavorites: 'Nessun preferito',
    addToFavorites: 'Aggiungi ai preferiti',
    removeFromFavorites: 'Rimuovi dai preferiti',
    english: 'Inglese',
    italian: 'Italiano',
    spanish: 'Spagnolo',
    french: 'Francese',
    german: 'Tedesco',
    chinese: 'Cinese',
    japanese: 'Giapponese',
    portuguese: 'Portoghese',
    russian: 'Russo',
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
    dashboardDescription: 'Panoramica dei servizi',
    checkingNow: 'Controllo in corso...',
    checkNow: 'Controlla ora',
    unknown: 'Sconosciuto',
    error: 'Errore',
    lastCheck: 'Ultimo controllo',
    responseTime: 'Tempo di risposta',
    viewDetails: 'Visualizza dettagli',
    backToDashboard: 'Torna alla Dashboard',

    // Category translations
    music: 'Musica',
    
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
      welcome: 'Benvenuto in Server Status. Utilizzando questo servizio, accetti i seguenti termini e condizioni:',
      section1: {
        title: 'Accettazione dei Termini',
        content: 'Utilizzando Server Status, l\'utente accetta di essere vincolato da questi termini di servizio. Se non si accettano questi termini, si prega di non utilizzare il servizio.'
      },
      section2: {
        title: 'Descrizione del Servizio',
        content: 'Server Status fornisce un monitoraggio in tempo reale dello stato dei servizi. Il servizio è fornito "così com\'è" e potrebbe essere soggetto a modifiche o interruzioni.'
      },
      section3: {
        title: 'Responsabilità',
        content: 'Non siamo responsabili per eventuali danni diretti o indiretti derivanti dall\'utilizzo o dall\'impossibilità di utilizzare il servizio.'
      },
      section4: {
        title: 'Modifiche ai Termini',
        content: 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive immediatamente dopo la pubblicazione sul sito.'
      }
    },
    privacyContent: {
      intro: 'La tua privacy è importante per noi. Questa informativa spiega come raccogliamo e utilizziamo i tuoi dati:',
      section1: {
        title: 'Raccolta dei Dati',
        content: 'Raccogliamo solo i dati essenziali necessari per il funzionamento del servizio, come informazioni di login e preferenze dell\'utente.'
      },
      section2: {
        title: 'Utilizzo dei Dati',
        content: 'I dati raccolti vengono utilizzati esclusivamente per fornire e migliorare il servizio. Non vendiamo né condividiamo i tuoi dati con terze parti.'
      },
      section3: {
        title: 'Cookie',
        content: 'Utilizziamo cookie essenziali per mantenere il tuo login e le tue preferenze. Puoi gestire i cookie dalle impostazioni del tuo browser.'
      },
      section4: {
        title: 'Sicurezza',
        content: 'Adottiamo misure di sicurezza standard del settore per proteggere i tuoi dati da accessi non autorizzati.'
      }
    }
  },
  ru: {
    // Base translations
    settings: 'Настройки',
    settingsDescription: 'Настройте внешний вид, изменив тему и язык',
    theme: 'Тема',
    language: 'Язык',
    system: 'Система',
    light: 'Светлая',
    dark: 'Темная',
    favorites: 'Избранное',
    noFavorites: 'Нет добавленных в избранное',
    addToFavorites: 'Добавить в избранное',
    removeFromFavorites: 'Удалить из избранного',
    english: 'Английский',
    italian: 'Итальянский',
    spanish: 'Испанский',
    french: 'Французский',
    german: 'Немецкий',
    chinese: 'Китайский',
    japanese: 'Японский',
    portuguese: 'Португальский',
    russian: 'Русский',
    close: 'Закрыть',
    register: 'Регистрация',
    login: 'Войти',
    logout: 'Выйти',
    admin: 'Администратор',
    search: 'Поиск',
    serverStatus: 'Статус Сервера',
    selectTheme: 'Выберите тему',
    selectLanguage: 'Выберите язык',
    operational: 'Работает',
    degraded: 'Ухудшенная работа',
    down: 'Не работает',
    lastUpdated: 'Последнее обновление',
    dashboard: 'Панель управления',
    dashboardDescription: 'Обзор сервисов',
    checkingNow: 'Проверка...',
    checkNow: 'Проверить сейчас',
    unknown: 'Неизвестно',
    error: 'Ошибка',
    lastCheck: 'Последняя проверка',
    responseTime: 'Время отклика',
    viewDetails: 'Подробнее',
    backToDashboard: 'Вернуться на панель',
    
    // Category translations
    music: 'Музыка',
    
    // Interface translations
    showAllCategory: 'Показать все сервисы {{category}} ({{count}})',
    showLessCategory: 'Показать меньше сервисов',
    infoAndContacts: 'Информация и контакты',
    expand: 'Развернуть',
    collapse: 'Свернуть',
    
    // Terms and Privacy
    terms: 'Условия',
    privacy: 'Конфиденциальность',
    termsTitle: 'Условия использования',
    privacyTitle: 'Политика конфиденциальности',
    termsContent: {
      welcome: 'Добро пожаловать в Server Status. Используя этот сервис, вы соглашаетесь со следующими условиями:',
      section1: {
        title: 'Принятие условий',
        content: 'Используя Server Status, вы соглашаетесь с этими условиями использования. Если вы не принимаете эти условия, пожалуйста, не используйте сервис.'
      },
      section2: {
        title: 'Описание сервиса',
        content: 'Server Status предоставляет мониторинг состояния сервисов в реальном времени. Сервис предоставляется \'как есть\' и может изменяться или прерываться.'
      },
      section3: {
        title: 'Ответственность',
        content: 'Мы стремимся предоставлять точную информацию, но не несем ответственности за любые решения, принятые на основе этой информации.'
      },
      section4: {
        title: 'Изменения',
        content: 'Мы оставляем за собой право изменять эти условия в любое время. Продолжая использовать сервис после изменений, вы принимаете обновленные условия.'
      }
    },
    privacyContent: {
      intro: 'Ваша конфиденциальность важна для нас. Эта политика объясняет, как мы собираем и используем ваши данные:',
      section1: {
        title: 'Сбор данных',
        content: 'Мы собираем только необходимые данные для работы сервиса, такие как информация для входа и предпочтения пользователя.'
      },
      section2: {
        title: 'Использование данных',
        content: 'Собранные данные используются исключительно для предоставления и улучшения сервиса. Мы не продаем и не передаем ваши данные третьим лицам.'
      },
      section3: {
        title: 'Файлы cookie',
        content: 'Мы используем необходимые cookie для сохранения вашего входа и предпочтений. Вы можете управлять cookie через настройки браузера.'
      },
      section4: {
        title: 'Безопасность',
        content: 'Мы применяем стандартные отраслевые меры безопасности для защиты ваших данных от несанкционированного доступа.'
      }
    }
  }
};