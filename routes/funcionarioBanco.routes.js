const funcionarioBanco = require("../controllers/funcionarioBanco.controller");
const express = require('express');

router = express.Router();
router.post("/login", funcionarioBanco.checkdb);
router.post("/createFuncionarioBanco", funcionarioBanco.create);


module.exports = router;
