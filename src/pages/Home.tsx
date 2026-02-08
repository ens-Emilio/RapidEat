import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { pratos } from '../data/pratos';
import { CardPrato } from '../components/CardPrato';

export const Home = () => {
    const [busca, setBusca] = useState('');
    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

    const categorias = ['Todos', ...Array.from(new Set(pratos.map(p => p.categoria)))];

    const pratosFiltrados = pratos.filter(p => {
        const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
        const matchCategoria = categoriaAtiva === 'Todos' || p.categoria === categoriaAtiva;
        return matchBusca && matchCategoria;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">
                        O que vamos comer hoje? 🍕
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Os melhores pratos da cidade, entregues na sua porta.
                    </p>
                </div>

                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar pratos ou cozinhas..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
                <div className="bg-orange-100 dark:bg-orange-950/30 p-2 rounded-xl text-orange-600">
                    <Filter size={18} />
                </div>
                {categorias.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoriaAtiva(cat)}
                        className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all text-sm ${categoriaAtiva === cat
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {pratosFiltrados.map(prato => (
                    <CardPrato key={prato.id} prato={prato} />
                ))}
            </div>

            {pratosFiltrados.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-400 italic">Nenhum prato encontrado para sua busca...</p>
                </div>
            )}
        </div>
    );
};
