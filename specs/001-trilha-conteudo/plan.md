# Plan: Trilha de Conteúdo — {{ NOME_DA_TRILHA }}

> Este arquivo traduz a `spec.md` em decisões técnicas. Não redefine o "o quê" —
> só o "como". Se uma decisão aqui contradiz a constitution, a constitution vence.

## 1. Stack

- **HTML5** semântico (sem framework).
- **CSS puro** (ou utilitário simples, sem Tailwind build step — pode usar CSS vars).
- **JavaScript vanilla** (ES6+), sem libs externas obrigatórias.
- Hospedagem estática (ex.: GitHub Pages) para gerar a URL que será embedada via `<iframe>` no Google Sites.

## 2. Arquitetura de arquivos

```
trilha-{{slug}}/
├── index.html
├── style.css
├── script.js
└── README.md   (como publicar / como apontar pra outra planilha)
```

Um único `index.html`, sem roteamento — é uma página só.

## 3. Origem dos dados (Google Sheets)

Decisão recomendada: publicar a planilha como CSV e buscar via `fetch` no carregamento da página.

- Na Google Sheets: **Arquivo → Compartilhar → Publicar na Web** → escolher a aba certa → formato CSV → copiar o link gerado (`https://docs.google.com/spreadsheets/d/{ID}/pub?gid={GID}&single=true&output=csv`).
- No `script.js`, fazer `fetch(CSV_URL)` e parsear com um parser CSV simples (linhas separadas por `\n`, campos por `,` — atenção a campos com vírgula dentro de aspas, se houver).
- Alternativa (negociável): usar a Google Visualization API (`gviz/tq`) que retorna JSON, evitando parsing manual de CSV. O agente pode escolher a que for mais simples de implementar e debugar.

## 4. Fluxo de carregamento

1. Página carrega → mostra estado de "carregando materiais...".
2. `fetch` busca o CSV/JSON da planilha.
3. Parseia linhas em objetos `{ titulo, formato, momento, link }` (ver `data-model.md`).
4. Renderiza todos os cards.
5. Filtros (formato + momento) escondem/mostram cards via classe CSS (`display: none` ou similar), sem refazer o fetch.
6. Se `fetch` falhar (planilha não publicada, sem internet) → mostrar mensagem de erro amigável, não tela branca.

## 5. Lógica dos filtros

- Estado de filtro ativo guardado em duas variáveis JS: `filtroFormato` (default: `"todos"`) e `filtroMomento` (default: `"todos"`).
- Clique num botão de filtro atualiza a variável correspondente e re-renderiza a visibilidade dos cards (AND lógico entre os dois filtros).
- Botão "Todos" reseta ambas as variáveis para `"todos"`.
- Se nenhum card visível após filtro → mostrar `<p id="empty-state">Nenhum material encontrado. Tente outro filtro.</p>`.

## 6. Componente Card

Cada card renderizado a partir do JS contém:
- Título do material
- Badge de formato (cor/ícone diferente por tipo: vídeo / pdf / artigo)
- Badge de momento de carreira
- O card todo é um `<a href="{link}" target="_blank" rel="noopener">` — clicável em qualquer ponto.

## 7. Responsividade

- Grid de cards: `display: grid` com `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` (ou similar) para se adaptar de 1 coluna no mobile a múltiplas no desktop.
- Filtros em linha com `flex-wrap: wrap` para não quebrar layout no celular.
- Testar em viewport de ~375px de largura antes de considerar pronto.

## 8. Tratamento de erros e estados vazios

| Situação | Comportamento esperado |
|---|---|
| Planilha não carrega (erro de rede/CORS) | Mensagem: "Não foi possível carregar os materiais agora. Tente novamente em alguns minutos." |
| Planilha carrega mas está vazia | Mensagem: "Ainda não há materiais cadastrados nesta trilha." |
| Filtro não retorna nada | Mensagem: "Nenhum material encontrado. Tente outro filtro." |
| Linha da planilha com campo faltando | Ignorar a linha (não quebrar a página) — opcionalmente logar no console. |

## 9. Decisões abertas (o agente decide e documenta ao implementar)
- CSV direto via fetch vs. Google Visualization API (`gviz/tq`).
- Ícones dos formatos: emoji simples (🎥 📄 📰) vs. SVG inline — qualquer um serve, desde que leve.
- Cache local (ex.: `localStorage`) dos dados pra evitar refetch a cada visita — não obrigatório no MVP.
