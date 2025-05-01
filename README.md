# ESports.HUB

<p align="center">
  <!-- Remover ou substituir a linha da imagem do logo -->
</p>

ESports.HUB é uma plataforma inovadora projetada para conectar fãs e profissionais de eSports no Brasil. Nossa missão é criar um ecossistema completo onde entusiastas possam interagir, participar de eventos, validar seus perfis e se conectar com a comunidade de eSports brasileira.

## Sobre o Projeto

ESports.HUB surgiu da necessidade de criar um ambiente centralizado para a comunidade brasileira de eSports. A plataforma oferece:

- **Autenticação Segura**: Sistema robusto de login e cadastro com validação de identidade
- **Perfis Verificados**: Validação de perfis de jogadores usando inteligência artificial
- **Eventos**: Participação e acompanhamento de eventos de eSports
- **Conexões**: Integração com redes sociais e plataformas de eSports
- **Análise de Perfil**: Verificação avançada de perfis em plataformas de eSports como FURIA, FACEIT, etc.

## Tecnologias

Este projeto é construído com um stack moderno e robusto:

- **Frontend**:
  - React 18
  - TypeScript
  - Vite (para build e desenvolvimento)
  - Tailwind CSS (para estilização responsiva)
  - shadcn/ui (componentes reutilizáveis)
  - Tanstack Query (para gerenciamento de estado e requisições)

- **Backend**:
  - Supabase (autenticação, banco de dados e armazenamento)
  - Edge Functions (para processamento seguro de dados)
  - PostgreSQL (banco de dados relacional)

- **Integração com IA**:
  - OpenAI API (para validação de documentos e perfis)
  - Análise de perfis de eSports

## Arquitetura do Projeto

```
ESports.HUB/
├── src/
│   ├── components/     # Componentes reutilizáveis da UI
│   │   ├── ui/         # Componentes básicos do shadcn/ui
│   │   ├── profile/    # Componentes específicos para perfil
│   │   └── cadastro/   # Componentes do fluxo de cadastro
│   ├── contexts/       # Contextos React (Auth, etc.)
│   ├── hooks/          # Hooks personalizados
│   ├── integrations/   # Integrações com serviços externos
│   │   └── supabase/   # Cliente e tipos do Supabase
│   ├── lib/            # Funções utilitárias
│   ├── pages/          # Páginas da aplicação
│   └── utils/          # Utilitários gerais
├── public/             # Arquivos estáticos
├── supabase/           # Configuração e funções do Supabase
│   └── functions/      # Edge Functions do Supabase
└── ...                 # Arquivos de configuração (vite, tailwind, etc.)
```

## Modelos de Dados

### Principais Tabelas

- **user_profiles**: Informações básicas do usuário
- **user_games**: Jogos de interesse do usuário
- **user_events**: Eventos que o usuário participa
- **user_social_media**: Redes sociais do usuário
- **user_gaming_profiles**: Perfis verificados em plataformas de eSports
- **user_documents**: Documentos para verificação de identidade

## Funcionalidades Principais

### Autenticação e Verificação

- Cadastro e login de usuários
- Verificação de documentos de identidade usando IA
- Níveis de acesso baseados em verificação

### Perfil de Usuário

- Gestão de informações pessoais
- Conexão com redes sociais
- Validação de perfis em plataformas de eSports
- Histórico de eventos e atividades

### Eventos e Comunidade

- Listagem e inscrição em eventos
- Confirmação de presença
- Histórico de participação

### Validação de Perfis de eSports

- Verificação automática via API
- Análise de relevância do perfil
- Extração de informações sobre jogos e times

## Instalação e Configuração

```sh
# Clone o repositório
git clone https://github.com/seu-usuario/esports-hub.git

# Navegue para o diretório do projeto
cd esports-hub

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env baseado no .env.example

# Inicie o servidor de desenvolvimento
npm run dev
```

### Requisitos para Edge Functions

Para executar as Edge Functions localmente ou em produção:

1. Configurar uma conta no Supabase
2. Adicionar as seguintes variáveis secretas:
   - `OPENAI_API_KEY` - Para as funcionalidades de IA
   - `SUPABASE_URL` - URL do projeto Supabase
   - `SUPABASE_ANON_KEY` - Chave anônima do Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` - Chave de serviço do Supabase

## Implantação

```sh
# Compilar o projeto para produção
npm run build

# Visualizar a versão de produção localmente
npm run preview

# Deploy das Edge Functions (requer CLI do Supabase)
supabase functions deploy
```

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ para a comunidade brasileira de eSports.
