const db = require("../db/index.js");
const Solicitud = db.solicitud;
const Producto = db.producto;
const Estado = db.estado;

exports.guardarDatos = async (datosSolicitud) => {
    try {
        console.log(datosSolicitud);
        const solicitudBdd = {
            productoId: await getIdProducto(datosSolicitud.producto),
            estadoId: await getIdEstadoInicial(),
            nombrePersona: datosSolicitud.nombre,
            apellidoPersona: datosSolicitud.apellido,
            cedulaPersona: datosSolicitud.cedula,
            direccionPersona: datosSolicitud.direccion,
            sueldoPersona: datosSolicitud.sueldo,
            direccionEntrega: datosSolicitud.direccionEntrega,
        }
        //Crear la solicitud en la bdd
        Solicitud.create(solicitudBdd)
            .then(data => {
                return data
            });
    } catch (err) {
        throw err;
    }


}

function getIdProducto(nombreProducto) {
    return Producto.findOne({ where: { nombre: nombreProducto } })
        .then(data => {
            return data.id;
        })
        .catch(err => {
            return "error";
        });
}

function getIdEstadoInicial() {
    return Estado.findOne({ where: { nombre: "esperando aprobacion" } })
        .then(data => {
            return data.id;
        })
        .catch(err => {
            return "error";
        });
}