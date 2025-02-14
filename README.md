# Editor Rich Text

![Editor Screenshot](/public/screenshot.png)

Um Rich Text básico (até o momento) construido com React, incluindo formatação essencial e funcionalidades básicas de edição.

## ✨ Funcionalidades

- **Formatação básica de texto:**
  - Negrito, itálico e sublinhado
  - Seleção de cabeçalhos (H1-H3)
  - Listas não ordenadas
- **Inserção de elementos:**
  - Links externos
  - Imagens via URL
- **Histórico de edição:**
  - Desfazer/Refazer ações
  - Persistência automática no localStorage
- **Interface amigável:**
  - Ícones intuitivos
  - Feedback visual de formatação ativa
  - Layout responsivo

## Ultimas atualizações
- Upload de imagens via API
- Sistema de tratamento de erros
- Acessibilidade WCAG 2.1
- Exportação para múltiplos formatos
- Sanitização segura de conteúdo

## 🛠️ Estrutura do Projeto

```bash
/src
├── components
│   ├── Editor.js       # Componente principal do editor
│   └── Editor.css      # Estilos do editor
├── App.js              # Componente raiz
├── utils
│   └── sanitize.js     # Funções de sanitização
└── index.js            # Ponto de entrada
```

## 📦 Dependências Principais
- react: ^19.0.0
- react-icons: ^5.4.0
- react-scripts: 5.0.1

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com sua feature:

```bash
git checkout -b minha-feature
```
3. Commit suas mudanças:

```bash
git commit -m 'feat: Minha nova feature'
```
4. Push para a branch:
```bash
git push origin minha-feature
```

## 📄 Licença
Este projeto está licenciado sob a MIT License