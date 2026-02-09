# 🍕 RapidEat - Delivery App

> Aplicação moderna de delivery com interface dual (Cliente & Empresa) construída com React 19, TypeScript, Tailwind CSS 4 e Zustand.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![Bundle](https://img.shields.io/badge/Bundle-103KB-success)

## ✨ Características

### 🎨 **Interface Dual**
- **Modo Cliente:** Laranja vibrante, foco em navegação e compras
- **Modo Empresa:** Indigo profissional, dashboard e gestão

### 🚀 **Funcionalidades Cliente**
- ✅ Busca em tempo real com filtros por categoria
- ✅ Sistema de favoritos persistente
- ✅ Carrinho com cálculo automático
- ✅ Sistema de cupons (4 cupons válidos)
- ✅ Histórico de pedidos com filtros
- ✅ Checkout simplificado
- ✅ Toast notifications customizados

### 📊 **Funcionalidades Empresa**
- ✅ Dashboard analítico com 7 métricas
- ✅ Gráficos de barras (CSS puro)
- ✅ Gestão de pedidos com filtros e ordenação
- ✅ CRUD completo de produtos
- ✅ Atualização de status em tempo real
- ✅ Pratos mais vendidos

### 🎯 **Recursos Técnicos**
- ✅ Dark mode completo
- ✅ Sincronização multi-tab
- ✅ Persistência com localStorage
- ✅ PWA ready (Service Worker)
- ✅ Loading states e skeleton loaders
- ✅ Animações CSS customizadas
- ✅ 100% TypeScript com strict mode
- ✅ Responsivo (mobile-first)

---

## 📦 Tecnologias

### **Core**
- **React 19** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 7.3** - Build tool
- **Tailwind CSS 4** - Styling

### **Estado & Dados**
- **Zustand** - State management
- **zustand/middleware** - Persistence

### **UI & UX**
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **React Router DOM** - Routing

### **PWA**
- **Vite PWA Plugin** - Service Worker
- **Workbox** - Caching strategies

---

## 🚀 Quick Start

### **Pré-requisitos**
- Node.js 18+ 
- pnpm (recomendado) ou npm

### **Instalação**

```bash
# Clone o repositório
git clone <repo-url>
cd app-delivery

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview do build
pnpm run preview
```

### **Scripts Disponíveis**

```json
{
  "dev": "vite",                    // Dev server (http://localhost:5173)
  "build": "tsc -b && vite build",  // Build de produção
  "preview": "vite preview",        // Preview do build
  "lint": "eslint ."                // Lint do código
}
```

---

## 📁 Estrutura do Projeto

```
app-delivery/
├── src/
│   ├── components/
│   │   ├── biz/                    # Componentes empresariais
│   │   │   ├── BarChart.tsx        # Gráfico de barras CSS
│   │   │   ├── CrudPratos.tsx      # CRUD de produtos
│   │   │   ├── GestaoPedidos.tsx   # Gestão de pedidos
│   │   │   └── MetricCard.tsx      # Card de métrica
│   │   ├── client/                 # Componentes do cliente
│   │   │   ├── CardPrato.tsx       # Card de prato
│   │   │   ├── CupomInput.tsx      # Input de cupom
│   │   │   ├── Favoritos.tsx       # Lista de favoritos
│   │   │   ├── ResumoCarrinho.tsx  # Resumo do carrinho
│   │   │   └── SearchBar.tsx       # Barra de busca
│   │   ├── Header.tsx              # Header dual-mode
│   │   ├── Loading.tsx             # Componentes de loading
│   │   ├── RapidEatLogo.tsx        # Logo SVG
│   │   └── Skeleton.tsx            # Skeleton loaders
│   ├── hooks/
│   │   ├── useCarrinhoTotais.ts    # Cálculos do carrinho
│   │   ├── useDashboardMetrics.ts  # Métricas do dashboard
│   │   ├── useMultiTabSync.ts      # Sincronização multi-tab
│   │   └── usePratosFiltrados.ts   # Filtros de pratos
│   ├── pages/
│   │   ├── Carrinho.tsx            # Página do carrinho
│   │   ├── DashboardBiz.tsx        # Dashboard empresarial
│   │   ├── Home.tsx                # Página inicial
│   │   ├── Pedidos.tsx             # Pedidos do cliente
│   │   ├── PedidosBiz.tsx          # Gestão de pedidos
│   │   └── Perfil.tsx              # Perfil do usuário
│   ├── stores/
│   │   └── deliveryStore.ts        # Store global Zustand
│   ├── utils/
│   │   ├── cupons.ts               # Lógica de cupons
│   │   └── toast.tsx               # Sistema de toast
│   ├── types.ts                    # Definições TypeScript
│   ├── App.tsx                     # Componente raiz
│   ├── index.css                   # Estilos globais
│   └── main.tsx                    # Entry point
├── public/                         # Assets estáticos
└── README.md                       # Este arquivo
```

---

## 🎨 Design System

### **Cores**

#### Cliente (Laranja)
```css
--color-orange-500: #f97316  /* Primary */
--color-orange-600: #ea580c  /* Hover */
--color-orange-50: #fff7ed   /* Background */
```

#### Empresa (Indigo)
```css
--color-indigo-500: #6366f1  /* Primary */
--color-indigo-600: #4f46e5  /* Hover */
--color-indigo-50: #eef2ff   /* Background */
```

### **Animações**

```css
.animate-fade-in      /* Fade suave (0.3s) */
.animate-slide-up     /* Slide de baixo (0.4s) */
.animate-scale-in     /* Escala suave (0.3s) */
.animate-shimmer      /* Brilho skeleton (2s loop) */
```

### **Utilitários**

```css
.glass-morphism       /* Glassmorphism effect */
.smooth-hover         /* Transição 300ms */
.card-hover           /* Elevação + shadow */
.no-scrollbar         /* Remove scrollbar */
```

---

## 🔧 Configuração

### **Zustand Store**

O estado global é gerenciado pelo Zustand com persistência:

```typescript
interface DeliveryStore {
  // Estado
  viewMode: 'cliente' | 'empresa';
  pratos: Prato[];
  carrinho: ItemCarrinho[];
  pedidos: Pedido[];
  favoritos: string[];
  cupomAtivo: string | null;
  isDarkMode: boolean;
  searchQuery: string;
  categoriaFiltro: string | null;
  
  // Actions
  toggleTheme: () => void;
  setViewMode: (mode) => void;
  addCarrinho: (prato) => void;
  updateQty: (id, qty) => void;
  toggleFavorito: (id) => void;
  aplicarCupom: (codigo) => void;
  finalizarPedido: () => void;
  // ... mais actions
}
```

### **Sistema de Cupons**

4 cupons válidos configurados em `src/utils/cupons.ts`:

```typescript
BEMVINDO10  // 10% desconto (min R$ 20)
FRETE15     // 15% desconto (min R$ 30)
PRIMEIRACOMPRA // 20% desconto (min R$ 40)
VIP25       // 25% desconto (min R$ 50)
```

---

## 📊 Performance

### **Bundle Size**
- **CSS:** 47.26 KB (gzip: 8.16 KB)
- **JS:** 310.89 KB (gzip: 95.17 KB)
- **Total:** ~103 KB gzipado ⚡

### **Otimizações**
- ✅ Code splitting por rota
- ✅ Tree shaking automático
- ✅ Lazy loading de imagens
- ✅ Memoização de cálculos pesados
- ✅ CSS puro para gráficos (sem libs)
- ✅ PWA com caching inteligente

---

## 🧪 Testes

```bash
# Executar testes (quando implementado)
pnpm test

# Coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

---

## 🚀 Deploy

### **Netlify (Recomendado)**

```bash
# Build
pnpm run build

# Deploy manual
netlify deploy --prod --dir=dist
```

**Configuração `netlify.toml`:**
```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Vercel**

```bash
vercel --prod
```

### **GitHub Pages**

```bash
# Adicionar base no vite.config.ts
base: '/repo-name/'

# Build e deploy
pnpm run build
gh-pages -d dist
```

---

## 🎯 Roadmap

### **Fase 1: Fundação** ✅
- [x] Setup do projeto
- [x] Store global
- [x] Sistema de cupons
- [x] Componentes base

### **Fase 2: Cliente Core** ✅
- [x] Busca e filtros
- [x] Sistema de favoritos
- [x] Histórico de pedidos

### **Fase 3: Empresa Core** ✅
- [x] Dashboard analítico
- [x] Gestão de pedidos
- [x] Gráficos de vendas

### **Fase 4: Polish & UX** ✅
- [x] Loading states
- [x] Skeleton loaders
- [x] Toast system
- [x] Animações CSS

### **Fase 5: Testes & Deploy** 🔜
- [ ] Vitest setup
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] CI/CD
- [ ] Deploy

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por ens-Emilio

---

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**
