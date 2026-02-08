import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { useDeliveryStore } from '../stores/deliveryStore';
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

    const { quantidadeItens, total } = useCarrinhoTotais();
    const navigate = useNavigate();
    const [isFinalizando, setIsFinalizando] = useState(false);

    const handleFinalizar = async () => {
        if (carrinho.length === 0) return;

        setIsFinalizando(true);

        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        finalizarPedido();

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
                Meu Carrinho <span className="text-slate-400 font-medium text-lg">({quantidadeItens} itens)</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    {carrinho.map(item => (
                        <div key={item.prato.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <img src={item.prato.imagem} alt={item.prato.nome} className="w-24 h-24 object-cover rounded-xl" />

                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.prato.nome}</h3>
                                <p className="text-orange-600 dark:text-orange-400 font-bold">
                                    R$ {item.prato.preco.toFixed(2).replace('.', ',')}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                                <button
                                    onClick={() => updateQty(item.prato.id, -1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 transition shadow-sm"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-bold w-4 text-center dark:text-slate-100">{item.quantidade}</span>
                                <button
                                    onClick={() => updateQty(item.prato.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-orange-500 transition shadow-sm"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => updateQty(item.prato.id, -item.quantidade)}
                                className="text-slate-300 hover:text-red-500 transition p-2"
                                aria-label="Remover item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Resumo</h2>

                        <ResumoCarrinho />

                        <div className="mt-6">
                            <CupomInput />
                        </div>

                        <LoadingButton
                            onClick={handleFinalizar}
                            loading={isFinalizando}
                            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
                        >
                            Finalizar Pedido
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </LoadingButton>

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

