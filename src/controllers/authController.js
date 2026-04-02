const { register, login } = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        await register(name, email, password, role_id);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }   

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};