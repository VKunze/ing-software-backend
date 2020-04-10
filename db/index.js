const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.funcionarioBanco = require("./funcionarioBanco.db.js")(sequelize, Sequelize);
db.estado = require("./estados.db.js")(sequelize, Sequelize);
db.producto = require("./producto.db.js")(sequelize, Sequelize);
db.solicitud = require("./solicitud.db.js")(sequelize, Sequelize);

// Relationships between tables
db.producto.hasMany(db.solicitud);
db.solicitud.belongsTo(db.producto);

db.estado.hasMany(db.solicitud);
db.solicitud.belongsTo(db.estado);

module.exports = db;