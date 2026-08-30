# Tripleten web_project_around_pt

Uma aplicação web responsiva e interativa para compartilhar, visualizar e gerenciar fotos de lugares ao redor do mundo.

## 📋 Sobre o Projeto

Este projeto é uma rede social em formato de galeria interativa onde os usuários podem explorar locais, gerenciar suas próprias publicações e personalizar seus perfis. O foco principal deste sprint foi a **refatoração completa do código JavaScript**, aplicando conceitos de **Programação Orientada a Objetos (POO)** e modularização com **ES6 Modules**.

🔗 **Acesse o projeto online:** [EUA Afora no GitHub Pages](https://jessifagundes.github.io/web_project_around_pt/)

## ✨ Funcionalidades

- **Visualização de cartões**: Galeria com fotos e títulos de locais.
- **Adicionar novos lugares**: Formulário dinâmico com validação em tempo real para novos cartões.
- **Curtir lugares**: Sistema de likes nos cartões.
- **Remover cartões**: Exclusão de cartões diretamente do DOM.
- **Ampliar imagens**: Modal interativo com visualização expandida e legenda.
- **Edição de perfil**: Formulário para alterar nome e descrição do usuário.
- **Validação de formulários**: Bloqueio de envio inválido, mensagens contextuais de erro e fechamento via teclado (`Esc`) ou clique no overlay.

## 🛠️ Tecnologias e Técnicas Utilizadas

- **HTML5**: Estrutura semântica e tags de formulários acessíveis.
- **CSS3**: Layout fluido, Flexbox, CSS Grid e design responsivo (Mobile First / Desktop).
- **Metodologia BEM**: Organização modular de classes e estilos CSS.
- **JavaScript (ES6+)**:
  - **Programação Orientada a Objetos (POO)**: Criação das classes `Card` e `FormValidator` com métodos públicos e privados.
  - **Módulos ES6 (`import` / `export`)**: Separação do código em múltiplos arquivos (`Card.js`, `FormValidator.js`, `utils.js`, `index.js`).
  - **Manipulação do DOM e Event Listeners**: Tratamento de eventos de teclado, cliques fora do modal e submissão assíncrona/reativa.
