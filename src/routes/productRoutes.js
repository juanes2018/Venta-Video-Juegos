const { Router } = require('express');
const productController = require('../controllers/productController');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     products:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado
 *         title:
 *           type: string
 *           description: Título del videojuego
 *         description:
 *           type: string
 *           description: Descripción del videojuego
 *         franchise:
 *           type: string
 *           description: Franchise a la que pertenece
 *         price:
 *           type: number
 *           format: decimal
 *         stock:
 *           type: integer
 *           description: Cantidad en stock
 *         slug:
 *           type: string
 *           description: Slug para la URL
 */

/**
 * @swagger
 * tags:
 *   - name: products
 *     description: Gestión de inventario de videojuegos retro
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene la lista completa de videojuegos
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista cargada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       401:
 *         description: No autorizado - Token JWT faltante
 */

router.get(
  '/',
  authenticaToken,
  role([2, 3]),
  productController.getAllProducts
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un Video Juego por su ID
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del videojuego
 *     responses:
 *       200:
 *         description: Videojuego encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Rol insuficiente
 *       404:
 *         description: No encontrado
 */

router.get(
  '/:id',
  authenticaToken,
  role([2, 3]),
  productController.getProductById
);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Crea un Nuevo Video Juego
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/products'
 *     responses:
 *       201:
 *         description: Videojuego creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       400:
 *         description: Error en la validación de los datos
 *       401:
 *         description: No autorizado - Token faltante
 *       403:
 *         description: Prohibido - Solo administradores (Rol 3) pueden crear productos
 */

router.post('/', authenticaToken, role([3]), productController.createProduct);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Actualiza un Video Juego Existente
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del videojuego a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/products'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/products'
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autorizado - Token faltante
 *       403:
 *         description: Prohibido - Solo administradores (Rol 3)
 *       404:
 *         description: No se encontró el videojuego con ese ID
 */

router.put('/:id', authenticaToken, role([3]), productController.updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Elimina un Video Juego del Inventario
 *     tags:
 *       - products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del videojuego a eliminar
 *     responses:
 *       200:
 *         description: Videojuego eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Producto eliminado correctamente"
 *       401:
 *         description: No autorizado - Token faltante o inválido
 *       403:
 *         description: Prohibido - Solo administradores (Rol 3) pueden eliminar
 *       404:
 *         description: No se encontró el videojuego con ese ID
 */

router.delete(
  '/:id',
  authenticaToken,
  role([3]),
  productController.deleteProduct
);

module.exports = router;
