import { Store, User, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDeliveryStore } from '../stores/deliveryStore';

export const FloatingModeToggle = () => {
    const navigate = useNavigate();
    const viewMode = useDeliveryStore(s => s.viewMode);
    const setViewMode = useDeliveryStore(s => s.setViewMode);

    const isCliente = viewMode === 'cliente';

    const handleToggle = () => {
        const nextMode = isCliente ? 'empresa' : 'cliente';
        setViewMode(nextMode);

        // Redireciona para a home do respectivo modo
        if (nextMode === 'empresa') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
            {/* Label Informativa */}
            <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg border animate-in slide-in-from-right duration-500 pointer-events-auto ${isCliente
                ? 'bg-orange-500 text-white border-orange-400'
                : 'bg-indigo-600 text-white border-indigo-400'
                }`}>
                Modo {viewMode}
            </div>

            {/* Botão Flutuante */}
            <button
                onClick={handleToggle}
                className={`group pointer-events-auto relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden ${isCliente
                    ? 'bg-white dark:bg-slate-900 border-2 border-orange-500 text-orange-500'
                    : 'bg-white dark:bg-slate-900 border-2 border-indigo-600 text-indigo-600'
                    }`}
            >
                {/* Background Decorativo */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${isCliente ? 'bg-orange-500' : 'bg-indigo-600'}`} />

                <div className="relative">
                    {isCliente ? (
                        <div className="flex flex-col items-center">
                            <Store size={24} className="animate-in zoom-in duration-300" />
                            <span className="text-[8px] font-bold mt-0.5">Empresa</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <User size={24} className="animate-in zoom-in duration-300" />
                            <span className="text-[8px] font-bold mt-0.5">Cliente</span>
                        </div>
                    )}
                </div>

                {/* Ícone de Troca */}
                <div className="absolute top-1 right-1">
                    <ArrowLeftRight size={10} className="text-slate-400" />
                </div>
            </button>
        </div>
    );
};

