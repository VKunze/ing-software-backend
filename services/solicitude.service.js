const db = require("../db/index.js");
const faceapi = require("face-api.js");
//const canvas = require("canvas");
const fs = require("fs");
const path = require("path");

var commons = require('./commons/index');

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

const REFERENCE_IMAGE = './angry.jpg'
const QUERY_IMAGE = '../angry.jpg'

exports.compareFotos = async (fotoCedula, fotoSelfie) => {
    try {
        console.log(commons.faceDetectionNet.loadFromDisk());
        console.log(require("./weights"));
        console.log("1");
        await commons.faceDetectionNet.loadFromDisk('./weights');
        
        console.log("1");
        await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights')
        
        console.log("1");
        await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights')
        
        console.log("1");

        const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
        const queryImage = await canvas.loadImage(QUERY_IMAGE)

       /*  let img = faceapi.fetchImage("C:/Users/valek/Documents/UM/2020 s1/IngSoftware/ing-software-backend/services/angry.jpg")
            .then((resultado) => {
                console.log(resultado);
            }).catch((e) => {
                console.log(e);
            }); */

        return "ok";
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