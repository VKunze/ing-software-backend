const products = require("../controllers/products.controller");
const express = require('express');

router = express.Router();
router.get("/getProducts", products.getProducts);
router.get("/getProductDetails", products.getProductDetails);


module.exports = router;
