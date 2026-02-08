import { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';
import { User, Phone, MapPin, Building, Save, CheckCircle } from 'lucide-react';

export const Perfil = () => {
    const { profile, updateProfile } = useUserStore();
    const [formData, setFormData] = useState(profile);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8">Meu Perfil</h1>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                            <User size={16} /> Nome Completo
                        </label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-slate-100"
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                            <Phone size={16} /> Telefone
                        </label>
                        <input
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-slate-100"
                            placeholder="(00) 00000-0000"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                <MapPin size={16} /> Endereço
                            </label>
                            <input
                                type="text"
                                value={formData.endereco}
                                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-slate-100"
                                placeholder="Rua, Número, Bairro"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                <Building size={16} /> Cidade
                            </label>
                            <input
                                type="text"
                                value={formData.cidade}
                                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-slate-100"
                                placeholder="Sua cidade"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${saved
                                ? 'bg-green-500 text-white shadow-green-500/30'
                                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30'
                            }`}
                    >
                        {saved ? (
                            <>
                                <CheckCircle size={20} /> Perfil Salvo!
                            </>
                        ) : (
                            <>
                                <Save size={20} /> Salvar Alterações
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Dica:</strong> Salvar seu endereço ajuda a calcular o frete e o tempo de entrega com mais precisão.
                </p>
            </div>
        </div>
    );
};
