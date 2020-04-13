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

exports.getProductDetails = async (req, res) => {
    try {
        const nombre = req.body.productName;
        if (!nombre) {
            res.status(400).send({
                success: false,
                code: 'BAD_REQUEST',
                message: 'Ingrese el nombre de un producto'
            });
        }
        const detalles = await manejoProductos.getProductDetails(nombre);
        if (detalles == "") {
            res.status(400).send({
                success: false,
                code: 'INVALID_CREDENTIALS',
                message: 'Nombre de producto incorrecto'
            });
        }
        res.status(200).send({
            success: true,
            productos: detalles
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
        });
    }
}