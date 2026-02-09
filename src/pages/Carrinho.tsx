import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { useDeliveryStore } from '../stores/deliveryStore';
import { useUserStore } from '../stores/useUserStore';
import { Link, useNavigate } from 'react-router-dom';
import { CupomInput } from '../components/client/CupomInput';
import { ResumoCarrinho } from '../components/client/ResumoCarrinho';
import { useCarrinhoTotais } from '../hooks/useCarrinhoTotais';
import { showToast } from '../utils/toast';
import { LoadingButton } from '../components/Loading';

export const Carrinho = () => {
    const {
        carrinho,
        updateQty,
        finalizarPedido
    } = useDeliveryStore();
    const { profile } = useUserStore();

    const { quantidadeItens, total } = useCarrinhoTotais();
    const navigate = useNavigate();
    const [isFinalizando, setIsFinalizando] = useState(false);

    const handleFinalizar = async () => {
        if (carrinho.length === 0) return;

        setIsFinalizando(true);

        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        finalizarPedido(profile);

        showToast.success(
            'Pedido realizado com sucesso!',
            `Total: R$ ${total.toFixed(2)} - Acompanhe em "Meus Pedidos"`
        );

        setIsFinalizando(false);
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
        <div className="container mx-auto px-4 max-w-6xl py-10">
            <header className="mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-4">
                    Meu Carrinho
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        {quantidadeItens} {quantidadeItens === 1 ? 'item' : 'itens'}
                    </span>
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Lista de Itens */}
                <div className="lg:col-span-2 space-y-5">
                    {carrinho.map(item => (
                        <div key={item.prato.id} className="group bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative shrink-0">
                                <img src={item.prato.imagem} alt={item.prato.nome} className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-2xl shadow-sm" />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 mb-1">{item.prato.nome}</h3>
                                <p className="text-orange-600 dark:text-orange-400 font-black text-lg">
                                    R$ {item.prato.preco.toFixed(2).replace('.', ',')}
                                </p>
                            </div>

                            <div className="flex items-center gap-6 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-slate-800">
                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <button
                                        onClick={() => updateQty(item.prato.id, -1)}
                                        className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-black text-lg sm:text-base w-6 text-center text-slate-800 dark:text-slate-100">{item.quantidade}</span>
                                    <button
                                        onClick={() => updateQty(item.prato.id, 1)}
                                        className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => updateQty(item.prato.id, -item.quantidade)}
                                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
                                    aria-label="Remover item"
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumo do Pedido */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none sticky top-24">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-2">
                            Resumo
                        </h2>

                        <div className="space-y-6">
                            <ResumoCarrinho />

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <CupomInput />
                            </div>
                        </div>

                        <LoadingButton
                            onClick={handleFinalizar}
                            loading={isFinalizando}
                            className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-[1.25rem] transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 group text-lg"
                        >
                            Finalizar Pedido
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </LoadingButton>

                        <Link to="/" className="flex items-center justify-center gap-2 mt-8 text-slate-400 hover:text-orange-500 text-sm font-bold transition-all group">
                            <ShoppingBag size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Continuar comprando
                        </Link>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-950/20 p-5 rounded-[1.5rem] border border-indigo-100 dark:border-indigo-900/50 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-xl h-fit">
                            <Info size={20} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 leading-relaxed">
                            Sua entrega será processada conforme o endereço salvo. Tempo estimado: <span className="font-bold underline">30-45 min</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

