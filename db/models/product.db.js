//const Solicitud = require("./solicitud.db.js");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    descriptionShort: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    /*  minimum: {
       type: Sequelize.INTEGER
     } */
  });
  return Product;
};