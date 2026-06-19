# Data Model: Trilha de Conteúdo — {{ NOME_DA_TRILHA }}

## 1. Planilha Google Sheets (fonte de verdade)

Cada linha = um material. Cabeçalho fixo na primeira linha.

| Coluna | Tipo | Valores válidos | Obrigatório | Exemplo |
|---|---|---|---|---|
| `titulo` | texto | livre | sim | "Como montar um currículo sem experiência" |
| `formato` | enum (texto) | `video`, `pdf`, `artigo` | sim | `pdf` |
| `momento` | enum (texto) | `buscando-vaga`, `preparando-entrevista`, `crescendo-emprego` | sim | `buscando-vaga` |
| `link` | URL | link direto ao material (YouTube, Drive, artigo) — nunca link de post do Classroom | sim | `https://drive.google.com/file/d/.../view` |

> Regra de ouro: se uma linha não tiver os 4 campos preenchidos com valores válidos, ela deve ser ignorada na renderização (não quebrar a página).

### Observação sobre "momento" e Hard Skills / High Agency
Se a trilha for **Hard Skills** ou **High Agency**, e algum material não se encaixar claramente em nenhum dos 3 momentos de carreira, considerar adicionar um 4º valor de momento — ex. `geral` — e documentar essa decisão aqui antes de implementar. (Decisão a ser tomada pelo squad, não assumir sem confirmar.)

## 2. Objeto JS (após parsear a planilha)

```js
{
  titulo: "Como montar um currículo sem experiência",
  formato: "pdf",          // "video" | "pdf" | "artigo"
  momento: "buscando-vaga", // "buscando-vaga" | "preparando-entrevista" | "crescendo-emprego"
  link: "https://drive.google.com/file/d/.../view"
}
```

Array desses objetos = `materiais`, guardado em memória (variável JS) depois do fetch inicial. Filtros operam sobre esse array, não refazem fetch.

## 3. Mapeamento de exibição (badges)

| Valor (`formato`) | Label exibido | Sugestão de ícone |
|---|---|---|
| `video` | Vídeo | 🎥 |
| `pdf` | PDF | 📄 |
| `artigo` | Artigo | 📰 |

| Valor (`momento`) | Label exibido |
|---|---|
| `buscando-vaga` | Buscando 1ª vaga |
| `preparando-entrevista` | Preparando entrevista |
| `crescendo-emprego` | Crescendo no emprego |

## 4. Validação mínima ao catalogar (checklist do squad)

- [ ] Pelo menos 5 materiais catalogados.
- [ ] Todos os `formato` usam exatamente `video`, `pdf` ou `artigo` (minúsculo, sem acento, sem variação).
- [ ] Todos os `momento` usam exatamente um dos 3 valores definidos (ou o 4º valor combinado, se aplicável).
- [ ] Todo `link` é direto ao material, testado manualmente (abre o conteúdo, não um post do Classroom).
- [ ] Nenhuma linha com campo vazio.
