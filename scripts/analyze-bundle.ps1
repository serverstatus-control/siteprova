Write-Host "🚀 Building the production bundle..." -ForegroundColor Green
npm run build

Write-Host "🔍 Analyzing bundle size..." -ForegroundColor Yellow
npm run build:analyze

Write-Host "📊 Bundle analysis complete! Check bundle-analysis.html" -ForegroundColor Green

# Calcola la dimensione totale dei file
Write-Host "📦 Total build size:" -ForegroundColor Cyan
$size = (Get-ChildItem -Path "client\dist" -Recurse | Measure-Object -Property Length -Sum).Sum
Write-Host "$([math]::Round($size/1MB,2)) MB"

Write-Host "📁 Asset breakdown:" -ForegroundColor Cyan
Get-ChildItem -Path "client\dist" -Filter "*.js" -Recurse | Sort-Object Length -Descending | ForEach-Object {
    $sizeKB = [math]::Round($_.Length/1KB,2)
    Write-Host "$sizeKB KB - $($_.Name)"
}

Get-ChildItem -Path "client\dist" -Filter "*.css" -Recurse | Sort-Object Length -Descending | ForEach-Object {
    $sizeKB = [math]::Round($_.Length/1KB,2)
    Write-Host "$sizeKB KB - $($_.Name)"
}