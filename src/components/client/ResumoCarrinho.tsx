import { useCarrinhoTotais } from '../../hooks/useCarrinhoTotais';
import { useDeliveryStore } from '../../stores/deliveryStore';

interface ResumoCarrinhoProps {
    showCupomInfo?: boolean;
}

export const ResumoCarrinho = ({ showCupomInfo = true }: ResumoCarrinhoProps) => {
    const { subtotal, frete, desconto, total } = useCarrinhoTotais();
    const cupomAtivo = useDeliveryStore((state) => state.cupomAtivo);

    return (
        <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
            </div>

            {/* Frete */}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="font-medium">Taxa de Entrega</span>
                <span className="font-bold">
                    {cupomAtivo === 'FRETEGRATIS' ? (
                        <span className="text-green-600 dark:text-green-400 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            Grátis
                        </span>
                    ) : (
                        `R$ ${frete.toFixed(2).replace('.', ',')}`
                    )}
                </span>
            </div>

            {/* Desconto */}
            {desconto > 0 && (
                <div className="flex justify-between items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-3 rounded-2xl border border-green-100 dark:border-green-900/30 animate-in zoom-in duration-300">
                    <span className="text-sm font-bold flex items-center gap-1">
                        Desconto {showCupomInfo && cupomAtivo && <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-md uppercase">{cupomAtivo}</span>}
                    </span>
                    <span className="font-black">
                        - R$ {desconto.toFixed(2).replace('.', ',')}
                    </span>
                </div>
            )}

            {/* Divider */}
            <div className="border-t-2 border-dashed border-slate-100 dark:border-slate-800 pt-6 mt-6">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                        Total
                    </span>
                    <div className="text-right">
                        <span className="text-3xl font-black text-orange-600 dark:text-orange-400 block">
                            R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">IPI e taxas inclusas</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
