const productos = require("../controllers/productos.controller");
const express = require('express');

router = express.Router();
router.get("/getProducts", productos.obtenerProductos);

module.exports = router;
