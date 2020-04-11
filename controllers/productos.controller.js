var manejoProductos = require("../services/manejoProductos.service.js");

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await manejoProductos.getProductos();
        res.status(200).send({
            success: true,
            productos: productos
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
        });
    }
}