module.exports = (sequelize, Sequelize) => {
    const ClienteBanco = sequelize.define("cliente-banco", {
      usuario: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      }
    });
  
    return ClienteBanco;
  };