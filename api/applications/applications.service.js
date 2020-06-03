const { spawn } = require("child_process");
var base64Img = require("base64-img");
const db = require("../../db/models/index.js");
const cloudinaryHelper = require("./../../utils/cloudinary");
const processRiskPorcentage = require("../../externalSystems/riskSystem/processRiskPorcentage")

const Solicitude = db.solicitude;
const Producto = db.producto;
const State = db.state;

exports.save = async(datosSolicitude) => {
    try {
        console.log(datosSolicitude);
        const solicitudeBdd = {
            productoId: await getIdProducto(datosSolicitude.producto),
            stateId: await getIdState("Esperando aprobacion"),
            personFirstName: datosSolicitude.nombre,
            personLastName: datosSolicitude.apellido,
            personCedula: datosSolicitude.cedula,
            personAddress: datosSolicitude.direccion,
            personSalary: datosSolicitude.sueldo,
            personDeliveryAddress: datosSolicitude.direccionEntrega,
        };
        //Create a solicitude in db
        Solicitude.create(solicitudeBdd).then((data) => {
            return data;
        });

        Solicitude.update({
            stateId: getIdState(processRiskPorcentage.processRiskPorcentage(solicitudeBdd.productoId, solicitudeBdd.cedula, solicitudeBdd.sueldo)),
        }, {
            where: {
                id: solicitudeBdd.id
            }
        });
    } catch (err) {
        throw err;
    }
};

exports.compareFotos = async(userId, base64Ci, base64User) => {
    try {
        const urlCameraPhoto = await cloudinaryHelper.uploadImage(`${userId}_camera`, base64User);
        const urlCiPhoto = await cloudinaryHelper.uploadImage(`${userId}_ci_card`, base64Ci);

        const pythonScriptPromise = async() => {
            var dataPythonResult;
            // must be adapted for linux paths \\ braces are for windows
            // const python = spawn("python", [
            //   "./utils/comparator.py",
            //   `\\onApplication\\${userId}_ci_card_picture.jpg`,
            //   `\\onApplication\\${userId}_camera_picture.jpg`,
            // ]);
            const python = spawn("python", ["./utils/comparator.py", urlCiPhoto.url, urlCameraPhoto.url]);
            return new Promise((resolve, reject) => {
                var error;
                python.stdout.on("data", function(data) {
                    dataPythonResult = data.toString();
                    console.log(data);
                });

                python.stderr.on("data", function(data) {
                    error = data;
                });

                python.on("close", (code) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(dataPythonResult);
                    }
                });
            });
        };
        const result = await pythonScriptPromise().catch(err => {
            return "ERROR:" + err.toString();
        });
        console.log("RESULTADO:", result);
        return result;
    } catch (err) {
        console.log("entro en el catch grande");
        throw new Error(err);
    }
};

function getIdProducto(nombreProducto) {
    return Producto.findOne({ where: { nombre: nombreProducto } })
        .then((data) => {
            return data.id;
        })
        .catch((err) => {
            return "error";
        });
}

function getIdState(nombre) {
    return State.findOne({ where: { nombre: nombre } })
        .then((data) => {
            return data.id;
        })
        .catch((err) => {
            return "error";
        });
}

function getNameState(id) {
    return State.findOne({ where: { id: id } })
        .then((data) => {
            return data.nombre;
        })
        .catch((err) => {
            return "error";
        });
}

exports = getNameState;