import { ShoppingCart, Sun, Moon, User, Store } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDeliveryStore } from '../stores/deliveryStore';
import { RapidEatLogo } from './RapidEatLogo';

export const Header = () => {
    const carrinho = useDeliveryStore(s => s.carrinho);
    const isDarkMode = useDeliveryStore(s => s.isDarkMode);
    const toggleTheme = useDeliveryStore(s => s.toggleTheme);
    const viewMode = useDeliveryStore(s => s.viewMode);
    const setViewMode = useDeliveryStore(s => s.setViewMode);

    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full glass-morphism shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="group">
                    <RapidEatLogo
                        size="sm"
                        variant={viewMode}
                        showText={true}
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {viewMode === 'cliente' ? (
                        <>
                            <Link
                                to="/"
                                className={`font-medium transition ${isActive('/') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}
                            >
                                Cardápio
                            </Link>
                            <Link
                                to="/pedidos"
                                className={`font-medium transition ${isActive('/pedidos') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}
                            >
                                Meus Pedidos
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/admin"
                                className={`font-medium transition ${isActive('/admin') ? 'text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500'}`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/pedidos"
                                className={`font-medium transition ${isActive('/admin/pedidos') ? 'text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500'}`}
                            >
                                Pedidos
                            </Link>
                            <Link
                                to="/admin/produtos"
                                className={`font-medium transition ${isActive('/admin/produtos') ? 'text-indigo-500' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500'}`}
                            >
                                Cardápio
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'cliente' ? 'empresa' : 'cliente')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black transition-all border ${viewMode === 'empresa'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/30'
                            : 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/30'
                            }`}
                    >
                        {viewMode === 'empresa' ? <Store size={14} /> : <User size={14} />}
                        <span className="uppercase tracking-widest">{viewMode}</span>
                    </button>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {viewMode === 'cliente' && (
                        <Link
                            to="/carrinho"
                            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition"
                        >
                            <ShoppingCart size={22} />
                            {totalItens > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                                    {totalItens}
                                </span>
                            )}
                        </Link>
                    )}

                    <Link to="/perfil" className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition">
                        <User size={22} />
                    </Link>
                </div>
            </div>
        </header>
    );
};
