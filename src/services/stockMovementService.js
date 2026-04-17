const db = require('../config/db');

exports.createStockMovement = async ({
  inventory_item_id,
  from_location_id,
  to_location_id,
  type,
  quantity,
  notes,
}) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insertar movimiento
    const [result] = await connection.query(
      `INSERT INTO stock_movements 
            (inventory_item_id, from_location_id, to_location_id, type, quantity, notes)
            VALUES (?, ?, ?, ?, ?, ?)`,
      [
        inventory_item_id,
        from_location_id || null,
        to_location_id || null,
        type,
        quantity,
        notes || null,
      ]
    );

    // Ajustar stock según tipo
    switch (type) {
      case 'sale':
        // Marcamos como vendido
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['sold', inventory_item_id, from_location_id]
        );
        break;
      case 'purchase':
        // Marcamos como disponible
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['available', inventory_item_id, to_location_id]
        );
        break;
      case 'transfer':
        // Actualizamos la ubicación del item
        await connection.query(
          'UPDATE inventory_items SET location_id = ? WHERE id = ? AND location_id = ?',
          [to_location_id, inventory_item_id, from_location_id]
        );
        break;
      case 'return':
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['available', inventory_item_id, to_location_id || from_location_id]
        );
        break;
      case 'damage':
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['damaged', inventory_item_id, to_location_id || from_location_id]
        );
        break;
      case 'loss':
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['lost', inventory_item_id, to_location_id || from_location_id]
        );
        break;
      case 'adjustment':
        // Dependiendo de la regla, podrías usar 'available' o un estado específico
        await connection.query(
          'UPDATE inventory_items SET inventory_status = ? WHERE id = ? AND location_id = ?',
          ['available', inventory_item_id, to_location_id || from_location_id]
        );
        break;
    }

    //await connection.commit();

    // Devolver movimiento creado
    const [rows] = await connection.query(
      'SELECT * FROM stock_movements WHERE id = ?',
      [result.insertId]
    );

    return rows[0];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getAllStockMovements = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM stock_movements');
    return rows;
  } catch (error) {
    throw error; // ✅ solo lanza el error
  }
};

exports.getStockMovementById = async (id) => {
  const [rows] = await db.query('SELECT * FROM stock_movements WHERE id = ?', [
    id,
  ]);
  return rows.length ? rows[0] : null;
};
