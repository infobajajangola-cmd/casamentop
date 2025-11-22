# Script para fazer push para GitHub
# Execute este script no PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Push para GitHub - Casamento App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar status do Git
Write-Host "Verificando status do repositório..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "INSTRUÇÕES PARA AUTENTICAÇÃO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para fazer o push, você precisa de um Token de Acesso Pessoal do GitHub." -ForegroundColor White
Write-Host ""
Write-Host "1. Acesse: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "2. Clique em 'Generate new token (classic)'" -ForegroundColor Cyan
Write-Host "3. Nome: casamentop" -ForegroundColor Cyan
Write-Host "4. Marque APENAS: [x] repo" -ForegroundColor Cyan
Write-Host "5. Clique em 'Generate token'" -ForegroundColor Cyan
Write-Host "6. COPIE O TOKEN!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Solicitar token
$token = Read-Host "Cole o token do GitHub aqui (ou pressione Enter para usar credenciais salvas)"

if ($token) {
    Write-Host ""
    Write-Host "Fazendo push com o token fornecido..." -ForegroundColor Yellow
    $remoteUrl = "https://${token}@github.com/infobajajangola-cmd/casamentop.git"
    git push $remoteUrl main
} else {
    Write-Host ""
    Write-Host "Tentando push com credenciais salvas..." -ForegroundColor Yellow
    git push origin main
}

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ PUSH REALIZADO COM SUCESSO!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Verifique o repositório: https://github.com/infobajajangola-cmd/casamentop" -ForegroundColor White
    Write-Host "2. Acesse https://vercel.com para fazer o deploy" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ ERRO AO FAZER PUSH" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "1. Verifique se o token está correto" -ForegroundColor White
    Write-Host "2. Certifique-se de que marcou 'repo' ao criar o token" -ForegroundColor White
    Write-Host "3. Tente usar o GitHub Desktop: https://desktop.github.com" -ForegroundColor White
    Write-Host ""
}

Read-Host "Pressione Enter para fechar"
