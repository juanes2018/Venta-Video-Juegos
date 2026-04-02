const { Router } = require('express');
const priceController = require('../controllers/priceController')
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');


const router = Router();

router.post('/', authenticateToken, role([2,3]), priceController.createPrice);
router.get('/', authenticateToken, role([2,3]), priceController.getAllPrices);
router.get('/:id', authenticateToken, role([2,3]), priceController.getPrice);
router.put('/:id', authenticateToken, role([2,3]), priceController.updatePrice);
router.delete('/:id', authenticateToken, role([2,3]), priceController.deletePrice);


module.exports =router;