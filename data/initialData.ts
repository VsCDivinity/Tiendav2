
import { Product, Category, Order, Settings, OrderStatus } from '../types';

export const initialSettings: Settings = {
  storeName: "Tienda Premium Bolivia",
  adminPassword: "admin123",
  whatsappNumber: "59170000000",
  currency: "Bs"
};

export const initialCategories: Category[] = [
  { id: "cat1", name: "Electrónica" },
  { id: "cat2", name: "Hogar" },
  { id: "cat3", name: "Moda" }
];

export const initialProducts: Product[] = [
  {
    id: "prod1",
    name: "Smartphone Galaxy S23",
    description: "Última tecnología con cámara de 50MP y pantalla AMOLED.",
    price: 4500,
    stock: 10,
    categoryId: "cat1",
    imageUrl: "https://picsum.photos/seed/phone/400/400"
  },
  {
    id: "prod2",
    name: "Cafetera Expresso Pro",
    description: "Café de calidad barista en la comodidad de tu casa.",
    price: 1200,
    stock: 5,
    categoryId: "cat2",
    imageUrl: "https://picsum.photos/seed/coffee/400/400"
  },
  {
    id: "prod3",
    name: "Reloj Inteligente Ultra",
    description: "Seguimiento de salud avanzado y notificaciones en tiempo real.",
    price: 850,
    stock: 15,
    categoryId: "cat1",
    imageUrl: "https://picsum.photos/seed/watch/400/400"
  }
];

export const initialOrders: Order[] = [];
