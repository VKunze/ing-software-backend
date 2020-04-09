const clientesBanco = require("../controllers/clientesBanco.controller");
const express = require('express');

router = express.Router();
// simple route
router.post("/", (req, res) => {
  res.json({ message: "Welcome to app." });
});
router.post("/login", clientesBanco.checkdb);

module.exports = router;

  
  // Verify user
/*
  // Create a new Tutorial
  clientesBancoRouter.post("/", clientesBanco.create);

  // Retrieve all Tutorials
  clientesBancoRouter.get("/", tutoclientesBancorials.findAll);

  // Retrieve all published Tutorials
  clientesBancoRouter.get("/published", clientesBanco.findAllPublished);

  // Retrieve a single Tutorial with id
  clientesBancoRouter.get("/:id", clientesBanco.findOne);

  // Update a Tutorial with id
  clientesBancoRouter.put("/:id", clientesBanco.update);

  // Delete a Tutorial with id
  clientesBancoRouter.delete("/:id", clientesBanco.delete);

  // Create a new Tutorial
  clientesBancoRouter.delete("/", clientesBanco.deleteAll);

  app.use('/db/clientesBanco.db.js', clientesBancoRouter);

*/

