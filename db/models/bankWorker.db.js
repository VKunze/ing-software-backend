module.exports = (sequelize, Sequelize) => {
    const BankWorker = sequelize.define("funcionario-banco", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      }
    });
  
    return BankWorker;
  };