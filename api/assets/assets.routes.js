const express = require('express');
const assetsController = require("./assets.controller");

assetsRouter = express.Router();
assetsRouter.post("/", assetsController.handleAssets);

module.exports = assetsRouter;
