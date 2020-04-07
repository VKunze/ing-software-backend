var clienteBancoService = require("../services/clienteBanco.service.js");

exports.checkdb = async (req, res) => {
    const usuario = req.body.username;
    const contraseña = req.body.password;

    const userFromDb = await clienteBancoService.findOne(usuario, contraseña);
    if (userFromDb) {
        console.log('USUARIO DE LA DB:', userFromDb.id)
        res.status(200).send({message:'Ok'});
    } else {
        res.status(500).send({
            message: 'Internal server error'
        });
    }

}