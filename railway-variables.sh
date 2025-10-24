# Railway CLI - Comandi per Variabili d'Ambiente

# NOTA: Questi comandi sono SOLO esempi
# Sostituisci i valori con quelli reali prima di eseguire

# ==============================================
# PREREQUISITO: Installa Railway CLI
# ==============================================
# npm install -g @railway/cli
# railway login
# railway link (seleziona il tuo progetto)

# ==============================================
# VARIABILI OBBLIGATORIE
# ==============================================

# Ambiente di produzione
railway variables set NODE_ENV=production

# Session secret (GENERA UNA STRINGA CASUALE!)
# Genera con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
railway variables set SESSION_SECRET=your-generated-secret-here

# URL base dell'applicazione (sostituisci con il tuo dominio Railway)
railway variables set BASE_URL=https://your-app.up.railway.app

# CORS origins (sostituisci con il tuo dominio Railway)
railway variables set CORS_ORIGINS=https://your-app.up.railway.app

# ==============================================
# VARIABILI EMAIL (OPZIONALI)
# ==============================================

# Configurazione SMTP Gmail
railway variables set SMTP_HOST=smtp.gmail.com
railway variables set SMTP_PORT=587
railway variables set SMTP_SECURE=false

# Email mittente (usa la tua email Gmail)
railway variables set SMTP_USER=tua-email@gmail.com

# Password per le app Google (NON la password normale!)
# Genera su: https://myaccount.google.com/apppasswords
railway variables set SMTP_PASS=your-16-char-app-password

# ==============================================
# VERIFICA VARIABILI
# ==============================================

# Lista tutte le variabili configurate
railway variables

# ==============================================
# COMANDI UTILI
# ==============================================

# Deploy manuale
railway up

# Vedi logs in real-time
railway logs

# Apri dashboard
railway open

# Connetti al database PostgreSQL
railway connect postgres

# ==============================================
# RIMUOVI VARIABILE (se necessario)
# ==============================================

# railway variables delete VARIABLE_NAME

# ==============================================
# NOTA IMPORTANTE
# ==============================================
# DATABASE_URL e PORT sono settate automaticamente da Railway
# Non serve configurarle manualmente!

# ==============================================
# QUICK SETUP - Copia e incolla dopo aver modificato
# ==============================================

# Sostituisci i valori e rimuovi i commenti (#), poi copia tutto:

# railway variables set NODE_ENV=production
# railway variables set SESSION_SECRET=GENERA_QUI
# railway variables set BASE_URL=https://your-app.up.railway.app
# railway variables set CORS_ORIGINS=https://your-app.up.railway.app
# railway variables set SMTP_HOST=smtp.gmail.com
# railway variables set SMTP_PORT=587
# railway variables set SMTP_SECURE=false
# railway variables set SMTP_USER=tua-email@gmail.com
# railway variables set SMTP_PASS=your-app-password
