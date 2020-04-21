const db = require("../db/index.js");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.getProducts = () => {
    return Product.findAll({attributes: ['name', 'descripcionCorta', 'imagen']})
    .then(data => {
        return data;
    }).catch(err => {
        throw err;
    });
}

exports.getProductDetails = (nameProduct) => {
    return Product.findAll({ where: { name : nameProduct }, attributes: ['name', 'descripcion', 'imagen']})
    .then(data => {
        console.log("data:" + data + "..");
        return data;
    }).catch(err => {
        throw err;
    });
}
