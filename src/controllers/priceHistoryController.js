const priceHistoryService = require('../services/priceHistoryService');

exports.getAllPriceHistories = async (req, res) => {
   try {
        const { inventory_item_id } = req.query;

        if (!inventory_item_id) {
            return res.status(400).json({
                message: 'inventory_item_id es obligatorio'
            });
        }

        const data = await priceHistoryService.getAllPriceHistories(inventory_item_id);

        res.status(200).json({
            message: 'Historial de precios obtenido exitosamente',
            data
        });

    } catch (error) {
        console.error('Error al obtener el historial de precios:', error);
        res.status(500).json({
            message: 'Error al obtener el historial de precios',
            error: error.message
        });
    }
};

exports.createPriceHistory = async (req, res) => {
    try {
        const { inventory_item_id, new_price } = req.body;

        // Validación mínima
        if (!inventory_item_id || new_price == null) {
            return res.status(400).json({ message: 'Faltan datos: inventory_item_id y new_price son requeridos' });
        }

        // Llamada al service: se encargará de obtener old_price automáticamente
        const data = await priceHistoryService.createPriceHistory(inventory_item_id, new_price);

        res.status(201).json({
            message: 'Historial de precios creado exitosamente',
            data
        });

    } catch (error) {
        console.error('Error al crear el historial de precios:', error);
        res.status(500).json({
            message: 'Error al crear el historial de precios',
            error: error.message
        });
    }
};


