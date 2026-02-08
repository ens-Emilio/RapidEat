import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Carrinho } from './pages/Carrinho';
import { Pedidos } from './pages/Pedidos';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </Routes>
        </main>

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
