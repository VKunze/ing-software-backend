var manejoProductos = require("../services/manejoProductos.service.js");

exports.obtenerProductos = async (req, res) => {
    const productos = await manejoProductos.getProductos();
    console.log(productos);
    if (productos != "error") {
        res.status(200).send(productos);
    } else {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}