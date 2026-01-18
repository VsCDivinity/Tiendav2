
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Storage } from '../logic/storage';
import { Product, Category } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setProducts(Storage.getProducts());
    setCategories(Storage.getCategories());
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Bienvenido</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Explora nuestra colección de productos exclusivos con envío a toda Bolivia.</p>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 slide-up"
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Agotado</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                <span className="text-indigo-600 font-bold">Bs {product.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  Stock: {product.stock}
                </span>
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Ver producto
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 italic">No hay productos en esta categoría por ahora.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
