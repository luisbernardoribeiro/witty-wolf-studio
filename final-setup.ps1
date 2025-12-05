# Script final para mover Hero e iniciar servidor
Write-Host "===== FINALIZANDO SETUP =====" -ForegroundColor Cyan

if (Test-Path "HeroWittyWolfStudio.tsx") {
    Write-Host "Movendo HeroWittyWolfStudio.tsx para components..." -ForegroundColor Green
    Move-Item -Path "HeroWittyWolfStudio.tsx" -Destination "components\HeroWittyWolfStudio.tsx" -Force
}

Write-Host ""
Write-Host "Estrutura completa!" -ForegroundColor Green
Write-Host "Coloca 'logo-wittywolf.png' na pasta 'public' e depois:" -ForegroundColor Yellow
Write-Host "npm run dev" -ForegroundColor Cyan
