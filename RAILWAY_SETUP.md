# 🚂 Deploy su Railway - Guida Completa

## 📋 Prerequisiti

- Account Railway (gratuito): [railway.app](https://railway.app)
- Repository GitHub con il progetto

## 🎯 Step 1: Crea il Progetto Railway

1. Vai su [railway.app](https://railway.app)
2. Clicca su **"New Project"**
3. Seleziona **"Deploy from GitHub repo"**
4. Autorizza Railway ad accedere al tuo repository
5. Seleziona il repository `siteprova`

## 🗄️ Step 2: Aggiungi il Database PostgreSQL

1. Nel tuo progetto Railway, clicca sul pulsante **"+ New"**
2. Seleziona **"Database"**
3. Scegli **"PostgreSQL"**
4. Railway creerà automaticamente il database e la variabile `DATABASE_URL`

## ⚙️ Step 3: Configura le Variabili d'Ambiente

Nel pannello **"Variables"** del tuo servizio web, aggiungi le seguenti variabili:

### Variabili Obbligatorie

```env
NODE_ENV=production
SESSION_SECRET=genera-una-stringa-casuale-molto-lunga-e-sicura
```

### Variabili per Email (Reset Password)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tua-email@gmail.com
SMTP_PASS=tua-password-applicazione-google
```

### Variabili CORS e URL

```env
BASE_URL=https://your-app.up.railway.app
CORS_ORIGINS=https://your-app.up.railway.app
```

**⚠️ IMPORTANTE:** Sostituisci `your-app` con il nome effettivo del tuo dominio Railway!

### Variabili Automatiche (Non Modificare)

Railway setta automaticamente:
- ✅ `DATABASE_URL` - URL del database PostgreSQL
- ✅ `PORT` - Porta su cui il server deve ascoltare
- ✅ `RAILWAY_ENVIRONMENT` - Ambiente Railway
- ✅ `RAILWAY_PROJECT_ID` - ID del progetto

## 🔐 Come Generare SESSION_SECRET

### Metodo 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Metodo 2: OpenSSL
```bash
openssl rand -hex 32
```

### Metodo 3: PowerShell (Windows)
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

## 📧 Configurazione Gmail per Email

### Passo 1: Attiva la Verifica in 2 Passaggi
1. Vai su [Google Account Security](https://myaccount.google.com/security)
2. Attiva la **"Verifica in due passaggi"**

### Passo 2: Genera una Password per le App
1. Vai su [App Passwords](https://myaccount.google.com/apppasswords)
2. Seleziona **"Mail"** come app
3. Seleziona il tuo dispositivo
4. Clicca su **"Genera"**
5. Copia la password a 16 caratteri
6. Usa questa password in `SMTP_PASS`

## 🚀 Step 4: Deploy

Railway eseguirà automaticamente:

1. **Install**: `npm ci`
2. **Build**: `npm run build` (compila client + server)
3. **Start**: `npm start` (avvia l'applicazione)

Il processo di deploy richiede circa 2-5 minuti.

## ✅ Step 5: Verifica il Deploy

1. Clicca sul link del dominio Railway (es. `https://your-app.up.railway.app`)
2. Dovresti vedere la homepage dell'applicazione
3. Prova a registrare un nuovo utente
4. Controlla i logs per eventuali errori

## 📊 Monitoraggio

### Visualizza i Logs
1. Nel progetto Railway, clicca sul servizio
2. Vai alla tab **"Logs"**
3. Controlla eventuali errori o avvisi

### Metriche
- **CPU Usage**: Utilizzo della CPU
- **Memory**: Utilizzo della memoria
- **Network**: Traffico di rete

## 🔧 Comandi Utili

### Riavvia il Servizio
```bash
# Dal pannello Railway
Settings → Restart
```

### Rollback ad una Versione Precedente
```bash
# Dal pannello Railway
Deployments → [Seleziona deployment] → Redeploy
```

### Aggiorna le Variabili d'Ambiente
```bash
# Dopo aver modificato le variabili, Railway riavvierà automaticamente
```

## 🐛 Troubleshooting

### ❌ Errore: "Application failed to respond"

**Cause comuni:**
- Il server non ascolta sulla porta corretta
- DATABASE_URL non configurato
- Errore nel codice che impedisce l'avvio

**Soluzione:**
1. Controlla i logs di Railway
2. Verifica che `PORT` sia usato correttamente nel codice:
   ```typescript
   const port = process.env.PORT || 3000;
   server.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });
   ```

### ❌ Errore: "Database connection failed"

**Soluzione:**
1. Verifica che il database PostgreSQL sia attivo
2. Controlla che `DATABASE_URL` sia presente nelle variabili
3. Nel pannello del database, verifica lo stato

### ❌ Errore CORS

**Soluzione:**
1. Aggiungi il dominio Railway in `CORS_ORIGINS`
2. Esempio: `CORS_ORIGINS=https://your-app.up.railway.app,http://localhost:3000`
3. Assicurati che non ci siano spazi nella lista

### ❌ Errore: "Build failed"

**Cause comuni:**
- Dipendenze mancanti
- Errori TypeScript
- File di configurazione errati

**Soluzione:**
1. Controlla i logs di build
2. Esegui `npm run build` in locale per verificare
3. Assicurati che tutti i file di configurazione siano committati

### ❌ Errore: "Email non inviate"

**Soluzione:**
1. Verifica le credenziali SMTP
2. Usa una password per le app di Google (non la password normale)
3. Controlla i logs per messaggi di errore dettagliati

## 📱 Dominio Personalizzato

### Aggiungi un Dominio Personalizzato

1. Nel pannello del servizio, vai su **"Settings"**
2. Clicca su **"Domains"**
3. Clicca su **"Custom Domain"**
4. Inserisci il tuo dominio
5. Segui le istruzioni per configurare i record DNS

### Aggiorna le Variabili dopo il Dominio

```env
BASE_URL=https://tuodominio.com
CORS_ORIGINS=https://tuodominio.com
```

## 💰 Costi

### Piano Free
- ✅ 500 ore di esecuzione al mese
- ✅ 1 GB di RAM
- ✅ 1 GB di storage
- ✅ Shared CPU

### Quando Serve Upgrade
- Traffic elevato (> 500k requests/mese)
- Database grande (> 1GB)
- Processi in background intensivi

## 🔄 Aggiornamenti Automatici

Railway supporta deploy automatici:

1. **Settings** → **Service**
2. Abilita **"Auto Deploy"**
3. Ogni push su GitHub triggera un nuovo deploy

## 📝 Checklist Pre-Deploy

- [ ] Database PostgreSQL aggiunto
- [ ] Tutte le variabili d'ambiente configurate
- [ ] `SESSION_SECRET` generato in modo sicuro
- [ ] Email SMTP configurato (se necessario)
- [ ] `CORS_ORIGINS` include il dominio Railway
- [ ] `BASE_URL` corretta
- [ ] Codice pushato su GitHub
- [ ] Build locale testato con `npm run build`

## 🎉 Deploy Completato!

Se tutto è andato a buon fine:

✅ L'applicazione è online  
✅ Il database è connesso  
✅ Le email funzionano  
✅ I logs sono puliti  

## 🆘 Supporto

**Railway Community:**
- Discord: [railway.app/discord](https://discord.gg/railway)
- Docs: [docs.railway.app](https://docs.railway.app)

**GitHub Issues:**
- Apri una issue sul repository per problemi specifici del progetto

---

**Ultimo aggiornamento:** Ottobre 2025  
**Versione:** 0.3.00
