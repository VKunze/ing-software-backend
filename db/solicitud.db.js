const Producto = require("./producto.db.js");

module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define("solicitud", {
/*          producto: {
            type: Sequelize.INTEGER,
            references: {
                model: 'producto',
                key: 'id'
            }
        },  */
        fechaSolicitud: {
            type: Sequelize.STRING
        },
/*         estadoAprobacion: {
            type: Sequelize.STRING,
            references: {
                model: 'estados',
                key: 'nombre'
            }
        }, */
        nombrePersona: {
            type: Sequelize.STRING
        },
        apellidoPersona: {
            type: Sequelize.STRING
        },
        cedulaPersona: {
            type: Sequelize.STRING
        },
        direccionPersona: {
            type: Sequelize.STRING
        },
        sueldoPersona: {
            type: Sequelize.STRING
        },
        direccionEntrega: {
            type: Sequelize.STRING
        }
    });

    return Solicitud;
};