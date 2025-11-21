# Configuração de Variáveis de Ambiente

Este documento descreve as variáveis de ambiente necessárias para o funcionamento completo da aplicação.

## ⚠️ Segurança

**NUNCA** commite arquivos `.env*` no repositório. Eles estão no `.gitignore` por segurança.

## Variáveis Necessárias

### ⚠️ APIs de IA Desabilitadas

As funcionalidades de chat com IA foram desabilitadas. Não é necessário configurar variáveis de ambiente para APIs de IA no momento.

### OPENAI_API_KEY (Opcional - Para Funcionalidades Futuras)

A chave da API da OpenAI pode ser configurada para funcionalidades futuras de IA, mas não é necessária para o funcionamento atual da aplicação.

**Nota:** A funcionalidade de chat com IA foi removida. Esta variável é apenas para referência futura.

## Variáveis Opcionais (Futuras)

### Supabase (Para funcionalidades futuras)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

## Estrutura de Arquivos .env

```
.env.local          # Arquivo local (não commitado)
.env.example        # Template de exemplo (pode ser commitado)
.env.development    # Variáveis de desenvolvimento
.env.production     # Variáveis de produção
```

## Verificação

Para verificar se as variáveis estão configuradas corretamente:

```bash
# No terminal, execute:
node -e "console.log(process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada')"
```

## Troubleshooting

### ⚠️ Funcionalidades de IA Desabilitadas

As funcionalidades de chat com IA foram desabilitadas. Não é necessário configurar variáveis de ambiente para APIs de IA.

### No GitHub Pages
- GitHub Pages é estático e não suporta variáveis de ambiente server-side
- API routes não funcionam no GitHub Pages
- Use Vercel ou Netlify para funcionalidades completas

