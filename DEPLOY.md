# 🚀 Guia de Deploy

Este guia explica como fazer deploy da aplicação em diferentes plataformas.

## 📋 Pré-requisitos

- Repositório no GitHub
- Conta na plataforma escolhida
- Variáveis de ambiente configuradas (veja [ENV_SETUP.md](./ENV_SETUP.md))

## 🎯 Opções de Deploy

### 1. Vercel (⭐ Recomendado)

**Vantagens:**
- ✅ Suporta API Routes do Next.js
- ✅ Deploy automático via GitHub
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Preview deployments para cada PR

**Passos:**

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" e faça login com GitHub
3. Clique em "Add New Project"
4. Selecione seu repositório
5. Configure:
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (padrão)
   - **Output Directory:** `.next` (padrão)
6. Adicione variáveis de ambiente (opcional):
   - Variáveis opcionais para funcionalidades futuras
7. Clique em "Deploy"
8. Aguarde o deploy (2-3 minutos)
9. ✅ Pronto! Sua aplicação estará no ar

**Deploy automático:**
- Cada push na branch `main` gera um novo deploy
- Cada Pull Request gera um preview deployment

**URL:**
- Produção: `https://seu-projeto.vercel.app`
- Preview: `https://seu-projeto-git-branch.vercel.app`

---

### 2. Netlify

**Vantagens:**
- ✅ Suporta API Routes (via Netlify Functions)
- ✅ Deploy automático via GitHub
- ✅ HTTPS gratuito
- ✅ Formulários e funções serverless

**Passos:**

1. Acesse [netlify.com](https://netlify.com)
2. Faça login com GitHub
3. Clique em "Add new site" > "Import an existing project"
4. Selecione seu repositório
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Functions directory:** `netlify/functions` (criar se necessário)
6. Adicione variáveis de ambiente:
   - Variáveis opcionais para funcionalidades futuras
7. Clique em "Deploy site"
8. Aguarde o deploy

**Nota:** Para API routes funcionarem no Netlify, você precisa converter as routes para Netlify Functions.

---

### 3. GitHub Pages

**Limitações:**
- ❌ Não suporta API Routes
- ❌ Apenas páginas estáticas
- ✅ Gratuito e simples

**Passos:**

1. **Configure o repositório:**
   - Vá em Settings > Pages
   - Source: selecione "GitHub Actions"

2. **O workflow já está configurado:**
   - O arquivo `.github/workflows/deploy.yml` já está pronto
   - Ele será executado automaticamente no push

3. **Faça push para a branch main:**
   ```bash
   git add .
   git commit -m "Configuração para deploy"
   git push origin main
   ```

4. **Aguarde o deploy:**
   - Vá em Actions para ver o progresso
   - Aguarde 3-5 minutos

5. **Acesse sua aplicação:**
   - URL: `https://seu-usuario.github.io/POC-PLANEJAMENTO_ESTRATEGICO`
   - Ou: `https://seu-usuario.github.io/nome-do-repo`

**⚠️ Importante:**
- Funcionalidades de API não funcionarão (requer API routes)
- Formulários e navegação funcionarão normalmente
- Para funcionalidades completas, use Vercel ou Netlify

---

### 4. Railway

**Vantagens:**
- ✅ Suporta API Routes
- ✅ Deploy automático via GitHub
- ✅ Banco de dados incluído
- ✅ $5/mês crédito gratuito

**Passos:**

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project" > "Deploy from GitHub repo"
4. Selecione seu repositório
5. Railway detectará automaticamente o Next.js
6. Adicione variáveis de ambiente:
   - Variáveis opcionais para funcionalidades futuras
7. Aguarde o deploy

---

## 🔧 Configuração Pós-Deploy

### Verificar se está funcionando:

1. **Páginas estáticas:**
   - ✅ Landing page
   - ✅ Formulários
   - ✅ Navegação

2. **API Routes (apenas Vercel/Netlify/Railway):**
   - ✅ Geração SWOT: `/api/generate-swot-initial`

### Testar Funcionalidades:

1. Acesse o dashboard
2. Teste os formulários
3. Verifique a geração de SWOT
4. Se funcionar: ✅ Deploy completo!
5. Se não funcionar: Verifique variáveis de ambiente

---

## 🐛 Troubleshooting

### Erro: "404 Not Found" nas páginas

**GitHub Pages:**
- Verifique o `basePath` no `next.config.js`
- Se seu repo não é a raiz, descomente e ajuste:
  ```js
  basePath: '/nome-do-repo',
  ```

**Vercel/Netlify:**
- Geralmente não precisa de basePath
- Verifique se o build foi bem-sucedido

### Erro: "API route não encontrada"

**Causa:** GitHub Pages não suporta API routes

**Solução:**
- Use Vercel, Netlify ou Railway
- Ou remova a funcionalidade de chat

### Erro: "API não configurada"

**Solução:**
1. Verifique se as variáveis necessárias estão configuradas na plataforma
2. Verifique se os nomes estão corretos (case-sensitive)
3. Faça um novo deploy após adicionar variáveis

### Build falha

**Verifique:**
- Logs de build na plataforma
- Dependências instaladas corretamente
- Versão do Node.js (recomendado: 20)

---

## 📊 Comparação de Plataformas

| Plataforma | API Routes | Grátis | Deploy Auto | Dificuldade |
|------------|------------|--------|-------------|-------------|
| Vercel     | ✅         | ✅     | ✅          | ⭐ Fácil    |
| Netlify    | ✅*        | ✅     | ✅          | ⭐⭐ Médio  |
| GitHub Pages | ❌      | ✅     | ✅          | ⭐ Fácil    |
| Railway    | ✅         | 💰     | ✅          | ⭐⭐ Médio  |

*Netlify requer conversão para Functions

---

## 🎉 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Teste todas as funcionalidades
2. ✅ Configure domínio customizado (opcional)
3. ✅ Configure analytics (opcional)
4. ✅ Configure monitoramento de erros (opcional)

---

## 📚 Recursos Adicionais

- [Documentação Next.js Deploy](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://docs.github.com/pages)

