const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (name, email, password, role_id = 2) => {
  //const role = 'user'; // Asignar rol por defecto
  if (!email || !password || !name) {
    throw new Error('Todos los campos son obligatorios');
  }

  // Validar password mínimo 6
  if (!password || password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  //Verificar email unico
  const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  if (existingUser.length > 0) {
    throw new Error('El email ya está registrado');
  }

  //Encriptar Contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  //Guardar Usuario
  await db.query(
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role_id]
  );
  return { message: 'Usuario registrado exitosamente' };
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }
  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

  if (user.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { id: user[0].id, role_id: user[0].role_id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};
