const db = require('../config/db');

exports.getAllProductMedia = async () => {
  const [rows] = await db.query('SELECT * FROM product_media');
  return rows;

  /*   const result = await db.query('SELECT * FROM product_variants');
    return result.rows; */
};

exports.getProductMediaById = async (id) => {
  const [rows] = await db.query('SELECT * FROM product_media WHERE id = ?', [
    id,
  ]);

  if (rows.length === 0) {
    throw new Error('Producto no encontrado');
  }

  return rows[0];
};

exports.createProductMedia = async (data) => {
  const { product_id, media_url, media_type, caption } = data;
  console.log('DATA RECEIVED:', data);
  const [result] = await db.execute(
    `INSERT INTO product_media 
        (product_id, media_url, media_type, caption, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [product_id ?? null, media_url ?? null, media_type ?? null, caption ?? null]
  );

  return { id: result.insertId, ...data };
};

exports.updateProductMedia = async (id, MediaData) => {
  const product_id = MediaData.product_id ?? null;
  const media_url = MediaData.media_url ?? null;
  const media_type = MediaData.media_type ?? null;
  const caption = MediaData.caption ?? null;

  if (media_type && !['image', 'video'].includes(media_type)) {
    throw new Error("media_type debe ser 'image' o 'video'");
  }

  const query = `
        UPDATE product_media
        SET
            product_id = COALESCE(?, product_id),
            media_url = COALESCE(?, media_url),
            media_type = COALESCE(?, media_type),
            caption = COALESCE(?, caption),
            updated_at = NOW()
        WHERE id = ?
    `;

  const [result] = await db.execute(query, [
    product_id,
    media_url,
    media_type,
    caption,
    id,
  ]);

  if (result.affectedRows === 0) {
    throw new Error('producto no encontrado');
  }

  return { id, ...MediaData };
};

exports.deleteProductMedia = async (id) => {
  // verificar si existe
  const [rows] = await db.query('SELECT * FROM product_media WHERE id = ?', [
    id,
  ]);

  if (rows.length === 0) {
    return null;
  }

  // eliminar
  await db.query('DELETE FROM product_media WHERE id = ?', [id]);

  return rows[0]; // opcional: devolver el eliminado
};
