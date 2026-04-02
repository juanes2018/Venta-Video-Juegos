const { Router} = require('express');
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.get('/:id', authenticateToken, role([2,3]), cartController.getCartById);
router.get('/', authenticateToken, role([3]), cartController.getAllCarts);
router.post('/', authenticateToken, role([2,3]), cartController.createCart);
//router.put('/', authenticateToken, role([2,3]), cartController.updateCart);
//router.delete('/', authenticateToken, role([2,3]), cartController.deleteCart);


module.exports = router;