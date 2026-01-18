
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import { Storage } from './logic/storage';

const App: React.FC = () => {
  const settings = Storage.getSettings();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
              {settings.storeName}
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/tracking" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                Mis Pedidos
              </Link>
              <Link 
                to="/admin" 
                className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-800 transition-all uppercase tracking-wider"
              >
                Admin
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/panel" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {settings.storeName} - Bolivia
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
