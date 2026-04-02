const {Router} = require ('express');
const categoryController = require('../controllers/categoryController');
const authenticaToken = require('../middlewares/auth');
const role = require('../middlewares/role');

const router = Router();

router.get('/', authenticaToken, categoryController.getAllCategories);
router.get('/:id', authenticaToken, categoryController.getCategoryById);
router.post('/', authenticaToken, role([3]), categoryController.createCategory);
router.put('/:id', authenticaToken, role([3]), categoryController.updateCategory);
router.delete('/:id', authenticaToken, role([3]), categoryController.deleteCategory);

module.exports = router;