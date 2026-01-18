
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Storage } from '../logic/storage';
import { Product, Order, OrderStatus } from '../types';
import { generateId } from '../logic/utils';
import { generateWhatsAppLink } from '../logic/whatsapp';

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quantity = parseInt(searchParams.get('qty') || '1');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [orderCreated, setOrderCreated] = useState<Order | null>(null);

  useEffect(() => {
    const allProducts = Storage.getProducts();
    const found = allProducts.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) return null;

  const total = product.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new order
    const newOrder: Order = {
      id: generateId(),
      customerName: name,
      customerWhatsApp: whatsapp,
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      total: total,
      status: OrderStatus.EN_ESPERA,
      createdAt: new Date().toISOString()
    };

    // Update stock
    const products = Storage.getProducts();
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return { ...p, stock: p.stock - quantity };
      }
      return p;
    });

    // Save
    const orders = Storage.getOrders();
    Storage.saveOrders([newOrder, ...orders]);
    Storage.saveProducts(updatedProducts);

    setOrderCreated(newOrder);
  };

  const handleFinish = () => {
    if (!orderCreated) return;
    const settings = Storage.getSettings();
    const link = generateWhatsAppLink(orderCreated, settings.whatsappNumber);
    window.open(link, '_blank');
    navigate(`/tracking/${orderCreated.id}`);
  };

  if (orderCreated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
          <h2 className="text-2xl font-bold mb-2">¡Pedido Generado!</h2>
          <p className="text-gray-500 mb-8">Orden #{orderCreated.id}</p>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Escanea para pagar (Bs {total})</p>
            {/* Placeholder for QR - In a real app we'd load assets/qr.png */}
            <div className="aspect-square bg-white border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PagoDemoBolivia" alt="QR Pago" className="w-full h-full p-4" />
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.095-.549c.945.515 1.937.919 3.194.919 3.181 0 5.767-2.586 5.768-5.766.001-3.187-2.575-5.773-5.769-5.773zm4.591 8.234c-.166.467-.943.852-1.311.905-.35.05-.722.078-2.044-.447-1.691-.669-2.735-2.383-2.819-2.495-.084-.112-.694-.925-.694-1.763s.432-1.25.586-1.411c.154-.161.334-.202.446-.202.112 0 .223.002.32.011.108.01.253-.041.395.3.143.35.489 1.191.531 1.275.042.084.07.182.014.294-.056.112-.084.182-.168.28-.084.098-.177.218-.253.292-.084.084-.171.174-.074.341.098.167.433.715.93 1.157.64.57 1.179.746 1.347.83.167.084.266.07.364-.042.098-.112.419-.489.531-.656.112-.167.223-.14.377-.084.154.056.977.461 1.145.545.167.084.28.126.321.196.041.07.041.405-.125.871zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1z"/></svg>
            Enviar Comprobante
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 fade-in">
      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Tus Datos</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ej: Juan Perez"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input 
                  required
                  type="tel" 
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  placeholder="Ej: 59170000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Generar Orden y Ver QR
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Resumen</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Cantidad: {quantity}</p>
                </div>
                <p className="font-bold text-indigo-600">Bs {product.price}</p>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>Bs {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
