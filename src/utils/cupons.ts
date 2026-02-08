// Tipos de cupons disponíveis
export interface Cupom {
    desconto: number;
    tipo: 'percentual' | 'frete';
    descricao: string;
}

// Cupons válidos do sistema
export const CUPONS_VALIDOS: Record<string, Cupom> = {
    'RAPID10': {
        desconto: 10,
        tipo: 'percentual',
        descricao: '10% de desconto no pedido'
    },
    'EMILIO20': {
        desconto: 20,
        tipo: 'percentual',
        descricao: '20% de desconto no pedido'
    },
    'FRETEGRATIS': {
        desconto: 0,
        tipo: 'frete',
        descricao: 'Frete grátis'
    },
    'BEMVINDO': {
        desconto: 15,
        tipo: 'percentual',
        descricao: '15% de desconto para novos clientes'
    }
};

// Calcula o desconto baseado no cupom
export const calcularDesconto = (
    subtotal: number,
    frete: number,
    cupomCodigo: string | null
): number => {
    if (!cupomCodigo) return 0;

    const cupom = CUPONS_VALIDOS[cupomCodigo];
    if (!cupom) return 0;

    if (cupom.tipo === 'percentual') {
        return (subtotal * cupom.desconto) / 100;
    } else if (cupom.tipo === 'frete') {
        return frete;
    }

    return 0;
};

// Valida se um cupom existe
export const validarCupom = (codigo: string): boolean => {
    return codigo.toUpperCase() in CUPONS_VALIDOS;
};

// Retorna mensagem de sucesso do cupom
export const getMensagemCupom = (codigo: string): string => {
    const cupom = CUPONS_VALIDOS[codigo];
    if (!cupom) return '';

    return cupom.tipo === 'frete'
        ? 'Frete grátis aplicado!'
        : `${cupom.desconto}% de desconto aplicado!`;
};
