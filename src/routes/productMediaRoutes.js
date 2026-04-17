const { Router } = require('express');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');
const productMediaController = require('../controllers/productMediaController');

const router = Router();

router.get(
  '/',
  authenticateToken,
  role([2, 3]),
  productMediaController.getAllProductMedia
);
router.get(
  '/:id',
  authenticateToken,
  role([2, 3]),
  productMediaController.getProductMediaById
);
router.post(
  '/',
  authenticateToken,
  role([3]),
  productMediaController.createProductMedia
);
router.put(
  '/:id',
  authenticateToken,
  role([3]),
  productMediaController.updateProductMedia
);
router.delete(
  '/:id',
  authenticateToken,
  role([3]),
  productMediaController.deleteProductMedia
);

module.exports = router;
