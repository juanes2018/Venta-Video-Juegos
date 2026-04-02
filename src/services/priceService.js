const db = require('../config/db')

exports.createPrice = async ( {inventory_item_id, price} ) => {
    const [result] = await db.query(
        'INSERT INTO price ( inventory_item_id, price ) VALUES (?, ?)',
        [inventory_item_id, price]

    );
    return {
        id: result.insertId,
        inventory_item_id,
        price
    };
};

exports.getAllPrices = async () =>{
   
    const[rows] = await db.query('select * from price');
    return rows;
};


 exports.getPrice = async( inventory_item_id ) => {
    const [rows] = await db.query('select * from price where inventory_item_id = ?',
        [inventory_item_id]
    );
    return rows;
 };

 exports.updatePrice = async(inventory_item_id, price) => {
    const [result] = await db.query('UPDATE price SET price = ? WHERE inventory_item_id = ?',
        [price, inventory_item_id]
    );
    return result;
 };

exports.deletePrice = async( id) => {
    const [result] = await db.query('DELETE FROM price WHERE id = ?',
        [id]
    );
    return result;
};