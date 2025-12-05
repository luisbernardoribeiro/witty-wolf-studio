# Script para criar estrutura do projeto
Write-Host "Criando estrutura de pastas..." -ForegroundColor Green

# Criar pastas
New-Item -ItemType Directory -Force -Path "app" | Out-Null
New-Item -ItemType Directory -Force -Path "components" | Out-Null

Write-Host "Pastas criadas com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Agora copia manualmente os ficheiros:" -ForegroundColor Yellow
Write-Host "1. Move 'page.tsx' e 'layout.tsx' e 'globals.css' para a pasta 'app'" -ForegroundColor Yellow
Write-Host "2. Move 'HeroWittyWolfStudio.tsx' para a pasta 'components'" -ForegroundColor Yellow
Write-Host "3. Coloca 'logo-wittywolf.png' na pasta 'public'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Depois executa: npm run dev" -ForegroundColor Cyan
