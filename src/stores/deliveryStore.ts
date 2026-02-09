import { create } from 'zustand';
import { persist } from 'zustand/middleware';  // Auto-persist em localStorage
import type { Prato, Pedido, UserRole, ItemCarrinho, StatusPedido } from '../types';
import { toast } from 'react-hot-toast';
import { calcularDesconto, validarCupom, getMensagemCupom } from '../utils/cupons';



interface DeliveryStore {
    viewMode: UserRole;
    pratos: Prato[];
    carrinho: ItemCarrinho[];
    pedidos: Pedido[];
    favoritos: string[];  // IDs
    cupomAtivo: string | null;
    isDarkMode: boolean;

    // Filtros e busca
    searchQuery: string;
    categoriaFiltro: string | null;

    // Actions Cliente
    toggleTheme: () => void;
    toggleFavorito: (id: string) => void;
    addCarrinho: (prato: Prato, qty?: number) => void;
    updateQty: (id: string, delta: number) => void;
    aplicarCupom: (codigo: string) => boolean;
    finalizarPedido: (cliente: { nome: string; telefone: string; endereco: string; cidade: string }) => void;

    // Filtros
    setSearchQuery: (query: string) => void;
    setCategoriaFiltro: (categoria: string | null) => void;

    // Actions Empresa
    addPrato: (prato: Prato) => void;
    updatePrato: (id: string, updates: Partial<Prato>) => void;
    deletePrato: (id: string) => void;
    updateStatusPedido: (id: string, status: StatusPedido) => void;

    setViewMode: (mode: UserRole) => void;
}

export const useDeliveryStore = create<DeliveryStore>()(
    persist(
        (set, get) => ({
            viewMode: 'cliente',
            pratos: [
                // Burgers
                {
                    id: '1',
                    nome: 'Burger Suprema',
                    descricao: 'Hambúrguer artesanal com blend de carnes nobres, queijo cheddar, bacon crocante e molho especial.',
                    preco: 32.90,
                    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
                    categoria: 'Burgers'
                },
                {
                    id: '4',
                    nome: 'Burger Vegano',
                    descricao: 'Hambúrguer de grão-de-bico, alface, tomate, cebola roxa e maionese vegana.',
                    preco: 28.90,
                    imagem: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&auto=format&fit=crop',
                    categoria: 'Burgers'
                },
                // Pizzas
                {
                    id: '2',
                    nome: 'Pizza Margherita',
                    descricao: 'Molho de tomate caseiro, mozzarella de búfala, manjericão fresco e azeite extra virgem.',
                    preco: 45.00,
                    imagem: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop',
                    categoria: 'Pizzas'
                },
                {
                    id: '5',
                    nome: 'Pizza Pepperoni',
                    descricao: 'Molho de tomate, mozzarella, pepperoni italiano e orégano.',
                    preco: 48.00,
                    imagem: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
                    categoria: 'Pizzas'
                },
                // Bowls
                {
                    id: '3',
                    nome: 'Poke Bowl Salmão',
                    descricao: 'Arroz japonês, salmão fresco em cubos, manga, abacate, pepino sunomono e chips de coco.',
                    preco: 38.50,
                    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
                    categoria: 'Bowls'
                },
                {
                    id: '6',
                    nome: 'Buddha Bowl',
                    descricao: 'Quinoa, grão-de-bico assado, batata doce, espinafre, hummus e tahine.',
                    preco: 34.90,
                    imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
                    categoria: 'Bowls'
                },
                // Bebidas
                {
                    id: '7',
                    nome: 'Suco Natural Laranja',
                    descricao: 'Suco de laranja 100% natural, sem açúcar adicionado.',
                    preco: 8.90,
                    imagem: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop',
                    categoria: 'Bebidas'
                },
                {
                    id: '8',
                    nome: 'Refrigerante Lata',
                    descricao: 'Coca-Cola, Guaraná ou Sprite - 350ml.',
                    preco: 5.50,
                    imagem: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&auto=format&fit=crop',
                    categoria: 'Bebidas'
                },
                // Sobremesas
                {
                    id: '9',
                    nome: 'Brownie com Sorvete',
                    descricao: 'Brownie de chocolate belga com sorvete de baunilha e calda quente.',
                    preco: 18.90,
                    imagem: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&auto=format&fit=crop',
                    categoria: 'Sobremesas'
                },
                {
                    id: '10',
                    nome: 'Cheesecake de Frutas Vermelhas',
                    descricao: 'Cheesecake cremoso com calda de frutas vermelhas.',
                    preco: 16.90,
                    imagem: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop',
                    categoria: 'Sobremesas'
                }
            ],
            carrinho: [],
            pedidos: [],
            favoritos: [],
            cupomAtivo: null,
            isDarkMode: false,
            searchQuery: '',
            categoriaFiltro: null,

            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

            setSearchQuery: (query) => set({ searchQuery: query }),
            setCategoriaFiltro: (categoria) => set({ categoriaFiltro: categoria }),

            toggleFavorito: (id) => {
                const favs = get().favoritos.includes(id)
                    ? get().favoritos.filter(f => f !== id)
                    : [...get().favoritos, id];
                set({ favoritos: favs });
                toast(get().favoritos.includes(id) ? 'Removido dos favoritos' : 'Adicionado aos favoritos', {
                    icon: get().favoritos.includes(id) ? '💔' : '❤️',
                });
            },

            addCarrinho: (prato, qty = 1) => {
                const item = { prato, quantidade: qty };
                const carrinho = get().carrinho;
                const existing = carrinho.find(c => c.prato.id === prato.id);
                const novoCarrinho = existing
                    ? carrinho.map(c => c.prato.id === prato.id ? { ...c, quantidade: c.quantidade + qty } : c)
                    : [...carrinho, item];

                set({ carrinho: novoCarrinho });
                toast.success(`Adicionado: ${prato.nome}`);
            },

            updateQty: (id, delta) => {
                const carrinho = get().carrinho.map(item => {
                    if (item.prato.id === id) {
                        return { ...item, quantidade: Math.max(0, item.quantidade + delta) };
                    }
                    return item;
                }).filter(item => item.quantidade > 0);
                set({ carrinho });
            },

            aplicarCupom: (codigo) => {
                if (validarCupom(codigo)) {
                    const codigoUpper = codigo.toUpperCase();
                    set({ cupomAtivo: codigoUpper });
                    toast.success(getMensagemCupom(codigoUpper));
                    return true;
                }

                toast.error('Cupom inválido');
                return false;
            },

            finalizarPedido: (cliente) => {
                const { carrinho, cupomAtivo } = get();
                if (!carrinho.length) {
                    toast.error('Seu carrinho está vazio!');
                    return;
                }

                const subtotal = carrinho.reduce((sum, i) => sum + i.prato.preco * i.quantidade, 0);
                const frete = 10; // Frete fixo
                const desconto = calcularDesconto(subtotal, frete, cupomAtivo);
                const total = Math.max(0, subtotal + frete - desconto);

                const novoPedido: Pedido = {
                    id: `ped-${Date.now()}`,
                    itens: carrinho,
                    total,
                    data: new Date().toISOString(),
                    status: 'pendente',
                    cupom: cupomAtivo || undefined,
                    cliente
                };

                set({
                    pedidos: [novoPedido, ...get().pedidos],
                    carrinho: [],
                    cupomAtivo: null
                });
                toast.success('Pedido realizado com sucesso! Acompanhe o status.');
            },

            addPrato: (prato) => {
                set({ pratos: [...get().pratos, prato] });
                toast.success('Prato adicionado ao cardápio');
            },

            updatePrato: (id, updates) => {
                set({ pratos: get().pratos.map(p => p.id === id ? { ...p, ...updates } : p) });
                toast.success('Prato atualizado');
            },

            deletePrato: (id) => {
                set({ pratos: get().pratos.filter(p => p.id !== id) });
                toast.success('Prato removido');
            },

            updateStatusPedido: (id, status) => {
                set({ pedidos: get().pedidos.map(p => p.id === id ? { ...p, status } : p) });
                toast.success(`Status atualizado para: ${status}`);
            },

            setViewMode: (mode) => set({ viewMode: mode })
        }),
        {
            name: 'rapidEat-storage',
            // Optional: onRehydrateStorage can be used to debug hydration
            onRehydrateStorage: () => (state) => {
                console.log('hydration finished', state);
            }
        }
    )
);
