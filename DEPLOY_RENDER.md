# 🚀 GUIDA RAPIDA - Render Deploy da Zero

## ✅ PREREQUISITI

Prima di iniziare, assicurati di avere:
- [ ] Account Render: https://render.com (registrati se non ce l'hai)
- [ ] Account Neon: https://neon.tech (per il database PostgreSQL gratuito)

---

## 📝 PASSO 1: Prepara il Database Neon

1. Vai su https://console.neon.tech
2. Clicca **"Create a project"** (se non ne hai già uno)
3. Dai un nome al progetto: `server-status-db`
4. Clicca **"Create project"**
5. **IMPORTANTE**: Copia e salva il **Connection String**
   - Lo trovi in **Dashboard** → **Connection Details**
   - Assomiglia a: `postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`

---

## 🌐 PASSO 2: Crea il Servizio su Render

### 2.1 - Vai su Render
1. Apri https://dashboard.render.com/
2. Fai login con il tuo account
3. Clicca **"New +"** in alto a destra
4. Seleziona **"Web Service"**

### 2.2 - Connetti GitHub
1. Cerca il repository: **siteprova**
2. Clicca **"Connect"** accanto al repository
3. Se non vedi il repository, clicca **"Configure account"** e autorizza l'accesso

### 2.3 - Configura il Servizio

**Compila questi campi:**

```
Name: siteprova
Region: Frankfurt (o la più vicina a te)
Branch: main
Root Directory: (lascia VUOTO)
Runtime: Node
Build Command: npm ci && npm run build
Start Command: npm start
Plan: Free
```

### 2.4 - Aggiungi Environment Variables

Clicca su **"Advanced"** e poi **"Add Environment Variable"**

Aggiungi QUESTE 4 VARIABILI:

**1. NODE_ENV**
```
Key: NODE_ENV
Value: production
```

**2. PORT**
```
Key: PORT
Value: 10000
```

**3. DATABASE_URL**
```
Key: DATABASE_URL
Value: <INCOLLA QUI IL CONNECTION STRING DI NEON>
```

**4. SESSION_SECRET**
```
Key: SESSION_SECRET
Value: <GENERA UNA STRINGA CASUALE LUNGA>
```

💡 **Per generare SESSION_SECRET**, esegui questo in PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```
Copia l'output e incollalo come valore.

### 2.5 - Crea il Servizio
1. Clicca **"Create Web Service"**
2. Attendi 5-10 minuti per il primo deploy
3. Vedrai i logs in tempo reale

---

## 🎯 PASSO 3: Verifica il Deploy

Quando vedi **"Your service is live 🎉"**:

1. Clicca sull'URL del tuo servizio (sarà tipo: `https://siteprova.onrender.com`)
2. Dovresti vedere il sito funzionante!

---

## 🔧 PASSO 4: Inizializza il Database (IMPORTANTE!)

Dopo il primo deploy, devi popolare il database:

1. Nel Dashboard di Render, vai al tuo servizio
2. Clicca su **"Shell"** nel menu a sinistra
3. Esegui questo comando:
```bash
npm run seed
```
4. Attendi che finisca (circa 30 secondi)
5. Ricarica il sito

---

## ✅ FATTO!

Il tuo sito è ora online su Render! 🎉

**URL finale**: https://siteprova.onrender.com

---

## ⚠️ NOTE IMPORTANTI

### Piano Free di Render:
- Il servizio va in **sleep dopo 15 minuti** di inattività
- Il primo caricamento dopo lo sleep richiede **30-60 secondi**
- Questo è normale per il piano gratuito!

### Auto-Deploy:
- Ogni volta che fai **git push**, Render fa automaticamente il deploy
- Non serve fare nulla manualmente!

### Se hai problemi:
1. Controlla i **Logs** su Render Dashboard
2. Verifica che tutte le **variabili d'ambiente** siano corrette
3. Assicurati che il **DATABASE_URL** sia valido

---

## 🐛 TROUBLESHOOTING

**Il sito non si carica:**
- Verifica le variabili d'ambiente
- Controlla i logs per errori
- Verifica che DATABASE_URL sia corretto

**Errore "Cannot connect to database":**
- Verifica che DATABASE_URL sia corretto
- Assicurati che Neon sia attivo
- Prova a riavviare il servizio su Render

**Il deploy fallisce:**
- Controlla i logs di build
- Verifica che npm ci && npm run build funzioni localmente
- Prova "Clear build cache & deploy"

---

## 📞 SUPPORTO

Se hai ancora problemi, chiedi aiuto mostrando:
- Screenshot del Dashboard Render
- Screenshot delle variabili d'ambiente
- Logs dell'errore
