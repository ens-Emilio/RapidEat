import { useState, useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';
import { useDeliveryStore } from '../stores/deliveryStore';
import {
    User, Phone, MapPin, Building, Save, CheckCircle, Package,
    Heart, Star, Camera, ChevronRight, Ticket, Settings,
    Lock, ExternalLink, Trash2, Plus
} from 'lucide-react';
import { CUPONS_VALIDOS } from '../utils/cupons';

type TabType = 'perfil' | 'cupons' | 'enderecos' | 'configuracoes';

export const Perfil = () => {
    const { profile, updateProfile } = useUserStore();
    const { pedidos, favoritos, isDarkMode, toggleTheme } = useDeliveryStore();
    const [formData, setFormData] = useState(profile);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('perfil');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const stats = useMemo(() => ([
        { label: 'Pedidos', value: pedidos.length, icon: Package, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
        { label: 'Favoritos', value: favoritos.length, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/30' },
        { label: 'Nível', value: 'Gourmet', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    ]), [pedidos.length, favoritos.length]);

    const menuItems = [
        { id: 'perfil', label: 'Informações Pessoais', icon: User },
        { id: 'cupons', label: 'Cupons Disponíveis', icon: Ticket },
        { id: 'enderecos', label: 'Histórico de Endereços', icon: MapPin },
        { id: 'configuracoes', label: 'Configurações', icon: Settings },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'perfil':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10">
                            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Informações Pessoais</h1>
                            <p className="text-slate-500 dark:text-slate-400">Mantenha seus dados atualizados para uma entrega mais rápida</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                                        Nome Completo
                                    </label>
                                    <div className="relative flex items-center group">
                                        <User className="absolute left-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-4 pl-14 pr-6 text-slate-800 dark:text-slate-100 font-bold outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            placeholder="Como devemos te chamar?"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                                        Telefone de Contato
                                    </label>
                                    <div className="relative flex items-center group">
                                        <Phone className="absolute left-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <input
                                            type="tel"
                                            value={formData.telefone}
                                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-4 pl-14 pr-6 text-slate-800 dark:text-slate-100 font-bold outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                                        Endereço Principal
                                    </label>
                                    <div className="relative flex items-center group">
                                        <MapPin className="absolute left-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={formData.endereco}
                                            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-4 pl-14 pr-6 text-slate-800 dark:text-slate-100 font-bold outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            placeholder="Rua, Número, Bairro"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                                        Cidade / Complemento
                                    </label>
                                    <div className="relative flex items-center group">
                                        <Building className="absolute left-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={formData.cidade}
                                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-4 pl-14 pr-6 text-slate-800 dark:text-slate-100 font-bold outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            placeholder="Sua cidade"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 overflow-hidden relative group ${saved
                                        ? 'bg-green-500 text-white shadow-green-500/30'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0'
                                        }`}
                                >
                                    {saved ? (
                                        <>
                                            <CheckCircle size={24} className="animate-in zoom-in duration-300" />
                                            Alterações Salvas!
                                        </>
                                    ) : (
                                        <>
                                            <Save size={24} />
                                            Salvar Perfil
                                            <ChevronRight size={20} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'cupons':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10">
                            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Cupons Disponíveis</h1>
                            <p className="text-slate-500 dark:text-slate-400">Economize nos seus próximos pedidos com estes códigos</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(CUPONS_VALIDOS).map(([code, info]) => (
                                <div key={code} className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border-2 border-dashed border-orange-500/20 flex flex-col items-center text-center group hover:border-orange-500/40 transition-colors">
                                    <div className="bg-orange-500 text-white p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                        <Ticket size={24} />
                                    </div>
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{info.descricao}</span>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">{code}</h3>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigator.clipboard.writeText(code);
                                            alert('Cupom copiado!');
                                        }}
                                        className="text-orange-500 font-bold text-sm hover:underline flex items-center gap-1"
                                    >
                                        Copiar Código <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'enderecos':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Seus Endereços</h1>
                                <p className="text-slate-500 dark:text-slate-400">Gerencie seus locais de entrega frequentes</p>
                            </div>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all hover:-translate-y-1">
                                <Plus size={20} /> Novo Endereço
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-orange-500/20 flex items-center gap-4 group">
                                <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/30">
                                    <MapPin size={28} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-black text-slate-800 dark:text-slate-100">Principal</h3>
                                        <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-[10px] uppercase font-black px-2 py-0.5 rounded-full">Padrão</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profile.endereco || 'Endereço não informado'}, {profile.cidade || 'Cidade não informada'}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-3 text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl transition-all">
                                        <Settings size={18} />
                                    </button>
                                    <button className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl p-6 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex items-center gap-4 transition-all opacity-60">
                                <div className="bg-slate-200 dark:bg-slate-700 text-slate-400 p-4 rounded-2xl">
                                    <Building size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-1">Trabalho</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Cadastre seu endereço corporativo</p>
                                </div>
                                <button className="text-slate-400 font-bold text-xs uppercase hover:text-orange-500">Adicionar</button>
                            </div>
                        </div>
                    </div>
                );

            case 'configuracoes':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-10">
                            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Configurações</h1>
                            <p className="text-slate-500 dark:text-slate-400">Personalize sua experiência no RapidEat</p>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                                <h3 className="font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                                    <Settings size={20} className="text-orange-500" /> Preferências do App
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-2">
                                        <div>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">Modo Escuro</p>
                                            <p className="text-xs text-slate-500">Visual confortável para ambientes escuros</p>
                                        </div>
                                        <button
                                            onClick={toggleTheme}
                                            className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <div className="h-px bg-slate-200 dark:bg-slate-700" />
                                    <div className="flex items-center justify-between p-2">
                                        <div>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">Notificações Push</p>
                                            <p className="text-xs text-slate-500">Avisos sobre o status do seu pedido</p>
                                        </div>
                                        <button className="w-14 h-8 rounded-full relative bg-green-500">
                                            <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                                <h3 className="font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                                    <Lock size={20} className="text-orange-500" /> Segurança
                                </h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                                        Alterar Senha <ExternalLink size={16} />
                                    </button>
                                    <button className="w-full text-left p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-colors font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                                        Gerenciar Dispositivos <ExternalLink size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar / Profile Summary */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />

                            <div className="relative flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-1 shadow-lg shadow-orange-500/20">
                                        <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900">
                                            <User size={64} className="text-slate-300 dark:text-slate-600" />
                                        </div>
                                    </div>
                                    <button className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-orange-500 hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
                                    {profile.nome || 'Seu Nome'}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
                                    Membro desde 2026
                                </p>

                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl mb-2`}>
                                                <stat.icon size={20} />
                                            </div>
                                            <span className="text-lg font-black text-slate-800 dark:text-slate-100">{stat.value}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links / Tabs */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none">
                            <div className="space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id as TabType)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive
                                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'} />
                                                <span className="font-bold">{item.label}</span>
                                            </div>
                                            <ChevronRight size={18} className={isActive ? 'text-white/70' : 'text-slate-300 group-hover:text-orange-500 transition-colors'} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Tab Views */}
                    <div className="lg:flex-1">
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            {renderTabContent()}
                        </div>

                        {/* Dynamic Tip Section based on Tab */}
                        <div className="mt-8 p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-start gap-4">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm">
                                {activeTab === 'cupons' ? <Ticket className="text-green-500" size={24} /> : <Star className="text-amber-500" size={24} />}
                            </div>
                            <div>
                                <h4 className="font-black text-indigo-900 dark:text-indigo-300 mb-1">
                                    {activeTab === 'cupons' ? 'Dica de Economia' : 'Dica Gourmet'}
                                </h4>
                                <p className="text-sm text-indigo-700/70 dark:text-indigo-300/60 leading-relaxed font-medium">
                                    {activeTab === 'perfil' && 'Mantenha seu endereço sempre atualizado. Isso nos ajuda a sugerir os melhores restaurantes próximos!'}
                                    {activeTab === 'cupons' && 'Fique de olho nas nossas redes sociais para cupons exclusivos de fim de semana!'}
                                    {activeTab === 'enderecos' && 'Você pode adicionar vários endereços para facilitar pedidos no trabalho ou na casa de amigos.'}
                                    {activeTab === 'configuracoes' && 'Ative as notificações para saber exatamente quando seu pedido saiu para entrega.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
