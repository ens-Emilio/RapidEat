import { Search, X, Filter } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { usePratosFiltrados } from '../../hooks/usePratosFiltrados';

export const SearchBar = () => {
    // Usar selectors separados para evitar loop infinito
    const searchQuery = useDeliveryStore((state) => state.searchQuery);
    const categoriaFiltro = useDeliveryStore((state) => state.categoriaFiltro);
    const setSearchQuery = useDeliveryStore((state) => state.setSearchQuery);
    const setCategoriaFiltro = useDeliveryStore((state) => state.setCategoriaFiltro);

    const { categorias, totalFiltrados, totalPratos } = usePratosFiltrados();

    const limparFiltros = () => {
        setSearchQuery('');
        setCategoriaFiltro(null);
    };

    const temFiltrosAtivos = searchQuery.trim() !== '' || categoriaFiltro !== null;

    return (
        <div className="space-y-4">
            {/* Barra de Busca */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar pratos, ingredientes..."
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-all shadow-sm"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                        aria-label="Limpar busca"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                )}
            </div>

            {/* Filtros de Categoria */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 shrink-0">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filtrar:</span>
                </div>

                {/* Botão "Todos" */}
                <button
                    onClick={() => setCategoriaFiltro(null)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all shrink-0 ${categoriaFiltro === null
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                >
                    Todos
                </button>

                {/* Botões de Categoria */}
                {categorias.map((categoria) => (
                    <button
                        key={categoria}
                        onClick={() => setCategoriaFiltro(categoria)}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-all shrink-0 ${categoriaFiltro === categoria
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        {categoria}
                    </button>
                ))}
            </div>

            {/* Indicador de Resultados */}
            <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600 dark:text-slate-400">
                    {temFiltrosAtivos ? (
                        <>
                            Mostrando <span className="font-bold text-orange-600 dark:text-orange-400">{totalFiltrados}</span> de{' '}
                            {totalPratos} pratos
                        </>
                    ) : (
                        <>
                            <span className="font-bold text-orange-600 dark:text-orange-400">{totalPratos}</span> pratos disponíveis
                        </>
                    )}
                </p>

                {temFiltrosAtivos && (
                    <button
                        onClick={limparFiltros}
                        className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium flex items-center gap-1 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Limpar filtros
                    </button>
                )}
            </div>
        </div>
    );
};
