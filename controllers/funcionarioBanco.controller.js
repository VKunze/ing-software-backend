var funcionarioBancoService = require("../services/funcionarioBanco.service.js");

exports.checkdb = async (req, res) => {
    const usuario = req.body.username;
    const contraseña = req.body.password;

    const userFromDb = await funcionarioBancoService.findOne(usuario, contraseña);
    if (userFromDb) {
        res.status(200).send({message:'Ok'});
    } else {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}