module.exports = (sequelize, Sequelize) => {
    const Estado = sequelize.define("estado", {
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return Estado;
  };