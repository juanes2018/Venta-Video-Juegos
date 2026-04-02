const { Router} = require('express');
const stockReservationController = require('../controllers/stockReservationController')
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.post('/', authenticateToken, role([2,3]), stockReservationController.createStockReservation);
router.get('/', authenticateToken, stockReservationController.getAllStockReservations);
router.get('/:id', authenticateToken,stockReservationController.getStockReservationById);
router.put('/:id', authenticateToken, role([2,3]), stockReservationController.updateStockReservation);
router.delete('/:id', authenticateToken, role ([2,3]), stockReservationController.deleteStockReservation);

module.exports = router;
