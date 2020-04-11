const db = require("../db/index.js");
const FuncionarioBanco = db.funcionarioBanco;
const Op = db.Sequelize.Op;

// Find a single usuario and contraseña
exports.findOne = (usuario, contraseña) => {
    return FuncionarioBanco.findOne({ where: { usuario: usuario, contraseña:contraseña } })
        .then(data => {
            return data
        })
        .catch(err => {
            throw err;
        });
};