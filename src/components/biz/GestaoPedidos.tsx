import { useState, useMemo, useEffect } from 'react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { Package, Clock, Truck, Check, X, User, MapPin, Play, Send, CheckCircle, History, AlertCircle, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { StatusPedido, Pedido } from '../../types';

interface StatusConfig {
    icon: LucideIcon;
    color: string;
    bg: string;
    label: string;
    actionLabel?: string;
    nextStatus?: StatusPedido;
    actionIcon?: LucideIcon;
}

export const GestãoPedidos = () => {
    const pedidos = useDeliveryStore((state) => state.pedidos);
    const updateStatusPedido = useDeliveryStore((state) => state.updateStatusPedido);
    const [view, setView] = useState<'board' | 'history'>('board');
    const [now, setNow] = useState(new Date());

    // Atualiza o "agora" para os cálculos de urgência
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000); // a cada minuto
        return () => clearInterval(timer);
    }, []);

    const getStatusConfig = (status: StatusPedido): StatusConfig => {
        const configs: Record<StatusPedido, StatusConfig> = {
            pendente: { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20', label: 'Pendente', actionLabel: 'Preparar', nextStatus: 'preparando', actionIcon: Play },
            preparando: { icon: Play, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20', label: 'Na Cozinha', actionLabel: 'Despachar', nextStatus: 'enviado', actionIcon: Send },
            enviado: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20', label: 'A Caminho', actionLabel: 'Concluir', nextStatus: 'concluido', actionIcon: CheckCircle },
            concluido: { icon: Check, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20', label: 'Concluído' },
            cancelado: { icon: X, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', label: 'Cancelado' },
        };
        return configs[status];
    };

    const [busca, setBusca] = useState('');
    const [apenasAtrasados, setApenasAtrasados] = useState(false);

    const filteredPedidos = useMemo(() => {
        return pedidos.filter(p => {
            const matchesSearch = p.cliente?.nome.toLowerCase().includes(busca.toLowerCase()) ||
                p.id.toLowerCase().includes(busca.toLowerCase());
            const matchesUrgency = !apenasAtrasados || getUrgencyLevel(p.data) === 'critical';
            return matchesSearch && matchesUrgency;
        });
    }, [pedidos, busca, apenasAtrasados, now]);

    const ordersByColumn = useMemo(() => {
        return {
            pendente: filteredPedidos.filter(p => p.status === 'pendente').sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()),
            preparando: filteredPedidos.filter(p => p.status === 'preparando').sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()),
            enviado: filteredPedidos.filter(p => p.status === 'enviado').sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()),
            history: filteredPedidos.filter(p => p.status === 'concluido' || p.status === 'cancelado').sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
        };
    }, [filteredPedidos]);

    // ... (rest of the component logic)

    const getUrgencyLevel = (data: string) => {
        const diffInMinutes = Math.floor((now.getTime() - new Date(data).getTime()) / 60000);
        if (diffInMinutes > 30) return 'critical';
        if (diffInMinutes > 15) return 'warning';
        return 'normal';
    };

    const OrderCard = ({ pedido }: { pedido: Pedido }) => {
        const config = getStatusConfig(pedido.status);
        const urgency = getUrgencyLevel(pedido.data);
        const timeElapsed = Math.floor((now.getTime() - new Date(pedido.data).getTime()) / 60000);

        return (
            <div className={`group bg-white dark:bg-slate-900 rounded-2xl border ${urgency === 'critical' ? 'border-red-500/50 shadow-lg shadow-red-500/10' : urgency === 'warning' ? 'border-orange-500/50' : 'border-slate-100 dark:border-slate-800'
                } overflow-hidden card-hover animate-slide-up flex flex-col p-4 mb-4`}>

                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pedido</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">#{pedido.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${urgency === 'critical' ? 'bg-red-500 text-white animate-pulse' : urgency === 'warning' ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}>
                            <Clock size={12} />
                            {timeElapsed} min
                        </div>
                    </div>
                </div>

                {/* Itens */}
                <div className="space-y-2 mb-4">
                    {pedido.itens.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className={`w-5 h-5 flex items-center justify-center rounded-md font-black text-[10px] ${config.bg} ${config.color}`}>{item.quantidade}x</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{item.prato.nome}</span>
                        </div>
                    ))}
                </div>

                {/* Cliente minimal */}
                <div className="mb-4 text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-2 mb-1">
                        <User size={12} className="text-slate-400" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{pedido.cliente?.nome}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                        <span className="text-slate-500 dark:text-slate-400 leading-tight">{pedido.cliente?.endereco}</span>
                    </div>
                </div>

                {/* Ação Rápida */}
                {config.nextStatus && config.actionIcon && (
                    <button
                        onClick={() => updateStatusPedido(pedido.id, config.nextStatus!)}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest btn-premium ${config.nextStatus === 'preparando' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' :
                            config.nextStatus === 'enviado' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' :
                                'bg-green-500 text-white shadow-lg shadow-green-500/20'
                            }`}
                    >
                        <config.actionIcon size={16} />
                        {config.actionLabel}
                    </button>
                )}

                {pedido.status === 'pendente' && (
                    <button
                        onClick={() => updateStatusPedido(pedido.id, 'cancelado')}
                        className="mt-2 w-full py-2 text-[10px] text-slate-400 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
                    >
                        Cancelar Pedido
                    </button>
                )}
            </div>
        );
    };

    const Column = ({ title, icon: Icon, color, orders }: { title: string, icon: any, color: string, orders: Pedido[] }) => (
        <div className="flex flex-col w-full lg:min-w-[320px] lg:max-w-[400px] flex-1">
            <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${color} border-opacity-20`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${color.replace('text', 'bg').replace('500', '100')} dark:bg-opacity-10 dark:${color}`}>
                        <Icon size={20} className={color} />
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">{title}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${color} bg-slate-100 dark:bg-slate-800`}>
                    {orders.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto lg:overflow-y-visible no-scrollbar stagger-container min-h-[100px] lg:min-h-[500px]">
                {orders.length > 0 ? (
                    orders.map(pedido => <OrderCard key={pedido.id} pedido={pedido} />)
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl opacity-50">
                        <Package size={32} className="text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Tudo limpo por aqui</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setView('board')}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${view === 'board' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Painel Ativo
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${view === 'history' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <History size={14} />
                        Histórico
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => setApenasAtrasados(!apenasAtrasados)}
                        className={`flex items-center gap-2 px-3 md:px-4 py-3 rounded-2xl border transition-all shrink-0 ${apenasAtrasados
                            ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-500/50'}`}
                    >
                        <AlertCircle size={16} className={apenasAtrasados ? 'animate-pulse' : 'text-red-500'} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {apenasAtrasados ? 'Atrasados' : `Atrasados (${pedidos.filter(p => getUrgencyLevel(p.data) === 'critical').length})`}
                        </span>
                    </button>
                </div>
            </div>

            {view === 'board' ? (
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 lg:overflow-x-auto pb-6 no-scrollbar lg:snap-x">
                    <Column title="Entrada" icon={Clock} color="text-orange-500" orders={ordersByColumn.pendente} />
                    <Column title="Na Cozinha" icon={Play} color="text-blue-500" orders={ordersByColumn.preparando} />
                    <Column title="Logística" icon={Truck} color="text-purple-500" orders={ordersByColumn.enviado} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
                    {ordersByColumn.history.map(pedido => (
                        <div key={pedido.id} className="opacity-70 grayscale-[0.5]">
                            <OrderCard pedido={pedido} />
                        </div>
                    ))}
                    {ordersByColumn.history.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <History size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest">Nenhum pedido finalizado encontrado</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

