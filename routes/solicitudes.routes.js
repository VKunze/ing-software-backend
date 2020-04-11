const solicitudes = require("../controllers/solicitudes.controller");
const express = require('express');

router = express.Router();
router.post("/enviarSolicitud", solicitudes.generarSolicitud);

module.exports = router;
