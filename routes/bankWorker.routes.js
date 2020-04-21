const bankWorker = require("../controllers/bankWorker.controller");
const express = require('express');

router = express.Router();
router.post("/login", bankWorker.checkdb);
router.post("/createBankWorker", bankWorker.create);


module.exports = router;
