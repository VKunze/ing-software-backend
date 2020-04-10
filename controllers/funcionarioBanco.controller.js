var funcionarioBancoService = require("../services/funcionarioBanco.service.js");

exports.checkdb = async (req, res) => {
    const usuario = req.body.username;
    const contraseña = req.body.password;
    if (usuario == undefined || contraseña == undefined) {
        res.status(500).send({
            message: 'Incorrect data'
        });
    }

    const userFromDb = await funcionarioBancoService.findOne(usuario, contraseña);
    if (userFromDb != "error") {
        res.status(200).send({ message: 'Ok' });
    } else {
        res.status(500).send({
            message: 'Data not found'
        });
    }
}