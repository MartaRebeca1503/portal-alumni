# Spec: Trilha de Conteúdo — {{ NOME_DA_TRILHA }}

> Trilhas disponíveis: Guias Rápidos, High Agency, Soft Skills, Hard Skills.
> Cada squad escolhe UMA. Preencha `{{ NOME_DA_TRILHA }}` acima e os campos abaixo.

## 1. Problema

A PdA tem dezenas de materiais bons espalhados no Google Classroom — vídeos de workshops, PDFs de frameworks, gravações de sessões, guias de carreira. O conteúdo existe, mas é inacessível: o alumni não sabe qual vídeo assistir antes de uma entrevista, ou qual PDF usar para montar o currículo. **O problema não é falta de conteúdo, é falta de acesso.**

O Portal Alumni já tem uma seção "Trilhas" com 4 categorias, mas elas estão vazias — como uma estante montada sem nenhum livro.

## 2. Objetivo deste produto

Construir, para a trilha **{{ NOME_DA_TRILHA }}**, uma página web com cards filtráveis dos materiais relevantes, alimentada por uma Google Sheets, que será embedada no Portal Alumni real e usada por todos os alumni da PdA.

## 3. Momento mágico (critério de sucesso experiencial)

> O alumni abre o Portal Alumni no celular. Vai em Trilhas → {{ NOME_DA_TRILHA }}.
> Vê uma página organizada com cards. Filtra por momento de carreira + formato.
> Acha o que precisa em 10 segundos — sem abrir o Classroom, sem rolar dezenas
> de posts, sem perguntar no grupo do WhatsApp.

Se a solução não entrega isso, ela não está pronta — independente de quantas tasks técnicas foram concluídas.

## 4. Quem usa e por quê

| Momento de carreira | O que a pessoa precisa | Exemplo de busca |
|---|---|---|
| Buscando 1ª vaga | CV, LinkedIn, onde procurar vagas, como se candidatar | Guias Rápidos → "Buscando 1ª vaga" → "PDF" |
| Preparando entrevista | Simulação, perguntas comportamentais, STAR, postura | Soft Skills → "Preparando entrevista" → "Vídeo" |
| Crescendo no emprego | Comunicação, liderança, feedback, postura profissional | Soft Skills → "Crescendo no emprego" |
| Aprendendo tech | Front-end, back-end, IA, ferramentas | Hard Skills → "Vídeo" |

## 5. Escopo desta trilha

Preencher conforme a trilha escolhida:

| Trilha | O que deve conter | Público principal |
|---|---|---|
| Guias Rápidos | Como montar CV, como usar LinkedIn, como se candidatar, templates prontos | Alumni buscando 1ª vaga |
| High Agency | Bias to Action, Clear Thinking, Disagreeability, 5 Linhas de Código, armadilhas de baixa agência | Todos os alumni |
| Soft Skills | Comunicação, entrevista, trabalho em equipe, feedback, liderança | Alumni preparando entrevista ou crescendo no emprego |
| Hard Skills | Front-end, back-end, IA, banco de dados, ferramentas, projetos | Alumni querendo se aprofundar tecnicamente |

**{{ NOME_DA_TRILHA }} cobre:** {{ descrição específica copiada da tabela acima }}

## 6. User Stories

### História 1 — Catalogação
**Como** desenvolvedor catalogando materiais do Classroom
**Eu quero** mapear os materiais da minha trilha e registrar cada um na planilha
**Para que** a biblioteca tenha dados reais e o filtro funcione

**Critérios de aceite:**
- Cada material na planilha tem: `título` (texto), `formato` (`video` | `pdf` | `artigo`), `momento` (`buscando-vaga` | `preparando-entrevista` | `crescendo-emprego`), `link` (URL direta — YouTube, Google Drive, artigo original; **nunca** o link do post no Classroom).
- Mínimo de 5 materiais catalogados.
- Classificação consistente com os valores válidos (sem variações como "Video" vs "video").

### História 2 — Filtros
**Como** alumni da PdA buscando um material específico
**Eu quero** filtrar os materiais por formato e por momento de carreira
**Para que** eu veja só o que é relevante pro que preciso agora

**Critérios de aceite:**
- Botões/tags de filtro no topo da página.
- Filtros combinam (ex.: "Vídeo" + "Preparando entrevista" mostra só quem atende os 2).
- Botão "Todos" reseta o filtro.
- Sem resultado → mensagem `"Nenhum material encontrado. Tente outro filtro."`
- Funciona bem no celular.

### História 3 — Navegação e primeira impressão
**Como** alumni que abriu a trilha pela primeira vez
**Eu quero** entender o que essa trilha oferece e navegar visualmente pelos materiais
**Para que** eu saiba se estou no lugar certo e encontre algo útil rápido

**Critérios de aceite:**
- Página tem título da trilha e descrição curta no topo.
- Cards mostram: título do material, badge de formato (Vídeo/PDF/Artigo), badge de momento de carreira.
- Card é clicável e abre o material em nova aba.
- Visual com identidade PdA (roxo, amarelo, branco) — ver `memory/constitution.md`.

## 7. Escopo do MVP

**Dentro do MVP:**
- Página com cards de materiais da trilha
- Filtros por formato e por momento de carreira, combináveis
- Dados vindos de Google Sheets
- Cards clicáveis que abrem o material em nova aba
- Visual mobile-first com identidade PdA
- Mensagem de "nenhum resultado"

**Fora do MVP** (não construir, a menos que peça explicitamente):
- Login ou autenticação de alumni
- Edição de conteúdo dentro da própria página (a edição é só pela planilha)
- Busca por texto livre (apenas filtros por categoria, por ora)
- Backend próprio, banco de dados, CMS
- Analytics/tracking de cliques

## 8. Identidade visual

| Elemento | Valor |
|---|---|
| Cor principal | Roxo escuro `#2D1B4E` |
| Cor de destaque | Amarelo `#FFD700` |
| Fundo | Branco `#FFFFFF` ou bege claro |
| Tom de voz | Acolhedor e direto. Ex.: "Encontre o que você precisa para dar o próximo passo." |

## 9. Restrições conhecidas

- Sem backend, sem framework — ver `memory/constitution.md`.
- Fonte de dados: Google Sheets em `https://docs.google.com/spreadsheets/d/1Dsn4Y8q5O8guBT0Z3RSixOxatMkfrR5yMYLIE0TvfEs/edit?gid=0#gid=0` (substitua pelo ID real da planilha da sua trilha, se for diferente).
- A página final será embedada via iframe no Google Sites — evitar dependências externas pesadas e qualquer coisa que dependa de cookies/sessão.

## 10. Dúvidas a esclarecer antes de implementar
*(o agente deve listar aqui qualquer ambiguidade encontrada antes de começar a codar — ex.: a planilha já tem aba certa? tem cabeçalho fixo? o squad já escolheu a trilha?)*
