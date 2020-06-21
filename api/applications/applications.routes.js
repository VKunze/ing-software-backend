const applications = require("./applications.controller");
const express = require('express');
const middleware = require("../auth/middleware");

applicationsRouter = express.Router();

applicationsRouter.post("/", applications.generateApplication);
applicationsRouter.post("/assets", applications.compareFotos);
applicationsRouter.get("/pending", middleware.authenticateToken, applications.getAllPendingApplications);
applicationsRouter.post("/updateState", middleware.authenticateToken, applications.updateState);
applicationsRouter.get("/pendingByName", middleware.authenticateToken, applications.getPendingApplicationsByName);
applicationsRouter.get("/approved", middleware.authenticateToken, applications.getAllApprovedApplications);
applicationsRouter.get("/getProductById", middleware.authenticateToken, applications.getProductById);
applicationsRouter.post("/proofOfLifeApproved", applications.proofOfLifeApproved);
applicationsRouter.post("/scopeTest", middleware.check_expiration, middleware.check_scopes(['face_rec']), applications.getAllPendingApplications);


module.exports = applicationsRouter;