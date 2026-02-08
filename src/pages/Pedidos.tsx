import { useState, useMemo } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';
import { Package, Calendar, Clock, Truck, Check, X, Filter, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { StatusPedido } from '../types';

export const Pedidos = () => {
    const { pedidos } = useDeliveryStore();
    const [filtroStatus, setFiltroStatus] = useState<StatusPedido | 'todos'>('todos');

    // Filtrar pedidos por status
    const pedidosFiltrados = useMemo(() => {
        if (filtroStatus === 'todos') return pedidos;
        return pedidos.filter(p => p.status === filtroStatus);
    }, [pedidos, filtroStatus]);

    // Estatísticas
    const stats = useMemo(() => {
        return {
            total: pedidos.length,
            pendente: pedidos.filter(p => p.status === 'pendente').length,
            preparando: pedidos.filter(p => p.status === 'preparando').length,
            enviado: pedidos.filter(p => p.status === 'enviado').length,
            concluido: pedidos.filter(p => p.status === 'concluido').length,
            cancelado: pedidos.filter(p => p.status === 'cancelado').length,
        };
    }, [pedidos]);

    const getStatusConfig = (status: StatusPedido) => {
        const configs = {
            pendente: { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30', label: 'Pendente', pulse: false },
            preparando: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', label: 'Preparando', pulse: true },
            enviado: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30', label: 'Enviado', pulse: false },
            concluido: { icon: Check, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30', label: 'Concluído', pulse: false },
            cancelado: { icon: X, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', label: 'Cancelado', pulse: false },
        };
        return configs[status];
    };

    if (pedidos.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-full text-slate-400 mb-6">
                    <Package size={64} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">
                    Nenhum pedido realizado
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    Seus pedidos finalizados aparecerão aqui para você acompanhar o histórico em tempo real.
                </p>
                <Link
                    to="/"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-orange-500/30"
                >
                    Ir para o Cardápio
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    Meus Pedidos
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Acompanhe o status dos seus pedidos em tempo real
                </p>
            </div>

            {/* Filtros de Status */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filtrar por status:</span>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setFiltroStatus('todos')}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${filtroStatus === 'todos'
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        Todos <span className="ml-1 opacity-70">({stats.total})</span>
                    </button>

                    {(['pendente', 'preparando', 'enviado', 'concluido'] as StatusPedido[]).map((status) => {
                        const config = getStatusConfig(status);
                        const Icon = config.icon;
                        const count = stats[status];

                        return (
                            <button
                                key={status}
                                onClick={() => setFiltroStatus(status)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${filtroStatus === status
                                    ? `${config.bg} ${config.color} shadow-md`
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <Icon size={14} className={config.pulse ? 'animate-pulse' : ''} />
                                {config.label}
                                <span className="opacity-70">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid de Pedidos */}
            {pedidosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pedidosFiltrados.map(pedido => {
                        const config = getStatusConfig(pedido.status);
                        const Icon = config.icon;

                        return (
                            <div key={pedido.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                {/* Header */}
                                <div className={`p-4 border-b border-slate-100 dark:border-slate-800 ${config.bg} flex justify-between items-center`}>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                                        <Calendar size={14} />
                                        {new Date(pedido.data).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${config.color}`}>
                                        <Icon size={14} className={config.pulse ? 'animate-pulse' : ''} />
                                        {config.label}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    {/* Itens */}
                                    <div className="space-y-2.5 mb-5">
                                        {pedido.itens.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600 dark:text-slate-300">
                                                    <span className="font-bold text-orange-600 dark:text-orange-400">{item.quantidade}x</span> {item.prato.nome}
                                                </span>
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                                    R$ {(item.prato.preco * item.quantidade).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Cupom */}
                                    {pedido.cupom && (
                                        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-lg">
                                            <Ticket size={14} />
                                            <span className="font-semibold">Cupom {pedido.cupom} aplicado</span>
                                        </div>
                                    )}

                                    {/* Total */}
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="font-bold text-slate-800 dark:text-slate-100">Total</span>
                                        <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                                            R$ {pedido.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <Package className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                        Nenhum pedido com status <span className="font-bold">{filtroStatus}</span>
                    </p>
                </div>
            )}
        </div>
    );
};
