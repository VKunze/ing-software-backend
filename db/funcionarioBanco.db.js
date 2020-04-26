module.exports = (sequelize, Sequelize) => {
    const FuncionarioBanco = sequelize.define("funcionario-banco", {
      usuario: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      }
    });
  
    return FuncionarioBanco;
  };