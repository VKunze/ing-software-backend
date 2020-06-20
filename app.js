const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/models/index.js");
const apiRoutes = require("./api/index");
const cron = require("node-cron");
const printSystem = require("./externalSystems/printSystem/printSystemCommunication");

var app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(__dirname));

db.sequelize.sync({ force: false });
app.use("", apiRoutes);

try {
  cron.schedule("0 20 * * *", () => {
    printSystem.sendSolicitudesAprobadas();
  });
} catch (error) {
  console.log(error);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
