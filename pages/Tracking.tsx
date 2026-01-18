
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Storage } from '../logic/storage';
import { Order, OrderStatus } from '../types';
import { formatDate } from '../logic/utils';

const Tracking: React.FC = () => {
  const { id: urlId } = useParams<{ id: string }>();
  const [searchId, setSearchId] = useState(urlId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  const fetchOrder = (id: string) => {
    const orders = Storage.getOrders();
    const found = orders.find(o => o.id.toUpperCase() === id.toUpperCase());
    if (found) {
      setOrder(found);
      setError(false);
    } else {
      setOrder(null);
      setError(true);
    }
  };

  useEffect(() => {
    if (urlId) fetchOrder(urlId);
  }, [urlId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchId);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.EN_ESPERA: return 'bg-yellow-100 text-yellow-700';
      case OrderStatus.ACEPTADO: return 'bg-blue-100 text-blue-700';
      case OrderStatus.EN_CAMINO: return 'bg-purple-100 text-purple-700';
      case OrderStatus.ENTREGADO: return 'bg-green-100 text-green-700';
      case OrderStatus.CANCELADO: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">Rastrea tu Pedido</h1>
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input 
          type="text" 
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          placeholder="Ingresa tu ID de pedido (ej: X1Y2Z3)"
          className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
        />
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700">
          Buscar
        </button>
      </form>

      {order && (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm slide-up">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Estado Actual</p>
              <span className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-right text-sm text-gray-400">
              #{order.id}<br />
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold mb-4 text-gray-900">Resumen del Pedido</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Producto</span>
                <span className="font-medium">{order.productName}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Cantidad</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2 font-bold text-gray-900">
                <span>Total</span>
                <span>Bs {order.total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="relative h-20 w-full flex items-center px-4 overflow-hidden">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2"></div>
                  <div className={`absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 transition-all duration-1000`} style={{
                    width: order.status === OrderStatus.ENTREGADO ? '100%' : 
                           order.status === OrderStatus.EN_CAMINO ? '75%' : 
                           order.status === OrderStatus.ACEPTADO ? '50%' : '25%'
                  }}></div>
                  <div className="relative z-10 w-full flex justify-between">
                     <div className="w-3 h-3 rounded-full bg-indigo-500 border-4 border-indigo-200"></div>
                     <div className={`w-3 h-3 rounded-full ${[OrderStatus.ACEPTADO, OrderStatus.EN_CAMINO, OrderStatus.ENTREGADO].includes(order.status) ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                     <div className={`w-3 h-3 rounded-full ${[OrderStatus.EN_CAMINO, OrderStatus.ENTREGADO].includes(order.status) ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                     <div className={`w-3 h-3 rounded-full ${order.status === OrderStatus.ENTREGADO ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                  </div>
               </div>
               <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
                  <span>Pendiente</span>
                  <span>Aceptado</span>
                  <span>En Camino</span>
                  <span>Entregado</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-12 bg-red-50 rounded-3xl border border-red-100">
          <p className="text-red-500 font-medium">No se encontró ningún pedido con ese ID.</p>
        </div>
      )}
    </div>
  );
};

export default Tracking;
