//const Solicitud = require("./solicitud.db.js");

module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      descripcionCorta: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.BLOB('long')
      },
      sueldoMinimo: {
        type: Sequelize.INTEGER
      }
    });
    return Producto;
  };