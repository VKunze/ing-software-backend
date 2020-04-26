const productos = require("../controllers/productos.controller");
const express = require('express');

router = express.Router();
router.get("/getProducts", productos.obtenerProductos);
router.get("/getProductDetails", productos.getProductDetails);


module.exports = router;
