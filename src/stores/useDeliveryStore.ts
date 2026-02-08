import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Prato, ItemCarrinho, Pedido } from '../types';

interface DeliveryState {
    carrinho: ItemCarrinho[];
    pedidos: Pedido[];
    addCarrinho: (prato: Prato) => void;
    removerCarrinho: (id: string) => void;
    updateQuantidade: (id: string, delta: number) => void;
    finalizarPedido: () => void;
    limparCarrinho: () => void;
}

export const useDeliveryStore = create<DeliveryState>()(
    persist(
        (set, get) => ({
            carrinho: [],
            pedidos: [],

            addCarrinho: (prato: Prato) => {
                const currentCarrinho = get().carrinho;
                const index = currentCarrinho.findIndex(item => item.id === prato.id);

                if (index > -1) {
                    const newCarrinho = [...currentCarrinho];
                    newCarrinho[index].quantidade += 1;
                    set({ carrinho: newCarrinho });
                } else {
                    set({ carrinho: [...currentCarrinho, { ...prato, quantidade: 1 }] });
                }
            },

            removerCarrinho: (id: string) => {
                set({ carrinho: get().carrinho.filter(item => item.id !== id) });
            },

            updateQuantidade: (id: string, delta: number) => {
                const newCarrinho = get().carrinho.map(item => {
                    if (item.id === id) {
                        const newQty = Math.max(1, item.quantidade + delta);
                        return { ...item, quantidade: newQty };
                    }
                    return item;
                });
                set({ carrinho: newCarrinho });
            },

            finalizarPedido: () => {
                const { carrinho, pedidos } = get();
                if (carrinho.length === 0) return;

                const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
                const frete = 10;
                const total = subtotal + frete;

                const novoPedido: Pedido = {
                    id: Date.now().toString(),
                    itens: [...carrinho],
                    total: total,
                    data: new Date().toISOString(),
                    status: 'concluido'
                };

                set({
                    pedidos: [novoPedido, ...pedidos],
                    carrinho: []
                });
            },

            limparCarrinho: () => set({ carrinho: [] })
        }),
        {
            name: 'delivery-storage',
        }
    )
);
