# 🚀 Guia de Deploy - Aplicação de Casamento

Este guia irá ajudá-lo a colocar sua aplicação de convites de casamento no ar.

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de que:

1. ✅ A aplicação está funcionando localmente (`npm run dev`)
2. ✅ Você tem uma conta no [Supabase](https://supabase.com) com o banco de dados configurado
3. ✅ Você tem uma API Key do Gemini (se usar funcionalidades de IA)
4. ✅ Todas as variáveis de ambiente estão configuradas

## 🔐 Variáveis de Ambiente

Você precisará configurar as seguintes variáveis de ambiente na plataforma de deploy:

```bash
# API do Gemini (para funcionalidades de IA)
GEMINI_API_KEY=sua-chave-aqui

# Configuração do Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

## 🌐 Opções de Deploy

### Opção 1: Vercel (Recomendado) ⭐

A Vercel oferece deploy gratuito e automático a partir do GitHub.

#### Passos:

1. **Criar conta no GitHub (se ainda não tiver)**
   - Acesse [github.com](https://github.com)
   - Crie uma conta gratuita

2. **Fazer upload do código para GitHub**
   ```bash
   # Inicializar repositório Git (se ainda não foi feito)
   git init
   git add .
   git commit -m "Preparar para deploy"
   
   # Criar repositório no GitHub e fazer push
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Importe seu repositório
   - Configure as variáveis de ambiente:
     - `GEMINI_API_KEY`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Clique em "Deploy"

4. **Deploy automático**
   - Toda vez que você fizer push para o GitHub, a Vercel fará deploy automaticamente! 🎉

### Opção 2: Netlify

Alternativa gratuita com processo similar.

#### Passos:

1. **Upload para GitHub** (mesmo processo da Vercel)

2. **Deploy no Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Faça login com GitHub
   - Clique em "Add new site" → "Import an existing project"
   - Selecione seu repositório
   - Configure as variáveis de ambiente
   - Clique em "Deploy site"

### Opção 3: Render

Outra opção gratuita com bom desempenho.

#### Passos:

1. **Upload para GitHub** (mesmo processo)

2. **Deploy no Render**
   - Acesse [render.com](https://render.com)
   - Criar "New Static Site"
   - Conectar repositório GitHub
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Adicionar variáveis de ambiente
   - Deploy!

## 🗄️ Configurar Banco de Dados Supabase

Se ainda não configurou o Supabase:

1. **Criar projeto no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie uma conta e novo projeto
   - Anote a URL e ANON KEY

2. **Executar SQL Schema**
   - No dashboard do Supabase, vá em "SQL Editor"
   - Execute o script `supabase/schema.sql` (se existir)
   - Execute o script `supabase_add_companion_names.sql`

3. **Configurar Row Level Security (RLS)**
   - Configure as políticas de segurança conforme necessário
   - Para ambiente de desenvolvimento, você pode desabilitar RLS temporariamente

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] `.env.example` está atualizado com todas as variáveis necessárias
- [ ] `.gitignore` está configurado corretamente (não commitar `.env`)
- [ ] Aplicação builda sem erros (`npm run build`)
- [ ] Todas as variáveis de ambiente estão configuradas na plataforma
- [ ] Banco de dados Supabase está configurado e acessível
- [ ] Scripts SQL foram executados no Supabase
- [ ] Testar a aplicação após deploy

## 🧪 Testar o Build Local

Antes de fazer deploy, teste o build localmente:

```bash
# Criar build de produção
npm run build

# Testar o build localmente
npm run preview
```

Acesse `http://localhost:4173` e verifique se tudo funciona.

## 🔧 Troubleshooting

### Erro: "Supabase credentials missing"
- Verifique se as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão configuradas
- No Vite, variáveis devem começar com `VITE_`

### Erro: 404 ao navegar
- Certifique-se de que o arquivo `vercel.json` ou `netlify.toml` está presente
- Isso garante que SPAs funcionem corretamente com routing

### Erro de CORS no Supabase
- Verifique as configurações de CORS no dashboard do Supabase
- Adicione o domínio do seu deploy nas URLs permitidas

### Build falha
- Execute `npm run build` localmente para ver erros
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que não há imports de arquivos inexistentes

## 📱 Após o Deploy

1. **Testar todas as funcionalidades**
   - Busca de convidados
   - Confirmação de presença
   - Painel administrativo
   - Check-in de convidados

2. **Configurar domínio personalizado** (opcional)
   - Todas as plataformas permitem configurar domínio próprio
   - Exemplo: `casamento.seudominio.com`

3. **Monitorar logs**
   - Use as ferramentas de log da plataforma para monitorar erros

## 🎉 Pronto!

Sua aplicação está no ar! Compartilhe o link com seus convidados.

---

**Precisa de ajuda?** Consulte a documentação:
- [Vite Deploy](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Supabase Docs](https://supabase.com/docs)
