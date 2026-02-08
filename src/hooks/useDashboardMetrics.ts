import { useMemo } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';

/**
 * Hook para calcular métricas do dashboard empresarial
 */
export const useDashboardMetrics = () => {
    const pedidos = useDeliveryStore((state) => state.pedidos);
    const pratos = useDeliveryStore((state) => state.pratos);

    const metrics = useMemo(() => {
        // Receita total
        const receitaTotal = pedidos.reduce((acc, p) => acc + p.total, 0);

        // Pedidos por status
        const pedidosPorStatus = {
            pendente: pedidos.filter(p => p.status === 'pendente').length,
            preparando: pedidos.filter(p => p.status === 'preparando').length,
            enviado: pedidos.filter(p => p.status === 'enviado').length,
            concluido: pedidos.filter(p => p.status === 'concluido').length,
            cancelado: pedidos.filter(p => p.status === 'cancelado').length,
        };

        // Ticket médio
        const ticketMedio = pedidos.length > 0 ? receitaTotal / pedidos.length : 0;

        // Pratos mais vendidos
        const vendasPorPrato = new Map<string, { nome: string; quantidade: number; receita: number }>();

        pedidos.forEach(pedido => {
            pedido.itens.forEach(item => {
                const existing = vendasPorPrato.get(item.prato.id) || {
                    nome: item.prato.nome,
                    quantidade: 0,
                    receita: 0
                };
                vendasPorPrato.set(item.prato.id, {
                    nome: item.prato.nome,
                    quantidade: existing.quantidade + item.quantidade,
                    receita: existing.receita + (item.prato.preco * item.quantidade),
                });
            });
        });

        const pratosMaisVendidos = Array.from(vendasPorPrato.values())
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 5);

        // Pedidos hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const pedidosHoje = pedidos.filter(p => {
            const dataPedido = new Date(p.data);
            dataPedido.setHours(0, 0, 0, 0);
            return dataPedido.getTime() === hoje.getTime();
        }).length;

        // Receita hoje
        const receitaHoje = pedidos
            .filter(p => {
                const dataPedido = new Date(p.data);
                dataPedido.setHours(0, 0, 0, 0);
                return dataPedido.getTime() === hoje.getTime();
            })
            .reduce((acc, p) => acc + p.total, 0);

        // Taxa de conversão (pedidos concluídos / total)
        const taxaConversao = pedidos.length > 0
            ? (pedidosPorStatus.concluido / pedidos.length) * 100
            : 0;

        return {
            receitaTotal,
            pedidosPorStatus,
            ticketMedio,
            pratosMaisVendidos,
            totalPedidos: pedidos.length,
            totalPratos: pratos.length,
            pedidosHoje,
            receitaHoje,
            taxaConversao,
        };
    }, [pedidos, pratos]);

    return metrics;
};
