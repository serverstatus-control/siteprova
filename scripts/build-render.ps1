# Post-build script per Render (PowerShell)

Write-Host "Building client..."
npm run build:client:render

Write-Host "Copying dist to client/dist for Render..."
New-Item -ItemType Directory -Force -Path "client/dist" | Out-Null
Copy-Item -Path "dist/*" -Destination "client/dist/" -Recurse -Force

Write-Host "Build completed successfully!"