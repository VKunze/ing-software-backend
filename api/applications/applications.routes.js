const applications = require("./applications.controller");
const express = require('express');

applicationsRouter = express.Router();

applicationsRouter.post("/", applications.generateApplication);
applicationsRouter.post("/assets", applications.compareFotos);

module.exports = applicationsRouter;
