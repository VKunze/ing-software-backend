const db = require("../db/index.js");
const FuncionarioBanco = db.funcionarioBanco;
const Op = db.Sequelize.Op;

/* // Create and Save a new Tutorial
exports.create = (req, res) => {

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

}; */

// Find a single usuario and contraseña
exports.findOne = (usuario, contraseña) => {
    return FuncionarioBanco.findOne({ where: { "usuario": usuario, "contraseña": contraseña } })
        .then(data => {
            if (data != null) {
                return data;
            } else {
                return "error"
            }
        })
        .catch(err => {
            return "error";
        });
};

/* // Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

}; */