const { spawn } = require('child_process');
const db = require("../../db/index.js");
const Solicitude = db.solicitude;
const Producto = db.producto;
const State = db.state;

exports.guardarDatos = async (datosSolicitude) => {
    try {
        console.log(datosSolicitude);
        const solicitudeBdd = {
            productoId: await getIdProducto(datosSolicitude.producto),
            stateId: await getIdStateInicial(),
            nombrePersona: datosSolicitude.nombre,
            apellidoPersona: datosSolicitude.apellido,
            cedulaPersona: datosSolicitude.cedula,
            direccionPersona: datosSolicitude.direccion,
            sueldoPersona: datosSolicitude.sueldo,
            direccionEntrega: datosSolicitude.direccionEntrega,
        }
        //Create a solicitude in db
        Solicitude.create(solicitudeBdd)
            .then(data => {
                return data
            });
    } catch (err) {
        throw err;
    }
}

exports.compareFotos = async (fotoCedula, fotoSelfie) => {
    try {
      var dataToSend;
      const python = spawn('python', ['../../utils/comparator.py']);
      
      python.stdout.on('data', function (data) {
          console.log('Pipe data from python script ...');
          dataToSend = data.toString();
      });
      
      python.on('close', (code) => {
          console.log(`child process close all stdio with code ${code}`);
          res.send(dataToSend)
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

function getIdStateInicial() {
  return State.findOne({ where: { nombre: "esperando aprobacion" } })
    .then(data => {
        return data.id;
    })
    .catch(err => {
        return "error";
    });
}