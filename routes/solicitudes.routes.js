const solicitudes = require("../controllers/solicitudes.controller");
const express = require('express');

router = express.Router();
router.post("/enviarSolicitude", solicitudes.generarSolicitude);
router.post("/enviarFotos", solicitudes.compareFotos);

module.exports = router;
