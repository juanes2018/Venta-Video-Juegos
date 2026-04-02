const locationService = require('../services/locationService');

exports.getAllLocations = async (req, res) => {
    try{

        const locations = await locationService.getAllLocations();
        res.json(locations);

    }catch(error){

        res.status(500).json({
            message: 'Error al Obtener el Almacen',
            error: error.message
        });

    }
};

exports.getLocationById = async (req, res) => {
    try{
        const location = await locationService.getLocationById(req.params.id);
        if (!location){
            return res.status(404).json({
                message: 'Ubicacion no encontrada'
            });
        } res.json(location);

    }catch(error) {
        res.status(500).json({
            message: 'Error al obtener Almacen',
            error: error.message
        });

    }
};




exports.createLocation = async (req, res) => {
    try{
        const newLocation = await locationService.createLocation(req.body);
        //res.status(201).json(newLocation)

           res.status(201).json({
            message: 'Location creada correctamente',
            data: newLocation
        });

    }catch (error){
        res.status(400).json({
            message: 'Error al Crear el Almacen',
            error: error.message

        });

    }
};

exports.updateLocation = async (req, res) => {
    try{
        const { name, description } = req.body;
        const updated= await locationService.updateLocation( req.params.id, { name, description } 

        );

        if (!updated) {
            return res.status(404).json({
                message: 'Almacen no encontrado'
            })
        }

        res.json({ message: 'Almacen actualizado correctamente'})


    }catch (error){
        res.status(500).json({
            message: 'Error al actualizar el Almacen',
            error: error.message
        });

    }
};

exports.deleteLocation = async (req, res) =>{
    try{
        const { id } = req.params;

        const deleted = await locationService.deleteLocation(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Almacen no encontrado'
            })
        }
        res.json({ message: 'Almacen eliminado correctamente'})

    }catch(error){
        res.status(500).json({
            message: 'Error al eliminar Almacen',
            error: error.message
        });


    }

};