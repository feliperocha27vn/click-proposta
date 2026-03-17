# AGENTS.md — Click Proposta

Guia de contexto e padrões globais para agentes de IA trabalhando neste repositório.

## Estrutura do monorepo

```
click-proposta-v2/
├── api/                  # Backend — Fastify + Prisma + PostgreSQL (Supabase)
├── web/                  # Frontend — React 19 + Vite + TanStack Router
└── click-proposta-bot/   # Bot WhatsApp — Evolution API
```

## Stack principal

| Camada | Tecnologias |
|---|---|
| Frontend | React 19, TypeScript, Vite 7, TanStack Router/Query, Tailwind CSS 4, Radix UI, Zod, React Hook Form |
| Backend | Node.js 22, Fastify, Prisma, PostgreSQL (Supabase), Google Gemini AI, Stripe, JWT |
| Bot | Evolution API (WhatsApp), integra com o mesmo backend |
| Infra | Supabase (auth + DB + storage), Docker |

## Padrões globais

### Componentes React
- Usar **padrão de composição** — sub-componentes (`Root`, `Header`, `Title`, `Body`, `Footer`) em vez de props achatadas (`title`, `description`).
- Cada componente composto fica em **pasta própria** com `index.tsx`, `*.tsx` e `*-parts.tsx`.
- Sub-componentes aceitam `ComponentProps<'tag'>`, usam `twMerge` e repassam `...props`.
- Adicionar `data-slot="nome"` em cada parte para facilitar depuração.
- Ver `web/src/components/AGENTS.md` para regras detalhadas de componentes.

### Links (`<a>`)
- **Nunca usar `href="#"`**. Usar caminho real, rota dinâmica ou `<Button>` se não houver navegação.

### Commits
- Usar **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

### Código
- TypeScript em todo o projeto — sem `any` desnecessário.
- Validação de dados com **Zod** (frontend e backend).
- Linter/formatter: **Biome** (configurado na raiz).
- Backend segue **Clean Architecture**: `use-cases/` → `repositories/` → `http/`.

## Variáveis de ambiente

- Frontend: `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Backend: `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Nunca commitar arquivos `.env` com valores reais.**
