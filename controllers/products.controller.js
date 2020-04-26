var manejoProducts = require("../services/products.service.js");

exports.getProducts = async (req, res) => {
    try {
        const products = await manejoProducts.getProducts();
        res.status(200).send({
            success: true,
            products: products
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
        const name = req.body.productName;
        if (!name) {
            res.status(400).send({
                success: false,
                code: 'BAD_REQUEST',
                message: 'Insert the name of a product'
            });
        }
        const detalles = await manejoProducts.getProductDetails(name);
        if (detalles == "") {
            res.status(400).send({
                success: false,
                code: 'INVALID_CREDENTIALS',
                message: 'Incorrect product name'
            });
        }
        res.status(200).send({
            success: true,
            products: detalles
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
        });
    }
}