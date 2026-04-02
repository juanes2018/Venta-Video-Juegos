const db = require('../config/db')

exports.createStockReservation = async ( { inventory_item_id, user_id, durationMinutes}) => {

    const expiresAt = new Date(Date.now() + durationMinutes * 60000);
       const [result] = await db.query(
        `INSERT INTO stock_reservations 
        (inventory_item_id, user_id, expires_at, status)
        VALUES (?, ?, ?, 'active')`,
        [inventory_item_id, user_id, expiresAt]
       );
       
         return {
        id: result.insertId,
        inventory_item_id,
        user_id,
        expires_at: expiresAt,
        status: 'active'
    };
};

exports.getAllStockReservations = async (req, res ) => {
    const [rows] = await db.query('select * from stock_reservations');
    return rows;
};

exports.getStockReservationById = async (id) => {
    const [rows] = await db.query('select * from stock_reservations where id = ?', [id]);

    if (rows.length === 0) return null;
    return rows[0];

};

exports.updateStockReservation = async( { id, durationMinutes, status }) => {
    const updates = [];
    const params = [];

    if ( durationMinutes != null) {
        const expiresAt = new Date(Date.now() + durationMinutes * 60000);
        const formattedExpiresAt = expiresAt.toISOString().slice(0, 19).replace('T', ' ');
        updates.push('expires_at = ?');
        params.push(formattedExpiresAt);
    }

    if (status) {
        updates.push('status = ?'),
        params.push(status)
    }

    if (updates.length === 0) throw new Error('No hay campos para actualizar');

    params.push(id);

    const [result] = await db.query(
        `UPDATE stock_reservations SET ${updates.join(', ')} WHERE id = ?`,
        params
    );
     if (result.affectedRows === 0) return null;

    const updated = await exports.getStockReservationById(id);
    return updated;

};

exports.deleteStockReservation = async( id ) => {
    const [result] = await db.query('delete from stock_reservations where id =?', [id]);
    return result.affectedRows > 0;
}