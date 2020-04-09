const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const clientesBancoRouter = require('./routes/clientesBanco.routes')
var app = express();

var corsOptions = {
    // origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db/index.js");
db.sequelize.sync();
app.use(clientesBancoRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});