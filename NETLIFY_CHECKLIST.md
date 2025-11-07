# Checklist Deploy Netlify

Usa questo file per verificare che tutto sia configurato correttamente prima del deploy.

## ✅ File di Configurazione

- [x] `netlify.toml` - Configurazione principale Netlify
- [x] `client/public/_redirects` - Backup redirect rules
- [x] `.nvmrc` - Versione Node.js (20)
- [x] `.gitignore` - Include `.netlify`

## ✅ Configurazione Build

- [x] Base directory: `client/`
- [x] Build command: `npm run build`
- [x] Publish directory: `dist`
- [x] Node version: 20

## ✅ Scripts NPM

Root `package.json`:
- [x] `build:client:netlify` - Build ottimizzato per Netlify

Client `package.json`:
- [x] `build` - Build standard
- [x] `build:netlify` - Build per Netlify
- [x] `preview` - Preview locale

## ✅ Vite Configuration

- [x] Base path: `/` (per Netlify)
- [x] Rilevamento ambiente Netlify
- [x] Plugin React configurato
- [x] Alias path configurati

## ✅ Redirect Rules

Nel `netlify.toml`:
- [x] SPA routing: `/* -> /index.html` (status 200)
- [x] Tutte le route vanno a index.html per il routing client-side

## ✅ Headers Sicurezza

- [x] X-Frame-Options
- [x] X-Content-Type-Options
- [x] X-XSS-Protection
- [x] Referrer-Policy

## ✅ Cache Strategy

- [x] Asset statici: 1 anno (immutable)
- [x] Immagini: 1 anno (immutable)
- [x] index.html: no cache (must-revalidate)

## 🧪 Test Locale

Prima di fare il deploy, testa la build in locale:

```powershell
# PowerShell
.\test-netlify-build.ps1

# Oppure manualmente
cd client
npm install
npm run build
npm run preview
```

## 🚀 Deploy Options

### Opzione 1: Deploy Automatico (Consigliato)

1. Push il codice su GitHub/GitLab/Bitbucket
2. Vai su https://app.netlify.com/
3. "Add new site" → "Import an existing project"
4. Seleziona il tuo repository
5. Netlify rileverà automaticamente le configurazioni
6. Clicca "Deploy site"

### Opzione 2: Deploy Manuale (Drag & Drop)

1. Esegui `.\test-netlify-build.ps1` o `cd client && npm run build`
2. Vai su https://app.netlify.com/drop
3. Trascina la cartella `client/dist` sul sito

### Opzione 3: Netlify CLI

```powershell
# Installa CLI (una volta)
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=client/dist
```

## 🔍 Verifica Post-Deploy

Dopo il deploy, verifica:

- [ ] Homepage si carica correttamente
- [ ] Routing funziona (prova ad andare su una route diretta)
- [ ] Asset statici si caricano
- [ ] Immagini si caricano
- [ ] Nessun errore 404 in console
- [ ] API calls funzionano (se applicabile)

## 📝 Variabili d'Ambiente

Se hai bisogno di variabili d'ambiente:

1. Vai su Site settings → Build & deploy → Environment
2. Aggiungi le tue variabili:
   - `VITE_API_URL` - URL della tua API (se diversa)
   - `VITE_SITE_URL` - URL del sito
   - Altre variabili necessarie...

## 🐛 Troubleshooting

### Build fallisce

```powershell
# Pulisci cache e riprova
cd client
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force dist
npm install
npm run build
```

### Route 404

✅ Già risolto con `netlify.toml` redirect rules

### Asset non si caricano

- Verifica che `vite.config.ts` abbia `base: "/"`
- Controlla i percorsi degli import in CSS/JS

### Deploy lento

- Netlify offre deploy istantanei (~2-3 min)
- Se più lento, controlla dimensione bundle con `npm run build:analyze`

## 📊 Monitoring

Dopo il deploy, monitora:

- 📈 Analytics di Netlify
- 🔍 Build logs
- 🌐 Deploy history
- ⚡ Performance metrics

## 🎯 Prossimi Passi

1. [ ] Configurare dominio personalizzato
2. [ ] Abilitare HTTPS automatico (già attivo di default)
3. [ ] Configurare deploy preview per PR
4. [ ] Abilitare form submissions (se necessario)
5. [ ] Configurare Netlify Functions (per API serverless, opzionale)

## ✨ Features Netlify

- ⚡ CDN globale
- 🔒 HTTPS automatico
- 🔄 Continuous deployment
- 🌍 Deploy preview per ogni branch
- 📊 Analytics integrato
- 📧 Form handling
- ⚡ Serverless functions
- 🔐 Identity & Access control

## 🆘 Link Utili

- [Netlify Docs](https://docs.netlify.com/)
- [Deploy Settings](https://app.netlify.com/)
- [Build Plugins](https://docs.netlify.com/configure-builds/build-plugins/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)
