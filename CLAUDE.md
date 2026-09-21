# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Portal Alumni PdA — site estático (HTML/CSS/JS puro) com 4 "trilhas" de conteúdo (Guias Rápidos, High Agency, Soft Skills, Hard Skills). Cada trilha é uma página de cards filtráveis, cujos dados vêm de uma Google Sheets publicada como CSV. O site final é embedado via `<iframe>` no Google Sites do Portal Alumni.

Segue um fluxo Spec-Driven Development: `memory/constitution.md` define regras inegociáveis, `specs/001-trilha-conteudo/` tem spec/plan/data-model/tasks (templates com placeholders `{{ NOME_DA_TRILHA }}`, usados como referência ao criar/ajustar uma trilha).

## Comandos

Não há build, bundler, testes automatizados ou linter configurados — é HTML/CSS/JS servido estaticamente.

- Rodar localmente: abrir `index.html` direto no navegador, ou servir a pasta com qualquer servidor estático (ex. `python -m http.server`) para evitar problemas de CORS no `fetch`.
- Deploy: hospedagem estática (GitHub Pages) — sem passo de build.
- Verificação manual após qualquer mudança: abrir a trilha alterada no navegador, testar os filtros e conferir em viewport mobile (~375px), já que o design é mobile-first.

## Regras inegociáveis (`memory/constitution.md`)

Estas regras vencem qualquer decisão técnica em conflito:

- **Zero backend / zero build step.** Só HTML5 + CSS3 + JS vanilla. Sem framework, sem bundler.
- **Dados nunca hardcoded.** Cada trilha busca seus materiais em runtime via `fetch` de uma Google Sheets publicada como CSV — adicionar material = adicionar linha na planilha, nunca editar código.
- **Mobile-first.** Layout, filtros e cards precisam funcionar bem em tela pequena antes do desktop.
- **Identidade visual obrigatória**: roxo `#2D1B4E` (principal), amarelo `#FFD700` (destaque/CTA/estado ativo), fundo branco ou bege claro.
- **Links de card sempre diretos ao material** (YouTube/Drive/artigo em nova aba) — nunca um link de post do Google Classroom.
- **Campos mínimos por material**: `titulo`, `formato`, `momento`, `link`. Falta um → a linha é ignorada na renderização, nunca quebra a página.
- **Filtros sem resultado** mostram sempre `"Nenhum material encontrado. Tente outro filtro."`, nunca uma tela vazia.

## Arquitetura

```
portal-alumni/
├── index.html                 # Home: grid de links para as 4 trilhas
├── trilha-{guias-rapidos,high-agency,soft-skills,hard-skills}/
│   ├── index.html
│   ├── style.css
│   └── script.js               # cada trilha é independente e autocontida
├── memory/constitution.md      # regras inegociáveis (ver acima)
└── specs/001-trilha-conteudo/  # spec/plan/data-model/tasks (template de referência)
```

Cada trilha é uma página isolada (sem roteamento, sem compartilhamento de código entre trilhas) que segue sempre o mesmo padrão em `script.js`:

1. `SHEET_ID` + `GID` (aba da planilha) montam `CSV_URL` (`.../export?format=csv&gid=...`) — mesmo `SHEET_ID` em todas as trilhas, `GID` diferente por aba.
2. `init()` faz `fetch(CSV_URL)`, chama `parseCSV()` e depois `render()`; erro de rede mostra o elemento `#error`.
3. `parseCSV()` faz split ingênuo por `\n` e `,` (sem suporte a vírgula dentro de aspas) e descarta linhas sem os 4 campos válidos, retornando objetos `{ titulo, formato, momento, link }` (contrato em `specs/001-trilha-conteudo/data-model.md`).
4. Estado de filtro fica em duas variáveis módulo-level (`filtroFormato`, `filtroMomento`, default `"todos"`); cliques nos botões de filtro atualizam essas variáveis e chamam `render()` de novo — filtros são AND lógico, sem novo fetch.
5. `render()` filtra `allMaterials` em memória e recria os cards via `createCard()`, usando `formatoLabels`/`momentoLabels` para mapear os valores enum da planilha (`video|pdf|artigo`, `buscando-vaga|preparando-entrevista|crescendo-emprego`) para o texto exibido; mostra `#empty` quando o resultado é vazio.

Ao criar ou ajustar uma trilha, replicar esse mesmo padrão (mesma estrutura de `script.js`) em vez de introduzir uma abordagem nova — é o que mantém as 4 trilhas consistentes sem framework nem código compartilhado.
