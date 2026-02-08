export interface Prato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export interface ItemCarrinho extends Prato {
  quantidade: number;
}

export interface Pedido {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  data: string;
  status: 'pendente' | 'concluido';
}
