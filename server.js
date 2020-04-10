const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Deployed!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
