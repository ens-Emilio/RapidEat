import { useDeliveryStore } from '../stores/useDeliveryStore';
import { Package, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pedidos = () => {
    const { pedidos } = useDeliveryStore();

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
                    Seus pedidos finalizados aparecerão aqui para você acompanhar o histórico.
                </p>
                <Link
                    to="/"
                    className="text-orange-500 hover:text-orange-600 font-bold transition-colors"
                >
                    Ir para o Cardápio →
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8">
                Meus Pedidos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pedidos.map(pedido => (
                    <div key={pedido.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-5 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                <Calendar size={14} />
                                {new Date(pedido.data).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                                <CheckCircle2 size={14} />
                                {pedido.status}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="space-y-3 mb-6">
                                {pedido.itens.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 dark:text-slate-300">
                                            <span className="font-bold text-slate-900 dark:text-slate-100">{item.quantidade}x</span> {item.nome}
                                        </span>
                                        <span className="text-slate-400">
                                            R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800">
                                <span className="font-bold text-slate-800 dark:text-slate-100">Total</span>
                                <span className="text-xl font-black text-orange-600 dark:text-orange-400">
                                    R$ {pedido.total.toFixed(2).replace('.', ',')}
                                </span>
                            </div>

                            <button className="w-full mt-6 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                Refazer Pedido
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
