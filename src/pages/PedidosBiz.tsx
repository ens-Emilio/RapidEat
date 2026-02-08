import { GestãoPedidos } from '../components/biz/GestaoPedidos';

export const PedidosBiz = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    Gestão de Pedidos
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Gerencie e atualize o status dos pedidos dos clientes
                </p>
            </div>

            <GestãoPedidos />
        </div>
    );
};
