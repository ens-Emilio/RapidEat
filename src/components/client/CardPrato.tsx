import { useState } from 'react';
import { Plus, Info, Heart, X, ShoppingBag } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { Prato } from '../../types';
import { showToast } from '../../utils/toast';

interface CardPratoProps {
    prato: Prato;
}

export const CardPrato = ({ prato }: CardPratoProps) => {
    const addCarrinho = useDeliveryStore(s => s.addCarrinho);
    const favoritos = useDeliveryStore(s => s.favoritos);
    const toggleFavorito = useDeliveryStore(s => s.toggleFavorito);
    const isFavorito = favoritos.includes(prato.id);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleAddCarrinho = () => {
        addCarrinho(prato);
        showToast.success('Adicionado ao carrinho!', prato.nome);
    };

    const handleToggleFavorito = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorito(prato.id);
        if (isFavorito) {
            showToast.info('Removido dos favoritos', prato.nome);
        } else {
            showToast.success('Adicionado aos favoritos!', prato.nome);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsDetailOpen(true)}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full cursor-pointer card-hover"
            >
                <div className="relative overflow-hidden h-48 md:h-56">
                    <img
                        src={prato.imagem}
                        alt={prato.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button
                            onClick={handleToggleFavorito}
                            className={`p-2.5 rounded-full backdrop-blur-md btn-premium shadow-lg ${isFavorito
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500'
                                }`}
                        >
                            <Heart size={20} fill={isFavorito ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-orange-500/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-black text-white shadow-lg tracking-wider">
                            {prato.categoria}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-orange-500 transition-colors">
                            {prato.nome}
                        </h3>
                        <div className="text-slate-300 dark:text-slate-700">
                            <Info size={18} />
                        </div>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                        {prato.descricao}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Preço</span>
                            <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                                R$ {prato.preco.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddCarrinho();
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl btn-premium shadow-xl shadow-orange-500/20 flex items-center justify-center group/btn"
                        >
                            <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Detalhes */}
            {isDetailOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                    <div
                        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
                            <img
                                src={prato.imagem}
                                alt={prato.nome}
                                className="w-full h-full object-cover animate-scale-in"
                                style={{ animationDuration: '0.6s' }}
                            />
                            <button
                                onClick={() => setIsDetailOpen(false)}
                                className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-full shadow-xl text-slate-800 dark:text-slate-100 hover:scale-110 active:scale-90 transition-all border border-slate-100/50 dark:border-slate-800/50 z-10"
                            >
                                <X size={24} />
                            </button>
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60" />
                        </div>

                        <div className="p-8 sm:p-10 overflow-y-auto">
                            <div className="flex items-center gap-3 mb-4 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                                <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
                                    {prato.categoria}
                                </span>
                                {isFavorito && (
                                    <span className="bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest flex items-center gap-1">
                                        <Heart size={10} fill="currentColor" /> Favorito
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                                {prato.nome}
                            </h2>

                            <div className="space-y-6 text-slate-600 dark:text-slate-300">
                                <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                    <h4 className="text-xs uppercase font-black text-slate-400 tracking-widest mb-3">Sobre este prato</h4>
                                    <p className="text-lg leading-relaxed font-medium">
                                        {prato.descricao}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100 dark:border-slate-800 animate-slide-up" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Tempo Médio</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">25-35 min</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Peso/Tamanho</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">Individual (aprox. 450g)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                                <div className="text-center sm:text-left shrink-0">
                                    <p className="text-xs uppercase font-black text-slate-400 tracking-widest mb-1">Preço Total</p>
                                    <p className="text-3xl font-black text-orange-500">
                                        R$ {prato.preco.toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        handleAddCarrinho();
                                        setIsDetailOpen(false);
                                    }}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 px-8 rounded-[1.5rem] shadow-2xl shadow-orange-500/30 btn-premium flex items-center justify-center gap-3 text-lg"
                                >
                                    <ShoppingBag size={24} />
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Background overlay click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsDetailOpen(false)} />
                </div>
            )}
        </>
    );
};

