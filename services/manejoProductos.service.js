const db = require("../db/index.js");
const Producto = db.producto;
const Op = db.Sequelize.Op;

exports.getProductos = () => {
    return Producto.findAll({attributes: ['nombre', 'descripcionCorta', 'imagen']})
    .then(data => {
        return data;
    }).catch(err => {
        throw err;
    });
}

exports.getProductDetails = (nombreProducto) => {
    return Producto.findAll({ where: { nombre : nombreProducto }, attributes: ['nombre', 'descripcion', 'imagen']})
    .then(data => {
        console.log("data:" + data + "..");
        return data;
    }).catch(err => {
        throw err;
    });
}
