import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useDeliveryStore } from '../stores/useDeliveryStore';
import { Link, useNavigate } from 'react-router-dom';

export const Carrinho = () => {
    const { carrinho, updateQuantidade, removerCarrinho, finalizarPedido } = useDeliveryStore();
    const navigate = useNavigate();

    const subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const frete = carrinho.length > 0 ? 10 : 0;
    const total = subtotal + frete;

    const handleFinalizar = () => {
        finalizarPedido();
        alert('Pedido realizado com sucesso! 🎉');
        navigate('/pedidos');
    };

    if (carrinho.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="bg-orange-100 dark:bg-orange-950/30 p-8 rounded-full text-orange-500 mb-6 animate-bounce">
                    <ShoppingBag size={64} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">
                    Seu carrinho está vazio
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                    Parece que você ainda não escolheu seu prato favorito hoje.
                </p>
                <Link
                    to="/"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-orange-500/30"
                >
                    Ver Cardápio
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                Meu Carrinho <span className="text-slate-400 font-medium text-lg">({carrinho.length} itens)</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    {carrinho.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <img src={item.imagem} alt={item.nome} className="w-24 h-24 object-cover rounded-xl" />

                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.nome}</h3>
                                <p className="text-orange-600 dark:text-orange-400 font-bold">
                                    R$ {item.preco.toFixed(2).replace('.', ',')}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                                <button
                                    onClick={() => updateQuantidade(item.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 transition shadow-sm"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-bold w-4 text-center dark:text-slate-100">{item.quantidade}</span>
                                <button
                                    onClick={() => updateQuantidade(item.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 transition shadow-sm"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => removerCarrinho(item.id)}
                                className="text-slate-300 hover:text-red-500 transition p-2"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Resumo</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>Taxa de entrega</span>
                                <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />
                            <div className="flex justify-between text-xl font-black text-slate-800 dark:text-slate-100">
                                <span>Total</span>
                                <span className="text-orange-600 dark:text-orange-400">R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleFinalizar}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
                        >
                            Finalizar Pedido
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <Link to="/" className="block text-center mt-6 text-slate-400 hover:text-orange-500 text-sm font-medium transition">
                            Continuar comprando
                        </Link>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-3">
                        <div className="text-blue-500 mt-1">
                            <Info size={20} />
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            Sua entrega será processada conforme o endereço salvo. Tempo estimado: 30-45 min.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Info = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);
