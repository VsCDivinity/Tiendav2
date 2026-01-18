
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Storage } from '../logic/storage';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const allProducts = Storage.getProducts();
    const found = allProducts.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-500">Producto no encontrado.</p>
        <Link to="/" className="text-indigo-600 mt-4 block">Volver a la tienda</Link>
      </div>
    );
  }

  const handleBuy = () => {
    if (quantity > product.stock) {
      alert("No hay suficiente stock disponible");
      return;
    }
    navigate(`/checkout/${product.id}?qty=${quantity}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 fade-in">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
        ← Volver a la tienda
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden aspect-square">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-indigo-600 mb-6">Bs {product.price}</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <h3 className="text-gray-900 font-semibold mb-2">Descripción</h3>
            <p>{product.description}</p>
          </div>

          <div className="mt-auto">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >-</button>
                  <span className="px-6 py-2 font-medium w-12 text-center border-x border-gray-200">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >+</button>
                </div>
                <span className="text-sm text-gray-500">({product.stock} disponibles)</span>
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={product.stock <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                product.stock > 0 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Comprar Ahora' : 'Agotado'}
            </button>
            
            <p className="mt-4 text-xs text-center text-gray-400">
              Pago seguro contra entrega o transferencia QR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
