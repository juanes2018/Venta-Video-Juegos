# Venta de Videojuegos Retro - API REST Backend

Proyecto backend desarrollado con **Node.js** y **Express** para una plataforma de venta de videojuegos retro online.  
El proyecto está pensado para desarrollarse por etapas, permitiendo que el equipo de frontend avance de manera paralela.

---

## Tecnologías y Dependencias

- Node.js LTS
- Express.js
- MySQL
- npm (gestor de paquetes)
- dotenv (variables de entorno)
- ESLint (linter)
- Prettier (formatter)
- Swagger / swagger-ui-express (documentación API)

---

## Estándares de la API

- Base URL: `/api/v1`
- Formato JSON para requests y responses
- Convenciones REST:
  - `GET` → lectura
  - `POST` → creación
  - `PUT/PATCH` → actualización
  - `DELETE` → eliminación
- Respuestas consistentes con **envelope**:

````json
{
  "success": true,
  "data": {...},
  "message": "Descripción"
}


---

## 🟢 Roles y Permisos

| Rol             | Permisos principales |
|-----------------|--------------------|
| 👀 Visitante       | Navegar catálogo, buscar, ver detalles, carrito anónimo |
| 👤 Cliente         | Perfil, direcciones, carrito, pedidos, wishlist, reseñas |
| 🛠️ Admin / Operador| CRUD productos, inventario, pedidos, clientes, reportes |

---

## 🎮 Catálogo de Productos

### 📦 Producto Base
- Título, descripción, franquicia
- Desarrollador, publisher, año
- Género(s), clasificación (ESRB/PEGI)
- Plataformas compatibles
- SEO: slug, tags

### 🧩 Variante / Edición
- Plataforma, región, idioma
- Edición (standard, limited, etc.)
- Estado: new, used, refurbished
- Compleción: loose, CIB, sin manual

---

## 📦 Inventario

- 🆔 InventoryItem (unidad única)
- 📊 Estados: disponible, reservado, vendido
- ⏳ StockReservation (reservas temporales)
- 🔄 StockMovement (auditoría de movimientos)

---

## 💰 Precios

- Precio base por variante
- Precio por unidad
- Historial de cambios (auditoría)

---

## 🔍 Búsqueda y Navegación

- Categorías: juegos, consolas, accesorios
- Filtros: plataforma, región, condición, precio
- Orden: relevancia, precio, más vendidos

---

## 🛒 Carrito y Checkout

### 🛒 Carrito
- Anónimo o autenticado
- Items con snapshot de precio

### 💳 Checkout
- Dirección de envío
- Método de envío
- Pago (Stripe, PayPal, MercadoPago)
- Validaciones de stock y cupones

---

## 📦 Pedidos y Pagos: pending → authorized → paid → failed → refunded → chargebac


### 💳 Estados de pago: pending → authorized → paid → failed → refunded → chargebac


### 📦 Estados del pedido: created → paid → picking → shipped → delivered → cancelled


---

## 👤 Clientes

- Perfil y preferencias
- Direcciones múltiples
- Wishlist ❤️
- Reseñas ⭐

---

## ⚙️ Instalación

```bash
git clone https://github.com/juanes2018/Venta-Video-Juegos.git
cd Venta-Video-Juegos
npm install
npm start

📍 API disponible en: http://localhost:3000/api/v1


👨‍💻 Autor:
 Juan Moncada

GitHub: https://github.com/juanes2018
LinkedIn: https://www.linkedin.com/in/juan-carlos-moncada-omaña-2b671a347

📄 Licencia: MIT License










````
