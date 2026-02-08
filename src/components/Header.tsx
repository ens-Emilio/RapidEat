import { ShoppingCart, Utensils, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDeliveryStore } from '../stores/useDeliveryStore';

export const Header = () => {
    const carrinho = useDeliveryStore(s => s.carrinho);
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full glass-morphism shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-orange-500 p-2 rounded-lg text-white">
                        <Utensils size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-orange-600 dark:text-orange-400">
                        RapidEat
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
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
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        to="/carrinho"
                        className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition"
                    >
                        <ShoppingCart size={24} />
                        {totalItens > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                                {totalItens}
                            </span>
                        )}
                    </Link>
                    <Link to="/pedidos" className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition">
                        <ClipboardList size={24} />
                    </Link>
                </div>
            </div>
        </header>
    );
};
