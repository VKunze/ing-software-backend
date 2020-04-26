const express = require('express');
const applicationsRouter = require('./applications/applications.routes')
const assetsRouter = require('./assets/assets.routes')
const bankWorkersRouter = require('./bankWorker/bankWorker.routes')
const productsRouter = require('./products/products.routes')

router = express.Router();

router.use("/applications", applicationsRouter);
router.use("/assets", assetsRouter);
router.use("/bank", bankWorkersRouter);
router.use("/product", productsRouter);

module.exports = router;
