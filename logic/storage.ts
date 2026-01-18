
import { Product, Category, Order, Settings } from '../types';
import { initialProducts, initialCategories, initialOrders, initialSettings } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_products',
  CATEGORIES: 'ecommerce_categories',
  ORDERS: 'ecommerce_orders',
  SETTINGS: 'ecommerce_settings'
};

export const Storage = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : initialProducts;
  },
  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },
  
  getCategories: (): Category[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : initialCategories;
  },
  saveCategories: (categories: Category[]) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : initialOrders;
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getSettings: (): Settings => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : initialSettings;
  },
  saveSettings: (settings: Settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
