import type { Prato } from '../types';

export const pratos: Prato[] = [
    {
        id: '1',
        nome: 'Pizza Margherita',
        descricao: 'Molho de tomate, mussarela premium e manjericão fresco.',
        preco: 45.90,
        imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
        categoria: 'Pizzas'
    },
    {
        id: '2',
        nome: 'Burger Artesanal',
        descricao: 'Blend 180g, queijo cheddar, bacon crocante e maionese da casa.',
        preco: 32.00,
        imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
        categoria: 'Hambúrgueres'
    },
    {
        id: '3',
        nome: 'Sushi Combo (12 un)',
        descricao: 'Mix de salmão, atum e califórnia.',
        preco: 58.00,
        imagem: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
        categoria: 'Japonesa'
    },
    {
        id: '4',
        nome: 'Pasta Carbonara',
        descricao: 'Espaguete al dente com molho cremoso de ovos e guanciale.',
        preco: 42.50,
        imagem: 'https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=800&auto=format&fit=crop',
        categoria: 'Massas'
    },
    {
        id: '5',
        nome: 'Salada Caesar',
        descricao: 'Alface americana, croutons, frango grelhado e molho caesar.',
        preco: 28.90,
        imagem: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
        categoria: 'Saladas'
    },
    {
        id: '6',
        nome: 'Milkshake Chocolate',
        descricao: 'Chocolate belga batido com sorvete de baunilha.',
        preco: 18.00,
        imagem: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
        categoria: 'Bebidas'
    }
];
