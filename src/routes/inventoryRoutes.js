const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.get(
  '/',
  authenticateToken,
  role([2, 3]),
  inventoryController.getAllInventoryItems
);
router.get(
  '/:id',
  authenticateToken,
  role([2, 3]),
  inventoryController.getInventyItemById
);
router.post(
  '/',
  authenticateToken,
  role([3]),
  inventoryController.createInventoryItem
);
router.put(
  '/:id',
  authenticateToken,
  role([3]),
  inventoryController.updateInventoryItem
);
router.delete(
  '/:id',
  authenticateToken,
  role([3]),
  inventoryController.deleteInventoryItem
);

module.exports = router;
