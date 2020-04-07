var service = require("../services/clienteBanco.service.js");

exports.checkdb = (req, res) => {
    const usuario = req.params.usuario;
    const contraseña = req.params.contraseña;

    mensaje = service.findOne(usuario, contraseña);
    if (mensaje == "success") {
        res.send(mensaje);
    } else {
        res.status(500).send({
            message: mensaje
        });
    }
}