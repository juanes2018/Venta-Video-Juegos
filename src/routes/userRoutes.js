const {Router} = require('express');
const userController = require('../controllers/userController');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();



router.get('/', authenticaToken, role([3]), userController.getUsers);
router.get('/:id', authenticaToken, role([3]), userController.getUserById);
router.put('/:id', authenticaToken, role([3]), userController.updateUser);
router.delete('/:id', authenticaToken, role([3]), userController.deleteUser);

module.exports = router;    