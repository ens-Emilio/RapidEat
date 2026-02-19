import { useMemo } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';

export type TimeRange = 'today' | 'week' | 'month' | 'all';

/**
 * Hook para calcular métricas do dashboard empresarial com suporte a filtragem temporal
 */
export const useDashboardMetrics = (timeRange: TimeRange = 'all') => {
    const pedidos = useDeliveryStore((state) => state.pedidos);
    const pratos = useDeliveryStore((state) => state.pratos);

    const metrics = useMemo(() => {
        // Filtrar pedidos por período
        const agora = new Date();
        const inicioPeriodo = new Date();

        switch (timeRange) {
            case 'today':
                inicioPeriodo.setHours(0, 0, 0, 0);
                break;
            case 'week':
                inicioPeriodo.setDate(agora.getDate() - 7);
                break;
            case 'month':
                inicioPeriodo.setDate(agora.getDate() - 30);
                break;
            default:
                inicioPeriodo.setTime(0);
        }

        const pedidosFiltrados = pedidos.filter(p => new Date(p.data).getTime() >= inicioPeriodo.getTime());

        // Receita total no período
        const receitaTotal = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0);

        // Pedidos por status (global para visão atual, mas vamos focar no período para o dashboard principal)
        const pedidosPorStatus = {
            pendente: pedidosFiltrados.filter(p => p.status === 'pendente').length,
            preparando: pedidosFiltrados.filter(p => p.status === 'preparando').length,
            enviado: pedidosFiltrados.filter(p => p.status === 'enviado').length,
            concluido: pedidosFiltrados.filter(p => p.status === 'concluido').length,
            cancelado: pedidosFiltrados.filter(p => p.status === 'cancelado').length,
        };

        // Ticket médio no período
        const ticketMedio = pedidosFiltrados.length > 0 ? receitaTotal / pedidosFiltrados.length : 0;

        // Pratos mais vendidos no período
        const vendasPorPrato = new Map<string, { nome: string; quantidade: number; receita: number; imagem: string }>();

        pedidosFiltrados.forEach(pedido => {
            pedido.itens.forEach(item => {
                const existing = vendasPorPrato.get(item.prato.id) || {
                    nome: item.prato.nome,
                    quantidade: 0,
                    receita: 0,
                    imagem: item.prato.imagem
                };
                vendasPorPrato.set(item.prato.id, {
                    ...existing,
                    quantidade: existing.quantidade + item.quantidade,
                    receita: existing.receita + (item.prato.preco * item.quantidade),
                });
            });
        });

        const pratosMaisVendidos = Array.from(vendasPorPrato.values())
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 8); // Mostrar até 8 pratos

        // Taxa de conversão no período
        const taxaConversao = pedidosFiltrados.length > 0
            ? (pedidosFiltrados.filter(p => p.status === 'concluido').length / pedidosFiltrados.length) * 100
            : 0;

        return {
            receitaTotal,
            pedidosPorStatus,
            ticketMedio,
            pratosMaisVendidos,
            totalPedidos: pedidosFiltrados.length,
            totalPratos: pratos.length,
            taxaConversao,
        };
    }, [pedidos, pratos, timeRange]);

    return metrics;
};
