module.exports = (sequelize, Sequelize) => {
    const Solicitude = sequelize.define("solicitude", {
/*          producto: {
            type: Sequelize.INTEGER,
            references: {
                model: 'producto',
                key: 'id'
            }
        },  */
        fechaSolicitude: {
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

    return Solicitude;
};