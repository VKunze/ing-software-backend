module.exports = (sequelize, Sequelize) => {
  const Debug = sequelize.define("debug", {
    log: {
      type: Sequelize.STRING,
    },
  });
  return Debug;
};
