const db = require('../config/db');

exports.createInventoryItem = async (data) => {

    const {
        product_variant,
        status,
        grade,
        grade_criteria,
        completion,
        public_notes,
        internal_notes,
        acquisition_cost,
        price,
        inventory_status,
        location_id
    } = data;

    if (!product_variant || !status || !completion || !acquisition_cost || !price) {
        throw new Error('Faltan campos obligatorios');
    }

    const [result] = await db.execute(
        `INSERT INTO inventory_items (
        product_variant,
        status,
        grade,
        grade_criteria,
        completion,
        public_notes,
        internal_notes,
        acquisition_cost,
        price,
        inventory_status,
        location_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        product_variant,
        status,
        grade ?? null,
        grade_criteria ? JSON.stringify(grade_criteria) : null,
        completion,
        public_notes ?? null,
        internal_notes ?? null,
        acquisition_cost,
        price,
        inventory_status ?? 'available',
        location_id ?? null
    ]);
        return { id: result.insertId, ...data };
};


exports.getAllInventoryItems = async () => {
    const [rows] = await db.execute(`SELECT * FROM inventory_items`);
    return rows;
};

exports.getInventoryItemById = async (id) => {
    const [rows] = await db.execute(`select * from inventory_items where id = ?`,
        [id]
    );
    return rows[0];

};

exports.updateInventoryItem = async (id, data) => {
    const {
         product_variant,
        status,
        grade,
        grade_criteria,
        completion,
        public_notes,
        internal_notes,
        acquisition_cost,
        price,
        inventory_status,
        location_id
    } = data;

    const [result] = await db.execute(`
            UPDATE inventory_items SET
            product_variant = ?,
            status = ?,
            grade = ?,
            grade_criteria = ?,
            completion = ?,
            public_notes = ?,
            internal_notes = ?,
            acquisition_cost = ?,
            price = ?,
            inventory_status = ?,
            location_id = ?
        WHERE id = ?
        `, [
               product_variant,
        status,
        grade,
        grade_criteria ? JSON.stringify(grade_criteria) : null,
        completion,
        public_notes,
        internal_notes,
        acquisition_cost,
        price,
        inventory_status,
        location_id,
        id
        ]);

        if (result.affectedRows === 0) return null;
        return {id, ...data};


};

exports.deleteInventoryItem = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM inventory_items WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}
