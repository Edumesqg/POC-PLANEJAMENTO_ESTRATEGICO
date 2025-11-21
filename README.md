# POC - Planejamento Estratégico

Aplicação web para planejamento estratégico empresarial com análise SWOT, desenvolvida com Next.js 13.

## 🚀 Funcionalidades

- Formulários de diagnóstico empresarial
- Geração automática de análise SWOT
- Análise SWOT automatizada
- Dashboard de acompanhamento
- Interface responsiva e moderna

## 📋 Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn
- (Opcional) Conta OpenAI para funcionalidades futuras de IA

## 🛠️ Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/POC-PLANEJAMENTO_ESTRATEGICO.git
cd POC-PLANEJAMENTO_ESTRATEGICO
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local e adicione suas credenciais
# OPENAI_API_KEY=sua_chave_aqui (opcional, para funcionalidades futuras)
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:3000`

## 📦 Deploy no GitHub Pages

### ⚠️ Importante: Limitações do GitHub Pages

O GitHub Pages é um serviço de hospedagem estática, o que significa que **API Routes do Next.js não funcionarão**.

### Opções de Deploy:

#### Opção 1: GitHub Pages (Apenas Frontend)
- ✅ Funciona: Páginas estáticas, formulários, navegação
- ❌ Não funciona: API Routes

#### Opção 2: Vercel (Recomendado - Suporta API Routes)
- ✅ Funciona: Tudo, incluindo API Routes
- ✅ Deploy automático via GitHub
- ✅ Grátis para projetos pessoais

#### Opção 3: Netlify (Suporta API Routes)
- ✅ Funciona: Tudo, incluindo API Routes
- ✅ Deploy automático via GitHub
- ✅ Grátis para projetos pessoais

### Configuração para GitHub Pages:

1. **Habilite GitHub Pages no repositório:**
   - Vá em Settings > Pages
   - Source: selecione "GitHub Actions"

2. **Configure Secrets (se necessário):**
   - Vá em Settings > Secrets and variables > Actions
   - Adicione `OPENAI_API_KEY` (necessário apenas se usar API routes)

3. **Faça push para a branch main:**
```bash
git add .
git commit -m "Configuração para deploy"
git push origin main
```

4. **O deploy será automático:**
   - O workflow `.github/workflows/deploy.yml` será executado
   - Aguarde alguns minutos
   - Acesse: `https://seu-usuario.github.io/POC-PLANEJAMENTO_ESTRATEGICO`

### Configuração para Vercel (Recomendado):

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `OPENAI_API_KEY`: sua chave da OpenAI
4. Deploy automático a cada push!

## 🔒 Segurança

- ✅ Arquivos `.env*` estão no `.gitignore`
- ✅ Nenhuma credencial está hardcoded no código
- ✅ Variáveis sensíveis devem ser configuradas via Secrets (GitHub) ou Environment Variables (Vercel)

## 📁 Estrutura do Projeto

```
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas protegidas
│   ├── (public)/          # Rotas públicas
│   └── api/               # API Routes (não funciona no GitHub Pages)
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn/ui
│   └── ...
├── lib/                  # Utilitários e helpers
└── types/                # Tipos TypeScript
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## 📝 Tecnologias

- **Next.js 13** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- (Opcional) **OpenAI API** - Para funcionalidades futuras de IA

## 📄 Licença

Este projeto é uma POC (Proof of Concept) para demonstração.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
