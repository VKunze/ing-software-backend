const solicitudes = require("./applications.controller");
const express = require('express');

applicationsRouter = express.Router();

applicationsRouter.post("/", solicitudes.generarSolicitude);
applicationsRouter.post("/assets", solicitudes.compareFotos);

module.exports = applicationsRouter;
