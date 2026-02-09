# 📚 Documentação Completa - RapidEat

Este arquivo contém toda a documentação do projeto RapidEat, consolidada de múltiplos documentos para facilitar a consulta.

---

## 📄 README Principal
*(Original: README.md)*

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

## 🏛️ Mapeamento do Sistema
*(Original: DOCS_SISTEMA.md)*

Este documento descreve as funcionalidades, fluxos e estruturas de dados do ecossistema RapidEat, cobrindo tanto a experiência do consumidor final quanto a gestão para o dono do restaurante.

### 🛡️ Visão Geral da Arquitetura Dual
O sistema utiliza um estado global (Zustand) com persistência local, permitindo alternar entre os modos através de um `viewMode`. As cores e navegação se adaptam dinamicamente para diferenciar os ambientes:
- **Modo Cliente (B2C):** Identidade visual **Laranja**. Foco em UX, busca e conversão.
- **Modo Empresa (B2B/Gestão):** Identidade visual **Indigo**. Foco em métricas, controle de estoque (CRUD) e gestão operacional.

### 🛍️ 1. Modo Cliente (RapidEat Customer)
*   **Cardápio Interativo:** Exploração de pratos com filtros por categoria e busca textual.
*   **Favoritos:** Sistema de marcação de pratos preferidos com persistência.
*   **Carrinho de Compras:** Gestão de quantidades, adição/remoção de itens e cálculo em tempo real.
*   **Cupons de Desconto:** Aplicação de códigos promocionais (`RAPID10`, `EMILIO20`, `FRETEGRATIS`).
*   **Checkout:** Finalização de pedidos com cálculo de frete e subtotal.
*   **Histórico de Pedidos:** Acompanhamento dos pedidos realizados e seus status atuais.

### 🏢 2. Modo Empresa (RapidEat Biz)
*   **Dashboard Executivo:**
    *   Métricas de faturamento (Total de Vendas).
    *   Volume de pedidos (Total, Pendentes e Concluídos).
*   **Gestão de Pedidos (Ops):**
    *   Visualização detalhada de pedidos recebidos.
    *   Controle de Workflow: Alteração de status (`Pendente` → `Preparando` → `Enviado` → `Concluído`).
*   **Gestão de Cardápio (CRUD):**
    *   **Create:** Adicionar novos pratos com nome, descrição, preço, categoria e imagem.
    *   **Read:** Listagem completa dos produtos ativos.
    *   **Update:** Edição rápida de informações e preços.
    *   **Delete:** Remoção de pratos do catálogo.

---

## 🎊 Resumo de Implementação por Fases
*(Original: RESUMO_GERAL.md)*

### ✅ Fase 1: Fundação
- Setup completo (React 19, Vite, TypeScript, Tailwind 4)
- Store global Zustand com persistência
- Sistema de cupons e pratos mock iniciais

### ✅ Fase 2: Cliente Core
- Sistema de busca em tempo real e filtros por categoria
- Toggle de favoritos e página de pedidos com filtros por status

### ✅ Fase 3: Empresa Core
- Dashboard com 7 métricas e gráficos CSS puros
- Gestão de pedidos com ordenação múltipla e atualização de status

### ✅ Fase 4: Polish & UX
- Loading states e Skeleton loaders
- Sistema de Toast customizado e animações CSS

---

## 🚀 Detalhes Técnicos: Fase 1 (Fundação)
*(Original: IMPLEMENTACAO_FASE1.md)*

### **Store Global (Zustand)**
**Arquivo:** `src/stores/deliveryStore.ts`
- `viewMode`: 'cliente' | 'empresa'
- `pratos`: 10 pratos mock
- `carrinho`, `pedidos`, `favoritos`, `cupomAtivo`, `isDarkMode`

### **Sistema de Cupons**
**Arquivo:** `src/utils/cupons.ts`
- **RAPID10**, **EMILIO20**, **FRETEGRATIS**, **BEMVINDO**

---

## 🔍 Detalhes Técnicos: Fase 2 (Cliente Core)
*(Original: IMPLEMENTACAO_FASE2.md)*

### **Busca e Filtros**
- Hook `usePratosFiltrados`: busca textual e por categoria memoizada.
- Componente `SearchBar`: Interface unificada de navegação.

---

## 📊 Detalhes Técnicos: Fase 3 (Empresa Core)
*(Original: IMPLEMENTACAO_FASE3.md)*

### **Dashboard Metrics**
- Cálculo de Receita Total, Ticket Médio, Taxa de Conversão e Pratos mais vendidos.
- Componentes `MetricCard` e `BarChart` (CSS puro).

---

## ✨ Detalhes Técnicos: Fase 4 (Polish & UX)
*(Original: IMPLEMENTACAO_FASE4.md)*

### **Feedback Visual**
- Componentes `Spinner`, `LoadingOverlay`, `LoadingButton`.
- `SkeletonCard`, `SkeletonMetricCard`, `SkeletonPedido`.
- Sistema `showToast` com 4 níveis (success, error, warning, info).

---

## 📈 Estatísticas Finais
- **Total de Linhas:** ~1.850
- **Componentes:** 24
- **Hooks:** 5
- **Bundle Gzip:** 103KB ⚡
- **TypeScript:** 100% Strict Mode
