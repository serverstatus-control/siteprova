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
    checkingNow: 'Checking now...',
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
    showLessCategory: 'Show fewer services',
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
  es: {
    // Terms and Privacy
    terms: 'Términos',
    privacy: 'Privacidad',
    termsTitle: 'Términos de Servicio',
    privacyTitle: 'Política de Privacidad',
    termsContent: {
      welcome: 'Bienvenido a Server Status. Al usar este servicio, aceptas los siguientes términos y condiciones:',
      section1: {
        title: 'Aceptación de Términos',
        content: 'Al utilizar Server Status, aceptas estar sujeto a estos términos de servicio. Si no aceptas estos términos, por favor no uses el servicio.'
      },
      section2: {
        title: 'Descripción del Servicio',
        content: 'Server Status proporciona monitoreo en tiempo real del estado de los servicios. El servicio se proporciona "tal cual" y puede estar sujeto a cambios o interrupciones.'
      },
      section3: {
        title: 'Responsabilidad',
        content: 'No somos responsables por daños directos o indirectos que surjan del uso o la imposibilidad de usar el servicio.'
      },
      section4: {
        title: 'Cambios en los Términos',
        content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio.'
      }
    },
    privacyContent: {
      intro: 'Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos y usamos tus datos:',
      section1: {
        title: 'Recopilación de Datos',
        content: 'Solo recopilamos datos esenciales necesarios para el funcionamiento del servicio, como información de inicio de sesión y preferencias del usuario.'
      },
      section2: {
        title: 'Uso de Datos',
        content: 'Los datos recopilados se utilizan exclusivamente para proporcionar y mejorar el servicio. No vendemos ni compartimos tus datos con terceros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Utilizamos cookies esenciales para mantener tu inicio de sesión y preferencias. Puedes gestionar las cookies a través de la configuración de tu navegador.'
      },
      section4: {
        title: 'Seguridad',
        content: 'Empleamos medidas de seguridad estándar de la industria para proteger tus datos contra accesos no autorizados.'
      }
    }
  },
  fr: {
    // Terms and Privacy
    terms: 'Conditions',
    privacy: 'Confidentialité',
    termsTitle: 'Conditions d\'Utilisation',
    privacyTitle: 'Politique de Confidentialité',
    termsContent: {
      welcome: 'Bienvenue sur Server Status. En utilisant ce service, vous acceptez les conditions suivantes :',
      section1: {
        title: 'Acceptation des Conditions',
        content: 'En utilisant Server Status, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.'
      },
      section2: {
        title: 'Description du Service',
        content: 'Server Status fournit une surveillance en temps réel de l\'état des services. Le service est fourni "tel quel" et peut être sujet à des modifications ou interruptions.'
      },
      section3: {
        title: 'Responsabilité',
        content: 'Nous ne sommes pas responsables des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service.'
      },
      section4: {
        title: 'Modifications des Conditions',
        content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après publication sur le site.'
      }
    },
    privacyContent: {
      intro: 'Votre confidentialité est importante pour nous. Cette politique explique comment nous collectons et utilisons vos données :',
      section1: {
        title: 'Collecte des Données',
        content: 'Nous collectons uniquement les données essentielles nécessaires au fonctionnement du service, telles que les informations de connexion et les préférences utilisateur.'
      },
      section2: {
        title: 'Utilisation des Données',
        content: 'Les données collectées sont utilisées exclusivement pour fournir et améliorer le service. Nous ne vendons ni ne partageons vos données avec des tiers.'
      },
      section3: {
        title: 'Cookies',
        content: 'Nous utilisons des cookies essentiels pour maintenir votre connexion et vos préférences. Vous pouvez gérer les cookies via les paramètres de votre navigateur.'
      },
      section4: {
        title: 'Sécurité',
        content: 'Nous employons des mesures de sécurité standards de l\'industrie pour protéger vos données contre les accès non autorisés.'
      }
    }
  },
  de: {
    // Terms and Privacy
    terms: 'Bedingungen',
    privacy: 'Datenschutz',
    termsTitle: 'Nutzungsbedingungen',
    privacyTitle: 'Datenschutzerklärung',
    termsContent: {
      welcome: 'Willkommen bei Server Status. Mit der Nutzung dieses Dienstes stimmen Sie den folgenden Bedingungen zu:',
      section1: {
        title: 'Annahme der Bedingungen',
        content: 'Mit der Nutzung von Server Status erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie den Dienst bitte nicht.'
      },
      section2: {
        title: 'Beschreibung des Dienstes',
        content: 'Server Status bietet Echtzeit-Überwachung des Servicestatus. Der Dienst wird "wie besehen" bereitgestellt und kann Änderungen oder Unterbrechungen unterliegen.'
      },
      section3: {
        title: 'Haftung',
        content: 'Wir haften nicht für direkte oder indirekte Schäden, die sich aus der Nutzung oder Unmöglichkeit der Nutzung des Dienstes ergeben.'
      },
      section4: {
        title: 'Änderungen der Bedingungen',
        content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen treten sofort nach der Veröffentlichung auf der Website in Kraft.'
      }
    },
    privacyContent: {
      intro: 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erklärt, wie wir Ihre Daten erfassen und verwenden:',
      section1: {
        title: 'Datenerfassung',
        content: 'Wir erfassen nur die für den Betrieb des Dienstes erforderlichen Daten, wie Anmeldeinformationen und Benutzereinstellungen.'
      },
      section2: {
        title: 'Datennutzung',
        content: 'Die erfassten Daten werden ausschließlich zur Bereitstellung und Verbesserung des Dienstes verwendet. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten.'
      },
      section3: {
        title: 'Cookies',
        content: 'Wir verwenden essentielle Cookies, um Ihre Anmeldung und Einstellungen zu speichern. Sie können Cookies über Ihre Browsereinstellungen verwalten.'
      },
      section4: {
        title: 'Sicherheit',
        content: 'Wir setzen branchenübliche Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff zu schützen.'
      }
    }
  },
  zh: {
    // Terms and Privacy
    terms: '条款',
    privacy: '隐私',
    termsTitle: '服务条款',
    privacyTitle: '隐私政策',
    termsContent: {
      welcome: '欢迎使用 Server Status。使用本服务即表示您同意以下条款和条件：',
      section1: {
        title: '接受条款',
        content: '使用 Server Status 即表示您同意受这些服务条款的约束。如果您不接受这些条款，请不要使用本服务。'
      },
      section2: {
        title: '服务说明',
        content: 'Server Status 提供服务状态的实时监控。本服务按"原样"提供，可能会发生变更或中断。'
      },
      section3: {
        title: '责任',
        content: '对于使用或无法使用本服务而导致的任何直接或间接损害，我们不承担责任。'
      },
      section4: {
        title: '条款变更',
        content: '我们保留随时修改这些条款的权利。变更在网站发布后立即生效。'
      }
    },
    privacyContent: {
      intro: '您的隐私对我们很重要。本政策说明了我们如何收集和使用您的数据：',
      section1: {
        title: '数据收集',
        content: '我们仅收集服务运营所需的必要数据，如登录信息和用户偏好。'
      },
      section2: {
        title: '数据使用',
        content: '收集的数据仅用于提供和改进服务。我们不会将您的数据出售或与第三方共享。'
      },
      section3: {
        title: 'Cookie',
        content: '我们使用必要的 Cookie 来维持您的登录和偏好设置。您可以通过浏览器设置管理 Cookie。'
      },
      section4: {
        title: '安全',
        content: '我们采用行业标准的安全措施来保护您的数据免受未经授权的访问。'
      }
    }
  },
  ja: {
    // Terms and Privacy
    terms: '利用規約',
    privacy: 'プライバシー',
    termsTitle: '利用規約',
    privacyTitle: 'プライバシーポリシー',
    termsContent: {
      welcome: 'Server Status へようこそ。本サービスを利用することで、以下の利用規約に同意したものとみなされます：',
      section1: {
        title: '規約の同意',
        content: 'Server Status を利用することで、これらの利用規約に拘束されることに同意するものとします。これらの規約に同意しない場合は、本サービスを利用しないでください。'
      },
      section2: {
        title: 'サービスの説明',
        content: 'Server Status はサービスの状態をリアルタイムで監視します。本サービスは「現状のまま」提供され、変更や中断される場合があります。'
      },
      section3: {
        title: '責任',
        content: '本サービスの利用または利用不能から生じる直接的または間接的な損害について、当社は一切の責任を負いません。'
      },
      section4: {
        title: '規約の変更',
        content: '当社は、これらの規約をいつでも変更する権利を留保します。変更はサイトに掲載された時点で直ちに有効となります。'
      }
    },
    privacyContent: {
      intro: 'お客様のプライバシーは私たちにとって重要です。このポリシーでは、お客様のデータの収集方法と使用方法について説明します：',
      section1: {
        title: 'データ収集',
        content: 'サービスの運営に必要不可欠なデータ（ログイン情報やユーザー設定など）のみを収集します。'
      },
      section2: {
        title: 'データの使用',
        content: '収集したデータは、サービスの提供と改善にのみ使用されます。お客様のデータを第三者に販売または共有することはありません。'
      },
      section3: {
        title: 'Cookie',
        content: 'ログインと設定を維持するために必要な Cookie を使用します。Cookie はブラウザの設定で管理できます。'
      },
      section4: {
        title: 'セキュリティ',
        content: '業界標準のセキュリティ対策を採用し、お客様のデータを不正アクセスから保護します。'
      }
    }
  },
  pt: {
    // Terms and Privacy
    terms: 'Termos',
    privacy: 'Privacidade',
    termsTitle: 'Termos de Serviço',
    privacyTitle: 'Política de Privacidade',
    termsContent: {
      welcome: 'Bem-vindo ao Server Status. Ao usar este serviço, você concorda com os seguintes termos e condições:',
      section1: {
        title: 'Aceitação dos Termos',
        content: 'Ao usar o Server Status, você concorda em estar vinculado a estes termos de serviço. Se você não aceita estes termos, por favor não use o serviço.'
      },
      section2: {
        title: 'Descrição do Serviço',
        content: 'O Server Status fornece monitoramento em tempo real do status dos serviços. O serviço é fornecido "como está" e pode estar sujeito a alterações ou interrupções.'
      },
      section3: {
        title: 'Responsabilidade',
        content: 'Não somos responsáveis por quaisquer danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso do serviço.'
      },
      section4: {
        title: 'Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão efetivas imediatamente após a publicação no site.'
      }
    },
    privacyContent: {
      intro: 'Sua privacidade é importante para nós. Esta política explica como coletamos e usamos seus dados:',
      section1: {
        title: 'Coleta de Dados',
        content: 'Coletamos apenas os dados essenciais necessários para a operação do serviço, como informações de login e preferências do usuário.'
      },
      section2: {
        title: 'Uso dos Dados',
        content: 'Os dados coletados são usados exclusivamente para fornecer e melhorar o serviço. Não vendemos nem compartilhamos seus dados com terceiros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Usamos cookies essenciais para manter seu login e preferências. Você pode gerenciar cookies através das configurações do seu navegador.'
      },
      section4: {
        title: 'Segurança',
        content: 'Empregamos medidas de segurança padrão do setor para proteger seus dados contra acesso não autorizado.'
      }
    }
  },
  es: {
    // Base translations
    settings: 'Configuración',
    settingsDescription: 'Gestiona tus preferencias',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    favorites: 'Favoritos',
    noFavorites: 'Sin favoritos',
    addToFavorites: 'Añadir a favoritos',
    removeFromFavorites: 'Eliminar de favoritos',
    english: 'Inglés',
    italian: 'Italiano',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    chinese: 'Chino',
    japanese: 'Japonés',
    portuguese: 'Portugués',
    russian: 'Ruso',
    close: 'Cerrar',
    register: 'Registrarse',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Estado del Servidor',
    selectTheme: 'Seleccionar tema',
    selectLanguage: 'Seleccionar idioma',
    operational: 'Operativo',
    degraded: 'Degradado',
    down: 'Caído',
    lastUpdated: 'Última actualización',
    dashboard: 'Panel',
    dashboardDescription: 'Resumen de servicios',
    checkingNow: 'Comprobando...',
    checkNow: 'Comprobar ahora',
    unknown: 'Desconocido',
    error: 'Error',
    lastCheck: 'Última comprobación',
    responseTime: 'Tiempo de respuesta',
    viewDetails: 'Ver detalles',
    backToDashboard: 'Volver al Panel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos los servicios {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos servicios',
    infoAndContacts: 'Info y Contactos',
    expand: 'Expandir',
    collapse: 'Contraer',
    
    // Terms and Privacy
    terms: 'Términos',
    privacy: 'Privacidad',
    termsTitle: 'Términos de Servicio',
    privacyTitle: 'Política de Privacidad',
    termsContent: {
      welcome: 'Bienvenido a Server Status. Al usar este servicio, aceptas los siguientes términos y condiciones:',
      section1: {
        title: 'Aceptación de Términos',
        content: 'Al utilizar Server Status, aceptas estar sujeto a estos términos de servicio. Si no aceptas estos términos, por favor no uses el servicio.'
      },
      section2: {
        title: 'Descripción del Servicio',
        content: 'Server Status proporciona monitoreo en tiempo real del estado de los servicios. El servicio se proporciona "tal cual" y puede estar sujeto a cambios o interrupciones.'
      },
      section3: {
        title: 'Responsabilidad',
        content: 'No somos responsables por daños directos o indirectos que surjan del uso o la imposibilidad de usar el servicio.'
      },
      section4: {
        title: 'Cambios en los Términos',
        content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio.'
      }
    },
    privacyContent: {
      intro: 'Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos y usamos tus datos:',
      section1: {
        title: 'Recopilación de Datos',
        content: 'Solo recopilamos datos esenciales necesarios para el funcionamiento del servicio, como información de inicio de sesión y preferencias del usuario.'
      },
      section2: {
        title: 'Uso de Datos',
        content: 'Los datos recopilados se utilizan exclusivamente para proporcionar y mejorar el servicio. No vendemos ni compartimos tus datos con terceros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Utilizamos cookies esenciales para mantener tu inicio de sesión y preferencias. Puedes gestionar las cookies a través de la configuración de tu navegador.'
      },
      section4: {
        title: 'Seguridad',
        content: 'Empleamos medidas de seguridad estándar de la industria para proteger tus datos contra accesos no autorizados.'
      }
    }
  },
  fr: {
    // Base translations
    settings: 'Paramètres',
    settingsDescription: 'Gérer vos préférences',
    theme: 'Thème',
    language: 'Langue',
    system: 'Système',
    light: 'Clair',
    dark: 'Sombre',
    favorites: 'Favoris',
    noFavorites: 'Aucun favori',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    english: 'Anglais',
    italian: 'Italien',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    chinese: 'Chinois',
    japanese: 'Japonais',
    portuguese: 'Portugais',
    russian: 'Russe',
    close: 'Fermer',
    register: 'S\'inscrire',
    login: 'Connexion',
    logout: 'Déconnexion',
    admin: 'Admin',
    search: 'Rechercher',
    serverStatus: 'État du Serveur',
    selectTheme: 'Sélectionner le thème',
    selectLanguage: 'Sélectionner la langue',
    operational: 'Opérationnel',
    degraded: 'Dégradé',
    down: 'Hors service',
    lastUpdated: 'Dernière mise à jour',
    dashboard: 'Tableau de bord',
    dashboardDescription: 'Aperçu des services',
    checkingNow: 'Vérification en cours...',
    checkNow: 'Vérifier maintenant',
    unknown: 'Inconnu',
    error: 'Erreur',
    lastCheck: 'Dernière vérification',
    responseTime: 'Temps de réponse',
    viewDetails: 'Voir les détails',
    backToDashboard: 'Retour au tableau de bord',

    // Category translations
    music: 'Musique',
    
    // Interface translations
    showAllCategory: 'Afficher tous les services {{category}} ({{count}})',
    showLessCategory: 'Afficher moins de services',
    infoAndContacts: 'Info & Contacts',
    expand: 'Développer',
    collapse: 'Réduire',
    
    // Terms and Privacy
    terms: 'Conditions',
    privacy: 'Confidentialité',
    termsTitle: 'Conditions d\'Utilisation',
    privacyTitle: 'Politique de Confidentialité',
    termsContent: {
      welcome: 'Bienvenue sur Server Status. En utilisant ce service, vous acceptez les conditions suivantes :',
      section1: {
        title: 'Acceptation des Conditions',
        content: 'En utilisant Server Status, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.'
      },
      section2: {
        title: 'Description du Service',
        content: 'Server Status fournit une surveillance en temps réel de l\'état des services. Le service est fourni "tel quel" et peut être sujet à des modifications ou interruptions.'
      },
      section3: {
        title: 'Responsabilité',
        content: 'Nous ne sommes pas responsables des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service.'
      },
      section4: {
        title: 'Modifications des Conditions',
        content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après publication sur le site.'
      }
    },
    privacyContent: {
      intro: 'Votre confidentialité est importante pour nous. Cette politique explique comment nous collectons et utilisons vos données :',
      section1: {
        title: 'Collecte des Données',
        content: 'Nous collectons uniquement les données essentielles nécessaires au fonctionnement du service, telles que les informations de connexion et les préférences utilisateur.'
      },
      section2: {
        title: 'Utilisation des Données',
        content: 'Les données collectées sont utilisées exclusivement pour fournir et améliorer le service. Nous ne vendons ni ne partageons vos données avec des tiers.'
      },
      section3: {
        title: 'Cookies',
        content: 'Nous utilisons des cookies essentiels pour maintenir votre connexion et vos préférences. Vous pouvez gérer les cookies via les paramètres de votre navigateur.'
      },
      section4: {
        title: 'Sécurité',
        content: 'Nous employons des mesures de sécurité standards de l\'industrie pour protéger vos données contre les accès non autorisés.'
      }
    }
  },
  de: {
    // Base translations
    settings: 'Einstellungen',
    settingsDescription: 'Verwalten Sie Ihre Einstellungen',
    theme: 'Design',
    language: 'Sprache',
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    favorites: 'Favoriten',
    noFavorites: 'Keine Favoriten',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    english: 'Englisch',
    italian: 'Italienisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    chinese: 'Chinesisch',
    japanese: 'Japanisch',
    portuguese: 'Portugiesisch',
    russian: 'Russisch',
    close: 'Schließen',
    register: 'Registrieren',
    login: 'Anmelden',
    logout: 'Abmelden',
    admin: 'Admin',
    search: 'Suchen',
    serverStatus: 'Server-Status',
    selectTheme: 'Design auswählen',
    selectLanguage: 'Sprache auswählen',
    operational: 'Betriebsbereit',
    degraded: 'Beeinträchtigt',
    down: 'Außer Betrieb',
    lastUpdated: 'Zuletzt aktualisiert',
    dashboard: 'Dashboard',
    dashboardDescription: 'Dienste-Übersicht',
    checkingNow: 'Überprüfung läuft...',
    checkNow: 'Jetzt prüfen',
    unknown: 'Unbekannt',
    error: 'Fehler',
    lastCheck: 'Letzte Prüfung',
    responseTime: 'Antwortzeit',
    viewDetails: 'Details anzeigen',
    backToDashboard: 'Zurück zum Dashboard',

    // Category translations
    music: 'Musik',
    
    // Interface translations
    showAllCategory: 'Alle {{category}} Dienste anzeigen ({{count}})',
    showLessCategory: 'Weniger Dienste anzeigen',
    infoAndContacts: 'Info & Kontakte',
    expand: 'Erweitern',
    collapse: 'Einklappen',
    
    // Terms and Privacy
    terms: 'Bedingungen',
    privacy: 'Datenschutz',
    termsTitle: 'Nutzungsbedingungen',
    privacyTitle: 'Datenschutzerklärung',
    termsContent: {
      welcome: 'Willkommen bei Server Status. Mit der Nutzung dieses Dienstes stimmen Sie den folgenden Bedingungen zu:',
      section1: {
        title: 'Annahme der Bedingungen',
        content: 'Mit der Nutzung von Server Status erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie den Dienst bitte nicht.'
      },
      section2: {
        title: 'Beschreibung des Dienstes',
        content: 'Server Status bietet Echtzeit-Überwachung des Servicestatus. Der Dienst wird "wie besehen" bereitgestellt und kann Änderungen oder Unterbrechungen unterliegen.'
      },
      section3: {
        title: 'Haftung',
        content: 'Wir haften nicht für direkte oder indirekte Schäden, die sich aus der Nutzung oder Unmöglichkeit der Nutzung des Dienstes ergeben.'
      },
      section4: {
        title: 'Änderungen der Bedingungen',
        content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen treten sofort nach der Veröffentlichung auf der Website in Kraft.'
      }
    },
    privacyContent: {
      intro: 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erklärt, wie wir Ihre Daten erfassen und verwenden:',
      section1: {
        title: 'Datenerfassung',
        content: 'Wir erfassen nur die für den Betrieb des Dienstes erforderlichen Daten, wie Anmeldeinformationen und Benutzereinstellungen.'
      },
      section2: {
        title: 'Datennutzung',
        content: 'Die erfassten Daten werden ausschließlich zur Bereitstellung und Verbesserung des Dienstes verwendet. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten.'
      },
      section3: {
        title: 'Cookies',
        content: 'Wir verwenden essentielle Cookies, um Ihre Anmeldung und Einstellungen zu speichern. Sie können Cookies über Ihre Browsereinstellungen verwalten.'
      },
      section4: {
        title: 'Sicherheit',
        content: 'Wir setzen branchenübliche Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff zu schützen.'
      }
    }
  },
  zh: {
    // Base translations
    settings: '设置',
    settingsDescription: '管理您的偏好设置',
    theme: '主题',
    language: '语言',
    system: '系统',
    light: '浅色',
    dark: '深色',
    favorites: '收藏',
    noFavorites: '无收藏',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏中删除',
    english: '英语',
    italian: '意大利语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    chinese: '中文',
    japanese: '日语',
    portuguese: '葡萄牙语',
    russian: '俄语',
    close: '关闭',
    register: '注册',
    login: '登录',
    logout: '退出登录',
    admin: '管理员',
    search: '搜索',
    serverStatus: '服务器状态',
    selectTheme: '选择主题',
    selectLanguage: '选择语言',
    operational: '运行中',
    degraded: '性能下降',
    down: '停止运行',
    lastUpdated: '最后更新',
    dashboard: '仪表板',
    dashboardDescription: '服务概览',
    checkingNow: '正在检查...',
    checkNow: '立即检查',
    unknown: '未知',
    error: '错误',
    lastCheck: '上次检查',
    responseTime: '响应时间',
    viewDetails: '查看详情',
    backToDashboard: '返回仪表板',

    // Category translations
    music: '音乐',
    
    // Interface translations
    showAllCategory: '显示所有{{category}}服务 ({{count}})',
    showLessCategory: '显示更少服务',
    infoAndContacts: '信息与联系',
    expand: '展开',
    collapse: '折叠',
    
    // Terms and Privacy
    terms: '条款',
    privacy: '隐私',
    termsTitle: '服务条款',
    privacyTitle: '隐私政策',
    termsContent: {
      welcome: '欢迎使用 Server Status。使用本服务即表示您同意以下条款和条件：',
      section1: {
        title: '接受条款',
        content: '使用 Server Status 即表示您同意受这些服务条款的约束。如果您不接受这些条款，请不要使用本服务。'
      },
      section2: {
        title: '服务说明',
        content: 'Server Status 提供服务状态的实时监控。本服务按"原样"提供，可能会发生变更或中断。'
      },
      section3: {
        title: '责任',
        content: '对于使用或无法使用本服务而导致的任何直接或间接损害，我们不承担责任。'
      },
      section4: {
        title: '条款变更',
        content: '我们保留随时修改这些条款的权利。变更在网站发布后立即生效。'
      }
    },
    privacyContent: {
      intro: '您的隐私对我们很重要。本政策说明了我们如何收集和使用您的数据：',
      section1: {
        title: '数据收集',
        content: '我们仅收集服务运营所需的必要数据，如登录信息和用户偏好。'
      },
      section2: {
        title: '数据使用',
        content: '收集的数据仅用于提供和改进服务。我们不会将您的数据出售或与第三方共享。'
      },
      section3: {
        title: 'Cookie',
        content: '我们使用必要的 Cookie 来维持您的登录和偏好设置。您可以通过浏览器设置管理 Cookie。'
      },
      section4: {
        title: '安全',
        content: '我们采用行业标准的安全措施来保护您的数据免受未经授权的访问。'
      }
    }
  },
  ja: {
    // Base translations
    settings: '設定',
    settingsDescription: '設定を管理',
    theme: 'テーマ',
    language: '言語',
    system: 'システム',
    light: 'ライト',
    dark: 'ダーク',
    favorites: 'お気に入り',
    noFavorites: 'お気に入りなし',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    english: '英語',
    italian: 'イタリア語',
    spanish: 'スペイン語',
    french: 'フランス語',
    german: 'ドイツ語',
    chinese: '中国語',
    japanese: '日本語',
    portuguese: 'ポルトガル語',
    russian: 'ロシア語',
    close: '閉じる',
    register: '登録',
    login: 'ログイン',
    logout: 'ログアウト',
    admin: '管理者',
    search: '検索',
    serverStatus: 'サーバーステータス',
    selectTheme: 'テーマを選択',
    selectLanguage: '言語を選択',
    operational: '正常稼働中',
    degraded: '性能低下',
    down: '停止中',
    lastUpdated: '最終更新',
    dashboard: 'ダッシュボード',
    dashboardDescription: 'サービス概要',
    checkingNow: '確認中...',
    checkNow: '今すぐ確認',
    unknown: '不明',
    error: 'エラー',
    lastCheck: '最終確認',
    responseTime: '応答時間',
    viewDetails: '詳細を表示',
    backToDashboard: 'ダッシュボードに戻る',

    // Category translations
    music: '音楽',
    
    // Interface translations
    showAllCategory: 'すべての{{category}}サービスを表示 ({{count}})',
    showLessCategory: '表示を減らす',
    infoAndContacts: '情報 & 連絡先',
    expand: '展開',
    collapse: '折りたたむ',
    
    // Terms and Privacy
    terms: '利用規約',
    privacy: 'プライバシー',
    termsTitle: '利用規約',
    privacyTitle: 'プライバシーポリシー',
    termsContent: {
      welcome: 'Server Status へようこそ。本サービスを利用することで、以下の利用規約に同意したものとみなされます：',
      section1: {
        title: '規約の同意',
        content: 'Server Status を利用することで、これらの利用規約に拘束されることに同意するものとします。これらの規約に同意しない場合は、本サービスを利用しないでください。'
      },
      section2: {
        title: 'サービスの説明',
        content: 'Server Status はサービスの状態をリアルタイムで監視します。本サービスは「現状のまま」提供され、変更や中断される場合があります。'
      },
      section3: {
        title: '責任',
        content: '本サービスの利用または利用不能から生じる直接的または間接的な損害について、当社は一切の責任を負いません。'
      },
      section4: {
        title: '規約の変更',
        content: '当社は、これらの規約をいつでも変更する権利を留保します。変更はサイトに掲載された時点で直ちに有効となります。'
      }
    },
    privacyContent: {
      intro: 'お客様のプライバシーは私たちにとって重要です。このポリシーでは、お客様のデータの収集方法と使用方法について説明します：',
      section1: {
        title: 'データ収集',
        content: 'サービスの運営に必要不可欠なデータ（ログイン情報やユーザー設定など）のみを収集します。'
      },
      section2: {
        title: 'データの使用',
        content: '収集したデータは、サービスの提供と改善にのみ使用されます。お客様のデータを第三者に販売または共有することはありません。'
      },
      section3: {
        title: 'Cookie',
        content: 'ログインと設定を維持するために必要な Cookie を使用します。Cookie はブラウザの設定で管理できます。'
      },
      section4: {
        title: 'セキュリティ',
        content: '業界標準のセキュリティ対策を採用し、お客様のデータを不正アクセスから保護します。'
      }
    }
  },
  pt: {
    // Base translations
    settings: 'Configurações',
    settingsDescription: 'Gerencie suas preferências',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
    favorites: 'Favoritos',
    noFavorites: 'Sem favoritos',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    english: 'Inglês',
    italian: 'Italiano',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
    chinese: 'Chinês',
    japanese: 'Japonês',
    portuguese: 'Português',
    russian: 'Russo',
    close: 'Fechar',
    register: 'Registrar',
    login: 'Entrar',
    logout: 'Sair',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Status do Servidor',
    selectTheme: 'Selecionar tema',
    selectLanguage: 'Selecionar idioma',
    operational: 'Operacional',
    degraded: 'Degradado',
    down: 'Fora do ar',
    lastUpdated: 'Última atualização',
    dashboard: 'Painel',
    dashboardDescription: 'Visão geral dos serviços',
    checkingNow: 'Verificando...',
    checkNow: 'Verificar agora',
    unknown: 'Desconhecido',
    error: 'Erro',
    lastCheck: 'Última verificação',
    responseTime: 'Tempo de resposta',
    viewDetails: 'Ver detalhes',
    backToDashboard: 'Voltar ao Painel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos os serviços {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos serviços',
    infoAndContacts: 'Info & Contatos',
    expand: 'Expandir',
    collapse: 'Recolher',
    
    // Terms and Privacy
    terms: 'Termos',
    privacy: 'Privacidade',
    termsTitle: 'Termos de Serviço',
    privacyTitle: 'Política de Privacidade',
    termsContent: {
      welcome: 'Bem-vindo ao Server Status. Ao usar este serviço, você concorda com os seguintes termos e condições:',
      section1: {
        title: 'Aceitação dos Termos',
        content: 'Ao usar o Server Status, você concorda em estar vinculado a estes termos de serviço. Se você não aceita estes termos, por favor não use o serviço.'
      },
      section2: {
        title: 'Descrição do Serviço',
        content: 'O Server Status fornece monitoramento em tempo real do status dos serviços. O serviço é fornecido "como está" e pode estar sujeito a alterações ou interrupções.'
      },
      section3: {
        title: 'Responsabilidade',
        content: 'Não somos responsáveis por quaisquer danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso do serviço.'
      },
      section4: {
        title: 'Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão efetivas imediatamente após a publicação no site.'
      }
    },
    privacyContent: {
      intro: 'Sua privacidade é importante para nós. Esta política explica como coletamos e usamos seus dados:',
      section1: {
        title: 'Coleta de Dados',
        content: 'Coletamos apenas os dados essenciais necessários para a operação do serviço, como informações de login e preferências do usuário.'
      },
      section2: {
        title: 'Uso dos Dados',
        content: 'Os dados coletados são usados exclusivamente para fornecer e melhorar o serviço. Não vendemos nem compartilhamos seus dados com terceiros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Usamos cookies essenciais para manter seu login e preferências. Você pode gerenciar cookies através das configurações do seu navegador.'
      },
      section4: {
        title: 'Segurança',
        content: 'Empregamos medidas de segurança padrão do setor para proteger seus dados contra acesso não autorizado.'
      }
    }
  },
  es: {
    // Base translations
    settings: 'Configuración',
    settingsDescription: 'Gestiona tus preferencias',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    favorites: 'Favoritos',
    noFavorites: 'Sin favoritos',
    addToFavorites: 'Añadir a favoritos',
    removeFromFavorites: 'Eliminar de favoritos',
    english: 'Inglés',
    italian: 'Italiano',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    chinese: 'Chino',
    japanese: 'Japonés',
    portuguese: 'Portugués',
    russian: 'Ruso',
    close: 'Cerrar',
    register: 'Registrarse',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Estado del Servidor',
    selectTheme: 'Seleccionar tema',
    selectLanguage: 'Seleccionar idioma',
    operational: 'Operativo',
    degraded: 'Degradado',
    down: 'Caído',
    lastUpdated: 'Última actualización',
    dashboard: 'Panel',
    dashboardDescription: 'Resumen de servicios',
    checkingNow: 'Comprobando...',
    checkNow: 'Comprobar ahora',
    unknown: 'Desconocido',
    error: 'Error',
    lastCheck: 'Última comprobación',
    responseTime: 'Tiempo de respuesta',
    viewDetails: 'Ver detalles',
    backToDashboard: 'Volver al Panel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos los servicios {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos servicios',
    infoAndContacts: 'Info y Contactos',
    expand: 'Expandir',
    collapse: 'Contraer',
    
    // Terms and Privacy
    terms: 'Términos',
    privacy: 'Privacidad',
    termsTitle: 'Términos de Servicio',
    privacyTitle: 'Política de Privacidad',
    termsContent: {
      welcome: 'Bienvenido a Server Status. Al usar este servicio, aceptas los siguientes términos y condiciones:',
      section1: {
        title: 'Aceptación de Términos',
        content: 'Al utilizar Server Status, aceptas estar sujeto a estos términos de servicio. Si no aceptas estos términos, por favor no uses el servicio.'
      },
      section2: {
        title: 'Descripción del Servicio',
        content: 'Server Status proporciona monitoreo en tiempo real del estado de los servicios. El servicio se proporciona "tal cual" y puede estar sujeto a cambios o interrupciones.'
      },
      section3: {
        title: 'Responsabilidad',
        content: 'No somos responsables por daños directos o indirectos que surjan del uso o la imposibilidad de usar el servicio.'
      },
      section4: {
        title: 'Cambios en los Términos',
        content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio.'
      }
    },
    privacyContent: {
      intro: 'Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos y usamos tus datos:',
      section1: {
        title: 'Recopilación de Datos',
        content: 'Solo recopilamos datos esenciales necesarios para el funcionamiento del servicio, como información de inicio de sesión y preferencias del usuario.'
      },
      section2: {
        title: 'Uso de Datos',
        content: 'Los datos recopilados se utilizan exclusivamente para proporcionar y mejorar el servicio. No vendemos ni compartimos tus datos con terceros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Utilizamos cookies esenciales para mantener tu inicio de sesión y preferencias. Puedes gestionar las cookies a través de la configuración de tu navegador.'
      },
      section4: {
        title: 'Seguridad',
        content: 'Empleamos medidas de seguridad estándar de la industria para proteger tus datos contra accesos no autorizados.'
      }
    }
  },
  fr: {
    // Base translations
    settings: 'Paramètres',
    settingsDescription: 'Gérer vos préférences',
    theme: 'Thème',
    language: 'Langue',
    system: 'Système',
    light: 'Clair',
    dark: 'Sombre',
    favorites: 'Favoris',
    noFavorites: 'Aucun favori',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    english: 'Anglais',
    italian: 'Italien',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    chinese: 'Chinois',
    japanese: 'Japonais',
    portuguese: 'Portugais',
    russian: 'Russe',
    close: 'Fermer',
    register: 'S\'inscrire',
    login: 'Connexion',
    logout: 'Déconnexion',
    admin: 'Admin',
    search: 'Rechercher',
    serverStatus: 'État du Serveur',
    selectTheme: 'Sélectionner le thème',
    selectLanguage: 'Sélectionner la langue',
    operational: 'Opérationnel',
    degraded: 'Dégradé',
    down: 'Hors service',
    lastUpdated: 'Dernière mise à jour',
    dashboard: 'Tableau de bord',
    dashboardDescription: 'Aperçu des services',
    checkingNow: 'Vérification en cours...',
    checkNow: 'Vérifier maintenant',
    unknown: 'Inconnu',
    error: 'Erreur',
    lastCheck: 'Dernière vérification',
    responseTime: 'Temps de réponse',
    viewDetails: 'Voir les détails',
    backToDashboard: 'Retour au tableau de bord',

    // Category translations
    music: 'Musique',
    
    // Interface translations
    showAllCategory: 'Afficher tous les services {{category}} ({{count}})',
    showLessCategory: 'Afficher moins de services',
    infoAndContacts: 'Info & Contacts',
    expand: 'Développer',
    collapse: 'Réduire',
    
    // Terms and Privacy
    terms: 'Conditions',
    privacy: 'Confidentialité',
    termsTitle: 'Conditions d\'Utilisation',
    privacyTitle: 'Politique de Confidentialité',
    termsContent: {
      welcome: 'Bienvenue sur Server Status. En utilisant ce service, vous acceptez les conditions suivantes :',
      section1: {
        title: 'Acceptation des Conditions',
        content: 'En utilisant Server Status, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.'
      },
      section2: {
        title: 'Description du Service',
        content: 'Server Status fournit une surveillance en temps réel de l\'état des services. Le service est fourni "tel quel" et peut être sujet à des modifications ou interruptions.'
      },
      section3: {
        title: 'Responsabilité',
        content: 'Nous ne sommes pas responsables des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service.'
      },
      section4: {
        title: 'Modifications des Conditions',
        content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après publication sur le site.'
      }
    },
    privacyContent: {
      intro: 'Votre confidentialité est importante pour nous. Cette politique explique comment nous collectons et utilisons vos données :',
      section1: {
        title: 'Collecte des Données',
        content: 'Nous collectons uniquement les données essentielles nécessaires au fonctionnement du service, telles que les informations de connexion et les préférences utilisateur.'
      },
      section2: {
        title: 'Utilisation des Données',
        content: 'Les données collectées sont utilisées exclusivement pour fournir et améliorer le service. Nous ne vendons ni ne partageons vos données avec des tiers.'
      },
      section3: {
        title: 'Cookies',
        content: 'Nous utilisons des cookies essentiels pour maintenir votre connexion et vos préférences. Vous pouvez gérer les cookies via les paramètres de votre navigateur.'
      },
      section4: {
        title: 'Sécurité',
        content: 'Nous employons des mesures de sécurité standards de l\'industrie pour protéger vos données contre les accès non autorisés.'
      }
    }
  },
  de: {
    // Base translations
    settings: 'Einstellungen',
    settingsDescription: 'Verwalten Sie Ihre Einstellungen',
    theme: 'Design',
    language: 'Sprache',
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    favorites: 'Favoriten',
    noFavorites: 'Keine Favoriten',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    english: 'Englisch',
    italian: 'Italienisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    chinese: 'Chinesisch',
    japanese: 'Japanisch',
    portuguese: 'Portugiesisch',
    russian: 'Russisch',
    close: 'Schließen',
    register: 'Registrieren',
    login: 'Anmelden',
    logout: 'Abmelden',
    admin: 'Admin',
    search: 'Suchen',
    serverStatus: 'Server-Status',
    selectTheme: 'Design auswählen',
    selectLanguage: 'Sprache auswählen',
    operational: 'Betriebsbereit',
    degraded: 'Beeinträchtigt',
    down: 'Außer Betrieb',
    lastUpdated: 'Zuletzt aktualisiert',
    dashboard: 'Dashboard',
    dashboardDescription: 'Dienste-Übersicht',
    checkingNow: 'Überprüfung läuft...',
    checkNow: 'Jetzt prüfen',
    unknown: 'Unbekannt',
    error: 'Fehler',
    lastCheck: 'Letzte Prüfung',
    responseTime: 'Antwortzeit',
    viewDetails: 'Details anzeigen',
    backToDashboard: 'Zurück zum Dashboard',

    // Category translations
    music: 'Musik',
    
    // Interface translations
    showAllCategory: 'Alle {{category}} Dienste anzeigen ({{count}})',
    showLessCategory: 'Weniger Dienste anzeigen',
    infoAndContacts: 'Info & Kontakte',
    expand: 'Erweitern',
    collapse: 'Einklappen',
    
    // Terms and Privacy
    terms: 'Bedingungen',
    privacy: 'Datenschutz',
    termsTitle: 'Nutzungsbedingungen',
    privacyTitle: 'Datenschutzerklärung',
    termsContent: {
      welcome: 'Willkommen bei Server Status. Mit der Nutzung dieses Dienstes stimmen Sie den folgenden Bedingungen zu:',
      section1: {
        title: 'Annahme der Bedingungen',
        content: 'Mit der Nutzung von Server Status erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie den Dienst bitte nicht.'
      },
      section2: {
        title: 'Beschreibung des Dienstes',
        content: 'Server Status bietet Echtzeit-Überwachung des Servicestatus. Der Dienst wird "wie besehen" bereitgestellt und kann Änderungen oder Unterbrechungen unterliegen.'
      },
      section3: {
        title: 'Haftung',
        content: 'Wir haften nicht für direkte oder indirekte Schäden, die sich aus der Nutzung oder Unmöglichkeit der Nutzung des Dienstes ergeben.'
      },
      section4: {
        title: 'Änderungen der Bedingungen',
        content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen treten sofort nach der Veröffentlichung auf der Website in Kraft.'
      }
    },
    privacyContent: {
      intro: 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erklärt, wie wir Ihre Daten erfassen und verwenden:',
      section1: {
        title: 'Datenerfassung',
        content: 'Wir erfassen nur die für den Betrieb des Dienstes erforderlichen Daten, wie Anmeldeinformationen und Benutzereinstellungen.'
      },
      section2: {
        title: 'Datennutzung',
        content: 'Die erfassten Daten werden ausschließlich zur Bereitstellung und Verbesserung des Dienstes verwendet. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten.'
      },
      section3: {
        title: 'Cookies',
        content: 'Wir verwenden essentielle Cookies, um Ihre Anmeldung und Einstellungen zu speichern. Sie können Cookies über Ihre Browsereinstellungen verwalten.'
      },
      section4: {
        title: 'Sicherheit',
        content: 'Wir setzen branchenübliche Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff zu schützen.'
      }
    }
  },
  zh: {
    // Base translations
    settings: '设置',
    settingsDescription: '管理您的偏好设置',
    theme: '主题',
    language: '语言',
    system: '系统',
    light: '浅色',
    dark: '深色',
    favorites: '收藏',
    noFavorites: '无收藏',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏中删除',
    english: '英语',
    italian: '意大利语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    chinese: '中文',
    japanese: '日语',
    portuguese: '葡萄牙语',
    russian: '俄语',
    close: '关闭',
    register: '注册',
    login: '登录',
    logout: '退出登录',
    admin: '管理员',
    search: '搜索',
    serverStatus: '服务器状态',
    selectTheme: '选择主题',
    selectLanguage: '选择语言',
    operational: '运行中',
    degraded: '性能下降',
    down: '停止运行',
    lastUpdated: '最后更新',
    dashboard: '仪表板',
    dashboardDescription: '服务概览',
    checkingNow: '正在检查...',
    checkNow: '立即检查',
    unknown: '未知',
    error: '错误',
    lastCheck: '上次检查',
    responseTime: '响应时间',
    viewDetails: '查看详情',
    backToDashboard: '返回仪表板',

    // Category translations
    music: '音乐',
    
    // Interface translations
    showAllCategory: '显示所有{{category}}服务 ({{count}})',
    showLessCategory: '显示更少服务',
    infoAndContacts: '信息与联系',
    expand: '展开',
    collapse: '折叠',
    
    // Terms and Privacy
    terms: '条款',
    privacy: '隐私',
    termsTitle: '服务条款',
    privacyTitle: '隐私政策',
    termsContent: {
      welcome: '欢迎使用 Server Status。使用本服务即表示您同意以下条款和条件：',
      section1: {
        title: '接受条款',
        content: '使用 Server Status 即表示您同意受这些服务条款的约束。如果您不接受这些条款，请不要使用本服务。'
      },
      section2: {
        title: '服务说明',
        content: 'Server Status 提供服务状态的实时监控。本服务按"原样"提供，可能会发生变更或中断。'
      },
      section3: {
        title: '责任',
        content: '对于使用或无法使用本服务而导致的任何直接或间接损害，我们不承担责任。'
      },
      section4: {
        title: '条款变更',
        content: '我们保留随时修改这些条款的权利。变更在网站发布后立即生效。'
      }
    },
    privacyContent: {
      intro: '您的隐私对我们很重要。本政策说明了我们如何收集和使用您的数据：',
      section1: {
        title: '数据收集',
        content: '我们仅收集服务运营所需的必要数据，如登录信息和用户偏好。'
      },
      section2: {
        title: '数据使用',
        content: '收集的数据仅用于提供和改进服务。我们不会将您的数据出售或与第三方共享。'
      },
      section3: {
        title: 'Cookie',
        content: '我们使用必要的 Cookie 来维持您的登录和偏好设置。您可以通过浏览器设置管理 Cookie。'
      },
      section4: {
        title: '安全',
        content: '我们采用行业标准的安全措施来保护您的数据免受未经授权的访问。'
      }
    }
  },
  ja: {
    // Base translations
    settings: '設定',
    settingsDescription: '設定を管理',
    theme: 'テーマ',
    language: '言語',
    system: 'システム',
    light: 'ライト',
    dark: 'ダーク',
    favorites: 'お気に入り',
    noFavorites: 'お気に入りなし',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    english: '英語',
    italian: 'イタリア語',
    spanish: 'スペイン語',
    french: 'フランス語',
    german: 'ドイツ語',
    chinese: '中国語',
    japanese: '日本語',
    portuguese: 'ポルトガル語',
    russian: 'ロシア語',
    close: '閉じる',
    register: '登録',
    login: 'ログイン',
    logout: 'ログアウト',
    admin: '管理者',
    search: '検索',
    serverStatus: 'サーバーステータス',
    selectTheme: 'テーマを選択',
    selectLanguage: '言語を選択',
    operational: '正常稼働中',
    degraded: '性能低下',
    down: '停止中',
    lastUpdated: '最終更新',
    dashboard: 'ダッシュボード',
    dashboardDescription: 'サービス概要',
    checkingNow: '確認中...',
    checkNow: '今すぐ確認',
    unknown: '不明',
    error: 'エラー',
    lastCheck: '最終確認',
    responseTime: '応答時間',
    viewDetails: '詳細を表示',
    backToDashboard: 'ダッシュボードに戻る',

    // Category translations
    music: '音楽',
    
    // Interface translations
    showAllCategory: 'すべての{{category}}サービスを表示 ({{count}})',
    showLessCategory: '表示を減らす',
    infoAndContacts: '情報 & 連絡先',
    expand: '展開',
    collapse: '折りたたむ',
    
    // Terms and Privacy
    terms: '利用規約',
    privacy: 'プライバシー',
    termsTitle: '利用規約',
    privacyTitle: 'プライバシーポリシー',
    termsContent: {
      welcome: 'Server Status へようこそ。本サービスを利用することで、以下の利用規約に同意したものとみなされます：',
      section1: {
        title: '規約の同意',
        content: 'Server Status を利用することで、これらの利用規約に拘束されることに同意するものとします。これらの規約に同意しない場合は、本サービスを利用しないでください。'
      },
      section2: {
        title: 'サービスの説明',
        content: 'Server Status はサービスの状態をリアルタイムで監視します。本サービスは「現状のまま」提供され、変更や中断される場合があります。'
      },
      section3: {
        title: '責任',
        content: '本サービスの利用または利用不能から生じる直接的または間接的な損害について、当社は一切の責任を負いません。'
      },
      section4: {
        title: '規約の変更',
        content: '当社は、これらの規約をいつでも変更する権利を留保します。変更はサイトに掲載された時点で直ちに有効となります。'
      }
    },
    privacyContent: {
      intro: 'お客様のプライバシーは私たちにとって重要です。このポリシーでは、お客様のデータの収集方法と使用方法について説明します：',
      section1: {
        title: 'データ収集',
        content: 'サービスの運営に必要不可欠なデータ（ログイン情報やユーザー設定など）のみを収集します。'
      },
      section2: {
        title: 'データの使用',
        content: '収集したデータは、サービスの提供と改善にのみ使用されます。お客様のデータを第三者に販売または共有することはありません。'
      },
      section3: {
        title: 'Cookie',
        content: 'ログインと設定を維持するために必要な Cookie を使用します。Cookie はブラウザの設定で管理できます。'
      },
      section4: {
        title: 'セキュリティ',
        content: '業界標準のセキュリティ対策を採用し、お客様のデータを不正アクセスから保護します。'
      }
    }
  },
  pt: {
    // Base translations
    settings: 'Configurações',
    settingsDescription: 'Gerencie suas preferências',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
    favorites: 'Favoritos',
    noFavorites: 'Sem favoritos',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    english: 'Inglês',
    italian: 'Italiano',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
    chinese: 'Chinês',
    japanese: 'Japonês',
    portuguese: 'Português',
    russian: 'Russo',
    close: 'Fechar',
    register: 'Registrar',
    login: 'Entrar',
    logout: 'Sair',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Status do Servidor',
    selectTheme: 'Selecionar tema',
    selectLanguage: 'Selecionar idioma',
    operational: 'Operacional',
    degraded: 'Degradado',
    down: 'Fora do ar',
    lastUpdated: 'Última atualização',
    dashboard: 'Painel',
    dashboardDescription: 'Visão geral dos serviços',
    checkingNow: 'Verificando...',
    checkNow: 'Verificar agora',
    unknown: 'Desconhecido',
    error: 'Erro',
    lastCheck: 'Última verificação',
    responseTime: 'Tempo de resposta',
    viewDetails: 'Ver detalhes',
    backToDashboard: 'Voltar ao Painel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos os serviços {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos serviços',
    infoAndContacts: 'Info & Contatos',
    expand: 'Expandir',
    collapse: 'Recolher',
    
    // Terms and Privacy
    terms: 'Termos',
    privacy: 'Privacidade',
    termsTitle: 'Termos de Serviço',
    privacyTitle: 'Política de Privacidade',
    termsContent: {
      welcome: 'Bem-vindo ao Server Status. Ao usar este serviço, você concorda com os seguintes termos e condições:',
      section1: {
        title: 'Aceitação dos Termos',
        content: 'Ao usar o Server Status, você concorda em estar vinculado a estes termos de serviço. Se você não aceita estes termos, por favor não use o serviço.'
      },
      section2: {
        title: 'Descrição do Serviço',
        content: 'O Server Status fornece monitoramento em tempo real do status dos serviços. O serviço é fornecido "como está" e pode estar sujeito a alterações ou interrupções.'
      },
      section3: {
        title: 'Responsabilidade',
        content: 'Não somos responsáveis por quaisquer danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso do serviço.'
      },
      section4: {
        title: 'Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão efetivas imediatamente após a publicação no site.'
      }
    },
    privacyContent: {
      intro: 'Sua privacidade é importante para nós. Esta política explica como coletamos e usamos seus dados:',
      section1: {
        title: 'Coleta de Dados',
        content: 'Coletamos apenas os dados essenciais necessários para a operação do serviço, como informações de login e preferências do usuário.'
      },
      section2: {
        title: 'Uso dos Dados',
        content: 'Os dados coletados são usados exclusivamente para fornecer e melhorar o serviço. Não vendemos nem compartilhamos seus dados com terceiros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Usamos cookies essenciais para manter seu login e preferências. Você pode gerenciar cookies através das configurações do seu navegador.'
      },
      section4: {
        title: 'Segurança',
        content: 'Empregamos medidas de segurança padrão do setor para proteger seus dados contra acesso não autorizado.'
      }
    }
  },
  es: {
    // Base translations
    settings: 'Configuración',
    settingsDescription: 'Gestiona tus preferencias',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    favorites: 'Favoritos',
    noFavorites: 'Sin favoritos',
    addToFavorites: 'Añadir a favoritos',
    removeFromFavorites: 'Eliminar de favoritos',
    english: 'Inglés',
    italian: 'Italiano',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    chinese: 'Chino',
    japanese: 'Japonés',
    portuguese: 'Portugués',
    russian: 'Ruso',
    close: 'Cerrar',
    register: 'Registrarse',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Estado del Servidor',
    selectTheme: 'Seleccionar tema',
    selectLanguage: 'Seleccionar idioma',
    operational: 'Operativo',
    degraded: 'Degradado',
    down: 'Caído',
    lastUpdated: 'Última actualización',
    dashboard: 'Panel',
    dashboardDescription: 'Resumen de servicios',
    checkingNow: 'Comprobando...',
    checkNow: 'Comprobar ahora',
    unknown: 'Desconocido',
    error: 'Error',
    lastCheck: 'Última comprobación',
    responseTime: 'Tiempo de respuesta',
    viewDetails: 'Ver detalles',
    backToDashboard: 'Volver al Panel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos los servicios {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos servicios',
    infoAndContacts: 'Info y Contactos',
    expand: 'Expandir',
    collapse: 'Contraer',
    
    // Terms and Privacy
    terms: 'Términos',
    privacy: 'Privacidad',
    termsTitle: 'Términos de Servicio',
    privacyTitle: 'Política de Privacidad',
    termsContent: {
      welcome: 'Bienvenido a Server Status. Al usar este servicio, aceptas los siguientes términos y condiciones:',
      section1: {
        title: 'Aceptación de Términos',
        content: 'Al utilizar Server Status, aceptas estar sujeto a estos términos de servicio. Si no aceptas estos términos, por favor no uses el servicio.'
      },
      section2: {
        title: 'Descripción del Servicio',
        content: 'Server Status proporciona monitoreo en tiempo real del estado de los servicios. El servicio se proporciona "tal cual" y puede estar sujeto a cambios o interrupciones.'
      },
      section3: {
        title: 'Responsabilidad',
        content: 'No somos responsables por daños directos o indirectos que surjan del uso o la imposibilidad de usar el servicio.'
      },
      section4: {
        title: 'Cambios en los Términos',
        content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio.'
      }
    },
    privacyContent: {
      intro: 'Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos y usamos tus datos:',
      section1: {
        title: 'Recopilación de Datos',
        content: 'Solo recopilamos datos esenciales necesarios para el funcionamiento del servicio, como información de inicio de sesión y preferencias del usuario.'
      },
      section2: {
        title: 'Uso de Datos',
        content: 'Los datos recopilados se utilizan exclusivamente para proporcionar y mejorar el servicio. No vendemos ni compartimos tus datos con terceros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Utilizamos cookies esenciales para mantener tu inicio de sesión y preferencias. Puedes gestionar las cookies a través de la configuración de tu navegador.'
      },
      section4: {
        title: 'Seguridad',
        content: 'Empleamos medidas de seguridad estándar de la industria para proteger tus datos contra accesos no autorizados.'
      }
    }
  },
  fr: {
    // Base translations
    settings: 'Paramètres',
    settingsDescription: 'Gérer vos préférences',
    theme: 'Thème',
    language: 'Langue',
    system: 'Système',
    light: 'Clair',
    dark: 'Sombre',
    favorites: 'Favoris',
    noFavorites: 'Aucun favori',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    english: 'Anglais',
    italian: 'Italien',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    chinese: 'Chinois',
    japanese: 'Japonais',
    portuguese: 'Portugais',
    russian: 'Russe',
    close: 'Fermer',
    register: 'S\'inscrire',
    login: 'Connexion',
    logout: 'Déconnexion',
    admin: 'Admin',
    search: 'Rechercher',
    serverStatus: 'État du Serveur',
    selectTheme: 'Sélectionner le thème',
    selectLanguage: 'Sélectionner la langue',
    operational: 'Opérationnel',
    degraded: 'Dégradé',
    down: 'Hors service',
    lastUpdated: 'Dernière mise à jour',
    dashboard: 'Tableau de bord',
    dashboardDescription: 'Aperçu des services',
    checkingNow: 'Vérification en cours...',
    checkNow: 'Vérifier maintenant',
    unknown: 'Inconnu',
    error: 'Erreur',
    lastCheck: 'Dernière vérification',
    responseTime: 'Temps de réponse',
    viewDetails: 'Voir les détails',
    backToDashboard: 'Retour au tableau de bord',

    // Category translations
    music: 'Musique',
    
    // Interface translations
    showAllCategory: 'Afficher tous les services {{category}} ({{count}})',
    showLessCategory: 'Afficher moins de services',
    infoAndContacts: 'Info & Contacts',
    expand: 'Développer',
    collapse: 'Réduire',
    
    // Terms and Privacy
    terms: 'Conditions',
    privacy: 'Confidentialité',
    termsTitle: 'Conditions d\'Utilisation',
    privacyTitle: 'Politique de Confidentialité',
    termsContent: {
      welcome: 'Bienvenue sur Server Status. En utilisant ce service, vous acceptez les conditions suivantes :',
      section1: {
        title: 'Acceptation des Conditions',
        content: 'En utilisant Server Status, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.'
      },
      section2: {
        title: 'Description du Service',
        content: 'Server Status fournit une surveillance en temps réel de l\'état des services. Le service est fourni "tel quel" et peut être sujet à des modifications ou interruptions.'
      },
      section3: {
        title: 'Responsabilité',
        content: 'Nous ne sommes pas responsables des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le service.'
      },
      section4: {
        title: 'Modifications des Conditions',
        content: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après publication sur le site.'
      }
    },
    privacyContent: {
      intro: 'Votre confidentialité est importante pour nous. Cette politique explique comment nous collectons et utilisons vos données :',
      section1: {
        title: 'Collecte des Données',
        content: 'Nous collectons uniquement les données essentielles nécessaires au fonctionnement du service, telles que les informations de connexion et les préférences utilisateur.'
      },
      section2: {
        title: 'Utilisation des Données',
        content: 'Les données collectées sont utilisées exclusivement pour fournir et améliorer le service. Nous ne vendons ni ne partageons vos données avec des tiers.'
      },
      section3: {
        title: 'Cookies',
        content: 'Nous utilisons des cookies essentiels pour maintenir votre connexion et vos préférences. Vous pouvez gérer les cookies via les paramètres de votre navigateur.'
      },
      section4: {
        title: 'Sécurité',
        content: 'Nous employons des mesures de sécurité standards de l\'industrie pour protéger vos données contre les accès non autorisés.'
      }
    }
  },
  de: {
    // Base translations
    settings: 'Einstellungen',
    settingsDescription: 'Verwalten Sie Ihre Einstellungen',
    theme: 'Design',
    language: 'Sprache',
    system: 'System',
    light: 'Hell',
    dark: 'Dunkel',
    favorites: 'Favoriten',
    noFavorites: 'Keine Favoriten',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    english: 'Englisch',
    italian: 'Italienisch',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    chinese: 'Chinesisch',
    japanese: 'Japanisch',
    portuguese: 'Portugiesisch',
    russian: 'Russisch',
    close: 'Schließen',
    register: 'Registrieren',
    login: 'Anmelden',
    logout: 'Abmelden',
    admin: 'Admin',
    search: 'Suchen',
    serverStatus: 'Server-Status',
    selectTheme: 'Design auswählen',
    selectLanguage: 'Sprache auswählen',
    operational: 'Betriebsbereit',
    degraded: 'Beeinträchtigt',
    down: 'Außer Betrieb',
    lastUpdated: 'Zuletzt aktualisiert',
    dashboard: 'Dashboard',
    dashboardDescription: 'Dienste-Übersicht',
    checkingNow: 'Überprüfung läuft...',
    checkNow: 'Jetzt prüfen',
    unknown: 'Unbekannt',
    error: 'Fehler',
    lastCheck: 'Letzte Prüfung',
    responseTime: 'Antwortzeit',
    viewDetails: 'Details anzeigen',
    backToDashboard: 'Zurück zum Dashboard',

    // Category translations
    music: 'Musik',
    
    // Interface translations
    showAllCategory: 'Alle {{category}} Dienste anzeigen ({{count}})',
    showLessCategory: 'Weniger Dienste anzeigen',
    infoAndContacts: 'Info & Kontakte',
    expand: 'Erweitern',
    collapse: 'Einklappen',
    
    // Terms and Privacy
    terms: 'Bedingungen',
    privacy: 'Datenschutz',
    termsTitle: 'Nutzungsbedingungen',
    privacyTitle: 'Datenschutzerklärung',
    termsContent: {
      welcome: 'Willkommen bei Server Status. Mit der Nutzung dieses Dienstes stimmen Sie den folgenden Bedingungen zu:',
      section1: {
        title: 'Annahme der Bedingungen',
        content: 'Mit der Nutzung von Server Status erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diese Bedingungen nicht akzeptieren, nutzen Sie den Dienst bitte nicht.'
      },
      section2: {
        title: 'Beschreibung des Dienstes',
        content: 'Server Status bietet Echtzeit-Überwachung des Servicestatus. Der Dienst wird "wie besehen" bereitgestellt und kann Änderungen oder Unterbrechungen unterliegen.'
      },
      section3: {
        title: 'Haftung',
        content: 'Wir haften nicht für direkte oder indirekte Schäden, die sich aus der Nutzung oder Unmöglichkeit der Nutzung des Dienstes ergeben.'
      },
      section4: {
        title: 'Änderungen der Bedingungen',
        content: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen treten sofort nach der Veröffentlichung auf der Website in Kraft.'
      }
    },
    privacyContent: {
      intro: 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie erklärt, wie wir Ihre Daten erfassen und verwenden:',
      section1: {
        title: 'Datenerfassung',
        content: 'Wir erfassen nur die für den Betrieb des Dienstes erforderlichen Daten, wie Anmeldeinformationen und Benutzereinstellungen.'
      },
      section2: {
        title: 'Datennutzung',
        content: 'Die erfassten Daten werden ausschließlich zur Bereitstellung und Verbesserung des Dienstes verwendet. Wir verkaufen oder teilen Ihre Daten nicht mit Dritten.'
      },
      section3: {
        title: 'Cookies',
        content: 'Wir verwenden essentielle Cookies, um Ihre Anmeldung und Einstellungen zu speichern. Sie können Cookies über Ihre Browsereinstellungen verwalten.'
      },
      section4: {
        title: 'Sicherheit',
        content: 'Wir setzen branchenübliche Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff zu schützen.'
      }
    }
  },
  zh: {
    // Base translations
    settings: '设置',
    settingsDescription: '管理您的偏好设置',
    theme: '主题',
    language: '语言',
    system: '系统',
    light: '浅色',
    dark: '深色',
    favorites: '收藏',
    noFavorites: '无收藏',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏中删除',
    english: '英语',
    italian: '意大利语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    chinese: '中文',
    japanese: '日语',
    portuguese: '葡萄牙语',
    russian: '俄语',
    close: '关闭',
    register: '注册',
    login: '登录',
    logout: '退出登录',
    admin: '管理员',
    search: '搜索',
    serverStatus: '服务器状态',
    selectTheme: '选择主题',
    selectLanguage: '选择语言',
    operational: '运行中',
    degraded: '性能下降',
    down: '停止运行',
    lastUpdated: '最后更新',
    dashboard: '仪表板',
    dashboardDescription: '服务概览',
    checkingNow: '正在检查...',
    checkNow: '立即检查',
    unknown: '未知',
    error: '错误',
    lastCheck: '上次检查',
    responseTime: '响应时间',
    viewDetails: '查看详情',
    backToDashboard: '返回仪表板',

    // Category translations
    music: '音乐',
    
    // Interface translations
    showAllCategory: '显示所有{{category}}服务 ({{count}})',
    showLessCategory: '显示更少服务',
    infoAndContacts: '信息与联系',
    expand: '展开',
    collapse: '折叠',
    
    // Terms and Privacy
    terms: '条款',
    privacy: '隐私',
    termsTitle: '服务条款',
    privacyTitle: '隐私政策',
    termsContent: {
      welcome: '欢迎使用 Server Status。使用本服务即表示您同意以下条款和条件：',
      section1: {
        title: '接受条款',
        content: '使用 Server Status 即表示您同意受这些服务条款的约束。如果您不接受这些条款，请不要使用本服务。'
      },
      section2: {
        title: '服务说明',
        content: 'Server Status 提供服务状态的实时监控。本服务按"原样"提供，可能会发生变更或中断。'
      },
      section3: {
        title: '责任',
        content: '对于使用或无法使用本服务而导致的任何直接或间接损害，我们不承担责任。'
      },
      section4: {
        title: '条款变更',
        content: '我们保留随时修改这些条款的权利。变更在网站发布后立即生效。'
      }
    },
    privacyContent: {
      intro: '您的隐私对我们很重要。本政策说明了我们如何收集和使用您的数据：',
      section1: {
        title: '数据收集',
        content: '我们仅收集服务运营所需的必要数据，如登录信息和用户偏好。'
      },
      section2: {
        title: '数据使用',
        content: '收集的数据仅用于提供和改进服务。我们不会将您的数据出售或与第三方共享。'
      },
      section3: {
        title: 'Cookie',
        content: '我们使用必要的 Cookie 来维持您的登录和偏好设置。您可以通过浏览器设置管理 Cookie。'
      },
      section4: {
        title: '安全',
        content: '我们采用行业标准的安全措施来保护您的数据免受未经授权的访问。'
      }
    }
  },
  ja: {
    // Base translations
    settings: '設定',
    settingsDescription: '設定を管理',
    theme: 'テーマ',
    language: '言語',
    system: 'システム',
    light: 'ライト',
    dark: 'ダーク',
    favorites: 'お気に入り',
    noFavorites: 'お気に入りなし',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    english: '英語',
    italian: 'イタリア語',
    spanish: 'スペイン語',
    french: 'フランス語',
    german: 'ドイツ語',
    chinese: '中国語',
    japanese: '日本語',
    portuguese: 'ポルトガル語',
    russian: 'ロシア語',
    close: '閉じる',
    register: '登録',
    login: 'ログイン',
    logout: 'ログアウト',
    admin: '管理者',
    search: '検索',
    serverStatus: 'サーバーステータス',
    selectTheme: 'テーマを選択',
    selectLanguage: '言語を選択',
    operational: '正常稼働中',
    degraded: '性能低下',
    down: '停止中',
    lastUpdated: '最終更新',
    dashboard: 'ダッシュボード',
    dashboardDescription: 'サービス概要',
    checkingNow: '確認中...',
    checkNow: '今すぐ確認',
    unknown: '不明',
    error: 'エラー',
    lastCheck: '最終確認',
    responseTime: '応答時間',
    viewDetails: '詳細を表示',
    backToDashboard: 'ダッシュボードに戻る',

    // Category translations
    music: '音楽',
    
    // Interface translations
    showAllCategory: 'すべての{{category}}サービスを表示 ({{count}})',
    showLessCategory: '表示を減らす',
    infoAndContacts: '情報 & 連絡先',
    expand: '展開',
    collapse: '折りたたむ',
    
    // Terms and Privacy
    terms: '利用規約',
    privacy: 'プライバシー',
    termsTitle: '利用規約',
    privacyTitle: 'プライバシーポリシー',
    termsContent: {
      welcome: 'Server Status へようこそ。本サービスを利用することで、以下の利用規約に同意したものとみなされます：',
      section1: {
        title: '規約の同意',
        content: 'Server Status を利用することで、これらの利用規約に拘束されることに同意するものとします。これらの規約に同意しない場合は、本サービスを利用しないでください。'
      },
      section2: {
        title: 'サービスの説明',
        content: 'Server Status はサービスの状態をリアルタイムで監視します。本サービスは「現状のまま」提供され、変更や中断される場合があります。'
      },
      section3: {
        title: '責任',
        content: '本サービスの利用または利用不能から生じる直接的または間接的な損害について、当社は一切の責任を負いません。'
      },
      section4: {
        title: '規約の変更',
        content: '当社は、これらの規約をいつでも変更する権利を留保します。変更はサイトに掲載された時点で直ちに有効となります。'
      }
    },
    privacyContent: {
      intro: 'お客様のプライバシーは私たちにとって重要です。このポリシーでは、お客様のデータの収集方法と使用方法について説明します：',
      section1: {
        title: 'データ収集',
        content: 'サービスの運営に必要不可欠なデータ（ログイン情報やユーザー設定など）のみを収集します。'
      },
      section2: {
        title: 'データの使用',
        content: '収集したデータは、サービスの提供と改善にのみ使用されます。お客様のデータを第三者に販売または共有することはありません。'
      },
      section3: {
        title: 'Cookie',
        content: 'ログインと設定を維持するために必要な Cookie を使用します。Cookie はブラウザの設定で管理できます。'
      },
      section4: {
        title: 'セキュリティ',
        content: '業界標準のセキュリティ対策を採用し、お客様のデータを不正アクセスから保護します。'
      }
    }
  },
  pt: {
    // Base translations
    settings: 'Configurações',
    settingsDescription: 'Gerencie suas preferências',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
    favorites: 'Favoritos',
    noFavorites: 'Sem favoritos',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    english: 'Inglês',
    italian: 'Italiano',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
    chinese: 'Chinês',
    japanese: 'Japonês',
    portuguese: 'Português',
    russian: 'Russo',
    close: 'Fechar',
    register: 'Registrar',
    login: 'Entrar',
    logout: 'Sair',
    admin: 'Admin',
    search: 'Buscar',
    serverStatus: 'Status do Servidor',
    selectTheme: 'Selecionar tema',
    selectLanguage: 'Selecionar idioma',
    operational: 'Operacional',
    degraded: 'Degradado',
    down: 'Fora do ar',
    lastUpdated: 'Última atualização',
    dashboard: 'Painel',
    dashboardDescription: 'Visão geral dos serviços',
    checkingNow: 'Verificando...',
    checkNow: 'Verificar agora',
    unknown: 'Desconhecido',
    error: 'Erro',
    lastCheck: 'Última verificação',
    responseTime: 'Tempo de resposta',
    viewDetails: 'Ver detalhes',
    backToDashboard: 'Voltar ao Painel',

    // Category translations
    music: 'Música',
    
    // Interface translations
    showAllCategory: 'Mostrar todos os serviços {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos serviços',
    infoAndContacts: 'Info & Contatos',
    expand: 'Expandir',
    collapse: 'Recolher',
    
    // Terms and Privacy
    terms: 'Termos',
    privacy: 'Privacidade',
    termsTitle: 'Termos de Serviço',
    privacyTitle: 'Política de Privacidade',
    termsContent: {
      welcome: 'Bem-vindo ao Server Status. Ao usar este serviço, você concorda com os seguintes termos e condições:',
      section1: {
        title: 'Aceitação dos Termos',
        content: 'Ao usar o Server Status, você concorda em estar vinculado a estes termos de serviço. Se você não aceita estes termos, por favor não use o serviço.'
      },
      section2: {
        title: 'Descrição do Serviço',
        content: 'O Server Status fornece monitoramento em tempo real do status dos serviços. O serviço é fornecido "como está" e pode estar sujeito a alterações ou interrupções.'
      },
      section3: {
        title: 'Responsabilidade',
        content: 'Não somos responsáveis por quaisquer danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso do serviço.'
      },
      section4: {
        title: 'Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão efetivas imediatamente após a publicação no site.'
      }
    },
    privacyContent: {
      intro: 'Sua privacidade é importante para nós. Esta política explica como coletamos e usamos seus dados:',
      section1: {
        title: 'Coleta de Dados',
        content: 'Coletamos apenas os dados essenciais necessários para a operação do serviço, como informações de login e preferências do usuário.'
      },
      section2: {
        title: 'Uso dos Dados',
        content: 'Os dados coletados são usados exclusivamente para fornecer e melhorar o serviço. Não vendemos nem compartilhamos seus dados com terceiros.'
      },
      section3: {
        title: 'Cookies',
        content: 'Usamos cookies essenciais para manter seu login e preferências. Você pode gerenciar cookies através das configurações do seu navegador.'
      },
      section4: {
        title: 'Segurança',
        content: 'Empregamos medidas de segurança padrão do setor para proteger seus dados contra acesso não autorizado.'
      }
    }
  }
};