var applicationsService = require("./applications.service.js");
const db = require("../../db/models/index.js");
const Debug = db.debug;

exports.generateApplication = async (req, res) => {
  try {
    const solicitudeJson = req.body.solicitude;
    if (!solicitudeJson) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese una solicitude",
      });
    }
    var datosSolicitude = "";
    try {
      datosSolicitude = JSON.parse(solicitudeJson);
    } catch (err) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "The solicitude has to be in JSON formatting",
      });
    }
    const respuesta = await applicationsService.save(datosSolicitude);
    if (typeof respuesta == 'string' && respuesta.includes("Invalid")) {
      var message = respuesta.includes("product") ? "Product" : "Data";
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid " + message
      })
    } else {
      res.status(200).send({
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
    });
  }
};

exports.compareFotos = async (req, res) => {
  try {
    const userIdCardNumber = req.body.userIdCardNumber;
    const fotoCedula = req.body.fotoCedula;
    const fotoSelfie = req.body.fotoSelfie;
    if (!fotoCedula || !fotoSelfie) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese una foto de la cedula y una selfie",
      });
    }
    const resultOfComparison = await applicationsService.compareFotos(
      userIdCardNumber,
      fotoCedula,
      fotoSelfie
    );
    if (
      resultOfComparison.toUpperCase().includes("ERROR") &&
      resultOfComparison.includes("NoFace")
    ) {
      res.status(400).send({
        success: false,
        result: false,
        code: "NO_FACE",
        message: "No ha sido posible detectar un rostro en la imagen enviada.",
      });
    } else if (resultOfComparison.toUpperCase().includes("ERROR")) {
      res.status(400).send({
        success: false,
        result: false,
        code: "VALIDATION_FAILED",
        message: "No ha sido posible detectar el error que deneg",
      });
    } else {
      res.status(200).send({
        success: true,
        result: resultOfComparison.includes("True") ? true : false,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
      trace: e,
    });
  }
};

exports.getAllPendingApplications = async (req, res) => {
  try {
    const apps = await applicationsService.getAllPendingApplications();
    res.status(200).send({
      success: true,
      applications: apps,
      message: "Apps"
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
    });
  }
}

exports.updateState = async (req, res) => {
  try {
    const idSolicitude = req.body.idSolicitude;
    const newState = req.body.state;
    if (!idSolicitude || !newState) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese idSolicitude/state",
      });
    }
    const respuesta = await applicationsService.updateState(idSolicitude, newState);
    if (typeof respuesta == 'string' && respuesta.includes("Invalid")) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: respuesta
      })
    } else {
      res.status(200).send({
        success: true,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
    });
  }
}

exports.getPendingApplicationsByName = async (req, res) => {
  try {
    const clientFirstName = req.query.clientFirstName
    const clientLastName = req.query.clientLastName
    if (!clientFirstName && !clientLastName) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese nombre y apellido del cliente correctamente",
      });
    }
    const appsByName = await applicationsService.getPendingApplicationsByName(clientFirstName, clientLastName);
    res.status(200).send({
      success: true,
      applicationsByName: appsByName,
      message: "Apps by name"
    });

  } catch (e) {
    console.log(e);
    res.status(404).send({
      success: false,
      code: "NOT_FOUND",
      message: "No se ha encontrado ninguna solicitud que corresponda a esa persona.",
    });
  }
}