# Start AI Image Studio with optimized memory (2GB)
$env:NODE_OPTIONS="--max-old-space-size=2048"
Write-Host "Starting AI Image Studio with 2GB memory limit..." -ForegroundColor Green
Write-Host "Memory optimization: ENABLED" -ForegroundColor Yellow
Write-Host "Lazy loading: ENABLED" -ForegroundColor Yellow
Write-Host "Source maps: DISABLED" -ForegroundColor Yellow
Write-Host ""
npx ng serve --configuration development --host 0.0.0.0 --port 4200
