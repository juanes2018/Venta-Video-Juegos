const { Router } = require('express');
const stockMovementController = require('../controllers/stockMovementController');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();


router.post('/', authenticateToken, role([2,3]), stockMovementController.createStockMovement);
router.get('/', authenticateToken, role([2,3]), stockMovementController.getAllStockMovements);
router.get('/:id', authenticateToken, role([2,3]), stockMovementController.getStockMovementById);
/* router.put
router.delete */

module.exports = router;


