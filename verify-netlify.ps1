# Verifica Pre-Deploy Netlify (PowerShell)

Write-Host ""
Write-Host "🔍 Verifica Configurazione Netlify" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Verifica file netlify.toml
Write-Host "📄 Verifico netlify.toml..." -ForegroundColor Yellow
if (Test-Path "netlify.toml") {
    Write-Host "   ✅ netlify.toml trovato" -ForegroundColor Green
} else {
    Write-Host "   ❌ netlify.toml non trovato!" -ForegroundColor Red
    $allGood = $false
}

# Verifica file _redirects
Write-Host "📄 Verifico _redirects..." -ForegroundColor Yellow
if (Test-Path "client/public/_redirects") {
    Write-Host "   ✅ _redirects trovato" -ForegroundColor Green
} else {
    Write-Host "   ❌ _redirects non trovato!" -ForegroundColor Red
    $allGood = $false
}

# Verifica .nvmrc
Write-Host "📄 Verifico .nvmrc..." -ForegroundColor Yellow
if (Test-Path ".nvmrc") {
    $nodeVersion = Get-Content ".nvmrc" -Raw
    Write-Host "   ✅ .nvmrc trovato (Node $nodeVersion)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .nvmrc non trovato (userà default Netlify)" -ForegroundColor Yellow
}

# Verifica directory client
Write-Host "📁 Verifico directory client..." -ForegroundColor Yellow
if (Test-Path "client") {
    Write-Host "   ✅ Directory client trovata" -ForegroundColor Green
} else {
    Write-Host "   ❌ Directory client non trovata!" -ForegroundColor Red
    $allGood = $false
}

# Verifica package.json client
Write-Host "📦 Verifico package.json client..." -ForegroundColor Yellow
if (Test-Path "client/package.json") {
    Write-Host "   ✅ package.json client trovato" -ForegroundColor Green
    
    # Verifica script build
    $packageJson = Get-Content "client/package.json" -Raw | ConvertFrom-Json
    if ($packageJson.scripts.build) {
        Write-Host "   ✅ Script 'build' trovato" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Script 'build' non trovato!" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "   ❌ package.json client non trovato!" -ForegroundColor Red
    $allGood = $false
}

# Verifica vite.config.ts
Write-Host "⚙️  Verifico vite.config.ts..." -ForegroundColor Yellow
if (Test-Path "vite.config.ts") {
    Write-Host "   ✅ vite.config.ts trovato" -ForegroundColor Green
} else {
    Write-Host "   ❌ vite.config.ts non trovato!" -ForegroundColor Red
    $allGood = $false
}

# Verifica index.html
Write-Host "🌐 Verifico index.html..." -ForegroundColor Yellow
if (Test-Path "client/index.html") {
    Write-Host "   ✅ index.html trovato" -ForegroundColor Green
} else {
    Write-Host "   ❌ index.html non trovato!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "✅ Tutto pronto per il deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Prossimi passi:" -ForegroundColor Yellow
    Write-Host "   1. Testa la build: .\test-netlify-build.ps1" -ForegroundColor White
    Write-Host "   2. Commit e push: git add . && git commit -m 'Add Netlify config' && git push" -ForegroundColor White
    Write-Host "   3. Deploy su Netlify: https://app.netlify.com/" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Documentazione:" -ForegroundColor Yellow
    Write-Host "   - QUICK_START_NETLIFY.md - Guida rapida" -ForegroundColor White
    Write-Host "   - DEPLOY_NETLIFY.md - Guida dettagliata" -ForegroundColor White
    Write-Host "   - NETLIFY_CHECKLIST.md - Checklist completa" -ForegroundColor White
} else {
    Write-Host "❌ Alcuni file sono mancanti!" -ForegroundColor Red
    Write-Host "   Controlla gli errori sopra e risolvi prima di procedere." -ForegroundColor Red
}

Write-Host ""
