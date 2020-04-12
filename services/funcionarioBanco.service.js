const db = require("../db/index.js");
const bcrypt = require('bcrypt');
const FuncionarioBanco = db.funcionarioBanco;
const Op = db.Sequelize.Op;

// Find a single usuario and contraseña
exports.findOne = async (usuario, contraseña) => {
    const contraseñaHasheada = await hashContraseña(contraseña);
    return FuncionarioBanco.findOne({ where: { usuario: usuario } })
        .then(data => {
            return bcrypt.compare(data.contraseña, contraseñaHasheada, function (err, res) {
                if (res) {
                    return data;
                } else {
                    return false;
                }
            });
        })
        .catch(err => {
            throw err;
        });
};

exports.create = async (usuario, contraseña) => {
    bcrypt.hash(contraseña, 10, function (err, hash) {
        if (err) {
            throw err;
        }
        FuncionarioBanco.create({ usuario: usuario, contraseña: hash })
            .then(data => {
                return (data);
            })
            .catch(e => {
                throw e;
            });
    });
}

async function hashContraseña(contraseña) {
    const contraseñaHasheada = await new Promise((resolve, reject) => {
        bcrypt.hash(contraseña, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    });
    console.log("in func: " + contraseñaHasheada);
    return contraseñaHasheada
}

