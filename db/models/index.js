const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bankWorker = require("./bankWorker.db.js")(sequelize, Sequelize);
db.state = require("./states.db.js")(sequelize, Sequelize);
db.product = require("./product.db.js")(sequelize, Sequelize);
db.solicitude = require("./solicitude.db.js")(sequelize, Sequelize);
db.debug = require("./debug.db.js")(sequelize, Sequelize);

// Relationships between tables
db.product.hasMany(db.solicitude);
db.solicitude.belongsTo(db.product);

db.state.hasMany(db.solicitude);
db.solicitude.belongsTo(db.state);

module.exports = db;
