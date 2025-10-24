# Server Status Monitor

Sistema di monitoraggio dello stato dei servizi con interfaccia web moderna e sistema di autenticazione.

## 🚀 Deploy su Railway

### Prerequisiti
- Account Railway
- Database PostgreSQL (fornito da Railway)

### Istruzioni di Deploy

1. **Crea un nuovo progetto su Railway**
   - Vai su [Railway.app](https://railway.app)
   - Clicca su "New Project"
   - Seleziona "Deploy from GitHub repo"
   - Autorizza Railway ad accedere al tuo repository

2. **Aggiungi un Database PostgreSQL**
   - Nel tuo progetto Railway, clicca su "+ New"
   - Seleziona "Database" > "PostgreSQL"
   - Railway genererà automaticamente `DATABASE_URL`

3. **Configura le Variabili d'Ambiente**
   
   Nel pannello "Variables" del tuo servizio, aggiungi:

   ```bash
   NODE_ENV=production
   BASE_URL=https://your-app.railway.app
   CORS_ORIGINS=https://your-app.railway.app
   
   # Configurazione SMTP (per reset password)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=tua-email@gmail.com
   SMTP_PASS=tua-app-password
   
   # Session Secret (genera una stringa casuale sicura)
   SESSION_SECRET=your-random-secret-key-change-this
   ```

   **Nota:** `DATABASE_URL` e `PORT` sono settate automaticamente da Railway.

4. **Deploy Automatico**
   - Railway eseguirà automaticamente:
     - `npm ci` per installare le dipendenze
     - `npm run build` per compilare client e server
     - `npm start` per avviare l'applicazione

5. **Primo Accesso**
   - Dopo il deploy, apri l'URL fornito da Railway
   - Crea il primo utente admin tramite la pagina di registrazione

### File di Configurazione Railway

Il progetto include i seguenti file per Railway:

- `railway.json` - Configurazione principale di Railway
- `nixpacks.toml` - Configurazione del build system
- `Procfile` - Comando di avvio dell'applicazione

### 🔧 Comandi Disponibili

```bash
# Sviluppo locale
npm run dev              # Avvia server e client in sviluppo
npm run dev:server       # Solo server
npm run dev:client       # Solo client

# Build
npm run build            # Build completo (client + server)
npm run build:client     # Solo client
npm run build:server     # Solo server

# Produzione
npm start                # Avvia l'app compilata

# Database
npm run db:push          # Applica le migrazioni
npm run seed             # Popola il database con dati iniziali
```

### 📁 Struttura del Progetto

```
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── components/  # Componenti React
│   │   ├── pages/       # Pagine dell'applicazione
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilità e configurazioni
│   └── dist/            # Build del client
├── server/              # Backend Express + TypeScript
│   ├── index.ts         # Entry point del server
│   ├── routes.ts        # Route API
│   ├── auth.ts          # Sistema di autenticazione
│   ├── db.ts            # Configurazione database
│   └── shared/
│       └── schema.ts    # Schema database Drizzle
└── dist/                # Build del server
```

### 🛠️ Tecnologie Utilizzate

**Frontend:**
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- Tanstack Query
- Wouter (routing)

**Backend:**
- Node.js
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Passport.js (autenticazione)
- Nodemailer (email)

### 🔐 Sicurezza

- Autenticazione basata su sessioni
- Password hashate con bcrypt
- CORS configurato
- Session secret per produzione
- Rate limiting (consigliato)

### 📧 Configurazione Email (Gmail)

1. Attiva la verifica in 2 passaggi sul tuo account Google
2. Genera una password per le app:
   - Vai su https://myaccount.google.com/security
   - Clicca su "Password per le app"
   - Seleziona "Mail" e il tuo dispositivo
   - Copia la password generata
3. Usa questa password in `SMTP_PASS`

### 🐛 Troubleshooting

**Errore di connessione al database:**
- Verifica che `DATABASE_URL` sia configurato correttamente
- Controlla che il database PostgreSQL sia attivo su Railway

**Errore CORS:**
- Assicurati che `CORS_ORIGINS` includa l'URL della tua app
- Verifica che `BASE_URL` sia corretto

**Errore di build:**
- Controlla i log di Railway
- Verifica che tutte le dipendenze siano in `package.json`

### 📝 Licenza

MIT

### 🤝 Contributi

I contributi sono benvenuti! Apri una issue o una pull request.

---

Sviluppato con ❤️ usando React, TypeScript e Express
