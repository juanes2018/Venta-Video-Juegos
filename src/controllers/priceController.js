const priceService = require('../services/priceService');

exports.createPrice = async( req, res) => {
    try{
         console.log(req.body); 
        const data = await priceService.createPrice(req.body);

        res.status(201).json({
            message: 'Precio creado correctamente',
            data
        });

    }catch (error) {
        res.status(500).json({
            message: 'Error creando precio',
            error: error.message
        });
    }
};

exports.getAllPrices = async ( req, res ) => {
    try{
        const data = await priceService.getAllPrices();
        res.status(200).json({
            message: 'Precios obtenidos correctamente',
            data
        });
    }catch(error){
        console.error('Error en getAllPrices:', error)
        res.status(500).json({
            message: 'Error obteniendo precios',
            error: error.message
        });

    }
};

exports.getPrice = async(req, res) => {
    try{
        const price = await priceService.getPrice(req.params.id);

        if(!price){
            return res.status(404).json({
                message: 'Precio no encontrado'
            });
        }
        res.status(200).json(price);

    }catch(error){
        console.error('Error en getPrice:', error);
        res.status(500).json({
            message: 'Error obteniendo precio',
            error: error.message
        });

    }
};


exports.updatePrice = async (req, res) => {
    try {
        const { id } = req.params; // 👈 inventory_item_id
        const { price } = req.body;

        const result = await priceService.updatePrice(id, price);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Precio no encontrado'
            });
        }

        res.json({
            message: 'Precio actualizado correctamente'
        });

    } catch (error) {
        console.error('Error en updatePrice:', error);
        res.status(500).json({
            message: 'Error actualizando precio',
            error: error.message
        });
    }
};

 
exports.deletePrice = async (req, res) => {
    try{
        const {id} = req.params;

        const result = await priceService.deletePrice(id);

        if (result.affectedRows === 0) {
            res.status(404).json({
                message: 'Precio no encontrado'
            });
        }
        res.json({
            message: 'Precio eliminado correctamente'
        });


    }catch(error){
        console.error('Error en deletePrice:', error);
        res.status(500).json({
            message: 'Error eliminando precio',
            error: error.message
        });


    }
};
