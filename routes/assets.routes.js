const express = require('express');
const assetsController = require("../controllers/assets.controller");

router = express.Router();
router.post("/assets", assetsController.handleAssets);

module.exports = router;
