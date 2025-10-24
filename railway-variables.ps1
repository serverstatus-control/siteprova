# Railway CLI - Comandi per Variabili d'Ambiente (PowerShell)

# NOTA: Questi comandi sono SOLO esempi
# Sostituisci i valori con quelli reali prima di eseguire

# ==============================================
# PREREQUISITO: Installa Railway CLI
# ==============================================
# npm install -g @railway/cli
# railway login
# railway link (seleziona il tuo progetto)

# ==============================================
# GENERA SESSION_SECRET (PowerShell)
# ==============================================
Write-Host "Generazione SESSION_SECRET..." -ForegroundColor Yellow
$sessionSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
Write-Host "SESSION_SECRET generato: $sessionSecret" -ForegroundColor Green
Write-Host "Copialo e usalo nel comando qui sotto!" -ForegroundColor Cyan
Write-Host ""

# ==============================================
# VARIABILI OBBLIGATORIE
# ==============================================

Write-Host "=== Configurazione Variabili Railway ===" -ForegroundColor Magenta
Write-Host ""

# Ambiente di produzione
Write-Host "1. Settando NODE_ENV..." -ForegroundColor Cyan
# railway variables set NODE_ENV=production

# Session secret (USA IL VALORE GENERATO SOPRA!)
Write-Host "2. Settando SESSION_SECRET..." -ForegroundColor Cyan
# railway variables set SESSION_SECRET=$sessionSecret

# URL base dell'applicazione (SOSTITUISCI con il tuo dominio Railway)
Write-Host "3. Settando BASE_URL..." -ForegroundColor Cyan
# railway variables set BASE_URL=https://your-app.up.railway.app

# CORS origins (SOSTITUISCI con il tuo dominio Railway)
Write-Host "4. Settando CORS_ORIGINS..." -ForegroundColor Cyan
# railway variables set CORS_ORIGINS=https://your-app.up.railway.app

# ==============================================
# VARIABILI EMAIL (OPZIONALI)
# ==============================================

Write-Host "5. Configurazione Email (opzionale)..." -ForegroundColor Cyan

# Configurazione SMTP Gmail
# railway variables set SMTP_HOST=smtp.gmail.com
# railway variables set SMTP_PORT=587
# railway variables set SMTP_SECURE=false

# Email mittente (usa la tua email Gmail)
# railway variables set SMTP_USER=tua-email@gmail.com

# Password per le app Google (NON la password normale!)
# Genera su: https://myaccount.google.com/apppasswords
# railway variables set SMTP_PASS=your-16-char-app-password

Write-Host ""
Write-Host "=== Comandi Preparati ===" -ForegroundColor Green
Write-Host "Decommentali (rimuovi #) e esegui i comandi sopra uno alla volta" -ForegroundColor Yellow
Write-Host ""

# ==============================================
# VERIFICA VARIABILI
# ==============================================

Write-Host "Per verificare le variabili configurate:" -ForegroundColor Cyan
Write-Host "railway variables" -ForegroundColor White
Write-Host ""

# ==============================================
# COMANDI UTILI
# ==============================================

Write-Host "=== Altri Comandi Utili ===" -ForegroundColor Magenta
Write-Host ""
Write-Host "Deploy manuale:" -ForegroundColor Cyan
Write-Host "  railway up" -ForegroundColor White
Write-Host ""
Write-Host "Vedi logs in real-time:" -ForegroundColor Cyan
Write-Host "  railway logs" -ForegroundColor White
Write-Host ""
Write-Host "Apri dashboard:" -ForegroundColor Cyan
Write-Host "  railway open" -ForegroundColor White
Write-Host ""
Write-Host "Connetti al database PostgreSQL:" -ForegroundColor Cyan
Write-Host "  railway connect postgres" -ForegroundColor White
Write-Host ""

# ==============================================
# SCRIPT AUTOMATICO (DECOMMENTARE E PERSONALIZZARE)
# ==============================================

<#
# Decommentare questo blocco dopo aver personalizzato i valori

Write-Host "Configurazione automatica Railway..." -ForegroundColor Green

# Variabili base
railway variables set NODE_ENV=production
railway variables set SESSION_SECRET=$sessionSecret
railway variables set BASE_URL=https://your-app.up.railway.app
railway variables set CORS_ORIGINS=https://your-app.up.railway.app

# Variabili email (opzionale)
railway variables set SMTP_HOST=smtp.gmail.com
railway variables set SMTP_PORT=587
railway variables set SMTP_SECURE=false
railway variables set SMTP_USER=tua-email@gmail.com
railway variables set SMTP_PASS=your-16-char-app-password

Write-Host "Configurazione completata!" -ForegroundColor Green
railway variables

#>

# ==============================================
# NOTA IMPORTANTE
# ==============================================
Write-Host "NOTA: DATABASE_URL e PORT sono settate automaticamente da Railway" -ForegroundColor Yellow
Write-Host "Non serve configurarle manualmente!" -ForegroundColor Yellow
Write-Host ""

Write-Host "Setup completato! Ora esegui i comandi sopra (decommenta # prima)." -ForegroundColor Green
