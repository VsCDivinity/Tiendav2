
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../logic/storage';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = Storage.getSettings();
    if (password === settings.adminPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/panel');
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Acceso Admin</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-indigo-500 outline-none`}
              placeholder="••••••••"
            />
            {error && <p className="text-red-500 text-xs mt-2">Contraseña incorrecta.</p>}
          </div>
          <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
