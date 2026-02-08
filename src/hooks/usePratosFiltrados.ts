import { useMemo } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';

/**
 * Hook para filtrar pratos baseado em busca e categoria
 */
export const usePratosFiltrados = () => {
    const pratos = useDeliveryStore((state) => state.pratos);
    const searchQuery = useDeliveryStore((state) => state.searchQuery);
    const categoriaFiltro = useDeliveryStore((state) => state.categoriaFiltro);

    const pratosFiltrados = useMemo(() => {
        let resultado = [...pratos];

        // Filtro por busca
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            resultado = resultado.filter(
                (prato) =>
                    prato.nome.toLowerCase().includes(query) ||
                    prato.descricao.toLowerCase().includes(query) ||
                    prato.categoria.toLowerCase().includes(query)
            );
        }

        // Filtro por categoria
        if (categoriaFiltro) {
            resultado = resultado.filter((prato) => prato.categoria === categoriaFiltro);
        }

        return resultado;
    }, [pratos, searchQuery, categoriaFiltro]);

    // Obter categorias únicas
    const categorias = useMemo(() => {
        const cats = new Set(pratos.map((p) => p.categoria));
        return Array.from(cats).sort();
    }, [pratos]);

    return {
        pratosFiltrados,
        categorias,
        totalPratos: pratos.length,
        totalFiltrados: pratosFiltrados.length,
    };
};
