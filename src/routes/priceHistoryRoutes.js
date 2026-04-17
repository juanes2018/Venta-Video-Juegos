const { Router } = require('express');
const priceHistoryController = require('../controllers/priceHistoryController');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');
const authenticateToken = require('../middlewares/auth');

const router = Router();

router.get(
  '/',
  authenticaToken,
  role([2, 3]),
  priceHistoryController.getAllPriceHistories
);
router.post(
  '/',
  authenticateToken,
  role([2, 3]),
  priceHistoryController.createPriceHistory
);

module.exports = router;
