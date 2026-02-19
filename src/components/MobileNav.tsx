import { Home, ShoppingBag, User, Package, LayoutDashboard, Utensils } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDeliveryStore } from '../stores/deliveryStore';

export const MobileNav = () => {
    const location = useLocation();
    const viewMode = useDeliveryStore(s => s.viewMode);
    const carrinho = useDeliveryStore(s => s.carrinho);
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    const isActive = (path: string) => location.pathname === path;

    const navItems = viewMode === 'cliente' ? [
        { label: 'Início', icon: Home, path: '/' },
        { label: 'Pedidos', icon: Package, path: '/pedidos' },
        { label: 'Carrinho', icon: ShoppingBag, path: '/carrinho', badge: totalItens },
        { label: 'Perfil', icon: User, path: '/perfil' },
    ] : [
        { label: 'Painel', icon: LayoutDashboard, path: '/admin' },
        { label: 'Pedidos', icon: Package, path: '/admin/pedidos' },
        { label: 'Cardápio', icon: Utensils, path: '/admin/produtos' },
        { label: 'Perfil', icon: User, path: '/perfil' },
    ];

    const activeColor = viewMode === 'cliente' ? 'text-orange-500' : 'text-indigo-500';
    const activeBg = viewMode === 'cliente' ? 'bg-orange-50 dark:bg-orange-950/20' : 'bg-indigo-50 dark:bg-indigo-950/20';

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center justify-center gap-1 w-full h-full relative group transition-all ${isActive(item.path)
                                ? `${activeColor}`
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                            }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive(item.path) ? activeBg : 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50'}`}>
                            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive(item.path) ? 'opacity-100' : 'opacity-60'}`}>
                            {item.label}
                        </span>

                        {item.badge !== undefined && item.badge > 0 && (
                            <span className="absolute top-2 right-1/2 translate-x-4 bg-orange-500 text-white text-[9px] font-black min-w-[16px] h-[16px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                                {item.badge}
                            </span>
                        )}

                        {isActive(item.path) && (
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full ${viewMode === 'cliente' ? 'bg-orange-500' : 'bg-indigo-500'} animate-in slide-in-from-top duration-300`} />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
