const {Router} = require('express');
const productController = require('../controllers/productController');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.get('/', authenticaToken, role([2,3]), productController.getAllProducts);
router.get('/:id', authenticaToken, role([2,3]), productController.getProductById);
router.post('/', authenticaToken, role([3]), productController.createProduct);
router.put('/:id', authenticaToken, role([3]), productController.updateProduct);
router.delete('/:id', authenticaToken, role([3]), productController.deleteProduct);

module.exports = router;