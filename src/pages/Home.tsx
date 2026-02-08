import { Heart, Sparkles } from 'lucide-react';
import { CardPrato } from '../components/client/CardPrato';
import { SearchBar } from '../components/client/SearchBar';
import { usePratosFiltrados } from '../hooks/usePratosFiltrados';
import { useDeliveryStore } from '../stores/deliveryStore';
import { useState } from 'react';

export const Home = () => {
    const [mostrarApenasFavoritos, setMostrarApenasFavoritos] = useState(false);
    const favoritos = useDeliveryStore(s => s.favoritos);
    const { pratosFiltrados } = usePratosFiltrados();

    // Filtrar favoritos se ativo
    const pratosExibidos = mostrarApenasFavoritos
        ? pratosFiltrados.filter(p => favoritos.includes(p.id))
        : pratosFiltrados;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
                        O que vamos comer hoje?
                    </h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Os melhores pratos da cidade, entregues na sua porta.
                </p>
            </div>

            {/* Barra de Busca e Filtros */}
            <div className="mb-8">
                <SearchBar />
            </div>

            {/* Toggle Favoritos */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => setMostrarApenasFavoritos(!mostrarApenasFavoritos)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all text-sm shadow-sm ${mostrarApenasFavoritos
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                        }`}
                >
                    <Heart size={16} fill={mostrarApenasFavoritos ? 'currentColor' : 'none'} />
                    {mostrarApenasFavoritos ? 'Mostrando Favoritos' : 'Ver Favoritos'}
                    {mostrarApenasFavoritos && favoritos.length > 0 && (
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                            {favoritos.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Grid de Pratos */}
            {pratosExibidos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pratosExibidos.map(prato => (
                        <CardPrato key={prato.id} prato={prato} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                        {mostrarApenasFavoritos ? (
                            <Heart className="w-10 h-10 text-slate-400" />
                        ) : (
                            <Sparkles className="w-10 h-10 text-slate-400" />
                        )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {mostrarApenasFavoritos ? 'Nenhum favorito ainda' : 'Nenhum prato encontrado'}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        {mostrarApenasFavoritos
                            ? 'Adicione pratos aos favoritos clicando no ícone de coração'
                            : 'Tente ajustar os filtros ou buscar por outro termo'}
                    </p>
                </div>
            )}
        </div>
    );
};
