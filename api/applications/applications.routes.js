const applications = require("./applications.controller");
const express = require('express');

applicationsRouter = express.Router();

applicationsRouter.post("/", applications.generateApplication);
applicationsRouter.post("/assets", applications.compareFotos);
applicationsRouter.get("/pending", applications.getAllPendingApplications);
applicationsRouter.post("/updateState", applications.updateState);

module.exports = applicationsRouter;
