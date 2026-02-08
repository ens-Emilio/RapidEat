import { toast } from 'react-hot-toast';

export const notify = {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
    info: (msg: string) => toast(msg, { icon: 'ℹ️' }),
    orderStatus: (status: string) => {
        const icons: Record<string, string> = {
            'pendente': '⏳',
            'preparando': '🍳',
            'enviado': '🛵',
            'concluido': '✅',
            'cancelado': '❌',
        };
        toast(`Pedido ${status}`, { icon: icons[status] || '📦' });
    }
};
