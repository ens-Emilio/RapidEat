import { useCarrinhoTotais } from '../../hooks/useCarrinhoTotais';
import { useDeliveryStore } from '../../stores/deliveryStore';

interface ResumoCarrinhoProps {
    showCupomInfo?: boolean;
}

export const ResumoCarrinho = ({ showCupomInfo = true }: ResumoCarrinhoProps) => {
    const { subtotal, frete, desconto, total } = useCarrinhoTotais();
    const cupomAtivo = useDeliveryStore((state) => state.cupomAtivo);

    return (
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            {/* Subtotal */}
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Subtotal</span>
                <span className="font-medium">
                    R$ {subtotal.toFixed(2)}
                </span>
            </div>

            {/* Frete */}
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Frete</span>
                <span className="font-medium">
                    {cupomAtivo === 'FRETEGRATIS' ? (
                        <span className="text-green-600 dark:text-green-400 line-through">
                            R$ {frete.toFixed(2)}
                        </span>
                    ) : (
                        `R$ ${frete.toFixed(2)}`
                    )}
                </span>
            </div>

            {/* Desconto */}
            {desconto > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Desconto {showCupomInfo && cupomAtivo && `(${cupomAtivo})`}</span>
                    <span className="font-medium">
                        - R$ {desconto.toFixed(2)}
                    </span>
                </div>
            )}

            {/* Divider */}
            <div className="border-t border-slate-300 dark:border-slate-700 pt-3">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Total
                    </span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        R$ {total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
