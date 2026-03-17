# Components — Coding Rules

## Links (`<a>` elements)

**Rule:** Always provide a valid, meaningful value for the `href` attribute.

- **Never use `href="#"`** as a placeholder. It causes accessibility issues, triggers linter errors, and provides no navigational value.
- Use a real path (e.g. `href="/users/123"`), a dynamic value (e.g. `href={`/users/${user.id}`}`), or a full URL.
- If the element is purely interactive (no navigation intent), replace `<a>` with a `<button>` or use the `Button` component instead.

### Examples

```tsx
// Bad
<a href="#">Learn more</a>

// Good — real path
<a href="/learn-more">Learn more</a>

// Good — dynamic path
<a href={`/users/${user.id}`}>{user.name}</a>

// Good — use Button when there is no navigation intent
<Button onClick={handleClick}>Learn more</Button>
```

---

## Padrão de Composição em Componentes

**Regra:** Componentes com partes internas nomeadas (título, descrição, rodapé, etc.) devem ser decompostos em sub-componentes em vez de receber `props` como `title`, `description`, `footer`, etc.

### Estrutura de arquivos

Cada componente composto fica em **sua própria pasta**:

```
src/components/my-card/
├── index.tsx          ← re-exporta tudo
├── my-card.tsx        ← componente principal que compõe as partes
└── my-card-parts.tsx  ← sub-componentes primitivos (Root, Title, etc.)
```

### Nomenclatura

- Use o prefixo do componente pai em todos os sub-componentes.
- Sufixos comuns: `Root`, `Header`, `Title`, `Description`, `Body`, `Footer`, `Badge`, `Grid`.
- Adicione `data-slot="<nome>"` em cada sub-componente para facilitar depuração e testes.

### Exemplos

```tsx
// Ruim — props achatadas
<AnalysisCard title="Receita" description="Total do mês" footer={<Button />} />

// Bom — composição
<AnalysisCardRoot>
  <AnalysisCardHeader>
    <AnalysisCardTitle>Receita</AnalysisCardTitle>
    <AnalysisCardDescription>Total do mês</AnalysisCardDescription>
  </AnalysisCardHeader>
  <AnalysisCardFooter>
    <Button>Ver detalhes</Button>
  </AnalysisCardFooter>
</AnalysisCardRoot>
```

### Sub-componentes primitivos

Cada parte deve:
1. Aceitar `ComponentProps<'elemento-html'>` para ser extensível.
2. Usar `twMerge` para mesclar classes externas com as padrão.
3. Passar `...props` para permitir qualquer atributo HTML nativo.

```tsx
export function AnalysisCardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="analysis-card-title"
      className={twMerge('text-lg font-semibold', className)}
      {...props}
    />
  )
}
```
