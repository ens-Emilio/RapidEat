import { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Tag, DollarSign, X } from 'lucide-react';
import { useDeliveryStore } from '../../stores/deliveryStore';
import type { Prato } from '../../types';

export const CrudPratos = () => {
    const pratos = useDeliveryStore(s => s.pratos);
    const addPrato = useDeliveryStore(s => s.addPrato);
    const updatePrato = useDeliveryStore(s => s.updatePrato);
    const deletePrato = useDeliveryStore(s => s.deletePrato);

    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState<Prato | null>(null);

    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        preco: '',
        imagem: '',
        categoria: ''
    });

    const abrirModal = (prato?: Prato) => {
        if (prato) {
            setEditando(prato);
            setForm({
                nome: prato.nome,
                descricao: prato.descricao,
                preco: prato.preco.toString(),
                imagem: prato.imagem,
                categoria: prato.categoria
            });
        } else {
            setEditando(null);
            setForm({ nome: '', descricao: '', preco: '', imagem: '', categoria: '' });
        }
        setModalAberto(true);
    };

    const salvar = (e: React.FormEvent) => {
        e.preventDefault();
        const dados = {
            ...form,
            preco: parseFloat(form.preco) || 0
        };

        if (editando) {
            updatePrato(editando.id, dados);
        } else {
            // Gerar ID único para novo prato
            const novoPrato: Prato = {
                id: `prato-${Date.now()}`,
                ...dados
            };
            addPrato(novoPrato);
        }
        setModalAberto(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Cardápio</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie seus pratos e preços</p>
                </div>
                <button
                    onClick={() => abrirModal()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                >
                    <Plus size={20} />
                    Novo Prato
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pratos.map((prato) => (
                    <div key={prato.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex h-32">
                            <img src={prato.imagem} alt={prato.nome} className="w-32 h-full object-cover" />
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{prato.nome}</h3>
                                    <p className="text-xs text-orange-600 font-bold">{prato.categoria}</p>
                                </div>
                                <p className="font-black text-slate-900 dark:text-slate-100">R$ {prato.preco.toFixed(2)}</p>
                            </div>
                            <div className="p-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => abrirModal(prato)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => deletePrato(prato.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
                            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                                {editando ? 'Editar Prato' : 'Adicionar Prato'}
                            </h2>
                            <button onClick={() => setModalAberto(false)} className="text-slate-400 hover:text-slate-600 transition">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={salvar} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome do Prato</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-100"
                                        value={form.nome}
                                        onChange={e => setForm({ ...form, nome: e.target.value })}
                                        placeholder="Ex: Pizza Calabresa Especial"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-100"
                                            value={form.preco}
                                            onChange={e => setForm({ ...form, preco: e.target.value })}
                                            placeholder="29,90"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                                    <input
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-100"
                                        value={form.categoria}
                                        onChange={e => setForm({ ...form, categoria: e.target.value })}
                                        placeholder="Pizzas, Burger..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">URL da Imagem</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-100"
                                        value={form.imagem}
                                        onChange={e => setForm({ ...form, imagem: e.target.value })}
                                        placeholder="https://images.unsplash..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-100 h-24 resize-none"
                                    value={form.descricao}
                                    onChange={e => setForm({ ...form, descricao: e.target.value })}
                                    placeholder="Descreva os ingredientes e detalhes do prato..."
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalAberto(false)}
                                    className="flex-1 px-6 py-3 rounded-2xl font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
