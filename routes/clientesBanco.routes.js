module.exports = app => {
    const clientesBanco = require("../controllers/clientesBanco.controller.js");
   
    const express = require('express');
   
    clientesBancoRouter = express.Router();

    module.exports = clientesBancoRouter;

  
  // Verify user
  clientesBancoRouter.get("/", clientesBanco.checkdb);
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
};

