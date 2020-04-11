const db = require("../db/index.js");
const Producto = db.producto;
const Op = db.Sequelize.Op;

exports.getProductos = () => {
    return Producto.findAll().then(data => {
        return data;
    }).catch(err => {
        throw err;
    });
}
