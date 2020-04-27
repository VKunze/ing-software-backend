module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("State", {
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return State;
  };