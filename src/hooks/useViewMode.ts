import { useDeliveryStore } from '../stores/deliveryStore';

export const useViewMode = () => {
    const viewMode = useDeliveryStore(s => s.viewMode);
    const setViewMode = useDeliveryStore(s => s.setViewMode);

    const isClient = viewMode === 'cliente';
    const isBiz = viewMode === 'empresa';

    const toggleMode = () => setViewMode(isClient ? 'empresa' : 'cliente');

    return { viewMode, setViewMode, isClient, isBiz, toggleMode };
};
