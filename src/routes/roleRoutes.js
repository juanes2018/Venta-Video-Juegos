const { Router } = require('express');
const roleController = require('../controllers/roleController');
const authenticateToken = require('../middlewares/auth');
const role = require('../middlewares/role');
const router = Router();




router.post('/', authenticateToken, role(['admin']), roleController.createRole);
router.get('/', authenticateToken, role(['admin']), roleController.getRoles);
router.get('/:id', authenticateToken, roleController.getRoleById);
router.put('/:id', authenticateToken, roleController.updateRole);
router.delete('/:id', authenticateToken, roleController.deleteRole);

module.exports = router;