import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Carrinho } from './pages/Carrinho';
import { Pedidos } from './pages/Pedidos';
import { Perfil } from './pages/Perfil';
import { DashboardBiz } from './pages/DashboardBiz';
import { PedidosBiz } from './pages/PedidosBiz';
import { CrudPratos } from './components/biz/CrudPratos';
import { useDeliveryStore } from './stores/deliveryStore';
import { useMultiTabSync } from './hooks/useMultiTabSync';
import { FloatingModeToggle } from './components/FloatingModeToggle';
import { MobileNav } from './components/MobileNav';

// Componente para gerenciar navegação automática baseada no modo
const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewMode = useDeliveryStore(s => s.viewMode);

  useEffect(() => {
    const isRootAdmin = location.pathname.startsWith('/admin');

    if (viewMode === 'empresa' && !isRootAdmin) {
      // Se trocou para empresa mas não está em uma rota admin
      navigate('/admin');
    } else if (viewMode === 'cliente' && isRootAdmin) {
      // Se trocou para cliente mas está em rota admin
      navigate('/');
    }
  }, [viewMode, navigate, location.pathname]);

  return null;
};

function App() {
  const isDarkMode = useDeliveryStore(s => s.isDarkMode);

  // Sincronização multi-tab
  useMultiTabSync();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <NavigationHandler />
      <Toaster position="bottom-right" reverseOrder={false} />
      <FloatingModeToggle />
      <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-slate-950 pb-16 lg:pb-0">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<DashboardBiz />} />
            <Route path="/admin/pedidos" element={<PedidosBiz />} />
            <Route path="/admin/produtos" element={<CrudPratos />} />
          </Routes>
        </main>
        <MobileNav />

        <footer className="py-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
          <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
            <p className="font-medium mb-1">&copy; 2026 RapidEat Delivery. Todos os direitos reservados.</p>
            <p>Feito com ❤️ para você saborear o melhor.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

