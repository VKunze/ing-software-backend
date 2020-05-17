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
    res.status(200).send({
      success: true,
    });
  } catch (e) {
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
