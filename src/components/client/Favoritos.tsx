import { Heart } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { CardPrato } from './CardPrato';

export const Favoritos = () => {
    const { pratos, favoritos } = useDeliveryStore((state) => ({
        pratos: state.pratos,
        favoritos: state.favoritos,
    }));

    const pratosFavoritos = pratos.filter((prato) => favoritos.includes(prato.id));

    if (pratosFavoritos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Heart className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Nenhum favorito ainda
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
                    Adicione pratos aos favoritos clicando no ícone de coração nos cards do cardápio
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-orange-500 fill-orange-500" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Meus Favoritos
                </h2>
                <span className="px-2.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
                    {pratosFavoritos.length}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pratosFavoritos.map((prato) => (
                    <CardPrato key={prato.id} prato={prato} />
                ))}
            </div>
        </div>
    );
};
