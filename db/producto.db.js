//const Solicitud = require("./solicitud.db.js");

module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
      nombre: {
        type: Sequelize.STRING
      },
      sueldoMinimo: {
        type: Sequelize.INTEGER
      }
    });
  
    //Producto.hasMany(Solicitud);
    return Producto;
  };