const db = require("../db/index.js");
const Solicitud = db.solicitud;
const Producto = db.producto;
const Estado = db.estado;
const Op = db.Sequelize.Op;

exports.guardarDatos = (jsonDatos) => {
    try {
        var datosSolicitud = JSON.parse(jsonDatos);
    } catch (e) {
        throw e;
        return "error";
    }
    var idEstadoAprobacionAsociado = "";
    var idProductoAsociado = "";
    Producto.findOne({ where: { nombre: datosSolicitud.producto } })
        .then(data => {
            idProductoAsociado = data.id;
            Estado.findOne({ where: { nombre: "esperando aprobacion" } })
                .then(data1 => {
                    idEstadoAprobacionAsociado = data1.id;
                    //console.log(idEstadoAprobacionAsociado);
                    //console.log(idProductoAsociado);
                    const solicitudBdd = {
                        productoId: idProductoAsociado,
                        //fechaSolicitud: new Date(), //current date
                        estadoId: idEstadoAprobacionAsociado,
                        nombrePersona: datosSolicitud.nombre,
                        apellidoPersona: datosSolicitud.apellido,
                        cedulaPersona: datosSolicitud.cedula,
                        direccionPersona: datosSolicitud.direccion,
                        sueldoPersona: datosSolicitud.sueldo,
                        direccionEntrega: datosSolicitud.direccionEntrega,
                    }

                    Solicitud.create(solicitudBdd).then(data => {
                        return data;
                    }).catch(err => {
                        console.log("Hubo un error con crear la solicitud");
                        return "error";
                    });
                })
                .catch(err => {
                    return "error";
                });

            //return data.id;
        })
        .catch(err => {
            return "error";
        });
    return "ok";

    /* const solicitudBdd = {
        productoId: idProductoAsociado,
        fechaSolicitud: new Date(), //current date
        estadoAprobacionId: idEstadoAprobacionAsociado,
        nombrePersona: datosSolicitud.nombre,
        apellidoPersona: datosSolicitud.apellido,
        cedulaPersona: datosSolicitud.cedula,
        direccionPersona: datosSolicitud.direccion,
        sueldoPersona: datosSolicitud.sueldo,
        direccionEntrega: datosSolicitud.direccionEntrega,
    }

    Solicitud.create(solicitudBdd).then(data => {
        return data;
    }).catch(err => {
        return "error";
    }); */
}
