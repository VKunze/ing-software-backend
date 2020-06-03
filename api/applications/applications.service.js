const { spawn } = require("child_process");
var base64Img = require("base64-img");
const db = require("../../db/models/index.js");
const cloudinaryHelper = require("./../../utils/cloudinary");

const Solicitude = db.solicitude;
const Product = db.product;
const State = db.state;

exports.save = async (datosSolicitude) => {
  var productId = "";
  var stateId = "";
  try {
    console.log("pre");
    productId = await getProductId(datosSolicitude.producto);
    console.log("producto: ", productId);
    stateId = await getIdInicialState();
    console.log("state: ", stateId);
  } catch (err) {
    return "Invalid product or state";
  }
  try {
    const solicitudeBdd = {
      productId: productId,
      StateId: stateId,
      personFirstName: datosSolicitude.nombre,
      personLastName: datosSolicitude.apellido,
      personCedula: datosSolicitude.cedula,
      personAddress: datosSolicitude.direccion,
      personSalary: datosSolicitude.sueldo,
      personDeliveryAddress: datosSolicitude.direccionEntrega,
    };
    for (key in solicitudeBdd) {
      if (solicitudeBdd[key] == undefined) {
        return "Invalid data";
      }
    }
    console.log(solicitudeBdd);
    //Create a solicitude in db
    Solicitude.create(solicitudeBdd).then((data) => {
      return data;
    });
  } catch (err) {
    throw err;
  }
};

exports.compareFotos = async (userId, base64Ci, base64User) => {
  try {
    const urlCameraPhoto = await cloudinaryHelper.uploadImage(`${userId}_camera`, base64User);
    const urlCiPhoto = await cloudinaryHelper.uploadImage(`${userId}_ci_card`, base64Ci);

    const pythonScriptPromise = async () => {
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
        python.stdout.on("data", function (data) {
          dataPythonResult = data.toString();
        });

        python.stderr.on("data", function (data) {
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
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAllPendingApplications = () => {
  return Solicitude.findAll({
    include: [{
      model: State,
      where: {
        name: "Esperando aprobacion"
      }
    }]
  }).then((data) => {
    console.log(data);
    return data;
  });
}

exports.updateState = async (idSolicitude, newState) => {
  try {
    var solicitude = await Solicitude.findByPk(idSolicitude);
    var state = await State.findOne({ where: { name: newState } });
    if (solicitude === null || state === null) {
      return "Invalid solicitude ID/ state";
    }
    solicitude.setState(state);
    return solicitude.save();
  } catch (err) {
    throw err;
  }
}

function getProductId(nombreProducto) {
  console.log(nombreProducto);
  return Product.findOne({ where: { name: nombreProducto } })
    .then((data) => {
      return data.id;
    })
    .catch((err) => {
      throw (err);
    });
}

function getIdInicialState() {
  return State.findOne({ where: { name: "Esperando aprobacion" } })
    .then((data) => {
      return data.id;
    })
    .catch((err) => {
      throw (err);
    });
}
