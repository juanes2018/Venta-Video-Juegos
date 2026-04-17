const db = require('../config/db');

exports.createRole = async (roleData) => {
  const [result] = await db.query('INSERT INTO roles (name) VALUES (?)', [
    roleData.name,
  ]);
  return { id: result.insertId, ...roleData };
};

exports.getRoles = async () => {
  const [rows] = await db.query('SELECT * FROM roles');
  return rows;
};

exports.getRoleById = async (id) => {
  const [rows] = await db.query('SELECT * FROM roles WHERE id = ?', [id]);
  return rows[0];
};

exports.updateRole = async (id, roleData) => {
  const [result] = await db.query('UPDATE roles SET name = ? WHERE id = ?', [
    roleData.name,
    id,
  ]);
  if (result.affectedRows === 0) return null;
  return { id, ...roleData };
};

exports.deleteRole = async (id) => {
  const [result] = await db.query('DELETE FROM roles WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
