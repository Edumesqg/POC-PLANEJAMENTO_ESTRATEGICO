# ✅ Checklist de Deploy

Use este checklist antes de fazer push para o GitHub.

## 🔒 Segurança

- [x] Verificar que não há chaves de API hardcoded no código
- [x] Verificar que arquivos `.env*` estão no `.gitignore`
- [x] Verificar que nenhuma credencial está em comentários ou logs
- [x] Verificar que variáveis sensíveis usam `process.env`

## 📁 Arquivos de Configuração

- [x] `next.config.js` configurado para export estático (GitHub Pages)
- [x] `.gitignore` atualizado com todos os arquivos sensíveis
- [x] `.github/workflows/deploy.yml` criado e configurado
- [x] `README.md` atualizado com instruções
- [x] `DEPLOY.md` criado com guia completo
- [x] `ENV_SETUP.md` criado com instruções de variáveis

## 🧪 Testes Locais

- [ ] Build local funciona: `npm run build`
- [ ] Não há erros de TypeScript: `npm run typecheck`
- [ ] Não há erros de lint: `npm run lint`
- [ ] Aplicação funciona em desenvolvimento: `npm run dev`

## 🚀 Preparação para Deploy

### Para GitHub Pages:
- [ ] Repositório criado no GitHub
- [ ] Código commitado e pronto para push
- [ ] GitHub Pages habilitado (Settings > Pages > Source: GitHub Actions)
- [ ] Secrets configurados (se necessário): Settings > Secrets and variables > Actions

### Para Vercel (Recomendado):
- [ ] Conta Vercel criada
- [ ] Repositório conectado
- [ ] Variáveis de ambiente configuradas (se necessário):
  - [ ] Variáveis opcionais para funcionalidades futuras
- [ ] Deploy inicial executado

## 📝 Documentação

- [ ] README.md atualizado
- [ ] Instruções de instalação verificadas
- [ ] Links e URLs verificados
- [ ] Limitações documentadas (GitHub Pages vs Vercel)

## 🎯 Após o Deploy

- [ ] Testar todas as páginas
- [ ] Testar formulários
- [ ] Testar navegação
- [ ] Testar funcionalidades principais
- [ ] Verificar responsividade mobile
- [ ] Verificar que não há erros no console

## 🔍 Verificação Final

Antes de fazer push, execute:

```bash
# 1. Verificar que não há arquivos sensíveis
git status
# Certifique-se de que .env* não aparece

# 2. Verificar build
npm run build

# 3. Verificar tipos
npm run typecheck

# 4. Verificar lint
npm run lint

# 5. Fazer commit
git add .
git commit -m "Configuração para deploy no GitHub"

# 6. Push
git push origin main
```

## ⚠️ Lembretes Importantes

1. **GitHub Pages é estático**: API routes não funcionarão
2. **Vercel é recomendado**: Para funcionalidades completas
3. **Variáveis de ambiente**: Configure nas Secrets (GitHub) ou Environment Variables (Vercel)
4. **Teste localmente primeiro**: Sempre teste o build antes de fazer deploy

## 🆘 Problemas Comuns

### Build falha
- Verifique logs de erro
- Verifique versão do Node.js (20+)
- Limpe cache: `rm -rf .next node_modules && npm install`

### Páginas não carregam
- Verifique `basePath` no `next.config.js`
- Verifique configuração do GitHub Pages
- Verifique se o workflow foi executado

### API não funciona
- GitHub Pages não suporta API routes
- Use Vercel ou Netlify
- Ou remova funcionalidades que dependem de API

---

**Status:** ✅ Pronto para deploy!

