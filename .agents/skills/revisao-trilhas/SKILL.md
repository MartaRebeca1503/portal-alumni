---
name: revisao-trilhas
description: Revisa PRs do Portal Alumni PdA conferindo o que lint e testes não pegam - regras da constituição (dados nunca hardcoded, links diretos, mensagem de filtro vazio), consistência do padrão de script.js entre as 4 trilhas e robustez da renderização. Use ao revisar qualquer diff em trilha-*/ ou index.html.
---

# Revisão de PRs do Portal Alumni

Esta revisão vem **depois** do CI (lint, typecheck, build, test). Não repita o que o ESLint ou o TypeScript já apontam. Olhe só para o que eles não enxergam. As regras vêm de `memory/constitution.md` e de `CLAUDE.md`.

## O que olhar

### 1. Regras inegociáveis da constituição
- **Dados hardcoded:** título, link ou material escrito no HTML ou no JS em vez de vir da planilha (CSV). Adicionar material deve ser adicionar linha na planilha, nunca editar código.
- **Zero build e zero dependência de runtime:** import de framework, bundler ou biblioteca no código que roda no navegador.
- **Links de card:** devem apontar direto ao material (YouTube, Drive ou artigo), com `target="_blank"` e `rel="noopener"`. Nunca para um post do Google Classroom.
- **Filtro sem resultado:** deve mostrar exatamente `Nenhum material encontrado. Tente outro filtro.` e nunca uma tela vazia.
- **Identidade visual:** roxo `#2D1B4E`, amarelo `#FFD700` e fundo branco ou bege claro. Cor nova fora dessa paleta em elemento de destaque, CTA ou estado ativo.
- **Mobile-first:** regra de CSS que só funciona em desktop, ou `@media (min-width)` ausente onde o layout quebra em ~375px.

### 2. Consistência do padrão entre trilhas
Cada trilha é autocontida, sem código compartilhado. O padrão de `script.js` deve ser o mesmo nas 4 (`SHEET_ID` e `GID`, `init`, `parseCSV`, `render`, `createCard`, `filtroFormato` e `filtroMomento`).
- Se o diff muda uma trilha, as outras 3 ficaram para trás? Aponte a divergência. Quando a mudança for de UI, o mesmo ajuste de HTML e CSS deve existir nas 4.
- `formatoLabels` e `momentoLabels` devem cobrir os enums `video|pdf|artigo` e `buscando-vaga|preparando-entrevista|crescendo-emprego`. Valor novo sem label correspondente é problema.
- Os `data-value` dos botões de filtro no HTML devem bater com esses enums.

### 3. Robustez de dados e estados
- Linha sem `titulo`, `formato`, `momento` ou `link` deve ser ignorada, nunca quebrar a página.
- `#loading`, `#error` e `#empty` devem ser mutuamente coerentes: o loading some em sucesso e em erro, e o erro nunca aparece junto com cards.
- Conteúdo da planilha injetado via `innerHTML` sem escape (risco de XSS, porque a planilha é editável por várias pessoas).
- Mudança em `parseCSV` sem teste novo em `test/parse-csv.test.mjs` cobrindo o cenário alterado.

## Classificação de cada achado
- **bloqueia:** viola regra inegociável da constituição ou quebra a página (exemplo: link para Classroom, dado hardcoded, erro não tratado).
- **sugestão:** melhora clareza, consistência ou robustez sem violar regra.
- **dúvida:** ambíguo, depende de decisão da dupla ou de contexto que o diff não mostra.

Não invente achado para preencher a lista. Se uma das 3 frentes não tem problema, diga isso em uma linha.

## Formato da saída
Use este formato exato, em português:

```
## Revisão da PR #<número>

**Resumo:** <1 a 2 frases sobre o que a PR muda>

### Achados
1. `<arquivo>:<linha>` — **<bloqueia|sugestão|dúvida>**
   - **Problema:** <o que está errado ou estranho>
   - **Por que importa:** <qual regra, risco ou inconsistência isso causa>

(repita para cada achado, ordenados do mais grave ao menos grave)

### Conferido sem problemas
- <frente da revisão que foi checada e está ok>

### O que não consegui verificar
- <o que o diff não permite ver: planilha real, comportamento no navegador, viewport mobile etc.>
```

Todo achado precisa de arquivo e linha reais, lidos no diff (`gh pr diff <número>`). Não cite linha de memória.
