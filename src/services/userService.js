const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.createUser = async (userData) => {
  const { name, password, email, role_id } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (name, password, email, role_id) VALUES (?, ?, ?, ?)',
    [name, hashedPassword, email, role_id || 2]
  );

  return { id: result.insertId, name, email, role_id: role_id || 2 };
};

exports.getUsers = async () => {
  const [rows] = await db.query(`SELECT u.id, u.name, u.email, r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id`);
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email, r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?`,
    [id]
  );
  return rows[0];
};

exports.updateUser = async (id, userData) => {
  if (!userData || Object.keys(userData).length === 0) {
    throw new Error('No se proporcionaron datos para actualizar');
  }
  const { name, password } = userData;

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const query = `
        UPDATE users 
        SET name = COALESCE(?, name),
            password = COALESCE(?, password)
        WHERE id = ?
    `;

  const [result] = await db.query(query, [name, hashedPassword, id]);
  return result.affectedRows > 0 ? { id, name } : null;
};

exports.deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
