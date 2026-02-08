export type UserRole = 'cliente' | 'empresa';
export type StatusPedido = 'pendente' | 'preparando' | 'enviado' | 'concluido' | 'cancelado';

export interface Prato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  favorito?: boolean;
}

export interface ItemCarrinho {
  prato: Prato;
  quantidade: number;
}

export interface Pedido {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  data: string;
  status: StatusPedido;
  cupom?: string;
}
