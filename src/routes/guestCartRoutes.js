const { Router } = require('express');
const guestCartController = require('../controllers/guestCartController');

const router = Router();

router.post('/guest', guestCartController.addProductToGuestCart);
router.get('/guest', guestCartController.getGuestCart);
router.delete(
  '/guest/:productId',
  guestCartController.removeProductFromGuestCart
);
router.put(
  '/guest/:productId',
  guestCartController.updateProductQuantityInGuestCart
);

module.exports = router;
