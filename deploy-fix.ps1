# Deploy Fix su Git (PowerShell)

Write-Host ""
Write-Host "🚀 Preparo il commit della fix Netlify..." -ForegroundColor Cyan
Write-Host ""

# Verifica se siamo in un repository Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Errore: Non sei in un repository Git!" -ForegroundColor Red
    exit 1
}

# Mostra i file modificati
Write-Host "📝 File modificati:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "📦 File da committare:" -ForegroundColor Yellow
Write-Host "   - netlify.toml (fix build command)" -ForegroundColor Cyan
Write-Host "   - NETLIFY_FIX_VITE.md (documentazione fix)" -ForegroundColor Cyan
Write-Host "   - Altri file di documentazione aggiornati" -ForegroundColor Cyan

Write-Host ""
$confirm = Read-Host "Vuoi procedere con commit e push? (S/N)"

if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "❌ Operazione annullata" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "📤 Aggiungo i file..." -ForegroundColor Cyan
git add netlify.toml
git add NETLIFY_FIX_VITE.md
git add NETLIFY_STATUS.md
git add QUICK_START_NETLIFY.md
git add DEPLOY_NETLIFY.md

Write-Host "💾 Creo il commit..." -ForegroundColor Cyan
git commit -m "Fix: Netlify build - use root package.json with all dependencies

- Changed netlify.toml to use root package.json
- Build command: npm install && npm run build:client
- Publish directory: client/dist
- Fixes 'vite: not found' error
- Added documentation of the fix"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Errore durante il commit!" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Push al repository..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Errore durante il push!" -ForegroundColor Red
    Write-Host "   Prova manualmente: git push origin main" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ Commit e push completati con successo!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Netlify:" -ForegroundColor Yellow
Write-Host "   - Rileverà automaticamente il nuovo commit" -ForegroundColor White
Write-Host "   - Avvierà un nuovo build" -ForegroundColor White
Write-Host "   - Questa volta avrà successo! 🎉" -ForegroundColor White
Write-Host ""
Write-Host "📊 Monitora il deploy su:" -ForegroundColor Yellow
Write-Host "   https://app.netlify.com/" -ForegroundColor Cyan
Write-Host ""
