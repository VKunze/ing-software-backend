const productsController = require("./products.controller");
const express = require('express');

productsRouter = express.Router();
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/details", productsController.getProductDetails);

module.exports = productsRouter;
