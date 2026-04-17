const db = require('../config/db');

exports.getAllCategories = async () => {
  const [rows] = await db.execute(`SELECT * FROM categories`);
  return rows;
};

exports.createCategory = async ({ name, description }) => {
  const [result] = await db.execute(
    `INSERT INTO categories (name, description) VALUES (?,?) `,
    [name, description ?? null]
  );

  return { id: result.insertId, name, description };
};

exports.getCategoryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

exports.updateCategory = async (id, data) => {
  const { name, description } = data;
  //console.log(data);

  // 🔹 verificar si existe
  const [existing] = await db.query('SELECT * FROM categories WHERE id = ?', [
    id,
  ]);

  if (existing.length === 0) {
    return null;
  }

  await db.query(
    `UPDATE categories
  SET name = ?, description = ?
  WHERE id = ?`,
    [name, description, id]
  );
  return {
    id,
    name,
    description,
  };
};

exports.deleteCategory = async (id) => {
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    return null;
  }
  return true;
};
