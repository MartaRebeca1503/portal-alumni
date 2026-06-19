# Constituição — Portal Alumni PdA

Estas são as regras que **não podem ser quebradas** em nenhuma task, plano ou implementação. Se uma decisão técnica entrar em conflito com algo aqui, a constituição vence.

## 1. Sem backend, sem build step
- A página final é **HTML + CSS + JS puro**, sem framework (sem React/Vue), sem bundler, sem servidor próprio.
- Motivo: a página será embedada via `<iframe>` (ou similar) no Google Sites do Portal Alumni. Precisa ser um arquivo estático simples de hospedar (ex.: GitHub Pages).

## 2. Fonte de dados é a Google Sheets
- Os materiais (vídeos, PDFs, artigos) **nunca** são hardcoded no HTML/JS.
- A página busca os dados na Google Sheets publicada (CSV ou API), em runtime, no carregamento da página.
- Adicionar um material novo = adicionar uma linha na planilha. Zero deploy de código.

## 3. Mobile-first
- O alumni típico acessa pelo celular, num momento curto (ex.: esperando o ônibus).
- Todo layout, filtro e card precisa funcionar bem em telas pequenas antes de funcionar bem no desktop.

## 4. Identidade visual PdA é obrigatória
- Roxo escuro `#2D1B4E` como cor principal.
- Amarelo `#FFD700` como cor de destaque (CTAs, badges, estado ativo dos filtros).
- Fundo branco `#FFFFFF` ou bege claro.
- Tom de voz: acolhedor e direto.

## 5. Links sempre diretos ao material
- O link de cada card deve abrir o material em si (YouTube, Google Drive, artigo) em nova aba — **nunca** o link de um post do Google Classroom.

## 6. Dados mínimos por material
Todo material catalogado precisa ter, sem exceção: `título`, `formato`, `momento de carreira`, `link`. Sem um desses quatro campos, o material não entra na planilha.

## 7. Filtros precisam degradar bem
Se a combinação de filtros não retornar nenhum card, a página mostra a mensagem `"Nenhum material encontrado. Tente outro filtro."` — nunca uma tela vazia sem explicação.

## 8. Não é negociável vs. é negociável
**Não negociável:** estático, sem backend, dados via planilha, paleta de cores, mobile-first, mínimo 5 materiais por trilha.
**Negociável:** biblioteca de ícones, animações, nome técnico das classes CSS, forma exata de buscar o CSV (fetch direto vs. API do Google Sheets), organização interna dos arquivos JS.
