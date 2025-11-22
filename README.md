# 💍 Aplicação de Convite de Casamento - Lumina Wedding

Aplicação completa para gerenciamento de convites de casamento, com confirmação de presença (RSVP), painel administrativo e check-in de convidados.

## ✨ Funcionalidades

- 🎯 **Busca de Convidados**: Sistema de busca com proteção contra nomes dos noivos
- ✅ **RSVP Online**: Confirmação de presença com quantidade de adultos e crianças
- 👥 **Gestão de Acompanhantes**: Registro de nomes de acompanhantes
- 📊 **Painel Administrativo**: Dashboard completo com estatísticas e gestão de convidados
- ✓ **Check-in**: Sistema de check-in no dia do evento
- 🎨 **Design Moderno**: Interface premium com animações e glassmorphism
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🤖 **IA Integrada**: Funcionalidades com Google Gemini AI

## 🚀 Tecnologias

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: CSS com design system moderno
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI**: Google Gemini API

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- API Key do Google Gemini (opcional, para funcionalidades de IA)

## 🔧 Instalação Local

1. **Clone o repositório** (ou baixe os arquivos)
   ```bash
   git clone <seu-repositorio>
   cd casamentop
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Copie o arquivo `.env.example` para `.env`:
   ```bash
   copy .env.example .env
   ```
   
   Edite o arquivo `.env` com suas credenciais:
   ```env
   GEMINI_API_KEY=sua-chave-gemini
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon
   ```

4. **Configure o banco de dados Supabase**
   
   No dashboard do Supabase, execute os scripts SQL:
   - `supabase/schema.sql` (schema principal)
   - `supabase_add_companion_names.sql` (adiciona coluna de acompanhantes)

5. **Execute a aplicação**
   ```bash
   npm run dev
   ```
   
   Acesse: `http://localhost:3000`

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais:

- **guests**: Informações dos convidados (nome, categoria, limites)
- **rsvps**: Confirmações de presença com status e acompanhantes
- **checkins**: Registro de check-ins no evento
- **events**: Informações do evento
- **profiles**: Perfis de administradores

## 🎨 Estrutura do Projeto

```
casamentop/
├── components/          # Componentes React
│   ├── Admin/          # Painel administrativo
│   ├── CheckIn/        # Sistema de check-in
│   ├── GuestInvite/    # Convite e RSVP
│   └── shared/         # Componentes compartilhados
├── services/           # Serviços e integrações
│   ├── supabaseClient.ts
│   ├── storageService.ts
│   └── geminiService.ts
├── pages/              # Páginas da aplicação
├── public/             # Arquivos estáticos
├── types.ts            # Definições TypeScript
├── App.tsx             # Componente principal
└── index.html          # HTML base
```

## 📦 Build para Produção

```bash
# Criar build de produção
npm run build

# Preview do build
npm run preview
```

Os arquivos otimizados estarão em `dist/`.

## 🌐 Deploy

Para instruções detalhadas de deploy, consulte o arquivo **[DEPLOY.md](./DEPLOY.md)**.

### Deploy Rápido:

#### Vercel (Recomendado)
1. Faça push do código para GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy! ✨

#### Netlify
1. Faça push do código para GitHub
2. Importe o projeto no [Netlify](https://netlify.com)
3. Configure as variáveis de ambiente
4. Deploy! ✨

## 🔐 Segurança

- ✅ Credenciais em variáveis de ambiente
- ✅ Proteção contra busca dos nomes dos noivos
- ✅ Validação de nomes de acompanhantes
- ✅ Row Level Security (RLS) no Supabase
- ✅ Autenticação para área administrativa
- ✅ Sanitização de inputs

## 📱 Funcionalidades por Componente

### Convite Online
- Busca de convidado por nome
- Visualização de convite personalizado
- Confirmação/recusa de presença
- Seleção de adultos e crianças
- Registro de nomes de acompanhantes
- Versículo bíblico sobre casamento

### Painel Admin
- Dashboard com estatísticas em tempo real
- Lista completa de convidados
- Filtros por status e categoria
- Adicionar/editar/excluir convidados
- Importação em massa (CSV/Excel)
- Exportação de dados
- Visualização de RSVPs

### Check-in
- Busca rápida de convidados
- Registro de check-in
- Confirmação de quantidade de pessoas
- Histórico de check-ins

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `GEMINI_API_KEY` | Chave da API do Google Gemini | Não* |
| `VITE_SUPABASE_URL` | URL do projeto Supabase | Sim |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do Supabase | Sim |

*A aplicação funciona sem a key do Gemini, mas algumas funcionalidades de IA ficam desabilitadas.

## 🐛 Troubleshooting

### Erro de conexão com Supabase
- Verifique se as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretas
- Confirme que o projeto Supabase está ativo

### Erro ao fazer build
- Delete `node_modules/` e `package-lock.json`
- Execute `npm install` novamente
- Execute `npm run build`

### Página em branco após deploy
- Verifique se as variáveis de ambiente estão configuradas na plataforma
- Confira os logs de erro no console do navegador
- Certifique-se de que os arquivos de configuração (`vercel.json` ou `netlify.toml`) estão presentes

## 📄 Licença

Este projeto foi criado para uso pessoal em eventos de casamento.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Suporte

Para dúvidas ou suporte, consulte:
- [Documentação do Vite](https://vitejs.dev)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do React](https://react.dev)

---

Feito com ❤️ para celebrar momentos especiais
