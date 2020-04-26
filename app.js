const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const db = require("./db/index.js");
const bankWorkerRouter = require('./routes/bankWorker.routes');
const solicitudesRouter = require("./routes/solicitudes.routes");
const productosRouter = require("./routes/products.routes");
const assetsRoutes = require("./routes/assets.routes");

var app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

db.sequelize.sync();
app.use(bankWorkerRouter);
app.use(solicitudesRouter);
app.use(productosRouter);
app.use(assetsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
