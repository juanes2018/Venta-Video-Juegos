const stockMovementService = require('../services/stockMovementService');

exports.createStockMovement = async (req, res) => {
  try {
    const {
      inventory_item_id,
      from_location_id,
      to_location_id,
      type,
      quantity,
      notes,
    } = req.body;

    if (!inventory_item_id || !type || !quantity) {
      return res.status(400).json({
        message: 'inventory_item_id, type y quantity son obligatorios',
      });
    }

    const validTypes = [
      'sale',
      'return',
      'transfer',
      'adjustment',
      'purchase',
      'damage',
      'loss',
    ];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: 'Tipo de movimiento inválido',
      });
    }

    // Validación opcional: quantity > 0
    if (quantity <= 0) {
      return res.status(400).json({
        message: 'Quantity debe ser mayor a 0',
      });
    }

    const movement = await stockMovementService.createStockMovement({
      inventory_item_id,
      from_location_id,
      to_location_id,
      type,
      quantity,
      notes,
    });

    res.status(201).json({
      message: 'Movimiento registrado correctamente',
      data: movement,
    });
  } catch (error) {
    console.error('Error en CreateStockMovement: ', error);
    res.status(500).json({
      message: 'Error registrando movimiento',
      error: error.message,
    });
  }
};

exports.getAllStockMovements = async (req, res) => {
  try {
    const data = await stockMovementService.getAllStockMovements();
    res.status(200).json({
      message: 'Historial obtenido correctamente',
      data,
    });
  } catch (error) {
    console.error('Error en getAllStockMovements:', error);

    res.status(500).json({
      message: 'Error obteniendo historial',
      error: error.message,
    });
  }
};

exports.getStockMovementById = async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await stockMovementService.getStockMovementById(id); // 👈 función específica por ID

    if (!movement) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    res.status(200).json({
      message: 'Movimiento encontrado',
      data: movement,
    });
  } catch (error) {
    console.error('Error en getStockMovementById:', error);
    res.status(500).json({
      message: 'Error obteniendo movimiento',
      error: error.message,
    });
  }
};
