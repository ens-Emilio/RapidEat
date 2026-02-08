import { useEffect } from 'react';

export const useLocalStorageSync = () => {
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            // Se a chave mudar em outra aba, recarregamos o estado se necessário
            // Zustand persist já lida com muito disso, mas aqui garantimos reatividade extra
            if (e.key === 'rapidEat-storage') {
                window.location.reload(); // Forma simples de forçar sync total
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
};
