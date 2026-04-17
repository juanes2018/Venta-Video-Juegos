const { Router } = require('express');
const locationController = require('../controllers/locationController');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.get(
  '/',
  authenticateToken,
  role([3]),
  locationController.getAllLocations
);
router.get('/:id', locationController.getLocationById);
router.post(
  '/',
  authenticateToken,
  role([3]),
  locationController.createLocation
);
router.put(
  '/:id',
  authenticateToken,
  role([3]),
  locationController.updateLocation
);
router.delete(
  '/:id',
  authenticateToken,
  role([3]),
  locationController.deleteLocation
);

module.exports = router;
