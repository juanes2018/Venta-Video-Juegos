const guestCartService = require('../services/guestCartService');

exports.addProductToGuestCart = async (req, res) => {
  try {
    const { guest_session_id, product_id, quantity } = req.body;
    const result = await guestCartService.addProductToCart(
      guest_session_id,
      product_id,
      quantity
    );
    res.status(200).json({
      message: 'Producto agregado al carrito',

      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGuestCart = async (req, res) => {
  try {
    const { guest_session_id } = req.query;

    if (!guest_session_id) {
      return res.status(400).json({ error: 'guest_session_id es requerido' });
    }
    const cart = await guestCartService.getCart(guest_session_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeProductFromGuestCart = async (req, res) => {
  try {
    const { guest_session_id } = req.query;
    const product_id = req.params.productId;

    if (!guest_session_id) {
      return res.status(400).json({ error: 'guest_session_id es requerido' });
    }

    await guestCartService.removeProductFromCart(guest_session_id, product_id);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductQuantityInGuestCart = async (req, res) => {
  try {
    const { guest_session_id } = req.query;
    const product_id = req.params.productId;
    const { quantity } = req.body;

    if (!guest_session_id) {
      return res.status(400).json({ error: 'guest_session_id es requerido' });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    await guestCartService.updateProductQuantity(
      guest_session_id,
      product_id,
      quantity
    );
    res.status(200).json({
      message: 'Cantidad del producto actualizada en el carrito',
      product_id,
      quantity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
