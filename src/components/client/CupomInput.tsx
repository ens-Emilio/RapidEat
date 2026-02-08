import { useState } from 'react';
import { Ticket, X } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import { CUPONS_VALIDOS } from '../../utils/cupons';

export const CupomInput = () => {
    const [inputCupom, setInputCupom] = useState('');
    const { cupomAtivo, aplicarCupom } = useDeliveryStore((state) => ({
        cupomAtivo: state.cupomAtivo,
        aplicarCupom: state.aplicarCupom,
    }));

    const handleAplicar = () => {
        if (inputCupom.trim()) {
            const sucesso = aplicarCupom(inputCupom.trim());
            if (sucesso) {
                setInputCupom('');
            }
        }
    };

    const handleRemover = () => {
        useDeliveryStore.setState({ cupomAtivo: null });
    };

    return (
        <div className="space-y-3">
            {/* Input de Cupom */}
            {!cupomAtivo && (
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={inputCupom}
                            onChange={(e) => setInputCupom(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleAplicar()}
                            placeholder="Código do cupom"
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleAplicar}
                        disabled={!inputCupom.trim()}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        Aplicar
                    </button>
                </div>
            )}

            {/* Cupom Ativo */}
            {cupomAtivo && (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="font-semibold text-green-700 dark:text-green-300">
                                {cupomAtivo}
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                {CUPONS_VALIDOS[cupomAtivo]?.descricao || 'Cupom aplicado'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleRemover}
                        className="p-1.5 hover:bg-green-100 dark:hover:bg-green-800/50 rounded-full transition-colors"
                        aria-label="Remover cupom"
                    >
                        <X className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </button>
                </div>
            )}

            {/* Lista de Cupons Disponíveis (Hint) */}
            {!cupomAtivo && (
                <details className="text-sm">
                    <summary className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                        Ver cupons disponíveis
                    </summary>
                    <div className="mt-2 space-y-1 pl-4">
                        {Object.entries(CUPONS_VALIDOS).map(([codigo, cupom]) => (
                            <button
                                key={codigo}
                                onClick={() => {
                                    setInputCupom(codigo);
                                    aplicarCupom(codigo);
                                }}
                                className="block w-full text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                                    {codigo}
                                </span>
                                <span className="text-slate-600 dark:text-slate-400 ml-2">
                                    - {cupom.descricao}
                                </span>
                            </button>
                        ))}
                    </div>
                </details>
            )}
        </div>
    );
};
