# 📚 Railway Documentation Index

Guida completa alla configurazione e deploy su Railway per il progetto **Server Status 0.3.00**.

---

## 🚀 Inizio Rapido

**Nuovo su Railway?** Inizia da qui:

1. **[RAILWAY_SUMMARY.md](./RAILWAY_SUMMARY.md)** ⭐ **Inizia da qui!**
   - Panoramica completa
   - File creati e modificati
   - Checklist deploy
   - Prossimi passi
   - **Tempo:** 5 minuti

2. **[RAILWAY_QUICKSTART.md](./RAILWAY_QUICKSTART.md)** ⚡ **Guida Veloce**
   - Deploy rapido passo-passo
   - Comandi essenziali
   - Errori comuni e soluzioni
   - **Tempo:** 10 minuti

---

## 📖 Documentazione Completa

### Guide Dettagliate

3. **[RAILWAY_SETUP.md](./RAILWAY_SETUP.md)** 📋 **Guida Completa**
   - Setup dettagliato passo-passo
   - Configurazione database
   - Variabili d'ambiente spiegate
   - Troubleshooting avanzato
   - Monitoring e metriche
   - Dominio personalizzato
   - **Tempo:** 20 minuti

4. **[RAILWAY_FILES.md](./RAILWAY_FILES.md)** 🔧 **Dettagli Tecnici**
   - Descrizione di ogni file creato
   - File modificati e perché
   - Struttura progetto
   - Comandi build e deploy
   - **Tempo:** 10 minuti

---

## 🛠️ File di Configurazione

### File Railway

| File | Descrizione | Tipo |
|------|-------------|------|
| `railway.json` | Configurazione principale Railway | Config |
| `nixpacks.toml` | Build configuration (Node.js 20) | Config |
| `Procfile` | Start command (`npm start`) | Config |
| `.railwayignore` | File da escludere dal deploy | Config |

### Variabili d'Ambiente

| File | Descrizione | Tipo |
|------|-------------|------|
| `.env.example` | Template variabili d'ambiente | Template |
| `railway-variables.sh` | Comandi CLI (Linux/Mac) | Script |
| `railway-variables.ps1` | Comandi CLI (Windows/PowerShell) | Script |

### Documentazione

| File | Descrizione | Tipo |
|------|-------------|------|
| `README.md` | Documentazione progetto principale | Docs |
| `RAILWAY_SUMMARY.md` | Riepilogo setup Railway | Docs |
| `RAILWAY_QUICKSTART.md` | Guida rapida | Docs |
| `RAILWAY_SETUP.md` | Guida completa | Docs |
| `RAILWAY_FILES.md` | Dettagli tecnici | Docs |
| `RAILWAY_INDEX.md` | Questo file | Index |

---

## 📝 Workflow Consigliato

### Per chi è la prima volta su Railway

```
1. RAILWAY_SUMMARY.md      (5 min)  → Panoramica
2. RAILWAY_QUICKSTART.md   (10 min) → Deploy veloce
3. Deploy su Railway       (10 min) → Pratica
4. RAILWAY_SETUP.md        (opz)    → Approfondimenti
```

### Per chi ha esperienza con Railway

```
1. RAILWAY_QUICKSTART.md   (10 min) → Checklist
2. railway-variables.sh    (2 min)  → Config variabili
3. Deploy su Railway       (5 min)  → Deploy
```

### Per problemi o debug

```
1. RAILWAY_QUICKSTART.md   → Sezione "Errori Comuni"
2. RAILWAY_SETUP.md        → Sezione "Troubleshooting"
3. RAILWAY_FILES.md        → Dettagli tecnici
```

---

## ⚡ Quick Links

### Comandi Essenziali

```bash
# Build locale (test pre-deploy)
npm run build

# Start server (test post-build)
npm start

# Railway CLI
railway login
railway link
railway variables
railway logs
railway up
```

### Variabili d'Ambiente Minime

```env
NODE_ENV=production
SESSION_SECRET=<genera-qui>
BASE_URL=https://your-app.up.railway.app
CORS_ORIGINS=https://your-app.up.railway.app
```

### Genera SESSION_SECRET

**PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Bash:**
```bash
openssl rand -hex 32
```

---

## 🎯 Checklist Minima Deploy

- [ ] Leggi `RAILWAY_SUMMARY.md`
- [ ] Commit su GitHub
- [ ] Crea progetto Railway
- [ ] Aggiungi PostgreSQL
- [ ] Configura 4 variabili base
- [ ] Verifica deploy riuscito
- [ ] Test registrazione utente

---

## 🔍 Cerca per Argomento

### Database
- **Setup**: `RAILWAY_SETUP.md` → "Step 2: Aggiungi Database"
- **Troubleshooting**: `RAILWAY_SETUP.md` → "Database connection failed"
- **Variabili**: `RAILWAY_FILES.md` → "DATABASE_URL"

### Email (SMTP)
- **Configurazione**: `RAILWAY_SETUP.md` → "Configurazione Gmail"
- **Password App Google**: `RAILWAY_SETUP.md` → "Passo 2: Genera Password"
- **Troubleshooting**: `RAILWAY_QUICKSTART.md` → "Email non funzionano"

### CORS
- **Setup**: `RAILWAY_FILES.md` → "CORS_ORIGINS"
- **Errori**: `RAILWAY_QUICKSTART.md` → "Error: CORS blocked"
- **Multiple Origins**: `RAILWAY_SETUP.md` → "Variabili CORS"

### Build & Deploy
- **Processo**: `RAILWAY_FILES.md` → "Comandi di Deploy"
- **Errori**: `RAILWAY_QUICKSTART.md` → "Error: Build failed"
- **Test Locale**: `RAILWAY_QUICKSTART.md` → "Test Locale"

### Monitoring
- **Logs**: `RAILWAY_SETUP.md` → "Visualizza i Logs"
- **Metriche**: `RAILWAY_SETUP.md` → "Metriche"
- **Debug**: `RAILWAY_QUICKSTART.md` → "Comandi Debug"

### Dominio Personalizzato
- **Setup**: `RAILWAY_SETUP.md` → "Dominio Personalizzato"
- **DNS**: `RAILWAY_SETUP.md` → "Aggiungi Dominio"
- **Variabili**: `RAILWAY_SETUP.md` → "Aggiorna Variabili"

---

## 📦 File Modificati nel Progetto

Due file esistenti sono stati aggiornati per supportare Railway:

1. **`vite.config.ts`**
   - Aggiunto rilevamento ambiente Railway
   - Variabile `isRailway` per configurazioni specifiche

2. **`server/index.ts`**
   - Commento aggiornato per CORS Railway
   - Supporto per domini Railway in CORS

Vedi dettagli in: `RAILWAY_FILES.md` → "File Modificati"

---

## 🆘 Aiuto e Supporto

### Railway
- **Dashboard**: https://railway.app/dashboard
- **Docs**: https://docs.railway.app
- **Discord**: https://discord.gg/railway
- **Status**: https://status.railway.app

### Progetto
- **GitHub**: https://github.com/serverstatus-control/siteprova
- **Issues**: Apri issue su GitHub per bug o feature

### Community
- **Railway Discord**: Domande su Railway
- **GitHub Discussions**: Domande sul progetto

---

## ✅ Verifica Setup

Assicurati di avere tutti i file:

```bash
# File di configurazione Railway
✓ railway.json
✓ nixpacks.toml
✓ Procfile
✓ .railwayignore
✓ .env.example

# Documentazione Railway
✓ RAILWAY_INDEX.md (questo file)
✓ RAILWAY_SUMMARY.md
✓ RAILWAY_QUICKSTART.md
✓ RAILWAY_SETUP.md
✓ RAILWAY_FILES.md

# Script variabili
✓ railway-variables.sh
✓ railway-variables.ps1

# File modificati
✓ vite.config.ts (aggiornato)
✓ server/index.ts (aggiornato)
```

Se manca qualcosa, rigenera i file!

---

## 🎓 Apprendimento Progressivo

### Livello 1: Principiante
1. `RAILWAY_SUMMARY.md` - Cosa è stato fatto
2. `RAILWAY_QUICKSTART.md` - Come deployare
3. Deploy su Railway - Pratica

### Livello 2: Intermedio
1. `RAILWAY_SETUP.md` - Setup dettagliato
2. `railway-variables.sh` - Automazione variabili
3. Monitoring e logs - Operazioni

### Livello 3: Avanzato
1. `RAILWAY_FILES.md` - Dettagli tecnici
2. `vite.config.ts` - Customizzazioni
3. Ottimizzazioni e scaling

---

## 🚀 Prossimo Passo

**Pronto per iniziare?**

👉 Apri **[RAILWAY_SUMMARY.md](./RAILWAY_SUMMARY.md)** per iniziare!

---

**Ultimo aggiornamento**: 25 ottobre 2025  
**Versione**: 0.3.00  
**Status**: ✅ Documentazione Completa

---

## 📞 Contatti

**Hai domande?**
- Controlla prima la documentazione sopra
- Cerca nella sezione "Troubleshooting"
- Controlla i logs di Railway
- Apri issue su GitHub se necessario

**Buon deploy! 🎉**
