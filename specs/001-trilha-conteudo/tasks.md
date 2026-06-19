# Tasks: Trilha de Conteúdo — Múltiplas Trilhas

> Ordem recomendada. Marque `[x]` ao concluir cada uma. O agente deve parar e
> perguntar se algo na `spec.md` ou `plan.md` estiver ambíguo antes de seguir.

## Fase 0 — Preparação (humana, antes do código)
- [x] Confirmar qual trilha o squad pegou e preencher `{{ NOME_DA_TRILHA }}` em `spec.md`, `plan.md` e `data-model.md`.
- [x] Confirmar a URL/ID real da Google Sheets da trilha.
- [ ] Catalogar no mínimo 5 materiais na planilha, seguindo o checklist da seção 4 de `data-model.md`.
- [ ] Publicar a aba da planilha como CSV (Arquivo → Compartilhar → Publicar na Web) e guardar a URL gerada.

## Fase 1 — Estrutura base
- [x] Criar `index.html` com esqueleto: header (título + descrição da trilha), área de filtros, grid de cards, footer simples.
- [x] Criar `style.css` com variáveis de cor da identidade PdA (`--roxo: #2D1B4E`, `--amarelo: #FFD700`, `--fundo: #FFFFFF`).
- [x] Criar `script.js` vazio, já referenciado no HTML.

## Fase 2 — Dados
- [x] Implementar fetch da planilha publicada (CSV ou gviz, conforme decidido em `plan.md` seção 3).
- [x] Implementar parser que transforma as linhas em array de objetos `{ titulo, formato, momento, link }`.
- [x] Ignorar (não quebrar) linhas com campo faltando ou valor inválido.
- [ ] Testar com a planilha real: confirmar que os 5+ materiais aparecem corretamente no `console.log`.

## Fase 3 — Renderização dos cards
- [x] Função que recebe o array de materiais e renderiza um card por item no grid.
- [x] Cada card: título, badge de formato, badge de momento, e o card todo como link clicável (`target="_blank" rel="noopener"`).
- [x] Aplicar estilo visual conforme `plan.md` seção 6 e identidade visual da `spec.md` seção 8.

## Fase 4 — Filtros
- [x] Renderizar botões de filtro de formato (Todos, Vídeo, PDF, Artigo).
- [x] Renderizar botões de filtro de momento (Todos, Buscando 1ª vaga, Preparando entrevista, Crescendo no emprego).
- [x] Implementar lógica de filtro combinado (AND entre formato e momento) sem refazer fetch.
- [x] Estado visual do botão ativo (ex.: fundo amarelo) pra indicar qual filtro está selecionado.
- [x] Implementar mensagem de "Nenhum material encontrado. Tente outro filtro." quando o filtro não retorna nada.

## Fase 5 — Estados de erro e vazio
- [x] Estado de "carregando..." enquanto o fetch não retorna.
- [x] Mensagem amigável se o fetch falhar (rede, planilha não publicada).
- [x] Mensagem se a planilha estiver vazia (sem nenhum material catalogado).

## Fase 6 — Responsividade e revisão visual
- [x] Testar em viewport mobile (~375px): cards em 1 coluna, filtros não quebram layout.
- [x] Testar em viewport desktop: grid se adapta a múltiplas colunas.
- [x] Revisar contraste de cores (roxo/amarelo/branco) pra legibilidade.
- [x] Revisar tom de voz dos textos da página (acolhedor e direto).

## Fase 7 — Validação final contra a spec
- [ ] Reler `spec.md` seção 6 (User Stories) e confirmar cada critério de aceite, um por um.
- [ ] Simular o "momento mágico" (seção 3 da spec): abrir no celular, navegar até a trilha, filtrar, achar um material em poucos segundos.
- [ ] Confirmar que nenhum link aponta para um post do Google Classroom (todos diretos ao material).

## Fase 8 — Entrega
- [ ] Publicar os arquivos estáticos (ex.: GitHub Pages) e gerar a URL pública.
- [ ] Documentar no `README.md` da pasta da trilha como embedar essa URL no Google Sites (iframe) e como apontar pra outra planilha, se necessário.
