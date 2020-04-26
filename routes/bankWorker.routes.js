const bankWorker = require("../controllers/bankWorker.controller");
const express = require('express');
const middleware = require("../middleware");

router = express.Router();
router.post("/login", bankWorker.checkdb);
router.post("/createBankWorker", bankWorker.create);
router.post('/tokenTest', middleware.authenticateToken, ()=>{
    console.log("ESTA FUNCIONANDO");
})

module.exports = router;
