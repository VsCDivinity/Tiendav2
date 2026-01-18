
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../logic/storage';
import { Product, Category, Order, OrderStatus, Settings } from '../types';
import { generateId, formatDate } from '../logic/utils';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'settings'>('orders');
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<Settings>(Storage.getSettings());

  // Form States (Products)
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
      return;
    }
    refreshData();
  }, [navigate]);

  const refreshData = () => {
    setProducts(Storage.getProducts());
    setCategories(Storage.getCategories());
    setOrders(Storage.getOrders());
    setSettings(Storage.getSettings());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  // --- CRUD Functions ---

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const allProducts = Storage.getProducts();
    if (editingProduct.id) {
      const updated = allProducts.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p);
      Storage.saveProducts(updated);
    } else {
      const newProd = { ...editingProduct, id: generateId() } as Product;
      Storage.saveProducts([newProd, ...allProducts]);
    }
    setEditingProduct(null);
    refreshData();
  };

  const deleteProduct = (id: string) => {
    if (confirm('¿Eliminar producto?')) {
      Storage.saveProducts(products.filter(p => p.id !== id));
      refreshData();
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    Storage.saveOrders(updated);
    refreshData();
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    Storage.saveSettings(settings);
    alert('Ajustes guardados');
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 fade-in">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">A</span>
            Panel de Control
          </h2>
          <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Salir</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 mb-8 overflow-x-auto">
          {(['orders', 'products', 'categories', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab === 'orders' ? 'Órdenes' : tab === 'products' ? 'Productos' : tab === 'categories' ? 'Categorías' : 'Ajustes'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="slide-up">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">ID / Fecha</th>
                    <th className="px-6 py-4">Cliente / WhatsApp</th>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Monto</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map(order => (
                    <tr key={order.id} className="text-sm hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">#{order.id}</span><br />
                        <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-indigo-600">{order.customerWhatsApp}</p>
                      </td>
                      <td className="px-6 py-4">
                        {order.productName} <span className="text-gray-400">x{order.quantity}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">Bs {order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          order.status === OrderStatus.ENTREGADO ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className="text-xs bg-white border border-gray-200 rounded px-2 py-1 outline-none"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        >
                          {Object.values(OrderStatus).map(s => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">No hay órdenes registradas.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Gestión de Inventario</h3>
                <button 
                  onClick={() => setEditingProduct({ name: '', description: '', price: 0, stock: 0, categoryId: categories[0]?.id, imageUrl: 'https://picsum.photos/400/400' })}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                >
                  + Nuevo Producto
                </button>
              </div>

              {editingProduct && (
                <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
                  <div className="bg-white w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
                    <h4 className="text-xl font-bold mb-6">{editingProduct.id ? 'Editar Producto' : 'Crear Producto'}</h4>
                    <form onSubmit={saveProduct} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Nombre</label>
                          <input required className="w-full px-4 py-2 border rounded-xl" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Descripción</label>
                          <textarea className="w-full px-4 py-2 border rounded-xl" rows={3} value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-400 uppercase">Precio (Bs)</label>
                          <input type="number" className="w-full px-4 py-2 border rounded-xl" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-400 uppercase">Stock</label>
                          <input type="number" className="w-full px-4 py-2 border rounded-xl" value={editingProduct.stock} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">URL Imagen</label>
                          <input className="w-full px-4 py-2 border rounded-xl" value={editingProduct.imageUrl} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Categoría</label>
                          <select className="w-full px-4 py-2 border rounded-xl" value={editingProduct.categoryId} onChange={e => setEditingProduct({...editingProduct, categoryId: e.target.value})}>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-100 py-3 rounded-xl font-bold">Cancelar</button>
                        <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">Guardar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
                    <img src={p.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt="" />
                    <div className="flex-grow">
                      <h5 className="font-bold text-sm line-clamp-1">{p.name}</h5>
                      <p className="text-xs text-gray-500">Bs {p.price} | Stock: {p.stock}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => setEditingProduct(p)} className="text-indigo-600 text-xs font-bold p-1">Edit</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 text-xs font-bold p-1">Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-8">Configuración del Sistema</h3>
              <form onSubmit={saveSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nombre de la Tienda</label>
                  <input className="w-full px-4 py-3 rounded-xl border" value={settings.storeName} onChange={e => setSettings({...settings, storeName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">WhatsApp de Recepción (Formato: 591...)</label>
                  <input className="w-full px-4 py-3 rounded-xl border" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contraseña Admin</label>
                  <input className="w-full px-4 py-3 rounded-xl border" type="text" value={settings.adminPassword} onChange={e => setSettings({...settings, adminPassword: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100">
                  Guardar Cambios
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
