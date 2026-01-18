
import { Order } from '../types';

export const generateWhatsAppLink = (order: Order, whatsappNumber: string) => {
  const trackingLink = `${window.location.origin}/#/tracking/${order.id}`;
  const message = `Hola, mi pedido es el #${order.id}
Producto: ${order.productName}
Cantidad: ${order.quantity}
Total: Bs ${order.total}
Link de seguimiento: ${trackingLink}
Enseguida mando mi ubicación.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};
