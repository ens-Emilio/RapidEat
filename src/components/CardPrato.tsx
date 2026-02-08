import { Plus, Info } from 'lucide-react';
import { useDeliveryStore } from '../stores/useDeliveryStore';
import type { Prato } from '../types';

interface CardPratoProps {
    prato: Prato;
}

export const CardPrato = ({ prato }: CardPratoProps) => {
    const addCarrinho = useDeliveryStore(s => s.addCarrinho);

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
            <div className="relative overflow-hidden h-48">
                <img
                    src={prato.imagem}
                    alt={prato.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-sm">
                        {prato.categoria}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        {prato.nome}
                    </h3>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
                        <Info size={18} />
                    </button>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {prato.descricao}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-xl font-black text-orange-600 dark:text-orange-400">
                        R$ {prato.preco.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                        onClick={() => addCarrinho(prato)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/20 flex items-center gap-2 pr-4 pl-3"
                    >
                        <Plus size={20} />
                        <span className="font-bold text-sm">Adicionar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
