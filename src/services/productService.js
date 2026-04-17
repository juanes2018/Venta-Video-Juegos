const db = require('../config/db');

exports.getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

exports.getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0] || null; // devuelve un solo producto o null
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // reemplaza espacios y caracteres especiales con "-"
    .replace(/^-+|-+$/g, ''); // elimina guiones al inicio y final
}

exports.createProduct = async (productData) => {
  const {
    title,
    description,
    franchise,
    developer,
    publisher,
    release_year,
    price,
    stock,
    series,
  } = productData;

  const slug = generateSlug(title);

  const sql = `
        INSERT INTO products
        (title, description, franchise, developer, publisher, release_year, price, stock, series, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.query(sql, [
    title,
    description,
    franchise,
    developer,
    publisher,
    release_year,
    price,
    stock,
    series,
    slug,
  ]);

  return { id: result.insertId, ...productData, slug };
};

exports.updateProduct = async (id, productData) => {
  const {
    title,
    description,
    franchise,
    developer,
    publisher,
    release_year,
    price,
    stock,
    series,
  } = productData;

  // Generar slug si title se actualiza
  const slug = title
    ? title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    : undefined;

  const fields = [];
  const values = [];

  // Solo agregamos los campos que vienen en productData
  if (title) {
    fields.push('title = ?');
    values.push(title);
  }
  if (description) {
    fields.push('description = ?');
    values.push(description);
  }
  if (franchise) {
    fields.push('franchise = ?');
    values.push(franchise);
  }
  if (developer) {
    fields.push('developer = ?');
    values.push(developer);
  }
  if (publisher) {
    fields.push('publisher = ?');
    values.push(publisher);
  }
  if (release_year) {
    fields.push('release_year = ?');
    values.push(release_year);
  }
  if (price !== undefined) {
    fields.push('price = ?');
    values.push(price);
  }
  if (stock !== undefined) {
    fields.push('stock = ?');
    values.push(stock);
  }
  if (series) {
    fields.push('series = ?');
    values.push(series);
  }
  if (slug) {
    fields.push('slug = ?');
    values.push(slug);
  }

  if (fields.length === 0) return null; // nada que actualizar

  const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  const [result] = await db.query(sql, values);

  if (result.affectedRows === 0) return null; // producto no existe

  return { id, ...productData, slug };
};

exports.deleteProduct = async (id) => {
  if (!id) throw new Error('ID del producto no proporcionado');

  const sql = 'DELETE FROM products WHERE id = ?';
  const [result] = await db.query(sql, [id]);

  if (result.affectedRows === 0) return null; // producto no existe
  return true; // producto eliminado
};
