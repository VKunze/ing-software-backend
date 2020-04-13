var manejoDatosSolicitud = require("../services/manejoDatosSolicitud.service.js");

exports.generarSolicitud = async (req, res) => {
    try {
        const solicitudJson = req.body.solicitud;
        if (!solicitudJson) {
            res.status(400).send({
                success: false,
                code: 'BAD_REQUEST',
                message: 'Ingrese una solicitud'
            });
        }
        var datosSolicitud = "";
        try {
            datosSolicitud = JSON.parse(solicitudJson);
        } catch (err) {
            res.status(400).send({
                success: false,
                code: 'BAD_REQUEST',
                message: 'La solicitud ingresada debe estar en formato JSON'
            });
        }
        const respuesta = await manejoDatosSolicitud.guardarDatos(datosSolicitud);
        res.status(200).send({
            success: true
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
        });
    }
}

exports.compararFotos = async (req, res) => {
    try {
        const fotoCedula = req.body.fotoCedula;
        const fotoSelfie = req.body.fotoSelfie;
        if (!fotoCedula || !fotoSelfie) {
            res.status(400).send({
                success: false,
                code: 'BAD_REQUEST',
                message: 'Ingrese una foto de la cedula y una selfie'
            });
        }
        const respuesta = await manejoDatosSolicitud.compararFotos(fotoCedula, fotoSelfie);
        res.status(200).send({
            success: true
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
        });
    }
}