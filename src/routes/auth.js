const { Router } = require('express');
const { register, login} = require('../controllers/authController');
const authenticateToken = require('../middlewares/auth');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
    res.send('Esto es una ruta protegida, solo accesible con un token válido');
});

module.exports = router;    