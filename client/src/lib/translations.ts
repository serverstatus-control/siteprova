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
  bank?: string;
  shopping: string;
  social: string;
  mail: string;
  various: string;
  connection: string;
  browserai: string;
  cloud?: string;
  betting?: string;
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
  // Info & Contacts page
  infoContactsSubtitle: string;
  supportTitle: string;
  supportText: string;
  projectInfoTitle: string;
  projectInfoText: string;
  teamTitle: string;
  createdBy: string;
  updatesSubtitle: string;
  versionLabel: string;
  // Site updates content
  updatesList: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
  
  // Auth page translations
  username: string;
  password: string;
  email: string;
  welcomeBack: string;
  welcomeBackDescription: string;
  welcomeNew: string;
  welcomeNewDescription: string;
  dontHaveAccount: string;
  signUp: string;
  alreadyHaveAccount: string;
  signIn: string;
  forgotPassword: string;
  or: string;
  
  // Sort menu translations
  sortBy: string;
  orderByStatus: string;
  orderByAlpha: string;
  orderByResponseTime: string;
  orderByUptime: string;
  firstDown: string;
  alphabetical: string;
  uptimePercentage: string;
  
  // Loading and timeout messages
  loading: string;
  loadingServices: string;
  loadingData: string;
  timeout: string;
  connectionTimeout: string;
  requestTimeout: string;
  
  // Validation messages
  usernameRequired: string;
  usernameMinLength: string;
  passwordRequired: string;
  passwordMinLength: string;
  emailRequired: string;
  emailInvalid: string;
  
  // Terms and Privacy
  terms: string;
  privacy: string;
  termsTitle: string;
  privacyTitle: string;
  
  // Additional missing properties
  accountTitle: string;
  role: string;
  registeredAt: string;
  toPresent: string;
  to: string;
  // Reset password page
  resetPasswordTitle?: string;
  resetPasswordSubtitle?: string;
  newPassword?: string;
  confirmPassword?: string;
  showPassword?: string;
  hidePassword?: string;
  noValidToken?: string;
  requestNewReset?: string;
  updatePassword?: string;
  sending?: string;
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
  bank: 'Bank',
    shopping: 'Shopping',
    social: 'Social',
    music: 'Music',
    mail: 'Mail',
    various: 'Various',
    connection: 'Connection',
    browserai: 'Browser AI',
  cloud: 'Cloud',
  betting: 'Betting',
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
  // Info & Contacts page
  infoContactsSubtitle: 'Information about our service and how to contact us',
  supportTitle: 'Technical Support',
  supportText: 'For information and issues, write to our technical support team:',
  projectInfoTitle: 'Project Information',
  projectInfoText: 'If you have problems with an app or website, you can check here whether there are known issues.',
  teamTitle: 'Team',
  createdBy: 'Created by:',
  updatesSubtitle: 'Update history and what\'s new',
  versionLabel: 'Version',
    // Site updates content
    updatesList: [
      {
        version: '0.3.00',
        date: '12/20/2025',
        changes: [
          'Password recovery capability',
          'New site with a completely new design',
          'Automatic checks',
          'Many new servers',
          'Added MUSIC category',
          'More information about server status'
        ]
      },
      {
        version: 'MOBILE APP',
        date: '??/??/2027',
        changes: []
      }
    ],
    
    // Auth page translations
    username: 'Username',
    password: 'Password',
    email: 'Email',
    welcomeBack: 'WELCOME BACK!',
    welcomeBackDescription: 'We are happy to have you with us again. If you need anything, we are here to help.',
    welcomeNew: 'WELCOME!',
    welcomeNewDescription: 'We\'re delighted to have you here. If you need any assistance, feel free to reach out.',
    dontHaveAccount: 'Don\'t have an account?',
    signUp: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    forgotPassword: 'Forgot Password',
    or: 'or',
    
    // Sort menu translations
    sortBy: 'Sort by',
    orderByStatus: 'First down',
    orderByAlpha: 'Alphabetical order',
    orderByResponseTime: 'Response time',
    orderByUptime: 'Uptime %',
    firstDown: 'First down',
    alphabetical: 'Alphabetical order',
    uptimePercentage: 'Uptime %',
    
    // Loading and timeout messages
    loading: 'Loading...',
    loadingServices: 'Loading services...',
    loadingData: 'Loading data...',
    timeout: 'Timeout',
    connectionTimeout: 'Connection timeout',
    requestTimeout: 'Request timeout',
    
    // Validation messages
    usernameRequired: 'Username is required',
    usernameMinLength: 'Username must be at least 3 characters',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 6 characters',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email',
    
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
    },
    
    // Additional missing properties
    accountTitle: 'Your Account',
    role: 'Role',
    registeredAt: 'Registered on',
    toPresent: 'to present',
    to: 'to'
    ,
    // Reset password page
    resetPasswordTitle: 'Reset Password',
    resetPasswordSubtitle: 'Enter your new password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    noValidToken: 'Don\'t have a valid token?',
    requestNewReset: 'Request a new reset link',
    updatePassword: 'Update Password',
    sending: 'Sending...'
  },
  pt: {
    // Base translations
    settings: 'Configurações',
    settingsDescription: 'Gerencie suas preferências',
    updates: 'Atualizações',
    appName: 'Status do Servidor',
    version: 'v:',
    theme: 'Tema',
    language: 'Idioma',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
    favorites: 'Favoritos',
    noFavorites: 'Sem favoritos',
    addToFavorites: 'Adicionar aos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    
    // Languages
    english: 'Inglês',
    italian: 'Italiano',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
    chinese: 'Chinês',
    japanese: 'Japonês',
    portuguese: 'Português',
    russian: 'Russo',
    
    // Category translations
    games: 'Jogos',
    streaming: 'Streaming',
    banking: 'Bancos',
  bank: 'Banco',
    shopping: 'Compras',
    social: 'Social',
    music: 'Música',
    mail: 'Correio',
    various: 'Vários',
    connection: 'Conexão',
    browserai: 'Navegador IA',
    gaming: 'Jogos',
    productivity: 'Produtividade',
    education: 'Educação',
    technology: 'Tecnologia',
    entertainment: 'Entretenimento',
    financial: 'Financeiro',
    orderBy: 'Ordenar por',
    
    // UI Elements
    close: 'Fechar',
    register: 'Registrar',
    login: 'Entrar',
    logout: 'Sair',
    admin: 'Admin',
    search: 'Pesquisar',
    serverStatus: 'Status do Servidor',
    selectTheme: 'Selecione o tema',
    selectLanguage: 'Selecione o idioma',
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
    overview: 'Visão geral',
    viewDetails: 'Ver detalhes',
    backToDashboard: 'Voltar ao Painel',
    siteUpdates: 'Atualizações do Site',
    footerText: 'Feito com ❤️',
    currentStatus: 'Status Atual',
    categories: 'Categorias',
    uptime30d: 'Uptime 30 dias',
    lastOutage: 'Última indisponibilidade',
    avgResponse: 'Resposta média',
    uptimeHistory: 'Histórico de Uptime',
    recentIncidents: 'Incidentes Recentes',
    noHistoryAvailable: 'Sem histórico disponível',
    noIncidentsReported: 'Nenhum incidente reportado',
    noRecentOutages: 'Sem indisponibilidades recentes',
    overall: 'Geral',
    partialOutage: 'Indisponibilidade Parcial',
    searchServices: 'Pesquisar serviços',
    links: 'Links',
    viewFullHistory: 'Ver Histórico Completo',
    subscribeToUpdates: 'Assinar Atualizações',
    serviceDetails: 'Detalhes do Serviço',
    success: 'Sucesso',
    loggingOut: 'Saindo...',
    loggingIn: 'Entrando...',
    creatingAccount: 'Criando conta...',
    loginDescription: 'Entre para gerenciar serviços',
    
    // Interface translations
    showAllCategory: 'Mostrar todos os serviços de {{category}} ({{count}})',
    showLessCategory: 'Mostrar menos serviços',
    infoAndContacts: 'Informações e Contatos',
    expand: 'Expandir',
    collapse: 'Recolher',
  // Info & Contacts page
  infoContactsSubtitle: 'Informações sobre nosso serviço e como entrar em contato',
  supportTitle: 'Suporte Técnico',
  supportText: 'Para informações e problemas, escreva para nossa equipe de suporte técnico:',
  projectInfoTitle: 'Informações do Projeto',
  projectInfoText: 'Se você tiver problemas com algum app ou site, aqui você pode verificar se há problemas conhecidos.',
  teamTitle: 'Equipe',
  createdBy: 'Criado por:',
  updatesSubtitle: 'Histórico de atualizações e novidades',
  versionLabel: 'Versão',
    // Site updates content
    updatesList: [
      {
        version: '0.3.00',
        date: '20/12/2025',
        changes: [
          'Possibilidade de recuperação de senha',
          'Novo site com design totalmente novo',
          'Verificação automática',
          'Muitos novos servidores',
          'Adicionada categoria MÚSICA',
          'Muito mais informações sobre o status dos servidores'
        ]
      },
      {
        version: 'APP MÓVEL',
        date: '??/??/2027',
        changes: []
      }
    ],
    
    // Auth page translations
    username: 'Usuário',
    password: 'Senha',
    email: 'Email',
    welcomeBack: 'BEM-VINDO DE VOLTA!',
    welcomeBackDescription: 'Estamos felizes em tê-lo novamente. Se precisar de algo, estamos aqui para ajudar.',
    welcomeNew: 'BEM-VINDO!',
    welcomeNewDescription: 'Estamos felizes em tê-lo aqui. Se precisar de ajuda, fale conosco.',
    dontHaveAccount: 'Não tem uma conta?',
    signUp: 'Registrar-se',
    alreadyHaveAccount: 'Já tem uma conta?',
    signIn: 'Entrar',
    forgotPassword: 'Esqueceu a senha',
    or: 'ou',
    
    // Sort menu translations
    sortBy: 'Ordenar por',
    orderByStatus: 'Primeiro fora do ar',
    orderByAlpha: 'Ordem alfabética',
    orderByResponseTime: 'Tempo de resposta',
    orderByUptime: 'Uptime %',
    firstDown: 'Primeiro fora do ar',
    alphabetical: 'Ordem alfabética',
    uptimePercentage: 'Uptime %',
    
    // Loading and timeout messages
    loading: 'Carregando...',
    loadingServices: 'Carregando serviços...',
    loadingData: 'Carregando dados...',
    timeout: 'Tempo esgotado',
    connectionTimeout: 'Tempo de conexão esgotado',
    requestTimeout: 'Tempo de requisição esgotado',
    
    // Validation messages
    usernameRequired: 'Usuário é obrigatório',
    usernameMinLength: 'O usuário deve ter pelo menos 3 caracteres',
    passwordRequired: 'Senha é obrigatória',
    passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
    emailRequired: 'Email é obrigatório',
    emailInvalid: 'Email inválido',
    
    // Terms and Privacy
    terms: 'Termos',
    privacy: 'Privacidade',
    termsTitle: 'Termos de Serviço',
    privacyTitle: 'Política de Privacidade',
    termsContent: {
      welcome: 'Bem-vindo ao Server Status. Ao usar este serviço, você concorda com os seguintes termos e condições:',
      section1: {
        title: 'Aceitação dos Termos',
        content: 'Ao usar o Server Status, você concorda com estes termos de serviço. Se não aceitar, não utilize o serviço.'
      },
      section2: {
        title: 'Descrição do Serviço',
        content: 'O Server Status fornece monitoramento em tempo real do status de serviços. O serviço é fornecido "como está" e pode sofrer alterações ou interrupções.'
      },
      section3: {
        title: 'Responsabilidades do Usuário',
        content: 'Os usuários são responsáveis por manter a confidencialidade de suas informações de conta e por todas as atividades realizadas sob sua conta.'
      },
      section4: {
        title: 'Alterações nos Termos',
        content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. Os usuários serão notificados de quaisquer alterações.'
      }
    },
    privacyContent: {
      intro: 'Sua privacidade é importante para nós. Esta política explica como coletamos, usamos e protegemos suas informações pessoais.',
      section1: {
        title: 'Coleta de Informações',
        content: 'Coletamos informações necessárias para fornecer nosso serviço, incluindo, entre outras, endereços de e-mail e dados de uso.'
      },
      section2: {
        title: 'Uso das Informações',
        content: 'Usamos as informações coletadas para fornecer e melhorar nossos serviços, comunicar com os usuários e garantir a segurança.'
      },
      section3: {
        title: 'Proteção de Dados',
        content: 'Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso ou divulgação não autorizados.'
      },
      section4: {
        title: 'Seus Direitos',
        content: 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.'
      }
    },
    
    // Additional missing properties
    accountTitle: 'Sua Conta',
    role: 'Função',
    registeredAt: 'Registrado em',
    toPresent: 'até o presente',
    to: 'até',
    // Reset password page
    resetPasswordTitle: 'Redefinir Senha',
    resetPasswordSubtitle: 'Insira sua nova senha',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar senha',
    showPassword: 'Mostrar senha',
    hidePassword: 'Esconder senha',
    noValidToken: 'Não tem um token válido?',
    requestNewReset: 'Solicitar um novo link de redefinição',
    updatePassword: 'Atualizar Senha',
    sending: 'Enviando...'
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
  bank: 'Banca',
    shopping: 'Shopping',
    social: 'Social',
    music: 'Musica',
    mail: 'Posta',
    various: 'Vari',
    connection: 'Connessione',
    browserai: 'Browser AI',
  cloud: 'Cloud',
  betting: 'Scommesse',
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
  // Info & Contacts page
  infoContactsSubtitle: 'Informazioni sul nostro servizio e come contattarci',
  supportTitle: 'Supporto Tecnico',
  supportText: 'Per informazioni e problemi scrivere al nostro team di supporto tecnico:',
  projectInfoTitle: 'Informazioni sul progetto',
  projectInfoText: 'Se hai problemi con un\'app o un sito, qui puoi verificare se ci sono disservizi noti.',
  teamTitle: 'Team',
  createdBy: 'Creato da:',
  updatesSubtitle: 'Cronologia degli aggiornamenti e delle novità',
  versionLabel: 'Versione',
    // Site updates content
    updatesList: [
      {
        version: '0.3.00',
        date: '20/12/2025',
        changes: [
          'Possibilità di recupero password',
          'Nuovo sito con grafica completamente nuova',
          'Controllo automatico',
          'Molti nuovi server',
          'Aggiunta categoria MUSICA',
          'Molte più informazioni sullo stato dei server'
        ]
      },
      {
        version: 'APP MOBILE',
        date: '??/??/2027',
        changes: []
      }
    ],
    
    // Auth page translations
    username: 'Nome utente',
    password: 'Password',
    email: 'Email',
    welcomeBack: 'BENTORNATO!',
    welcomeBackDescription: 'Siamo felici di averti di nuovo con noi. Se hai bisogno di qualcosa, siamo qui per aiutarti.',
    welcomeNew: 'BENVENUTO!',
    welcomeNewDescription: 'Siamo felici di averti qui. Se hai bisogno di assistenza, non esitare a contattarci.',
    dontHaveAccount: 'Non hai un account?',
    signUp: 'Registrati',
    alreadyHaveAccount: 'Hai già un account?',
    signIn: 'Accedi',
    forgotPassword: 'Recupera password',
    or: 'oppure',
    
    // Sort menu translations
    sortBy: 'Ordina per',
    orderByStatus: 'Prima i down',
    orderByAlpha: 'Ordine alfabetico',
    orderByResponseTime: 'Tempo di risposta',
    orderByUptime: 'Uptime %',
    firstDown: 'Prima i down',
    alphabetical: 'Ordine alfabetico',
    uptimePercentage: 'Uptime %',
    
    // Loading and timeout messages
    loading: 'Caricamento...',
    loadingServices: 'Caricamento servizi...',
    loadingData: 'Caricamento dati...',
    timeout: 'Timeout',
    connectionTimeout: 'Timeout di connessione',
    requestTimeout: 'Timeout richiesta',
    
    // Validation messages
    usernameRequired: 'Nome utente richiesto',
    usernameMinLength: 'Il nome utente deve essere almeno 3 caratteri',
    passwordRequired: 'Password richiesta',
    passwordMinLength: 'La password deve essere almeno 6 caratteri',
    emailRequired: 'Email richiesta',
    emailInvalid: 'Email non valida',
    
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
    },
    
    // Additional missing properties
    accountTitle: 'Il tuo Account',
    role: 'Ruolo',
    registeredAt: 'Registrato il',
    toPresent: 'ad oggi',
    to: 'a'
    ,
    // Reset password page
    resetPasswordTitle: 'Reset Password',
    resetPasswordSubtitle: 'Inserisci la nuova password',
    newPassword: 'Nuova password',
    confirmPassword: 'Conferma password',
    showPassword: 'Mostra password',
    hidePassword: 'Nascondi password',
    noValidToken: 'Non hai un token valido?',
    requestNewReset: 'Richiedi un nuovo link di reset',
    updatePassword: 'Aggiorna Password',
    sending: 'Invio...'
  },
  ru: {
    // Base translations
    settings: 'Настройки',
    settingsDescription: 'Настройте внешний вид, изменив тему и язык',
    updates: 'Обновления',
    appName: 'Статус Сервера',
    version: 'в:',
    theme: 'Тема',
    language: 'Язык',
    system: 'Система',
    light: 'Светлая',
    dark: 'Темная',
    favorites: 'Избранное',
    noFavorites: 'Нет добавленных в избранное',
    addToFavorites: 'Добавить в избранное',
    removeFromFavorites: 'Удалить из избранного',
    
    // Languages
    english: 'Английский',
    italian: 'Итальянский',
    spanish: 'Испанский',
    french: 'Французский',
    german: 'Немецкий',
    chinese: 'Китайский',
    japanese: 'Японский',
    portuguese: 'Португальский',
    russian: 'Русский',
    
    // Category translations
    games: 'Игры',
    streaming: 'Стриминг',
    banking: 'Банкинг',
  bank: 'Банк',
    shopping: 'Покупки',
    social: 'Социальные сети',
    music: 'Музыка',
    mail: 'Почта',
    various: 'Разное',
    connection: 'Подключение',
    browserai: 'Браузер ИИ',
    gaming: 'Игры',
    productivity: 'Продуктивность',
    education: 'Образование',
    technology: 'Технологии',
    entertainment: 'Развлечения',
    financial: 'Финансы',
    orderBy: 'Упорядочить по',
    
    // UI Elements
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
    overview: 'Обзор',
    viewDetails: 'Подробнее',
    backToDashboard: 'Вернуться на панель',
    siteUpdates: 'Обновления сайта',
    footerText: 'Сделано с ❤️',
    currentStatus: 'Текущий статус',
    categories: 'Категории',
    uptime30d: 'Время работы 30 дней',
    lastOutage: 'Последний сбой',
    avgResponse: 'Средний отзыв',
    uptimeHistory: 'История работы',
    recentIncidents: 'Последние инциденты',
    noHistoryAvailable: 'История недоступна',
    noIncidentsReported: 'Инцидентов не зарегистрировано',
    noRecentOutages: 'Недавних сбоев нет',
    overall: 'Общий',
    partialOutage: 'Частичный сбой',
    searchServices: 'Поиск сервисов',
    links: 'Ссылки',
    viewFullHistory: 'Посмотреть полную историю',
    subscribeToUpdates: 'Подписаться на обновления',
    serviceDetails: 'Детали сервиса',
    success: 'Успех',
    loggingOut: 'Выход из системы...',
    loggingIn: 'Вход в систему...',
    creatingAccount: 'Создание аккаунта...',
    loginDescription: 'Войдите для управления сервисами',
    
    // Interface translations
    showAllCategory: 'Показать все сервисы {{category}} ({{count}})',
    showLessCategory: 'Показать меньше сервисов',
    infoAndContacts: 'Информация и контакты',
    expand: 'Развернуть',
    collapse: 'Свернуть',
  // Info & Contacts page
  infoContactsSubtitle: 'Информация о нашем сервисе и как с нами связаться',
  supportTitle: 'Техническая поддержка',
  supportText: 'По вопросам и проблемам пишите в нашу службу технической поддержки:',
  projectInfoTitle: 'Информация о проекте',
  projectInfoText: 'Если у вас есть проблемы с приложением или сайтом, здесь вы можете проверить наличие известных сбоев.',
  teamTitle: 'Команда',
  createdBy: 'Создано:',
  updatesSubtitle: 'История обновлений и нововведений',
  versionLabel: 'Версия',
    // Site updates content
    updatesList: [
      {
        version: '0.3.00',
        date: '20/12/2025',
        changes: [
          'Возможность восстановления пароля',
          'Новый сайт с полностью обновленным дизайном',
          'Автоматические проверки',
          'Много новых серверов',
          'Добавлена категория МУЗЫКА',
          'Больше информации о состоянии серверов'
        ]
      },
      {
        version: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
        date: '??/??/2027',
        changes: []
      }
    ],
    
    // Auth page translations
    username: 'Имя пользователя',
    password: 'Пароль',
    email: 'Электронная почта',
    welcomeBack: 'ДОБРО ПОЖАЛОВАТЬ ОБРАТНО!',
    welcomeBackDescription: 'Мы рады видеть вас снова с нами. Если вам что-то нужно, мы здесь, чтобы помочь.',
    welcomeNew: 'ДОБРО ПОЖАЛОВАТЬ!',
    welcomeNewDescription: 'Мы рады видеть вас здесь. Если вам нужна помощь, не стесняйтесь обращаться.',
    dontHaveAccount: 'Нет аккаунта?',
    signUp: 'Зарегистрироваться',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    signIn: 'Войти',
    forgotPassword: 'Забыли пароль',
    or: 'или',
    
    // Sort menu translations
    sortBy: 'Сортировать по',
    orderByStatus: 'Сначала неработающие',
    orderByAlpha: 'По алфавиту',
    orderByResponseTime: 'Время отклика',
    orderByUptime: 'Время работы %',
    firstDown: 'Сначала неработающие',
    alphabetical: 'По алфавиту',
    uptimePercentage: 'Время работы %',
    
    // Loading and timeout messages
    loading: 'Загрузка...',
    loadingServices: 'Загрузка сервисов...',
    loadingData: 'Загрузка данных...',
    timeout: 'Тайм-аут',
    connectionTimeout: 'Тайм-аут подключения',
    requestTimeout: 'Тайм-аут запроса',
    
    // Validation messages
    usernameRequired: 'Требуется имя пользователя',
    usernameMinLength: 'Имя пользователя должно содержать не менее 3 символов',
    passwordRequired: 'Требуется пароль',
    passwordMinLength: 'Пароль должен содержать не менее 6 символов',
    emailRequired: 'Требуется электронная почта',
    emailInvalid: 'Неверный адрес электронной почты',
    
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
        content: 'Server Status предоставляет мониторинг состояния сервисов в реальном времени. Сервис предоставляется "как есть" и может изменяться или прерываться.'
      },
      section3: {
        title: 'Ответственность пользователей',
        content: 'Пользователи несут ответственность за сохранение конфиденциальности информации своего аккаунта и за все действия, которые происходят под их аккаунтом.'
      },
      section4: {
        title: 'Изменения условий',
        content: 'Мы оставляем за собой право изменять эти условия в любое время. Пользователи будут уведомлены о любых изменениях.'
      }
    },
    privacyContent: {
      intro: 'Ваша конфиденциальность важна для нас. Эта политика объясняет, как мы собираем, используем и защищаем вашу личную информацию.',
      section1: {
        title: 'Сбор информации',
        content: 'Мы собираем информацию, необходимую для предоставления нашего сервиса, включая, но не ограничиваясь, адреса электронной почты и данные об использовании.'
      },
      section2: {
        title: 'Использование информации',
        content: 'Мы используем собранную информацию для предоставления и улучшения наших сервисов, общения с пользователями и обеспечения безопасности.'
      },
      section3: {
        title: 'Защита данных',
        content: 'Мы внедряем соответствующие меры безопасности для защиты вашей информации от несанкционированного доступа или раскрытия.'
      },
      section4: {
        title: 'Ваши права',
        content: 'У вас есть право получить доступ, исправить или удалить вашу личную информацию в любое время.'
      }
    },
    
    // Additional missing properties
    accountTitle: 'Ваш аккаунт',
    role: 'Роль',
    registeredAt: 'Зарегистрирован',
    toPresent: 'по настоящее время',
    to: 'до'
    ,
    // Reset password page
    resetPasswordTitle: 'Сброс пароля',
    resetPasswordSubtitle: 'Введите новый пароль',
    newPassword: 'Новый пароль',
    confirmPassword: 'Подтвердите пароль',
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль',
    noValidToken: 'Нет действительного токена?',
    requestNewReset: 'Запросить новую ссылку для сброса',
    updatePassword: 'Обновить пароль',
    sending: 'Отправка...'
  }
};

// Add locales using English as a base and overriding the keys we use in sidebar, pages and search
translations.es = {
  ...translations.en,
  appName: 'Estado del Servidor',
  // Base / UI
  updates: 'Actualizaciones',
  serverStatus: 'Estado del Servidor',
  categories: 'Categorías',
  links: 'Enlaces',
  overall: 'General',
  partialOutage: 'Interrupción parcial',
  lastCheck: 'Última comprobación',
  operational: 'Operativo',
  degraded: 'Degradado',
  siteUpdates: 'Actualizaciones del Sitio',
  infoAndContacts: 'Información y Contactos',
  backToDashboard: 'Volver al Panel',
  // Search
  searchServices: 'Buscar servicios',
  // Categories
  games: 'Juegos',
  streaming: 'Streaming',
  banking: 'Banca',
  bank: 'Banco',
  shopping: 'Compras',
  social: 'Redes sociales',
  mail: 'Correo',
  various: 'Varios',
  connection: 'Conexión',
  browserai: 'Navegador IA',
  music: 'Música',
  gaming: 'Juegos',
  productivity: 'Productividad',
  education: 'Educación',
  technology: 'Tecnología',
  entertainment: 'Entretenimiento',
  financial: 'Finanzas',
  orderBy: 'Ordenar por',
  terms: 'Términos',
  privacy: 'Privacidad',
  termsTitle: 'Términos del servicio',
  privacyTitle: 'Política de privacidad',
  // Info & Contacts page
  infoContactsSubtitle: 'Información sobre nuestro servicio y cómo contactarnos',
  supportTitle: 'Soporte técnico',
  supportText: 'Para información y problemas, escribe a nuestro equipo de soporte técnico:',
  projectInfoTitle: 'Información del proyecto',
  projectInfoText: 'Si tienes problemas con alguna app o sitio, aquí puedes comprobar si hay incidencias conocidas.',
  teamTitle: 'Equipo',
  createdBy: 'Creado por:',
  // Site Updates page
  updatesSubtitle: 'Historial de actualizaciones y novedades',
  versionLabel: 'Versión',
  updatesList: [
    {
      version: '0.3.00',
      date: '20/12/2025',
      changes: [
        'Posibilidad de recuperar la contraseña',
        'Nuevo sitio con un diseño completamente nuevo',
        'Comprobación automática',
        'Muchos servidores nuevos',
        'Añadida categoría MÚSICA',
        'Mucha más información sobre el estado de los servidores'
      ]
    },
    { version: 'APP MÓVIL', date: '??/??/2027', changes: [] }
  ]
};

translations.fr = {
  ...translations.en,
  appName: 'État des serveurs',
  updates: 'Mises à jour',
  serverStatus: 'État des serveurs',
  categories: 'Catégories',
  links: 'Liens',
  overall: 'Général',
  partialOutage: 'Panne partielle',
  lastCheck: 'Dernière vérification',
  operational: 'Opérationnel',
  degraded: 'Dégradé',
  siteUpdates: 'Mises à jour du site',
  infoAndContacts: 'Infos & Contacts',
  backToDashboard: 'Retour au tableau de bord',
  searchServices: 'Rechercher des services',
  games: 'Jeux',
  streaming: 'Streaming',
  banking: 'Banque',
  bank: 'Banque',
  shopping: 'Achats',
  social: 'Réseaux sociaux',
  mail: 'Courriel',
  various: 'Divers',
  connection: 'Connexion',
  browserai: 'Navigateur IA',
  music: 'Musique',
  gaming: 'Jeux',
  productivity: 'Productivité',
  education: 'Éducation',
  technology: 'Technologie',
  entertainment: 'Divertissement',
  financial: 'Finance',
  orderBy: 'Trier par',
  terms: 'Conditions',
  privacy: 'Confidentialité',
  termsTitle: 'Conditions d’utilisation',
  privacyTitle: 'Politique de confidentialité',
  infoContactsSubtitle: 'Informations sur notre service et comment nous contacter',
  supportTitle: 'Support technique',
  supportText: 'Pour toute information ou problème, écrivez à notre équipe de support technique :',
  projectInfoTitle: 'Informations sur le projet',
  projectInfoText: 'Si vous avez des problèmes avec une application ou un site, vous pouvez vérifier ici s’il y a des incidents connus.',
  teamTitle: 'Équipe',
  createdBy: 'Créé par :',
  updatesSubtitle: 'Historique des mises à jour et nouveautés',
  versionLabel: 'Version',
  updatesList: [
    {
      version: '0.3.00',
      date: '20/12/2025',
      changes: [
        'Fonction de récupération de mot de passe',
        'Nouveau site avec une toute nouvelle interface',
        'Contrôles automatiques',
        'De nombreux nouveaux serveurs',
        'Ajout de la catégorie MUSIQUE',
        'Davantage d’informations sur l’état des serveurs'
      ]
    },
    { version: 'APPLICATION MOBILE', date: '??/??/2027', changes: [] }
  ]
};

translations.de = {
  ...translations.en,
  appName: 'Serverstatus',
  updates: 'Aktualisierungen',
  serverStatus: 'Serverstatus',
  categories: 'Kategorien',
  links: 'Links',
  overall: 'Gesamt',
  partialOutage: 'Teilweise Störung',
  lastCheck: 'Letzte Prüfung',
  operational: 'Betriebsbereit',
  degraded: 'Eingeschränkt',
  siteUpdates: 'Website-Aktualisierungen',
  infoAndContacts: 'Info & Kontakte',
  backToDashboard: 'Zurück zum Dashboard',
  searchServices: 'Dienste suchen',
  games: 'Spiele',
  streaming: 'Streaming',
  banking: 'Banken',
  bank: 'Bank',
  shopping: 'Einkaufen',
  social: 'Soziale Netzwerke',
  mail: 'E-Mail',
  various: 'Verschiedenes',
  connection: 'Verbindung',
  browserai: 'KI-Browser',
  music: 'Musik',
  gaming: 'Spiele',
  productivity: 'Produktivität',
  education: 'Bildung',
  technology: 'Technologie',
  entertainment: 'Unterhaltung',
  financial: 'Finanzen',
  orderBy: 'Sortieren nach',
  terms: 'Nutzungsbedingungen',
  privacy: 'Datenschutz',
  termsTitle: 'Nutzungsbedingungen',
  privacyTitle: 'Datenschutzerklärung',
  infoContactsSubtitle: 'Informationen zu unserem Service und wie Sie uns kontaktieren',
  supportTitle: 'Technischer Support',
  supportText: 'Für Informationen und Probleme wenden Sie sich an unser Support-Team:',
  projectInfoTitle: 'Projektinformationen',
  projectInfoText: 'Wenn Sie Probleme mit einer App oder Website haben, können Sie hier prüfen, ob bekannte Störungen vorliegen.',
  teamTitle: 'Team',
  createdBy: 'Erstellt von:',
  updatesSubtitle: 'Änderungsverlauf und Neuigkeiten',
  versionLabel: 'Version',
  updatesList: [
    {
      version: '0.3.00',
      date: '20/12/2025',
      changes: [
        'Möglichkeit zur Passwortwiederherstellung',
        'Neue Website mit komplett neuem Design',
        'Automatische Prüfungen',
        'Viele neue Server',
        'Kategorie MUSIK hinzugefügt',
        'Mehr Informationen zum Serverstatus'
      ]
    },
    { version: 'MOBILE APP', date: '??/??/2027', changes: [] }
  ]
};

translations.zh = {
  ...translations.en,
  appName: '服务器状态',
  updates: '更新',
  serverStatus: '服务器状态',
  categories: '类别',
  links: '链接',
  overall: '总体',
  partialOutage: '部分中断',
  lastCheck: '上次检查',
  operational: '正常',
  degraded: '降级',
  siteUpdates: '网站更新',
  infoAndContacts: '信息与联系',
  backToDashboard: '返回仪表板',
  searchServices: '搜索服务',
  games: '游戏',
  streaming: '流媒体',
  banking: '银行',
  bank: '银行',
  shopping: '购物',
  social: '社交',
  mail: '邮件',
  various: '其他',
  connection: '连接',
  browserai: '浏览器 AI',
  music: '音乐',
  gaming: '游戏',
  productivity: '效率',
  education: '教育',
  technology: '技术',
  entertainment: '娱乐',
  financial: '金融',
  orderBy: '排序方式',
  terms: '条款',
  privacy: '隐私',
  termsTitle: '服务条款',
  privacyTitle: '隐私政策',
  infoContactsSubtitle: '关于我们的服务以及如何联系到我们',
  supportTitle: '技术支持',
  supportText: '如需信息或遇到问题，请联系技术支持团队：',
  projectInfoTitle: '项目信息',
  projectInfoText: '如果你在某个应用或网站遇到问题，可在此查看是否存在已知故障。',
  teamTitle: '团队',
  createdBy: '创建者：',
  updatesSubtitle: '更新历史与新内容',
  versionLabel: '版本',
  updatesList: [
    {
      version: '0.3.00',
      date: '2025/12/20',
      changes: [
        '支持找回密码',
        '全新设计的网站',
        '自动检查',
        '新增大量服务器',
        '新增“音乐”分类',
        '更多服务器状态信息'
      ]
    },
    { version: '移动应用', date: '??/??/2027', changes: [] }
  ]
};

translations.ja = {
  ...translations.en,
  appName: 'サーバーステータス',
  updates: '更新',
  serverStatus: 'サーバーステータス',
  categories: 'カテゴリー',
  links: 'リンク',
  overall: '全体',
  partialOutage: '一部障害',
  lastCheck: '最終チェック',
  operational: '稼働中',
  degraded: '低下',
  siteUpdates: 'サイト更新',
  infoAndContacts: '情報と連絡先',
  backToDashboard: 'ダッシュボードに戻る',
  searchServices: 'サービスを検索',
  games: 'ゲーム',
  streaming: 'ストリーミング',
  banking: '銀行',
  bank: '銀行',
  shopping: 'ショッピング',
  social: 'ソーシャル',
  mail: 'メール',
  various: 'その他',
  connection: '接続',
  browserai: 'ブラウザー AI',
  music: '音楽',
  gaming: 'ゲーム',
  productivity: '生産性',
  education: '教育',
  technology: 'テクノロジー',
  entertainment: 'エンタメ',
  financial: '金融',
  orderBy: '並び替え',
  terms: '利用規約',
  privacy: 'プライバシー',
  termsTitle: '利用規約',
  privacyTitle: 'プライバシーポリシー',
  infoContactsSubtitle: 'サービス情報とお問い合わせ方法',
  supportTitle: 'テクニカルサポート',
  supportText: 'ご案内や不具合はサポートチームまでご連絡ください：',
  projectInfoTitle: 'プロジェクト情報',
  projectInfoText: 'アプリやサイトに問題がある場合、ここで既知の障害がないか確認できます。',
  teamTitle: 'チーム',
  createdBy: '作成者：',
  updatesSubtitle: '更新履歴と新機能',
  versionLabel: 'バージョン',
  updatesList: [
    {
      version: '0.3.00',
      date: '2025/12/20',
      changes: [
        'パスワード復旧機能',
        '完全に新しいデザインのサイト',
        '自動チェック',
        '多数の新しいサーバー',
        '「音楽」カテゴリを追加',
        'サーバーステータスの情報をさらに充実'
      ]
    },
    { version: 'モバイルアプリ', date: '??/??/2027', changes: [] }
  ]
};