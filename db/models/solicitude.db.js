module.exports = (sequelize, Sequelize) => {
    const Solicitude = sequelize.define("solicitude", {
        /*          producto: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'producto',
                        key: 'id'
                    }
                },  */
        dateRequested: {
            type: Sequelize.STRING
        },
        /*         estadoAprobacion: {
                    type: Sequelize.STRING,
                    references: {
                        model: 'estados',
                        key: 'nombre'
                    }
                }, */
        personFirstName: {
            type: Sequelize.STRING
        },
        personLastName: {
            type: Sequelize.STRING
        },
        personCedula: {
            type: Sequelize.STRING
        },
        personAddress: {
            type: Sequelize.STRING
        },
        personSalary: {
            type: Sequelize.STRING
        },
        personDeliveryAddress: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        }
    });

    return Solicitude;
};