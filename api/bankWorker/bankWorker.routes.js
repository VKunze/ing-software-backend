const bankWorkerController = require("./bankWorker.controller");
const express = require("express");
const middleware = require("../auth/middleware");

bankWorkerRouter = express.Router();
bankWorkerRouter.post("/login", bankWorkerController.checkdb);
bankWorkerRouter.post("/new", middleware.authenticateToken, bankWorkerController.create);

// To Finish
bankWorkerRouter.post("/tokenTest", middleware.authenticateToken, () => {
  console.log("ESTA FUNCIONANDO");
});

module.exports = bankWorkerRouter;
