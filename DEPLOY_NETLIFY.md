# Deploy su Netlify

Questo progetto è configurato per il deployment su Netlify.

## Configurazione Rapida

### 1. Collegare il repository a Netlify

1. Vai su [Netlify](https://app.netlify.com/)
2. Clicca su "Add new site" → "Import an existing project"
3. Scegli il tuo provider Git (GitHub, GitLab, Bitbucket)
4. Seleziona questo repository
5. Netlify rileverà automaticamente le impostazioni dal file `netlify.toml`

### 2. Configurazione Build (già gestita dal netlify.toml)

Le seguenti impostazioni sono già configurate:

- **Build command**: `npm install && npm run build:client`
- **Publish directory**: `client/dist`
- **Node version**: 20

**Nota Importante**: Il build usa il `package.json` della root (non quello in `client/`) perché contiene tutte le dipendenze necessarie.

### 3. Deploy Manuale (opzionale)

Se preferisci fare deploy manualmente:

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build locale
cd client
npm install
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Funzionalità Configurate

✅ **SPA Routing**: Tutte le route vengono reindirizzate a `index.html` per il routing client-side

✅ **Cache Ottimizzata**: 
- Asset statici: cache 1 anno
- index.html: no cache (sempre aggiornato)

✅ **Headers di Sicurezza**:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

✅ **Performance**: Compressione automatica e CDN globale

## Build Locali

Per testare la build in locale:

```bash
# Dalla root del progetto
cd client
npm install
npm run build

# Preview
npm run preview
```

## Variabili d'Ambiente

Se hai bisogno di variabili d'ambiente su Netlify:

1. Vai su Site settings → Build & deploy → Environment
2. Aggiungi le variabili necessarie (es: API_URL, DATABASE_URL, ecc.)

## Troubleshooting

### Errore 404 su route dirette

✅ Risolto: Il file `netlify.toml` include già le regole di redirect

### Build fallisce

- Verifica che `client/package.json` abbia tutte le dipendenze
- Controlla i log di build su Netlify dashboard
- Assicurati che la versione di Node sia compatibile (v18)

### Asset non caricano

- Verifica il percorso base in `vite.config.ts`
- Per Netlify deve essere `base: "/"`

## Continuous Deployment

Netlify effettuerà automaticamente il deploy ad ogni push su:
- **Branch main**: Production deploy
- **Altri branch**: Preview deploy (con URL unico)

## URL del Sito

Dopo il primo deploy, Netlify ti fornirà:
- Un URL temporaneo: `https://random-name-123456.netlify.app`
- Puoi personalizzarlo in: Site settings → Domain management

## Monitoraggio

Netlify fornisce:
- 📊 Analytics del sito
- 🔍 Log di build
- 📈 Deploy history
- 🌐 Form submissions (se usi form)

## Note

- Il file `client/public/_redirects` è un backup, ma `netlify.toml` ha priorità
- Netlify offre 100GB di bandwidth gratuito al mese
- Deploy istantanei (~2-3 minuti)
