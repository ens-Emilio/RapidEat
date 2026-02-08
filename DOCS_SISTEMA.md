# Mapeamento do Sistema: RapidEat (Cliente & Empresa)

Este documento descreve as funcionalidades, fluxos e estruturas de dados do ecossistema RapidEat, cobrindo tanto a experiência do consumidor final quanto a gestão para o dono do restaurante.

---

## 🛡️ Visão Geral da Arquitetura dual
O sistema utiliza um estado global (Zustand) com persistência local, permitindo alternar entre os modos através de um `viewMode`. As cores e navegação se adaptam dinamicamente para diferenciar os ambientes:
- **Modo Cliente (B2C):** Identidade visual **Laranja**. Foco em UX, busca e conversão.
- **Modo Empresa (B2B/Gestão):** Identidade visual **Indigo**. Foco em métricas, controle de estoque (CRUD) e gestão operacional.

---

## 🛍️ 1. Modo Cliente (RapidEat Customer)

### Funcionalidades Principais
*   **Cardápio Interativo:** Exploração de pratos com filtros por categoria e busca textual.
*   **Favoritos:** Sistema de marcação de pratos preferidos com persistência.
*   **Carrinho de Compras:** Gestão de quantidades, adição/remoção de itens e cálculo em tempo real.
*   **Cupons de Desconto:** Aplicação de códigos promocionais (`RAPID10`, `EMILIO20`, `FRETEGRATIS`).
*   **Checkout:** Finalização de pedidos com cálculo de frete e subtotal.
*   **Histórico de Pedidos:** Acompanhamento dos pedidos realizados e seus status atuais.

---

## 🏢 2. Modo Empresa (RapidEat Biz)

### Funcionalidades Principais
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

## 📊 3. Estrutura de Dados (Types)

### Entidades Core:
```typescript
type UserRole = 'cliente' | 'empresa';

interface Prato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

interface Pedido {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  data: string;
  status: 'pendente' | 'preparando' | 'enviado' | 'concluido' | 'cancelado';
}
```

---

## 🔄 4. Fluxo de Integração (Workflow)

1.  **Ação do Dono:** O administrador adiciona uma "Pizza Especial" no **Modo Empresa**.
2.  **Sincronização:** O objeto é injetado no `pratos[]` do store global.
3.  **Ação do Cliente:** O usuário vê a nova pizza no **Modo Cliente** e realiza um pedido.
4.  **Notificação:** O pedido aparece instantaneamente no **Dashboard da Empresa** com o status `pendente`.
5.  **Ação do Dono:** O restaurante marca o pedido como `em enviado`.
6.  **Sincronização Final:** O cliente vê o status atualizado em sua página de **Meus Pedidos**.

---

## 🎨 5. Stack Tecnológica
- **Framework:** React 19 + Vite.
- **Linguagem:** TypeScript (Tipagem forte para segurança operacional).
- **Estado:** Zustand (Store centralizado e persistente).
- **Estilização:** Tailwind CSS (Mode dark/light nativo).
- **Ícones:** Lucide React.
