# 💈 Barbearia LJ - React App

Aplicação web moderna para barbearia, desenvolvida com React, Vite e React Router.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **React Router v6** - Roteamento
- **Vite** - Build tool e dev server
- **ESLint + Prettier** - Qualidade de código
- **CSS Modules** - Estilos organizados

## 📦 Instalação

```powershell
# Instalar dependências
npm install
```

## 🔧 Scripts Disponíveis

```powershell
# Rodar em desenvolvimento (porta 3000)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format
```

## 📁 Estrutura do Projeto

```
react/
├── src/
│   ├── components/      # Componentes React
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Carousel.jsx
│   │   ├── Services.jsx
│   │   ├── Modal.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Páginas/rotas
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── context/         # Context API
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useScheduling.js
│   │   └── useUI.js
│   ├── utils/           # Utilitários
│   │   └── helpers.js
│   ├── styles/          # CSS modular
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── components/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── styles.css       # CSS raiz (imports)
├── public/              # Assets estáticos
├── dist/                # Build de produção
├── index.html           # HTML template
├── vite.config.js       # Configuração Vite
├── .eslintrc.json       # Configuração ESLint
├── .prettierrc.json     # Configuração Prettier
└── package.json         # Dependências e scripts
```

## 🎨 Funcionalidades

### ✅ Implementadas
- Sistema de autenticação (localStorage)
- Agendamento de serviços
- Modal responsivo
- Carrossel automático de imagens
- Sidebar com navegação suave
- Formulários de login e cadastro
- Validação de dados
- Design responsivo (mobile-first)
- Temas com CSS variables

### 🔄 Em Desenvolvimento
- Integração com backend (API)
- Persistência real de dados
- Sistema de pagamento
- Dashboard do usuário
- Notificações

## 📱 Responsividade

O site é 100% responsivo e testado em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## ♿ Acessibilidade

- Labels semânticos
- ARIA attributes
- Navegação por teclado
- Focus visível
- Contraste adequado (WCAG AA)

## 🔐 Autenticação

⚠️ **Importante**: A autenticação atual usa localStorage (apenas para demonstração).  
Para produção, implemente:
- Backend com JWT/OAuth
- HTTPS obrigatório
- Rate limiting
- Password hashing

## 🛠️ Desenvolvimento

### Requisitos
- Node.js 16+
- npm ou yarn

### Rodar localmente

```powershell
cd react
npm install
npm run dev
```

Acesse: http://localhost:3000

### Build de produção

```powershell
npm run build
npm run preview
```

## 📝 Convenções de Código

- **Componentes**: PascalCase (ex: `Header.jsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useAuth.js`)
- **Utilitários**: camelCase (ex: `helpers.js`)
- **CSS**: BEM-like ou classes semânticas
- **Commits**: Conventional Commits

## 🐛 Debug

```powershell
# Ver warnings do lint
npm run lint

# Ver output de build
npm run build
```

## 📄 Licença

© 2025 Barbearia LJ - Todos os direitos reservados

---

**Desenvolvido com ❤️ usando React + Vite**
