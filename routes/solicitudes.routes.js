const solicitudes = require("../controllers/solicitudes.controller");
const express = require('express');

router = express.Router();
router.post("/enviarSolicitud", solicitudes.generarSolicitud);
router.post("/enviarFotos", solicitudes.compararFotos);

module.exports = router;
