const cartService = require('../services/cartService');

exports.createCart = async(req, res) => {
   try{

    const cart = await cartService.createCart(req.body);
   res.status(201).json(cart);

   }catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error Creando el carrito', error})
   }

};

exports.getAllCarts = async(req, res) => {
    try{
        const carts = await cartService.getAllCarts();
        res.status(200).json(carts);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Error obteniendo los carritos', 
        error: error.message})

    }
};

exports.getCartById = async (req,res) => {
    try {
        const cart = await cartService.getCartById(req.params.id);

        if(!cart){
            return res.status(404).json({
                message: 'Carrito no encontrado'
            });
        }

        res.status(200).json(cart);


    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error obteniendo el carrito',
            error: error.message
        });

    }
};