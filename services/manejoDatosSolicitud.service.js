const db = require("../db/index.js");
const Solicitud = db.solicitud;
const Producto = db.producto;
const Estado = db.estado;
const Op = db.Sequelize.Op;

exports.guardarDatos = (jsonDatos) => {
    var datosSolicitud = JSON.parse(jsonDatos);
    const idProductoAsociado = Producto.findOne({ where: { nombre: datosSolicitud.producto } })
        .then(data => {
            return data.id;
        })
        .catch(err => {
            throw err;
        });
    const idEstadoAprobacionAsociado = Estado.findOne({ where: { nombre: "estado inicial" } })
        .then(data => {
            return data.id;
        })
        .catch(err => {
            throw err;
        });

    const solicitudBdd = {
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

    return Solicitud.create(solicitudBdd).then(data => {
        return data;
    }).catch(err => {
        return "error";
    });
}
