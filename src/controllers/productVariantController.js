const productVariantService = require('../services/productVariantService');

exports.getAllProductVariants = async (req, res) => {
  try {
    const productVariants = await productVariantService.getAllProductVariants();
    res.json(productVariants);
  } catch (error) {
    console.error('ERROR PRODUCT VARIANTS:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener variantes de producto', error });
  }
};

exports.getProductVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const productVariant =
      await productVariantService.getProductVariantById(id);

    res.json(productVariant);
  } catch (error) {
    console.error('ERROR DETECTED:', error);
    res
      .status(500)
      .json({ message: 'Error al obtener variante de producto', error });
  }
};

exports.createProductVariant = async (req, res) => {
  try {
    const newProductVariant = await productVariantService.createProductVariant(
      req.body
    );

    res.status(201).json({ newProductVariant });
  } catch (error) {
    console.error('ERROR DETECTED:', error); // Log más claro
    res.status(500).json({
      message: 'Error al crear variante de producto',
      error: error.message || error.toString(), // Esto muestra el mensaje real
    });
  }
};

exports.updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVariant = await productVariantService.updateProductVariant(
      id,
      req.body
    );
    res.status(200).json({
      message: 'Variante de producto actualizada',
      data: updatedVariant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar variante de producto', error });
  }
};

exports.deleteProductVariant = async (req, res) => {
  try {
    const deletedProductVariant =
      await productVariantService.deleteProductVariant(req.params.id);

    if (!deletedProductVariant) {
      return res
        .status(404)
        .json({ message: 'Variante de producto no encontrada' });
    }
    res.json({ message: 'Variante de producto eliminada correctamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar variante de producto', error });
  }
};
