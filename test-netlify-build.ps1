# Test Build Netlify (PowerShell)

Write-Host "🚀 Testing Netlify build locally..." -ForegroundColor Green
Write-Host ""

# Vai nella cartella client
Set-Location client

Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Output directory: client/dist" -ForegroundColor Yellow
Write-Host ""
Write-Host "To preview locally, run:" -ForegroundColor Yellow
Write-Host "  npm run preview" -ForegroundColor White
Write-Host ""
Write-Host "To deploy to Netlify:" -ForegroundColor Yellow
Write-Host "  1. Go to https://app.netlify.com/" -ForegroundColor White
Write-Host "  2. Drag and drop the 'client/dist' folder" -ForegroundColor White
Write-Host "  OR" -ForegroundColor White
Write-Host "  3. Connect your Git repository for automatic deploys" -ForegroundColor White
