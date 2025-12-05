# Script completo para configurar o projeto
Write-Host "===== SETUP WITTY WOLF STUDIO =====" -ForegroundColor Cyan
Write-Host ""

# Criar pastas
Write-Host "1. Criando estrutura de pastas..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "app" | Out-Null
New-Item -ItemType Directory -Force -Path "components" | Out-Null

# Mover ficheiros para app
Write-Host "2. Movendo ficheiros para pasta 'app'..." -ForegroundColor Green
if (Test-Path "page.tsx") { Move-Item -Path "page.tsx" -Destination "app\page.tsx" -Force }
if (Test-Path "layout.tsx") { Move-Item -Path "layout.tsx" -Destination "app\layout.tsx" -Force }
if (Test-Path "globals.css") { Move-Item -Path "globals.css" -Destination "app\globals.css" -Force }

# Mover ficheiro para components
Write-Host "3. Movendo ficheiros para pasta 'components'..." -ForegroundColor Green
if (Test-Path "HeroWittyWolfStudio.tsx") { Move-Item -Path "HeroWittyWolfStudio.tsx" -Destination "components\HeroWittyWolfStudio.tsx" -Force }

# Atualizar page.tsx com import correto
Write-Host "4. Atualizando imports..." -ForegroundColor Green
$pageContent = @"
import { HeroWittyWolfStudio } from "@/components/HeroWittyWolfStudio";

export default function Home() {
  return (
    <main>
      <HeroWittyWolfStudio />
    </main>
  );
}
"@
Set-Content -Path "app\page.tsx" -Value $pageContent

Write-Host ""
Write-Host "===== SETUP CONCLUÍDO! =====" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Coloca 'logo-wittywolf.png' na pasta 'public'" -ForegroundColor Yellow
Write-Host "2. Executa: npm run dev" -ForegroundColor Cyan
Write-Host ""
