# Portal Alumni PdA — Trilhas de Conteúdo

Plataforma estática e leve para curadoria de materiais da PdA (vídeos, PDFs e artigos), alimentada diretamente via Google Sheets e projetada para ser embedada no Google Sites.

## 🚀 Como acessar as Trilhas

O projeto está organizado em uma página central que direciona para as 4 trilhas principais:

1.  **Guias Rápidos:** Carreira, CV e LinkedIn.
2.  **High Agency:** Mentalidade e Bias to Action.
3.  **Soft Skills:** Comunicação e Liderança.
4.  **Hard Skills:** Tecnologia e Ferramentas.

Acesse a página inicial em `index.html` para navegar entre elas.

## 🛠️ Tecnologias e Regras (Constituição)

Para manter a simplicidade e portabilidade exigidas:
- **Zero Backend/Build:** HTML5, CSS3 e JavaScript Vanilla apenas. 
- **Dados Vivos:** Consome CSV da Google Sheets em tempo real usando `fetch` (async/await).
- **Mobile-First:** Design otimizado para acesso rápido via celular.
- **Identidade PdA:** Paleta roxo `#2D1B4E` e amarelo `#FFD700`.

## 📂 Estrutura do Projeto

```
portal-alumni/
├── index.html                 # Central de navegação (Home)
├── trilha-guias-rapidos/      # HTML/JS/CSS da trilha específica
├── trilha-high-agency/        # HTML/JS/CSS da trilha específica
├── trilha-soft-skills/        # HTML/JS/CSS da trilha específica
├── trilha-hard-skills/        # HTML/JS/CSS da trilha específica
├── memory/
│   └── constitution.md        # Regras inegociáveis do projeto
└── specs/                     # Documentação técnica (SDD)
    └── 001-trilha-conteudo/    # Especificações e Tasks
```

## 📊 Como atualizar os materiais

Não é necessário editar o código para adicionar novos materiais:
1. Abra a [Planilha Mestra](https://docs.google.com/spreadsheets/d/1Dsn4Y8q5O8guBT0Z3RSixOxatMkfrR5yMYLIE0TvfEs/).
2. Adicione uma nova linha na aba da trilha correspondente.
3. Garanta que as colunas `titulo`, `formato`, `momento` e `link` estejam preenchidas.
4. A página atualizará automaticamente no próximo carregamento.

---
*Este repositório foi desenvolvido seguindo o fluxo **Spec-Driven Development (SDD)**.*
