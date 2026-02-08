import { useState, useMemo } from 'react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { Package, Calendar, Clock, Truck, Check, X, ChevronDown } from 'lucide-react';
import type { StatusPedido } from '../../types';

export const GestãoPedidos = () => {
    const { pedidos, updateStatusPedido } = useDeliveryStore();
    const [filtroStatus, setFiltroStatus] = useState<StatusPedido | 'todos'>('todos');
    const [ordenacao, setOrdenacao] = useState<'recente' | 'antigo' | 'valor'>('recente');

    // Filtrar e ordenar pedidos
    const pedidosProcessados = useMemo(() => {
        let resultado = [...pedidos];

        // Filtrar por status
        if (filtroStatus !== 'todos') {
            resultado = resultado.filter(p => p.status === filtroStatus);
        }

        // Ordenar
        resultado.sort((a, b) => {
            switch (ordenacao) {
                case 'recente':
                    return new Date(b.data).getTime() - new Date(a.data).getTime();
                case 'antigo':
                    return new Date(a.data).getTime() - new Date(b.data).getTime();
                case 'valor':
                    return b.total - a.total;
                default:
                    return 0;
            }
        });

        return resultado;
    }, [pedidos, filtroStatus, ordenacao]);

    const getStatusConfig = (status: StatusPedido) => {
        const configs = {
            pendente: { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30', label: 'Pendente' },
            preparando: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', label: 'Preparando' },
            enviado: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30', label: 'Enviado' },
            concluido: { icon: Check, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30', label: 'Concluído' },
            cancelado: { icon: X, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', label: 'Cancelado' },
        };
        return configs[status];
    };

    const statusOptions: StatusPedido[] = ['pendente', 'preparando', 'enviado', 'concluido', 'cancelado'];

    if (pedidos.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Nenhum pedido ainda
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                    Os pedidos dos clientes aparecerão aqui
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filtros e Ordenação */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFiltroStatus('todos')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filtroStatus === 'todos'
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        Todos ({pedidos.length})
                    </button>

                    {statusOptions.map((status) => {
                        const config = getStatusConfig(status);
                        const count = pedidos.filter(p => p.status === status).length;

                        return (
                            <button
                                key={status}
                                onClick={() => setFiltroStatus(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filtroStatus === status
                                        ? `${config.bg} ${config.color} shadow-md`
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {config.label} ({count})
                            </button>
                        );
                    })}
                </div>

                <select
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value as any)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="recente">Mais recentes</option>
                    <option value="antigo">Mais antigos</option>
                    <option value="valor">Maior valor</option>
                </select>
            </div>

            {/* Lista de Pedidos */}
            <div className="space-y-4">
                {pedidosProcessados.map((pedido) => {
                    const config = getStatusConfig(pedido.status);
                    const Icon = config.icon;

                    return (
                        <div
                            key={pedido.id}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Header */}
                            <div className={`p-4 ${config.bg} flex items-center justify-between`}>
                                <div className="flex items-center gap-3">
                                    <Icon className={`${config.color}`} size={20} />
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            Pedido #{pedido.id.slice(0, 8)}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                            <Calendar size={12} />
                                            {new Date(pedido.data).toLocaleString('pt-BR', {
                                                day: '2-digit',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                                        R$ {pedido.total.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {pedido.itens.reduce((acc, item) => acc + item.quantidade, 0)} itens
                                    </p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                {/* Itens */}
                                <div className="space-y-2 mb-4">
                                    {pedido.itens.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-slate-600 dark:text-slate-300">
                                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.quantidade}x</span>{' '}
                                                {item.prato.nome}
                                            </span>
                                            <span className="text-slate-500 dark:text-slate-400 font-medium">
                                                R$ {(item.prato.preco * item.quantidade).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Alterar Status */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                                        Alterar Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={pedido.status}
                                            onChange={(e) => updateStatusPedido(pedido.id, e.target.value as StatusPedido)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                                        >
                                            {statusOptions.map((status) => {
                                                const cfg = getStatusConfig(status);
                                                return (
                                                    <option key={status} value={status}>
                                                        {cfg.label}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {pedidosProcessados.length === 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
                    <Package className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400">
                        Nenhum pedido com status <span className="font-bold">{filtroStatus}</span>
                    </p>
                </div>
            )}
        </div>
    );
};
