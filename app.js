const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/models/index.js");
const apiRoutes = require("./api/index");

const corsOptionsHandler = (req, callback) => {
  const corsOptions = {
    origin(origin, call) {
      if (!origin) {
        call(null, true);
      } else {
        Sentry.captureMessage(JSON.stringify(req));
        call(new Forbidden("Not allowed"), false);
      }
    },
    credentials: true,
    allowedHeaders: [
      "Save-Data",
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
      "Accept",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  callback(null, corsOptions);
};

var app = express();
require("dotenv").config();

app.use((req, res, next) => {
  res.header("Vary", "Origin");
  res.header("Cache-Control", "no-cache,must-revalidate");
  next();
});
app.use(cors(corsOptionsHandler));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(express.static(__dirname));

db.sequelize.sync({ force: false });
app.use("", apiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
