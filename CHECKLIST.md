# ✅ Checklist de Deploy - Casamento App

Use este checklist para garantir que tudo está pronto antes de colocar no ar.

## 🔧 Pré-Deploy

### Código e Dependências
- [ ] Código commitado no Git
- [ ] `npm install` executado sem erros
- [ ] `npm run build` executado com sucesso
- [ ] `npm run preview` testado localmente
- [ ] Sem warnings críticos no build
- [ ] Todas as dependências estão no `package.json`

### Arquivos de Configuração
- [ ] `.env.example` criado e atualizado
- [ ] `.gitignore` configurado (protegendo `.env`)
- [ ] `vercel.json` ou `netlify.toml` presente
- [ ] `README.md` atualizado
- [ ] `DEPLOY.md` disponível

### Código
- [ ] Credenciais hardcoded removidas do código
- [ ] Variáveis de ambiente configuradas corretamente
- [ ] `supabaseClient.ts` usa `import.meta.env.VITE_*`
- [ ] Sem `console.log` desnecessários em produção
- [ ] Tratamento de erros implementado

## 🗄️ Banco de Dados

### Supabase
- [ ] Conta criada no Supabase
- [ ] Projeto criado
- [ ] URL e ANON_KEY copiados
- [ ] SQL Schema executado:
  - [ ] `supabase/schema.sql`
  - [ ] `supabase_add_companion_names.sql`
- [ ] Tabelas criadas:
  - [ ] `guests`
  - [ ] `rsvps`
  - [ ] `checkins`
  - [ ] `events`
  - [ ] `profiles`
- [ ] Row Level Security (RLS) configurado
- [ ] Políticas de acesso criadas
- [ ] Dados de teste inseridos (opcional)

## 🔐 Segurança

- [ ] Arquivo `.env` NÃO está no Git
- [ ] Secrets não estão expostos no código
- [ ] CORS configurado no Supabase (se necessário)
- [ ] Validações de input implementadas
- [ ] Proteção contra nomes dos noivos ativa
- [ ] Autenticação admin funcionando

## 🌐 Deploy (escolha uma plataforma)

### GitHub
- [ ] Repositório criado no GitHub
- [ ] Código enviado (`git push`)
- [ ] `.env` está no `.gitignore`
- [ ] Repositório é privado (se necessário)

### Vercel
- [ ] Conta criada
- [ ] Projeto importado do GitHub
- [ ] Variáveis de ambiente configuradas:
  - [ ] `GEMINI_API_KEY`
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Build executado com sucesso
- [ ] Deploy completo
- [ ] URL de produção acessível

### Netlify (alternativa)
- [ ] Conta criada
- [ ] Projeto importado do GitHub
- [ ] Build settings configurados
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy completo
- [ ] URL de produção acessível

### Render (alternativa)
- [ ] Conta criada
- [ ] Static Site criado
- [ ] Repositório conectado
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy completo

## ✅ Pós-Deploy

### Testes Funcionais
- [ ] Site carrega sem erros
- [ ] Busca de convidados funciona
- [ ] RSVP pode ser enviado
- [ ] Dados aparecem no Supabase
- [ ] Painel admin acessível
- [ ] Check-in funciona
- [ ] Responsividade em mobile OK
- [ ] Responsividade em tablet OK
- [ ] Funciona em diferentes browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Performance
- [ ] Página carrega em < 3 segundos
- [ ] Imagens otimizadas
- [ ] Sem erros no console
- [ ] Sem warnings críticos

### SEO e Acessibilidade
- [ ] Título da página configurado
- [ ] Meta descriptions presentes
- [ ] Favicon configurado
- [ ] Contraste de cores adequado
- [ ] Textos legíveis

## 📱 Domínio Personalizado (opcional)

- [ ] Domínio comprado
- [ ] DNS configurado
- [ ] Domínio conectado na plataforma
- [ ] SSL/HTTPS ativo
- [ ] Redirecionamento www configurado

## 📊 Monitoramento

- [ ] Analytics configurado (opcional)
- [ ] Logs de erro monitorados
- [ ] Backup do banco de dados configurado
- [ ] Plano de manutenção definido

## 🎉 Lançamento

- [ ] Testes finais completos
- [ ] URL compartilhada com stakeholders
- [ ] Documentação entregue
- [ ] Treinamento admin realizado (se necessário)
- [ ] Link do convite enviado para convidados

## 📝 Notas Importantes

### URLs de Produção
- Site: ___________________________
- Supabase: _______________________
- Admin: __________________________

### Credenciais Admin
- Email: __________________________
- Senha: __________________________ (armazene com segurança!)

### Contatos de Suporte
- Plataforma de Deploy: ___________
- Supabase: _______________________
- Desenvolvedor: __________________

### Data do Evento
- Data: ___________________________
- Hora: ___________________________
- Local: __________________________

---

## 🚨 Troubleshooting Rápido

**Site não carrega**
1. Verifique variáveis de ambiente
2. Confira logs na plataforma
3. Teste o build localmente

**Erro de Supabase**
1. Confirme URL e Key
2. Verifique status do Supabase
3. Confira RLS policies

**404 em rotas**
1. Verifique `vercel.json` ou `netlify.toml`
2. Confirme rewrites/redirects
3. Teste routing localmente

---

**✨ Tudo pronto? Parabéns pelo deploy! ✨**

Data do Deploy: ___/___/______
Responsável: ___________________
