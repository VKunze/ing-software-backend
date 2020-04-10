const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const funcionarioBancoRouter = require('./routes/funcionarioBanco.routes');
const solicitudesRouter = require("./routes/solicitudes.routes");
const productosRouter = require("./routes/productos.routes");
var app = express();
require("dotenv").config();
require("./routes")(app);

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
app.use(funcionarioBancoRouter);
app.use(solicitudesRouter);
app.use(productosRouter);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });