
import { Product, Category, Order, Settings } from '../types';

// Importación de archivos JSON con aserción de tipo para compatibilidad ESM
import productsData from '../data/products.json' with { type: 'json' };
import categoriesData from '../data/category.json' with { type: 'json' };
import ordersData from '../data/order.json' with { type: 'json' };
import settingsData from '../data/settings.json' with { type: 'json' };

const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_products',
  CATEGORIES: 'ecommerce_categories',
  ORDERS: 'ecommerce_orders',
  SETTINGS: 'ecommerce_settings'
};

export const Storage = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : (productsData as unknown as Product[]);
  },
  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  
  getCategories: (): Category[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : (categoriesData as unknown as Category[]);
  },
  saveCategories: (categories: Category[]) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : (ordersData as unknown as Order[]);
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getSettings: (): Settings => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : (settingsData as unknown as Settings);
  },
  saveSettings: (settings: Settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
