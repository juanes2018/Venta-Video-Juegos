const db = require('../config/db');

exports.getAllPriceHistories = async (inventory_item_id) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM price_history WHERE inventory_item_id = ? ORDER BY changed_at DESC`,
      [inventory_item_id]
    );
    return rows;
  } catch (error) {
    console.error('Error al obtener el historial de precios:', error);
    throw new Error('Error al obtener el historial de precios');
  }
};

exports.createPriceHistory = async (inventory_item_id, new_price) => {
  try {
    // 1️⃣ obtener precio actual
    const [rows] = await db.query(
      'SELECT price FROM price WHERE inventory_item_id = ?',
      [inventory_item_id]
    );

    if (rows.length === 0) {
      throw new Error('Producto no existe');
    }

    const old_price = rows[0].price;

    // 2️⃣ insertar en price_history
    const [result] = await db.query(
      'INSERT INTO price_history (inventory_item_id, old_price, new_price) VALUES (?, ?, ?)',
      [inventory_item_id, old_price, new_price]
    );

    // 3️⃣ actualizar precio actual
    await db.query(
      'UPDATE price SET price = ?, updated_at = NOW() WHERE inventory_item_id = ?',
      [new_price, inventory_item_id]
    );

    return { id: result.insertId, inventory_item_id, old_price, new_price };
  } catch (error) {
    console.error('Error al crear el historial de precios:', error);
    throw error; // <-- se lanza al controller
  }
};
