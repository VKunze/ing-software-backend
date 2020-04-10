var manejoDatosSolicitud = require("../services/manejoDatosSolicitud.service.js");

exports.generarSolicitud = async (req, res) => {
    const solicitudJson  = req.query.solicitud;
    const solicitudEnviada = await manejoDatosSolicitud.guardarDatos(solicitudJson);
    if (solicitudEnviada != "error") {
        res.status(200).send({message:'Ok'});
    } else {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}