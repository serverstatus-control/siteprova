# 🚀 Quick Start - Deploy su Netlify

## ⚡ Deploy Rapido (3 Minuti)

### Metodo 1: Connetti Repository (Consigliato) ⭐

1. **Push su Git** (se non l'hai già fatto)
   ```powershell
   git add .
   git commit -m "Add Netlify configuration"
   git push
   ```

2. **Vai su Netlify**
   - Apri: https://app.netlify.com/
   - Login con GitHub/GitLab/Bitbucket

3. **Importa Progetto**
   - Click "Add new site" → "Import an existing project"
   - Scegli il tuo provider Git
   - Seleziona il repository `siteprova`

4. **Conferma Impostazioni**
   - Netlify rileverà automaticamente le impostazioni da `netlify.toml`:
     - Build command: `npm install && npm run build:client`
     - Publish directory: `client/dist`
   - Click "Deploy site"

5. **✅ Fatto!**
   - Il sito sarà online in ~2-3 minuti
   - URL: `https://[random-name].netlify.app`

### Metodo 2: Deploy Manuale (Drag & Drop) 📦

1. **Build Locale**
   ```powershell
   cd client
   npm install
   npm run build
   ```

2. **Upload**
   - Vai su: https://app.netlify.com/drop
   - Trascina la cartella `client/dist` sulla pagina

3. **✅ Fatto!**
   - Sito online immediatamente

### Metodo 3: CLI (Per Sviluppatori) 💻

```powershell
# Installa CLI (una volta)
npm install -g netlify-cli

# Login
netlify login

# Build e Deploy
cd client
npm run build
netlify deploy --prod --dir=dist
```

## 🎯 Cosa Succede Durante il Deploy

1. ⬇️ Netlify clona il tuo repository
2. 📦 Installa le dipendenze (`npm install`)
3. 🔨 Esegue il build (`npm run build`)
4. 🚀 Carica i file su CDN globale
5. ✅ Sito online!

## 🌐 Dopo il Deploy

Il tuo sito sarà disponibile su:
- **URL temporaneo**: `https://[random-name].netlify.app`
- **Personalizzabile**: Vai su Site settings → Domain management

## 🔧 Impostazioni Avanzate (Opzionale)

### Variabili d'Ambiente

Se hai bisogno di API keys o configurazioni:

1. Vai su: Site settings → Build & deploy → Environment
2. Aggiungi variabili:
   - `VITE_API_URL` = URL della tua API
   - Altre variabili...

### Custom Domain

1. Site settings → Domain management
2. Add custom domain
3. Segui le istruzioni per configurare DNS

### Build Hooks

Per triggerare deploy automatici:

1. Site settings → Build & deploy → Build hooks
2. Crea un webhook
3. Usalo per deploy automatici da altri servizi

## 📊 Monitoring e Analytics

Netlify Dashboard offre:
- 📈 Traffic analytics
- 🔍 Build logs in tempo reale
- 📦 Deploy history
- 🌍 Bandwidth usage
- ⚡ Performance metrics

## 🐛 Risoluzione Problemi

### Build Failed

**Soluzione rapida:**
```powershell
cd client
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

Se funziona in locale, funzionerà su Netlify!

### 404 su Route

✅ **Già risolto!** Il file `netlify.toml` include le regole di redirect.

### Assets Non Caricano

Verifica in `vite.config.ts` che `base` sia impostato su `"/"`:
```typescript
const base = isGithubPages ? "/siteprova/" : "/";
```

## 🎉 Features Incluse

✅ **SPA Routing** - Tutte le route funzionano
✅ **Cache Ottimizzata** - Performance massime
✅ **Security Headers** - Sicurezza integrata
✅ **HTTPS Automatico** - SSL gratis
✅ **CDN Globale** - Velocità massima
✅ **Continuous Deployment** - Deploy automatici ad ogni push

## 📱 Mobile & Desktop

Il sito funzionerà perfettamente su:
- 💻 Desktop (Chrome, Firefox, Safari, Edge)
- 📱 Mobile (iOS Safari, Android Chrome)
- 🖥️ Tablet

## 💰 Costi

**Piano Gratuito include:**
- 100 GB bandwidth/mese
- 300 build minutes/mese
- Deploy illimitati
- HTTPS gratuito
- Preview deploy
- Form submissions (100/mese)

## 📚 Documentazione Completa

- `DEPLOY_NETLIFY.md` - Guida dettagliata
- `NETLIFY_CHECKLIST.md` - Checklist completa
- `test-netlify-build.ps1` - Script di test

## 🆘 Supporto

Hai problemi? Controlla:
1. Build logs su Netlify Dashboard
2. Console del browser (F12)
3. [Netlify Docs](https://docs.netlify.com/)
4. [Netlify Community](https://answers.netlify.com/)

---

## 🚀 Inizia Ora!

Scegli un metodo sopra e il tuo sito sarà online in pochi minuti! 🎉
