# Editor Rich Text

![Editor Screenshot](/public/screenshot.png)

Richly é um editor de texto rico (rich text editor) moderno e responsivo, desenvolvido com React e TypeScript. Oferece funcionalidades avançadas de edição, suporte a múltiplos idiomas e sincronização em tempo real.

## Funcionalidades Principais

- 🖋️ **Edição Rich Text**
  - Formatação básica (negrito, itálico, sublinhado)
  - Cabeçalhos e parágrafos
  - Listas ordenadas e não ordenadas
  - Inserção de links e imagens
  - Tabelas avançadas

- 🌐 **Internacionalização**
  - Suporte a múltiplos idiomas (pt-BR, en-US, fr-FR)
  - Troca de idioma em tempo real
  - Traduções completas da interface

- 💾 **Gerenciamento de Notas**
  - Criação e exclusão de notas
  - Histórico de alterações
  - Salvamento automático
  - Pesquisa rápida

- 🎨 **Personalização**
  - Tema claro e escuro
  - Interface responsiva
  - Atalhos de teclado

- 🔒 **Segurança**
  - Sanitização de conteúdo HTML
  - Validação de URLs
  - Proteção contra XSS

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - TypeScript
  - i18next (internacionalização)
  - React Icons
  - DOMPurify (sanitização)

- **Estilização:**
  - CSS Modules
  - Variáveis CSS modernas
  - Design System próprio

- **Ferramentas:**
  - ESLint
  - Prettier
  - Husky (git hooks)


## 🛠️ Estrutura do Projeto

```bash
richly/
├── public/             # Assets públicos e templates
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos React
│   ├── hooks/          # Custom hooks
│   ├── services/       # Lógica de API e serviços
│   ├── types/          # Tipos TypeScript
│   ├── utils/          # Utilitários
│   ├── App.tsx         # Componente principal
│   └── index.tsx       # Ponto de entrada
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json        # Dependências e scripts
└── README.md           # Este arquivo
```

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
