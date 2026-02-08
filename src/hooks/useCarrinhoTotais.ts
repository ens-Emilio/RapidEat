import { useMemo } from 'react';
import { useDeliveryStore } from '../stores/deliveryStore';
import { calcularDesconto } from '../utils/cupons';

/**
 * Hook para calcular totais do carrinho com cupom aplicado
 */
export const useCarrinhoTotais = () => {
    const carrinho = useDeliveryStore((state) => state.carrinho);
    const cupomAtivo = useDeliveryStore((state) => state.cupomAtivo);

    const totais = useMemo(() => {
        const subtotal = carrinho.reduce(
            (sum, item) => sum + item.prato.preco * item.quantidade,
            0
        );

        const frete = 10; // Frete fixo
        const desconto = calcularDesconto(subtotal, frete, cupomAtivo);
        const total = Math.max(0, subtotal + frete - desconto);

        return {
            subtotal,
            frete,
            desconto,
            total,
            quantidadeItens: carrinho.reduce((sum, item) => sum + item.quantidade, 0),
        };
    }, [carrinho, cupomAtivo]);

    return totais;
};
