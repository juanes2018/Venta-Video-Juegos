const db = require('../config/db');

exports.createCart = async ( data) => {

    // Extraemos los datos que nos interesan
    const { user_id, session_id, status} = data;

    // Insertamos en la tabla
    const [result] = await db.query('INSERT into carts (user_id, session_id, status) VALUES (?, ?, ?)', [user_id || null, session_id || null, status || 'active']);

    // Devolvemos el carrito creado
    return {
        id: result.insertId,
        user_id: user_id || null,
        session_id: session_id || null,
        status: status || 'active'
    };

};


exports.getAllCarts = async () => {
    const [rows] = await db.query('SELECT * FROM carts'); 
    return rows;
}


exports.getCartById = async (id) => {
    const [rows] = await db.query(' SELECT * FROM carts WHERE id = ?', [id]);
    return rows[0];
};