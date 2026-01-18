# Sistema E-Commerce Bolivia 🇧🇴

Este es un sistema completo de tienda en línea diseñado para funcionar sin backend (SPA), utilizando **React**, **TypeScript** y **Tailwind CSS**.

## Estructura de Datos

El sistema utiliza archivos JSON puros ubicados en la carpeta `/data`:
- `products.json`: Catálogo de productos.
- `category.json`: Categorías disponibles.
- `order.json`: Historial de pedidos inicial.
- `settings.json`: Configuración general de la tienda.

## Funcionamiento
1. Al cargar por primera vez, el sistema importa los datos de los archivos `.json`.
2. Cualquier cambio realizado desde el panel de administración o al crear una orden nueva se guarda en el **LocalStorage** del navegador para persistencia.
3. El archivo `initialData.ts` ha sido eliminado para simplificar la estructura y usar archivos de datos estándar.

## Administración
Ruta: `/admin`  
Contraseña por defecto: `admin123`