const db = require('../config/db');

exports.addProductToCart = async (
  guest_session_id,
  product_id,
  quantity = 1
) => {
  // 1️⃣ Validar que el producto exista
  const [product] = await db.query('SELECT id FROM products WHERE id = ?', [
    product_id,
  ]);
  if (!product.length) {
    throw new Error('Producto no encontrado');
  }

  // 2️⃣ Ver si ya existe en el carrito de este invitado
  const [existing] = await db.query(
    'SELECT id, quantity FROM guest_carts WHERE guest_session_id = ? AND product_id = ?',
    [guest_session_id, product_id]
  );

  if (existing.length > 0) {
    // 3️⃣ Si existe, actualizar la cantidad
    const newQuantity = existing[0].quantity + quantity;
    await db.query('UPDATE guest_carts SET quantity = ? WHERE id = ?', [
      newQuantity,
      existing[0].id,
    ]);
    return { product_id, quantity: newQuantity };
  } else {
    // 4️⃣ Si no existe, insertar nuevo registro
    const [result] = await db.query(
      'INSERT INTO guest_carts (guest_session_id, product_id, quantity) VALUES (?, ?, ?)',
      [guest_session_id, product_id, quantity]
    );
    return { product_id, quantity, id: result.insertId };
  }

  /*    
    const [result] = await db.query(
        'INSERT INTO guest_carts (guest_session_id, product_id, quantity) VALUES  (?, ?, ?)',
        [guest_session_id, product_id, quantity]
    );
    return result; */
};

exports.getCart = async (guest_session_id) => {
  const [cartItems] = await db.query(
    'SELECT gc.product_id, gc.quantity, p.title, p.price FROM guest_carts gc JOIN products p ON gc.product_id = p.id WHERE gc.guest_session_id = ?',
    [guest_session_id]
  );
  return cartItems;
};

exports.removeProductFromCart = async (guest_session_id, product_id) => {
  await db.query(
    'DELETE FROM guest_carts WHERE guest_session_id = ? AND product_id = ?',
    [guest_session_id, product_id]
  );
};

exports.updateProductQuantity = async (
  guest_session_id,
  product_id,
  quantity
) => {
  await db.query(
    'UPDATE guest_carts SET quantity = ? WHERE guest_session_id = ? AND product_id = ?',
    [quantity, guest_session_id, product_id]
  );
};
