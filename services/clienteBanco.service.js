const db = require("../db/index.js");
const ClienteBanco = db.clienteBanco;
const Op = db.Sequelize.Op;

/* // Create and Save a new Tutorial
exports.create = (req, res) => {

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

}; */

// Find a single usuario and contraseña
exports.findOne = (usuario, contraseña) => {
    ClienteBanco.findAll({ where: { usuario: usuario, contraseña: contraseña } })
        .then(data => {
            return "success";
        })
        .catch(err => {
            return "Error retrieving usuario";
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