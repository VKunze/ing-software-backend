module.exports = (sequelize, Sequelize) => {
    const BankWorker = sequelize.define("bank-worker", {
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