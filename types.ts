
export enum OrderStatus {
  EN_ESPERA = 'en_espera',
  ACEPTADO = 'aceptado',
  EN_CAMINO = 'en_camino',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado'
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerWhatsApp: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Settings {
  storeName: string;
  adminPassword: string;
  whatsappNumber: string;
  currency: string;
}
