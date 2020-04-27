const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/models/index.js");
const apiRoutes = require("./api/index");

var app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

db.sequelize.sync();
app.use('', apiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
