# Setup Render - Server Status

## 🚀 Guida Passo-Passo per Deploy su Render

### Prerequisiti
- Account Render (https://render.com)
- Account Neon PostgreSQL (https://neon.tech) o altro database PostgreSQL
- Repository GitHub connesso

---

## 📋 Passo 1: Crea un nuovo Web Service

1. Vai su https://dashboard.render.com
2. Clicca su **"New +"** in alto a destra
3. Seleziona **"Web Service"**
4. Connetti il repository GitHub: `serverstatus-control/siteprova`
5. Clicca su **"Connect"**

---

## ⚙️ Passo 2: Configura il Web Service

Usa queste impostazioni:

### General Settings
- **Name**: `server-status` (o il nome che preferisci)
- **Region**: `Frankfurt` (o la regione più vicina)
- **Branch**: `main`
- **Root Directory**: (lascia vuoto)
- **Environment**: `Node`
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free`

---

## 🔐 Passo 3: Aggiungi Environment Variables

Vai su **Environment** e aggiungi queste variabili:

### Obbligatori:
```
NODE_ENV=production
PORT=10000
DATABASE_URL=<il-tuo-connection-string-neon>
SESSION_SECRET=<genera-una-stringa-casuale-lunga>
```

### Opzionali:
```
CORS_ORIGINS=https://server-status.onrender.com,http://localhost:3000
```

### Per ottenere DATABASE_URL da Neon:
1. Vai su https://console.neon.tech
2. Seleziona il tuo progetto
3. Vai su **Dashboard** → **Connection Details**
4. Copia la stringa di connessione
5. Dovrebbe essere simile a: `postgresql://user:password@host.neon.tech/database?sslmode=require`

### Per generare SESSION_SECRET:
Puoi usare questo comando in PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

---

## 🔄 Passo 4: Deploy

1. Clicca su **"Create Web Service"**
2. Render inizierà automaticamente il deploy
3. Attendi che il deploy sia completato (circa 5-10 minuti)
4. Il tuo sito sarà disponibile su: `https://server-status.onrender.com`

---

## 🔧 Passo 5: Inizializza il Database

Dopo il primo deploy, devi popolare il database con i dati iniziali:

1. Vai su **Shell** nel dashboard del tuo servizio
2. Esegui: `npm run seed`

---

## ✅ Verifica

Apri il tuo sito e verifica che:
- ✅ La pagina si carica correttamente
- ✅ Vedi l'elenco dei servizi
- ✅ Vedi lo stato dei servizi
- ✅ Puoi fare login/registrazione

---

## 🐛 Troubleshooting

### Il sito non si carica
- Verifica che tutte le variabili d'ambiente siano configurate correttamente
- Controlla i logs su Render Dashboard → Logs
- Verifica che DATABASE_URL sia corretto

### Errori di database
- Assicurati che il database Neon sia attivo
- Esegui `npm run db:push` per sincronizzare lo schema
- Esegui `npm run seed` per popolare i dati

### Il servizio va in sleep (piano Free)
- I servizi gratuiti su Render vanno in sleep dopo 15 minuti di inattività
- Il primo caricamento potrebbe richiedere 30-60 secondi
- Considera l'upgrade a un piano a pagamento per evitare questo

---

## 🔄 Auto-Deploy

Render è configurato per fare auto-deploy ogni volta che fai push su GitHub:
1. Fai le tue modifiche in locale
2. Commit: `git commit -m "tuo messaggio"`
3. Push: `git push origin main`
4. Render rileverà automaticamente il push e farà il redeploy

---

## 📞 Supporto

Se hai problemi, controlla:
- Logs su Render Dashboard
- https://render.com/docs
- https://github.com/serverstatus-control/siteprova/issues
