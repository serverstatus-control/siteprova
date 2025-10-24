# 🚀 Railway Deploy - Checklist Rapida

## Prima del Deploy

### 1. File Necessari ✓
- [x] `railway.json` - Configurazione Railway
- [x] `nixpacks.toml` - Build configuration
- [x] `Procfile` - Start command
- [x] `.railwayignore` - File da escludere
- [x] `.env.example` - Template variabili

### 2. Test Locale
```bash
# Installa dipendenze
npm ci

# Build completo
npm run build

# Test build server
node dist/index.js
```

### 3. Variabili d'Ambiente Railway

Copia e incolla nel pannello Variables di Railway:

```env
# === OBBLIGATORIE ===
NODE_ENV=production
SESSION_SECRET=GENERA_UNA_STRINGA_CASUALE_LUNGA_64_CARATTERI

# === EMAIL (per reset password) ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tua-email@gmail.com
SMTP_PASS=password-app-google-16-caratteri

# === URL (sostituisci con il tuo dominio Railway) ===
BASE_URL=https://siteprova-production.up.railway.app
CORS_ORIGINS=https://siteprova-production.up.railway.app
```

### 4. Genera SESSION_SECRET

**PowerShell (Windows):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Linux/Mac:**
```bash
openssl rand -hex 32
```

### 5. Password Gmail per App

1. Google Account → Sicurezza
2. Verifica in 2 passaggi (attiva)
3. Password per le app
4. Seleziona "Mail" e "Altro"
5. Copia la password a 16 caratteri
6. Usa in `SMTP_PASS`

## Durante il Deploy

### Railway UI
1. New Project
2. Deploy from GitHub repo
3. Seleziona repository
4. + New → Database → PostgreSQL
5. Aggiungi variabili d'ambiente
6. Deploy automatico

### Tempo Deploy
- ⏱️ Build: 2-3 minuti
- ⏱️ Start: 10-30 secondi
- ⏱️ Totale: ~3-5 minuti

## Dopo il Deploy

### ✅ Verifica Funzionamento

1. **Apri l'app**
   - Clicca sul link Railway
   - Dovresti vedere la homepage

2. **Test Registrazione**
   - Crea un nuovo account
   - Verifica che funzioni

3. **Test Database**
   - I dati vengono salvati?
   - I servizi vengono caricati?

4. **Check Logs**
   ```
   Railway → Service → Logs
   ```
   - Nessun errore rosso?
   - Server started correttamente?

### 🔍 Comandi Debug Railway

```bash
# Installa Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link progetto
railway link

# Vedi logs
railway logs

# Apri shell nel container
railway shell
```

## 🚨 Errori Comuni

### Error: "Application failed to respond"
- ❌ PORT non configurata → Railway la setta automaticamente
- ✅ Verifica: `const port = process.env.PORT || 3000;`

### Error: "Database connection failed"
- ❌ DATABASE_URL mancante
- ✅ Aggiungi PostgreSQL database nel progetto

### Error: "CORS blocked"
- ❌ CORS_ORIGINS non include dominio Railway
- ✅ Aggiungi: `https://your-app.up.railway.app`

### Error: "Build failed"
- ❌ Dipendenze mancanti o errori TypeScript
- ✅ Test locale con `npm run build`

### Email non funzionano
- ❌ Password normale di Gmail (non funziona!)
- ✅ Usa Password per le App (16 caratteri)

## 📊 Monitor

### Metriche da Controllare
- **CPU**: < 50% normale, > 80% problema
- **Memory**: < 512MB ok per free tier
- **Response Time**: < 200ms buono, > 1s lento
- **Errors**: 0 ideale

### Logs da Cercare
```bash
✓ "serving on port 3000"
✓ "Database connected"
✓ "GET /api/services 200"
✗ "Error:", "ECONNREFUSED", "CORS"
```

## 🔄 Update App

### Push su GitHub
```bash
git add .
git commit -m "Update app"
git push origin main
```

Railway deploy automaticamente! ⚡

## 💡 Tips

1. **Health Check**: Aggiungi endpoint `/health`
2. **Environment**: Usa `NODE_ENV=production`
3. **Logs**: Usa `console.log` per debug
4. **Secrets**: Mai committare `.env`!
5. **Backup**: Backup database regolare

## 📱 Dominio Personalizzato

```
Railway → Service → Settings → Domains → Custom Domain
```

Poi aggiorna:
```env
BASE_URL=https://tuodominio.com
CORS_ORIGINS=https://tuodominio.com
```

## 🎯 Performance

### Free Tier Limits
- ✅ 500 ore/mese (circa 20 giorni sempre attivo)
- ✅ 1 GB RAM
- ✅ 1 GB storage database
- ✅ 100 GB bandwidth

### Ottimizzazioni
- Cache statica con CDN
- Minify assets in build
- Lazy loading componenti
- Database indexes

## ✨ Fatto!

Se vedi questo, sei online! 🎉

**URL App**: https://siteprova-production.up.railway.app
**Status**: 🟢 Online
**Database**: 🟢 Connected

---

**Problemi?** Controlla [RAILWAY_SETUP.md](./RAILWAY_SETUP.md) per guida completa
