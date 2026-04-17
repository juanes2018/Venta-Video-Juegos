const productMediaService = require('../services/productMediaService');

exports.getAllProductMedia = async (req, res) => {
  try {
    const productMedia = await productMediaService.getAllProductMedia();
    res.json(productMedia);
  } catch (error) {
    console.error('ERROR PRODUCT MEDIA:', error);
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

exports.getProductMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const productMedia = await productMediaService.getProductMediaById(id);

    res.json(productMedia);
  } catch (error) {
    console.error('ERROR DETECTED:', error);
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

exports.createProductMedia = async (req, res) => {
  try {
    const newProductMedia = await productMediaService.createProductMedia(
      req.body
    );

    res.status(201).json({ newProductMedia });
  } catch (error) {
    console.error('ERROR DETECTED:', error); // Log más claro
    res.status(500).json({
      message: 'Error al crear el producto',
      error: error.message || error.toString(), // Esto muestra el mensaje real
    });
  }
};

exports.updateProductMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedia = await productMediaService.updateProductMedia(
      id,
      req.body
    );
    res.status(200).json({
      message: 'Media de producto actualizada',
      data: updatedMedia,
    });
  } catch (error) {
    console.error('ERROR UPDATE:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

exports.deleteProductMedia = async (req, res) => {
  try {
    const deletedProductMedia = await productMediaService.deleteProductMedia(
      req.params.id
    );

    if (!deletedProductMedia) {
      return res
        .status(404)
        .json({ message: 'Variante de producto no encontrada' });
    }
    res.json({ message: 'producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};
