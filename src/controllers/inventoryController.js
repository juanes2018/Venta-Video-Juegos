const inventoryService = require('../services/inventoryService');

exports.createInventoryItem = async (req, res) => {
    try{
        const newItem = await inventoryService.createInventoryItem(req.body);
        res.status(201).json(newItem);

    } catch(error){
        res.status(400).json({
            message: 'Error al crear inventory item',
            error: error.message
        });

    }
};

exports.getAllInventoryItems = async (req, res) => {
    try{
        const items = await inventoryService.getAllInventoryItems();
        res.json(items)
    } catch (error) {
        res.status(500).json({
            message: ' Error al obtener inventory items',
            error: error.message
        });
    }
};

exports.getInventyItemById = async (req, res) => {
    try{
        const item = await inventoryService.getInventyItemById(req.params.id);

        if(!item) {
            return res.status(404).josn({
                message: 'Inventario item no encontrado'
            });
        }
        res.json(item);


    }catch(error){
        res.status(500).json({
            message: 'Error al obtener inventory item ' ,
            error: error.message
        });

    }
};

exports.updateInventoryItem = async (req,res) => {
    try{
        const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);

        if (!updatedItem) {
            return res.status(404).json({
                message: 'Inventory Item no encontrado'
            });
        }
        res.json(updatedItem);

    }catch(error){
        res.status(404).json({
            message: 'Error al actualizar inventory item',
            error: error.message
        });

    }
};

exports.deleteInventoryItem = async ( req, res) => {
    try{
         const deleted = await inventoryService.deleteInventoryItem(req.params.id);
             if (!deleted) {
            return res.status(404).json({
                message: 'Inventory item no encontrado'
            });
        }

        res.json({
            message: 'Inventory item eliminado correctamente'
        });

    } catch (error) {
       
           res.status(500).json({
            message: 'Error al eliminar inventory item',
            error: error.message
        
        });

    }
}