var manejoDatosSolicitud = require("../services/manejoDatosSolicitud.service.js");

exports.generarSolicitud = async (req, res) => {
    const solicitudJson  = req.query.solicitud;
    //console.log(req);
    //console.log(solicitudJson);
    const solicitudEnviada = await manejoDatosSolicitud.guardarDatos(solicitudJson);
    if (solicitudEnviada) {
        console.log('SOLICITUD ENVIADA:', solicitudEnviada)
        res.status(200).send({message:'Ok'});
    } else {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
}