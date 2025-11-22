# 🚀 Como Fazer Push para o GitHub

## ⚠️ Problema Atual
O Git precisa de autenticação para fazer push para o GitHub. Erro 403 significa que as credenciais não estão configuradas.

---

## ✅ Solução Rápida - Usando o Script

### Passo 1: Criar Token do GitHub

1. **Acesse**: https://github.com/settings/tokens
2. **Clique em**: "Generate new token" → "Generate new token (classic)"
3. **Nome**: `casamentop`
4. **Selecione APENAS**: ☑️ **repo** (Full control of private repositories)
5. **Clique em**: "Generate token"
6. **⚠️ COPIE O TOKEN AGORA** - você só verá uma vez!
   - O token se parece com: `ghp_xxxxxxxxxxxxxxxxxxxx`

### Passo 2: Executar o Script

No PowerShell, execute:

```powershell
cd C:\Users\alexa\Documents\trae_projects\casamentoapp\casamentop
.\push-to-github.ps1
```

Cole o token quando solicitado e pressione Enter!

---

## 🔄 Alternativa: Push Direto no Terminal

Se preferir fazer manualmente sem o script:

```powershell
# Substitua SEU_TOKEN_AQUI pelo token que você copiou
git push https://SEU_TOKEN_AQUI@github.com/infobajajangola-cmd/casamentop.git main
```

**Exemplo**:
```powershell
git push https://ghp_abc123xyz789@github.com/infobajajangola-cmd/casamentop.git main
```

---

## 🎯 Alternativa mais Simples: GitHub Desktop

Se estiver tendo problemas, use o GitHub Desktop:

1. **Baixe**: https://desktop.github.com
2. **Instale** e faça login
3. **File → Add Local Repository**
4. Selecione: `C:\Users\alexa\Documents\trae_projects\casamentoapp\casamentop`
5. **Clique em "Push origin"**
6. Pronto! ✅

---

## ✅ Depois do Push Bem-Sucedido

1. **Verifique no GitHub**: https://github.com/infobajajangola-cmd/casamentop
2. **Deploy no Vercel**:
   - Acesse: https://vercel.com
   - Login com GitHub
   - "New Project"
   - Selecione `casamentop`
   - Configure variáveis de ambiente:
     - `GEMINI_API_KEY`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"
   - 🎉 **Seu site está no ar!**

---

## 🆘 Troubleshooting

### Erro 403 (Permission Denied)
- ✅ Verifique se criou o token corretamente
- ✅ Certifique-se de marcar "repo" no escopo
- ✅ Cole o token completo (começa com `ghp_`)

### PowerShell não executa scripts
Execute primeiro:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Token expirado/inválido
- Crie um novo token em: https://github.com/settings/tokens
- Não tem data de expiração? Marque "No expiration" ao criar

---

**💡 Dica**: Salve o token em um local seguro (gerenciador de senhas) para uso futuro!
