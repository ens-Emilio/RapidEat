import { LayoutDashboard, ShoppingBag, TrendingUp, Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';

export const DashboardBiz = () => {
    const pedidos = useDeliveryStore(s => s.pedidos);
    const updateStatusPedido = useDeliveryStore(s => s.updateStatusPedido);

    const stats = [
        { label: 'Total Vendas', value: `R$ ${pedidos.reduce((acc, p) => acc + p.total, 0).toFixed(2)}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950/30' },
        { label: 'Pedidos Total', value: pedidos.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-950/30' },
        { label: 'Pendentes', value: pedidos.filter(p => p.status === 'pendente').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-950/30' },
        { label: 'Concluídos', value: pedidos.filter(p => p.status === 'concluido').length, icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-950/30' },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pendente': return 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400';
            case 'preparando': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
            case 'enviado': return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400';
            case 'concluido': return 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400';
            case 'cancelado': return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                    <LayoutDashboard size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Painel de Gestão</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Acompanhe seu negócio em tempo real</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Last Orders */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Package className="text-indigo-600" size={20} />
                        Pedidos Recentes
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID / Itens</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 dark:text-slate-200">#{pedido.id}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                                            {pedido.itens.map(it => `${it.quantidade}x ${it.prato.nome}`).join(', ')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                                        R$ {pedido.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(pedido.status)}`}>
                                            {pedido.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {pedido.status === 'pendente' && (
                                                <button
                                                    onClick={() => updateStatusPedido(pedido.id, 'preparando')}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition"
                                                    title="Começar preparo"
                                                >
                                                    <Clock size={18} />
                                                </button>
                                            )}
                                            {pedido.status === 'preparando' && (
                                                <button
                                                    onClick={() => updateStatusPedido(pedido.id, 'enviado')}
                                                    className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition"
                                                    title="Marcar como enviado"
                                                >
                                                    <Package size={18} />
                                                </button>
                                            )}
                                            {(pedido.status === 'enviado' || pedido.status === 'pendente') && (
                                                <button
                                                    onClick={() => updateStatusPedido(pedido.id, 'concluido')}
                                                    className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg transition"
                                                    title="Concluir pedido"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            {pedido.status !== 'concluido' && pedido.status !== 'cancelado' && (
                                                <button
                                                    onClick={() => updateStatusPedido(pedido.id, 'cancelado')}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                                    title="Cancelar pedido"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pedidos.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">
                                        Nenhum pedido recebido ainda...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
