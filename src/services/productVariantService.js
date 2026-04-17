const db = require('../config/db');

exports.getAllProductVariants = async () => {
  const [rows] = await db.query('SELECT * FROM product_variants');
  return rows;

  /*   const result = await db.query('SELECT * FROM product_variants');
    return result.rows; */
};

exports.getProductVariantById = async (id) => {
  const [rows] = await db.query('SELECT * FROM product_variants WHERE id = ?', [
    id,
  ]);

  if (rows.length === 0) {
    throw new Error('Variante de Producto no encontrada');
  }

  return rows[0];
};

exports.createProductVariant = async (data) => {
  const {
    product_id,
    platform_id,
    region,
    format,
    language,
    edition,
    compatibility,
    price,
  } = data;
  console.log('DATA RECEIVED:', data);
  const [result] = await db.execute(
    `INSERT INTO product_variants 
        (product_id, platform_id, region, format, language, edition, compatibility, price, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      product_id ?? null,
      platform_id ?? null,
      region ?? null,
      format ?? null,
      language ?? null,
      edition ?? null,
      JSON.stringify(compatibility) ?? null, // porque es JSON
      price ?? null,
    ]
  );

  return { id: result.insertId, ...data };
};

exports.updateProductVariant = async (id, variantData) => {
  const {
    product_id,
    platform_id,
    region,
    format,
    language,
    edition,
    compatibility,
    price,
  } = variantData;

  const query = `
        UPDATE product_variants
        SET
            product_id = ?,
            platform_id = ?,
            region = ?,
            format = ?,
            language = ?,
            edition = ?,
            compatibility = ?,
            price = ?,
            updated_at = NOW()
        WHERE id = ?
    `;

  const [result] = await db.execute(query, [
    product_id,
    platform_id,
    region,
    format,
    language,
    edition,
    JSON.stringify(compatibility),
    price,
    id,
  ]);

  if (result.affectedRows === 0) {
    throw new Error('Variante de producto no encontrada');
  }

  return { id, ...variantData };
};

exports.deleteProductVariant = async (id) => {
  // verificar si existe
  const [rows] = await db.query('SELECT * FROM product_variants WHERE id = ?', [
    id,
  ]);

  if (rows.length === 0) {
    return null;
  }

  // eliminar
  await db.query('DELETE FROM product_variants WHERE id = ?', [id]);

  return rows[0]; // opcional: devolver el eliminado
};
