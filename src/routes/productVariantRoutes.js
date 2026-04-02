const { Router } = require('express');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');
const productVariantController = require('../controllers/productVariantController');

const router = Router();

router.get('/', authenticaToken, role([2,3]), productVariantController.getAllProductVariants);
router.get('/:id', authenticaToken, role([2,3]), productVariantController.getProductVariantById);
router.post('/', authenticaToken, role([3]), productVariantController.createProductVariant);
router.put('/:id', authenticaToken, role([3]), productVariantController.updateProductVariant);
router.delete('/:id', authenticaToken, role([3]), productVariantController.deleteProductVariant);

module.exports = router;