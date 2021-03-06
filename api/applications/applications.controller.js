var applicationsService = require("./applications.service.js");
const db = require("../../db/models/index.js");
const Debug = db.debug;
const notificationHelper = require("./../../utils/notifications.js");
var helpers = require("../../utils/helpers.js");

exports.generateApplication = async (req, res) => {
    try {
        const solicitudeJson = req.body;
        if (!solicitudeJson) {
            return res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: "Ingrese una solicitude",
            });
        }
        const respuesta = await applicationsService.save(solicitudeJson);
        //console.log("respuesta:", respuesta);
        if (typeof respuesta == "string" && (respuesta.includes("Invalid") || respuesta.includes("Incomplete"))) {
            var message = respuesta.includes("product") ? "Invalid Product" : "Incomplete Data";
            return res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: message,
            });
        } else {
            notificationHelper.sendPushNotificationToAdmins().catch((e) => {
                console.log(e);
            });
            return res.status(200).send({
                success: true,
                estado: respuesta,
            });
        }
    } catch (e) {
        return res.status(500).send({
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
            var apiKey = helpers.generateApplicationApiKey();
            res.status(200).send({
                success: true,
                apiKey: apiKey,
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
            message: "Apps",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
        });
    }
};

exports.updateState = async (req, res) => {
    try {
        const idSolicitude = req.body.idSolicitude;
        const newState = req.body.state;
        const comment = req.body.comment;
        if (!idSolicitude || !newState) {
            res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: "Ingrese idSolicitude/state",
            });
        }
        const respuesta = await applicationsService.updateState(idSolicitude, newState, comment);
        var ci = await applicationsService.getCedula(idSolicitude);
        notificationHelper.sendPushNotificationToAppliants([ci]).catch((e) => {
            console.log(e);
        });
        if (typeof respuesta == "string" && respuesta.includes("Invalid")) {
            res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: respuesta,
            });
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

exports.getPendingApplicationsByName = async (req, res) => {
    try {
        const clientFirstName = req.query.clientFirstName
        const clientLastName = req.query.clientLastName
        const state = "Esperando aprobacion"
        if (!clientFirstName && !clientLastName) {
            res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: "Ingrese nombre y/o apellido",
            });
        }
        const appsByName = await applicationsService.getApplicationsByName(clientFirstName, clientLastName, state);
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
};

exports.getAllApprovedApplications = async (req, res) => {
    try {
        const apps = await applicationsService.getAllApprovedApplications();
        res.status(200).send({
            success: true,
            applications: apps,
            message: "Apps",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.query.productId
        console.log(productId)
        const product = await applicationsService.getProductById(productId);
        res.status(200).send({
            success: true,
            product: product,
            message: "Product",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
        });
    }
};

exports.proofOfLifeApproved = (req, res) => {

    try {
        var apiKey = helpers.generateComparePhotosApiKey();
        res.status(200).send({
            success: true,
            apiKey: apiKey,
        });
      } catch (e) {
        res.status(500).send({
          success: false,
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
        });
      }



}

exports.getAllApplications = async (req, res) => {
    try {
        const apps = await applicationsService.getAllApplications();
        res.status(200).send({
            success: true,
            applications: apps,
            message: "Apps",
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
        });
    }
};

exports.getApprovedApplicationsByName = async (req, res) => {
    try {
        const clientFirstName = req.query.clientFirstName
        const clientLastName = req.query.clientLastName
        const state = "Aprobada"
        if (!clientFirstName && !clientLastName) {
            res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: "Ingrese nombre y/o apellido",
            });
        }
        const appsByName = await applicationsService.getApplicationsByName(clientFirstName, clientLastName, state);
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
};

exports.getAllApplicationsByName = async (req, res) => {
    try {
        const clientFirstName = req.query.clientFirstName
        const clientLastName = req.query.clientLastName
        if (!clientFirstName && !clientLastName) {
            res.status(400).send({
                success: false,
                code: "BAD_REQUEST",
                message: "Ingrese nombre y/o apellido",
            });
        }
        const appsByName = await applicationsService.getAllApplicationsByName(clientFirstName, clientLastName);
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
};