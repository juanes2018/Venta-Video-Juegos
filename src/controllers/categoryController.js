const categoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las Categories',
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear Categoria', error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: 'Categoria no encontrada',
      });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al obtener categoria',
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!updatedCategory) {
      return res.status(404).json({
        message: 'Categoria no encontrada',
      });
    }
    res.status(200).json({
      message: 'Categoria actualizada correctamente',
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al Actualizar Categoria',
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: 'Categoria no encontrada',
      });
    }
    // ✅ RESPUESTA OK
    res.status(200).json({
      message: 'Categoria eliminada correctamente',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al eliminar Categoria',
      error: error.message,
    });
  }
};
