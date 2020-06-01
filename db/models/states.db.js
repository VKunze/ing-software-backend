module.exports = (sequelize, Sequelize) => {
  const State = sequelize.define("State", {
    name: {
      type: Sequelize.STRING
    }
  });

  return State;
};