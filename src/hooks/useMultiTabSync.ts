import { useEffect } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';

/**
 * Hook para sincronizar estado entre múltiplas abas/tabs
 * Escuta eventos de storage e atualiza o store quando outra aba faz mudanças
 */
export const useMultiTabSync = () => {
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            // Verifica se a mudança foi na chave do RapidEat
            if (e.key === 'rapidEat-storage' && e.newValue) {
                try {
                    const newState = JSON.parse(e.newValue);

                    // Atualiza o store com o novo estado
                    if (newState?.state) {
                        // Zustand persist salva em { state: {...}, version: 0 }
                        const store = useDeliveryStore.getState();

                        // Atualiza apenas se houver mudanças
                        if (JSON.stringify(store) !== JSON.stringify(newState.state)) {
                            // Force update do store
                            useDeliveryStore.setState(newState.state);
                            console.log('🔄 Estado sincronizado de outra aba');
                        }
                    }
                } catch (error) {
                    console.error('Erro ao sincronizar estado:', error);
                }
            }
        };

        // Adiciona listener para mudanças no localStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
};
