
# Sistema E-Commerce Bolivia 🇧🇴

Este es un sistema completo de tienda en línea diseñado para funcionar sin backend (SPA), utilizando **React**, **TypeScript** y **Tailwind CSS**.

## Estructura del Proyecto

- `/data`: Datos iniciales que simulan los archivos JSON.
- `/logic`: Toda la lógica de negocio (gestión de stock, órdenes, WhatsApp).
- `/pages`: Las diferentes vistas del sistema (Tienda, Producto, Checkout, Tracking, Admin).
- `/components`: Componentes visuales reutilizables.

## Configuración y Personalización

### 1. Nombre de la Tienda y WhatsApp
Puedes cambiar el nombre de la tienda y el número de WhatsApp desde el **Panel Admin** en la pestaña **Ajustes**. Estos se guardan en el archivo virtual `settings.json` (LocalStorage).

### 2. Contraseña del Administrador
La contraseña por defecto es `admin123`. Puedes modificarla en los Ajustes del Panel Admin o editando `data/initialData.ts`.

### 3. Cómo funcionan las Órdenes
Cuando un cliente realiza una compra:
1. Se genera un ID único.
2. Se reduce el stock automáticamente.
3. Se crea una entrada en `orders.json` (virtual).
4. Se muestra un QR de pago.
5. El botón "Enviar comprobante" redirige a WhatsApp con un mensaje pre-formateado.

### 4. Conexión a un Servidor Real
Para escalar este proyecto a producción real:
- Sustituir las funciones de `logic/storage.ts` por llamadas `fetch()` a una API (Node.js, Python, etc).
- Implementar persistencia en base de datos (MongoDB, PostgreSQL).
- Añadir validación de pagos real (pasarelas de pago).

## Uso Local
Simplemente abre el proyecto en un entorno de desarrollo React. Los cambios en productos u órdenes persistirán en tu navegador gracias a `localStorage`.
