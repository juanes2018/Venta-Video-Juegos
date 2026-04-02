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
```json
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










## Roles y Permisos

| Rol             | Permisos principales |
|-----------------|--------------------|
| Visitante       | Navegar catálogo, buscar, ver detalles, agregar al carrito anónimo |
| Cliente         | Gestionar perfil, direcciones, carrito, wishlist, pedidos, devoluciones, reseñas |
| Admin / Operador| CRUD de productos y variantes, gestión de inventario, precios, pedidos, clientes, reportes, auditoría |

---

## Catálogo de Productos

### Producto Base
- Título, descripción, franquicia, desarrollador, publisher, año, género(s)  
- Clasificación ESRB/PEGI, número de jugadores, modos  
- Plataformas compatibles  
- SEO: slug, tags, keywords  

### Variante / Edición
- Plataforma, región, idioma, edición  
- Condición / estado físico (sealed, new, used, refurbished, graded)  
- Compleción (loose, CIB, sin manual, caja repro)  
- Cada variante puede tener múltiples unidades únicas en inventario  

---

## Inventario
- **InventoryItem:** cada unidad única de un juego retro  
- Estados: disponible, reservado, vendido, devolución, dañado, perdido  
- **StockReservation:** reserva temporal para carrito (ej. 15 min)  
- **StockMovement:** registrar entradas, salidas y ajustes para auditoría  

---

## Precios
- Precio base por variante  
- Precio por unidad (si es usada o coleccionista)  
- Historial de cambios: quién, cuándo y por qué  

---

## Búsqueda y Navegación
- Categorías: juegos, consolas, accesorios, refacciones  
- Filtros: plataforma, región, formato, condición, completitud, precio, año, género, publisher  
- Orden: relevancia, precio, más nuevo, mejor estado, más vendido  
- Página detalle: fotos, descripción, especificaciones, disponibilidad, tiempos de entrega  

---

## Carrito y Checkout

### Carrito
- Carrito anónimo o autenticado  
- Items: referencia a variante o unidad específica  
- Recalcular totales con reglas de promociones e impuestos  

### Checkout
- Dirección de envío  
- Método de envío  
- Pago (Stripe, PayPal, MercadoPago)  
- Confirmación de pedido  
- Validaciones: stock disponible, cupones, dirección válida  

---

## Pagos y Pedidos
- Estados de pago: `pending → authorized → paid → failed → refunded → chargeback`  
- Reembolsos: totales o parciales  
- Pedidos: `created → awaiting_payment → paid → picking → packed → shipped → delivered → cancelled → returned`  
- Envíos: tracking, costo, peso/dimensiones, estado, packing slip  

---

## Clientes
- Perfil: nombre, email, teléfono, preferencias  
- Direcciones: múltiples, etiquetadas  
- Wishlist: productos deseados, alertas de stock  
- Reseñas: rating, comentario, moderación, “compra verificada”  

---

## Etapas del Proyecto

### Etapa 01: Inicialización
- Endpoint inicial: `GET /hello` → devuelve `"Hello World"`  
- Crear repositorio en GitHub y primer commit  

### Etapa 02: Modelado de Base de Datos
- Diseñar modelo de datos en herramienta como **Mongo Modeler**  
- Debe responder preguntas clave:  
  - Qué se vendió, cuándo, a quién y ganancia  
  - Stock por plataforma, región, condición, ubicación  
  - Unidades reservadas y expiración  
  - Historial de precios y promociones  
  - Estado de pedidos y auditoría de cambios  

---

## Instalación

1. Clonar el repositorio:  
```bash
git clone https://github.com/juanes2018/Venta-Video-Juegos.git