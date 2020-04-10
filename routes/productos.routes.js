const productos = require("../controllers/productos.controller");
const express = require('express');

router = express.Router();
// simple route
router.post("/", (req, res) => {
  res.json({ message: "Welcome to app." });
});
router.get("/getProducts", productos.obtenerProductos);

module.exports = router;