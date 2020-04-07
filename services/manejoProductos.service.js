const db = require("../db/index.js");
const xxx = ""; //db.clienteBanco;
const Op = db.Sequelize.Op;

exports.getProductos = () => {
    return xxx.findAll().then(data => {
        return data;
    }).catch(err => {
        return "error";
    });
}
