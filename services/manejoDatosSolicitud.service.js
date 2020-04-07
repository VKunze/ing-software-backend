const db = require("../db/index.js");
const xxx = ""; //db.clienteBanco;
const Op = db.Sequelize.Op;

exports.guardarDatos = (jsonDatos) => {
    var datosSolicitud = JSON.parse(jsonDatos);
    return xxx.create(datosSolicitud).then(data => {
        return data;
    }).catch(err => {
        return "error";
    });
}
