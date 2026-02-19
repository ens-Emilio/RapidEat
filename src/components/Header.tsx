import { ShoppingCart, Sun, Moon, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDeliveryStore } from '../stores/deliveryStore';
import { RapidEatLogo } from './RapidEatLogo';

export const Header = () => {
    const carrinho = useDeliveryStore(s => s.carrinho);
    const isDarkMode = useDeliveryStore(s => s.isDarkMode);
    const toggleTheme = useDeliveryStore(s => s.toggleTheme);
    const viewMode = useDeliveryStore(s => s.viewMode);

    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full glass-morphism shadow-sm">
            <div className="container mx-auto px-4 md:px-6 h-18 flex items-center justify-between">
                <Link to="/" className="group shrink-0">
                    <RapidEatLogo
                        size="sm"
                        variant={viewMode}
                        showText={true}
                    />
                </Link>

                <nav className="hidden lg:flex items-center gap-10">
                    {viewMode === 'cliente' ? (
                        <>
                            <Link
                                to="/"
                                className={`font-bold text-sm uppercase tracking-wider btn-premium ${isActive('/') ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                            >
                                Cardápio
                            </Link>
                            <Link
                                to="/pedidos"
                                className={`font-bold text-sm uppercase tracking-wider btn-premium ${isActive('/pedidos') ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                            >
                                Meus Pedidos
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/admin"
                                className={`font-bold text-sm uppercase tracking-wider btn-premium ${isActive('/admin') ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/pedidos"
                                className={`font-bold text-sm uppercase tracking-wider btn-premium ${isActive('/admin/pedidos') ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}
                            >
                                Pedidos
                            </Link>
                            <Link
                                to="/admin/produtos"
                                className={`font-bold text-sm uppercase tracking-wider btn-premium ${isActive('/admin/produtos') ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}
                            >
                                Cardápio
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-orange-500 btn-premium rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="hidden sm:flex items-center gap-2">
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

                        {viewMode === 'cliente' && (
                            <Link
                                to="/carrinho"
                                className={`relative p-2.5 btn-premium rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 ${isActive('/carrinho') ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                            >
                                <ShoppingCart size={22} />
                                {totalItens > 0 && (
                                    <span className="absolute top-1.5 right-1.5 bg-orange-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 animate-scale-in">
                                        {totalItens}
                                    </span>
                                )}
                            </Link>
                        )}

                        <Link
                            to="/perfil"
                            className={`p-2.5 transition-all rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 ${isActive('/perfil') ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'}`}
                        >
                            <User size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
